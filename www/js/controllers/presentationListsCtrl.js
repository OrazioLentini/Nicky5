angular.module('starter.controllers')

    .controller('PresentationsListsCtrl', ['$scope', '$http', '$stateParams', 'PollingService' ,'MenuLinksService','$filter', function ($scope, $http, $stateParams, PollingService, MenuLinksService, $filter) {

		  $scope.title = MenuLinksService.getHeader($stateParams.ID)

		  $scope.list = PollingService.getPresentationList()
		  console.log($scope.list)
		  $scope.tempList = $scope.list

			$scope.toggle = function (type) {
				if (type == 'all') {
					$scope.list = $scope.tempList
				    $('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.all').addClass('buttonPickerActive');
				}
				if (type == 'live') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'live'})
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.live').addClass('buttonPickerActive');
				}
				if (type == 'upcoming') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'upcoming'})
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.upcoming').addClass('buttonPickerActive');
				}
				if (type == 'ended') {
					$scope.list = $filter('filter')($scope.tempList, {'Status': 'ended'})
					$('.presentationList .button').removeClass('buttonPickerActive').addClass('buttonPicker');
					$('.ended').addClass('buttonPickerActive');
				}
			}

    }]);
