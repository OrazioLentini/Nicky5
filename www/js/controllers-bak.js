angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MenuCtrl', function($scope) {
  $scope.menu = [
    { title: 'Directoryx', id: 1, icon: 'briefcase', url:'directory' },
    { title: 'Schedule', id: 2, icon: 'calendar' },
    { title: 'Maps', id: 3, icon:'map' },
    { title: 'Trivia', id: 4, icon:'ribbon-a' },
    { title: 'Presentation', id: 5, icon:'speakerphone' },
    { title: 'Home', id: 6, icon:'home' }
  ];
})


.factory('RequestDirectory',function(){
  var requests = [ 
  {"RecID":1,"Company":"Walgreens","Location":"Chicago, IL","Description":"Walgreens is the largest drug retailing chain in the United States. As of May 31, 2014, the company operated 8,217 stores in all 50 states, the District of Columbia, Puerto Rico and the U.S. Virgin Islands.","Logo":"http://patty5.com/AppApis/images/walgreens.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":2,"Company":"HIMSS","Location":"Chicago, IL","Description":"HIMSS is a not-for-profit organization dedicated to improving healthcare quality, safety, cost-effectiveness, and access, through the best use of information technology and management systems.","Logo":"http://patty5.com/AppApis/images/himss.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":3,"Company":"WebMD","Location":"New York City, USA","Description":"WebMD is an American corporation which provides health news, advice, and expertise. It was founded in 1996 by Jim Clark and Pavan Nigam as Healthscape, later Healtheon, and then acquired WebMD in 1999 from Robert Draughon to form Healtheon/WebMD.","Logo":"http://patty5.com/AppApis/images/webmd.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":4,"Company":"Cigna","Location":"Bloomfield, CT","Description":"Cigna is a global health services organization. Its insurance subsidiaries are major providers of medical, dental, disability, life and accident insurance and related products and services, the majority of which are offered through employers and other groups (e.g. governmental and non-governmental organizations, unions and associations).","Logo":"http://patty5.com/AppApis/images/cigna.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":5,"Company":"Merck Co, Inc.","Location":"Kenilworth, NJ","Description":"Merck Co, Inc. is an American pharmaceutical company and one of the largest pharmaceutical companies in the world.","Logo":"http://patty5.com/AppApis/images/merck.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":6,"Company":"Honeywell","Location":"Morristown, NJ","Description":"Honeywell International, Inc. is an American multinational conglomerate company that produces a variety of commercial and consumer products, engineering services, and aerospace systems for a wide variety of customers, from private consumers to major corporations and governments.","Logo":"http://patty5.com/AppApis/images/honeywell.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":7,"Company":"MDLive","Location":"Sunrise, FL","Description":"MDLIVE is an on-demand telehealth company that was acquired by MDLIVE,Inc. in July,2012. MDLiveCare provided patients with remote access via video, phone, and secure email to board certified doctors and licensed therapists.","Logo":"http://patty5.com/AppApis/images/mdlive.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":8,"Company":"Qualcomm Life","Location":"San Diego, CA","Description":"Qualcomm Life is mobilizing health care to improve lives and advance the capabilities of medical devices.","Logo":"http://patty5.com/AppApis/images/qualcomm.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":9,"Company":"Apigee","Location":"San Jose, CA","Description":"Apigee delivers an intelligent API platform to accelerate the pace of digital business. We help companies – from disruptive start-ups to the Fortune 100 – use their enterprise data and services to create connected digital experiences for customers, partners and employees.","Logo":"http://patty5.com/AppApis/images/apigee.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"},{"RecID":10,"Company":"Wellness Corporation Solutions","Location":"Bethesda, MD","Description":"Wellness Corporate Solutions is a state-of-the-art corporate wellness company committed to providing high-touch wellness Photo-Wellness Corporate Solutions - Winning Employees Health Improvement Programs and Solutionsprograms with an emphasis on health education and behavior change.","Logo":"http://patty5.com/AppApis/images/wellness.jpg","Video":"http://patty5.com/AppApis/videos/walgreens.mp4"}
    ];
    return {
        getRequests: function(){ 
        		console.log(requests);
                return requests;
        },
        getRequest: function(id){
            for(i=0; i<requests.length; i++){
                if(requests[i].id == id){
                    return requests[i];
                }
            }
        }
    }
})
.controller('DirectoryCtrl', function($scope, RequestDirectory) {
$scope.requests = RequestDirectory.getRequests();
})




