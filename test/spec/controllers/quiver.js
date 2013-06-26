'use strict';

describe('Controller: QuiverCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    QuiverCtrl = $controller('QuiverCtrl', {
      $scope: scope,
      $route: {current: {locals: {user: {name: "Chris"}}}},
      $location: {url: function () {
        return '/blubber'
      }},
      $rootScope: $rootScope,
      userService: {getUser: function () {
        var payload = {user: {name: "Chris"}, token: '123456', quakeRoot: 'localhost'};
        rootScope.user = payload.user;
        rootScope.quake = {
          token: payload.token,
          root: payload.quakeRoot
        };
      }}
    });

    //Set up mock scope object
    scope.$emit = function (event, message, type) {
      return arguments
    };
  }));

  var QuiverCtrl,
    scope,
    rootScope,
    trialingUser = {stripe: {customer: {subscription: {status: 'trialing'}}}},
    subscribedUser = {stripe: {customer: {subscription: {status: 'subscribed'}}}};

  it('should attach a user to $scope.user', function () {
    expect(scope.user).toEqual({name: "Chris"});
  });

  it('should attach a quake object to $rootScope', function () {
    expect(rootScope.quake.token).toBe('123456');
    expect(rootScope.quake.root).toBe('localhost');
  });

  it('should be trialing', function () {
    expect(scope.isTrialing(trialingUser)).toBe(true);
    expect(scope.isTrialing(subscribedUser)).toBe(false);
  });

  it('should emit a notification', function () {
    var notification = 'notificationing',
      error = 'errorific';
    expect(scope.error(notification, error)).toEqual(['show notification', notification, error]);
  });
});
