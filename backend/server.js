const express = require("express")
const cors = require("cors");
const http=require("http")
require('dotenv').config({ path: './.env' })
const app = express();
const port = process.env.PORT || 8000;
const { authRouter } = require("./src/routers/auth");
const { announcementRouter } = require("./src/routers/announcements");
const { verifyToken } = require("./src/helpers/jwt");
const { companyRouter } = require("./src/routers/companies");
const { departmentRouter } = require("./src/routers/departments");
const { adminRouter } = require("./src/routers/admin");
const { roleRouter}=require('./src/routers/roleFind');

const server=http.createServer(app);
const {Server}=require('socket.io')
const io=new Server(server,{
cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST']
}
})

io.on('connect',(socket)=>{
console.log("user connnected",socket.id);
    socket.on('send_messege',(data)=>{
        console.log('data');
    })
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRouter);
app.use("/details",verifyToken,roleRouter);
app.use("/announcements", verifyToken, announcementRouter);
app.use("/companies", verifyToken, companyRouter);
app.use("/departments", verifyToken, departmentRouter);
app.use("/admin", verifyToken, adminRouter);

app.all('*', async (req, res) => {
    res.status(404).json({
        message: "Resource not found!"
    });
});


server.listen(port, () => console.log(`Server is listening on port ${port}`));
