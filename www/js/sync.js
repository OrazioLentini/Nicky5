//SYNC -----------------------------------------------------------------------------------------------------------------------------------------------------------------
function sync() {
    alertify.log("Syncing...");
   getDirectory() 
   getMaps()
   getSchedule()
   getSpeaker()
   getSocialMediaInfo()
   syncInfoRequested()
    

}
function syncCallback(table, data) {
    //console.log(data)
    localStorage.setItem(table, JSON.stringify(data))

    if (table == 'tSocial') {
        //alert('in')
        saveSocialLocally()
    }
    if (table == 'Youtube') {
        //alert('in')
        saveSocialLocally()
    }
}

function syncDate() {
     $.ajax({
        url : "http://app.nicky3.com/AppApis/apiSyncDate.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success:function(data)
        {
            console.log(data)
        },
        error: function(jqXHR, textStatus, errorThrown) {}                 
    })
}

function getSyncDate(data) {
    var lastSync = localStorage.getItem("lastSync") 
    if (lastSync == null) {
        localStorage.setItem("lastSync", data.LastSync)
        sync()
    }
    else {
        if (lastSync == data.LastSync) {
            alertify.set({ delay: 1000 });
            alertify.log("Everything is up to date");
        }
        else {
            localStorage.setItem("lastSync", data.LastSync)
            sync()
        }
    }
}

function checkSync () {
    syncDate()
    //sync()
}


function getDirectory() {
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiDirectory.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })

};

function getMaps() {
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiMaps.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })

};

function getSchedule() {
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiSchedule.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })

};

function getSocialMediaInfo() {
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiSocial.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
}


function syncInfoRequested() {
    var data = localStorage.getItem('infoRequest')
    x = JSON.parse(data)
    if (x != null) {
        length = x.length
    }
    var temp = localStorage.getItem('login')
    if (temp != null) {
        dataUser = JSON.parse(temp)
0
        var userID = dataUser[0].UserID

        $.ajax({
            url: "http://app.nicky3.com/AppApis/apiRequestInfo.asp?data=" + data + "&UserID=" + userID + "&Function=2&Length=" + length,
            type: "POST",
            crossDomain: true,
            dataType: "jsonp",
            jsonp: true,
            success: function (data) { },
            error: function (jqXHR, textStatus, errorThrown) { }
        })
    }
}

