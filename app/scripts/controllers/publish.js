'use strict';

angular.module('quiverApp')
  .controller('PublishCtrl', function ($scope) {
    $scope.feed = {};

    $scope.isStriped = function (user) {
      return !!(user && user.stripe && user.stripe.secretKey && user.stripe.publicKey);
    };

    $scope.isSubscribed = function (user) {
      return !!(user && user.stripe && user.stripe.customer && user.stripe.customer.subscription && user.stripe.customer.subscription.plan);
    };


  });
