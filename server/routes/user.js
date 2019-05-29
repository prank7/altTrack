const express = require('express');
const router = express.Router();
const withAuth = require('../middleware');


var userController = require('../controllers/userController');

//render register page
router.get('/register', (err, res) => {
	res.render('index');
});

//render login page
router.get('/login', (err, res) => {
	res.render('index');
});

router.get('/org', withAuth, (err, res) => {
	res.render('index');
});

module.exports = router;
	

