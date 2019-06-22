const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const orgController = require('../../controllers/orgController');

var userRouter = require('../user');

//handle Image File Upload 
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

//handle Invitation Email Post request
router.post('/users/org/invite', orgController.sendInvites);

//handle Teammate Post Saver request
router.post('/users/posts', userController.verifyToken, userController.savePosts)

//token verify 
router.get('/users/verify', userController.verifyToken)

//Handle Teammate Posts get request
router.get('/users/:id/posts', userController.userposts)

//Handle request for fetching all Org Posts
router.get('/users/org/:id/posts', orgController.getOrgPosts)

router.use('/users', userRouter);

module.exports = router;