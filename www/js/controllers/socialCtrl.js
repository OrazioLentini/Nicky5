angular.module('starter.controllers')

    .controller('SocialCtrl', function ($scope, $state, $ionicScrollDelegate, $stateParams, MenuLinksService, SocialService, $ionicModal, $filter) {
    
    $scope.title = MenuLinksService.getHeader($stateParams.ID)

    SocialService.getTwitter().success(function (data){
        $scope.twitter = data
        if($scope.twitter.length == 0) {
            $scope.showMTW = true
            $scope.messageTW = 'There are no tweets to display'
        }
    })
    
    SocialService.getInstagram(). success(function(data){
        $scope.instagram = data 
        if($scope.instagram.length == 0) {
            $scope.showMIG = true
            $scope.messageIG = 'There are no images to display'
        }
    })
    
    $scope.youtube = SocialService.getYoutube()
    if($scope.youtube.length == 0) {
        $scope.showMYT = true
        $scope.messageYT = 'There are no videos to display'
    }
    

        $scope.showMFB = true
        $scope.messageFB = 'There are no posts to display'

      
      
    $scope.tw = true
    $scope.toggle = function (type) {
    	if (type == 'twitter') {
            $("#twitter").css("display", "block")
            $("#instagram").css("display", "none")
            $("#youtube").css("display", "none")
            $("#facebook").css("display", "none")
    		//$scope.tw = true
    		//$scope.ig = false 
    		//$scope.yt = false
    		//$scope.fb = false
    		$('.social .button').removeClass('buttonPickerActive').addClass('buttonPicker');
    		$('.twitter').addClass('buttonPickerActive');
    	}
    	if (type == 'instagram') {
            $("#twitter").css("display", "none")
            $("#instagram").css("display", "block")
            $("#youtube").css("display", "none")
            $("#facebook").css("display", "none")
    		//$scope.tw = false
    		//$scope.ig = true 
    		//$scope.yt = false
    		//$scope.fb = false
    		$('.social .button').removeClass('buttonPickerActive').addClass('buttonPicker');
    		$('.instagram').addClass('buttonPickerActive');
    	}
    	if (type == 'youtube') {
            $("#twitter").css("display", "none")
            $("#instagram").css("display", "none")
            $("#youtube").css("display", "block")
            $("#facebook").css("display", "none")
    		//$scope.tw = false
    		//$scope.ig = false 
    		//$scope.yt = true
    		//$scope.fb = false
    		$('.social .button').removeClass('buttonPickerActive').addClass('buttonPicker');
    		$('.youtube').addClass('buttonPickerActive');
    	}
    	if (type == 'facebook') {
            $("#twitter").css("display", "none")
            $("#instagram").css("display", "none")
            $("#youtube").css("display", "none")
            $("#facebook").css("display", "block")
    		//$scope.tw = false
    		//$scope.ig = false 
    		//$scope.yt = false
    		//$scope.fb = true
    		$('.social .button').removeClass('buttonPickerActive').addClass('buttonPicker');
    		$('.facebook').addClass('buttonPickerActive');
    	}
        $ionicScrollDelegate.scrollTop();
    }
        
    $scope.openYoutube = function(video){
        var now = new Date().valueOf();
        setTimeout(function () {
            if (new Date().valueOf() - now > 200) return;
            window.location = "https://www.youtube.com/watch?v="+video;
        }, 10);
        //window.open = "vnd.youtube://" + videoID
    }

    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };
    
    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      //console.log('Modal is shown!');
    });

    $scope.showImage = function(t) {

        var x = $filter('filter')($scope.instagram, {RecID: t})
        $scope.imageSrc  = x[0].PostImageURL
        $scope.avatar = x[0].AuthorAvatar
        $scope.name = x[0].AuthorScreenName
        $scope.desc = x[0].Post
        $scope.page = "instagram"
        $scope.openModal();
    }
    
    
    $ionicModal.fromTemplateUrl('video-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
        $scope.modalVideo = modal;
    });

    $scope.openVideoModal = function() {
      $scope.modalVideo.show();
    };

    $scope.closeVideoModal = function() {
      $("#watchYT").html('')
      $("#watchYT").css("display", "none")
      $scope.modalVideo.hide();
    };

    $scope.showVideo = function(video) {
        url = 'http://www.youtube.com/embed/' + video

       $scope.modalVideo.show();
       $("#watchYT").html('<iframe id="ytplayer"  width="100%" height="390"  src="' + url + '"  frameborder="0"/>')
       setTimeout( function (){
       $( "#watchYT" ).fadeIn('slow');
       }, 500)
    }
    });
