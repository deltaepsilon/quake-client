'use strict';

describe('Directive: filepicker', function () {
  beforeEach(module('testApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<filepicker></filepicker>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the filepicker directive');
  }));
});
