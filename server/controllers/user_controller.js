
    
function loginUser(req, res) {
    res.send("got your loginUser request")
}
function logoutUser(req, res) {
    res.send("got your logoutUser request")
}
function showUsers(req, res) {
    res.send("got your showUsers request")
}
function addUser(req, res) {
    res.send("got your addUser request")
}
function deleteUser(req, res) {
    res.send("got your deleteUser request")
}
function showUser(req, res) {
    res.send("got your showUser request")
}
function editUser(req, res) {
    res.send("got your editUser request")
}

module.exports = {
    loginUser,
    logoutUser,
    showUsers, 
    addUser,
    deleteUser,
    showUser,
    editUser
}
