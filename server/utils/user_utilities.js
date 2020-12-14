let User = require("../models/user")
const passport = require('passport');

async function userExists(req) {
    return await User.findOne({ username : req.body.username });
}

const addUserToDB = function (req, res) {
    console.log("I'm in addUserToDB")
    return new User(req.body);

    // if the user doesnot exist return an error
    // if(!user) {
    //     return res.render("auth/login", {error: "Invalid user"})
    // }
    // if (User.findOne({username: req.body.username})) {
    //     const error = ""
    //     return error
    // }

    //     // console.log("req.body:",req.body)
    //     // const { email, password, address, phone, role, paid, name } = req.body
    //     // return User.register({ email, password, address, phone, role, paid, name });
    //     // const { address, phone, role, paid, name } = req.body
    //     // const username = req.body.email;
    //     const {
    //         password,
    //         address,
    //         phone,
    //         role,
    //         paid,
    //         name
    //     } = req.body
    //     const username = req.body.email
    //     const user = await User.register(new User({
    //         username,
    //         address,
    //         phone,
    //         role,
    //         paid,
    //         name
    //     }), password, function (err) {
    //         console.log("after register")
    //         if (err) {
    //             console.log("error")
    //             if (err.name === 'UserExistsError') {
    //                 res.status(409)
    //                 res.json({
    //                     error: err.message
    //                 });
    //             } else {
    //                 res.status(500);
    //                 res.json({
    //                     error: err
    //                 });
    //             }
    //         }
    //     });
    //     console.log("after the block")
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