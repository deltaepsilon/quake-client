'use strict';

angular.module('quiverApp')
  .directive('filepicker', function ($timeout, filepicker) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.filepicker = {};

        if (!element.find('div').length) {
          filepicker.constructWidget(element.find('input')[0]);
        }
        scope.filepicker.live = true;

      },
      controller: function ($scope) {
        filepicker.setKey($scope.filepicker.key);
      }
    };
  });
