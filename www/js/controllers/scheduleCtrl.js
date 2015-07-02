angular.module('starter.controllers')

    .controller('ScheduleCtrl', ['$scope', '$http', '$state', 'ScheduleService', function ($scope, $http, $state, ScheduleService) {

		$scope.schedule = ScheduleService.getSchedule();
		console.log($scope.schedule)
    }]);
