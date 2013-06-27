'use strict';

angular.module('quiverApp')
  .controller('AdminCustomersCtrl', function ($scope) {
    console.log('scope.query', $scope.query);
    debugger;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
