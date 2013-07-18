'use strict';

describe('Directive: qvBind', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should inherit scope whether it wants to or not', inject(function ($rootScope, $compile) {
    var scope = $rootScope.$new(),
      keys;

    $rootScope.test = [1, 2, 3];

    element = angular.element('<div qv-bind="test"></div>');
    element = $compile(element)(scope);

    keys = Object.keys(scope);
    expect(keys[keys.length - 1]).toBe('test');
  }));
});
