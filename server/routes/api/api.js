const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

const orgController = require('../../controllers/orgController');

//Login Form Submit 
router.post('/users/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

//CreateOrg page submit
router.post('/users/org', orgController.createOrg)

module.exports =router;