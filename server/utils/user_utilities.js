let User = require("../models/user")


const addUserToDB = function(req) {
    return new User(req.body);
};

const getUserFromDB = function(req) {
    return User.findById(req.params.id);
}

const deleteUserFromDB = function(req) {

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