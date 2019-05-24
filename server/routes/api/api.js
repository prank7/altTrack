const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', (req, res) => {
	res.json({message: 'welcome to API'});
});

//Login Form Submit 
router.post('/users/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

module.exports =router;