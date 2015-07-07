angular.module('starter.controllers')

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $timeout , $ionicModal, $timeout, $ionicPopup, $ionicLoading) {
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
       $ionicSideMenuDelegate.toggleLeft();
    }, 100);
  };
  
  $scope.menu = [
		{ title: 'Directory', id: 1, icon: 'briefcase', url:'directory' },
		{ title: 'Schedule', id: 2, icon: 'calendar', url:'schedule' },
		{ title: 'Maps', id: 3, icon:'map', url:'maps' },
		{ title: 'Trivia', id: 4, icon:'ribbon-a', url:'trivia' },
		{ title: 'Presentation', id: 5, icon:'speakerphone', url:'polling' },
		{ title: 'Home', id: 6, icon:'home' , url:'/app/'}
  ];

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
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				 $scope.closeLogin();
			}
		}, 100);
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
				$scope.logoutButton = false
				$scope.profileButton = false
				$scope.loginButton = true
			}
		});
	}

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
		sync()
		$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
	}
})
