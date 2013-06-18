'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource) {
    var resource = $resource('/user', {}, {headers: {'x-token': true}});

    // Public API here
    return {
      getUser: function () {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/user'}).
          success(function (data, status, headers, config) {
            deferred.resolve({user: data, token: headers()['x-quake-token']});
          }).
          error(function (data, status) {
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };
  });
