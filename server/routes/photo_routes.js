const express = require("express");
const router = express.Router();
const {
    getPhotos, 
    addPhoto,
    deletePhoto,
    getPhoto
} = require("../controllers/photo_controller.js");
const {
    userAuthenticated,
    isAdmin
} = require("../utils/common_utils");

// list all Photos
router.get("/", getPhotos)

//add one Photo
router.post("/",userAuthenticated, isAdmin, addPhoto)

//get one Photo
router.get("/:id", getPhoto)

//delete one Photo
router.delete("/:id",userAuthenticated, isAdmin, deletePhoto)

module.exports = router;