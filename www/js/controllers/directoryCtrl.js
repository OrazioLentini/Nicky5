angular.module('starter.controllers')

    .controller('DirectoryCtrl', ['$scope', '$http', '$state', 'DirectoryService','$stateParams','MenuLinksService', function ($scope, $http, $state, DirectoryService, $stateParams, MenuLinksService) {

		$scope.title = MenuLinksService.getHeader($stateParams.ID)
		$scope.requests = DirectoryService.getDirectory();
		//console.log($scope.requests)
    }]);
