const express = require('express');
const router = express.Router();
var Org = require('../models/Org');
var Teammate = require('../models/Teammate');

var userController = require('../controllers/userController');

//render register page
router.get('/register', (req, res) => {
	res.render('index');
});

router.get('/register/verify/:id', (req, res) => {
	Teammate.findOne({refCode: req.params.id})
	.exec()
	.then(foundTeammate => {
		if(!foundTeammate) return res.status(500).json({
			success: false,
			message: 'Invited User Not Found!'
		})
		if(foundTeammate) return res.status(200).json({
			success: true,
			foundTeammate
		});
	});
});

//render login page
router.get('/login', (req, res) => {
	res.render('index');
});

//get org page
router.get('/org', (req, res) => {
	res.render('index');
});

//render teammate invite box
router.get('/org/invite', (req, res) => {
	res.render('index');
});

//gets list of all existing oranizations
router.get('/orglist', (req, res) => {
	// console.log(req.body, 'request coming in OrgList');
	Org.find().exec().then((err,orgsFound) => {
		if(err) return res.status(500).json(err);
		if(!orgsFound) return res.status(200).json({
			success: true,
			message: 'There are no organizations to show.'
		})
		if(orgsFound) {
			return res.status(200).json({success:true, orgsFound }); 
		}
	})
})

//get org details page
router.get('/org/:id', (req, res) => {
	Org.findOne({_id: req.params.id})
	.populate('creator')
	.exec()
	.then(org => {
		if(!org) return res.status(500).json({
			success: false,
			message: 'Server error'
		})
		if(org) {
			Teammate.find({org: req.params.id})
			.populate('org')
			.exec()
			.then(teammate => {
				return res.status(200).json({
					success: true,
					org,
					teammate
				});
			});
		}
	});
});

module.exports = router;
