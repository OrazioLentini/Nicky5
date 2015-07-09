angular.module('starter.controllers')

.controller('LoginCtrl' , ['$scope', '$ionicModal', '$timeout' 'LoginService', function($scope, $ionicModal, $timeout, LoginService) {

  $scope.doLogin = function() {
      var LoginUsername = $("#Username").val();
      var LoginBadgeID = $("#BadgeID").val();

      LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
        console.log(data)
        if(data == 'success') {
          loggedIn = localStorage.getItem("login")
          $scope.logoutButton = true
        $scope.profileButton = true
        $scope.loginButton = false
         $scope.closeLogin();
        }
      })
  };
}])