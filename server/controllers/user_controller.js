const UserModel = require("../models/user")

function loginUser(req, res) {
    res.send("got your loginUser request")
};

function logoutUser(req, res) {
    res.send("got your logoutUser request")
};

function showUsers(req, res) {
    res.send("got your showUsers request")
};

async function addUser (req, res) {
    // res.send("got your addUser request")
    res.json(req.body);
    const {
        name,
        address,
        phone,
        email,
        password
    } = req.body;
    const user = await UserModel.create({
        name,
        address,
        phone,
        email,
        password
    })

    // Attach user to session
    req.session.user = user;
    console.log(req.session.user)
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