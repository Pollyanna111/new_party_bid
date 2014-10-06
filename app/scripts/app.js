'use strict';

angular
  .module('testApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'views/Activity_list.html',
            controller : 'Activity_list_Ctrl'
        })
        .when('/activity_list',{
            templateUrl: 'views/Activity_list.html',
            controller : 'Activity_list_Ctrl'
            })
        .when('/create_activity',{
            templateUrl: 'views/Create_activity.html',
            controller : 'Create_activity_Ctrl'
            })
        .when('/sign/:activity_id',{
            templateUrl: 'views/Sign.html',
            controller : 'Sign_Ctrl'
            })
        .when('/bid_list/:activity_id',{
            templateUrl: 'views/Bid_list.html',
            controller : 'Bid_list_Ctrl'
        })
        .when('/bidders/:activity_id/:bid_id',{
            templateUrl: 'views/Bidders.html',
            controller : 'Bidders_Ctrl'
        })
        .when('/bid_result/:activity_id/:bid_id/:number_of_bid/:last_page',{
            templateUrl:'views/Bid_result.html',
            controller :'Bid_result_Ctrl'
        })
        .when('/bid_statistics/:activity_id/:bid_id/:number_of_bid',{
            templateUrl:'views/Bid_statistics.html',
            controller :'Bid_statistics_Ctrl'
        })
       .otherwise({
        redirectTo: '/'
        });
  });

