const {
    addUserToDB,
    getUserFromDB,
    deleteUserFromDB,
    getUsersFromDB,
    editUserFromDB} = require("../utils/user_utilities");



function loginUser(req, res) {
    res.send("got your loginUser request")
};

function logoutUser(req, res) {
    res.send("got your logoutUser request")
};

function getUsers(req, res) {
    res.send("got your showUsers request")
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

            // Attach user to session
            req.session.user = user;
            console.log(req.session.user)
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
        // execute the query from getPostById
        getUserFromDB(req.params.id).exec((err, user) => {
            if (err) {
                res.status(404)
                res.send("User not found")
            } else {
            res.send(user)
            }
        })
};

function editUser(req, res) {
    res.send("got your editUser request")
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