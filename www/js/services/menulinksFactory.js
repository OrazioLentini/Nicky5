angular.module('starter.services')

    .service('MenuLinksService', function ($http) {

	var requests = ""
		this.getMenuLinks = function(){ 
            
            var url = 'http://patty5.com/AppApis/apiMenuLinks.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })
        }
});
