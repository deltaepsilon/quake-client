'use strict';

describe('Controller: QuiverCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var QuiverCtrl,
    scope,
    rootScope;

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
        return {then: function (callback) {
          callback({user: {name: "Chris"}, token: '123456', quakeRoot: 'localhost'});
        }};
      }}
    });
  }));

  it('should attach a user to $scope.user', function () {
    expect(scope.user).toEqual({name: "Chris"});
  });

  it('should attach a quake object to $rootScope', function () {
    expect(rootScope.quake.token).toBe('123456');
    expect(rootScope.quake.root).toBe('localhost');
  });
});
