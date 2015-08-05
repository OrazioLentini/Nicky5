angular.module('starter.controllers', [])

.controller('AppCtrl' , ['$scope', '$rootScope', 'SyncService', '$timeout', function($scope, $rootScope, SyncService, $timeout) {
	 app.initialize();
     SyncService.sync()
    
     
}])