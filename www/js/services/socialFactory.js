angular.module('starter.services')

    .factory('SocialService', function ($http) {

    
    return {
        getInstagram: function() {   
            var url = "http://patty5.com/AppApis/apiInstagram.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        },
        getTwitter: function() {   
            var url = "http://patty5.com/AppApis/apiTwitter.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        }
    }
});
