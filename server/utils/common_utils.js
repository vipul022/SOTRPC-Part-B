
const hasPaid = function (paid) {
    return paid === 'paid' || paid === 'awaiting';
}

const isMember = function (req, res, next) {
    if (req.user.role === 'member'&& hasPaid(req.user.paid)) return next();
    else res.sendStatus(403);
}


const isAdmin = function (req, res, next) {
    if (req.user.role === 'admin' && hasPaid(req.user.paid)) return next();
    else res.sendStatus(403);
}


const userAuthenticated = function (req, res, next) {
    console.log("in userAuthenticated got req.user", req.user)
    console.log("in userAuthenticated got req.session", req.session)
    console.log("in userAuthenticated got req.sessionID", req.sessionID)
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    isAdmin,
    isMember,
    userAuthenticated
};