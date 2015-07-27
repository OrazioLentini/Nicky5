angular.module('starter.controllers')

.controller('ProfileCtrl' , ['$scope', '$ionicModal', '$timeout', 'LoginService', '$ionicLoading', function($scope, $ionicModal, $timeout, LoginService, $ionicLoading) {

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
    var Username = $("#unProfile").val($scope.userName);
    var BadgeID = $("#idProfile").val($scope.badgeID);
    var Firstname = $("#fnProfile").val($scope.firstName);
    var Lastname = $("#lnProfile").val($scope.lastName);
    var Email = $("#emProfile").val($scope.email);

    LoginService.profileUpdate(Username, BadgeID, Firstname, Lastname, Email). success(function(data){
        localStorage.setItem("login", JSON.stringify(data))
      $ionicLoading.show({template: 'Profile Updated', noBackdrop: false, duration: 1500});
    })
    //profileSubmit()
  }

  // Open the login modal

}])