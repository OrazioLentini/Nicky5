//FAVORITES-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function saveFavoriteSchedule(ID, Speaker, Title, Image, StartTime, ScheduledDate, table, speakerID) {
    alert("Favorite saved!")
    //console.log("Speaker: " + Speaker + "  Title: " + Title + "  Image: " + Image + "  StartTime: " + StartTime)
	
    var favorite = '{"ID": \"' + ID + '\","Speaker": \"' + Speaker + '\", "SpeakerID": \"' + speakerID + '\", "Title": \"' + Title + '\", "Image": \"' + Image + '\", "StartTime": \"' + StartTime + '\", "ScheduledDate": \"' + ScheduledDate + '\", "type": \"' + table + '\"}'

	var newFav = ''
    var temp = localStorage.getItem('scheduleFavorites')
    if (temp == null) {
        localStorage.setItem('scheduleFavorites', '[' + favorite + ']')
    }
    else {
        temp = temp.substring(1, temp.length - 1)
        newFav = "[" + temp + "," + favorite + "]"
        localStorage.setItem("scheduleFavorites", newFav)
    }
   	
   if(table == 'schedule'){
	    window.location.reload(true)
	    //$state.go($state.current, {}, {reload: true});
	    
   }
   // alert(Speaker)
   if (Speaker != "") {
       //alert('speaker')
       window.parse.subscribeToChannel("speaker" + ID);
   }
   else {
       //alert('trivia')
       window.parse.subscribeToChannel("trivia" + ID);
   }
   //Android.setChannel("speaker" + speakerID);
}


function saveFavoriteCompany(ID, Image, table, company, location, description, video) {
    alertify.set({ delay: 1500 });
	alertify.success("Saved to Favorites");
	//console.log("Speaker: " + Speaker + "  Title: " + Title + "  Image: " + Image + "  StartTime: " + StartTime)
	
	var favorite = '{"ID": \"' + ID + '\", "Image": \"' + Image + '\", "Company": \"' + company + '\", "Location": \"' + location + '\", "Description": \"' + description + '\", "Video": \"' + video + '\", "type": \"' + table + '\" }'


	var newFav = ''
    var temp = localStorage.getItem('companyFavorites')
    if (temp == null) {
        localStorage.setItem('companyFavorites', '[' + favorite + ']')
    }
    else {
        temp = temp.substring(1, temp.length - 1)
        newFav = "[" + temp + "," + favorite + "]"
        localStorage.setItem("companyFavorites", newFav)
    }
    getCompanyInfo(ID);
    window.parse.subscribeToChannel("company" + ID);
}

function saveFavoriteMaps(ID, Image, table, mapname, mapdesc) {
    alertify.set({ delay: 1500 });
    alertify.success("Saved to Favorites");
    //console.log("Speaker: " + Speaker + "  Title: " + Title + "  Image: " + Image + "  StartTime: " + StartTime)
	
	var favorite = '{"ID": \"' + ID + '\", "Image": \"' + Image + '\", "MapName": \"' + mapname + '\", "MapDesc": \"' + mapdesc + '\", "type": \"' + table + '\"}'


	var newFav = ''
    var temp = localStorage.getItem('mapsFavorites')
    if (temp == null) {
        localStorage.setItem('mapsFavorites', '[' + favorite + ']')
    }
    else {
        temp = temp.substring(1, temp.length - 1)
        newFav = "[" + temp + "," + favorite + "]"
        localStorage.setItem("mapsFavorites", newFav)
    }
   if(table == 'maps'){
	    getMapList() 
   }
}

