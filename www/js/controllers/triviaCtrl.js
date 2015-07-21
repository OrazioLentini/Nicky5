angular.module('starter.controllers')

    .controller('TriviaCtrl', ['$scope', '$http', '$state', '$ionicModal', '$timeout', 'SyncService', 'LoginService', '$ionicLoading', 'TriviaService', '$stateParams','MenuLinksService', function ($scope, $http, $state, $ionicModal, $timeout, SyncService, LoginService, $ionicLoading, TriviaService,  $stateParams, MenuLinksService) {
		//$scope.requests = DirectoryService.getDirectory();
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

		TriviaService.serverTimeDifference(). success(function(data){
			var d = new Date()
			ClientMilliseconds = d.getTime() - d.setHours(0,0,0,0);
			ClientTimer = ClientMilliseconds / 1000;
			iDiff = parseFloat(data.timer) - ClientTimer;
			localStorage.setItem("ServerClientTimeDiff", iDiff);
		})

		$scope.saveTriviaAnswer = function(answer) {
			TriviaService.saveAnswer(answer). success(function(data){
			   returnmessage = data.Result

			   $scope.score = data.TotalScore
			   //$("#score").html(data.TotalScore)
			   if (returnmessage == 'correct') {
			   		$ionicLoading.show({template: 'Correct', noBackdrop: false, duration: 1500});
			   }
			   if (returnmessage == 'wrong') {
			   		$ionicLoading.show({template: 'Incorrect', noBackdrop: false, duration: 1500});
			   }
			   if (returnmessage == 'off') {
					var message = "No Game in Progress";
					$ionicLoading.show({template: message, noBackdrop: false, duration: 1500});
			   }
			   if (returnmessage == 'warmup') {
					var message = "The game will begin shortly";
					$ionicLoading.show({template: message, noBackdrop: false, duration: 1500});
			   }
			   if (returnmessage == 'answer') {
					var message = "Please wait for the next question.";
					$ionicLoading.show({template: message, noBackdrop: false, duration: 1500});
			   }  
			})
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
				$("#signInOverlay").css("display", "none")
				$("#signIn").css("display", "none")
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				//$scope.runSync()
				//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				$scope.closeLogin();
			}
			else {
				$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
			}
	    	})
		};
		$scope.runSync = function () {
			SyncService.sync()
			$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		}

    }]);
