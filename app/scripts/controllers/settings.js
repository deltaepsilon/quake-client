'use strict';

angular.module('quiverApp')
  .controller('SettingsCtrl', function ($scope, userService) {

    $scope.saveUser = function (user) {
      $scope.user = userService.saveUser(user);
      console.log('saved user', $scope.user);
    }


  });
