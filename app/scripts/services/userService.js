'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource, $rootScope) {


    var getResource = function () {
      $http.defaults.headers.common['authorization'] = 'Bearer ' + $rootScope.quake.token;
      return $resource($rootScope.quake.root + '/user', {}, {save: {method: 'PUT'}});
    };

    // Public API here
    return {
      getUser: function () {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/user'}).
          success(function (data, status, headers) {
            data.token = headers()['x-quake-token'];
            deferred.resolve(data);
          }).
          error(function (data, status) {
            deferred.reject(data, status);
          });
        return deferred.promise;
      },

      saveUser: function (user) {
        return getResource().save(user);
      }
    };
  });
