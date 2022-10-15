const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "../../.env" });

const createToken = async function (payLoad) {
    return jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: '480h'
    });
}

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                message: "No token"
            });
        }
        // console.log(process.env.JWT_SECRET, token);
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name && err.name == "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token expired"
                    });
                }
                return res.status(401).json({
                    message: "Invalid token or Token expired"
                });
            }
            // console.log(decoded);
            req.id = decoded.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: req.id
                },
                select: {
                    role: true
                }
            });
            req.Role = user.role;
            // console.log(user.role, typeof (user.role), req.Role);
            next();
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error" + err.message
        });
    }
}

module.exports = { createToken, verifyToken };