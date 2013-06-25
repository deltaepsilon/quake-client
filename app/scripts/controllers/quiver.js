'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService) {
    $scope.notifications = [];

    $rootScope.noop = function () {};

    $rootScope.error = function (error) {
      console.log('error', error);
    };

    userService.getUser(); // Get user data

    $scope.changeLocation = function (location) {
      $location.url(location);
    };

    $scope.isTrialing = function (user) {
      return !!(user && user.stripe && user.stripe.customer.subscription && user.stripe.customer.subscription.status === 'trialing');
    };

    $scope.addNotification = function (notification, status) {
      return $scope.$emit('show notification', notification, status || 'error');
    };

  });
