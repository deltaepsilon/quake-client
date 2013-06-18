'use strict';

describe('Controller: QuiverCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var QuiverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuiverCtrl = $controller('QuiverCtrl', {
      $scope: scope,
      $route: {current: {locals: {user: {name: "Chris"}}}}
    });
  }));

  it('should attach a user to $scope.user', function () {
    expect(scope.user).toEqual({name: "Chris"});
  });
});
