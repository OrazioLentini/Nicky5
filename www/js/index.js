/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        NotificationEvents();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function scan2()
{
        var temp = localStorage.getItem('login')
        data = JSON.parse(temp)
            
        var badge = data[0].BadgeID
        var username = data[0].UserID

       cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, username + " " + badge, function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
}


function NotificationEvents()
{
    cordova.plugins.notification.local.on('trigger', function (notification) {
        console.log('ontrigger', arguments);
        showDialog('triggered: ' + notification.id);
        //clearSingle(notification.id);
        cordova.plugins.notification.local.clear(notification.id);
    });


    cordova.plugins.notification.local.on('schedule', function (notification) {
        console.log('onschedule', arguments);
        showDialog('scheduled: ' + notification.id);
        //cordova.plugins.notification.local.clear(notification.id);
    });

    /*cordova.plugins.notification.local.on('update', function (notification) {
        console.log('onupdate', arguments);
         showToast('updated: ' + notification.id);
    });


    cordova.plugins.notification.local.on('click', function (notification) {
        console.log('onclick', arguments);
       // showToast('clicked: ' + notification.id);
       
    });

    cordova.plugins.notification.local.on('cancel', function (notification) {
        console.log('oncancel', arguments);
        // showToast('canceled: ' + notification.id);
    });

    cordova.plugins.notification.local.on('clear', function (notification) {
        console.log('onclear', arguments);
        showToast('cleared: ' + notification.id);
    });

    cordova.plugins.notification.local.on('cancelall', function () {
        console.log('oncancelall', arguments);
        // showToast('canceled all');
    });

*/
}
// ---------------------------------------------------------------------------------------- 
clearSingle = function (id) {
                cordova.plugins.notification.local.clear(id, callback);
            };
// ----------------------------------------------------------------------------------------         

var id = 1, dialog;

callback = function () {
    cordova.plugins.notification.local.getIds(function (ids) {
        showToast('IDs: ' + ids.join(' ,'));
    });
};

showToast = function (text) {
    setTimeout(function () {
        if (device.platform != 'windows') {
            //window.plugins.toast.showShortBottom(text);
            window.plugins.toast.showLongCenter(text);
        } else {
            showDialog(text);
        }
    }, 100);
};

showDialog = function (text) {
    if (dialog) {
        dialog.content = text;
        return;
    }

    dialog = new Windows.UI.Popups.MessageDialog(text);

    dialog.showAsync().done(function () {
        dialog = null;
    });
};

function notify(e, t, id)
{
    //id = parseInt(localStorage.getItem('numOfFav'))
    var now = new Date().getTime()
    //console.log(t.getTime())
    _5_sec_from_now = new Date(now + 10 * 1000);

    scheduledDate = t.getTime()
    _5_min_before = new Date(scheduledDate - 300 * 1000)
    title = e
    
   var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    cordova.plugins.notification.local.schedule({
        id: id,
        title: 'Upcoming Event',
        text: 'Starting Now: ' + title,
        at:  _5_sec_from_now,
        sound: sound,
        badge: 12
    }); 
    
    //NotificationEvents()
}

function cancelNotify(id) {
    cordova.plugins.notification.local.clear(id);
}

function qrCode(fn, ln, bid)
{
    $('#qrcodeTable').qrcode({
        render    : "image",
        text  : "Name: " + fn + " " + ln + " BadgeID: " + bid,
        size : 150
    }); 
    
}