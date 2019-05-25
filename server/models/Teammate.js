var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teammateSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 16,
	},
	
})

var Teammate = mongoose.model('Org', teammateSchema);

module.exports = Teammate;