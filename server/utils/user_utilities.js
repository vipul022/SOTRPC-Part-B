let User = require("../models/user")


const addUserToDB = function(req) {
    return new User(req.body);
};


module.exports = {
    addUserToDB 
}