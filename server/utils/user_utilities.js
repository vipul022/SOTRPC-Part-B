let User = require("../models/user")
const passport = require('passport');

async function userExists(req) {
    return await User.findOne({ username : req.body.username });
}

const addUserToDB = function (req, res) {
    return new User(req.body);
};

const getUserFromDB = function (id) {
    return User.findById(id);
}

const deleteUserFromDB = function (id) {
    return User.findByIdAndRemove(id);
}

const getUsersFromDB = function (req) {
    return User.find()
}

const editUserFromDB = function (req) {
    req.body.modified_date = Date.now();
    // new:true to return the updated user rather than the original user
    return User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
}

module.exports = {
    userExists,
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB
}