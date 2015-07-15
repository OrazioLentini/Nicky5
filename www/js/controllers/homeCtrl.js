angular.module('starter.controllers')

    .controller('HomeCtrl', ['$scope', '$http', '$state', 'SyncService', '$ionicLoading', '$ionicHistory', function ($scope, $http, $state, SyncService, $ionicLoading, $ionicHistory) {
		//$scope.s = SyncService.sync()
		$ionicHistory.clearHistory()
		setTimeout(function () {
				$scope.feature = SyncService.getFeaturedScheduleList()
				localStorage.setItem("menu", data)
				//console.log($scope.feature)
		},50)		


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
