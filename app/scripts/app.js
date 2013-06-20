'use strict';

angular.module('quiverApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
//    var userDependency = function ($q, userService) {
//      var deferred = $q.defer();
//      userService.getUser().then(function (user) {
//        deferred.resolve(user);
//      });
//      return deferred.promise;
//    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/feeds', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
