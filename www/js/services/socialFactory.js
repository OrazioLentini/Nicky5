angular.module('starter.services')

    .factory('SocialService', function ($http) {

    
    return {
        getInstagram: function() {   
            var url = "http://app.nicky3.com/AppApis/apiInstagram.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        },
        getTwitter: function() {   
            var url = "http://app.nicky3.com/AppApis/apiTwitter.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        },
        getYoutube: function() {   
            var temp = localStorage.getItem('Youtube')
            data = JSON.parse(temp)      
            
            return data.items
        },
        getFacebook: function() {   
            var url = "http://app.nicky3.com/AppApis/apiFacebook.asp";
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        }
    }
});


