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

    $scope.plans = [
      {value: 'quiver0', description: "Quiver Preview $0/Month"},
      {value: 'quiver30', description: "Quiver Basic $30/Month"},
      {value: 'quiver100', description: "Quiver Pro $100/Month"}
    ];

    $scope.card = {
      month: $scope.months[0].number,
      year: $scope.years[1].value
    };

    if ($scope.user) {

      if ($scope.user.stripe && $scope.user.stripe.active_card) {
        var activeCard = $scope.user.stripe.active_card;
        $scope.card = {
          number: activeCard.type + ' ************' + activeCard.last4,
          month: activeCard.exp_month,
          year: activeCard.exp_year,
          cvc: null
        };
      }

      if (!$scope.user.plan) { // Default user.plan in case it hasn't been set
        $scope.user.plan = $scope.plans[0].value;
      }
    }

    $scope.saveUser = function (user) {
      $scope.user = userService.saveUser(user);
    };

    $scope.saveStripe = function (stripe) {
      $scope.user = userService.saveUser({stripe: stripe});
    };

    $scope.saveSubscription = function (card, user) {
      stripeService.createQuiverSubscription(card, user, user.plan).then(function (user) {
        if (user.stripe) {
          var card = user.stripe.customer.card;
          $scope.card = {
            number: card.type + ' ************' + card.last4,
            month: card.exp_month,
            year: card.exp_year,
            cvc: null
          };
        }

      });
    };

    $scope.isValidCardNumber = function (number) {
      return stripeService.isValidCardNumber(number);
    };

    $scope.isValidCVC = function (cvc) {
      return stripeService.isValidCVC(cvc);
    };

    $scope.isValidCard = function (card) {
      return card && stripeService.isValidCardNumber(card.number) && stripeService.isValidCVC(card.cvc) && stripeService.isValidExpiry(card.month, card.year);
    };

    $scope.subscriptionMessage = function (user) {
      return (user && user.stripe) ? "Update Subscription" : "Activate Subscription";
    }


  });
