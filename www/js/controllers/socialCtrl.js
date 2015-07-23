angular.module('starter.controllers')

    .controller('SocialCtrl', function ($scope, $state, $ionicScrollDelegate, $stateParams, MenuLinksService, SocialService, $ionicModal, $filter) {
    
    $scope.title = MenuLinksService.getHeader($stateParams.ID)

    SocialService.getTwitter().success(function (data){
        $scope.twitter = data
    })
    
    SocialService.getInstagram(). success(function(data){
        $scope.instagram = data 
    })
    
    $scope.youtube = SocialService.getYoutube()
    
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
        $scope.openModal();
    }

//youtube---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var player;
var youtubeApiKey = "";
var playlistID = ""
var channelID = ""
var username = ""
var socialData = ""
var maxYTVideos = ""
var playlistName = ""
//var channelID = "UC2GYec8ZPJgsXdh9tTcO6GA"



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function showAll() {
	var temp = localStorage.getItem('Youtube')
	data = JSON.parse(temp)
	var allOutput = ''
    // TWITTER
    allOutput += '<li class="item item-divider bar bar-calm" style="border-top:1px #293F54 solid; font-size:12px;">'
     allOutput += '<button style="float:right; margin-top:-5px;" class="button button-assertive" onclick="showSocial(\'#twitter\')">View All</button>Twitter Feed</li>'
    
    // INSTAGRAM
    allOutput += '<div style="height:10px">&nbsp;</div>'
     allOutput += '<li class="item item-divider bar bar-calm" style="border-top:1px #293F54 solid; font-size:12px;">'
     allOutput += '<button style="float:right;  margin-top:-5px;" class="button button-assertive" onclick="showSocial(\'#instagram\')">View All</button>Instagram #APMA2015</li>'
    
	//videoOutput += '<iframe id="0" type="text/html" width="100%" height="250" src="http://www.youtube.com/embed/' + data.items[0].snippet.resourceId.videoId + '?autoplay=1" frameborder="0"></iframe>'
	// YOUTUBE
    allOutput += '<div style="height:10px">&nbsp;</div>'
    allOutput += '<li class="item item-divider bar bar-calm" style="border-top:1px #293F54 solid; font-size:12px;">'
    allOutput += '<button style="float:right; margin-top:-5px;" class="button button-assertive" onclick="showSocial(\'#youtube\')">View All</button>Latest Videos</li>'
    //allOutput += '<p style="color: #b31217; padding:5px 15px 0px 15px;">Latest videos:<br></p>'
	for (i = 0; i < data.items.length; i++) {	
		navigate = data.items[i].snippet
		videoID = navigate.resourceId.videoId
		allOutput += '<div class="video-outer" style="margin-bottom:10px"><div class="video-inner"><div onClick="openYoutube(\''+videoID+'\')">'
	allOutput += '<img src="http://img.youtube.com/vi/' + videoID + '/mqdefault.jpg" style="width:100%">'
	allOutput += '<span style="padding:5px 3px; text-align:center; font-size: 14px; color: #e52d27"><b>' + navigate.title + '</span></a></div>'
	allOutput += '</div></div></div>'
		//allOutput += '<div class="video-outer"><div class="video-inner"><a onclick="playVideo(\'' + i + '\',\'' + videoID + '\')"><img style="width: 100%; max-width: 320px; max-height: 180px; border:0px;" src="' + navigate.thumbnails.medium.url + '"/>'
		//allOutput += '<span style="padding:5px 3px; text-align:center; font-size: 14px; color: #e52d27"><b>' + navigate.title + '</span></a></div></div>'
	} 	
	//allOutput += '<div style="width:100%; background:#293F54; height: 50px; padding:10px 10px;"><button class="btn btn-primary pull-right"><a onclick="showSocial(\'#youtube\')" style="color: #F2F2F2; margin:bottom: 25px" class="pull-right">View all videos >></a></button></div>'
	

	$('#all').html(allOutput)
}

function displayYouTube() {
    var temp = localStorage.getItem('Youtube')
    data = JSON.parse(temp)
    //console.log(data)
    
    var length = data.items.length
    var videoOutput = ''
    
    //$("#player").html('<iframe id="0" type="text/html" width="100%" height="250" src="http://www.youtube.com/embed/' + data.items[0].snippet.resourceId.videoId + '?autoplay=1" frameborder="0"></iframe>')   
    /*videoOutput += '<div class="player" id="player" ><script>jwplayer("player").setup({file: "https://www.youtube.com/watch?v=' + data.items[0].snippet.resourceId.videoId + '",autostart: true, width: "100%",height: "250",mute: false,}); </script></div>'*/
   // videoOutput += '<iframe class="youtube-player" type="text/html" src="http://www.youtube.com/watch_popup?v=' + data.items[0].snippet.resourceId.videoId + '&fs=1" allowfullscreen frameborder="0"></iframe>'
    //videoOutput += '<div onClick="window.open(\'vnd.youtube:\/\/' + data.items[0].snippet.resourceId.videoId + ' \',\'_system\')">'
    //videoOutput += '<img src="http://img.youtube.com/vi/' + data.items[0].snippet.resourceId.videoId + '/1.jpg" style="width:100%">'
    //videoOutput += '</div>'
        //videoOutput += '<li class="item item-divider bar bar-calm" style="border-top:2px #293F54 solid;">All Videos</li>'
        videoOutput += '<li class="item item-divider bar bar-youtube" style="border-top:2px #b31217 solid;">All Videos</li>'


    //videoOutput += '<div style="height: 20px;"></div>'
    for (i = 0; i < length; i++) {  
        navigate = data.items[i].snippet
        videoID = navigate.resourceId.videoId       
        //videoOutput += '<div class="video-outer"><div class="video-inner"><a onclick="playVideo(\'' + i + '\',\'' + videoID + '\')"><img style="width: 100%; max-width: 320px; max-height: 180px; border:0px;" src="' + navigate.thumbnails.medium.url + '"/>'
        //videoOutput += '<span style="padding:5px 3px; text-align:center; font-size: 14px; color: #e52d27"><b>' + navigate.title + '</span></a></div></div>'
    
    videoOutput += '<div class="video-outer" style="margin-bottom:10px"><div class="video-inner"><div onClick="openYoutube(\''+videoID+'\')">'
    videoOutput += '<img src="http://img.youtube.com/vi/' + videoID + '/mqdefault.jpg" style="width:100%">'
    videoOutput += '<span style="padding:5px 3px; text-align:center; font-size: 14px; color: #e52d27"><b>' + navigate.title + '</span></a></div>'
    videoOutput += '</div></div></div>'
    } 
    //alert(videoOutput)
    $('#youtube').html(videoOutput)
}



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function openYoutube(video){

var now = new Date().valueOf();
setTimeout(function () {
    if (new Date().valueOf() - now > 200) return;
    window.location = "https://www.youtube.com/watch?v="+video;
}, 10);
//window.open = "vnd.youtube://" + videoID
}

      //  displayYouTube()
		//showAll()
		
    });
