const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')
require('dotenv').config();


const app = express();


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const store = new MongoDBStore(
    {
        uri: process.env.MONGO_URI,
        collection: 'mySessions',
        databaseName: "myFirstDatabase",

    });

store.on('error', function (error) {
    console.log(error);
});

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
    () => {
        console.log('')
        console.log('Connected to mongoose!')
        console.log('')
    }
)



// --------------------------------------------------------- Middleware ---------------------------------------
app.set('trust proxy', 1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: store,
        unset: 'destroy',
        cookie: { originalMaxAge: 1000 * 60 * 60 * 3 }
    })
);
app.use(cookieParser(SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


// -----------------------------

app.use('/api/users', require('./routes/user'))
app.use('/api/lists', require('./routes/lists.route'))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'))
    app.get('*', (req, res) => {
        res.sendFile('../client/build/index.html')
    })
} else {
    app.get('/', (req, res) => {
        res.send("SERVER RUNNIG!@")
    })
}



app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(PORT, () => {
    console.log("SERVER RUNNING on", 'http://localhost:' + PORT)
})
