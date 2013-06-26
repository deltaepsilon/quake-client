'use strict';

angular.module('quiverApp')
  .directive('notification', function ($timeout) {
    return {
      template: '<ul id="quiver-notifications" class="listing light-text" ng-show="showNotifications"><li ng-repeat="notification in notifications" class="{{notification.class}}">{{notification.message}}</li></ul>',
      restrict: 'A',
      replace: true,
      link: function postLink(scope) {
        if (!scope.notifications) {
          scope.notifications = [];
        }

        scope.hideNotifications = function () {
          scope.notifications = [];
          scope.showNotifications = false;
        };


        scope.$on('show notification', function (e, notification, notificationClass) {
          scope.notifications.push({class: notificationClass, message: notification});
          scope.showNotifications = true;

          $timeout(function () {
            scope.notifications.shift();
          }, 3000);
        });

        scope.$on('hide notification', scope.hideNotifications);

      }
    };
  });
