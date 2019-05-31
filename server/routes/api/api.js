const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

const orgController = require('../../controllers/orgController');

const middleware = require('../../middleware')


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
		// console.log(file, 'this is inside fileName under Storage');
	}
})

// function check(req,res,next){
// 	console.log('Check', req.headers);
// 	next()
// }

var upload = multer({ storage: storage });

//Login Form Submit 
router.post('/user/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

//CreateOrg page submit
router.post('/user/org' ,upload.single('file'), orgController.createOrg);

router.get('/user/verify', middleware.isLoggedIn ,userController.user )

module.exports =router;