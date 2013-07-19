'use strict';

describe('Directive: filepicker', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should inject a filepicker widget', inject(function ($rootScope, $compile) {
    $rootScope.filepicker = {key: '123'}
    element = angular.element('<div filepicker><input type="filepicker-dragdrop"/></div>');
    element = $compile(element)($rootScope);
    expect(element.html()).toBe('<input type="filepicker-dragdrop" style="display: none;"><div class="" style="padding: 1px;"><button type="button" class="">Pick File</button><div class="" style="border: 1px dashed rgb(170, 170, 170); display: inline-block; margin: 0px 0px 0px 4px; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; background-color: rgb(243, 243, 243); color: rgb(51, 51, 51); font-size: 14px; line-height: 22px; padding: 2px 4px; vertical-align: middle; cursor: pointer; overflow: hidden;">Or drop files here</div></div>');

  }));
});
