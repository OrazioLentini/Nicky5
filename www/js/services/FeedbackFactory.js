angular.module('starter.services')

    .service('FeedbackService', function ($http) {

	var requests = ""
		this.provideFeedback = function(feedback){ 
            
            var temp = localStorage.getItem('login')
            data = JSON.parse(temp)

            var username = data[0].Username

            var url = 'http://patty5.com/AppApis/apiFeedback.asp?Username=' + username + '&Feedback=' + feedback;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })
        }
});
