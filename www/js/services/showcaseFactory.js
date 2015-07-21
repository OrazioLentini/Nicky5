angular.module('starter.services')

    .factory('ShowcaseService', function () {

    var products = ""
    return {
        getProducts: function(){
            var temp = localStorage.getItem('tProductList')
            products = JSON.parse(temp)
            return products
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
