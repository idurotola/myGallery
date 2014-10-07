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
		.get(posts.list)
		.post(posts.create);


	app.route('/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(posts.delete);
		
	//Comment Routes
	app.route('/posts/:postId/comments')
		.get(comments.listComment)
		.post(comments.addComment);

	app.route('/posts/:postId/comments/:commentId')
		.put(comments.updateComment)
		.delete(comments.deleteComment);

	//Like Routes
	app.route('/posts/:postId/likes')
		.post(posts.likePost);
		

	// Finish by binding the app middleware
	app.param('postId', posts.postByID);

	//Finish by binding the comment middleware
	app.param('commentId', comments.commentByID);
};	