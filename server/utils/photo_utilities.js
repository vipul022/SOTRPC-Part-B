const Photo = require("../models/photo")

function getPhotoFromDB(id) {
    return Photo.findById(id);
};


function deletePhotoFromDB(id) {
    return Photo.findByIdAndRemove(id);
};

function getPhotosFromDB() {
    return Photo.find();
};


function addPhotoToDB(req) {
    return new Photo(req.body);
};

module.exports = {
    addPhotoToDB,
    getPhotoFromDB,
    deletePhotoFromDB,
    getPhotosFromDB
}