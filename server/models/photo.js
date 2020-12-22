const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = new Schema({
    fileName:{
        type: String,
        required: true
    },
    fileType:{
        type: String,
        required: true
    },
    url:{
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Photo", Photo);