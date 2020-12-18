const PotteryClass = require("../models/pottery_classes");

function getClassFromDB(id) {
  return PotteryClass.findById(id);
}

function deleteClassFromDB(id) {
  return PotteryClass.findByIdAndRemove(id);
}

function getClassesFromDB() {
  return PotteryClass.find();
}

function editClassFromDB(req) {
  console.log("req inside editClassFromDB=>", req.params.id);
  return PotteryClass.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
}

function addClassToDB(req) {
  return new PotteryClass(req.body);
}

module.exports = {
  addClassToDB,
  getClassFromDB,
  deleteClassFromDB,
  getClassesFromDB,
  editClassFromDB,
};
