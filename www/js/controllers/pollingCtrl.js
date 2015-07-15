angular.module('starter.controllers')

    .controller('PollingCtrl', ['$scope', '$http', '$state', '$ionicModal', '$timeout','$stateParams', 'SpeakerService', 'SyncService', 'LoginService', '$ionicLoading', 'PollingService' ,'MenuLinksService',  function ($scope, $http, $state, $ionicModal, $timeout, $stateParams, SpeakerService, SyncService, LoginService, $ionicLoading, PollingService, MenuLinksService) {
		$scope.title = MenuLinksService.getHeader($stateParams.ID)


		//$scope.requests = DirectoryService.getDirectory();
		$scope.question = false
		$scope.answer = false
		$scope.speaker = false
		
		if($stateParams.SpeakerID == ""){
			$scope.noSpeaker = "There is no speaker information available at this time."
		}
		else {
			$scope.speaker = SpeakerService.getSpeaker($stateParams.SpeakerID)
			setTimeout(function () {
				$('#pollingSpeaker').html('<div class="media" style="width: 90%; text-align: center; margin-left: 5%;" ><img style="width:50%;" class="media-object" src="' + $scope.speaker.Image + '"/><div class="media-body" style="font-size:120%; margin-top:12px;">' + $scope.speaker.Name + '<br><span style="font-size:12px">' + $scope.speaker.Title + '</span><div style="height: 1px; background: black; width: 100%"></div></div><p style="margin-top: 10px">' + $scope.speaker.About + '</p></div>')
			}, 50)
		}


		$scope.toggle = function (type) {
			if (type == 'question') {
				$scope.question = true
				$scope.answer = false 
				$scope.speaker = false
			    $('.button').removeClass('button-dark').addClass('button-stable');
        		$('.question').addClass('button-dark');
			}
			if (type == 'polling') {
				$scope.question = false
				$scope.answer = true 
				$scope.speaker = false
				$('.button').removeClass('button-dark').addClass('button-stable');
        		$('.polling').addClass('button-dark');
			}
			if (type == 'speaker') {
				$scope.question = false
				$scope.answer = false 
				$scope.speaker = true
				$('.button').removeClass('button-dark').addClass('button-stable');
        		$('.speaker').addClass('button-dark');
			}
		}

		$scope.isLoggedIn = localStorage.getItem("login")
		if ($scope.isLoggedIn == null) {
			$scope.show = true
		}
		else {
			$scope.show = false
		}


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
		};

		// Open the login modal
		$scope.login = function() {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function() {
	    	var LoginUsername = $("#Username").val();
	    	var LoginBadgeID = $("#BadgeID").val();

	    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
			if(data != 'failed') {
				localStorage.setItem("login", JSON.stringify(data))
				$("#signInOverlay").css("display", "none")
				$("#signIn").css("display", "none")
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				//$scope.runSync()
				//$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
				$scope.closeLogin();
			}
			else {
				$ionicLoading.show({template: 'BadgeID does not match the Username on Record. Please Try Again.', noBackdrop: false, duration:2000});
			}
	    	})
		};
		$scope.runSync = function () {
			SyncService.sync()
			$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
		}

    }]);
