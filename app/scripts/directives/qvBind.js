'use strict';

angular.module('quiverApp')
  .directive('qvBind', function () {
    var findAttribute = function (root, scope, bind) {
      var evaluated = scope.$eval(bind);
      if (evaluated !== undefined) {
        scope.$watch(bind, function (val) { // Set up a watch to update the root scope whenever the value changes
          root[bind] = val;
        });
         return evaluated;
      } else if (scope.$parent) {
        return findAttribute(root, scope.$parent, bind);
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
          scope[bind] = findAttribute(scope, scope, bind);
        }

      },
      priority: 10
    };
  });
