angular.module('starter.controllers')

    .controller('FeedbackCtrl', function ($scope, $stateParams, MenuLinksService, $ionicModal, $ionicLoading, LoginService, $rootScope, SyncService, $ionicPopup, $state, $ionicHistory) {
		$scope.title = MenuLinksService.getHeader($stateParams.ID)

		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$(".signInOverlay").css("display", "block")
			$(".signIn").css("display", "block")
			var confirmPopup = $ionicPopup.confirm({
				 title: 'Login Required',
				 template: 'You must log in to provide feedback. Do you want to log in?'
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
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				$scope.runSync()
				$rootScope.$broadcast('login', LoginUsername)
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
				 $ionicLoading.show({template: 'No Internet Connection. Please connect to the internet.', noBackdrop: false});
			 })
			//SyncService.sync()
			//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		}

		$scope.submit = function () {
			//submitFeedback()
			var feedback = $("#Feedback").val();
			LoginService.provideFeedback(feedback). success(function(data){
				    $ionicLoading.show({template: 'Thank you for your feedback', noBackdrop: false, duration: 1500});
					$("#Feedback").val("");
			})
		}
    });
