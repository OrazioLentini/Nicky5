angular.module('starter.controllers')

    .controller('TriviaCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		//$scope.requests = DirectoryService.getDirectory();
		serverTimeDifference () 

		$scope.saveTriviaAnswer = function (answer) {
			var d = new Date(),
			ClientMilliseconds = d.getTime() - d.setHours(0,0,0,0);
			ClientTimer = ClientMilliseconds / 1000; 
			sDiff = localStorage.getItem("ServerClientTimeDiff");
			AdjustedTimeStamp = ClientTimer + parseFloat(sDiff);
			var c = String(d.getHours()) + "!" + String(d.getSeconds()); 
			
			var temp = localStorage.getItem('login')
		    data = JSON.parse(temp)
			
			var user = data[0].BadgeID
			
			$.ajax( {
				url : "http://patty5.com/AppApis/apiTrivia.asp?user=" + user + "&answer=" + answer + "&c="+c+"&timestamp="+AdjustedTimeStamp,
				type: "POST",
				crossDomain: true,
				dataType: "jsonp",
				jsonp: true, 
				success:function(data){},
				error: function(jqXHR, textStatus, errorThrown) {}
			})
		}

		function getAnswerResult(data) {
			console.log(data)
			
			//score = "Score: " + aAnswer[0];
			returnmessage = data.Result;

			$("#score").html(data.TotalScore)
		   if (returnmessage == 'correct') {
			  alertify.success("Correct");
		   }
		   if (returnmessage == 'wrong') {
				alertify.error("Incorrect");	
		   }
		   if (returnmessage == 'off') {
				var message = "No Game in Progress";
				alertify.error(message);
		   }
		   if (returnmessage == 'warmup') {
				var message = "The game will begin shortly";
				alertify.log(message);
		   }
		   if (returnmessage == 'answer') {
				var message = "Please wait for the next question.";
				alertify.log(message);
		   }   
		}

    }]);
