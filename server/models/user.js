const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

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
    //username will contain the email. Need a username field for passport-local-mongoose
    username:{
        type: String,
        required: true
    },
    paid:{
        type: String,
        default: 'not paid'
    },
    role: {
        type: String,
        default: 'user'
    }
})

// plugin the passport-local-mongoose middleware with our User schema
User.plugin(passportLocalMongoose);

User.plugin(require("mongoose-bcrypt"))
module.exports = mongoose.model("User", User);
