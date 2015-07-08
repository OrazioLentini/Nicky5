angular.module('starter.services')

    .service('SyncService', function ($http) {

	var success = ""

        this.getDirectory =  function () {
            var url = 'http://patty5.com/AppApis/apiDirectory.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tCompany', data)
            })
        },
        this.getMaps = function () {
            var url = 'http://patty5.com/AppApis/apiMaps.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tMaps', data)
            })
        },
        this.getSchedule = function () {
            var url = 'http://patty5.com/AppApis/apiSchedule.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSchedule', data)
            })
        },
        this.getSpeaker = function () {
            var url = 'http://patty5.com/AppApis/apiSpeaker.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSpeaker', data)
            })
        },     
        this.getSocialMediaInfo = function () {
            var url = 'http://patty5.com/AppApis/apiSocial.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSocial', data)
                //this.saveLocally()
            })
        },     
        this.syncInfoRequest = function () {
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
	            $http.jsonp(url, {
	                params: {
	                    callback: 'JSON_CALLBACK',
	                    format:'json'
	                }
	            }).            
                success (function(data){
                    data = JSON.stringify(data)
                    localStorage.setItem('infoRequest', data)
                //this.saveLocally()
            })
	        }
        },  
        this.saveLocally = function (table, data) {

        		saveSocialLocally()

           // return success
        },
        this.sync = function(){
            this.getDirectory()
            this.getMaps()
            this.getSchedule()
            this.getSpeaker()
            this.getSocialMediaInfo()
            this.syncInfoRequest()
            this.saveLocally()

            sucess = 'complete'
            return sucess

        }
    
});


//http://api.worldweatheronline.com/free/v1/weather.ashx?q=London&format=json&num_of_days=5&key=atf6ya6bbz3v5u5q8um82pev'

