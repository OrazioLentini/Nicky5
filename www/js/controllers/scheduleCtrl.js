angular.module('starter.controllers')

    .controller('ScheduleCtrl', ['$scope', '$http', '$state', 'ScheduleService', 'FavoritesService', '$filter', '$ionicPopup', '$ionicLoading' , 'PollingService', '$ionicModal', 'SpeakerService', function ($scope, $http, $state, ScheduleService, FavoritesService, $filter, $ionicPopup, $ionicLoading, PollingService, $ionicModal, SpeakerService) {
    	var total = localStorage.getItem('numOfFav')
		if (total == null) {
			localStorage.setItem("numOfFav", 1)
		}

    	$scope.checkFav = function () {
			$scope.schedule = ScheduleService.getSchedule();
			$scope.tempSch = $scope.schedule
			$scope.fav = FavoritesService.checkIfFavoriteSchedule()

			for (i = 0; i < $scope.schedule.length; i++){
				tempTime = $scope.schedule[i].StartTime
				$scope.schedule[i].displayTime = Date.parse(tempTime)

				if ($scope.schedule[i].fav == null) {
					$scope.schedule[i].Fav = false
					$scope.schedule[i].NoFav = true
				}
			}
			if ($scope.fav != 'all') {
				for (j = 0; j < $scope.fav.length; j++){
					var x = $scope.fav[j].ID

					for (i = 0; i < $scope.schedule.length; i++){

						if ($scope.schedule[i].RecID == x) {
							$scope.schedule[i].Fav = true
							$scope.schedule[i].NoFav = false
						}
					}
				}
			}
			$scope.schedule = _.groupBy($scope.schedule, 'ScheduledDate') 
		}
		$scope.checkFav()


		$scope.saveFavoriteSchedule = function(id) {

			total = parseInt(localStorage.getItem('numOfFav'))
			total += 1
			localStorage.setItem("numOfFav", total)

			$scope.info = $filter('filter')($scope.tempSch, {RecID: id })
			$scope.fav = FavoritesService.saveFavoriteSchedule($scope.info[0])
			//$scope.maps = MapsService.getMaps()
			$scope.checkFav()
			$ionicLoading.show({template: 'Added to Favorites', noBackdrop: true, duration: 1000});

			/*dateData = $scope.info[0].ScheduledDate
			var newDate = dateData.split("/")

				year = parseInt(newDate[2])
				month = parseInt(newDate[0]) - 1
				day = parseInt(newDate[1])

			timeData = $scope.info[0].StartTime
			var newTime = timeData.split(" ")

				AMorPM = newTime[1]

			var time = newTime[0].split(":")

				hour = parseInt(time[0])
				min = parseInt(time[1])

			if(AMorPM == 'PM' & hour != 12) {
				hour = parseInt(hour) + 12
			}*/


		    var timeData = Date.parse($scope.info[0].StartTime)
            AMorPM = $filter('date')(timeData, 'a')
            hour = $filter('date')(timeData, 'hh')
            min = $filter('date')(timeData, 'mm')

			var d = new Date(year, month, day, hour, min, 00, 0);
			notify($scope.info[0].Title, d, $scope.info[0].RecID)


		}

		$scope.deleteFavorite = function(id) {
			var confirmPopup = $ionicPopup.confirm({
			 title: 'Delete Favorite',
			 template: 'Are you sure you would like to delete this favorite?'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				$scope.deleted = FavoritesService.deleteFavorite(id, 'schedule');
				$scope.checkFav()
				$ionicLoading.show({template: 'Favorite Deleted', noBackdrop: true, duration: 1000});
				//cancelNotify(id)
			 }
		   });
		}




		$scope.viewSlides = function(id) {
			PollingService.getPresentationSlides(id). success( function (data) {
				$scope.slides = data
				$scope.open()
			})
		
		}
		$ionicModal.fromTemplateUrl('templates/presentationSlides.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeVideo = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.open = function(id, speakerID) {
			PollingService.getPresentationSlides(id). success( function (data) {
				$scope.slides = data
				$scope.modal.show();
			})
			$scope.desc =ScheduleService.getDetails(id);
			$scope.speakerInfo = SpeakerService.getSpeaker(speakerID)
		};

		// Perform the login action when the user submits the login form
		$scope.playVideo = function(x, id) {
			$('.li').removeClass('dark')
	        $('.' + id).addClass('dark');
			$("#video").html('<iframe id="ytplayer"  width="100%" height="390"  src="' + x + '"  frameborder="0"/>')
		};

    }]);
