'use strict';

angular.module('quiverApp')
  .directive('qvTable', function () {
    return {
      template: '<table><thead class="{{table.theadClass}}"><tr><th ng-repeat="column in table.columns" class="{{column.class}}" title={{column.name}}>{{column.name}}</th></tr></thead><tbody class={{table.tbodyClass}}><tr ng-repeat="row in table.rows" class="{{row.class}}"><td ng-repeat="data in row.data" class="{{data.class}}" title="{{data.contents}}" qv-html="{{data.html}}">{{data.contents}}</td></tr></tbody></table>',
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
        console.log('scope', scope);
//        scope.tableizer();

        var tableizer = scope.$eval(attrs.tableizer),
          data = attrs.qvTable;

        if (typeof tableizer === 'function') {
          tableizer();
        }

        scope.$watch(data, function (newVal) {
          scope.table = newVal;
        });

      }
    };
  });
