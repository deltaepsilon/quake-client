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
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
