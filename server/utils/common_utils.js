let User = require("../models/user")

const checkPaid = function (paid) {
    return paid === 'paid' || paid === 'awaiting';
}
const checkAdmin = function (role) {
    return role === 'admin';
};

const isMember = function (req, res, next) {
    if (req.user.role === 'member' && checkPaid(req.user.paid)) return next();
    else res.sendStatus(403);
}


const isAdmin = function (req, res, next) {
    if (checkAdmin(req.user.role) && checkPaid(req.user.paid)) return next();
    else res.send(403, { error: "Only Admin and paid up allowed." });
}

const isOwnUserOrAdmin = function (req, res, next) {
    // console.log('in isOwnUserOrAdmin')
    // console.log('req.user._id', req.user._id)
    // console.log('req.params.id', req.params.id)
    // console.log('checkAdmin', checkAdmin(req.user.role))
    // console.log("req.user._id == req.params.id", req.user._id == req.params.id)
    if (req.user._id == req.params.id || checkAdmin(req.user.role)) return next();
    else res.send(403, { error: "Only Admin or own users allowed" });
};

const userAuthenticated = function (req, res, next) {
    // console.log("in userAuthenticated got req.user", req.user)
    // console.log("in userAuthenticated got req.session", req.session)
    console.log("in userAuthenticated got req.sessionID", req.sessionID)
    const isAuthenticated = req.isAuthenticated()
    console.log("isAuthenticated=>", isAuthenticated)
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(403, { error: "Not authorised." });
    }
}
const emailNotExist = async function (req, res, next) {
    const isUser = await User.exists({email: req.body.email})
    if (isUser) {
        res.send(403, { error: "Email already exists." });
    }
    next();

}
module.exports = {
    emailNotExist,
    isAdmin,
    isMember,
    userAuthenticated,
    isOwnUserOrAdmin
};