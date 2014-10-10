'use strict';



module.exports = function(app) {

	/**
 * Module dependencies.
 */
	var users = require('../../app/controllers/users');
	var posts = require('../../app/controllers/posts');
	var fields = require('../../app/controllers/fields');


	// Category route
	app.route('/posts/fields')
		.get(fields.listField)
		.post(fields.listField);


	/*app.route('/posts/categories')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(posts.delete);*/
	
		

	// Finish by binding the app middleware
	app.param('postId', posts.postByID);

	//Finish by binding the comment middleware
	/*app.param('categoryId', categories.categoryByID);*/
};	