angular.module('starter.controllers')

    .controller('TriviaCtrl', ['$scope', '$http', '$state', '$ionicModal', '$timeout', function ($scope, $http, $state, $ionicModal, $timeout) {
		//$scope.requests = DirectoryService.getDirectory();

		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$scope.show = true
		}
		else {
			$scope.show = false
		}


		serverTimeDifference () 



		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function() {
			loginSubmit();

			$timeout(function() {
				loggedIn = localStorage.getItem("login")

				if (loggedIn != null) {
					 $scope.closeLogin();
				}
			}, 100);
		};

    }]);
