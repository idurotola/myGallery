'use strict';



module.exports = function(app) {

	/**
 * Module dependencies.
 */
	var users = require('../../app/controllers/users');
	var posts = require('../../app/controllers/posts');
	var comments = require('../../app/controllers/comments');


	// Apps Routes
	app.route('/posts')
		.get(posts.list)     //working
		.post(posts.create);  //working


	app.route('/posts/:postId')
		.get(posts.read)  //working
		.put(posts.update)    //working
		.delete(posts.delete);  //working
		
	//Comment Routes
	app.route('/posts/:postId/comments')
		.get(comments.listComment)  //working
		.post(comments.addComment); //working
		

	app.route('/posts/:postId/comments/:commentId')
		.put(comments.updateComment)
		.delete(comments.deleteComment);  //working

	//Like Routes
	app.route('/posts/:postId/likes')
		.put(posts.likePost2);
		

	// Finish by binding the app middleware
	app.param('postId', posts.postByID);

	//Finish by binding the comment middleware
	app.param('commentId', comments.commentByID);
};	