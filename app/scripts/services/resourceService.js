'use strict';

angular.module('quiverApp')
  .factory('resourceService', function ($q, $http, $resource, $rootScope) {
    // Service logic
    // ...

    var getResource = function (path, options) {
      $http.defaults.headers.common.authorization = 'Bearer ' + $rootScope.quake.token;
      return $resource($rootScope.quake.root + path, {}, options);
    },
    getUser = function (refresh) {
      var deferred = $q.defer();
      if (!refresh && $rootScope.user && $rootScope.quake && $rootScope.quake.token && $rootScope.quake.root) {
        deferred.resolve({user: $rootScope.user, quake: {token: $rootScope.quake.token, root: $rootScope.quake.root}});
      } else {
        $http({method: 'GET', url: '/user'}).
          success(function (data, status, headers) {
            data.token = headers()['x-quake-token'];
            $rootScope.user = data.user;
            $rootScope.quake = {
              token: data.token,
              root: data.quakeRoot
            };
            $rootScope.stripe = {
              pk: data.stripePK
            };
            $rootScope.filepicker = {
              key: data.filepickerKey
            };
            deferred.resolve(data);
          }).
          error(function (data, status) {
            deferred.reject(data, status);
          });
      }

      return deferred.promise;
    };

    // Public API here
    var resourceService = {
      getQuake: function () {
        var deferred = $q.defer();
        if (!$rootScope.quake) {
          return getUser().then(function () {
            deferred.resolve($rootScope.quake);
          });
        } else {
          deferred.resolve($rootScope.quake);
        }
        return deferred.promise;

      },
      getResource: function (path, options) {
        var deferred = $q.defer();

        resourceService.getQuake().then(function () {
          deferred.resolve(getResource(path, options));
        });
        return deferred.promise;

      },
      getUser: getUser,
      success: function (success) {
        $rootScope.error('Saved', 'success');
      },
      error: function (error, notificationClass) {
        $rootScope.error(error, notificationClass);
      },
      scope: $rootScope,
      resource: $resource
    };
    return resourceService;
  });
