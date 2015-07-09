angular.module('starter.services')

    .service('LoginService', function ($http) {

	var requests = ""
	var requests2 = ""
		this.login = function(Username, BadgeID){ 

			var url = 'http://patty5.com/AppApis/apiLogin.asp';
			return $http.jsonp(url, {
			    params: {
			        callback: 'JSON_CALLBACK',
			        format:'json',
			        Username: Username,
			        BadgeID: BadgeID
			    }
			}) 		
		},
		this.profileUpdate = function(Username, BadgeID, Firstname, Lastname, Email) {
		    var user = localStorage.getItem("login")
			data = JSON.parse(user)
			var UserID = data[0].UserID

			var url = 'http://patty5.com/AppApis/apiProfile.asp';
			return $http.jsonp(url, {
			    params: {
			        callback: 'JSON_CALLBACK',
			        format:'json',
			        Username: Username,
			        BadgeID: BadgeID,
			        Firstname: Firstname,
			        Lastname: Lastname,
			        Email, Email,
			        UserID: UserID
			    }
			})
		}
});