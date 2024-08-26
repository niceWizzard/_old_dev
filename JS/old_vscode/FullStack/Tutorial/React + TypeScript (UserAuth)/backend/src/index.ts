import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from './models/User';
import { UserInterface } from './interfaces/User.interface'


const PORT = 3000
const URL = 'http://localhost:'

const localStrategy = passport.Strategy;


mongoose.connect('mongodb+srv://richard1234:richard1234@firstuserauth.c8lfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err: Error) => {
    if (err) throw err
    console.log("Connected to MONGODB !!!")
})

// Middleware

const app = express();
app.use(express.json());
app.use(cors({ origin: URL + PORT, credentials: true }))
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session())

// Passport


passport.use(new localStrategy((username: string, password: string, done) => {
    User.findOne({ username: username }, (err, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result: boolean) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
})
);



// Routes
app.post('/register', async (req: Request, res: Response) => {

    const { username, password } = req?.body

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        res.send('invalid values')
    }

    User.findOne({ username }, async (err: Error, doc: UserInterface) => {
        if (err) throw err;
        if (doc) res.send('User already exist');
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })

            await newUser.save();
            res.send("USER ADDED!")
        }
    })


})







app.listen(4000, () => {
    console.log("Server RUnning!")
})
