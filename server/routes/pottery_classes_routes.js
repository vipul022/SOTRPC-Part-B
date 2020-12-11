const express = require("express");
const router = express.Router();
const {
    getClasses, 
    addClass,
    deleteClass,
    getClass,
    editClass
} = require("../controllers/pottery_classes_controller.js");
const {
    userAuthenticated,
    isAdmin,
    isOwnUserOrAdmin
} = require("../utils/common_utils");

// list all classes
router.get("/", getClasses)

//add one class
router.post("/",userAuthenticated, isAdmin, addClass)

//get one class
router.get("/:id", getClass)

//edit one class
router.put("/:id",userAuthenticated, isAdmin, editClass)

//delete one class
router.delete("/:id",userAuthenticated, isAdmin, deleteClass)


module.exports = router;






// //route for user login
// router.post("/login", loginUser);

// //route for user logout
// router.get("/logout", logoutUser);

// //show all users (admin only) 
// router.get("/", userAuthenticated, isAdmin, getUsers);
// //  router.get("/", getUsers);

// //add a new user
// router.post("/", addUser);

// //delete a user
// router.delete("/:id", userAuthenticated, isOwnUserOrAdmin, deleteUser);
// // router.delete("/:id", deleteUser);

// //show one user
// router.get("/:id", userAuthenticated, isOwnUserOrAdmin, getUser);
// // router.get("/:id", getUser);

// //edit a user
// router.put("/:id", userAuthenticated, isOwnUserOrAdmin, editUser); // ***change to this route AFTER creating first admin account and for rest of production
// // router.put("/:id", userAuthenticated, editUser); // *** Change to this route to create the first admin account when setting up

