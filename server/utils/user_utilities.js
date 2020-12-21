let User = require("../models/user")
const passport = require('passport');


const addUserToDB = function (req, res) {
    const newUser = {
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }
    return new User(newUser);
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
    // new:true to return the updated user rather than the original user
    return User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
}

module.exports = {
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB
}