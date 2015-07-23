angular.module('starter.controllers')

    .controller('FavoritesCtrl', ['$rootScope', '$scope', 'MapsService','$ionicPopup', '$filter', 'FavoritesService','$ionicLoading','MenuLinksService','$stateParams', '$ionicModal', function ($rootScope, $scope,  MapsService, $ionicPopup, $filter, FavoritesService, $ionicLoading,MenuLinksService, $stateParams, $ionicModal) {

		$scope.title = MenuLinksService.getHeader($stateParams.ID)

    	$scope.favorites = function () {
	   	    var directory = localStorage.getItem('companyFavorites')
	 	    var schedule = localStorage.getItem('scheduleFavorites')
	    	var maps = localStorage.getItem('mapsFavorites')
			var showcase = localStorage.getItem('showcaseFavorites')

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
			if(showcase != null) {
	    		$scope.showcaseFav = JSON.parse(showcase)
	    	}
	    	else {
	    		$scope.noShowcase = "You have no favorites for showcase."
	    		$scope.showcaseFav = ""
	    	}
	    }

	    $scope.favorites()

		$scope.showSch = true
		$scope.showDir = false
		$scope.showMaps = false


		$scope.toggle = function (type) {
			if (type == 'schedule') {
				$scope.showSch = true
				$scope.showDir = false 
				$scope.showMaps = false
				$scope.showShowcase = false
				$('.favorites .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.schedule').addClass('buttonPickerActive');
        		$rootScope.cache = "schedule"

			}
			if (type == 'directory') {
				$scope.showSch = false
				$scope.showDir = true 
				$scope.showMaps = false
				$scope.showShowcase = false
				$('.favorites .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.directory').addClass('buttonPickerActive');
        		$rootScope.cache = "directory"

			}
			if (type == 'maps') {
				$scope.showSch = false
				$scope.showDir = false 
				$scope.showMaps = true
				$scope.showShowcase = false
				$('.favorites .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.maps').addClass('buttonPickerActive');
        		$rootScope.cache = "maps"
			}
			if (type == 'showcase') {
				$scope.showSch = false
				$scope.showDir = false 
				$scope.showMaps = false
				$scope.showShowcase = true
				$('.favorites .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.showcase').addClass('buttonPickerActive');
        		$rootScope.cache = "showcase"
			}
		}
		if($rootScope.cache > ""){
        			var tab = $rootScope.cache

        			$('.favorites .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        			$('.'+tab).addClass('buttonPickerActive');
        			$scope.toggle(tab)
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
      //console.log('Modal is shown!');
    });

    //$scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(index) {
    	//alert(index)
      
          $scope.imageSrc  = index;

      $scope.openModal();
    }
}]);