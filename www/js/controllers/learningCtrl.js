angular.module('starter.controllers')

.controller('LearningCtrl' , function($scope, $ionicModal, $timeout, $ionicPopup, $ionicLoading, LearningService, $stateParams, MenuLinksService) {
   
    /*var isIOS = ionic.Platform.isIOS();
	var isAndroid = ionic.Platform.isAndroid();
	
	if(isIOS) {
		$('.backButton').addClass('ion-ios-arrow-back');
	}
	else {
		$('.backButton').addClass('ion-android-arrow-back')
	}*/

	$scope.title = MenuLinksService.getHeader($stateParams.ID)

   $scope.mc = false
   $scope.show = function(x){
   		if (x == 'mc'){
   			$scope.mc = !$scope.mc
   		}
   		if (x == 'vid'){
   			$scope.vid = !$scope.vid
   		}

   }

   $scope.learningvideos = LearningService.getVideos()

   $ionicModal.fromTemplateUrl('templates/learningVideo.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeVideo = function() {
		$("#videoMain").html('')
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.video = function() {
		$scope.modal.show();
		$("#videoMain").html('');
		//$("#videoMain").html('<iframe id="ytplayer"  width="100%" height="390"  src="https://www.youtube.com/embed/dHVZ6jEf8To?autoplay=true"  frameborder="0"/>')
	    $scope.playVideo('https://www.youtube.com/embed/dHVZ6jEf8To?autoplay=true','1')
	    $('.li').removeClass('dark')
        $('.' + 1).addClass('dark');
	};

	// Perform the login action when the user submits the login form
	$scope.playVideo = function(x, id) {
        $("#videoMain").html('');
        console.log(id);
		$('.li').removeClass('dark');
        $('.' + id).addClass('dark');
     
		$("#videoMain").html('<iframe id="ytplayer"  width="100%" height="390"  src="' + x + '"  frameborder="0"/>')
	};

    $scope.learningMC = LearningService.getMultipleChoice()
    $scope.questionNum = 1
    $scope.submit = true
    $scope.totalCorrect = 0;
    $scope.notFinished = false;
    $ionicModal.fromTemplateUrl('templates/learningMC.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalMC = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeMC = function() {
		$scope.questionNum = 1;
		$scope. totalCorrect = 0;
		$scope.nextQuestionCorrect = false
		$scope.nextQuestionIncorrect = false
		$scope.submit = true
		$scope.notFinished = false
		$scope.modalMC.hide();
	};

	// Open the login modal
	$scope.multipleChoice = function() {
		$scope.modalMC.show();
	};

	// Perform the login action when the user submits the login form
	$scope.checkAnswer = function() {
		x = $("input[name=test]:checked").val()
		if($scope.learningMC[$scope.questionNum-1].correct == x) {
			$ionicLoading.show({template: 'Correct Answer', noBackdrop: true, duration: 1000});			
			//$scope.questionNum += 1
			$scope.totalCorrect += 1
			$scope.nextQuestionCorrect = true;
			$scope.submit = false;
		}
		else {
			$ionicLoading.show({template: 'Incorrect Answer', noBackdrop: true, duration: 1000});	
			$scope.nextQuestionIncorrect = true;		
			$scope.submit = false;
		}
	};

	$scope.nextButton = function() {
		$scope.nextQuestionCorrect = false;
		$scope.nextQuestionIncorrect = false;
		$scope.submit = true;

		if($scope.questionNum == $scope.learningMC.length) {
			$scope.notFinished = true
		}
		else {
			$scope.questionNum += 1
		}
	}

   $scope.learningquestions = LearningService.getQuestions()
   //console.log($scope.learningquestions)
   $ionicModal.fromTemplateUrl('templates/learningQuestions.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalQuestions = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeQuestions = function() {
		$scope.modalQuestions.hide();
	};

	// Open the login modal
	$scope.questions = function() {
		$scope.modalQuestions.show();
	};

	$scope.toggleAnswer = function (x){
		$( ".question" + x ).toggle( "fast", function() {
		//$('.' + x).removeClass('ion-chevron-down').addClass('ion-chevron-up');
		});
	}

})

