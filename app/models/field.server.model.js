/*'use strict';


 // Module dependencies.

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



//Category Schema

var FieldSchema = new Schema({ 

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
});

mongoose.model('Field', FieldSchema);*/