angular.module('starter.controllers')

    .controller('ScheduleCtrl', ['$scope', '$http', '$state', 'ScheduleService', 'FavoritesService', '$filter', '$ionicPopup', '$ionicLoading', function ($scope, $http, $state, ScheduleService, FavoritesService, $filter, $ionicPopup, $ionicLoading) {
    	var total = localStorage.getItem('numOfFav')
		if (total == null) {
			localStorage.setItem("numOfFav", 1)
		}

    	$scope.checkFav = function () {
			$scope.schedule = ScheduleService.getSchedule();
			$scope.tempSch = $scope.schedule
			$scope.fav = FavoritesService.checkIfFavoriteSchedule()

			for (i = 0; i < $scope.schedule.length; i++){
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
			console.log($scope.info[0])

			dateData = $scope.info[0].ScheduledDate
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
			}

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












		$scope.getScheduleList = function() {
		    var temp = localStorage.getItem('tSchedule')
		    var fav = localStorage.getItem('scheduleFavorites')
			data = JSON.parse(temp)
			favdata = JSON.parse(fav)
			
		    //console.log(data)

		    var date = data[0].ScheduledDate
		    var scheduleOutput = ''
		     scheduleOutput += '<ul class="list">'
			
			scheduleOutput += '<li class="item item-divider" style="background:#293F54; color:#F2F2F2">' + date + '</li>'
		    for (i = 0; i < data.length; i++) {
				       icon = "-outline"
					   onClick = 'onclick="saveFavoriteSchedule(\'' + data[i].RecID + '\',\'' + data[i].Speaker + '\',\'' + data[i].Title + '\',\'' + data[i].Image + '\',\'' + data[i].StartTime + '\',\'' + data[i].ScheduledDate + '\',\'schedule\',\'' + data[i].SpeakerID + '\')"'
					   if(favdata != null){
				       for (d = 0; d < favdata.length; d++) {
						  // alert(favdata[d].type)
							if(favdata[d].ID == data[i].RecID && favdata[d].type == 'schedule') {
								//alert("match")
								var icon = ""
								onClick = 'onclick="deleteFavorites(\'' + favdata[d].ID + '\',\''+ favdata[d].type+'\')"'
							}
						 }
					   }
				
		            if (date != data[i].ScheduledDate) {
		               date = data[i].ScheduledDate
			           scheduleOutput += '<li class="item item-divider" style="background:#293F54; color:#F2F2F2">' + date + '</li>'
					 }
		            scheduleOutput += '<li class="item item-thumbnail-left item-icon-right"><img src="' + data[i].Image + '"/>'
		            if (data[i].Speaker != '') {
		                scheduleOutput += '<p style="font-size:14px; font-weight: bold">Speaker: ' + data[i].Speaker + '</p>'
						scheduleOutput += '<p style="font-size:12px;">' + data[i].Title + '</p>'
					} else {
						scheduleOutput += '<p style="font-size:14px; font-weight:bold;">' + data[i].Title + '</p>'
					}
		                scheduleOutput += '<p style="font-size:.6em; color:#3C9AC3;"><strong>Start Time: ' + data[i].StartTime + '</strong></p>'
		                scheduleOutput += '<i class="icon ion-ios-star' + icon + '" ' + onClick + '></i>'
						//scheduleOutput += '<button class="btn btn-link btn-nav pull-right">'
						//scheduleOutput += '<span class="icon icon-star' + icon + '" style="font-size:24px;"' + onClick + '"></span>'
						//scheduleOutput += '</button>'
		                scheduleOutput += '</li>'
		    }
		     scheduleOutput += '</ul>'
		    $('#schedulecontent-list').html(scheduleOutput)


		}
		//$scope.getScheduleList()
    }]);
