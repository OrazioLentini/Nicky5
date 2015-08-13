angular.module('starter.controllers')

    .controller('TriviaCtrl', ['$rootScope', '$scope', '$http', '$state', '$ionicModal', '$timeout', 'SyncService', 'LoginService', '$ionicLoading', 'TriviaService', '$stateParams','MenuLinksService', '$ionicPopup', '$ionicHistory', function ($rootScope, $scope, $http, $state, $ionicModal, $timeout, SyncService, LoginService, $ionicLoading, TriviaService,  $stateParams, MenuLinksService, $ionicPopup, $ionicHistory) {
		//$scope.requests = DirectoryService.getDirectory();
		$scope.title = MenuLinksService.getHeader($stateParams.ID)

		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$(".signInOverlay").css("display", "block")
			$(".signIn").css("display", "block")
			
			var confirmPopup = $ionicPopup.confirm({
				 title: 'Login Required',
				 template: 'You must log in to participate in trivia. Do you want to log in?'
			   });
			   confirmPopup.then(function(res) {
				 if(res) {
					$scope.modal.show();
				 }
				 else {
					$ionicHistory.nextViewOptions({
					 disableBack: true
					});	  
					$state.go('app.menu')
				 }
			   });
			   
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
			$ionicHistory.nextViewOptions({
				disableBack: true
			});	  
			$state.go('app.menu')
		};
		
		$scope.closeLoginAuto = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function(user, bID) {
	    	//var LoginUsername = $("#Username").val();
	    	//var LoginBadgeID = $("#BadgeID").val();

	    	var LoginUsername = user
	    	var LoginBadgeID = bID
			
	    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
			if(data != 'failed') {
				localStorage.setItem("login", JSON.stringify(data))
				$(".signInOverlay").css("display", "none")
				$(".signIn").css("display", "none")
				//alert('right spot')
				$scope.runSync()
				$rootScope.$broadcast('login', LoginUsername)
				//$state.current, {}, {reload: true});
				//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				$scope.closeLoginAuto();
			}
			else {
				$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
			}
	    	})
		};
		$scope.runSync = function () {		
			SyncService.checkSync(). success(function (x){
				 if(x == 'Database Connected') {
					 SyncService.sync()
					 $ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				 }
				 else {
					$ionicLoading.show({template: 'Sync Error: The current information may not be up to date.', noBackdrop: false, duration:3000});
				 }
			 }). error(function (){
					checkLastSync = localStorage.getItem('lastSync') 
					if (checkLastSync == null) {
						$ionicLoading.show({template: 'No Internet Connection. Please connect to the internet.', noBackdrop: false});
					}
					else {
						$ionicLoading.show({template: 'Sync Error: No Internet connection. The current information may not be up to date.', noBackdrop: false, duration:3000});
					}
			 })
			 
			//SyncService.sync()
			//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		}

    }]);
