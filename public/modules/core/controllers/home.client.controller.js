'use strict';

angular.module('posts').controller('PostsController', ['$scope','$http','$state', '$stateParams', '$location', 'Authentication', 'Posts',
	function($scope,$http,$state ,$stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;

		$scope.postoverlay =false;
		$scope.create = function() {

				var post = new Posts({
					fields: this.fields,
					description: this.description

				});

				post.image = $scope.stringFile;

				post.$save(function(response) {
					console.log(response);
					$scope.fields = '';
					$scope.description = '';
					$scope.find();
					$scope.showComments();
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});	
		};

		$scope.onFileSelect = function ($files) {

					$scope.file = $files;
					$scope.stringFile = [];
					for ( var i in $scope.file ) {
						var reader = new FileReader();
						reader.onload = function(e) {
						   $scope.stringFile.push({path: e.target.result});
						};
						reader.readAsDataURL($scope.file[i]);	
					}
		};
		
		$scope.remove = function(post) {
			if (post) {
				post.$remove();
				for (var i in $scope.posts) {
					if ($scope.posts[i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			} 
			else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};

		$scope.update = function() {
			var post = $scope.post;
			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.showComments = function() {
			var post = $scope.post;
			console.log(this.post);
			$scope.comments = this.post.comments;
			console.log($scope.comments);
		};


		/*this is to add comment*/
		$scope.addComment = function() {
			var params = {
			content : this.newComment
			};
			var url = '/posts/'+ this.post._id +'/comments';
			$http.post(url,params).success(function (data){
				console.log(data);
				$scope.find();
				$scope.comments = data.comments;
			});
		};
		$scope.likeAble = function() {
			alert('in likeable');
			var params = {
			content : this.newComment
			};
			var url = '/posts/'+ this.post._id +'/likes'
			$http.put(url,params).success(function(liked){
				//show the user that he has like an item
				//show now unlike
				$scope.find();
			});
		};



		$scope.find = function() {
			$scope.posts = Posts.query();
		};

		$scope.findOne = function() {
			$scope.post = Posts.get({
				postId: $stateParams.postId
			});

		};
	}
]);