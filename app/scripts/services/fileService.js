'use strict';

angular.module('quiverApp')
  .factory('fileService', function ($q, resourceService, socket) {
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

      },
      wxr: function (id) {
        var deferred = $q.defer();

        resourceService.getQuake().then(function (quake) {
          var wxrSocket = socket.connect(quake.root + '/wxr?token_type=bearer&access_token=');// + quake.token);
          return ;
        });

        return deferred.promise;

      }
    };
  });
