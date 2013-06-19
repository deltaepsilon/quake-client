'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService) {
    userService.getUser().then(function (data) {
      $scope.user = data.user;
      $rootScope.quake = {
        token: data.token,
        root: data.quakeRoot
      };
    });

    $scope.changeLocation = function (location) {
      $location.url(location);
    };
  });
