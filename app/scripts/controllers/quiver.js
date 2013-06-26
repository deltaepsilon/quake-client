'use strict';

angular.module('quiverApp')
  .controller('QuiverCtrl', function ($scope, $location, $rootScope, userService) {
    $scope.notifications = [];

    $rootScope.noop = function () {};

    $rootScope.success = function (success) {
      $rootScope.error('Saved', 'success');
    };

    $rootScope.error = function (error, notificationClass) {
      var message = error,
        errorClass = notificationClass || 'error';

      console.log('incoming error', error);

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
      $scope.$emit('show notification', message, errorClass);
    };

    userService.getUser(); // Get user data

    $scope.changeLocation = function (location) {
      $location.url(location);
    };

    $scope.isTrialing = function (user) {
      return !!(user && user.stripe && user.stripe.customer && user.stripe.customer.subscription && user.stripe.customer.subscription.status === 'trialing');
    };

  });
