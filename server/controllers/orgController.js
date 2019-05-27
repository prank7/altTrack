var Org = require('../models/Org');

exports.createOrg = (req, res, next) => {
	console.log(req.body);
	
	Org.findOne({name: req.body.name})
	.exec()
	.then(foundOrg => {
		if(foundOrg) {
			return res.status(409).json({
				success: false,
				message: 'Name taken. Please use another name.'
			});
		} else {
			var newOrg = {
				name: req.body.name,
				creator: req.body.email,
				imageUrl: req.body.image,
				location: req.body.location,
			}
			Org.create(newOrg, (err, createdOrg) => {
				if(!err) return res.json({
					success: true,
				});
				console.log(createdOrg, 'this is createdOrg');
			});
		}
	});
}