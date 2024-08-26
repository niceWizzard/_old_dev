const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

function initialize(passport) {

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                User.findOne({ email }, async (err, user) => {
                    if (err) throw err;


                    if (!user) return done(null, false, { msg: "No user exists" });
                    await bcrypt.compare(password, user.password, (_err, result) => {
                        if (_err) throw _err;
                        if (result === true) {
                            return done(null, user);
                        } else {
                            return done(null, false, { msg: "wrong password" });
                        }
                    })
                })
            }
        )
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const { email, createdAt, id, updatedAt, username } = user
            const userInfo = {
                email, createdAt, updatedAt, id, username
            }

            cb(err, userInfo)
        })
    })


}

module.exports = initialize;