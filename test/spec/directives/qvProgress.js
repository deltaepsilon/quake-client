'use strict';

describe('Directive: qvProgress', function () {
  beforeEach(module('testApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<qv-progress></qv-progress>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the qvProgress directive');
  }));
});
