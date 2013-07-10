'use strict';

describe('Service: userService', function () {
  // instantiate service
  var provide,
    userService,
    scope;
//    scope = {
//      $get: function () {},
//      $evalAsync: function () {},
//      $apply: function () {},
//      noop: function(){},
//      error: function () {},
//      quake: {
//        token: '1234',
//        root: 'http://localhost'
//      }
//    };

  // load the service's module
  beforeEach(module('quiverApp', function ($provide) {
    provide = $provide;
//    $provide.value('$rootScope', scope);
//    $provide.value('$rootScope', {
//      $get: function () {},
//      $evalAsync: function () {},
//      $apply: function () {},
//      noop: function(){},
//      error: function () {},
//      quake: {
//        token: '1234',
//        root: 'http://localhost'
//      }
//    });
  }));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    provide.value('$rootScope', scope);
  }));

  beforeEach(inject(function (_userService_) {
    userService = _userService_;

  }));

  it('should return a user', inject(function ($httpBackend, $injector) {
    var mockResponse = {user: {name: "Chris"}, quakeRoot: "localhost"},
      mockToken = {'x-quake-token': '123456'};
    $httpBackend.when('GET', '/user').respond(mockResponse, mockToken);
    userService = $injector.get('userService');
    userService.getUser().then(function (result) {
      expect(result.token).toBe('123456');
      expect(result.user).toEqual({name: "Chris"});
      expect(result.quakeRoot).toBe("localhost");
    });
    $httpBackend.flush();

  }));

//  it('should save users', inject(function ($httpBackend, userService) {
//    var response;
//    $httpBackend.when('PUT', 'http://localhost/user').respond({});
//    $httpBackend.when('GET', '/user').respond({name: 'chris'});
//    userService.saveUser({}).then(function (res) {
//      response = res
//    });
//    scope.$apply();
//    $httpBackend.flush();
//
//    expect(Object.keys(response).length).toBe(0);
//  }));
//
//  it('should save cards', inject(function ($httpBackend) {
//    var response;
//    $httpBackend.when('PUT', 'http://localhost/user/subscribe').respond({});
//    response = userService.saveCard({});
//    $httpBackend.flush();
//    expect(Object.keys(response).length).toBe(0);
//  }));
//
//  it('should save subscriptions', inject(function ($httpBackend) {
//    var response;
//    $httpBackend.when('PUT', 'http://localhost/user/subscribe').respond({});
//    response = userService.saveSubscription({});
//    $httpBackend.flush();
//    expect(Object.keys(response).length).toBe(0);
//  }));
});