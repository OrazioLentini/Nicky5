// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //setTimeout(function () {
      //     SyncService.sync()
        //   },150);
  });
})



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0)
  $stateProvider
  
   .state('app.schedule', {
      url: "/schedule/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/schedule.html",
          controller: 'ScheduleCtrl'
        }
      }
    })
  .state('app.sync', {
    url: "/sync",
    abstract: true,
    cache: false,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
   
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.showcase', {
    url: "/showcase/:ID",
    views: {
      'menuContent': {
        templateUrl: "templates/showcase.html",
        controller: 'ShowcaseCtrl'
      }
    }
  })

  .state('app.showdetails', {
      url: "/showdetails/:RecID",
      views: {
        'menuContent': {
        templateUrl: "templates/showdetails.html",
        controller: 'ShowDetailCtrl'
      }
    }
  })


    .state('app.menu', {
      url: "/",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
	  .state('app.directory', {
      url: "/directory/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/directory.html",
          controller: 'DirectoryCtrl'
        }
      }
    })
	
	.state('app.details', {
      url: "/details/:RecID",
  	  views: {
        'menuContent': {
        templateUrl: "templates/detail.html",
        controller: 'DetailCtrl'
  	  }
	  }
  })
	
  .state('app.trivia', {
      url: "/trivia/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/trivia.html",
          controller: 'TriviaCtrl'
        }
      }
    })

     .state('app.learning', {
      url: "/learning/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/learning.html",
          controller: 'LearningCtrl'
        }
      }
    })
  .state('app.favorites', {
      url: "/favorites/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/favorites.html",
          controller: 'FavoritesCtrl'
        }
      }
    })

  .state('app.presentations', {
      url: "/presentations/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/presentationLists.html",
          controller: 'PresentationsListsCtrl'
        }
      }
    })
   .state('app.feedback', {
      url: "/feedback/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/feedback.html",
          controller: 'FeedbackCtrl'
          }
      }
    })

  .state('app.polling', {
      url: "/polling/:SpeakerID/:ID/:PresentationID",
      views: {
        'menuContent': {
          templateUrl: "templates/presentation.html",
          controller: 'PollingCtrl'
        }
      }
    })
  
	 .state('app.maps', {
      url: "/maps/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/maps.html",
          controller: 'MapsCtrl'
        }
      }
    })

  .state('app.viewmap', {
      url: "/viewmap/:RecID",
      views: {
        'menuContent': {
        templateUrl: "templates/viewmap.html",
        controller: 'ViewMapsCtrl'
      }
    }
  })
	
   .state('app.social', {
      url: "/social/:ID",
      views: {
        'menuContent': {
          templateUrl: "templates/social.html",
          controller: 'SocialCtrl'
          }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/');
});
