angular.module('starter.controllers', [])

.controller('AppCtrl' , ['SyncService' , function(SyncService) {
    SyncService.sync()
}])