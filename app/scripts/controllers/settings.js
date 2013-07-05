'use strict';

angular.module('quiverApp')
  .controller('SettingsCtrl', function ($q, $scope, userService, stripeService) {
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
      {value: 'quiver0', description: 'Quiver Preview $0/Month'},
      {value: 'quiver30', description: 'Quiver Basic $30/Month'},
      {value: 'quiver100', description: 'Quiver Pro $100/Month'}
    ];

    $scope.card = {
      month: $scope.months[0].number,
      year: $scope.years[1].value
    };

    if ($scope.user) {

      if ($scope.user.stripe && $scope.user.stripe.customer && $scope.user.stripe.customer.active_card) {
        var activeCard = $scope.user.stripe.customer.active_card;
        $scope.card = {
          number: activeCard.type + ' ************' + activeCard.last4,
          month: activeCard.exp_month,
          year: activeCard.exp_year,
          cvc: null
        };
      }

      if ($scope.user && $scope.user.stripe && !$scope.user.stripe.plan) { // Default user.plan in case it hasn't been set
        $scope.user.stripe.plan = $scope.plans[0].value;
      }
    }

    $scope.saveUser = function (user) {
      var deferred = $q.defer();
       userService.saveUser(user).then(function (user) {
         $scope.user = user;
         deferred.resolve($scope.user);
      });
      return deferred.promise;
    };

    $scope.saveStripe = function (user) {
      var deferred = $q.defer();
      userService.saveUser(user).then(function (user) {
        $scope.user = user;
      });
      return deferred.promise;
    };

    $scope.saveSubscription = function (user) {
      var deferred = $q.defer();
      stripeService.saveSubscription(user).then(function (user) {
        $scope.user = user;
      });
      return $scope.user;
      return deferred.promise;
    };

    $scope.saveCard = function (card, user) {
      stripeService.saveCard(card, user).then(function (user) {
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
      return !!(card && stripeService.isValidCardNumber(card.number) && stripeService.isValidCVC(card.cvc) && stripeService.isValidExpiry(card.month, card.year));
    };

    $scope.subscriptionMessage = function (user) {
      return (user && user.stripe) ? 'Update Subscription' : 'Activate Subscription';
    };

    $scope.subscriptionName = function (user) {
      var value = (user && user.stripe) ? user.stripe.plan : null,
        i = $scope.plans.length;

      if (!value && user.stripe && user.stripe.customer && user.stripe.customer.subscription && user.stripe.customer.subscription.plan) {
        value = user.stripe.customer.subscription.plan.id;
      }

      while (i--) {
        if ($scope.plans[i].value === value) {
          return $scope.plans[i].description;
        }
      }
    };

    $scope.couponCode = function (user) {
      if (user && user.stripe && user.stripe.coupon) {
        return user.stripe.coupon;
      }

      if (user && user.stripe && user.stripe.customer && user.stripe.customer.discount && user.stripe.customer.discount.coupon) {
        return user.stripe.customer.discount.coupon.id;
      }

      return null;
    };


  });
