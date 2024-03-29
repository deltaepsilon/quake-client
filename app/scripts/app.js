'use strict';

angular.module('quiverApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
    var search = location.search,
      searchREGEX = /(\w+=[^&]+)/g,
      getQuery = function () {
        var pairs = search.match(searchREGEX) || [],
          pair,
          result = {},
          i = pairs.length;
        while (i--) {
          pair = pairs[i].split('=');
          result[pair[0]] = pair[1];
        }
        return result;
      },
      query = getQuery(),
      userDependency = function ($q, userService) {
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
      .when('/publish', {
        templateUrl: 'views/publish.html',
        controller: 'PublishCtrl'
      })
      .when('/admin-customers', {
        templateUrl: 'views/admin/customers.html',
        controller: 'AdminCustomersCtrl',
        resolve: {
          customers: function ($q, $rootScope, userService, stripeService) {
            var deferred = $q.defer();
            userDependency($q, userService).then(function () {
              stripeService.listCustomers().then(function (customers) {
                deferred.resolve(customers);
              });

            });
            return deferred.promise;
          }
        }
      })
      .when('/write', {
        templateUrl: 'views/write.html',
        controller: 'WriteCtrl',
        resolve: {
          user: userDependency
        }
      })
      .when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl',
        resolve: {
          user: userDependency
        }
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          posts: function ($q, postService) {
            var deferred = $q.defer();
            postService.findAll().then(deferred.resolve, deferred.reject);
            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
