angular.module('starter.services', [])

    .factory('DirectoryService', function () {

	var requests = ""
	var requests2 = ""
	return {
		getDirectory: function(){ 
				var temp = localStorage.getItem('tCompany')
				requests = JSON.parse(temp)
				//console.log(requests)
				
				return requests;
		},
		showButton: function(id){
			var temp = localStorage.getItem('infoRequest')

			if (temp == null) {
				requests2 = true
				return requests2
			}
			else {
				requests2 = JSON.parse(temp)
				for(i=0;i<requests2.length;i++){
					//console.log("test")
					if(requests2[i].TypeID == id){
						//console.log(requests[i])
						requests2 = false
						return requests2;
					}
				}
				requests2 = true
				return requests2
			}
		},
		getDetails: function(id){
			for(i=0;i<requests.length;i++){
				//console.log("test")
				if(requests[i].RecID == id){
					//console.log(requests[i])
					return requests[i];
				}
			}
		},  
	}
});
