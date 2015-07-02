angular.module('starter.controllers')

    .controller('ScheduleCtrl', ['$scope', '$http', '$state', 'ScheduleService', function ($scope, $http, $state, ScheduleService) {

		$scope.schedule = ScheduleService.getSchedule();
		//console.log($scope.schedule)
		function getScheduleList() {
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
		   // $('#directorycontent').append(scheduleOutput)

		  //  $('#directorycontent').append('<li class="table-view-cell media"><a class="navigate-right" href="details.html?id=' + recID + '#details" data-transition="slide-in"><img style="width:42px;" class="media-object pull-left" src="' + logo + '"/><div class="media-body">' + company + '<br><span style="font-size:11px">' + location + '</span><p>' + description + '</p></div></a> </li>')

		}
		getScheduleList()
    }]);
