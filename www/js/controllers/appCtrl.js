angular.module('starter.controllers', [])

.controller('AppCtrl' , ['$scope', '$ionicModal', '$timeout', 'SyncService' , function($scope, $ionicModal, $timeout, SyncService) {

    alert('')
    SyncService.getDirectory(). success(function (data){
      SyncService.saveLocally('tCompany',data)
    })
    SyncService.getMaps().success(function (data){
      SyncService.saveLocally('tMaps',data)
    })
    SyncService.getSchedule().success(function (data){
      SyncService.saveLocally('tSchedule',data)
      getFeaturedScheduleList()
    })
    SyncService.getSpeaker().success(function (data){
      SyncService.saveLocally('tSpeaker',data)
    })
    SyncService.getSocialMediaInfo().success(function (data){
      SyncService.saveLocally('tSocial',data)
    })

}])