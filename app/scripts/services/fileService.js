'use strict';

angular.module('quiverApp')
  .factory('fileService', function ($q, resourceService) {
    // Service logic
    // ...

    // Public API here
    return {
      get: function (query) {
        var deferred = $q.defer();
        resourceService.getResource('/file/findAll', {get: {method: 'GET', isArray: true}}).then(function (resource) {
          resource.get(query, deferred.resolve, deferred.reject);
//          deferred.resolve(resource.get(query)); //Returns user object
        });
        return deferred.promise;
      },
      create: function (classification, paths) {
        var deferred = $q.defer();
        resourceService.getResource('/file/create', {save: {method: 'POST', isArray: true}}).then(function (resource) {
          resource.save({classification: classification, paths: paths}, deferred.resolve, deferred.reject); //Returns user object
        });
        return deferred.promise;
      },
      destroy: function (id) {
        var deferred = $q.defer();
        resourceService.getResource('/file/destroy').then(function (resource) {
          resource.remove({id: id}, deferred.resolve, deferred.reject); //Returns success message
        });
        return deferred.promise;
      }
    };
  });
