const passport = require("passport");
const User = require('../models/user')

const {
  userExists,
  addUserToDB,
  getUserFromDB,
  deleteUserFromDB,
  getUsersFromDB,
  editUserFromDB,
} = require("../utils/user_utilities");

const logoutUser = function (req, res) {
  req.session.destroy(() => {
    console.log("logged out user");
    console.log("session object:", req.session);
    console.log("req.user:", req.user);
    res.sendStatus(200);
  });
};

// helper functions
const authenticate = passport.authenticate("local");

async function loginUser(req, res, next) {
  console.log("in loginUser");
  // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success
  const loginFunc = passport.authenticate("local");
  // console.log(req.user)
  await loginFunc(req, res, next);
}

function sendUser(req, res) {
  console.log(req.user);
  res.json({
    user: req.user,
    sessionID: req.sessionID,
  });
}

function getUsers(req, res) {
  getUsersFromDB(req).exec((err, users) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(users);
    }
  });
}

function addUser(req, res) {
  addUserToDB(req).save((err, user) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    //after creating the user, login the user
    console.log("finished add user, logging in");
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else sendUser(req, res);
    });
  });
}

function deleteUser(req, res) {
  deleteUserFromDB(req.params.id).exec((err) => {
    if (err) {
      res.status(500);
      res.json({
        error: err.message,
      });
    }
    res.sendStatus(204);
  });
}

function getUser(req, res) {
  getUserFromDB(req.params.id).exec((err, user) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(user);
    }
  });
}
const authToChange = async function (req) {
  console.log("in authToChange")
  const userToChange = await User.findById(req.params.id)
  console.log ("userToChange.role=",userToChange.role)
  console.log ("userToChange.paid=",userToChange.paid)
  console.log ("req.body.role=",req.body.role)
  console.log ("req.body.paid=",req.body.paid)
  // check if requesting user is admin
  if (req.user.role === "Admin") {
    return true;
  } else {
    // if not admin, then check if role or paid has changed
    if (userToChange.role != req.body.role || userToChange.paid != req.body.paid) {
      return false;
    } else {
      return true;
    };
  };
};

async function editUser(req, res) {
  if (await authToChange(req)) {
    console.log("inside editUser, authToChange = ", await authToChange(req))
    editUserFromDB(req).exec((err, user) => {
      if (err) {
        res.status(500);
        res.json({
          error: err.message,
        });
      } else {
        res.status(200);
        res.send(user);
      }
    });
  } else {
    res.status(404);
    res.json({
      error: "Not authorised to update this field",
    });
  };
};

module.exports = {
  sendUser,
  loginUser,
  logoutUser,
  getUsers,
  addUser,
  deleteUser,
  getUser,
  editUser,
};