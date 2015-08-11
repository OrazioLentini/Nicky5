angular.module('starter.services')

    .factory('ScheduleService', function ($filter) {

	var requests = ""
	return {
		getSchedule: function(){ 
				var temp = localStorage.getItem('tSchedule')
				requests = JSON.parse(temp)

				var currentDate = new Date()
	            var hours = currentDate.getHours()
	            var suffix = hours >= 12 ? "PM" : "AM"
	            hours = ((hours  + 11) % 12 + 1)
	            minutes = currentDate.getMinutes()
	            if (minutes < 10) {
	                minutes = '0' + minutes
	            }
	
	            var currentTime = hours + ":" + minutes + " " + suffix
	            var today = currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()
			
				for (i = 0; i < requests.length; i++){
					var s = Date.parse(requests[i].StartTime)
					startTime = $filter('date')(s, 'hh:mm a')		
					var e = Date.parse(requests[i].EndTime)
					endTime = $filter('date')(e, 'hh:mm a')
					
					tempSchedule = requests[i].ScheduledDate
					var scheduledDate = tempSchedule.split(" ")
					scheduledDate = scheduledDate[0]

					var ctt = new Date("November 13, 2013 " + currentTime)
					ctt = ctt.getTime()
					var stt = new Date("November 13, 2013 " + startTime)
					stt = stt.getTime()
					var endt = new Date("November 13, 2013 " + endTime)
					endt = endt.getTime()

	                //LIVE
	                if(ctt >= stt && ctt <= endt && today == scheduledDate) {
	                        requests[i].status = 'live'   
	                }
					//NEXT SCHEDULED
					else if(((stt - ctt) < 900000 && (stt - ctt) > 0)  && today == scheduledDate) {
	                    requests[i].status = 'upcoming'   
					}
					else {
						requests[i].status = ''
					}
				
					requests[i].Fav = false
					requests[i].NoFav = true	
					
					requests[i].Attending = false
					requests[i].NotAttending = true			
				}

				return requests;
		},
		getDetails: function(id){
			var temp = localStorage.getItem('tSchedule')
			requests = JSON.parse(temp)
			for(i=0;i<requests.length;i++){
				//console.log("test")
				if(requests[i].RecID == id){
					return requests[i];
				}
			}
		},
		saveAttending: function(id){
			var attending = '{"ID": \"' + id + '\"}'
		    var temp = localStorage.getItem('attending')
		    if (temp == null) {
		        localStorage.setItem('attending', '[' + attending + ']')
		    }
		    else {
		        temp = temp.substring(1, temp.length - 1)
		        newAttend = "[" + temp + "," + attending + "]"
		        localStorage.setItem("attending", newAttend)
		    } 
			success = true	
			return success;
		},
		getAttending: function() {
			
			var attend = localStorage.getItem('attending')

			if(attend != null){
				attending = JSON.parse(attend)
				return attending
			}
			else {
				success = 'all'
				return success
			}
		},	
		deleteAttending: function(id) {
			var x;
			var json = JSON.parse(localStorage["attending"]);
			for (i=0;i<json.length;i++){
				if (json[i].ID == id) {

					json.splice(i, 1);
				}
				}

				if(JSON.stringify(json) == "[]"){
					localStorage.removeItem("attending");	
				} 
				else {
					localStorage["attending"] = JSON.stringify(json);
				}
				success = 'removed'
				return success
			}
	}
});