function getSpeaker() {
    $.ajax({
        url: "http://app.nicky3.com/AppApis/apiSpeaker.asp",
        type: "POST",
        crossDomain: true,
        dataType: "jsonp",
        jsonp: false,
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
}

function playVideo(ID, videoID) {
    //console.log(ID + ", " + videoID)  
    $("#youtube").css("display", "block")
    $("#all").css("display", "none")
    
    $("#player").html('<script>jwplayer("player").setup({file: "https://www.youtube.com/watch_popup?v=' + videoID + '",autostart: true, width: "100%",height: "250",mute: false,});</script>')
    //$("#player").html('<iframe id="' + ID + '" type="text/html" width="100%" height="250" src="http://www.youtube.com/embed/' + videoID + '?autoplay=1" frameborder="0"></iframe>')   
}


function showSocial(x) {
    //alert("test")
    if (x == "#youtube") {
        $("#twitter").css("display", "none")
        $("#all").css("display", "none")
        $("#instagram").css("display", "none")
        $("#youtube").css("display", "block")
        $('.button').removeClass('button-dark').addClass('button-stable');
        $('.youtube').addClass('button-dark');
    }
    else if (x == "#twitter") {
        //if (jwplayer().getState() == "PLAYING") {
        //    jwplayer().pause()
        //}
        $("#all").css("display", "none")
        $("#youtube").css("display", "none")
        $("#instagram").css("display", "none")
        $('.button').removeClass('button-dark').addClass('button-stable');
        $('.twitter').addClass('button-dark');
    }
    else if (x == "#instagram") {
        //if (jwplayer().getState() == "PLAYING") {
            //jwplayer().pause()
        //}
        $("#all").css("display", "none")
        $("#youtube").css("display", "none")
        $("#twitter").css("display", "none")
        $('.button').removeClass('button-dark').addClass('button-stable');
        $('.instagram').addClass('button-dark');
    }
    else {
        //if (jwplayer().getState() == "PLAYING") {
            //jwplayer().pause()
        //}
        $("#youtube").css("display", "none")
        $("#twitter").css("display", "none")
        $("#instagram").css("display", "none")
        $("#all").css("display", "block")
        $('.button').removeClass('button-dark').addClass('button-stable');
    }
    
    $(x).fadeIn("fast", function () {
        // Animation complete
    });


}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
function saveSocialLocally() {
    retrieveInfo()
};

function retrieveInfo () {
    var temp = localStorage.getItem('tSocial')
    socialData = JSON.parse(temp)
    
    getChannelID(1)
    //console.log(socialData[1])
}

function getChannelID (x) {
    youtubeApiKey = socialData[1].apiKey
    username = socialData[x].userName
    maxYTVideos = socialData[x].Total
    playlistName = socialData[x].PlaylistName   
    
    $.ajax({
        url:  "https://www.googleapis.com/youtube/v3/channels?",
        data: {
            forUsername: username,
            key: youtubeApiKey,
            part: "contentDetails"
        },
        type: "GET",
        success: function(data) {
            channelID = data.items[0].id
            //console.log("channelID: " + data.items[0].id)
            
            if (playlistName  == 'favorites' || playlistName  == 'likes' ||playlistName  == 'uploads' ) {
                getDefaultPlaylistID(channelID)
            }
            else {
                getCustomPlaylistID(channelID)
            }
        }

    })
}

function getDefaultPlaylistID(cID){
    $.ajax({
        url:  "https://www.googleapis.com/youtube/v3/channels?",
        data: {
            id: cID,
            key: youtubeApiKey,
            part: "contentDetails"
        },
        //url:  "https://www.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=UC2GYec8ZPJgsXdh9tTcO6GA&key" + youtubeApiKey,
        type: "GET",
        success: function(data) {           
            if(playlistName == "uploads") {
                playlistID = data.items[0].contentDetails.relatedPlaylists.uploads
            }
            else if (playlistName == "likes") {
                playlistID = data.items[0].contentDetails.relatedPlaylists.likes
            }
            else {
                playlistID = data.items[0].contentDetails.relatedPlaylists.favorites
            }
           // console.log("Default PlaylistID: " + playlistID)
            getPlaylistVideos(playlistID)
        }

    })
}

function getCustomPlaylistID(cID){
    $.ajax({
        url:  "https://www.googleapis.com/youtube/v3/playlists?",
        data: {
            channelId: cID,
            key: youtubeApiKey,
            part: "snippet"
        },
        //url:  "https://www.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=UC2GYec8ZPJgsXdh9tTcO6GA&key" + youtubeApiKey,
        type: "GET",
        success: function(data) {       
            var length = data.items.length
            for (i = 0; i < length; i++) {
                if (data.items[i].snippet.title == playlistName) {                  
                    //console.log("Custom PlaylistID: " + data.items[0].id)
                    playlistID = data.items[i].id
                    getPlaylistVideos(playlistID)
                    break;
                    
                }
            }
        }

    })
}


function getPlaylistVideos(pID){
    $.ajax({
        url:  " https://www.googleapis.com/youtube/v3/playlistItems?",
        data: {
            playlistId: pID,
            key: youtubeApiKey,
            part: "snippet",
            maxResults: maxYTVideos         
        },
        //url:  "https://www.googleapis.com/youtube/v3/activities?part=contentDetails&channelId=UC2GYec8ZPJgsXdh9tTcO6GA&key" + youtubeApiKey,
        type: "GET",
        success: function(data) {
            
            localStorage.setItem("Youtube", JSON.stringify(data))
            /*
            var length = data.items.length
            var videoOutput = ''
            
            //$("#player").html('<iframe id="0" type="text/html" width="100%" height="250" src="http://www.youtube.com/embed/' + data.items[0].snippet.resourceId.videoId + '?autoplay=1" frameborder="0"></iframe>')   
            $("#player").html('<script>$( document ).ready(function() {jwplayer("player").setup({file: "https://www.youtube.com/watch?v=' + data.items[0].snippet.resourceId.videoId + '",autostart: true, width: "100%",height: "300",mute: false,}); jwplayer().play();})</script>')

            for (i = 0; i < length; i++) {  
                //console.log(data.items[i].snippet.resourceId.videoId)
                navigate = data.items[i].snippet
                //console.log(navigate)
                videoID = navigate.resourceId.videoId
                //$("#player").append('<li><iframe id="player" type="text/html" width="95%" height="200"src="http://www.youtube.com/embed/' + videoID + '"frameborder="0"></iframe></li>')  
                
                //videoOutput += '<li id="' + i + '" style=" border-style 1px solid; height: 235px; box-shadow: 2px 2px 1px #888888; margin-bottom: 30px">'
                videoOutput += '<div style="width:49%; padding:1%; margin-bottom: 5%; background:#FFF; text-align:center; display: inline-block"><a onclick="playVideo(\'' + i + '\',\'' + videoID + '\')"><img style="width: 100%; max-width: 320px; max-height: 180px; border:0px;" src="' + navigate.thumbnails.medium.url + '"/>'
                videoOutput += '<span style="padding:5px 3px; text-align:center; font-size: 14px"><b>' + navigate.title + '</span></a></div>'
            //  videoOutput += '</li>'
            } 
            $('#youtube').html(videoOutput) */
        }

    })
}
//sync()
//var checkSyncTime = setInterval(checkSync, 900000)




function getFeaturedScheduleList() {
        var temp = localStorage.getItem('tSchedule')
        data = JSON.parse(temp)

        //console.log(data)
        $('#trivia-live').css("display","none")
        $('#presentation-live').css("display","none")
        var tLive = "no"
        //console.log(data)
        var first = "no"
        var featuredOutput = ''
           var currentdate = new Date(); 
            var hours = currentdate.getHours()
            var suffix = hours >= 12 ? "PM":"AM"; 
            hours = ((hours + 11) % 12 + 1);
            
            var currenttime = hours + ":" + currentdate.getMinutes() + " " + suffix
            var today = currentdate.getMonth()+1 + "/" + currentdate.getDate() + "/" + currentdate.getFullYear()
            //alertify.alert(currenttime)
            //alertify.alert(today)
       // alert("running")
        //featuredOutput += '<li class="table-view-cell table-view-divider">' + date + '</li>'
        for (i = 0; i < data.length; i++) {
                   icon = ""
                  // onClick = 'onclick="saveFavoriteSchedule(\'' + data[i].RecID + '\',\'' + data[i].Speaker + '\',\'' + data[i].Title + '\',\'' + data[i].Image + '\',\'' + data[i].StartTime + '\',\'' + data[i].ScheduledDate + '\',\'schedule\',\'' + data[i].SpeakerID + '\')"'
                var startTime = data[i].StartTime
                var endTime = data[i].EndTime
                var scheduledDate = data[i].ScheduledDate
                //alert(today)
                //alert(scheduledDate)
                //alert(today == schedul
                //convert both time into timestamp
                var ctt = new Date("November 13, 2013 " + currenttime);
                ctt = ctt.getTime();
                
                var stt = new Date("November 13, 2013 " + startTime);
                stt = stt.getTime();
                
                var endt = new Date("November 13, 2013 " + endTime);
                endt = endt.getTime();
                
                //alert(ctt >= stt)
                //alert(ctt <= endt)
                //alert(today)
                //alert(scheduledDate)
                //alert(today == scheduledDate)
                // IF IT'S A CURRENT EVENT (NOW ACCORDING TO TIME)
                //alert(first)
                if (ctt >= stt && ctt <= endt && today == scheduledDate && first == "no" ){
                    var first = "yes"
                    
                    
                    //featuredOutput += '<div style="position:absolute; left:50%; top:50%;">test</div>'
                     if(data[i].EventType == "trivia"){
                        featuredOutput += '<a href="#/app/trivia.html/' + data[i].RecID + '" style="z-index:10" >'
                       var tLive = "yes"
                       //$('#trivia-live').css("display","block")
                    }
                    if(data[i].EventType == "presentation"){
                        //console.log(data[i])
                        speakerID = data[i].SpeakerID
                        featuredOutput += '<a href="#/app/polling.html/' + speakerID + '" >'
                       var tLive = "yes"
                       
                       $("#presentation-link").attr("href", "polling.html?id=" + speakerID + "#polling")
                       $("#presentation-linkMenu").attr("href", "polling.html?id=" + speakerID + "#polling")
                       $("#presentation-linkMenu2").attr("href", "polling.html?id=" + speakerID + "#polling")
                       
                       $('#presentation-live').css("display","block")
                    }
                    //featuredOutput += '<a href="#/app/directory">'
                        featuredOutput += '<div class="thumb featured" style="height:220px; overflow:hidden; position:relative;" >'
                        
                        featuredOutput += '<img src="' + data[i].Image + '">'
                        var im = data[i].Image
                        featuredOutput += '<div class="inner-content">'
                        featuredOutput += '<h2 style="margin:0px; color:#F1F1F1">' + data[i].Title + '</h2>'
                        if(data[i].ShortDesc != "" && data[i].ShortDesc != null){
                          featuredOutput += '<p>' + data[i].ShortDesc + '</p>'
                        } else  {
                            featuredOutput += '<p>Start Time: ' + data[i].StartTime + '</p>'
                        }
                        featuredOutput += '</div>'
                        featuredOutput += '</div></a>'
                }
                else {
                    // ELSE GRAB THE NEXT ONE MARK AS FEATURED
                    if (data[i].featured == 1 && first == "no") {

                        var first = "yes"
                        //featuredOutput += '<div style="position:absolute; left:50%; top:50%;">test</div>'
                    
                        featuredOutput += '<a href="#/app/polling/' + data[i].SpeakerID + '" style="z-index:999">'
                        featuredOutput += '<div class="thumb featured" style="height:220px; overflow:hidden; position:relative;" >'
                        
                        featuredOutput += '<img src="' + data[i].Image + '">'
                        var im = data[i].Image
                        featuredOutput += '<div class="inner-content">'
                        featuredOutput += '<h2 style="margin:0px; color:#F1F1F1">' + data[i].Title + '</h2>'
                        if(data[i].ShortDesc != "" && data[i].ShortDesc != null){
                          //featuredOutput += '<p>' + data[i].ShortDesc + '</p>'
                        } else  {
                            featuredOutput += '<p style="font-size:.6em; color:#FFF;"><strong>Start Time: ' + data[i].StartTime + '</strong></p>'
                        }
                        featuredOutput += '</div>'
                        featuredOutput += '</div></a>'
                    }
                }
        }
        //alert(featuredOutput)
        $('#featured').html(featuredOutput)
        //console.log(scheduleOutput)
       // $('#directorycontent').append(scheduleOutput)

      //  $('#directorycontent').append('<li class="table-view-cell media"><a class="navigate-right" href="details.html?id=' + recID + '#details" data-transition="slide-in"><img style="width:42px;" class="media-object pull-left" src="' + logo + '"/><div class="media-body">' + company + '<br><span style="font-size:11px">' + location + '</span><p>' + description + '</p></div></a> </li>')

    }