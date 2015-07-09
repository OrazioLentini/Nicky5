angular.module('starter.services')

    .service('TriviaService', function ($http) {

	var requests = ""
		this.saveAnswer = function(answer){ 
            var d = new Date(),
            ClientMilliseconds = d.getTime() - d.setHours(0,0,0,0);
            ClientTimer = ClientMilliseconds / 1000; 
            sDiff = localStorage.getItem("ServerClientTimeDiff");
            AdjustedTimeStamp = ClientTimer + parseFloat(sDiff);
            var c = String(d.getHours()) + "!" + String(d.getSeconds()); 
            
            var temp = localStorage.getItem('login')
            data = JSON.parse(temp)
            
            var user = data[0].BadgeID

            var url = "http://patty5.com/AppApis/apiTrivia.asp?user=" + user + "&answer=" + answer + "&c="+c+"&timestamp="+AdjustedTimeStamp;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })
		},

		this.serverTimeDifference = function() {
            var url = "http://patty5.com/AppApis/apiServerTime.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })			
		}
});
