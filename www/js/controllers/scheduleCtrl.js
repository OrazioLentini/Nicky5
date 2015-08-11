angular.module('starter.controllers')

    .controller('ScheduleCtrl', ['$scope', '$http', '$state', 'ScheduleService', 'FavoritesService', '$filter', '$ionicPopup', '$ionicLoading' , 'PollingService', '$ionicModal', 'SpeakerService' ,'$stateParams','MenuLinksService', function ($scope, $http, $state, ScheduleService, FavoritesService, $filter, $ionicPopup, $ionicLoading, PollingService, $ionicModal, SpeakerService,  $stateParams, MenuLinksService) {
    	
    	$scope.title = MenuLinksService.getHeader($stateParams.ID)

    	var total = localStorage.getItem('numOfFav')
		if (total == null) {
			localStorage.setItem("numOfFav", 1)
		}

    	$scope.checkFav = function () {
			$scope.schedule = ScheduleService.getSchedule();
			console.log($scope.schedule)
			$scope.att = ScheduleService.getAttending()
			$scope.tempSch = $scope.schedule
			$scope.fav = FavoritesService.checkIfFavoriteSchedule()

			/*for (i = 0; i < $scope.schedule.length; i++){
				tempTime = $scope.schedule[i].StartTime
				$scope.schedule[i].displayTime = Date.parse(tempTime)

				$scope.schedule[i].Fav = false
				$scope.schedule[i].NoFav = true
				
				$scope.schedule[i].Attending = false
				$scope.schedule[i].NotAttending = true
				
			}*/

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

			if ($scope.att != 'all') {
				for (j = 0; j < $scope.att.length; j++){
					var x = $scope.att[j].ID

					for (i = 0; i < $scope.schedule.length; i++){

						if ($scope.schedule[i].RecID == x) {
							$scope.schedule[i].Attending = true
							$scope.schedule[i].NotAttending = false
						}
					}
				}
			}

			$scope.schedule = _.groupBy($scope.schedule, 'displayDate') 
			if ($scope.tempSch == '') {
				$scope.noSch = true
			}
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

			dateData = $scope.info[0].ScheduledDate
			var newDate = dateData.split("/")

				year = parseInt(newDate[2])
				month = parseInt(newDate[0]) - 1
				day = parseInt(newDate[1])

			/*timeData = $scope.info[0].StartTime
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



		// PREVIEW PRESENTATION SLIDES 
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

		$scope.closePreview = function() {
			$scope.slides = ""
			$scope.desc = ""
			$scope.speakerInfo = ""
			$scope.modal.hide();
		};

		// Open the Preview Slides modal
		$scope.open = function(id, speakerID) {
			//console.log(id + " " + speakerID)
			PollingService.getPresentationSlides(id). success( function (data) {
				$scope.slides = data
				$scope.modal.show();
			})
			$scope.desc =ScheduleService.getDetails(id);
			//console.log($scope.desc)
			$scope.speakerInfo = SpeakerService.getSpeaker(speakerID)
		};


		$scope.playVideo = function(x, id) {
			$('.li').removeClass('dark')
	        $('.' + id).addClass('dark');
			$("#video").html('<iframe id="ytplayer"  width="100%" height="390"  src="' + x + '"  frameborder="0"/>')
		};


		//PROFILE
	$ionicModal.fromTemplateUrl('templates/registration.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalRegistration = modal;
	});

	$scope.register = function() {
		$scope.modalRegistration.show();
	};
	$scope.closeRegistration = function() {
	    $scope.modalRegistration.hide();
	};

	$scope.attendPresentation = function (id) {
		var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmation',
				template: 'Would you reserve a spot for this presentation?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					ScheduleService.saveAttending(id)
					$scope.checkFav()
				}
			});
	}

	$scope.notAttendingPresentation = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Confirmation',
			template: 'Are you sure you want to give up your reservation?'
		});
		confirmPopup.then(function(res) {
		if(res) {
			ScheduleService.deleteAttending(id);
			$scope.checkFav()
			$ionicLoading.show({template: 'Reservation Removed', noBackdrop: true, duration: 1000});
		//cancelNotify(id)
		}
		});
	}

    }]);