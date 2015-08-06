angular.module('starter.services')

    .service('SyncService',  function ($http, $filter) {

    var success = ""

        this.getDirectory =  function () {
            var url = 'http://patty5.com/AppApis/apiDirectory.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tCompany', data)
            })
        },
        this.getMaps = function () {
            var url = 'http://patty5.com/AppApis/apiMaps.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tMaps', data)
            })
        },
        this.getSchedule = function () {
            var url = 'http://patty5.com/AppApis/apiSchedule.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSchedule', data)
            })
        },
        this.getSpeaker = function () {
            var url = 'http://patty5.com/AppApis/apiSpeaker.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSpeaker', data)
            })
        },     
        this.getSocialMediaInfo = function () {
            var url = 'http://patty5.com/AppApis/apiSocial.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tSocial', data)
                //this.saveLocally()
            })
        },     
        this.getPresentationList = function () {
            var url = 'http://patty5.com/AppApis/apiPresentationList.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('presentationList', data)
                //this.saveLocally()
            })
        },   
         this.getProducts = function () {
            var url = 'http://patty5.com/AppApis/apiProductList.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                data = JSON.stringify(data)
                localStorage.setItem('tProductList', data)
                //this.saveLocally()
            })
        },   
        this.syncInfoRequest = function () {
            var data = localStorage.getItem('infoRequest')
            if(data == null) {
                data = ""
            }
            else {
                x = JSON.parse(data)
                 if (x != null) {
                    length = x.length
                }
            }
            var temp = localStorage.getItem('login')
            if (temp != null) {
                dataUser = JSON.parse(temp)

                var userID = dataUser[0].UserID


                var url = "http://patty5.com/AppApis/apiRequestInfo.asp?data=" + data + "&UserID=" + userID + "&Function=2&Length=" + length;
                $http.jsonp(url, {
                    params: {
                        callback: 'JSON_CALLBACK',
                        format:'json'
                    }
                }).            
                success (function(data){
                    if (data != "none") {
                         data = JSON.stringify(data)
                         localStorage.setItem('infoRequest', data)
                    }
                })
            }
        },  
        this.syncDate = function() {
            var url = 'http://patty5.com/AppApis/apiSyncDate.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                var lastSync = localStorage.getItem("lastSync") 
                    if (lastSync == null) {
                        localStorage.setItem("lastSync", data.LastSync)
                        //sync()
                    }
                    else {
                        if (lastSync == data.LastSync) {
                           // alertify.set({ delay: 1000 });
                           // alertify.log("Everything is up to date");
                        }
                        else {
                            localStorage.setItem("lastSync", data.LastSync)
                            //sync()
                        }
                    }               
            })            
        },
        this.getFeaturedScheduleList = function() {
            var temp = localStorage.getItem('tSchedule')
            data = JSON.parse(temp)
            //console.log(data)

            var currentDate = new Date()
            var hours = currentDate.getHours()
            var suffix = hours >= 12 ? "PM" : "AM"
            hours = ((hours  + 11) % 12 + 1)
            minutes = currentDate.getMinutes()
            if (minutes < 10) {
                minutes = '0' + minutes
            }

            var currentTime = hours + ":" + minutes + " " + suffix
            var today = currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()

            //console.log("Hours: " + hours + " currentTime: " + currentTime + " today: " + today)

            for (i = 0; i < data.length; i++) {


                var s = Date.parse(data[i].StartTime)
                startTime = $filter('date')(s, 'hh:mm a')

                var e = Date.parse(data[i].EndTime)
                endTime = $filter('date')(e, 'hh:mm a')

                //console.log("start: " + startTime + " end: " + endTime)

                //console.log("hours: " + endTimeHours + " minutes: " + endTimeMinutes + " suffix: " + endTimeSuffix)

                var scheduledDate = data[i].ScheduledDate

                //console.log("current time: " + currentTime + " start time: " + startTime + " end time: " + endTime)

                var ctt = new Date("November 13, 2013 " + currentTime)
                ctt = ctt.getTime()

                var stt = new Date("November 13, 2013 " + startTime)
                stt = stt.getTime()

                var endt = new Date("November 13, 2013 " + endTime)
                endt = endt.getTime()

                //console.log("ctt: " + ctt + " stt: " + stt + " endt: " + endt)

                //LIVE
                if(ctt >= stt && ctt <= endt && today == scheduledDate) {
                    if(data[i].EventType == "trivia"){
                        data[i].live = {"liveTrivia": true, "livePresentation" : false, "link": "#/app/trivia"}
                    }
                    if(data[i].EventType == "presentation"){
                        data[i].live = {"liveTrivia": false, "livePresentation" : true, "link": "#/app/polling/" + data[i].SpeakerID}
                    }       
                    data[i].StartTime = startTime
                    return data[i]
                }
                //NEXT SCHEDULED
                if(ctt <= stt && today == scheduledDate) {
                    if(data[i].EventType == "trivia"){
                        data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/trivia"}
                    }
                    if(data[i].EventType == "presentation"){
                        data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/polling/"}
                    }       
                    data[i].StartTime = startTime
                    return data[i]
                }
                if (data[i].featured == 1 && today != scheduledDate) {
                    if(data[i].EventType == "trivia"){
                        data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/trivia"}
                    }
                    if(data[i].EventType == "presentation"){
                        data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/polling/"}
                    }       
                    data[i].StartTime = startTime
                    return data[i]
                }
            }
        },
        
        
        //GET FEATURED SCHEDULE STRAIGHT FROM DATABASE
        this.getFeaturedScheduleListOnline = function() {
            //console.log("in")
            var url = 'http://patty5.com/AppApis/apiSchedule.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
               
                var currentDate = new Date()
                var hours = currentDate.getHours()
                var suffix = hours >= 12 ? "PM" : "AM"
                hours = ((hours  + 11) % 12 + 1)
                minutes = currentDate.getMinutes()
                if (minutes < 10) {
                    minutes = '0' + minutes
                }
    
                var currentTime = hours + ":" + minutes + " " + suffix
                var today = currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()
    
                //console.log("Hours: " + hours + " currentTime: " + currentTime + " today: " + today)
    
                for (i = 0; i < data.length; i++) {
    
    
                    var s = Date.parse(data[i].StartTime)
                    startTime = $filter('date')(s, 'hh:mm a')
    
                    var e = Date.parse(data[i].EndTime)
                    endTime = $filter('date')(e, 'hh:mm a')
    
                    //console.log("start: " + startTime + " end: " + endTime)
    
                    //console.log("hours: " + endTimeHours + " minutes: " + endTimeMinutes + " suffix: " + endTimeSuffix)
    
                    var scheduledDate = data[i].ScheduledDate
    
                    //console.log("current time: " + currentTime + " start time: " + startTime + " end time: " + endTime)
    
                    var ctt = new Date("November 13, 2013 " + currentTime)
                    ctt = ctt.getTime()
    
                    var stt = new Date("November 13, 2013 " + startTime)
                    stt = stt.getTime()
    
                    var endt = new Date("November 13, 2013 " + endTime)
                    endt = endt.getTime()
    
                    //console.log("ctt: " + ctt + " stt: " + stt + " endt: " + endt)
    
                    //LIVE
                    if(ctt >= stt && ctt <= endt && today == scheduledDate) {
                        if(data[i].EventType == "trivia"){
                            data[i].live = {"liveTrivia": true, "livePresentation" : false, "link": "#/app/trivia"}
                        }
                        if(data[i].EventType == "presentation"){
                            data[i].live = {"liveTrivia": false, "livePresentation" : true, "link": "#/app/polling/" + data[i].SpeakerID}
                        }       
                        data[i].StartTime = startTime
                        //console.log(data[i])
                        localStorage.setItem("Featured", JSON.stringify(data[i]))
                    }
                    //NEXT SCHEDULED
                    if(ctt <= stt && today == scheduledDate) {
                        if(data[i].EventType == "trivia"){
                            data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/trivia"}
                        }
                        if(data[i].EventType == "presentation"){
                            data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/polling/"}
                        }       
                        data[i].StartTime = startTime
        
                        return data[i]
                    }
                    if (data[i].featured == 1 && today != scheduledDate) {
                        if(data[i].EventType == "trivia"){
                            data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/trivia"}
                        }
                        if(data[i].EventType == "presentation"){
                            data[i].live = {"liveTrivia": false, "livePresentation" : false, "link": "#/app/polling/"}
                        }       
                        data[i].StartTime = startTime
                        
                        return data[i]
                    }

                }
            })
        },
        
        this.getYoutube = function() {
            
            var url = 'http://patty5.com/AppApis/apiSocial.asp';
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
                tempData = JSON.stringify(data)
                localStorage.setItem('tSocial', tempData)

                socialData = data
                youtubeApiKey = socialData[1].apiKey
                username = socialData[1].userName
                maxYTVideos = socialData[1].Total
                playlistName = socialData[1].PlaylistName 
                
                var url = 'https://www.googleapis.com/youtube/v3/channels?';
                $http.get(url, {
                    params: {
                        forUsername: username,
                        key: youtubeApiKey,
                        part: "contentDetails"
                    }
                }). 
                success (function(data){
                    channelID = data.items[0].id
                    //console.log("channelID: " + data.items[0].id)
                    
                    if (playlistName  == 'favorites' || playlistName  == 'likes' ||playlistName  == 'uploads' ) {
                        var url = "https://www.googleapis.com/youtube/v3/channels?";
                        $http.get(url, {
                            params: {
                                id: channelID,
                                key: youtubeApiKey,
                                part: "contentDetails"
                            }
                        }). 
                        success (function(data) {          
                            if(playlistName == "uploads") {
                                playlistID = data.items[0].contentDetails.relatedPlaylists.uploads
                            }
                            else if (playlistName == "likes") {
                                playlistID = data.items[0].contentDetails.relatedPlaylists.likes
                            }
                            else {
                                playlistID = data.items[0].contentDetails.relatedPlaylists.favorites
                            }
                            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?';
                            $http.get(url, {
                                params: {
                                    playlistId: playlistID,
                                    key: youtubeApiKey,
                                    part: "snippet",
                                    maxResults: maxYTVideos 
                                }
                            }).
                            success (function (data){
                                localStorage.setItem("Youtube", JSON.stringify(data))
                            })
                        })
                    }
                    else {
                        var url = 'https://www.googleapis.com/youtube/v3/playlists?';
                        $http.get(url, {
                            params: {
                                channelId: channelID,
                                key: youtubeApiKey,
                                part: "snippet"
                            }
                        }). 
                        success (function(data){
                            var length = data.items.length
                            for (i = 0; i < length; i++) {
                                if (data.items[i].snippet.title == playlistName) {                  
                                    //console.log("Custom PlaylistID: " + data.items[0].id)
                                    playlistID = data.items[i].id
                                    //getPlaylistVideos(playlistID)
                                    break;
                                }
                            }
                            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?';
                            $http.get(url, {
                                params: {
                                    playlistId: playlistID,
                                    key: youtubeApiKey,
                                    part: "snippet",
                                    maxResults: maxYTVideos 
                                }
                            }).
                            success (function (data){
                                localStorage.setItem("Youtube", JSON.stringify(data))
                            })
                        })
                    }
                })
            })
        },
        
        this.checkSync = function() {
            var url = 'http://patty5.com/AppApis/apiCheckConnection.asp';
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })                     
        },
        this.sync = function(){
            var curTime = new Date()
            localStorage.setItem('lastSync', curTime)
            
            this.getSchedule()
            this.getFeaturedScheduleListOnline()
            this.getDirectory()
            this.getMaps()
            this.getSpeaker()

            //this.getSocialMediaInfo()
            this.syncInfoRequest()
            this.getPresentationList()
            this.getProducts()
            this.getYoutube()
            
            success = 'complete'
            return success
        }
});
