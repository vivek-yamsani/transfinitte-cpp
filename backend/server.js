const express = require("express")
const cors = require("cors");
require('dotenv').config({ path: './.env' })
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8000;

const { authRouter } = require("./src/routers/auth");
const { announcementRouter } = require("./src/routers/announcements");
const { verifyToken } = require("./src/helpers/jwt");

app.use("/auth", authRouter);
app.use("/announcements", verifyToken, announcementRouter);

app.all('*', async (req, res) => {
    res.status(404).json({
        message: "Resource not found!"
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));