'use strict';

describe('Service: userService', function () {
  // instantiate service
  var provide,
    userService,
    scope;

  // load the service's module
  beforeEach(module('quiverApp', function ($provide) {
    $provide.value('$rootScope', {
      $get: function () {},
      $evalAsync: function () {},
      $apply: function () {},
      noop: function(){},
      error: function () {}});
  }));

  beforeEach(inject(function (_userService_) {
    userService = _userService_;
  }));

  it('should do something', inject(function ($httpBackend, $injector) {
      var mockResponse = {user: {name: "Chris"}, quakeRoot: "localhost"},
        mockToken = {'x-quake-token': '123456'};
      $httpBackend.when('GET', '/user').respond(mockResponse, mockToken);
      userService = $injector.get('userService');
      console.log('****************', userService);
      userService.getUser().then(function (result) {
        expect(result.token).toBe('123456');
        expect(result.user).toEqual({name: "Chris"});
        expect(result.quakeRoot).toBe("localhost");
      });
      $httpBackend.flush();

    }));

  it('should save users', function () {
    var mockUser = {};
    expect({stripe: {}}).toEqual(mockUser);
  });

  it('should save cards', function () {
    var mockCard = {};
    expect({card: {}}).toEqual(mockCard);
  });

  it('should save subscriptions', function () {
    var mockSubscription = {};
    expect({subscription: {}}).toEqual(mockSubscription);
  });
});