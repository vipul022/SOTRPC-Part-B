const passport = require('passport');

const {
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB} = require("../utils/user_utilities");



    const logoutUser = function (req, res) {
        req.logout();
        console.log('logged out user');
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.sendStatus(200);
    }
    
    // helper functions
    const authenticate = passport.authenticate('local');
    function loginUser(req, res) {
        console.log("in loginUser")
        // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    
        authenticate(req, res, function () {
            console.log('authenticated', req.user.name);
            console.log('session object:', req.session);
            console.log('req.user:', req.user);
            console.log('session ID:', req.sessionID);
            res.status(200);
            res.json({user: req.user, sessionID: req.sessionID});
        });
    }

function getUsers(req, res) {
    getUsersFromDB(req).exec((err, users) => {
        if (err) {
            res.status(404)
            res.send("Users not found")
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
            res.json({
                error: err.message
            });
        } else {
            res.status(201);
            res.send(user);

            // login user
            loginUser(req, res)
        }
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
                res.send("User not found")
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
    loginUser,
    logoutUser,
    getUsers,
    addUser,
    deleteUser,
    getUser,
    editUser
}