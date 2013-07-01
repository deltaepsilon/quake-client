'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource, $rootScope) {


    var getResource = function (path) {
      $http.defaults.headers.common.authorization = 'Bearer ' + $rootScope.quake.token;
      return $resource($rootScope.quake.root + path, {}, {save: {method: 'PUT'}});
    };

    // Public API here
    return {
      getUser: function (refresh) {
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
