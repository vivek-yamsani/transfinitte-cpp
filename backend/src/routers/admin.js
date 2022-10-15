const prisma = require("../helpers/prisma");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/add_rep", async (req, res) => {
    try {
        const { rep_id } = req.body;
        if (!rep_id) {
            return res.status(400).json({
                message: "invalid request.."
            });
        }
        if (req.Role !== "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized.."
            });
        }
        await prisma.user.update({
            where: {
                id: rep_id
            },
            data: {
                role: "REPRESENTATIVE"
            }
        });

        res.json({
            message: "Successfully made rep"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

router.post("/add_admin", async (req, res) => {
    try {
        const { name, id, phone, email, password } = req.body;
        if (!name || !id || !phone || !email || !password) {
            return res.status(400).json({
                message: "Invalid Request.."
            });
        }
        if (req.Role != "ADMIN") {
            return res.status(403).json({
                message: "Unauthorized.."
            });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        await prisma.user.create({
            data:{
                id,
                name,
                password: hashedPassword,
                phone,
                email
            }
        });
        res.json({
            message: "Successfully added the admin"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong..!"
        });
    }
})

module.exports = { adminRouter: router }
