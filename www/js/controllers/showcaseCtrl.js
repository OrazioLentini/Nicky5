angular.module('starter.controllers')

    .controller('ShowcaseCtrl', ['$scope', '$http', 'ShowcaseService', '$state', 'FavoritesService', '$ionicPopup', '$ionicLoading' , '$ionicModal', '$stateParams','MenuLinksService', function ($scope, $http, ShowcaseService, $state, FavoritesService, $ionicPopup, $ionicLoading,  $ionicModal,  $stateParams, MenuLinksService) {
    	
    	$scope.products = ShowcaseService.getProducts()
        console.log($scope.products)
    }]);