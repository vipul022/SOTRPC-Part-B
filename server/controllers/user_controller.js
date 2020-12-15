const passport = require('passport');
// const User = require('../models/user')

const {
    userExists,
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB
} = require("../utils/user_utilities");



const logoutUser = function (req, res) {
    req.session.destroy(() => {
        console.log('logged out user');
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.sendStatus(200);
    });

}

// helper functions
const authenticate = passport.authenticate('local');

async function loginUser(req, res, next) {
    console.log("in loginUser")
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success  
    const loginFunc = passport.authenticate('local')
    // console.log(req.user)
    await loginFunc(req, res, next)
}

function sendUser(req, res) {
    console.log(req.user)
    res.json({
        user: req.user,
        sessionID: req.sessionID
    });
}

function getUsers(req, res) {
    getUsersFromDB(req).exec((err, users) => {
        if (err) {
            res.status(404)
            res.json({
                error: err.message
            })
        } else {
            res.status(200)
            res.send(users)
        }
    })
};


function addUser(req, res) {     
    addUserToDB(req).save((err, user) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                });
            }
            //after creating the user, login the user
            console.log('finished add user, logging in')
            req.login(user, (err) => {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else sendUser(req, res)
            });
    });
};

function deleteUser(req, res) {
    deleteUserFromDB(req.params.id).exec(err => {
        if (err) {
            res.status(500)
            res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
};

function getUser(req, res) {
    getUserFromDB(req.params.id).exec((err, user) => {
        if (err) {
            res.status(404)
            res.json({
                error: err.message
            })
        } else {
            res.status(200)
            res.send(user)
        }
    })
};

function editUser(req, res) {
    editUserFromDB(req).exec((err, user) => {
        if (err) {
            res.status(500)
            res.json({
                error: err.message
            })
        } else {
            res.status(200)
            res.send(user)
        }
    })
};

module.exports = {
    sendUser,
    loginUser,
    logoutUser,
    getUsers,
    addUser,
    deleteUser,
    getUser,
    editUser
}