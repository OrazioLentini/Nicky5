angular.module('starter.controllers')

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $timeout) {
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
})
