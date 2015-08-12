angular.module('starter.services')

    .service('PollingService', function ($http, $filter) {

	var requests = ""
		this.askAQuestion = function(username, question){ 
            
            var url = "http://app.nicky3.com/AppApis/apiAskQuestion.asp" + "?Username=" + username + "&question=" + question;
            $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            }). 
            success (function(data){
	              console.log(data)
            })   

			return requests;
		},

		this.savePollingAnswer = function(answer) {
			var d = new Date()
			var c = String(d.getHours()) + "!" + String(d.getSeconds()); 
			
			var temp = localStorage.getItem('login')
		    data = JSON.parse(temp)
			
			var user = data[0].BadgeID		
			
            var url = "http://app.nicky3.com/AppApis/apiPolling.asp?user=" + user + "&answer=" + answer + "&c="+c;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })			
		},
        this.getPresentationSlides = function(id) {   
            
            var url = "http://app.nicky3.com/AppApis/apiPresentationSlides.asp?ID=" + id;
            return $http.jsonp(url, {
                params: {
                    callback: 'JSON_CALLBACK',
                    format:'json'
                }
            })      
        },
        this.getDetails = function(id){
            var temp = localStorage.getItem('presentationList')
            requests = JSON.parse(temp)
            for(i=0;i<requests.length;i++){
                //console.log("test")
                if(requests[i].RecID == id){
                    return requests[i];
                }
            }
        }
        this.getPresentationList = function(id) {   
            
            var temp = localStorage.getItem('presentationList')
            data = JSON.parse(temp)  

            list = $filter('filter')(data, {'EventType': 'presentation'})
    

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

            for (i = 0; i < list.length; i++){

                var s = Date.parse(list[i].StartTime)
                startTime = $filter('date')(s, 'hh:mm a')

                var e = Date.parse(list[i].EndTime)
                endTime = $filter('date')(e, 'hh:mm a')

                tempSchedule = list[i].ScheduledDate
                var scheduledDate = tempSchedule.split(" ")
                scheduledDate = scheduledDate[0]

                var ctt = new Date("November 13, 2013 " + currentTime)
                ctt = ctt.getTime()

                var stt = new Date("November 13, 2013 " + startTime)
                stt = stt.getTime()

                var endt = new Date("November 13, 2013 " + endTime)
                endt = endt.getTime()

                //console.log(ctt + " " + stt + " " + endt)

                if(ctt >= stt && ctt <= endt && today == scheduledDate) {
                    list[i].Status = 'live'
                }
                //UPCOMING
                if(today < scheduledDate) {
                  list[i].Status = 'upcoming' 
                }
                if (today > scheduledDate )  {
                  list[i].Status = 'ended'
                }
                if (today == scheduledDate && ctt > endt)  {
                  list[i].Status = 'ended'
                }
                if (today == scheduledDate && ctt < stt)  {
                  list[i].Status = 'upcoming'
                }

                tempTime = list[i].StartTime
                list[i].displayTime = Date.parse(tempTime)
                
                tempDate = list[i].ScheduledDate
                list[i].displayDate = Date.parse(tempDate)      
            }

            return list
        }

});
