'use strict';

describe('Directive: qvTable', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    $rootScope.customers = [{
      column1: 'column1 td',
      column2: 'column2 td'
    }];
    $rootScope.customerTableizer = function (customers) {
      var customerTable = {
          columns: [
            {name: "column1 th"},
            {name: "column2 th"}
          ],
          rows: []
        },
        i = customers.length,
        customer;

      while (i--) {
        customer = customers[i];
        customerTable.rows.push({
          data: [
            {'class': "wrap-cell", contents: customer.column1},
            {'class': "ellipse-cell", contents: customer.column2}
          ]
        });
      }
      return $rootScope.customerTable = customerTable;
    };

    element = angular.element('<table class="custom-table-class" qv-table thead-class="custom-thead-class" tbody-class="custom-tbody-class" columns="customerTable.columns" rows="customerTable.rows" tableizer="customerTableizer(customers)"></table>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.hasClass('custom-table-class')).toBe(true);

    expect(element.find('th')[0].innerText).toBe('column1 th');
    expect(element.find('td')[0].innerText).toBe('column1 td');
    expect(element.find('td')[0].classList[0]).toBe('wrap-cell');

    expect(element.find('th')[1].innerText).toBe('column2 th');
    expect(element.find('td')[1].innerText).toBe('column2 td');
    expect(element.find('td')[1].classList[0]).toBe('ellipse-cell');
  }));
});
