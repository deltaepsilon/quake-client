'use strict';

angular.module('quiverApp')
  .directive('qvTable', function () {
    return {
      template: '<table><thead class="{{theadClass}}"><tr><th ng-repeat="column in columns" class="{{column.class}}" title={{column.name}}>{{column.name}}</th></tr></thead><tbody class={{tbody.class}}><tr ng-repeat="row in rows" class="{{row.class}}"><td ng-repeat="data in row.data" class="{{data.class}}" title="{{data.contents}}">{{data.contents}}</td></tr></tbody></table>',
      restrict: 'A',
      scope: {
        theadClass: "@",
        tbodyClass: "@",
        columns: "=",
        rows: "=",
        tableizer: "&"
      },
      link: function postLink(scope, element, attrs) {
        scope.tableizer();
      }
    };
  });
