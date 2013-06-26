'use strict';

describe('Directive: qvActive', function () {
  beforeEach(module('testApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<qv-active></qv-active>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the qvActive directive');
  }));
});
