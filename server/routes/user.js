const express = require('express');
const router = express.Router();
var User = require('../models/User');
var jwt = require('jsonwebtoken');

router.get('/', (err, res)=>{
  res.render('index');
});

router.get('/register', (err, res) => {
	res.render('index');
});

router.get('/login', (err, res) => {
	res.render('index');
});

router.post('/login', (req, res, next) => {
	console.log(req.body, 'this is body');
	User.findOne({email: req.body.email}, (err, user) => {
		console.log(err, user, 'this is freaking user found in DB');
		if(err) return  res.status(500).redirect('/users/login');
		if(!user) return res.status(400).send('User NOT found. Please try again!');

		user.comparePassword(req.body.password, (err, isMatch) => {
			console.log(err, isMatch);
			if(err) return res.status(500).next(err);
			if(!isMatch) return res.status(400).send('Incorrect Password. Please try again!');
			console.log(user, 'this is user within ComparePassword');
			const token = jwt.sign({
				email: user.email,
				userId: user._id,
			},
			'thisisfreakingawesome',
			{
				expiresIn: "1h"
			}
			);

			console.log('login success');
			return res.status(200).json({
				message: 'Auth successfull',
				token: token
			});
			// res.redirect('/');
		});
	});
});

router.post('/register', (req, res, next) => {
	console.log(req.body, 'this is body');
	User.findOne({email: req.body.email})
	.exec()
	.then(user => {
		if(user) {
			return res.status(409).json({
				message: 'Email already exists! please try with a different email.'
			});
		} else {
			var newUser = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			}
			User.create(newUser, (err, user) => {
				if(err) return res.redirect('/users/register');
				console.log(user);
				res.redirect('/users/login');
			});
		}
	})
});

module.exports = router;
	

