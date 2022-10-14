const router = require("express").Router();
const bcrypt = require("bcrypt");
const prisma = require("../helpers/prisma");
const { createToken } = require("../helpers/jwt");

router.post('/login', async function (req, res) {
    try {
        const { id, password } = req.body;
        // console.log(id, password);
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                res.json({
                    token: await createToken({ id: user.id }),
                    user: { name: user.name, email: user.email, id: user.id },
                });
                // res.status(200).json({ authenticated: true, message: "successfully loggedin .." });
            } else
                res.status(401).json({
                    authenticated: false,
                    message: "Incorrect Password"
                });
        } else
            res.status(401).json({
                authenticated: false,
                message: "Incorrect id"
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong...!",
        });
    }
});

router.post('/register', async function (req, res) {
    try {
        const { id, name, phone, email, password, departmentId } = req.body;
        if (!email || !password || !name || !phone || !id || !departmentId) {
            return res.status(401).json({
                message: "Invalid Request",
            });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const check = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (check) {
            console.log(id, " already registered..");
            return res.status(400).json({
                message: `${id} is already registered..`
            });
        }
        let user;
        user = await prisma.user.create({
            data: {
                id,
                name,
                phone,
                email,
                password: hashedPassword,
                departmentId
            },
        });
        console.log(user);
        res.json({ message: "Successfully registered...." });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
});

module.exports = { authRouter: router };