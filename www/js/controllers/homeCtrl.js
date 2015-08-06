angular.module('starter.controllers')

    .controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$state', 'SyncService', '$ionicLoading', '$ionicHistory', '$ionicPlatform', 'MenuLinksService', '$timeout',  function ($rootScope, $scope, $http, $state, SyncService, $ionicLoading, $ionicHistory, $ionicPlatform, MenuLinksService, $timeout) {
		ionic.Platform.ready(function(){
           //alert("ready");
			//var featureItem = localStorage.getItem('Featured')
			//$scope.featureItem = JSON.parse(featureItem)
			//console.log($scope.featureItem.Title)

               /*$scope.feature = MyService.feature
			       $timeout(function() {
			           //alert("grab featured")
					   //scope.feature = SyncService.getFeaturedScheduleList() 
			           $timeout(function() {
				        var mySwiper = new Swiper('.swiper-container', {
						    autoplay: 8000,
						    effect: 'slide',
						    speed: 500
						});   
			            $( "#thumb" ).fadeOut('slow');
			           $( ".swiper-wrapper" ).fadeIn('slow');
			            
						},250);	

			           /*$timeout(function() {
				         navigator.splashscreen.hide();
				         alert('done')
						},600);*/
			            

				    //SyncService.sync()
				     // },1000);
       // $scope.feature = MyService.feature
        /*$timeout(function() {
	        var mySwiper = new Swiper('.swiper-container', {
							    autoplay: 8000,
							    effect: 'slide',
							    speed: 500
							});   
			
		},250);*/
		$ionicHistory.clearHistory()	
		});	
				  


    MenuLinksService.getMenuLinks(). success(function (data){
  		$scope.menu = data
  		data = JSON.stringify(data)
        localStorage.setItem('menu', data)
        var featureItem = localStorage.getItem('Featured')
		$scope.featureItem = JSON.parse(featureItem)
		$timeout(function() {
		var mySwiper = new Swiper('.swiper-container', {
           autoplay: 8000,
           effect: 'slide',
           speed: 500
        });   
        },250);
  	});
    id = [0]
    plus = 2
    countx = "no"
    first = "no"
  	for(i = 0; i < 25 ; i++){
  		
  		if(plus == 2){
  		id.push(id[i]+2)
  	    plus = 3
  	    countx = "again"
  	    } else {
  	    	if(plus == 3){
  	    		if(countx == "again" && first == "yes"){
  	    			id.push(id[i]+2)
  	    			plus = 3
  	    			countx = "no"
  	    			// not on the first time
  	    			
  	    		} else {
  	    		id.push(id[i]+3)
  	    		plus = 2
  	    		first = "yes"
  	    	    }
  	    	}
  	    }
    
    }
    

  	
  	//console.log(id)
     $scope.isRowSelected = function(x) {
	    if(id.indexOf(x) > -1){
           return true
          
        } else {
        	return false
        	
        }
	}

	//$scope.feature = SyncService.getFeaturedScheduleList()
	//console.log($scope.feature)

	$scope.scan = function() {
		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$ionicLoading.show({template: 'You must be logged in to access the QR Code', noBackdrop: false, duration:1500});
		}
		else {
			scan2()
		}
	}
	    
 
				
}]);
