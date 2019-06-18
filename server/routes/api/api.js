const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

const orgController = require('../../controllers/orgController');

var userRouter = require('../user');


var multer = require('multer');
var path = require('path');
var uploadPath = path.join(__dirname, '../..', 'public/uploads');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		//ensure the fileName is not repeated. So, added Date.now()
		cb(null, Date.now() + '-' + file.originalname)
	}
})

var upload = multer({ storage: storage });

//Login Form Submit 
router.post('/users/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

//CreateOrg page submit
router.post('/users/org', userController.verifyToken, upload.single('file'), orgController.createOrg);

router.post('/users/org/invite', orgController.sendInvites);

router.post('/users/posts', userController.verifyToken, userController.savePosts)

router.get('/users/verify', userController.verifyToken)

router.get('/users/posts', userController.userposts)

// router.use('/users', userRouter);

module.exports = router;