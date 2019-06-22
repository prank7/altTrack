var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	didToday: {
		type: String,
		maxlength: 140,
		required: true,
	},
	learnedToday: {
		type: String,
		maxlength: 140,
		required: true,

	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
}, {timestamps: true})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;