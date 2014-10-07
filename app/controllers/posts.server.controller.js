'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Post = mongoose.model('Post'),
	_ = require('lodash');

	var uuid = require('node-uuid'),
    	multiparty = require('multiparty');

	var path = require('path'),
    	fs = require('fs');



/**
 * Create a article
 */
/*
var uploadImage = function(req, res, contentType, tmpPath, destPath) {
    
        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            console.log('contenttypefail');
            return res.status(400).send('Unsupported file type.');
        }

        fs.readFile(tmpPath , function(err, data) {
            fs.writeFile(destPath, data, function(err) {
                fs.unlink(tmpPath, function(){
                    if(err) {
                        console.log('img not saved error');
                        console.log(err);
                        throw err;
                    }
                });
            }); 
        });
};*/

exports.create = function(req, res) {

	    //Parse Form
	    // var form = new multiparty.Form();
	    // form.parse(req, function(err, fields, files) {
	    //     if(err){
	    //         console.log('error parsing form');
	    //     }
	   
	    //     if(files.file[0]){
	    //         //if there is a file do upload
	    //         var file = files.file[0];
	    //         console.log(file);
	    //         var contentType = file.headers['content-type'];
	    //         var tmpPath = file.path;
	    //         var extIndex = tmpPath.lastIndexOf('.');
	    //         var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
	    //         // uuid is for generating unique filenames. 
	    //         var destPath =  path.resolve('public/modules/core/img/server' + tmpPath);
	    //         uploadImage(req, res, contentType, tmpPath, destPath);
	    //         song.imageUrl = 'modules/core/img/server' + tmpPath;
	    //     }
	    // };

	var post = new Post(req.body);
	post.user = req.user;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(post);
		}
	});
};

/**
 * Show the current post
 */
exports.read = function(req, res) {
	res.jsonp(req.post);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var post = req.post;

	post = _.extend(post, req.body);

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(post);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var post = req.post;

	post.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(post);
		}
	});
};

/**
 * like a post
 */
exports.likePost = function(req, res) {

    console.log('in the like schema');

    var post = req.post;
    
    var like = req.body;
        like.user = req.user;
        
    for(var i = 0; i < post.likes.length; i++) {
        console.log('in the likes loop');
        if (post.likes[i].user.toString() === req.user._id.toString()) {
            post.likes.splice(i, 1);
            break;
        }
    }

    //add the new vote into the like
    if(isNaN(parseInt(post.likes)))
    	{post.likes = 0;}
    post.likes = parseInt(post.likes) + 1;
    post.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(posts);
		}
	});
};

/**
 * Article middleware
 */
exports.postByID = function(req, res, next, id) {
	console.log('we are here');
	Post.findById(id).populate('user', 'displayName').exec(function(err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('Failed to load article ' + id));
		req.post = post;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.post.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};