function deleteFavorites(location,table){
	alertify.confirm("Are you sure you would like to delete this favorite?", function(e){
	if (e) {
	    var x;
		var json = JSON.parse(localStorage[table + "Favorites"]);
		for (i=0;i<json.length;i++){
			//alert(json[i].ID)
			//alert(json[i].type)
		    if (json[i].ID == location && json[i].type == table) {
		        if (table == 'schedule') {
                    x = json[i].Speaker
		        }
		        json.splice(i, 1);
		    }
		}
		if(JSON.stringify(json) == "[]"){
		   localStorage.removeItem(table + "Favorites");	
		} 
		else {
			localStorage[table + "Favorites"] = JSON.stringify(json);
		}
		
		/* CALL THEM ALL AGAIN 
		if(table == 'schedule'){
			getScheduleList()
			getScheduleFavorites()
			if (x != "") {
			    //alert('speaker')
			    window.parse.unsubscribe('speaker' + location);
			}
			else {
			    //alert('trivia')
			    window.parse.unsubscribe('trivia' + location);
			}
			//window.parse.unsubscribe('speaker' + location);
		}
		if(table == 'maps'){
			getMapList()
			getMapFavorites()
			//window.parse.unsubscribe(table + location);
		}
		if (table == 'company') {
		    getCompanyFavorites()
		    window.parse.unsubscribe('company' + location);
		}*/
		//getMapFavorites()
	    /* REFRESHES THE LIST */
	    window.location.reload(true)
		alertify.set({ delay: 1500 });
		alertify.error("Favorite Deleted");
	}
	})
}

function showFavorites(x) {
	if (x == "#schedule") {
		$("#directory").css("display", "none")
		$("#maps").css("display", "none")
	}
	else if (x == "#directory") {
		$("#schedule").css("display", "none")
		$("#maps").css("display", "none")
	}
	else {
		$("#schedule").css("display", "none")
		$("#directory").css("display", "none")
	}
	$(x).fadeIn("fast", function () {
		// Animation complete
	});
}

function getScheduleFavorites() {
    var fav = localStorage.getItem('scheduleFavorites')
    if (fav == null || fav == "") {
        $('#schedulecontent').html("<p style='margin-top:15px;'>You have no Schedule favorites</p>")
    }
    if (fav != null) {
        data = JSON.parse(fav)
        var date = data[0].ScheduledDate
		var favoritesOutput = ''
       //  var favoritesOutput = '<h3>Schedule</h3>'
	   favoritesOutput += '<li class="table-view-cell table-view-divider">' + date + '</li>'
    for (i = 0; i < data.length; i++) {
		       icon = ""
			   style = ""
			    if(i == 0){
				   var style = "first"	
				}
			    onClick = 'onclick="deleteFavorites(\'' + data[i].ID + '\',\''+ data[i].type+'\')"'
		    if (date != data[i].ScheduledDate) {
               date = data[i].ScheduledDate
	           favoritesOutput += '<li class="table-view-divider">' + date + '</li>'
			 }
            favoritesOutput += '<li class="table-view-cell matt" style="padding-left:0px; font-size:1em;"><div class="pull-left"><img style="width:25%; min-width:100px;" class="media-object pull-left" src="' + data[i].Image + '"/>'
            if (data[i].Speaker != '') {
                favoritesOutput += '<div style="vertical-align:middle; padding-top:10px;"><p style="font-size:14px; font-weight: bold">Speaker: ' + data[i].Speaker + '</p>'
				favoritesOutput += '<p style="font-size:12px;">' + data[i].Title + '</p>'
			} else {
				favoritesOutput += '<div style="vertical-align:middle; padding-top:10px;"><p style="font-size:14px; font-weight:bold;">' + data[i].Title + '</p>'
			}
                favoritesOutput += '<p style="font-size:.6em; color:#3C9AC3;"><strong>Start Time: ' + data[i].StartTime + '</strong></p></div></div>'
				favoritesOutput += '<button class="btn btn-link btn-nav pull-right">'
				favoritesOutput += '<span class="icon icon-trash' + icon + '" style="font-size:24px;"' + onClick + '"></span>'
				favoritesOutput += '</button>'
                favoritesOutput += '</li>'
        
    }
    $('#schedulecontent').html(favoritesOutput)

    }
}

