const express = require("express")
const app = express()
const {port} = require("./constants/env.js")
const userrouter = require("./routes/authroute.js")
const adminroute = require("./routes/adminroute.js")
const eventroute = require("./routes/eventroutes.js")
const registerroute = require("./routes/registrationroute.js")
const uploadfiles = require("./routes/uploadfileroutes.js")
const {apinotfound} = require("./middleware/apinotfound.js")
const {globalerror}=require("./middleware/globalerrmiddleware.js")
// cors is a middle ware for update the new events in the frontend
const cors= require("cors")
const {connectdb} = require("./configs/mongodb.js")
connectdb()



app.use(cors({origin:["http://localhost:5173"]}))
app.use(express.json())
app.use(express.urlencoded())
app.use("/api/auth",userrouter)
app.use("/api/user",adminroute)
app.use("/api/event",eventroute)
app.use("/api/regrestation",registerroute)
app.use("/api/file",uploadfiles)

app.get("/",(req,res)=>{
    try {
       res.json({msg:"i am healthy"})
    } catch (error) {
        res.json({msg:error})
    }
})


app.use(apinotfound)
app.use(globalerror)




app.listen(port,()=>{console.log("server strted at port "+port)})