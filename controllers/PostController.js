import PostModel from '../models/Post.js';


export const getAll = async (req, res) => {
	try {
		//Связываем пользователя  при получение поста
		const posts = await PostModel.find().populate('user').exec();
		res.json(posts);
	}
	catch(e) {
		console.log('e:', e);
		res.status(500).json({
								 message: 'Не удалось получить статьи'
							 });
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;
		PostModel.findOneAndUpdate({
									   _id: postId,
								   },
								   {
									   $inc: {viewsCount: 1}
								   },
								   {
									   returnDocument: 'after',
								   }, (err, doc) => {
				if (err) {
					console.log('err:', err);
					return res.status(500).json({
													message: 'Не удалось вернуть  статью',
												});
				}
				if (!doc) {
					return res.status(404).json({
													message: 'not found post',
												});
				}
				res.json(doc);
			});


	}
	catch(e) {
		console.log('e:', e);
		res.status(500).json({
								 message: 'Не удалось получить статьи'
							 });
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.param.id;
		console.log('postId:',req.param);
		PostModel.findOneAndDelete({
			_id:postId,
								   },(err,doc)=>{
			if(err){
				console.log('e:', err);
			return 	res.status(500).json({
										 message: 'Не удалось удалить статьи'
									 });
			}
			console.log('doc',doc);
			if (!doc){
				return res.status(404).json({
					message:'Статья не найдена'
											})
			};
			res.json({
				message:'success'
					 });
		});
	}
	catch(e) {
		console.log('e:', e);
		res.status(500).json({
								 message: 'Не удалось получить статьи'
							 });
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
									  title: req.body.title,
									  text: req.body.text,
									  imageUrl: req.body.imageUrl,
									  tags: req.body.tags,
									  user: req.userId,
								  });
		const post = await doc.save();

		res.json(post);

	}
	catch(e) {
		console.log('e:', e);
		res.status(500).json({
								 message: 'Не удалось создать пост'
							 });
	}
};
