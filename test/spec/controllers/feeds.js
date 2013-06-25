'use strict';

describe('Controller: FeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var FeedsCtrl,
    scope,
    userNoPublic = {stripe: {secretKey: 'fakekey', publicKey: null}},
    userNoSecret = {stripe: {secretKey: null, publicKey: 'fakekey'}},
    userStriped = {stripe: {secretKey: 'fakekey', publicKey: 'fakekey'}},
    userNotSubscribed = {stripe: {customer: null}},
    userSubscribed = {stripe: {customer: {subscription: {plan: {id: '12345'}}}}};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedsCtrl = $controller('FeedsCtrl', {
      $scope: scope
    });
  }));

  it('should not be striped if either stripe.secretKey or stripe.publicKey are missing', function () {
    expect(scope.isStriped(userNoPublic)).toBe(false);
    expect(scope.isStriped(userNoSecret)).toBe(false);
  });

  it('should be striped if stripe.secretKey and stripe.publicKey are present', function () {
    expect(scope.isStriped(userStriped)).toBe(true);
  });

  it('should not be subscribed', function () {
    expect(scope.isSubscribed(userNotSubscribed)).toBe(false);
  });

  it('should be subscribed', function () {
    expect(scope.isSubscribed(userSubscribed)).toBe(true);
  });
});
