var User = require('../models/User');
var jwt = require('jsonwebtoken');
var Teammate = require('../models/Teammate');
var Post = require('../models/Post');


exports.loginUser = (req, res, next) => {
	User.findOne({email: req.body.email}, (err, user) => {
		if(err) return  res.status(500).json({
			success: false,
			message: 'encountered error',
		});
		if(!user) return res.status(400).send('User NOT found. Please try again!');

		user.comparePassword(req.body.password, (err, isMatch) => {
			if(err) return res.status(500).next(err);
			if(!isMatch) return res.status(400).send('Incorrect Password. Please try again!');

			const token = jwt.sign({
				email: user.email,
				userId: user._id,
			},
			'thisisfreakingawesome',
			{
				expiresIn: "12h"
			}
			);

			console.log('login success');
			return res.status(200).json({
				message: 'Auth successfull',
				token: token,
				email: user.email,
				name: user.name,
				userId: user._id,
			});
		});
	});
}

exports.registerUser = (req, res) => {
	console.log(req.body, 'this is req body in registerUser');
	User.findOne({email: req.body.email})
	.exec()
	.then(user => {
		if(user) {
			return res.status(409).json({
				success : false,
				message: 'Email already exists! please try with a different email.'
			});
		} else {
			var newUser = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			}
			User.create(newUser, (err, user) => {
				console.log(user, 'this is registered user');
				if(err) return res.status(500).json({
					success: false,
					message: 'Server Error'
				})
				if(user && req.body.isInvited) {
					Teammate.findOneAndUpdate({teammateEmail: req.body.email}, {isVerified: req.body.isInvited}, (err, updatedTeammate) => {
						if(err) return res.status(500).json({
							success: false,
							message: 'Unable to update the invited Teammate!'
						})
						if(updatedTeammate) return res.status(200).json({
							success: true,
							message: 'Invited teammate registered successfully'
						})
					})
				} else return res.json({
					success: true,
					message: 'registration successfull'
				});
			});
		}
	});
}

exports.verifyToken = (req, res, next) => {
	var token = req.headers.authorization.split(' ')[1];
	console.log(token, 'thisis verifyToken');
	jwt.verify(token, 'thisisfreakingawesome', (err, decoded) => {
		if(err) return res.status(500).json(err);
		console.log(decoded, 'this is decoded');
		if(decoded) {
			req.headers.user = decoded;
			console.log(req.headers.user, 'this is headers.user');
			next();
		}
	})
}

exports.savePosts = (req, res) => {
	var newPost = {
		didToday: req.body.didToday,
		learnedToday: req.body.learnedToday,
		user: req.headers.user.userId,
	}

	Post.create(newPost, (err, post) => {
		if(err) res.status(500).json({
			success: false,
			message: 'Unable to create Post. Server Error.'
		})

		if(post) {
			User.findOneAndUpdate({_id: req.headers.user.userId}, {$push: {posts: post._id}})
			.exec((err, updatedUser) => {
				console.log(updatedUser, 'thisis updatedUser');

				if(err) return res.status(500).json(err);

				if(updatedUser) res.status(200).json({
					success: true,
					message: 'Post created successfully',
				})
			})
		}
	});
}

exports.userposts = (req, res) => {

}