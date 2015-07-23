angular.module('starter.controllers')

    .controller('FeedbackCtrl', function ($scope, $stateParams, MenuLinksService, $ionicModal, $ionicLoading, LoginService, $rootScope) {
		$scope.title = MenuLinksService.getHeader($stateParams.ID)

		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$(".signInOverlay").css("display", "block")
			$(".signIn").css("display", "block")
		}
		else {
			$(".signInOverlay").css("display", "none")
			$(".signIn").css("display", "none")
		}

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
	    	var LoginUsername = $("#Username").val();
	    	var LoginBadgeID = $("#BadgeID").val();

	    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
			if(data != 'failed') {
				localStorage.setItem("login", JSON.stringify(data))
				$(".signInOverlay").css("display", "none")
				$(".signIn").css("display", "none")
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				$rootScope.$broadcast('login', LoginUsername)
				//$scope.runSync()
				//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				$scope.closeLogin();
			}
			else {
				$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
			}
	    	})
		}; 

		$scope.submit = function () {
			//submitFeedback()
			var feedback = $("#Feedback").val();
			LoginService.provideFeedback(feedback). success(function(data){
				    $ionicLoading.show({template: 'Thank you for your feedback', noBackdrop: false, duration: 1500});
					$("#Feedback").val("");
			})
		}
    });
