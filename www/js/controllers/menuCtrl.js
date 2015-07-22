angular.module('starter.controllers')

.controller('MenuCtrl', function($rootScope, $scope, $ionicSideMenuDelegate, $timeout , $ionicModal, $timeout, $ionicPopup, $ionicLoading, SyncService, LoginService, MenuLinksService) {
  	
  	MenuLinksService.getMenuLinks(). success(function (data){
  		$scope.menu = data
  		data = JSON.stringify(data)
        localStorage.setItem('menu', data)
  	})		
        
        $scope.$on('login', function(events, isLoggedIn){
		    //alert(isLoggedIn);
		    //$scope.name = isLoggedIn; //now we've registered!
		    if(isLoggedIn > ""){
		    	$scope.logoutButton = true
			    $scope.profileButton = true
			    $scope.loginButton = false
		    }
		})

  		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$scope.loginButton = true
		}
		else {
			$scope.logoutButton = true
			$scope.profileButton = true
		}

  $scope.toggleLeftSideMenu = function() {
  	$timeout(function() {
       $ionicSideMenuDelegate.toggleRight();
    }, 100);
  };

  	$scope.scan = function() {
		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$ionicLoading.show({template: 'You must be logged in to access the QR Code', noBackdrop: false, duration:1500});
		}
		else {
			scan2()
		}
	}
  
  /*$scope.menu = [
		{ title: 'Directory', id: 1, icon: 'briefcase', url:'directory' },
		{ title: 'Schedule', id: 2, icon: 'calendar', url:'schedule' },
		{ title: 'Maps', id: 3, icon:'map', url:'maps' },
		{ title: 'Trivia', id: 4, icon:'ribbon-a', url:'trivia' },
		{ title: 'Presentation', id: 5, icon:'speakerphone', url:'polling' },
		{ title: 'Learning', id: 5, icon:'lightbulb', url:'learning' },
		{ title: 'Social', id: 5, icon:'radio-waves', url:'social' },
		{ title: 'Home', id: 6, icon:'home' , url:'menu'}
  ];*/

  //LOGIN
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
        $rootScope.$broadcast('BOOM!', $scope.LoginUsername)
    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
		if(data != 'failed') {
			localStorage.setItem("login", JSON.stringify(data))
			$scope.logoutButton = true
			$scope.profileButton = true
			$scope.loginButton = false
			$scope.runSync()
			$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
			$scope.closeLogin();
		}
		else {
			$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
		}
    	})
	};

	$scope.logout = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Logout',
			template: 'Are you sure you want to logout?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				localStorage.removeItem("login");
				localStorage.removeItem("infoRequest");
				$("#Username").val("");
				$("#BadgeID").val("");
				$(".signInOverlay").css("display", "block")
				$(".signIn").css("display", "block")
				$scope.logoutButton = false
				$scope.profileButton = false
				$scope.loginButton = true
				$scope.show = true
			}
		});
	}

	//PROFILE
	$ionicModal.fromTemplateUrl('templates/profile.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalProfile = modal;
	});

	$scope.profile = function() {
		$scope.modalProfile.show();
	};
	$scope.closeProfile = function() {
	    $scope.modalProfile.hide();
	};

	$scope.runSync = function () {
		SyncService.sync()
		$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
	}

	//SCANNER
	$ionicModal.fromTemplateUrl('templates/checkIn.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalCheckIn = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeCheckIn = function() {
		$scope.modalCheckIn.hide();
	};

	// Open the login modal
	$scope.openCheckIn = function() {
		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$ionicLoading.show({template: 'You must be logged in to access the QR Code', noBackdrop: false, duration:1500});
		}
		else {
		    $scope.loginCred = JSON.parse($scope.isLoggedIn)

			$scope.modalCheckIn.show();
			$("#qrcodeTable").html("")
			qrCode($scope.loginCred[0].FirstName, $scope.loginCred[0].LastName, $scope.loginCred[0].BadgeID)
		}
	};

})