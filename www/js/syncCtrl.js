//SYNC -----------------------------------------------------------------------------------------------------------------------------------------------------------------
function sync() {
   // alertify.log("Syncing...");
    getDirectory() 
    getMaps()
    getSchedule()
    getSpeaker()
    syncInfoRequested()
    getSocialMediaInfo()

}
function syncCallback(table, data) {
    //console.log(data)
    localStorage.setItem(table, JSON.stringify(data))

   // if (table == 'tSocial') {
   //     saveSocialLocally()
   // }
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
};

sync()