'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource, $rootScope) {


    var getResource = function (path) {
      $http.defaults.headers.common.authorization = 'Bearer ' + $rootScope.quake.token;
      return $resource($rootScope.quake.root + path, {}, {save: {method: 'PUT'}});
    };

    // Public API here
    return {
      getUser: function () {
        var deferred = $q.defer();
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
            deferred.resolve(data);
          }).
          error(function (data, status) {
            deferred.reject(data, status);
          });
        return deferred.promise;
      },

      saveUser: function (user) {
        return getResource('/user').save(user, $rootScope.success, $rootScope.error);
      },

      saveCard: function (user) {
        return getResource('/user/subscribe').save(user, $rootScope.success, $rootScope.error);
      },

      saveSubscription: function (user) {
        return this.saveCard(user);
      }
    };
  });
