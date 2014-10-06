'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('lodash');
var posts = require('../../app/controllers/posts');


/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};


/**
 * Add comment now add comments
 */
exports.addComment = function(req, res) {
    var post = req.post;
    var comment = req.body;
    comment.commentOwner = req.user;
    post.comments.unshift(comment);

    post.save(function(err) {
        if (err) {
            return res.send(400, {
                message: 'posts.getErrorMessage(err)'
            });
        }   
        else {
            res.jsonp(post);
        }
    });
};


/**
 * Update comment
 */

exports.updateComment = function(req, res){
    var post = req.post;

    post = _.extend(post.comment, req.body);

    post.save(function(err) {
        if(err) {
            return res.status(400, {
                message: 'Update failed, try Again'
            });
        }
        else {
            res.jsonp(post);
        }
    });

};
 
 /**
 * Delete comment
 */
exports.deleteComment = function(req, res) {
    console.log(req);
    var post = req.post;

    post.comments.id(req.params.commentId).remove();
    post.save(function(err){
        if(err) {
            return res.send(400, {
                message: 'Comment delete failed'
            });
        }
        else{
            res.jsonp(post);
        }
    });
};

/**
 * list comment
 */
exports.listComment = function(req, res) {
    console.log(req);
    Post.find().sort('-created').populate('user', 'displayName').exec(function(err, posts) {
        if (err) {
            return res.status(400).send({
                message: 'errorHandler.getErrorMessage(err) in list'
            });
        } else {
            res.jsonp(posts);
        }
    });
};

/**
 * comment middleware
 */
exports.commentByID = function(req, res, next, id) {
    if (req.post) {
        
        req.comment = req.post.comments.id(id);
        next();
    }
    else {
        console.log('cannot find comment');
    }
    
};


/**
 * comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    console.log('requires login');
    if (req.comment.commentOwner.toString() !== req.user.id) {
        return res.send(403, {
            commentMessage: 'You are not authorized'
        });
    }
    next();
};
