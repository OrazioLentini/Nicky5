angular.module('starter.controllers')

    .controller('PollingCtrl', ['$scope', '$http', '$state', '$ionicModal', '$timeout','$stateParams', 'SpeakerService', function ($scope, $http, $state, $ionicModal, $timeout, $stateParams, SpeakerService) {
		//$scope.requests = DirectoryService.getDirectory();

		if($stateParams.speakerID == ""){
			$scope.noSpeaker = "There is no speaker information available at this time."
		}
		else {
			$scope.speaker = SpeakerService.getSpeaker($stateParams.speakerID)
			$('#pollingSpeaker').html('<div class="media" style="width: 90%; text-align: center; margin-left: 5%;" ><img style="width:50%;" class="media-object" src="' + $scope.speaker.Image + '"/><div class="media-body" style="font-size:120%; margin-top:12px;">' + $scope.speaker.Name + '<br><span style="font-size:12px">' + $scope.speaker.Title + '</span><div style="height: 1px; background: black; width: 100%"></div></div><p style="margin-top: 10px">' + $scope.speaker.About + '</p></div>')

		}


		$scope.question = false
		$scope.answer = false
		$scope.speaker = false
		$scope.toggle = function (type) {
			if (type == 'question') {
				$scope.question = true
				$scope.answer = false 
				$scope.speaker = false
			}
			if (type == 'polling') {
				$scope.question = false
				$scope.answer = true 
				$scope.speaker = false
			}
			if (type == 'speaker') {
				$scope.question = false
				$scope.answer = false 
				$scope.speaker = true
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
			askQuestion()
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
			loginSubmit();

			$timeout(function() {
				loggedIn = localStorage.getItem("login")

				if (loggedIn != null) {
					 $scope.closeLogin();
				}
			}, 100);
		};

    }]);
