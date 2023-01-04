const express = require("express")
const InstaModel = require("../models/Insta.model")
const instaRouter = express.Router()

// GET REQUEST / READ

instaRouter.get("/:userid", async(req,res)=>{
    const userid = req.params.userid
    const insta = await InstaModel.find({userid})
    res.send(insta)
})


// POST REQUEST 

instaRouter.post("/:userid/create", async(req,res)=>{
    const userid = req.params.userid
    const {Title, Note, Tags } = req.body
    const new_insta = new InstaModel({
        Title , Note , Tags, userid
    })
    await new_insta.save()
    res.send({message: "Post Posted Successfully", new_insta})

})


//PATCH REQUEST

instaRouter.patch("/:userid/patch/instaid", async(req,res)=>{
    const userid  = req.params.userid
    const instaid = req.params.instaid
    const insta = await InstaModel.findOne({_id:instaid})
    if(insta.userid !== userid){
        return res.send("You are not validated to edit post")
    }
    const new_insta = await InstaModel.findByIdAndUpdate(instaid, req.body)
    return res.send("Post Edited Successfully")
})


// DELETE REQUEST

instaRouter.delete("/:userid/delete/instaid", async(req,res)=>{
    const userid = req.params.userid
    const instaid = req.params.instaid
    const insta = await InstaModel.findOne({_id:instaid})
    if(insta.userid !== userid){
        return res.send("You are not validated to delete post")
    }
    const new_insta = await InstaModel.findByIdAndDelete(instaid , req.body)
    return res.send("Post Deleted Successfully")
})

module.exports = instaRouter