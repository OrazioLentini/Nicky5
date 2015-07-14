angular.module('starter.controllers', [])

.controller('AppCtrl' , ['SyncService' , function(SyncService) {
	 app.initialize();
   SyncService.sync()
}])