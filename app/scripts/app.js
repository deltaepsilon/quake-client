'use strict';

angular.module('quiverApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'QuiverCtrl',
        resolve: {
          user: function ($q, $route, userService) {
            var deferred = $q.defer();
            userService.getUser().then(function (user) {
              deferred.resolve(user);
            });
            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
