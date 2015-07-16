angular.module('starter.services')

    .factory('ScheduleService', function () {

	var requests = ""
	return {
		getSchedule: function(){ 
				var temp = localStorage.getItem('tSchedule')
				requests = JSON.parse(temp)
				//console.log(requests)
				
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
