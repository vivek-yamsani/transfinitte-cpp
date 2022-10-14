const express = require("express")
const cors = require("cors");
require('dotenv').config({ path: './.env' })
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

const { authRouter } = require("./src/routers/auth");

app.use("/auth", authRouter);

app.all('*', async (req, res) => {
    res.status(404).json({
        message: "Resource not found!"
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));