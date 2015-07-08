angular.module('starter.services')

    .factory('SyncService', function ($http) {

	var success = ""
	return {
        getDirectory: function () {
            var url = 'http://patty5.com/AppApis/apiDirectory.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            });
        },
        getMaps: function () {
            var url = 'http://patty5.com/AppApis/apiMaps.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            });
        },
        getSchedule: function () {
            var url = 'http://patty5.com/AppApis/apiSchedule.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            });
        },
        getSpeaker: function () {
            var url = 'http://patty5.com/AppApis/apiSpeaker.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            });
        },     
        getSocialMediaInfo: function () {
            var url = 'http://patty5.com/AppApis/apiSocial.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            });
        },     
        syncInfoRequest: function () {
	        var data = localStorage.getItem('infoRequest')
	    	x = JSON.parse(data)
	   		 if (x != null) {
	        	length = x.length
	    	}
	    	var temp = localStorage.getItem('login')
	    	if (temp != null) {
	        	dataUser = JSON.parse(temp)

	        	var userID = dataUser[0].UserID


	            var url = "http://patty5.com/AppApis/apiRequestInfo.asp?data=" + data + "&UserID=" + userID + "&Function=2&Length=" + length;
	            return $http.jsonp(url, {
	                params: {
	                    callback: 'JSON_CALLBACK',
	                    format:'json'
	                }
	            });
	        }
        },  
        saveLocally: function (table, data) {
        	//console.log(JSON.stringify(data))
        	data = JSON.stringify(data)
        	localStorage.setItem(table, data)

        	if(table = 'tSocial') {
        		saveSocialLocally()
        	}

            return success
        }
    }
});


//http://api.worldweatheronline.com/free/v1/weather.ashx?q=London&format=json&num_of_days=5&key=atf6ya6bbz3v5u5q8um82pev'

