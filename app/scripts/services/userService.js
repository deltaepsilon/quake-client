'use strict';

angular.module('quiverApp')
  .factory('userService', function ($q, $http, $resource, $rootScope, resourceService) {

    // Public API here
    return {
      getUser: resourceService.getUser,

      saveUser: function (user) {
        var deferred = $q.defer();

        resourceService.getResource('/user', {save: {method: 'PUT'}}).then(function (resource) {
          deferred.resolve(resource.save(user, $rootScope.success, $rootScope.error));

        });
        return deferred.promise;
      },

      saveCard: function (user) {
        var deferred = $q.defer();

        resourceService.getResource('/user/subscribe', {save: {method: 'PUT'}}).then(function (resource) {
          deferred.resolve(resource.save(user, $rootScope.success, $rootScope.error));
        });
        return deferred.promise;
      },

      saveSubscription: function (user) {
        return this.saveCard(user);
      }
    };
  });
