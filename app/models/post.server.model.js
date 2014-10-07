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
 * Category Schema
 */
/*var categorySchema = new Schema({ 

	categoryOwner: {
	    type: Schema.ObjectId,
	    ref: 'User'
	  },

    name: {
		type: String,
		required: 'Please Select Appropriate Category',
		trim: true
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

	imageUrl : { //this could hold the link to our image posted
		type: String,
		default:''
	},

	created: {
		type: Date,
		default: Date.now
	},

	likes: {	
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},

		like: {
			type: Number,
			default: 0
		}
	},

	comments: {
		type: [commentSchema],
		default: []
	}

	/*categories: {
		type: [categorySchema],
		default: []
	}*/

});

mongoose.model('Post', PostSchema);
/*mongoose.model('Category', CategorySchema);*/