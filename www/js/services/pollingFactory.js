angular.module('starter.services')

    .service('PollingService', function ($http) {

	var requests = ""
		this.askAQuestion = function(username, question){ 
            
            var url = "http://patty5.com/AppApis/apiAskQuestion.asp" + "?Username=" + username + "&question=" + question;
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
	              console.log(data)
            })   

			return requests;
		},

		this.savePollingAnswer = function(answer) {
			var d = new Date()
			var c = String(d.getHours()) + "!" + String(d.getSeconds()); 
			
			var temp = localStorage.getItem('login')
		    data = JSON.parse(temp)
			
			var user = data[0].BadgeID		
			
            var url = "http://patty5.com/AppApis/apiPolling.asp?user=" + user + "&answer=" + answer + "&c="+c;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })			
		}
});
