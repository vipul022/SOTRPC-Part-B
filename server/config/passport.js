// const LocalStrategy = require("passport-local");
// const passport = require("passport");
// const User = require('../models/user')

// passport.serializeUser((user, done) => {
//     done(null, user._id)
// })

// passport.deserializeUser((userId, done) => {
//     User.findById(userId)
//     .then((user) => done(null, user))
//     .catch(done)
// })

// const canLogin = (user, password) => {
//     if(user){
//         return user.verifyPasswordSync(password) // mongoose-bcrypt function
//     } else {
//         return false
//     }
// }

// const verifyCallback = (email, password, done) => {
//     User.findOne({email})
//     .then((user) => {
//         if(canLogin(user, password)){
//             return done(null, user)
//         } else {
//             return done(null, false)
//         }
//     })
//     .catch(done)
// }

// const fields = { usernameField: "email", passwordField: 'password', passReqToCallback: true}

// passport.use(new LocalStrategy(fields, verifyCallback))

const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require('../models/user');

// passport.use(User.createStrategy());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

