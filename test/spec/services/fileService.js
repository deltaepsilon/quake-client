'use strict';

describe('Service: fileService', function () {

  // load the service's module
  beforeEach(module('quiverApp'));

  // instantiate service
  var fileService;
  beforeEach(inject(function (_fileService_) {
    fileService = _fileService_;
  }));

  it('should do something', function () {
    expect(!!fileService).toBe(true);
  });

  it('should GET files', inject(function ($httpBackend) {
    var mock = {test: 2};
    $httpBackend.when('POST', 'localhost/file/findAll').respond(mock);
    $httpBackend.when('GET', '/user').respond({quakeRoot: 'localhost'});
    fileService.get().then(function (result) {
      expect(result.length).toBe(1);
    });
    $httpBackend.flush();
  }));

  it('should CREATE files', inject(function ($httpBackend) {
    var mock = {test: 2};
    $httpBackend.when('POST', 'localhost/file/create').respond(mock);
    $httpBackend.when('GET', '/user').respond({quakeRoot: 'localhost'});
    fileService.create().then(function (result) {
      expect(result.length).toBe(1);
    });
    $httpBackend.flush();

  }));

  it('should DESTROY files', inject(function ($httpBackend) {
    var mock = {test: 2};
    $httpBackend.when('DELETE', 'localhost/file/destroy?where=%7B%7D?where=%7B%7D').respond(mock);
    $httpBackend.when('GET', '/user').respond({quakeRoot: 'localhost'});
    fileService.destroy().then(function (result) {
      expect(result.length).toBe(undefined);
    });
    $httpBackend.flush();

  }));

  it('should process WXR files', inject(function ($rootScope, $q, $httpBackend, resourceService, io) {
    resourceService.getQuake = function () {
      var deferred = $q.defer();
      deferred.resolve({root: 'localhost', token: '123456'});
      return deferred.promise;
    };

    io.connect = function (url) {
      var socket = {
        on: function (event, cb) {
          cb();
        },
        emit: function (event, message) {
          var result = {event: event, message: message};
          socket.result = result;
          return result;
        }
      };
      return socket;
    };

    fileService.wxr(1).then(function (socket) {
      expect(socket.result).toEqual({
        event: 'message',
        message: '{"url":"/file/wxr","data":{"id":1,"access_token":"123456","token_type":"bearer"}}'
      });
    });

    $rootScope.$digest();


  }));

});
