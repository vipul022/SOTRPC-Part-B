const {
    addUserToDB} = require("../utils/user_utilities");



function loginUser(req, res) {
    res.send("got your loginUser request")
};

function logoutUser(req, res) {
    res.send("got your logoutUser request")
};

function showUsers(req, res) {
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
    res.send("got your deleteUser request")
};

function showUser(req, res) {
    res.send("got your showUser request")
};

function editUser(req, res) {
    res.send("got your editUser request")
};

module.exports = {
    loginUser,
    logoutUser,
    showUsers,
    addUser,
    deleteUser,
    showUser,
    editUser
}