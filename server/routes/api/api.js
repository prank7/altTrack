const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

const orgController = require('../../controllers/orgController');


// var multer  = require('multer');

// var path = require('path');
// var uploadPath = path.join(__dirname, '../..', 'public/uploads' );

// console.log(__dirname, 'this is DIR name');
// console.log(uploadPath, 'this is uploadPath');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath)
//   },
//   filename: function (req, file, cb) {
//     //ensure the fileName is not repeated. So, added Date.now()
//     cb(null, Date.now() + '-' + file.originalname)
//     // console.log(file, 'this is inside fileName under Storage');
//   }
// })

// var upload = multer({ storage: storage })

//Login Form Submit 
router.post('/users/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

//CreateOrg page submit
router.post('/users/org', orgController.createOrg);

module.exports =router;