'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var SettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    //Seed scope with a user
    scope.user = {
      stripe: {
        customer: {
          active_card: {
            type: 'MasterCard',
            last4: '1234',
            exp_month: '1',
            exp_year: '2013',
            cvc: 'bad data'
          }
        }
      }
    };

    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope,
      userService: {saveUser: function (user) {
        return user;
      }},
      stripeService: {
        saveSubscription: function (user) {
          return user;
        },
        saveCard: function (card, user) {
          user = {stripe: {customer: {card: card}}};
          return {then: function (callback) {
            callback(user);
          }};
        },
        isValidCardNumber: function (number) {return number;},
        isValidCVC: function (number) { return number;},
        isValidExpiry: function () { return true;},
        isValidCard: function (number) { return number;}
      }
    });
  }));

  it('should have ten years', function () {
    expect(scope.years.length).toBe(10);
  });

  it('should have twelve months', function () {
    expect(scope.months.length).toBe(12);
  });

  it('should have three plans', function () {
    expect(scope.plans.length).toBe(3);
  });

  it('should have a January month on the card and any year', function () {
    var today = new Date();
    expect(scope.card.month).toBe('1');
    expect(scope.card.year).toBe((today.getFullYear()).toString());
  });

  it('should have a seeded card object', function () {
    expect(scope.card.number).toBe('MasterCard ************1234');
    expect(scope.card.month).toBe('1');
    expect(scope.card.year).toBe('2013');
    expect(scope.card.cvc).toBe(null);
  });

  it('should have a seeded plan', function () {
    expect(scope.user.stripe.plan).toBe('quiver0');
  });

  it('should save user', function () {
    expect(scope.saveUser({name: 'chris'})).toEqual({name: 'chris'});
  });

  it('should save saveStripe', function () {
    expect(scope.saveStripe({stripe: {customer: {}}})).toEqual({stripe: {customer: {}}});
  });

  it('should save subscription', function () {
    expect(scope.saveSubscription({user: 'chris'})).toEqual({user: 'chris'});
  });

  it('should save card', function () {
    var card = {type: 'MasterCard', last4: '1234', exp_month: '1', exp_year: '2013', cvc: 'junk'};
    scope.saveCard(card, {});
    expect(scope.card).toEqual({number: card.type + ' ************' + card.last4, month: card.exp_month, year: card.exp_year, cvc: null});
  });

  it('should evaluate card attributes', function () {
    var card = {number: true, type: true, last4: true, exp_month: true, exp_year: true, cvc: true};
    expect(scope.isValidCardNumber(1)).toBe(1);
    expect(scope.isValidCVC(1)).toBe(1);
    expect(scope.isValidCard(card)).toBe(true);
  });

  it('should maintain valid subscription messages', function () {
    expect(scope.subscriptionMessage()).toBe('Activate Subscription');
    expect(scope.subscriptionMessage({stripe: {}})).toBe('Update Subscription');
  });

  it('should return valid subscription names', function () {
    var user = {stripe: {customer: {subscription: {plan: {id: 'quiver0'}}}}};
    expect(scope.subscriptionName(user)).toBe('Quiver Preview $0/Month');
  });

  it('should return valid coupon codes', function () {
    var user = {stripe: {coupon: 'code', customer: {discount: {coupon: {id: 'code2'}}}}};
    expect(scope.couponCode(user)).toBe('code');

    user.stripe.coupon = undefined;
    expect(scope.couponCode(user)).toBe('code2');
  });
});
