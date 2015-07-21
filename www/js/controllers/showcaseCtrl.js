angular.module('starter.controllers')

    .controller('ShowcaseCtrl', ['$scope', '$http', 'ShowcaseService', '$state', 'FavoritesService', '$ionicPopup', '$ionicLoading' , '$ionicModal', '$stateParams','MenuLinksService', function ($scope, $http, ShowcaseService, $state, FavoritesService, $ionicPopup, $ionicLoading,  $ionicModal,  $stateParams, MenuLinksService) {
    	
		$scope.title = MenuLinksService.getHeader($stateParams.ID)
				
    	$scope.products = ShowcaseService.getProducts()

		
    }]);