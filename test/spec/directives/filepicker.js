'use strict';

describe('Directive: filepicker', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should inject a filepicker widget', inject(function ($rootScope, $compile) {
    $rootScope.filepicker = {key: '123'}
    element = angular.element('<div filepicker><input/></div>');
    element = $compile(element)($rootScope);
    console.log('html', element.html());
    expect(element.text()).toBe('this is the filepicker directive');
  }));
});
