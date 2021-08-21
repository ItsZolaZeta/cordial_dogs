const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require('bcryptjs');

const verifyCallback = (username, password, done) => {

    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }

            bcrypt.compare(password, user.hashed_password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, {message : "Incorrect password"});
                }
            });

        })
        .catch((err) => {
            done(err);
        });

}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});