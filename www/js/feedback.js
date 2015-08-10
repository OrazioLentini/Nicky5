//ASK QUESTION----------------------------------------------------------------------------------------------------------------------------------------------------------
function getFeedback() {
    alertify.set({ delay: 2000 });
	alertify.success("Thank you for your feedback")
	$("#Feedback").val("");
}

function submitFeedback() {
	var feedback = $("#Feedback").val();

	var temp = localStorage.getItem('login')
	data = JSON.parse(temp)

	var username = data[0].Username

 formURL = 'http://app.nicky3.com/AppApis/apiFeedback.asp?Username=' + username + '&Feedback=' + feedback
   $.ajax( {
		url : formURL,
		type: "POST",
		crossDomain: true,
		dataType: "jsonp",
		jsonp: true, 
		success:function(data){},
		error: function(jqXHR, textStatus, errorThrown) {}
	})

};