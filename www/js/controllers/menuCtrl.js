angular.module('starter.controllers')

    .controller('MenuCtrl', ['$scope', function ($scope) {
	  $scope.menu = [
		{ title: 'Directory', id: 1, icon: 'briefcase', url:'directory' },
		{ title: 'Schedule', id: 2, icon: 'calendar', url:'schedule' },
		{ title: 'Maps', id: 3, icon:'map' },
		{ title: 'Trivia', id: 4, icon:'ribbon-a' },
		{ title: 'Presentation', id: 5, icon:'speakerphone' },
		{ title: 'Home', id: 6, icon:'home' }
	  ];
    }]);
