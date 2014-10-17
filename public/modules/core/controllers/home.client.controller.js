'use strict';

angular.module('posts').controller('PostsController', ['$scope', '$http', '$state', '$stateParams', '$location', 'Authentication', 'Posts', 'Comments', 'Like',
    function($scope, $http, $state, $stateParams, $location, Authentication, Posts, Comments, Like) {
        $scope.authentication = Authentication;

        $scope.showOverlay = false;
        $scope.love = false;
        $scope.nolove = false;


        $scope.overlayClicked = function() {
            $scope.showOverlay = true;
        };
        $scope.cancelPost = function() {
            $scope.showOverlay = false;
        };

        $scope.create = function() {

            var post = new Posts({
                fields: this.fields,
                description: this.description

            });

            post.image = $scope.stringFile;

            post.$save(function(response) {
                $scope.description = '';
                $scope.fields = '';
                $scope.showOverlay = false;
                $scope.find();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.onFileSelect = function($files) {

            $scope.file = $files;
            $scope.stringFile = [];
            for (var i in $scope.file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.stringFile.push({
                        path: e.target.result
                    });
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
            } else {
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

        $scope.showComments = function(index) {
            $scope.comments = $scope.posts[index].comments;
        };

        /*my own delete function*/
        $scope.deletePost = function(post) {
            $location.path('posts/' + this.post._id);
        };

        /*comment handler*/
        $scope.addComment = function(index) {

            var comments = new Comments();
            comments.content = this.newComment;
            this.newComment = '';
            comments.$save({
                    postId: this.post._id
                },
                function(data) {
                    $scope.posts[index].
                    comments = data.comments;
                    $scope.comments = data.comments;
                });
        };
        /**********************************
						ANOTHER LIKE
		**********************************/
        $scope.likeAble = function(index) {
            var likePost = new Like();
            likePost.$update({
                postId: this.post._id
            }, function(data) {

                $scope.posts[index].likes = data.likes;
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