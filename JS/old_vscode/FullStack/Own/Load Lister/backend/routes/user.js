const router = require('express').Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const passport = require('passport');
const List = require('../models/list.model');
const { isAuth, isNotAuth, checkFields } = require('./functions')



// -------------------------------------------------------------- GET Requests ---------------------------------------------------------------------------------
router.get("/user", isAuth, (req, res) => {
    res.json({ type: 1, user: req.user }); // The req.user stores the entire user that has been authenticated inside of it.
});


// -------------------------------------------------------------- POST --------------------------------------------------------------

router.post('/user', isAuth, async (req, res) => {
    const { data: sentUser } = req.body
    const obj = Object.keys(sentUser)
    const test = ['globe', 'smart', 'multiplier']
    let valid = true
    obj.forEach((key) => {
        if (!sentUser[key]) {
            valid = false
        }
    })
    if (!valid) return res.json({ type: -1, message: 'Insufficient Fields' })


    if (!(compareArray(obj, test))) return res.json({ type: -1, message: 'Too much fields' })

    try {
        console.log(sentUser)
        const newUser = await User.findByIdAndUpdate(req.user.id, { ...sentUser }, { new: true })

        return res.json({ type: 1, user: newUser })
    } catch (err) {
        console.log(err)
        return res.json({ type: -1, message: err.message })
    }

})

router.post("/login", isNotAuth, (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({ type: -1, message: info.message });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                return res.json({ type: 1, message: '"Successfully Authenticated"' });
            });
        }
    })(req, res, next);
});



router.post("/register", checkFields, async (req, res) => {
    const { username, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        })
        await newUser.save()
        return res.json({ type: 1, message: 'Account Created. Please Login.' })
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ type: -1, message: 'Username already taken' })
        }
        console.log("ERROR", err)
        return res.json({ type: -1, message: err.message })
    }
});


// -------------------------------------------------------------- DELETE --------------------------------------------------------------

router.delete('/user', isAuth, (req, res) => {
    try {
        req.logOut()
        return res.json({ type: 1, message: 'Logout Successful' })
    } catch (err) {
        console.log(err)
        return res.json({ type: -1, message: err.message })
    }
})



// -------------------------------------------------------------- FUNCTIONS --------------------------------------------------------------

function compareArray(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}


module.exports = router;