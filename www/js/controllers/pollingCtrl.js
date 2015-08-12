angular.module('starter.controllers')

    .controller('PollingCtrl', ['$scope', '$http', '$state', '$ionicModal', '$timeout','$stateParams', 'SpeakerService', 'SyncService', 'LoginService', '$ionicLoading', 'PollingService' ,'MenuLinksService', 'ScheduleService', '$ionicPopup', '$ionicSlideBoxDelegate','$rootScope',  function ($scope, $http, $state, $ionicModal, $timeout, $stateParams, SpeakerService, SyncService, LoginService, $ionicLoading, PollingService, MenuLinksService, ScheduleService, $ionicPopup, $ionicSlideBoxDelegate, $rootScope) {
		$scope.$on('$ionicView.enter', function(){
			PollingService.getPresentationSlides($stateParams.PresentationID). success( function (data) {
				$scope.slides = data
				if($scope.slides.length == 0){
					$scope.hasSlides = false
					$( ".content" ).fadeIn('fast');
					$(".top-container").css("display", "block");
					$(".top-container").css("height", "100%");
				}
				else {
					$scope.hasSlides = true
					$( ".content" ).fadeIn('fast');
					$( "#slides" ).fadeIn('slow');
	                $(".top-container").css("display", "block");
					$(".top-container").css("height", "100%");
				}
			})
		    setTimeout(function () {
		        var mySwiper = new Swiper('.s2', {
					pagination: '.p2',
					paginationClickable: true,
					nextButton: '.right',
					prevButton: '.left',
	
				});   
			},200);	
  		})	
		//$scope.title = MenuLinksService.getHeader($stateParams.ID)

		$scope.desc = PollingService.getDetails($stateParams.PresentationID);

		$scope.speakerInfo = SpeakerService.getSpeaker($stateParams.SpeakerID)

		$scope.question = false
		$scope.answer = false
		$scope.speaker = true
		

		$ionicModal.fromTemplateUrl('templates/presentationSpeaker.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modalInfo = modal;
		});

		$scope.closePreview = function() {
			$scope.modalInfo.hide();
		};

		// Open the Preview Slides modal
		$scope.openSpeaker = function(id, speakerID) {
			$scope.modalInfo.show()
		};
		/*if($stateParams.SpeakerID == ""){
			$scope.noSpeaker = "There is no speaker information available at this time."
		}
		else {
			$scope.speaker = SpeakerService.getSpeaker($stateParams.SpeakerID)
			setTimeout(function () {
				$('#pollingSpeaker').html('<div class="media" style="width: 90%; text-align: center; margin-left: 5%;" ><img style="width:50%;" class="media-object" src="' + $scope.speaker.Image + '"/><div class="media-body" style="font-size:120%; margin-top:12px;">' + $scope.speaker.Name + '<br><span style="font-size:12px">' + $scope.speaker.Title + '</span><div style="height: 1px; background: black; width: 100%"></div></div><p style="margin-top: 10px">' + $scope.speaker.About + '</p></div>')
			}, 50)
		}*/


		$scope.toggle = function (type) {
			$scope.isLoggedIn = localStorage.getItem("login")		
			if (type == 'question') {
				if ($scope.isLoggedIn == null) {
					$(".signInOverlay").css("display", "block")
					$(".signIn").css("display", "block")
					
					var confirmPopup = $ionicPopup.confirm({
						 title: 'Login Required',
						 template: 'You must log in to ask a question. Do you want to log in?'
					   });
					   confirmPopup.then(function(res) {
						 if(res) {
							$scope.modal.show();
						 }
						 else {
							$scope.question = false
							$scope.answer = false 
							$scope.speaker = true
							$('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
							$('.speaker').addClass('buttonPickerActive');
						 }
					   });					
				}
				else {
					$(".signInOverlay").css("display", "none")
					$(".signIn").css("display", "none")
				}
				$scope.question = true
				$scope.answer = false 
				$scope.speaker = false
			    $('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.question').addClass('buttonPickerActive');
			}
			if (type == 'polling') {
				$(".answerKey").css("display", "block")
				if ($scope.isLoggedIn == null) {
					$(".signInOverlay").css("display", "block")
					$(".signIn").css("display", "block")
				  var confirmPopup = $ionicPopup.confirm({
					 title: 'Login Required',
					 template: 'You must log in to participate. Do you want to log in?'
				   });
				   confirmPopup.then(function(res) {
					 if(res) {
						$scope.modal.show();
					 }
					 else {
							$scope.question = false
							$scope.answer = false 
							$scope.speaker = true
							$('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
							$('.speaker').addClass('buttonPickerActive');
						 }
				   });
				}
				else {
					$(".signInOverlay").css("display", "none")
					$(".signIn").css("display", "none")
				}
				$scope.question = false
				$scope.answer = true 
				$scope.speaker = false
				$('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.polling').addClass('buttonPickerActive');
			}
			if (type == 'speaker') {
				$scope.question = false
				$scope.answer = false 
				$scope.speaker = true
				$('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
        		$('.speaker').addClass('buttonPickerActive');
			}
		}

		/*$scope.isLoggedIn = localStorage.getItem("login")
		alert($scope.isLoggedIn)
		if ($scope.isLoggedIn == null) {
			$(".signInOverlay").css("display", "block")
			$(".signIn").css("display", "block")
		}
		else {
			$(".signInOverlay").css("display", "none")
			$(".signIn").css("display", "none")
		}*/


		$scope.submit = function () {
			  var question = $("#userQuestion").val();
			  var temp = localStorage.getItem('login')
			  data = JSON.parse(temp)
			
			  var username = data[0].Username		
			  PollingService.askAQuestion(username, question)
			  $ionicLoading.show({template: 'Your question has been submitted', noBackdrop: false, duration: 1500});
			  $("#userQuestion").val("")
		}


		$scope.savePollingAnswer = function(answer){
			PollingService.savePollingAnswer(answer). success(function(data){
			    if (data.Result == "Success") {
			        $ionicLoading.show({template: 'Your answer has been submitted', noBackdrop: false, duration: 1500});
				}
			    if (data.Result == "Answer") {
			        $ionicLoading.show({template: 'Please wait for the next question', noBackdrop: false, duration: 1500});
				}
			    if (data.Result == "Finished") {
			        $ionicLoading.show({template: 'The presentation has finished', noBackdrop: false, duration: 1500});
				}	
			})		
		}
		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
			$scope.question = false
			$scope.answer = false 
			$scope.speaker = true
			$('.presentation .button').removeClass('buttonPickerActive').addClass('buttonPicker');
			$('.speaker').addClass('buttonPickerActive');
		};
		
		$scope.closeLoginAuto = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function(user, bID) {
	    	var LoginUsername = user
	    	var LoginBadgeID = bID
			
			//var LoginUsername = $("#Username").val();
	    	//var LoginBadgeID = $("#BadgeID").val();

	    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
			if(data != 'failed') {
				localStorage.setItem("login", JSON.stringify(data))
				$(".signInOverlay").css("display", "none")
				$(".signIn").css("display", "none")
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				$scope.show = false
				$scope.runSync()
				$rootScope.$broadcast('login', LoginUsername)
				//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				$scope.closeLoginAuto();
			}
			else {
				$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
			}
	    	})
		};
		$scope.runSync = function () {
			SyncService.checkSync(). success(function (x){
				 if(x == 'Database Connected') {
					 SyncService.sync()
					 $ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				 }
				 else {
					$ionicLoading.show({template: 'Sync Error: The current information may not be up to date.', noBackdrop: false, duration:3000});
				 }
			 }). error(function (){
				 $ionicLoading.show({template: 'No Internet Connection. Please connect to the internet.', noBackdrop: false});
			 })
			 
			//SyncService.sync()
			//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		}


		$scope.claim = true
		$scope.register = true
					
		$scope.register = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmation',
				template: 'Do you want to register for this event?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					$scope.register = false
					$ionicLoading.show({template: 'Registration Complete', noBackdrop: true, duration: 1000});
				}
			});
		};
		
		$scope.claimPoints = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmation',
				template: 'I certify that I attended this activity.'
			});
			confirmPopup.then(function(res) {
				if(res) {
					$scope.openSurvey()
					//$scope.claim = false
					//$ionicLoading.show({template: 'Points Claimed', noBackdrop: true, duration: 1000});
				}
			});
		};

		$ionicModal.fromTemplateUrl('templates/survey.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modalSurvey = modal;
		});
		
		$scope.closeSurvey = function() {
			$scope.modalSurvey.hide();
		};
		
		$scope.closeSurveyFinished = function() {
			$scope.modalSurvey.hide();
			$scope.claim = false
			$ionicLoading.show({template: 'Credit Claimed', noBackdrop: true, duration: 1000});
		};
		
		$scope.openSurvey = function() {
			$scope.modalSurvey.show();
		};


    }]);
