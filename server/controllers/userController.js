var User = require('../models/User');
var jwt = require('jsonwebtoken');
var Teammate = require('../models/Teammate');


exports.loginUser = (req, res, next) => {
	// console.log(req.body, 'this is body');
	User.findOne({email: req.body.email}, (err, user) => {
		// console.log(err, user, 'this is freaking user found in DB');
		if(err) return  res.status(500).json({
			success: false,
			message: 'encountered error',
		});
		if(!user) return res.status(400).send('User NOT found. Please try again!');

		user.comparePassword(req.body.password, (err, isMatch) => {
			// console.log(err, isMatch);
			if(err) return res.status(500).next(err);
			if(!isMatch) return res.status(400).send('Incorrect Password. Please try again!');
			// console.log(user, 'this is user within ComparePassword');
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

// exports.user = (req,res) => {
// 	User.findById(req.params.id,{ password : 0 },(err,data) => {
// 		if(err){
// 			res.status(404).send({message: "user not found"})
// 		}
// 		res.send(data);
// 	})
// }
