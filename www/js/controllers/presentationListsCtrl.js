angular.module('starter.controllers')

    .controller('PresentationsListsCtrl', ['$scope', '$http', '$stateParams', 'PollingService' ,'MenuLinksService','$filter', function ($scope, $http, $stateParams, PollingService, MenuLinksService, $filter) {

		  $scope.title = MenuLinksService.getHeader($stateParams.ID)

		  $scope.list = PollingService.getPresentationList()
		  if($scope.list.length == 0) {
			  $scope.showMessage = true
			  $scope.nothingToDisplay = 'There are currently no presentations'
		  }
		  $scope.tempList = $scope.list

			$scope.toggle = function (type) {
				if (type == 'all') {
					$scope.list = $scope.tempList
					$scope.showMessage = false
					if($scope.list.length == 0) {
						  $scope.showMessage = true
						  $scope.nothingToDisplay = 'There are currently no presentations'
					  }
				    $('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.all').addClass('buttonPickerActive');
				}
				if (type == 'live') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'live'})
					$scope.showMessage = false
					if($scope.list.length == 0) {
						  $scope.showMessage = true
						  $scope.nothingToDisplay = 'There are no live presentations'
					  }
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.live').addClass('buttonPickerActive');
				}
				if (type == 'upcoming') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'upcoming'})
					$scope.showMessage = false
					if($scope.list.length == 0) {
						  $scope.showMessage = true
						  $scope.nothingToDisplay = 'There are no upcoming presentations'
					  }
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.upcoming').addClass('buttonPickerActive');
				}
				if (type == 'ended') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'ended'})
					$scope.showMessage = false
					if($scope.list.length == 0) {
						  $scope.showMessage = true
						  $scope.nothingToDisplay = 'There are no finished presentations'
					  }
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.ended').addClass('buttonPickerActive');
				}
			}

    }]);
