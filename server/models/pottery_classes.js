const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PotteryClass = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    maxNumber:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("PotteryClass", PotteryClass);
