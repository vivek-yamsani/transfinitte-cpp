const express = require("express")
const cors = require("cors")
require('dotenv').config({ path: './env' })
const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;

app.all('*', async (req, res) => {
    res.status(404).json({
        message: "Resource not found!"
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));