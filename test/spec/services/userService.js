'use strict';

describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('quiverApp'));

  // instantiate service
  var userService;
  beforeEach(inject(function (_userService_) {
    userService = _userService_;
  }));

  it('should do something', inject(function ($httpBackend) {
    var mockResponse = {name: "Chris"},
      mockToken = {'x-quake-token': '123456'};
    $httpBackend.when('GET', '/user').respond(mockResponse, mockToken);
    userService.getUser().then(function (result) {
      expect(result.token).toBe('123456');
      expect(result.user).toEqual({name: "Chris"});
    });
    $httpBackend.flush();

  }));

});
