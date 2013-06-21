'use strict';

angular.module('quiverApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
    var userDependency = function ($q, userService) {
      var deferred = $q.defer();
      userService.getUser().then(function (user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/logout', {
        resolve: {
          location: function () {
            window.location = location.origin + '/logout';
          }
        }
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          user: userDependency
        }
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
