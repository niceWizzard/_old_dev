require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log('')
        console.log('Connected to mongoose!')
        console.log('')
    })

// ------------------------------------------------------ Middlewares ------------------------------------------------------
app.use(require('cors')({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(cookieParser(process.env.SESSION_SECRET))

require('./passportConfig')(passport);
app.use(passport.initialize())
app.use(passport.session());




// ------------------------------------------------------ Routes ------------------------------------------------------
app.use('/users', require('./routes/users.route'));
app.use('/blogs', require('./routes/blogs.route'))




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('RUnning on port ' + PORT)
})
