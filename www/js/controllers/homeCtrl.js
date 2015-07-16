angular.module('starter.controllers')

    .controller('HomeCtrl', ['$scope', '$http', '$state', 'SyncService', '$ionicLoading', '$ionicHistory', 'MenuLinksService', function ($scope, $http, $state, SyncService, $ionicLoading, $ionicHistory, MenuLinksService) {
		//$scope.s = SyncService.sync()
		$ionicHistory.clearHistory()
		setTimeout(function () {
				$scope.feature = SyncService.getFeaturedScheduleList()
				localStorage.setItem("menu", data)
				//console.log($scope.feature)
		},50)		

    MenuLinksService.getMenuLinks(). success(function (data){
  		$scope.menu = data
  		data = JSON.stringify(data)
        localStorage.setItem('menu', data)
  	})	
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
	$(document).ready(function(){
	    setTimeout(function () {
		    $('.slider2').slick({
			  infinite: true,
			  autoplay: true,
			  autoplaySpeed: 5000,
			  arrows:false,
			  dots:false

			});
		},250);	
	});
				
}]);