function getCompanyFavorites() {
    var fav = localStorage.getItem('companyFavorites')
    if (fav == null || fav == "") {
        $('#companycontent').html("<p style='margin-top:15px;'>You have no Directory favorites</p>")
    }
	if (fav != null) {
        data = JSON.parse(fav)
        var date = data[0].ScheduledDate
		var favoritesOutput = ''
        // var favoritesOutput = '<h3>Company</h3>'
    for (i = 0; i < data.length; i++) {
		icon = ""
		style = ""
			    if(i == 0){
				   var style = "first"	
				}
		onClick = 'onclick="deleteFavorites(\'' + data[i].ID + '\',\''+ data[i].type+'\')"'
		if(data[i].type == 'company'){
				favoritesOutput += '<li class="table-view-cell ' + style + '"><div class="pull-left"><img style="max-width:150px; max-height:80px; border:0px;" class="media-object pull-right" src="' + data[i].Image + '"/>'
				if (data[i].Company != '') {
					favoritesOutput += '<span style="font-size:16px; font-weight: bold">' + data[i].Company + '</span><br>'
					favoritesOutput += '<span style="font-size:14px;">' + data[i].Location + '</span>'
				} else {
					favoritesOutput += '<span style="font-size:16px; font-weight:bold;">' + Location + '</span>'
				}
					favoritesOutput += '<p> ' + data[i].Description + '</p></div>'
					favoritesOutput += '<button class="btn btn-link btn-nav pull-right">'
					favoritesOutput += '<span class="icon icon-trash' + icon + '" style="font-size:24px;"' + onClick + '"></span>'
					favoritesOutput += '</button>'
					favoritesOutput += '</li>'
		}
        
    }
    $('#companycontent').html(favoritesOutput)

    }
}


function getMapFavorites() {
    var fav = localStorage.getItem('mapsFavorites')
    if (fav == null || fav == "") {
        $('#mapcontent').html("<p style='margin-top:15px;'>You have no Maps favorites</p>")
    }
	if (fav != null) {
        data = JSON.parse(fav)
        var date = data[0].ScheduledDate
		var favoritesOutput = ''
        // var favoritesOutput = '<h3>Maps</h3>'
    for (i = 0; i < data.length; i++) {
		icon = ""
		if(i == 0){
				   var style = "first"	
				}
		onClick = 'onclick="deleteFavorites(\'' + data[i].ID + '\',\''+ data[i].type+'\')"'
				
				favoritesOutput += '<li class="table-view-cell ' + style + '" style="margin-bottom: 25px; padding:10px;"><div style="height: 250px;">'
				favoritesOutput += '<div style="width:100%; text-align:center; background:#FFF;"><img style="max-width: 100%; max-height: 200px; border:0px;" src="' + data[i].Image + '"/></div>'
				favoritesOutput += '<p style="padding:10px 3px;" class="pull-left"><b>' + data[i].MapName + '</b><br>' + data[i].MapDesc + '</p>'
				favoritesOutput += '<button class="btn btn-link btn-nav pull-right">'
				favoritesOutput += '<span class="icon icon-trash' + icon + '" style="font-size:24px;"' + onClick + '"></span>'
				favoritesOutput += '</button>'
				favoritesOutput += '</div></li>'
		
        
    }
    $('#mapcontent').html(favoritesOutput)

    }
}



  /*  function saveFavorite(ID,Speaker, Title, Image, StartTime, ScheduledDate, table, mapname, mapdesc, company, location, description, video) {
    var favorite = '{"ID": \"' + ID + '\","Speaker": \"' + Speaker + '\", "Title": \"' + Title + '\", "Image": \"' + Image + '\", "StartTime": \"' + StartTime + '\", "ScheduledDate": \"' + ScheduledDate + '\", "type": \"' + table + '\"'
	favorite += ', "MapName": \"' + mapname + '\", "MapDesc": \"' + mapdesc + '\"'
	favorite += ', "Company": \"' + company + '\", "Location": \"' + location + '\", "Description": \"' + description + '\", "Video": \"' + video + '\" }' */