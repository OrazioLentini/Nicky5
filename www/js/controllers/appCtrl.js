angular.module('starter.controllers', [])

.controller('AppCtrl' , ['$scope', '$ionicModal', '$timeout' , function($scope, $ionicModal, $timeout) {

  $scope.loginData = {};

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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  	  $scope.menu = [
		{ title: 'Directory', id: 1, icon: 'briefcase', url:'directory' },
		{ title: 'Schedule', id: 2, icon: 'calendar' },
		{ title: 'Maps', id: 3, icon:'map' },
		{ title: 'Trivia', id: 4, icon:'ribbon-a' },
		{ title: 'Presentation', id: 5, icon:'speakerphone' },
		{ title: 'Home', id: 6, icon:'home' }
	  ];
}])