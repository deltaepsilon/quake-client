'use strict';

angular.module('quiverApp')
  .directive('notification', function ($timeout, $compile) {
    return {
//      template: '<h4 class="notification" ng-class="notificationClass" ng-show="showNotification">{{message}}</h4>',
      template: '<ul id="quiver-notifications" ng-show="showNotifications"><li ng-repeat="notification in notifications" class="{{notification.class}}">{{notification.message}}</li></ul>',
      restrict: 'A',
      replace: true,
      link: function postLink(scope, element, attrs) {

        scope.hideNotifications = function () {
          scope.notifications = [];
          scope.showNotifications = false;
        };


        scope.$on('show notification', function (e, notification, notificationClass) {
          scope.notifications.push({class: notificationClass, message: notification});
          scope.showNotifications = true;

          $timeout(function () {
            scope.notifications.shift();
          }, 5000);
        });

        scope.$on('hide notification', scope.hideNotifications);

      },
      controller: function () {

      }
    };
  });
