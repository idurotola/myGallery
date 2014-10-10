'use strict';


//Module dependencies.

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
    Post = mongoose.model('Post'),
     _ = require('lodash');
var posts = require('../../app/controllers/posts');




//add category  actually its useless trying to add category  again
exports.addCategory = function(req, res) {
    var post = req.post;
    Post.save(function(err) {
        if (err) {
            return res.send(400, {
                message: posts.getErrorMessage(err)
            });
        }   
        else {
            res.jsonp(post);
        }
    });
};


//find posts by category for all user and for updating the left panel
exports.listField = function(req, res) {
	console.log(req.body.search.toString());
	Post.where({fields:req.body.search.toString()}).sort('-created').exec(function(err, posts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(posts);
		}
	});
};
