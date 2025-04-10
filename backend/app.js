const express=require("express")
const app=express()
const userRoutes=require("./routes/userRoutes")
require('dotenv').config();

// const blogRoutes=require("./routes/blogRoutes")
var cors = require('cors');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json({
    limit:"50mb"
}))
app.use(cors());


app.use("/api/",userRoutes)
// app.use("/api/",blogRoutes)


module.exports=app 