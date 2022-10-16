const prisma = require("../helpers/prisma");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const departments = await prisma.department.findMany({});
        res.json(departments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
})

router.post("/add", async (req, res) => {
    try {
        const { name, id } = req.body;
        if (!name || !id) {
            return req.status(400).json({
                message: "Invalid Request.."
            });
        }
        await prisma.department.create({
            data: {
                id: id,
                name: name
            }
        });
        res.json({
            message: "Successfully created the department"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const departmentId = parseInt(req.params.id);
        const { id, name } = req.body;
        if (isNaN(departmentId) || (!id && !name)) {
            return res.status(400).json({
                message: "Invalid Request.."
            });
        }
        const data = {}
        if (id)
            data.id = id;
        if (name)
            data.name = name
        await prisma.department.update({
            where: { id: departmentId },
            data: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        })
    }
})

module.exports = { departmentRouter: router }