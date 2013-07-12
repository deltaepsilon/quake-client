'use strict';

angular.module('quiverApp')
  .controller('WriteCtrl', function ($scope, $q, $filter, fileService) {

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



    $scope.wxrTableizer = function (files, repeat) {
      if (!files || !files.length) { // wxrTableizer tends to fail on the first call.
        return $scope.wxrTable = undefined;
      }

      var wxrTable = {
          columns: [
            {name: "Name"},
            {name: "Uploaded"},
            {name: "Size (kb)"},
            {name: "Actions"}
          ],
          rows: []
        },
        i = files.length,
        file;

      while (i--) {
        file = files[i];
        wxrTable.rows.push({
          data: [
            {'class': "wrap-cell", contents: file.filename},
            {'class': "wrap-cell", contents: $filter('date')(file.uploaded)},
            {'class': "wrap-cell", contents: Math.round(file.size * 0.000976562)},
            {'class': "wrap-cell", html: "<button class='btn full-width background-color-hover-2' qv-bind='wxrImport' ng-click='wxrImport(\"" + file.id + "\")'>Import</button><button class='btn full-width background-color-hover-3' qv-bind='wxrDelete' ng-click='wxrDelete(\"" + file.id + "\")'>Delete</button>"}
          ]
        });
      }

      return $scope.wxrTable = wxrTable;

    };

    $scope.wxrImport = function (id) {
      fileService.wxr(id).then(function (socket) {
        socket.on('update', function (e, data) {
          console.log('update', e, data);
        });
        socket.on('complete', function (e, data) {
          console.log('complete', e, data);
        });

      });

    };

    //TODO TESTING ONLY
    $scope.wxrImport('1234ideclareathumbwar');

    $scope.wxrDelete = function (id) {
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
