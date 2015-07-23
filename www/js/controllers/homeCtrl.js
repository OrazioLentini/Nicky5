angular.module('starter.controllers')

    .controller('HomeCtrl', ['$scope', '$http', '$state', 'SyncService', '$ionicLoading', '$ionicHistory', '$ionicPlatform', 'MenuLinksService', '$timeout', function ($scope, $http, $state, SyncService, $ionicLoading, $ionicHistory, $ionicPlatform, MenuLinksService, $timeout) {
		//$scope.s = SyncService.sync()
			$ionicHistory.clearHistory()	
	  $ionicPlatform.ready( function() {
           //alert("ready");
       $timeout(function() {
           //alert("grab featured")
		   $scope.feature = SyncService.getFeaturedScheduleList() 
           $timeout(function() {
	        var mySwiper = new Swiper('.swiper-container', {
			    autoplay: 8000,
			    effect: 'slide',
			    speed: 500
			});   
		    //$ionicHistory.clearHistory()
			},150);	


           /*$timeout(function() {
	         navigator.splashscreen.hide();
	         alert('done')
			},600);*/
            
	    //SyncService.sync()
	      },200);
	
		
	  });

    MenuLinksService.getMenuLinks(). success(function (data){
  		$scope.menu = data
  		data = JSON.stringify(data)
        localStorage.setItem('menu', data)
  	});
  	
	//$scope.feature = SyncService.getFeaturedScheduleList()
	//console.log($scope.feature)

	$scope.scan = function() {
		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$ionicLoading.show({template: 'You must be logged in to access the QR Code', noBackdrop: false, duration:1500});
		}
		else {
			scan2()
		}
	}
	    
 
				
}]);
