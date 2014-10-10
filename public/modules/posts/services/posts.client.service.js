'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('posts').factory('Posts', ['$resource',
	function($resource) {
		return $resource('posts/:postId', {
			postId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

