angular.module('starter.controllers', [])

.controller('AppCtrl' , ['$scope', '$rootScope', 'SyncService', 'MyService', '$timeout', function($scope, $rootScope, SyncService, MyService, $timeout) {
	 app.initialize();
     SyncService.sync()
    
     
}])