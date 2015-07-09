/*function requestMoreInfo(ID, Type) {
	
	var temp = localStorage.getItem('login')
	if (temp == null){ 
		alertify.confirm("You must login to request additional info. Do you want to login?", function(e){
			if (e) {
				$("#loginModal").addClass("active")
				//$("#profileModal").addClass("active")
			}	
		})
	}
	else {
		data = JSON.parse(temp)
		
		var userID = data[0].UserID
		var userEmail = data[0].Email
		
		if (userEmail == '') {
			alertify.confirm("You must update your email in order to request more info.", function(e){
				if (e) {
					$("#profileModal").addClass("active")
				}	
			})
		}
		else {
			$.ajax( {
				url : "http://patty5.com/AppApis/apiRequestInfo.asp?TypeID=" + ID + "&Type=" + Type + "&UserID="+userID + "&Function=1" ,
				type: "POST",
				crossDomain: true,
				dataType: "jsonp",
				jsonp: true, 
				success:function(data){},
				error: function(jqXHR, textStatus, errorThrown) {}
			})
		}
	}
}

function infoRequested(data) {
	console.log(data)
    alertify.set({ delay: 2000 });
	alertify.success("Additional Information Requested");
	if(data.Result == "Success") {
		var infoReq = '{"Type": \"' + data.Type + '\", "TypeID": \"' + data.TypeID + '\"}'
	
		var newInfoReq = ''
		var temp = localStorage.getItem('infoRequest')
		if (temp == null) {
			localStorage.setItem('infoRequest', '[' + infoReq + ']')
		}
		else {
			temp = temp.substring(1, temp.length - 1)
			newInfoReq = "[" + temp + "," + infoReq + "]"
			localStorage.setItem("infoRequest", newInfoReq)
		}
		
		//getCompanyInfo(data.TypeID)
	}
}*/



function refreshInfoRequested(result, data) {
	
	if (result == 'some') {
		localStorage.setItem("infoRequest", JSON.stringify(data))
	}
}

