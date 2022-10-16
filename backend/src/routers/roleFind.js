const router = require("express").Router();

router.post("/", async(req,res) => {
    try {
        res.json({
            role: req.Role
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})