'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $route) {
    if ($route.current) { //For some reason, QuiverCtrl gets invoked twice, once on load and again on resolve.
      $scope.user = $route.current.locals.user;
    }
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
