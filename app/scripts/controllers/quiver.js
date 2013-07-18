'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService) {
    $scope.notifications = [];

    $rootScope.noop = function () {};

    $rootScope.success = function (success) {
      $rootScope.error(success || 'Saved', 'success');
    };

    $rootScope.error = function (error, notificationClass) {
      var message = error,
        errorClass = notificationClass || 'error';

      if (error.status) {
//        message = error.status + ':';
        if (error.data) {
          message = ''; //Don't show status... it looks tacky
          if (error.data.error) {
            message += error.data.error;
          } else {
            message += error.data;
          }
        }
      }
      return $scope.$emit('show notification', message, errorClass);
    };

    userService.getUser(); // Get user data

    $scope.changeLocation = function (location) {
      $location.url(location);
    };

    $scope.isTrialing = function (user) {
      return !!(user && user.stripe && user.stripe.customer && user.stripe.customer.subscription && user.stripe.customer.subscription.status === 'trialing');
    };

  });
