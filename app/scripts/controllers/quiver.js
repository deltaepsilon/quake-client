'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService, $http) {
    userService.getUser().then(function (data) {
      $scope.user = data.user;
      $rootScope.quake = {
        token: data.token,
        root: data.quakeRoot
      };
      $rootScope.stripe = {
        pk: data.stripePK
      }

    });

    $scope.changeLocation = function (location) {
      $location.url(location);
    };
  });
