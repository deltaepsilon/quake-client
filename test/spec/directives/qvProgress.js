'use strict';

describe('Directive: qvProgress', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should inject a progress bar and update its data', inject(function ($rootScope, $compile) {
    element = angular.element('<div qv-progress><div id="target"></div></div>');
    element = $compile(element)($rootScope);

    $rootScope.progress = {percent: 0, message: 'Importing', id: 'target', template: 'percent'};
    $rootScope.$broadcast('progressInit', $rootScope.progress);

    $rootScope.progress = {percent: 50, message: 'new message', id: 'target', template: 'percent'};
    $rootScope.$broadcast('progress', $rootScope.progress);

    $rootScope.$digest();

    expect(element.html()).toBe('<div id="target"><div class="progress full-height ng-scope" style="min-height: 60px;"><div class="inline background-color-00 full-width light-text"><span class="progress-bar-text ng-binding">new message</span><div class="progress-bar abs-left background-color-7" style="width: 50%;"></div></div></div></div>');
  }));
});
