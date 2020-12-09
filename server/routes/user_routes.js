const express = require("express");
const router = express.Router();
const {
    loginUser,
    logoutUser,
    getUsers, 
    addUser,
    deleteUser,
    getUser,
    editUser
} = require('../controllers/user_controller');
const {
    userAuthenticated,
    isAdmin,
    isMember
} = require("../utils/common_utils");

//route for user login
router.post("/login", loginUser);

//route for user logout
router.get("/logout", logoutUser);

//show all users (admin only) 
router.get("/", userAuthenticated, isAdmin, getUsers);
//  router.get("/", getUsers);

//add a new user
router.post("/", addUser);

//delete a user
router.delete("/:id", userAuthenticated, isAdmin, deleteUser);
// router.delete("/:id", deleteUser);

//show one user
router.get("/:id", userAuthenticated, getUser);
// router.get("/:id", getUser);

//edit a user
router.put("/:id", userAuthenticated, editUser);
// router.put("/:id", editUser);

module.exports = router;