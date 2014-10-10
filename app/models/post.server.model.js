'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Comment Schema
 */
var commentSchema = new Schema({ 

	commentBy:String,
	commentOwner: {
	    type: Schema.ObjectId,
	    ref: 'User'
	  },

    content: {
		type: String,
		default: '',
		required: 'Please Comment',
		trim: true
	},
	
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Like Schema
 */
/*var LikeSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});*/
/**
 *Image Schema
*/
var PostSchema = new Schema({

	imageOwner: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	description: {
		type: String,
		required: 'Please describe the image',
		trim: true
	},

	image: [{ //this could hold the link to our image posted
	
		path: {
			type: String,
			default:''
		}	
	}],

	created: {
		type: Date,
		default: Date.now
	},

	likes: {
		type: Number,
		default:0
	},

	comments: {	
		type: [commentSchema],
		default: []
	},

	fields: {
		type: String,
		required: 'Please Select the Appropriate field',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}

});

mongoose.model('Post', PostSchema);
mongoose.model('comments', commentSchema);