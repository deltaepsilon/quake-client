'use strict';

angular.module('quiverApp')
  .controller('FeedsCtrl', function ($scope) {
    $scope.feed = {};

    $scope.isStriped = function (user) {
      return user && user.stripe && user.stripe.secretKey && user.stripe.publicKey;
    };

    $scope.isSubscribed = function (user) {
      return user && user.subscription && user.subscription.active;
    };


  });
