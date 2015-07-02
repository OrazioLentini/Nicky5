angular.module('starter.controllers')

    .controller('DirectoryCtrl', ['$scope', '$http', '$state', 'DirectoryService', function ($scope, $http, $state, DirectoryService) {

		$scope.requests = DirectoryService.getDirectory();
    }]);
