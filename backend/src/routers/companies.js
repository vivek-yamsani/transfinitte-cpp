const prisma = require("../helpers/prisma");
const router = require("express").Router();

router.get("/all", async (req, res) => {
    try {
        if (req.Role == "ADMIN" || req.Role == "REPRESENTATIVE") {
            const companies = await prisma.company.findMany({});
            res.json(companies);
        }
        else {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.id
                },
                select: {
                    departmentId: true,
                    cgpa: true
                }
            });
            const eligible_companies = await prisma.company.findMany({
                where: {
                    eligible_departments: {
                        some: {
                            id: user.departmentId
                        }
                    },
                    cgpa_criteria: {
                        lte: user.cgpa
                    }
                }
            });
            const applied_compaines = await prisma.company_Applicant.findMany({
                where: {
                    student_id: req.id
                },
                select: {
                    company: true,
                    application_status: true
                }
            });
            let result = []
            for (let i = 0; i < eligible_companies.length; i++) {
                let isApplied = 0;
                let application_status;
                for (let j = 0; j < applied_compaines.length; j++) {
                    if (eligible_companies[i].id == applied_compaines[j].company.id) {
                        isApplied = 1;
                        application_status = applied_compaines[j].application_status;
                        break;
                    }
                }
                result.push({
                    isApplied,
                    company: eligible_companies[i],
                    application_status
                });
            }
            res.json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
});

router.post("/apply/:id", async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        const { student_id } = req.body;
        if (isNaN(companyId) || !student_id) {
            return res.status(400).json({
                message: "Invalid Request.."
            })
        }
        if (req.Role == "ADMIN" || req.Role == "REPRESENTATIVE") {
            return res.status(400).json({
                message: "Only students can apply"
            });
        }
        await prisma.company_Applicant.create({
            data: {
                student_id: student_id,
                company_id: companyId
            }
        });

        res.json({
            message: "Successfully applied for company"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        if (isNaN(companyId)) {
            return res.status(400).json({
                message: "Invalid Request.."
            })
        }
        if (req.Role != "ADMIN" && req.Role != "REPRESENTATIVE") {
            return res.status(403).json({
                message: "Unauthorized.."
            });
        }
        const students = await prisma.company_Applicant.findMany({
            where: {
                company_id: companyId,
                student_id: req.id,
            },
            select: {
                student_id: true,
                student: {
                    select: {
                        name: true
                    }
                },
                application_status: true
            }
        });
        students.map((i) => {
            i.student = i.student.name
        });
        res.json(students);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
})

router.post("/add_shortlist/:id", async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        const { shortlist } = req.body;
        if (isNaN(companyId) || !shortlist) {
            return res.status(400).json({
                message: "Invalid Request.."
            })
        }
        if (req.Role != "REPRESENTATIVE" && req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized.."
            })
        }
        for (let i = 0; i < shortlist.length; i++) {
            await prisma.company_Applicant.updateMany({
                where: {
                    company_id: companyId,
                    student_id: shortlist[i]
                },
                data: {
                    application_status: "SHORTLISTED"
                }
            });
        }
        await prisma.company_Applicant.updateMany({
            where: {
                application_status: {
                    not: "SHORTLISTED"
                },
                company_id: companyId
            },
            data: {
                application_status: "REJECTED"
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
});

router.post("/add_finalList/:id", async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        const { finalList } = req.body;
        if (isNaN(companyId) || !finalList) {
            return res.status(400).json({
                message: "Invalid Request.."
            })
        }
        if (req.Role != "REPRESENTATIVE" && req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized.."
            })
        }
        for (let i = 0; i < finalList.length; i++) {
            await prisma.company_Applicant.updateMany({
                where: {
                    company_id: companyId,
                    student_id: finalList[i]
                },
                data: {
                    application_status: "PLACED"
                }
            });
            await prisma.user.update({
                where: {
                    id: finalList[i]
                },
                data: {
                    company_id: companyId
                }
            });
        }
        await prisma.company_Applicant.updateMany({
            where: {
                application_status: {
                    not: "PLACED"
                },
                company_id: companyId
            },
            data: {
                application_status: "REJECTED"
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
});

router.post("/create", async (req, res) => {
    try {
        const { name, cgpa_criteria, eligible_departments, description, role } = req.body
        // console.log(name, cgpa_criteria, eligible_departments, description);
        if (!name || !cgpa_criteria || !eligible_departments || !description || !role) {
            return res.status(400).json({
                message: "Invalid Request..!"
            })
        }
        if (req.Role != "REPRESENTATIVE" && req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized..!"
            });
        }
        await prisma.company.create({
            data: {
                name,
                cgpa_criteria,
                eligible_departments: { connect: eligible_departments },
                description,
                role
            }
        });
        res.json({
            message: "Succesfully Added the company"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        res.status(404).json({
            message: "Not Yet Implemented"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        if (req.Role != "REPRESENTATIVE" && req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized..!"
            });
        }

        await prisma.company.delete({
            where: {
                id: companyId
            }
        });

        res.json({
            message: "Successfully deleted the company"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

module.exports = { companyRouter: router };