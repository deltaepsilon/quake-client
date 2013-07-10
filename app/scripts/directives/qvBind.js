'use strict';

angular.module('quiverApp')
  .directive('qvBind', function () {
    var findAttribute = function (scope, bind) {
      var evaluated = scope.$eval(bind);
      if (evaluated) {
         return evaluated;
      } else if (scope.$parent) {
        return findAttribute(scope.$parent, bind);
      }
      return false;

    };
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var binds = attrs.qvBind.split(','),
          i = binds.length,
          bind;

        while (i--) {
          bind = binds[i]
          scope[bind] = findAttribute(scope, bind);
        }

      },
      priority: 10
    };
  });
