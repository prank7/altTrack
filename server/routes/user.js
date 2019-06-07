const express = require('express');
const router = express.Router();
// const withAuth = require('../middleware');
var Org = require('../models/Org');

var userController = require('../controllers/userController');

//render register page
router.get('/register', (req, res) => {
	res.render('index');
});

//render login page
router.get('/login', (req, res) => {
	res.render('index');
});

router.get('/org', (req, res) => {
	res.render('index');
});

router.get('/org/invite', (req, res) => {
	res.render('index');
})

//gets list of all existing oranizations
router.get('/orglist', (req, res) => {
	console.log('request received in OrgList');
	Org.find().exec().then(orgsFound => {
		if(orgsFound) return res.status(200).json({
			success:true,
			orgsFound
		})
	})
})

// router.get('/org/:id', (req, res) => {
// 	Org.findOne({_id: req.params.id}, (err, org) => {
// 		if(err) return res.status(500).json({
// 			success: false,
// 			message: 'Server error'
// 		})
// 		if(org) return res.status(200).json({
// 			success: true,
// 			org
// 		})
// 	})
// })

router.get('/org/:id', (req, res) => {
	Org.findOne({_id: req.params.id})
	.populate('creator')
	.exec()
	.then(org => {
		if(org) return res.status(200).json({
			success: true,
			org
		})
	})
})

module.exports = router;
	
