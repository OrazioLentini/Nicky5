angular.module('starter.controllers')

    .controller('ModalCtrl', function () {
    var isIOS = ionic.Platform.isIOS();
	var isAndroid = ionic.Platform.isAndroid();
	
	if(isIOS) {
        alert("ios: " + isIOS)
		$('#backButton').addClass('ion-ios-arrow-back');
	}
	else if(isAndroid) {
        alert("android: " + isAndroid)
		$('#backButton').addClass('ion-android-arrow-back')
	}
    else {
        $('.backButton').addClass('ion-ios-arrow-back');
    }

    });

