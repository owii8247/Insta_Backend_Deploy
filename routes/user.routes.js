const express = require("express")
const userRouter = express.Router()
const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//SIGNUP

userRouter.post("/signup", async(req,res)=>{
    const {fullname, username,email, password} = req.body
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
                fullname,
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

userRouter.post("/login", async(req,res)=>{
    const {username,email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const userid = user._id
    bcrypt.compare(password, hashed_password , function(err, result) {
        if(err){
            res.send({"message": "Something Went Wrong"})
        }
        if(result){
            const token = jwt.sign({userid,username}, process.env.SECRET_KEY)
            res.send({"message" : "Login Successfull" , token,userid,username,email})
        }
        else{
            res.send({"message" : "Login Failed"})
        }
    })
})

module.exports ={userRouter}