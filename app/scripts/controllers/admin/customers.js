'use strict';

angular.module('quiverApp')
  .controller('AdminCustomersCtrl', function ($scope, customers) {
    $scope.customers = customers;

  });
