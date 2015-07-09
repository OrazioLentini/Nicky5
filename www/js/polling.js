function askQuestion (){
	  var question = $("#userQuestion").val();
	  var temp = localStorage.getItem('login')
	  data = JSON.parse(temp)
	
	  var username = data[0].Username

	 formURL = "http://patty5.com/AppApis/apiAskQuestion.asp" + "?Username=" + username + "&question=" + question
	   $.ajax( {
			url : formURL,
			type: "POST",
			crossDomain: true,
			dataType: "jsonp",
			jsonp: true, 
			success:function(data){},
			error: function(jqXHR, textStatus, errorThrown) {}
		})
}

//ASK QUESTION----------------------------------------------------------------------------------------------------------------------------------------------------------
function getPollingQuestion() {
    alertify.set({ delay: 2000 });
	alertify.success("Thank you for submitting a question");
	//alert("Thank you for submitting a question!")
	$("#userQuestion").val("");
}

//ANSWER----------------------------------------------------------------------------------------------------------------------------------------------------------
function savePollingAnswer (answer) {
	var d = new Date()
	var c = String(d.getHours()) + "!" + String(d.getSeconds()); 
	
	var temp = localStorage.getItem('login')
    data = JSON.parse(temp)
	
	var user = data[0].BadgeID
	
	$.ajax( {
		url : "http://patty5.com/AppApis/apiPolling.asp?user=" + user + "&answer=" + answer + "&c="+c,
		type: "POST",
		crossDomain: true,
		dataType: "jsonp",
		jsonp: true, 
		success:function(data){},
		error: function(jqXHR, textStatus, errorThrown) {}
	})
}


function getPollingResult(data) {
    if (data.Result == "Success") {
        alertify.set({ delay: 1500 });
		alertify.success("Your answer has been submitted");
		//alert("Your answer has been submitted.")
	}
    if (data.Result == "Answer") {
        alertify.set({ delay: 1500 });
		alertify.success("Please wait for the next question");		
	}
    if (data.Result == "Finished") {
        alertify.set({ delay: 1500 });
		alertify.error("The presentation has finished")
	}
}

