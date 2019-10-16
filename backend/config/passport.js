const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user');


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, (req, userName, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message:'user Name is already in use'});
        }
        const newUser = new User();
        newUser.userName = userName;
        newUser.password = password;
    });
}))