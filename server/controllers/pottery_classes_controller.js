const {
  addClassToDB,
  getClassFromDB,
  deleteClassFromDB,
  getClassesFromDB,
  editClassFromDB,
} = require("../utils/pottery_classes_utilities");

const addClass = function (req, res) {
  console.log("inside addClass=>");
  addClassToDB(req).save((err, pottery_class) => {
    if (err) {
      res.status(500);
      res.json({
        error: err.message,
      });
    }
    res.status(201);
    res.send(pottery_class);
  });
};

function getClasses(req, res) {
  getClassesFromDB().exec((err, classes) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(classes);
    }
  });
}

function deleteClass(req, res) {
  console.log("req.params.id->", req.params.id);
  deleteClassFromDB(req.params.id).exec((err) => {
    if (err) {
      res.status(500);
      res.json({
        error: err.message,
      });
    }
    res.sendStatus(204);
  });
}

function getClass(req, res) {
  getClassFromDB(req.params.id).exec((err, pottery_class) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(pottery_class);
    }
  });
}

function editClass(req, res) {
  editClassFromDB(req).exec((err, pottery_class) => {
    if (err) {
      res.status(500);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(pottery_class);
    }
  });
}

module.exports = {
  getClasses,
  addClass,
  deleteClass,
  getClass,
  editClass,
};
