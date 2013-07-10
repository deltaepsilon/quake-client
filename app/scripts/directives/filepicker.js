'use strict';

angular.module('quiverApp')
  .directive('filepicker', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.filepicker = {};
        $timeout(function () {
          if (!element.find('div').length) {
            filepicker.constructWidget(element.find('input')[0]);
          }
          scope.filepicker.live = true;
        }, 750);

      },
      controller: function ($scope) {
        filepicker.setKey($scope.filepicker.key);
      }
    };
  });
