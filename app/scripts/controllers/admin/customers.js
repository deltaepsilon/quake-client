'use strict';

angular.module('quiverApp')
  .controller('AdminCustomersCtrl', function ($scope, $filter, customers) {
    $scope.customers = customers;

    $scope.customerTableizer = function (customers) {
      var customerTable = {
          columns: [
            {name: "Created"},
            {name: "Description"},
            {name: "Active Card"},
            {name: "Plan"},
            {name: "Status"},
            {name: "Coupon"},
          ],
          rows: []
        },
        i = customers.length,
        customer;

      while (i--) {
        customer = customers[i];
        customerTable.rows.push({
          data: [
            {'class': "wrap-cell", contents: $filter('date')(customer.created * 1000)},
            {'class': "ellipse-cell", contents: customer.description},
            {'class': "wrap-cell", contents: customer.active_card ? customer.active_card.type : null},
            {'class': "wrap-cell", contents: customer.subscription && customer.subscription.plan ? customer.subscription.plan.name : null},
            {'class': "wrap-cell", contents: customer.subscription ? customer.subscription.status : null},
            {'class': "ellipse-cell", contents: customer.discount && customer.discount.coupon ? customer.discount.coupon.id + " " + (customer.discount.coupon.amount_off ? "$" + customer.discount.coupon.amount_off : customer.discount.coupon.percent_off + "%"): null}
          ]
        });
      }
      return $scope.customerTable = customerTable;
    };

  });
