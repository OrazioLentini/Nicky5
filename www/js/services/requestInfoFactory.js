angular.module('starter.services', [])

    .factory('RequestInfoService', function () {

	var requests = ""
	return {
		getDirectory: function(){ 
				var temp = localStorage.getItem('tCompany')
				requests = JSON.parse(temp)
				//console.log(requests)
				
				return requests;
		},
		getDetails: function(id){
			for(i=0;i<requests.length;i++){
				//console.log("test")
				if(requests[i].RecID == id){
					//console.log(requests[i])
					return requests[i];
				}
			}
		}  
	}
});
