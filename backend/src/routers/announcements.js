const router = require("express").Router();
const prisma = require("../helpers/prisma");

router.get('/all', async (req, res) => {
    try {
        if (req.Role === "ADMIN" || req.Role === "REPRESENTATIVE") {
            const announcements = await prisma.announcement.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    LastEdited: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            announcements.map((i) => {
                i.author = i.author.name;
            });
            return res.json(announcements);
        }
        else {
            const departmentId = parseInt(req.id.substring(1, 3));
            const announcements = await prisma.announcement.findMany({
                where: {
                    departments: {
                        some: {
                            id: departmentId
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    LastEdited: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            announcements.map((i) => {
                i.author = i.author.name;
            });
            res.json(announcements);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const announcementId = parseInt(req.params.id);
        if (isNaN(announcementId)) {
            return res.status(400).json({
                message: "Invalid Request..!"
            });
        }
        const announcement = await prisma.announcement.findUnique({
            where: {
                id: announcementId
            },
            select: {
                id: true,
                title: true,
                description: true,
                LastEdited: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        announcement.author = announcement.author.name;
        res.json(announcement);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

router.post('/create', async (req, res) => {
    try {
        const { title, description, departments } = req.body;
        if (!title || !description || !departments) {
            return res.status(400).json({
                message: "Invalid Request"
            });
        }
        // console.log(req.Role, req.id);
        if (req.Role !== "REPRESENTATIVE" && req.Role !== "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized..."
            });
        }
        await prisma.announcement.create({
            data: {
                title,
                description,
                departments: { connect: departments },
                author_id: req.id
            }
        });

        res.json({
            message: "Successfully Announced..!"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const announcementId = parseInt(req.params.id);
        const { title, description, departments } = req.body;
        if (!announcementId || !title || !description || !departments || isNaN(announcementId)) {
            return res.status(400).json({
                message: "Invalid request"
            });
        }
        if (req.Role !== "REPRESENTATIVE" && req.Role !== "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized..."
            });
        }
        const depts = await prisma.announcement.findUnique({
            where: {
                id: announcementId
            },
            select: {
                departments: {
                    select: {
                        id: true
                    }
                }
            }
        });
        await prisma.announcement.update({
            where: {
                id: announcementId
            },
            data: {
                departments: { disconnect: depts.departments }
            }
        });
        await prisma.announcement.update({
            where: {
                id: announcementId
            },
            data: {
                title,
                description,
                departments: { connect: departments },
                author_id: req.id
            }
        });

        res.json({
            message: "Successfully updated the Announcement"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const announcementId = parseInt(req.params.id);
        if (!announcementId || isNaN(announcementId)) {
            return res.status(400).json({
                message: "Invalid Request.."
            });
        }
        // console.log(req.id, req.Role);
        if (req.Role != "REPRESENTATIVE" && req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized..."
            });
        }
        await prisma.announcement.delete({
            where: {
                id: announcementId
            }
        });

        res.json({
            message: "Succesfully deleted announcement"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

module.exports = { announcementRouter: router };