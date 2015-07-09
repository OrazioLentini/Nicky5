angular.module('starter.services')

    .service('RequestInfoService', function ($http) {

	var requests = ""

		this.requestMoreInfo = function(ID, Type, userID, FID){ 
			var url = "http://patty5.com/AppApis/apiRequestInfo.asp?TypeID=" + ID + "&Type=" + Type + "&UserID="+userID + "&Function=" + FID;
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
