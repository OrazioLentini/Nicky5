function loginSubmit () {
    //event.preventDefault();//STOP default action
    var Username = $("#Username").val();
    var BadgeID = $("#BadgeID").val();
    console.log(Username)
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiLogin.asp",
        type: "POST",
        data: { "Username": Username, "BadgeID": BadgeID },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: true,
        success: function () { },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
};

function profileSubmit () {
    event.preventDefault();//STOP default action
    var Username = $("#unProfile").val();
    var BadgeID = $("#idProfile").val();
    var Firstname = $("#fnProfile").val();
    var Lastname = $("#lnProfile").val();
    var Email = $("#emProfile").val();

    var user = localStorage.getItem("login")
    data = JSON.parse(user)
    var UserID = data[0].UserID

    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiProfile.asp",
        type: "POST",
        data: { "Username": Username, "BadgeID": BadgeID, "Firstname": Firstname, "Lastname": Lastname, "Email": Email, "UserID": UserID },
        crossDomain: true,
        dataType: "jsonp",
        jsonp: true,
        success: function (data) { },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
};

 //LOGIN-----------------------------------------------------------------------------------------------------------------------------------------------------------------
function getLogin(result,data) {

	if (result == "success") {
		//var login = '[{ \"Username\": ' + data.Username + ', \"BadgeID\": ' + data.BadgeID + '}]'
		//var login = '{"Username": \"' + data.Username + '\", "BadgeID": \"' + data.BadgeID + '\"}'
		//localStorage.setItem("login", '[' + login + ']');
		
		localStorage.setItem("login", JSON.stringify(data))
		$("#loginModal").removeClass("active")
		$("#logoutBut").css("display", "block")
		$("#loginBut").css("display", "none")
		$("#profileBut").css("display", "block")
		$("#logoutBut2").css("display", "block")
		$("#loginBut2").css("display", "none")
		$("#profileBut2").css("display", "block")
		
		$("#signInOverlay").css("display", "none")
		$("#signIn").css("display", "none")
		
		// Profile Form
		$("#unProfile").val(data[0].Username)
		$("#idProfile").val(data[0].BadgeID)
		if(data[0].FirstName != null) {
				$("#fnProfile").val(data[0].FirstName)
		}
		if(data[0].LastName != null) {
			$("#lnProfile").val(data[0].LastName)
		}
		if(data[0].Email != null) {
			$("#emProfile").val(data[0].Email)
		}
			
		sync()
	}
	else {
		alertify.error("Your Username does not match the BadgeID on record!");
		//$("#errors").html("Your Username does not match the BadgeID on record!");
	} 
}


function saveUpdatedProfile (result, data) {	
	localStorage.setItem("login", JSON.stringify(data))
	alertify.success("Profile Updated");
}