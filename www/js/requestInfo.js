function requestMoreInfo (ID, Type, userID, FID) {
	$.ajax( {
		url : "http://patty5.com/AppApis/apiRequestInfo.asp?TypeID=" + ID + "&Type=" + Type + "&UserID="+userID + "&Function=" + FID ,
		type: "POST",
		crossDomain: true,
		dataType: "jsonp",
		jsonp: true, 
		success:function(data){},
		error: function(jqXHR, textStatus, errorThrown) {}
	})
}