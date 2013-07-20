'use strict';

angular.module('quiverApp')
  .factory('postService', function ($rootScope, $q, resourceService) {
    // Service logic
    // ...

    // Public API here
    return {
      findAll: function (query) {
        var deferred = $q.defer(),
          query = query || {userID: ''};

        resourceService.getResource('/post/findAll', {get: {method: 'POST', isArray: true}}).then(function (resource) {
          resource.get({where: JSON.stringify(query)}, deferred.resolve, deferred.reject);
        });
        return deferred.promise;
      }
    };
  });
