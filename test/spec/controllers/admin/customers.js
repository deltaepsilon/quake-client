'use strict';
var mockCustomer = qv.mock.stripeCustomer;
describe('Controller: AdminCustomersCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var AdminCustomersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCustomersCtrl = $controller('AdminCustomersCtrl', {
      $scope: scope,
      customers: function () {
        return [mockCustomer];
      }
    });
  }));

  it('should tableize customers correctly.', function () {
    var customerTable = scope.customerTableizer(scope.customers);
    expect(Object.keys(customerTable)).toEqual(["columns", "rows"]);
    expect(Array.isArray(customerTable.columns)).toBe(true);
    expect(Array.isArray(customerTable.rows)).toBe(true);
  });
});
