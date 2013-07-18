'use strict';

angular.module('quiverApp')
  .controller('WriteCtrl', function ($scope, $rootScope, $q, $filter, fileService, $timeout, _) {

    var getWXR = function () {
        var deferred = $q.defer();

        fileService.get({classification: 'wxr'}).then(deferred.resolve, deferred.reject);
        return deferred.promise;
      },
      refreshWXR = function () {
        var deferred = $q.defer();
        getWXR().then(function (files) {
          $scope.wxrFiles = files;
           deferred.resolve($scope.wxrFiles);
        });
        return deferred.promise;
      };

    refreshWXR().then(function (files) {
      $scope.$watch('wxrFiles', function () { // Start watching after the initial set
        $scope.wxrTableizer($scope.wxrFiles);
      });
    });



    $scope.wxrTable = {};
    $scope.wxrTableizer = function (repeat) {
      var files = $scope.wxrFiles,
        wxrTable,
        i,
        file;

      if (!files || !files.length) { // wxrTableizer tends to fail on the first call.
        return $scope.wxrTable = undefined;
      }

      wxrTable = {
          theadClass: "light-text background-color-4",
          tbodyClass: "",
          columns: [
            {name: "Name"},
            {name: "Uploaded"},
            {name: "Size (kb)"},
            {name: "Actions"}
          ],
          rows: []
        };
      i = files.length;

      while (i--) {
        file = files[i];
        wxrTable.rows.push({
          data: [
            {'class': "wrap-cell", contents: file.filename},
            {'class': "wrap-cell", contents: $filter('date')(file.uploaded)},
            {'class': "wrap-cell", contents: Math.round(file.size * 0.000976562)},
            {'class': "wrap-cell", html: "<div id='" + file.id + "' class='full-height'><button class='btn full-width background-color-hover-2' ng-disabled='wxrProgress.percent' ng-click='wxrImport(\"" + file.id + "\")'>Import</button><button class='btn full-width background-color-hover-3' qv-disable ng-disabled='wxrProgress.percent'  ng-click='wxrDelete(\"" + file.id + "\")'>Delete</button></div>"}
          ]
        });
      }

      return $scope.wxrTable = wxrTable;

    };

    var defaultWXRProgress = {percent: 0, message: 'Importing', id: false, template: 'percent'};
    $scope.wxrProgress = _.clone(defaultWXRProgress);
    $scope.wxrImport = function (id) {
      var timer,
        broadcast = function () {
          if (timer) {
            $timeout.cancel(timer);
            timer = undefined;
          }
          $scope.$broadcast('progress', $scope.wxrProgress);
        };

      $scope.wxrProgress.id = id;
      $scope.wxrProgress.percent = 1;
      $scope.$broadcast('progressInit', $scope.wxrProgress);
      timer = $timeout(function () {
        $scope.wxrProgress.percent += 3;
        broadcast();
      }, 2000);



      fileService.wxr(id).then(function (socket) {
        socket.on('wxr', function (message) {
          if (message.percent) {
            $scope.wxrProgress.percent = message.percent;
            $scope.wxrProgress.message = message.message;
            broadcast();
          } else if (message.complete) {
            $scope.wxrProgress = _.clone(defaultWXRProgress);
            socket.disconnect();
            if (message.wxr) {
              $scope.wxrFiles = message.wxr;
              $rootScope.success('Yes! Your posts, metadata and images have been uploaded.');
              $scope.$apply();

            }
          }

        });

      });

    };

    $scope.wxrDelete = function (id) {
      $rootScope.success("We're deleting your WXR file...");
      fileService.destroy(id).then(function () {
        refreshWXR();
      });

    };
    $scope.createWXR = function (element) {
      fileService.create('wxr', element.value).then(function () {
        refreshWXR();
      });
      $scope.$apply();

    };
  });
