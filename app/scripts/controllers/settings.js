'use strict';

angular.module('quiverApp')
  .controller('SettingsCtrl', function ($scope, userService, stripeService) {
    var getYears = function () {
      var years = [],
        date = new Date(),
        currentYear = date.getFullYear(),
        i = 10;
      while (i--) {
        years.unshift({value: currentYear + i});
      }

      return years;
    };

    $scope.months = [
      {number: 1, name: 'January (1)'},
      {number: 2, name: 'February (2)'},
      {number: 3, name: 'March (3)'},
      {number: 4, name: 'April (4)'},
      {number: 5, name: 'May (5)'},
      {number: 6, name: 'June (6)'},
      {number: 7, name: 'July (7)'},
      {number: 8, name: 'August (8)'},
      {number: 9, name: 'September (9)'},
      {number: 10, name: 'October (10)'},
      {number: 11, name: 'November (11)'},
      {number: 12, name: 'December (12)'}
    ];

    $scope.years = getYears();

    $scope.saveUser = function (user) {
      $scope.user = userService.saveUser(user);
      console.log('saved user', $scope.user);
    };

    $scope.saveStripe = function (stripe) {
      console.log('saving stripe', stripe);
      $scope.user = userService.saveUser({stripe: stripe});
    };

    $scope.saveSubscription = function (subscription) {
      $scope.user = userService.saveUser({subscription: subscription});
    };

    $scope.isValidCardNumber = function (number) {
      return stripeService.isValidCardNumber(number);
    };

    $scope.isValidCVC = function (cvc) {
      return stripeService.isValidCVC(cvc);
    }

    $scope.isValidCard = function (card) {
      return stripeService.isValidCardNumber(card.number) && stripeService.isValidCVC(card.cvc) && stripeService.isValidExpiry(card.month, card.year);
    }


  });
