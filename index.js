const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

const connection = require("./configs/db")
const { userRouter } = require("./routes/user.routes")


app.use(express.json())
require("dotenv").config()
const instaRouter = require("./routes/insta.routes")
const PORT = process.env.PORT || 8500

// const mongoose = require("mongoose")
// mongoose.set("strictQuery", true);
// mongoose.connect(process.env.MONGO_URL);


app.get("/", (req,res)=>{
    res.send("Welcome to backend of instagram")
})

app.use("/" ,cors(), userRouter)
app.use("/instapost",cors(), instaRouter)

// LISTENING AND DB CONNECTED

app.listen(PORT, async (req, res) => {
    try {
        await connection
        console.log("DB Connected Successfully")
    }
    catch (err) {
        console.log(err)
        console.log("DB Connection Failed")
    }
    console.log(`Listening on PORT ${PORT}`)
})