angular.module('starter.services')

    .service('SyncService', function ($http) {

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
        this.sync = function(){
            this.getSchedule()
            this.getDirectory()
            this.getMaps()
            this.getSpeaker()
            this.getSocialMediaInfo()
            this.syncInfoRequest()
            setTimeout(function () {
                saveSocialLocally()
            },210)  

            sucess = 'complete'
            return sucess

        }
    
});