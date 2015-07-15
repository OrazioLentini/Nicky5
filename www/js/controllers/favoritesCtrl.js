angular.module('starter.controllers')

    .controller('FavoritesCtrl', ['$scope', 'MapsService','$ionicPopup', '$filter', 'FavoritesService','$ionicLoading','MenuLinksService','$stateParams', function ($scope,  MapsService, $ionicPopup, $filter, FavoritesService, $ionicLoading,MenuLinksService, $stateParams) {
		$scope.title = MenuLinksService.getHeader($stateParams.ID)

    	$scope.favorites = function () {
	   	    var directory = localStorage.getItem('companyFavorites')
	 	    var schedule = localStorage.getItem('scheduleFavorites')
	    	var maps = localStorage.getItem('mapsFavorites')

	    	if(directory != null) {
	    		$scope.directoryFav = JSON.parse(directory)
	    	}
	    	else {
	    		$scope.noDirectory = "You have no favorites for directory."
	    		$scope.directoryFav = ""
	    	}

	    	if(schedule != null) {
	    		$scope.scheduleFav = JSON.parse(schedule)
	    		$scope.schedule = _.groupBy($scope.scheduleFav, 'ScheduledDate') 
	    	}
	    	else {
	    		$scope.noSchedule = "You have no favorites for schedule."
	    		$scope.schedule = ""
	    	}


	    	if(maps != null) {
	    		$scope.mapsFav = JSON.parse(maps)
	    	}
	    	else {
	    		$scope.noMaps = "You have no favorites for maps."
	    		$scope.mapsFav = ""
	    	}
	    }

	    $scope.favorites()

		$scope.showSch = false
		$scope.showDir = false
		$scope.showMaps = false
		$scope.toggle = function (type) {
			if (type == 'schedule') {
				$scope.showSch = true
				$scope.showDir = false 
				$scope.showMaps = false
			}
			if (type == 'directory') {
				$scope.showSch = false
				$scope.showDir = true 
				$scope.showMaps = false
			}
			if (type == 'maps') {
				$scope.showSch = false
				$scope.showDir = false 
				$scope.showMaps = true
			}
		}

		$scope.deleteFavorite = function(id, type) {
			var confirmPopup = $ionicPopup.confirm({
			 title: 'Delete Favorite',
			 template: 'Are you sure you would like to delete this favorite?'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				$scope.deleted = FavoritesService.deleteFavorite(id, type);
				$scope.favorites()
				$ionicLoading.show({template: 'Favorite Deleted', noBackdrop: true, duration: 1500});

			 }
		   });
		}
}]);