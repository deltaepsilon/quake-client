'use strict';

describe('Directive: qvDisable', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should disable on click by default', inject(function ($rootScope, $compile) {
    element = angular.element('<input qv-disable/>');
    element = $compile(element)($rootScope);

    element.trigger('click');
    expect(element.attr('disabled')).toBe('disabled');
  }));

  it('should disable on specified action', inject(function ($rootScope, $compile) {
    element = angular.element('<input qv-disable="blur"/>');
    element = $compile(element)($rootScope);

    element.trigger('blur');
    expect(element.attr('disabled')).toBe('disabled');
  }));
});
