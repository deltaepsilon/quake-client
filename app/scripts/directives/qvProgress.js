'use strict';

angular.module('quiverApp')
  .directive('qvProgress', function ($compile) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var templates = {
            percent: '<div class="progress full-height" style="min-height: 60px;"><div class="inline background-color-00 full-width light-text"><span class="progress-bar-text">{{progress.message}}</span><div class="progress-bar abs-left background-color-7"></div></div></div>'
          },
          container,
          bar,
          progressBar,
          cached,
          id;

        scope.$on('progressInit', function (e, progress) {
          scope.progress = progress;

          if (scope.progress.id !== id) {
            if (container) {

              container.html(cached);
            }

            bar = angular.element(templates[scope.progress.template]);
            progressBar = bar.find('.progress-bar');
            container = element.find('#' + scope.progress.id);

            cached = container.html();

            $compile(bar)(scope);
            container.html(bar);

          }
        });

        scope.$on('progress', function (e, progress) {
          scope.progress = progress;
          progressBar.css('width', scope.progress.percent + '%');

        });
      }
    };
  });
