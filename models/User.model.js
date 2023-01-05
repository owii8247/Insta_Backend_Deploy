const mongoose = require("mongoose")
const modelSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model("user", modelSchema)

module.exports = UserModel