angular.module('starter.services')

    .service('FeedbackService', function ($http) {

		this.provideFeedback = function(feedback){ 
            var temp = localStorage.getItem('login')
            data = JSON.parse(temp)

            var username = data[0].Username

            var url = 'http://app.nicky3.com/AppApis/apiFeedback.asp?Username=' + username + '&Feedback=' + feedback;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })
        }
});
