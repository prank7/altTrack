var Org = require('../models/Org');
var multer = require('multer');
var path = require('path');
var uploadPath = path.join(__dirname, '..', 'public/uploads');

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

var upload = multer({ storage: storage }).single('file');

exports.createOrg = (req, res, next) => {
	console.log(req.file, req.body, 'this is ORG body received in req');

	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		console.log(req.body, req.file, 'Printing this value inside the funciton')
		Org.findOne({ name: req.body.name })
		.exec()
		.then(foundOrg => {
			console.log(foundOrg, 'Printing the finding status')
			if (foundOrg) {
				return res.status(409).json({
					success: false,
					message: 'Name taken. Please use another name.'
				});
			} else {
				// console.log('Here in the else condition')
					var newOrg = {
						name: req.body.name,
						creator: req.body.creator,
						imageUrl: req.file.filename,
						location: req.body.location,
					}
					console.log(newOrg, 'Printing the org information')
					Org.create(newOrg, (err, createdOrg) => {
						if (!err) return res.json({
							success: true,
						});
						console.log(createdOrg, err, 'this is createdOrg');
					});
				}
			});
			// return res.status(200).send(req.file)
	})
}