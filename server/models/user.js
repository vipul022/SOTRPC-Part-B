const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

User.plugin(require("mongoose-bcrypt"))
module.exports = mongoose.model("User", User);