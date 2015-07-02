angular.module('starter.controllers')

    .controller('DetailCtrl', ['$scope', '$stateParams', '$ionicPopup', 'DirectoryService', 'FavoritesService', function ($scope, $stateParams, $ionicPopup, DirectoryService, FavoritesService) {
		
		$scope.filled = false
		$scope.unfilled = false
		
		$scope.checkFavorite = FavoritesService.checkIfFavorite($stateParams.RecID);
		if ($scope.checkFavorite == true) {
			$scope.filled = true;
		}
		else {
			$scope.unfilled = true
		}
		
		$scope.deleteFavorite = function() {
			var confirmPopup = $ionicPopup.confirm({
			 title: 'Delete Favorite',
			 template: 'Are you sure you would like to delete this favorite?'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				$scope.deleted = FavoritesService.deleteFavorite($stateParams.RecID, 'company');
				$scope.changeStar()
			 }
		   });
			
		}

		$scope.details = DirectoryService.getDetails($stateParams.RecID);    
		
		$scope.saveFavoriteCompany = function () {
			$scope.fav = FavoritesService.saveFavoriteCompany($scope.details)
			$scope.filled = true
			$scope.unfilled = false
		}
		
		$scope.changeStar = function () {
			$scope.unfilled = true
			$scope.filled = false
		}
}]);