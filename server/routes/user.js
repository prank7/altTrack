const express = require('express');
const router = express.Router();
// const withAuth = require('../middleware');
var Org = require('../models/Org');

var userController = require('../controllers/userController');

//render register page
router.get('/register', (err, res) => {
	res.render('index');
});

//render login page
router.get('/login', (err, res) => {
	res.render('index');
});

router.get('/org', (err, res) => {
	res.render('index');
});

router.get('/orgdetails', (err, res) => {
	console.log('request comes to orgdetails');
	if(err) return console.log(err);
	Org.find({})
	.populate('creator')
	.exec()
	.then(foundOrgs => {
		console.log(foundOrgs, 'All orgs created by logged in User');
		if(foundOrgs) return res.status(200).json({
			success: true,
			foundOrgs
		})
	})
});

module.exports = router;
	

