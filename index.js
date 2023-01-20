import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js";
import UserModel from './models/User.js'

mongoose.connect(`mongodb+srv://Erilmarion:a4tech@cluster0.28zeuxd.mongodb.net/blog?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch(err => console.log(err))
const app = express();

app.use(express.json());
const PORT = 3500;


app.get('/', (req, res) => {
    res.send('Hello World22!')
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash:hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id:user._id,
        },'secret123',{
            expiresIn:'30d',
        })
        const {passwordHash,...userData} = user._doc;

        res.json({
           ...userData,
            token
        });
    } catch (e) {
        console.log('err', e);
        res.json({
            message: "Не удалось зарегистрироваться"
        })
    }
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log('server error: ', err);
    }
    console.log(`Example app listening on port ${PORT}`)
})
