angular.module('starter.controllers')

.controller('LoginCtrl' , ['$scope', '$ionicModal', '$timeout' , function($scope, $ionicModal, $timeout) {

  // Open the login modal
  alert('login')
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

}])