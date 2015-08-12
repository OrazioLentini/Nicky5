angular.module('starter.services')

    .service('RequestInfoService', function ($http) {

	var requests = ""
	var requests2 = ""
		this.showButton = function(id, type){
			var temp = localStorage.getItem('infoRequest')

			if (temp == null) {
				requests2 = true
				return requests2
			}
			else {
				requests2 = JSON.parse(temp)
				for(i=0;i<requests2.length;i++){
					//console.log("test")
					if(requests2[i].TypeID == id && requests2[i].Type == type){
						//console.log(requests[i])
						requests2 = false
						return requests2;
					}
				}
				requests2 = true
				return requests2
			}
		},
		this.requestMoreInfo = function(ID, Type, userID, FID){ 
			//console.log(ID + " " + Type + " " + userID + " " + FID)
			var url = "http://app.nicky3.com/AppApis/apiRequestInfo.asp?TypeID=" + ID + "&Type=" + Type + "&UserID="+userID + "&Function=" + FID;
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json',
                }
            }). 
            success (function(data){
            	//console.log(data)
           		if(data.Result == "Success") {
					var infoReq = '{"Type": \"' + data.Type + '\", "TypeID": \"' + data.TypeID + '\"}'
				
					var newInfoReq = ''
					var temp = localStorage.getItem('infoRequest')
					if (temp == null) {
						localStorage.setItem('infoRequest', '[' + infoReq + ']')
					}
					else {
						temp = temp.substring(1, temp.length - 1)
						newInfoReq = "[" + temp + "," + infoReq + "]"
						localStorage.setItem("infoRequest", newInfoReq)
					}
					success = "success"
					return success
				}
				else {
					success = "fail"
					return "fail"
				}
            })
		}
});
