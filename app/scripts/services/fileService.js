'use strict';

angular.module('quiverApp')
  .factory('fileService', function ($q, resourceService, io) {
    // Service logic
    // ...



    // Public API here
    return {
      get: function (query) {
        var deferred = $q.defer();
        resourceService.getResource('/file/findAll', {get: {method: 'POST', isArray: true}}).then(function (resource) {
          resource.get({where: JSON.stringify(query)}, deferred.resolve, deferred.reject);
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
          var socket = io.connect(quake.root + '?token_type=bearer&access_token=' + quake.token);
          socket.on('connect', function () {
            socket.emit('message', JSON.stringify({url: '/file/wxr', data: {id: id, 'access_token': quake.token, 'token_type': 'bearer'}}));
          });
          deferred.resolve(socket);

        });
        return deferred.promise;

      }
    };
  });
