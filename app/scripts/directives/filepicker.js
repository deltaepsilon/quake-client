'use strict';

angular.module('quiverApp')
  .directive('filepicker', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.filepicker = {};
        $timeout(function () {
          if (!element.find('div').length) {
            filepicker.constructWidget(element.find('input')[0]);
            console.log('consturcting widget', filepicker);
          }

          scope.filepicker.live = true;
        }, 500);

      },
      controller: function ($scope, fileService) {

        filepicker.setKey($scope.filepicker.key);

        $scope.processWXR = function (path) {
          console.log('path', path);
        };

        $scope.setWXR = function (element) {

          fileService.addWXRUploads(element.value).then(function (user) {
            $scope.user = user;
            console.log('user result from addWXRUploads', $scope.user);
            $scope.$apply();
          });

        }
      }
    };
  });
