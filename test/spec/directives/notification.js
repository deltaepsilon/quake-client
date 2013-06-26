'use strict';

describe('Directive: notification', function () {
  beforeEach(module('quiverApp'));

  var element;

  it('should print notifications', inject(function ($rootScope, $compile) {
    element = angular.element('<div notification ng-click="hideNotifications()"></div>');
    element = $compile(element)($rootScope);

    $rootScope.$emit('show notification', '1', 'error');
    $rootScope.$emit('show notification', '2', 'success');
    expect($rootScope.notifications).toEqual([{'class': 'error', 'message': '1'}, {'class': 'success', 'message': '2'}]);
    expect($rootScope.showNotifications).toBe(true);

    $rootScope.$emit('hide notification');
    expect($rootScope.notifications).toEqual([]);
    expect($rootScope.showNotifications).toBe(false);
  }));
});
