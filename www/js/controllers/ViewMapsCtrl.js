angular.module('starter.controllers')

    .controller('ViewMapsCtrl', function ($scope, $stateParams, $ionicPopup, MapsService, $ionicLoading, $ionicModal, $timeout, MenuLinksService) {
		
		$scope.mapsdetails = MapsService.getMap($stateParams.RecID);
}); 