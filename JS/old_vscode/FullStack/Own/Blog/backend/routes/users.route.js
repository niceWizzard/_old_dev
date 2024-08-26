const router = require('express').Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const passport = require('passport');


// ------------------------------------------------- GET ------------------------------------------------------
router.get('/', async (req, res) => {

    const users = await User.find();
    res.send(users.map(({ _doc: { password, ...doc } }) => {
        return doc
    }))

});

router.get('/get', (req, res) => {
    res.send(req.user)
})

router.get('/:id', getUserById, (req, res) => {

    res.send(res.middleware.user)
})



//------------------------------------------------- POST -------------------------------------------------
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        username, password: hashedPassword, email,
    })

    console.log(username + ' Saving to database')

    newUser.save()
        .then(() => {
            console.log("SAVED!")
            return res.send('USER SAVED!')

        })
        .catch((err) => {
            if (err.code === 11000) {
                return res.send('User already exists')
            }
        })
})

router.post('/login', checkIsAuthenticated, (req, res, next) => {
    console.log('Logging IN!');
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) return res.send(info.msg);
        req.logIn(user, (err) => {
            if (err) throw err;
            res.json({ isSuccessful: true })
        })
    })(req, res, next)

})

// ------------------------------------------------- DELETE -----------------------------------------------------------

router.delete('/:id', getUserById, async (req, res) => {
    try {
        await res.middleware.user.remove();
        res.send('User removed!')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})


// ----------------------------------------------- FUNCTIONS --------------------------------------------------------
async function getUserById(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send('Cannot find User')
        }
        res.middleware = { user };
        next();

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

}

function checkIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.send('You are already Loginned')
    }
    next();
}

module.exports = router;