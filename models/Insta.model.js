const mongoose = require("mongoose")
const instaSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Note: { type: String, required: true },
    Tags: { type: String, required: true }
})

const InstaModel = mongoose.model("insta", instaSchema)

module.exports = InstaModel