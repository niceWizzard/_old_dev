const express = require('express')
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const User = require('./user.model')

mongoose.connect('mongodb+srv://richard1234:richard1234@firstuserauth.c8lfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log('')
        console.log('Connected to mongoose!')
        console.log('')

    })

// -------------------------------------------------------- Middlewares ---------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))

app.use(cookieParser('secret'))
app.use(passport.initialize())
app.use(passport.session());
require('./passportConfig')(passport);



// ROutes
app.post('/login', isLoginned, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Loginned");
            });
        }
    })(req, res, next);
})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username }, async (err, doc) => {
        if (err) throw err
        if (doc) res.send('User already exists')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                password: hashedPassword
            })
            await newUser.save()
            res.send('User created')
        }
    })
})

app.get('/user', (req, res) => {
    if (req.user) {
        return res.send(req.user)
    }
    res.json({ msg: 'No user loginned' })

})

app.post('/user', (req, res) => {
    req.logOut();
    res.send('Log out!')
})


app.listen(4000, () => {
    console.log('Server running in port 4000!')
})


function isLoginned(req, res, next) {
    if (req.user) {
        console.log('')
        if (req.user?.username !== req.body.username) {
            return res.send('Logout the existing user first.')
        }
        return res.send('Already login')
    }


    return next();
}