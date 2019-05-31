var Org = require('../models/Org');

exports.createOrg = (req, res, next) => {
	Org.findOne({ name: req.body.name })
	.exec()
	.then(foundOrg => {
		console.log(foundOrg, 'This user already exists in DB.')
		if (foundOrg) {
			return res.status(409).json({
				success: false,
				message: 'Name taken. Please use another name.'
			});
		} else {
			// console.log('Here in the else condition')
				const { filename } = req.file;
				const iType = filename.split('.')[1]
				var newOrg = {
					name: req.body.name,
					creator: req.body.creator,
					imageUrl: {
						name: filename,
						imageType: `image/${iType}`
					},
					location: req.body.location,
				}
				console.log(newOrg, 'Printing the org information')
				Org.create(newOrg, (err, createdOrg) => {
					// if (!err) return res.json({
					// 	success: true,
					// });
					console.log(createdOrg, err, 'this is createdOrg');
					if(!err) {
						Org.find({creator: req.body.creator})
						.populate('creator')
						.exec()
						.then(foundOrgs => {
							console.log(foundOrgs, 'All orgs created by logged in User');
							if(foundOrgs) return res.status(200).json({
								success: true,
								foundOrgs
							})
						})
					}
				});
			}
		});
			// return res.status(200).send(req.file)
	
}