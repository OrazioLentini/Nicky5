angular.module('starter.controllers', [])

.controller('AppCtrl' , ['$scope', '$rootScope', 'SyncService', '$timeout', '$ionicLoading', function($scope, $rootScope, SyncService, $timeout, $ionicLoading) {
	 app.initialize();
	 SyncService.checkSync(). success(function (x){
		 if(x == 'Database Connected') {
			 SyncService.sync()
			 $ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		 }
		 else {
			$ionicLoading.show({template: 'Sync Error: The current information may not be up to date.', noBackdrop: false, duration:3000});
		 }
	 }). error(function (){
		 $ionicLoading.show({template: 'No Internet Connection. Please connect to the internet.', noBackdrop: false});
	 })

     //SyncService.sync()
    
     
}])