angular.module('starter.controllers')

    .controller('MapsCtrl', ['$scope', 'MapsService','$ionicPopup', '$filter', 'FavoritesService', function ($scope,  MapsService, $ionicPopup, $filter, FavoritesService) {
		
		$scope.filled = false
		$scope.unfilled = false

		$scope.checkFav = function () {
			$scope.maps = MapsService.getMaps()

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
					console.log($scope.fav)

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
			$scope.info = $scope.maps[id-1]
			$scope.fav = FavoritesService.saveFavoriteMap($scope.info)
		
			$scope.maps = MapsService.getMaps()
			$scope.checkFav()

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

			 }
		   });
		}

		$scope.checkFav()
}]);