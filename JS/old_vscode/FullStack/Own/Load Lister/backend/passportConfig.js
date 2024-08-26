const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

function initialize(passport) {

    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false, { message: "No such user exists" });
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Invalid Password" });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            delete user._doc.password
            cb(err, user);
        });
    });


}

module.exports = initialize;