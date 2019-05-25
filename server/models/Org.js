var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 16,
	},
	imageUrl: {
		type: String,
	},
	gitHub: {
		
	}
})

var Org = mongoose.model('Org', orgSchema);

module.exports = Org;