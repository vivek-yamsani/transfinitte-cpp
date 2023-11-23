const router = require("express").Router();
const prisma = require("../helpers/prisma");

router.get("/", async(req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.id,
            },
        });
        console.log(user);
        res.json({
            role: req.Role,
            id:req.id,
            name:user.name
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

module.exports = { roleRouter: router }