'use strict';

angular.module('quiverApp')
  .factory('fileService', function ($q, resourceService) {
    // Service logic
    // ...

    // Public API here
    return {
      addWXRUploads: function (paths) {
        var deferred = $q.defer();
        resourceService.getResource('/file/wxrAdd').then(function (resource) {
          deferred.resolve(resource.save({paths: paths})); //Returns user object
        });
        return deferred.promise;
      }
    };
  });
