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
    };

    $scope.saveStripe = function (stripe) {
      $scope.user = userService.saveUser({stripe: stripe});
    };

    $scope.saveSubscription = function (id, card, user) {
      stripeService.createQuiverSubscription(id, card, user).then(function (subscription) {
        var card = subscription.customer.card;
        $scope.card = {
          number: card.type + ' ************' + card.last4,
          month: card.exp_month,
          year: card.exp_year,
          cvc: null
        };
        $scope.subscription = subscription;
      });
    };

    $scope.isValidCardNumber = function (number) {
      return stripeService.isValidCardNumber(number);
    };

    $scope.isValidCVC = function (cvc) {
      return stripeService.isValidCVC(cvc);
    }

    $scope.isValidCard = function (card) {
      return card && stripeService.isValidCardNumber(card.number) && stripeService.isValidCVC(card.cvc) && stripeService.isValidExpiry(card.month, card.year);
    }


  });
