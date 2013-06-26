'use strict';

angular.module('quiverApp')
  .directive('qvActive', function ($rootScope, $location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var routeAttribute = attrs.qvActive,
          checkActive = function () {
            var url = $location.url(),
              children = element.children(),
              i = children.length,
              child;

            children.removeClass('active');
            while (i--) {
              child = angular.element(children[i]);
              if (child.attr(routeAttribute) === url) {
                child.addClass('active');
              }
            }

          };

        if (!routeAttribute) {
          return console.error('Route attribute is missing. The form is <div qv-active="route-attribute"><a route-attribute="/my-route"></a></div>');
        }

        $rootScope.$on('$locationChangeSuccess', checkActive);
      }
    };
  });
