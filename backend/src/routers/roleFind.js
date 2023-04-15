const router = require("express").Router();

router.get("/", async(req,res) => {
    try {
        res.json({
            role: req.Role,
            id:req.id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

module.exports = { roleRouter: router }