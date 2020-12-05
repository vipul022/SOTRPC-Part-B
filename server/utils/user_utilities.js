let User = require("../models/user")


const addUserToDB = function(req) {
    return new User(req.body);
};

const getUserFromDB = function(id) {
    return User.findById(id);
}

const deleteUserFromDB = function(id) {
    return User.findByIdAndRemove(id);
}

const getUsersFromDB = function(req) {

}

const editUserFromDB = function(req) {

}

module.exports = {
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB
}