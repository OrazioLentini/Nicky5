angular.module('starter.controllers')

.controller('ProfileCtrl' , ['$scope', '$ionicModal', '$timeout' , function($scope, $ionicModal, $timeout) {

  var isLoggedIn = localStorage.getItem("login")

  if(isLoggedIn != null) {
    $scope.data = JSON.parse(isLoggedIn)
    $scope.badgeID = $scope.data[0].BadgeID
    $scope.userName = $scope.data[0].Username
    $scope.email = $scope.data[0].Email
    $scope.firstName = $scope.data[0].FirstName
    $scope.lastName = $scope.data[0].LastName

  }
  $scope.update = function() {
    profileSubmit()
  }

  // Open the login modal

}])