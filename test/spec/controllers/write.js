'use strict';

describe('Controller: WriteCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var WriteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();

    WriteCtrl = $controller('WriteCtrl', {
      $scope: scope
    });
  }));

  it('should do something', function () {
    expect(1).toBe(2);

  });


});
