angular.module('starter.controllers')

    .controller('ShowDetailCtrl', function ($scope, $stateParams, $ionicPopup, ShowcaseService, FavoritesService, $ionicLoading, $ionicModal, $timeout, LoginService, SyncService, RequestInfoService) {
		$scope.filled = false
		$scope.unfilled = false
		$scope.details = ShowcaseService.getDetails($stateParams.RecID);    
		$scope.checkFavorite = FavoritesService.checkIfFavoriteCompany($stateParams.RecID);
		if ($scope.checkFavorite == true) {
			$scope.filled = true;
		}
		else {
			$scope.unfilled = true
		}
		
		/*$scope.deleteFavorite = function() {
			var confirmPopup = $ionicPopup.confirm({
			 title: 'Delete Favorite',
			 template: 'Are you sure you would like to delete this favorite?'
		   });
		   confirmPopup.then(function(res) {
			 if(res) {
				$scope.deleted = FavoritesService.deleteFavorite($stateParams.RecID, 'company');
				$scope.changeStar()
			 }
		   });
			
		}
		
		$scope.saveFavoriteCompany = function () {
			$scope.fav = FavoritesService.saveFavoriteCompany($scope.details)
			$scope.filled = true
			$scope.unfilled = false
			$ionicLoading.show({template: 'Added to Favorites', noBackdrop: true, duration: 1500});
		}
		
		$scope.changeStar = function () {
			$scope.unfilled = true
			$scope.filled = false

			$ionicLoading.show({template: 'Favorite Removed', noBackdrop: true, duration: 1500});
		}
		

	  $scope.showInfo = DirectoryService.showButton($stateParams.RecID)

	  $ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.closeLogin = function() {
			$scope.modal.hide();
		};
		$scope.doLogin = function() {
	    	var LoginUsername = $("#Username").val();
	    	var LoginBadgeID = $("#BadgeID").val();

	    	LoginService.login(LoginUsername, LoginBadgeID). success(function (data) {
			if(data != 'failed') {
				localStorage.setItem("login", JSON.stringify(data))
				$scope.logoutButton = true
				$scope.profileButton = true
				$scope.loginButton = false
				$scope.runSync()
				$ionicLoading.show({template: 'Syncing...', noBackdrop: false, duration: 1500});
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


			$ionicModal.fromTemplateUrl('templates/profile.html', {
				scope: $scope
			}).then(function(modal) {
				$scope.modalProfile = modal;
			});

			$scope.profile = function() {
				$scope.modalProfile.show();
			};
			$scope.closeProfile = function() {
			    $scope.modalProfile.hide();
			};

		$scope.requestInfo = function() {
			var temp = localStorage.getItem('login')
			if (temp == null){ 
				var confirmPopup = $ionicPopup.confirm({
				 title: 'Additional Information',
				 template: 'You must login to request additional info. Do you want to login?'
			   });
			   confirmPopup.then(function(res) {
				 if(res) {
					$scope.modal.show();
				 }
			   });
			}
			else { 
				data = JSON.parse(temp)
		
				var userID = data[0].UserID
				var userEmail = data[0].Email

				if (userEmail == '') {
					var confirmPopup = $ionicPopup.confirm({
						 title: 'Email Required',
				 		template: 'You must update your email in order to request more info.'
			   		});
			   		confirmPopup.then(function(res) {
				 	if(res) {
						$scope.modalProfile.show();
				 	}
			   		});
				}
				else {
					//requestMoreInfo($stateParams.RecID, 'company', userID, 1)
					$scope.result = RequestInfoService.requestMoreInfo($stateParams.RecID, 'company', userID, 1)
						$ionicLoading.show({template: 'Additional Information Requested', noBackdrop: false, duration: 1500});
						$scope.showInfo = false

				}
			}
		}*/

});