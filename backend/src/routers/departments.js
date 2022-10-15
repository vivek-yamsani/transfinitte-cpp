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

module.exports = { departmentRouter: router }