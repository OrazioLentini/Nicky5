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
        url : "http://patty5.com/AppApis/apiSyncDate.asp",
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
        url: "http://patty5.com/AppApis/apiDirectory.asp",
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
        url: "http://patty5.com/AppApis/apiMaps.asp",
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
        url: "http://patty5.com/AppApis/apiSchedule.asp",
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
        url: "http://patty5.com/AppApis/apiSocial.asp",
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
            url: "http://patty5.com/AppApis/apiRequestInfo.asp?data=" + data + "&UserID=" + userID + "&Function=2&Length=" + length,
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
        url: "http://patty5.com/AppApis/apiSpeaker.asp",
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
    alert("test")
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
var checkSyncTime = setInterval(checkSync, 900000)