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
        },
        this.getHeader = function(id){ 
            var temp = localStorage.getItem('menu')
            menu = JSON.parse(temp)

            return menu[id-1].Name
        }
});
