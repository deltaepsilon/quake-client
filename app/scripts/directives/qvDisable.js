'use strict';

angular.module('quiverApp')
  .directive('qvDisable', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var event = attrs.qvDisable || 'click';

        element.on(event, function () {
          element.attr('disabled', 'disabled');
        });
      }
    };
  });
