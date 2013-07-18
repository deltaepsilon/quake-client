'use strict';

describe('Directive: qvHtml', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should replace guts with html', inject(function ($rootScope, $compile) {
    element = angular.element('<div qv-html="<hr>"></div>');
    element = $compile(element)($rootScope);
    expect(element.html()).toBe('<hr class="ng-scope">');
  }));
});
