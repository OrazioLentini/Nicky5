angular.module('starter.controllers')

    .controller('MapsCtrl', ['$scope', 'MapsService','$ionicPopup', '$filter', 'FavoritesService','$ionicLoading', '$ionicModal','$stateParams','MenuLinksService', function ($scope,  MapsService, $ionicPopup, $filter, FavoritesService, $ionicLoading, $ionicModal, $stateParams, MenuLinksService) {

		$scope.title = MenuLinksService.getHeader($stateParams.ID)

$ionicModal.fromTemplateUrl('templates/viewmap.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalMap = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeMap = function() {
		$scope.modalMap.hide();
	};

	// Open the login modal
	$scope.showImage = function(image, name) {
		
		$scope.showImageUrl = image
		$scope.showImageName = name
		$scope.modalMap.show();
	};

  
		$scope.checkFav = function () {
			$scope.maps = MapsService.getMaps()
			if($scope.maps.length == 0 ){
				$scope.noMaps = true
			}


			$scope.fav = FavoritesService.checkIfFavoriteMap()
			for (i = 0; i < $scope.maps.length; i++){
				if ($scope.maps[i].fav == null) {
					$scope.maps[i].Fav = false
					$scope.maps[i].NoFav = true
				}
			}
			if ($scope.fav != 'all') {
				for (j = 0; j < $scope.fav.length; j++){
					var x = $scope.fav[j].ID

					for (i = 0; i < $scope.maps.length; i++){
						if ($scope.maps[i].RecID == x) {
							$scope.maps[i].Fav = true
							$scope.maps[i].NoFav = false
						}
					}
				}
			}
		}

		$scope.saveFavoriteMap = function(id) {

			$scope.info = $filter('filter')($scope.maps, {RecID: id })
			$scope.fav = FavoritesService.saveFavoriteMap($scope.info[0])
		
			//$scope.maps = MapsService.getMaps()
			$scope.checkFav()
			$ionicLoading.show({template: 'Added to Favorites', noBackdrop: true, duration: 1500});			

		}

		$scope.deleteFavorite = function(id) {
			var confirmPopup = $ionicPopup.confirm({
			 title: 'Delete Favorite',
			 template: 'Are you sure you would like to delete this favorite?'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				$scope.deleted = FavoritesService.deleteFavorite(id, 'maps');
					$scope.checkFav()
					$ionicLoading.show({template: 'Favorite Deleted', noBackdrop: true, duration: 1500});

			 }
		   });
		}

		$scope.checkFav()
}]);