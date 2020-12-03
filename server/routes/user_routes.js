const express = require("express");
const router = express.Router();
const {
    loginUser,
    logoutUser,
    showUsers, 
    addUser,
    deleteUser,
    showUser,
    editUser
} = require('../controllers/user_controller');

//route for user login
router.post("/login", loginUser);

//route for user logout
router.get("/logout", logoutUser);

//show all users (admin only) 
router.get("/", showUsers);

//add a new user
router.post("/", addUser);

//delete a user
router.delete("/:id", deleteUser);

//show one user
router.get("/:id", showUser);

//edit a user
router.put("/:id", editUser);

module.exports = router;