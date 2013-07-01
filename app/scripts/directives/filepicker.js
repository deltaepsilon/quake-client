'use strict';

angular.module('quiverApp')
  .directive('filepicker', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      },
      controller: function ($scope, userService) {
        filepicker.setKey($scope.filepicker.key);

        $scope.processWXR = function (path) {
          console.log('path', path);
        };

        $scope.setWXR = function (element) {
          if (!$scope.user.files) {
            $scope.user.files = {};
          }

          $scope.user.files.wxr = element.value;


          $scope.user = userService.saveUser($scope.user);
          $scope.$apply();
        }
      }
    };
  });
