const express = require("express")
const cors = require("cors")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const connection  = require("./configs/db")

const app = express()
app.use(cors())
app.use(express.json())
require("dotenv").config()
const UserModel = require("./models/User.model")
const instaRouter = require("./routes/insta.routes")


//SIGNUP

app.post("/signup", async(req,res)=>{
    const {username,email, password} = req.body
    const isUser = await UserModel.findOne({email})
    if(isUser){
        res.send({"message": "User already exist, Please Login"})
    }
    else{
        bcrypt.hash(password, 4, async function(err,hash){
            if(err){
                res.send({"message": "Something Went Wrong !"})
            }
            const new_user = new UserModel({
                username,
                email,
                password: hash
            })
            try{
                await new_user.save()
                res.send({"message": "Sign Up Successfull"})
            }
            catch(err){
                res.send({"message": "Something Went Wrong"})
            }
        })
    }
})

//LOGIN 

app.post("/login", async(req,res)=>{
    const {username,email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const userid = user._id
    bcrypt.compare(password, hashed_password , function(err, result) {
        if(err){
            res.send({"message": "Something Went Wrong"})
        }
        if(result){
            const token = jwt.sign({userid, username}, process.env.SECRET_KEY)
            res.send({"message" : "Login Successfull" , token, username,email})
        }
        else{
            res.send({"message" : "Login Failed"})
        }
    })
})

//AUTHENTICATION MIDDLEWARE

const validation = (req,res,next)=>{
    const token = req.header?.authorization?.split(" ")[1]
    if(!token){
        res.send({"message": "Please Login"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userid = decoded.userid
    if(decoded){
        req.body.userid = userid
        next()
    }
    else{
        res.send({"message" : "Please Login"})
    }
}
app.use(validation)
app.use("/insta", instaRouter )

// LISTENING AND DB CONNECTED

app.listen(8080, async()=>{
    try{
        await connection
        console.log("Connected to DB Successfull")

    }
    catch(err){
        console.log("Connection to DB Failed")
    }
    console.log("PORT Running Successfull on 8080")
})