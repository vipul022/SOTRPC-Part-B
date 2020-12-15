const PotteryClass = require("../models/pottery_classes")

function getClassFromDB(id) {
    return PotteryClass.findById(id);
};


function deleteClassFromDB(id) {
    return PotteryClass.findByIdAndRemove(id);
};

function getClassesFromDB() {
    return PotteryClass.find();
};

function editClassFromDB(req) {
    return PotteryClass.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
};

function addClassToDB(req) {
    return new PotteryClass(req.body);
};

module.exports = {
    addClassToDB,
    getClassFromDB,
    deleteClassFromDB,
    getClassesFromDB,
    editClassFromDB
}