var Org = require('../models/Org');
const nodemailer = require("nodemailer");
var Teammate = require('../models/Teammate');

exports.createOrg = (req, res, next) => {
	Org.findOne({ name: req.body.name })
	.exec()
	.then(foundOrg => {
		// console.log(foundOrg, 'This user already exists in DB.')
		if (foundOrg) {
			return res.status(409).json({
				success: false,
				message: 'Name taken. Please use another name.'
			});
		} else {
			// console.log('Here in the else condition')
				const { filename } = req.file;
				const iType = filename.split('.')[1];
				var newOrg = {
					name: req.body.name,
					creator: req.body.creator,
					imageUrl: {
						name: filename,
						imageType: `image/${iType}`
					},
					location: req.body.location,
				}
				// console.log(newOrg, 'Printing the org information')
				Org.create(newOrg, (err, createdOrg) => {
					console.log(createdOrg, err, 'this is createdOrg');
					if(!err) {
						Org.find({creator: req.body.creator})
						.populate('creator')
						.exec()
						.then(foundOrgs => {
							// console.log(foundOrgs, 'All orgs created by logged in User');
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

exports.sendInvites = (req, res, next) => {
	// console.log(req.body, 'this is invite body');
	const smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: 'onlyjaxsonteller@gmail.com',
			pass: 'jax@1212'
		}
	});
	let rand, mailOptions, host, link;
	// generate random ref code
	function randomN(v) {
		let rand = [];
		let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < v; i++) {
			let random = Math.floor(Math.random() * 36);
			rand.push(alphaNum[random])
		}
		return rand.join('');
	}
	// it'll provide your localhost or network address
	host = req.get("host");
	let refCode;
		refCode = randomN(6);
		link = `http://${host}/users/register?ref=${refCode}`;
		const {teammateEmail, org} = req.body;

		//creating new Teammate
		const newTeammate = {
			teammateEmail: teammateEmail,
			refCode: refCode,
			org: org,
		}

		//saving the teammateEmail and refCode for future reference

		//Checking if the invited user is already a member of any existing Orgs.
		Teammate.findOne({teammateEmail: teammateEmail})
		.exec()
		.then(teammate => {
			if(teammate) {
				console.log(teammate, 'this Teammate is already a part of one of existing Orgs');
				//find the Teammate and update the Org here
				Teammate.findOneAndUpdate({teammateEmail: teammateEmail}, {org: org}, {new: true}, (err, updatedTeammate) => {
					if(err) return res.status(500).json({
						success: false,
						message: 'Unable to update existing Teammate'
					})
					console.log(updatedTeammate);
				})
			}
			//if teammate not exists in DB;
			Teammate.create(newTeammate, (err, invitedTeammate) => {
				//Set isVerified flag
				if(err) return res.status(500).json({
					success: false,
					message: 'Unexpected error encountered while creating newTeammate.'
				})
				console.log(invitedTeammate, 'This is invited Teammate')
				if(invitedTeammate) return res.status(200).json({
					success: false,
					message: 'new Teammate validated and created in DB. Email authentication not required.',
					invitedTeammate
				});
			})
		})

		mailOptions = {
			to: teammateEmail,
			subject: "You've been invited to join altify organization",
			html: `Hello, <br>Please <a href='${link}'>click here</a> to join the altify organization.`
		}
		smtpTransport.sendMail(mailOptions, (err, info) => {
			if (err) return res.status(406).json({ error: "Encountered a problem while sending the email" });
			return res.json({
				message: `Message sent to ${mailOptions.to}`});
		});
	}
