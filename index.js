import express from 'express';
import mongoose from "mongoose";

import {registerValidation,loginValidation,postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose.connect(`mongodb+srv://Erilmarion:a4tech@cluster0.28zeuxd.mongodb.net/blog?retryWrites=true&w=majority`)
	.then(() => console.log('DB ok'))
	.catch(err => console.log(err))
const app = express();

app.use(express.json());
const PORT = 3500;


app.get('/', (req, res) => {
	res.send('Hello World22!')
})

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register)



app.get('/posts',  PostController.getAll);
app.get('/posts/:id',  PostController.getOne);
app.post('/posts',checkAuth,postCreateValidation,  PostController.create);
// app.post('/posts',  PostController.remove);
// app.path('/posts',  PostController.update);







app.listen(PORT, (err) => {
	if (err) {
		return console.log('server error: ', err);
	}
	console.log(`Example app listening on port ${PORT}`)
})
