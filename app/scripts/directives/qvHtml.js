'use strict';

angular.module('quiverApp')
  .directive('qvHtml', function ($compile) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var html = attrs.qvHtml,
          e;

        if (html && html.length) {
          e = angular.element(html);
          element.append(e);
          $compile(e)(scope);
        }
      }

    };
  });
