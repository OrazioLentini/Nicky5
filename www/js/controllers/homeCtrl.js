angular.module('starter.controllers')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$state', 'SyncService', '$ionicLoading', '$ionicHistory', '$ionicPlatform', 'MenuLinksService', '$timeout', 'PollingService',  function ($rootScope, $scope, $http, $state, SyncService, $ionicLoading, $ionicHistory, $ionicPlatform, MenuLinksService, $timeout, PollingService) {

		ionic.Platform.ready(function(){
 
		$ionicHistory.clearHistory()	
		$('#test').html($('#time-0').html());
		});	

			  
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	
			//console.log("State changed: url = ", toState.url);
			if (toState.url == "/")
			{
				mySwiperX.update();  // this is here to force the slider into autoplay again
				if(mySwiperX.isEnd)
				mySwiperX.slidePrev();
				else
				mySwiperX.slideNext();
				//$('#test').html($('#time-0').html());
			}
	
	});

	var mySwiperX
	//$('#test').html($('#time-'+swiper.activeIndex).html()).fadeIn()}
	$timeout(function() {
	var mySwiper = new Swiper('.s1', {
	autoplay: 6000,
	effect: 'slide',
	speed: 500,
	observer: true,
	autoplayDisableOnInteraction: false,
	//onInit: function(swiper){$('#test').html($('#time-'+swiper.activeIndex).html())},
	onSlideChangeStart: function(swiper){$('#test').fadeOut()},
	onSlideChangeEnd: function(swiper){$('#test').html($('#time-'+swiper.activeIndex).html()).fadeIn()},
	// loop: true,
	pagination: '.p1',
				//paginationClickable: true,
				nextButton: '.right',
				prevButton: '.left'
	});
	mySwiperX = mySwiper;
	//$('#test').html($('#time-0').fadeIn())
	},250);
	
	  if(localStorage.getItem('presentationList') == null) {
			SyncService.getPresentationList().success(function (data){
				$scope.list = data
				if ($scope.list.length > 0)
				{
					$scope.featureItem = true;
				}	
			})
		}
		else {
			$scope.list = PollingService.getPresentationList()
			if ($scope.list.length > 0)
			{
				$scope.featureItem = true;
			}		
		}
	
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

