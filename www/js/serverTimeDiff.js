function serverTimeDifference () {
	 $.ajax( {
			url : "http://patty5.com/AppApis/apiServerTime.asp",
			type: "POST",
			crossDomain: true,
			dataType: "jsonp",
			jsonp: true, 
			success:function(data){},
			error: function(jqXHR, textStatus, errorThrown) {}
		})
}

function getServerTime (data) {
	var d = new Date()
	ClientMilliseconds = d.getTime() - d.setHours(0,0,0,0);
	ClientTimer = ClientMilliseconds / 1000;
	iDiff = parseFloat(data.timer) - ClientTimer;
	localStorage.setItem("ServerClientTimeDiff", iDiff);
}