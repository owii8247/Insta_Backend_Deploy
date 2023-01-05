const express = require("express")
const InstaModel = require("../models/Insta.model")
const instaRouter = express.Router()

// GET REQUEST / READ

instaRouter.get("/:userid", async(req,res)=>{
    const userid = req.params.userid
    const instapost = await InstaModel.find({userid})
    res.send(instapost)
})


// POST REQUEST 

instaRouter.post("/:userid/create", async(req,res)=>{
    const userid = req.params.userid
    const {title , body , photo,postedBy } = req.body
    const new_insta = new InstaModel({
        title , body , photo,postedBy, userid
    })
    await new_insta.save()
    res.send({message: "Post Posted Successfully", new_insta})

})


//PATCH REQUEST

instaRouter.patch("/:userid/patch/instaid", async(req,res)=>{
    const userid  = req.params.userid
    const instaid = req.params.instaid
    const instapost = await InstaModel.findOne({_id:instaid})
    if(instapost.userid !== userid){
        return res.send("You are not validated to edit post")
    }
    const new_insta = await InstaModel.findByIdAndUpdate(instaid, req.body)
    return res.send("Post Edited Successfully")
})


// DELETE REQUEST

instaRouter.delete("/:userid/delete/instaid", async(req,res)=>{
    const userid = req.params.userid
    const instaid = req.params.instaid
    const instapost = await InstaModel.findOne({_id:instaid})
    if(instapost.userid !== userid){
        return res.send("You are not validated to delete post")
    }
    const new_insta = await InstaModel.findByIdAndDelete(instaid , req.body)
    return res.send("Post Deleted Successfully")
})

module.exports = instaRouter