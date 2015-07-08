angular.module('starter.controllers')

    .controller('HomeCtrl', ['$scope', '$http', '$state', 'SyncService', function ($scope, $http, $state, SyncService) {

		//$scope.home = ScheduleService.getFeaturedScheduledItem();
		//console.log($scope.schedule)
		
		SyncService.getDirectory().	success(function (data){
			SyncService.saveLocally('tCompany',data)
		})
		SyncService.getMaps().success(function (data){
			SyncService.saveLocally('tMaps',data)
		})
		SyncService.getSchedule().success(function (data){
			SyncService.saveLocally('tSchedule',data)
			getFeaturedScheduleList()
		})
		SyncService.getSpeaker().success(function (data){
			SyncService.saveLocally('tSpeaker',data)
		})
		SyncService.getSocialMediaInfo().success(function (data){
			SyncService.saveLocally('tSocial',data)
		})
		//SyncService.syncInfoRequest().success(function (data){
		//	SyncService.saveLocally('tSocial',data)
		//})



	function getFeaturedScheduleList() {
	    var temp = localStorage.getItem('tSchedule')
	    data = JSON.parse(temp)

	    //console.log(data)
		$('#trivia-live').css("display","none")
		$('#presentation-live').css("display","none")
		var tLive = "no"
	    //console.log(data)
	    var first = "no"
	    var featuredOutput = ''
		   var currentdate = new Date(); 
		    var hours = currentdate.getHours()
			var suffix = hours >= 12 ? "PM":"AM"; 
			hours = ((hours + 11) % 12 + 1);
			
		    var currenttime = hours + ":" + currentdate.getMinutes() + " " + suffix
			var today = currentdate.getMonth()+1 + "/" + currentdate.getDate() + "/" + currentdate.getFullYear()
			//alertify.alert(currenttime)
			//alertify.alert(today)
	   // alert("running")
	    //featuredOutput += '<li class="table-view-cell table-view-divider">' + date + '</li>'
	    for (i = 0; i < data.length; i++) {
			       icon = ""
				  // onClick = 'onclick="saveFavoriteSchedule(\'' + data[i].RecID + '\',\'' + data[i].Speaker + '\',\'' + data[i].Title + '\',\'' + data[i].Image + '\',\'' + data[i].StartTime + '\',\'' + data[i].ScheduledDate + '\',\'schedule\',\'' + data[i].SpeakerID + '\')"'
				var startTime = data[i].StartTime
				var endTime = data[i].EndTime
				var scheduledDate = data[i].ScheduledDate
				//alert(today)
				//alert(scheduledDate)
				//alert(today == schedul
				//convert both time into timestamp
				var ctt = new Date("November 13, 2013 " + currenttime);
				ctt = ctt.getTime();
				
				var stt = new Date("November 13, 2013 " + startTime);
				stt = stt.getTime();
				
				var endt = new Date("November 13, 2013 " + endTime);
				endt = endt.getTime();
				
				//alert(ctt >= stt)
				//alert(ctt <= endt)
				//alert(today)
				//alert(scheduledDate)
				//alert(today == scheduledDate)
				// IF IT'S A CURRENT EVENT (NOW ACCORDING TO TIME)
				//alert(first)
			    if (ctt >= stt && ctt <= endt && today == scheduledDate && first == "no" ){
					var first = "yes"
					
					
					//featuredOutput += '<div style="position:absolute; left:50%; top:50%;">test</div>'
					 if(data[i].EventType == "trivia"){
						featuredOutput += '<a href="#/app/trivia.html/' + data[i].RecID + '" style="z-index:10" >'
					   var tLive = "yes"
					   $('#trivia-live').css("display","block")
					}
					if(data[i].EventType == "presentation"){
						//console.log(data[i])
						speakerID = data[i].SpeakerID
						featuredOutput += '<a href="#/app/polling.html/' + speakerID + '" >'
					   var tLive = "yes"
					   
					   $("#presentation-link").attr("href", "polling.html?id=" + speakerID + "#polling")
					   $("#presentation-linkMenu").attr("href", "polling.html?id=" + speakerID + "#polling")
					   $("#presentation-linkMenu2").attr("href", "polling.html?id=" + speakerID + "#polling")
					   
					   $('#presentation-live').css("display","block")
					}
					//featuredOutput += '<a href="#/app/directory">'
                        featuredOutput += '<div class="thumb featured" style="height:220px; overflow:hidden; position:relative;" >'
						
						featuredOutput += '<img src="' + data[i].Image + '">'
	                    var im = data[i].Image
						featuredOutput += '<div class="inner-content">'
						featuredOutput += '<h2 style="margin:0px; color:#F1F1F1">' + data[i].Title + '</h2>'
						if(data[i].ShortDesc != "" && data[i].ShortDesc != null){
						  featuredOutput += '<p>' + data[i].ShortDesc + '</p>'
						} else  {
							featuredOutput += '<p>Start Time: ' + data[i].StartTime + '</p>'
						}
						featuredOutput += '</div>'
						featuredOutput += '</div></a>'
				}
			    else {
			        // ELSE GRAB THE NEXT ONE MARK AS FEATURED
			        if (data[i].featured == 1 && first == "no") {

						var first = "yes"
						//featuredOutput += '<div style="position:absolute; left:50%; top:50%;">test</div>'
					
						featuredOutput += '<a href="#/app/directory" style="z-index:999">'
						featuredOutput += '<div class="thumb featured" style="height:220px; overflow:hidden; position:relative;" >'
						
						featuredOutput += '<img src="' + data[i].Image + '">'
	                    var im = data[i].Image
						featuredOutput += '<div class="inner-content">'
						featuredOutput += '<h2 style="margin:0px; color:#F1F1F1">' + data[i].Title + '</h2>'
						if(data[i].ShortDesc != "" && data[i].ShortDesc != null){
						  featuredOutput += '<p>' + data[i].ShortDesc + '</p>'
						} else  {
							featuredOutput += '<p style="font-size:.6em; color:#FFF;"><strong>Start Time: ' + data[i].StartTime + '</strong></p>'
						}
						featuredOutput += '</div>'
						featuredOutput += '</div></a>'
					}
				}
	    }
	    //alert(featuredOutput)
	    $('#featured').html(featuredOutput)
	    //console.log(scheduleOutput)
	   // $('#directorycontent').append(scheduleOutput)

	  //  $('#directorycontent').append('<li class="table-view-cell media"><a class="navigate-right" href="details.html?id=' + recID + '#details" data-transition="slide-in"><img style="width:42px;" class="media-object pull-left" src="' + logo + '"/><div class="media-body">' + company + '<br><span style="font-size:11px">' + location + '</span><p>' + description + '</p></div></a> </li>')

	}

		//;getFeaturedScheduleList()
    }]);
