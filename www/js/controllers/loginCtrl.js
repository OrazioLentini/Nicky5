angular.module('starter.controllers')

.controller('LoginCtrl' , ['$scope', '$ionicModal', '$timeout' , function($scope, $ionicModal, $timeout) {

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

      $scope.doLogin = function() {
      loginSubmit();

      $timeout(function() {
        loggedIn = localStorage.getItem("login")

        if (loggedIn != null) {
          sync()
          $scope.logoutButton = true
          $scope.profileButton = true
          $scope.loginButton = false
          $scope.closeLogin();
        }
      }, 100);
    };

}])