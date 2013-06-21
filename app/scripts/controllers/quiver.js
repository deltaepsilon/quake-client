'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService) {
    $rootScope.noop = function () {};

    $rootScope.error = function (error) {
      console.log('error', error);
    };

    userService.getUser(); // Get user data

    $scope.changeLocation = function (location) {
      $location.url(location);
    };

    $scope.isTrialing = function (user) {
      return user && user.stripe && user.stripe.subscription && user.stripe.subscription.status === 'trialing';
    };


  });
