const PotteryClass = require("../models/photo")

function getPhotoFromDB(id) {
    return PotteryClass.findById(id);
};


function deletePhotoFromDB(id) {
    return PotteryClass.findByIdAndRemove(id);
};

function getPhotosFromDB() {
    return PotteryClass.find();
};


function addPhotoToDB(req) {
    return new PotteryClass(req.body);
};

module.exports = {
    addPhotoToDB,
    getPhotoFromDB,
    deletePhotoFromDB,
    getPhotosFromDB
}