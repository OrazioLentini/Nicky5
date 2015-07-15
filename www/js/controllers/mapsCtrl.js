angular.module('starter.controllers')

    .controller('MapsCtrl', ['$scope', 'MapsService','$ionicPopup', '$filter', 'FavoritesService','$ionicLoading', '$ionicModal','$stateParams','MenuLinksService', function ($scope,  MapsService, $ionicPopup, $filter, FavoritesService, $ionicLoading, $ionicModal, $stateParams, MenuLinksService) {

		$scope.title = MenuLinksService.getHeader($stateParams.ID)

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    	}).then(function(modal) {
     	 $scope.modal = modal;
    	});

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    //$scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(index) {
    	//alert(index)
      
          $scope.imageSrc  = index;

      $scope.openModal();
    }

  
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