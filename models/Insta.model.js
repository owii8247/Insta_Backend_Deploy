const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const instaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    photo: { type: String, default:"" },
    postedBy:{type: ObjectId , ref: "user"}
},
{timestamps:true})

const InstaModel = mongoose.model("instapost", instaSchema)

module.exports = InstaModel