'use strict';

//Posts service used for communicating with the posts REST endpoints
var myApp = angular.module('posts');

	myApp.factory('Posts', ['$resource',
		function($resource) {
			return $resource('posts/:postId', 
			{
				postId: '@_id'
			}, 
			{
				update: {
					method: 'PUT'
				}
			});
		}
	]);
	myApp.factory('Comments', ['$resource',
		function($resource) {
			console.log('ddddddd');
			return $resource('posts/:postId/comments', 	
			{ postId: '@_id'
			});
		}
	]);