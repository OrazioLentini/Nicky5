angular.module('starter.services')

    .factory('ShowcaseService', function ($http) {

    var products = ""
    return {
        getProducts: function(){
            var temp = localStorage.getItem('tProductList')
            products = JSON.parse(temp)
            return products
        },  
        getShowcaseImages: function(id) {   
            var url = "http://patty5.com/AppApis/apiShowcaseImages.asp?ID=" + id;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        },
       getDetails: function(id){
            var temp = localStorage.getItem('tProductList')
            products = JSON.parse(temp)
            for(i=0;i<products.length;i++){
                //console.log("test")
                if(products[i].RecID == id){
                    //console.log(requests[i])
                    return products[i];
                }
            }
        }
    }
});
