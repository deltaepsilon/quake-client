'use strict';

describe('Directive: qvDisable', function () {
  beforeEach(module('testApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<qv-disable></qv-disable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the qvDisable directive');
  }));
});
