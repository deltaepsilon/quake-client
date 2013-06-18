'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource, $rootScope) {
    console.log('rootScope', $rootScope);
    var getResource = function () {
      console.log('root', $rootScope.quake.root);
      return $resource($rootScope.quake.root + '/user', {}, {headers: {'authorization': 'Bearer ' + $rootScope.quake.token}});
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
        console.log(Object.keys(getResource()));
        return getResource().save(user);
      }
    };
  });
