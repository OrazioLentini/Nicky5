angular.module('starter.services')

    .factory('SpeakerService', function () {

	var requests = ""
	return {
		getSpeaker: function(id){
			var temp = localStorage.getItem('tSpeaker')
			requests = JSON.parse(temp)
			for(i=0;i<requests.length;i++){
				//console.log("test")
				if(requests[i].SpeakerID == id){
					//console.log(requests[i])
					return requests[i];
				}
			}
		}  
	}
});
