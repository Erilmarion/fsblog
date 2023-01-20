import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { UserController,PostController} from './controllers/index.js';



mongoose.connect(`mongodb+srv://Erilmarion:a4tech@cluster0.28zeuxd.mongodb.net/blog?retryWrites=true&w=majority`)
	.then(() => console.log('DB ok'))
	.catch(err => console.log(err));
const app = express();

const storage = multer.diskStorage({
	destination:(_,__,cb)=>{
	cb(null,'uploads');
	},
	filename:(_,file,cb)=>{
		cb(null,file.originalname);
	},
								   });

const upload =multer({storage});

app.use(express.json());
app.use('/uploads',express.static('uploads'));
const PORT = 3500;


app.get('/', (req, res) => {
	res.send('Hello World22!');
});
app.post('/auth/login',loginValidation,handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation,handleValidationErrors, UserController.register);

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
	res.json({
		url:`/uploads/${req.file.originalname}`
			 })
})

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation,handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth,postCreateValidation,handleValidationErrors, PostController.update);


app.listen(PORT, (err) => {
	if (err) {
		return console.log('server error: ', err);
	}
	console.log(`Example app listening on port ${PORT}`);
});
