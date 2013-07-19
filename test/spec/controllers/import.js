'use strict';

describe('Controller: ImportCtrl', function () {

  // load the controller's module
  beforeEach(module('quiverApp'));

  var ImportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    var generic = function () {
      var deferred = $q.defer();
      scope.wxrTable = {table: true};
      deferred.resolve(arguments);
      return deferred.promise;
    };

    scope = $rootScope.$new();
    $rootScope.success = function (message) {
      $rootScope.message = message;
    };

    ImportCtrl = $controller('ImportCtrl', {
      $scope: scope,
      fileService: {
        get: generic,
        create: generic,
        destroy: generic,
        wxr: generic
      }
    });
  }));

  it('should CREATE a WXR', function () {
    scope.wxrCreate({value: '123456'});
    expect(scope.wxrFiles).toEqual({ 0 : { classification : 'wxr' } });

  });

  it('should DELETE a WXR', function () {
    scope.wxrDelete({value: '123456'});
    expect(scope.wxrTable).toEqual({table: true});
  });

  it('should IMPORT a WXR', function () {
    scope.wxrImport(1);
    expect(scope.wxrProgress).toEqual({ percent : 5, message : 'Importing', id : 1, template : 'percent' });
  });

  it('should have a tableizer', function () {
    scope.wxrFiles = [{classification: "wxr",
      createdAt: "2013-07-19T16:19:22.122Z",
      filename: "mockWXR.xml",
      id: "51e9670a46d69c0000000003",
      location: "S3",
      mimetype: "text/xml",
      path: "{{user.id}}/wxr/W5x6uYdATgO5vmEMuCnY_mockWXR.xml",
      size: 186302,
      updatedAt: "2013-07-19T16:19:22.122Z",
      uploaded: 1374250660436,
      url: "https://www.filepicker.io/api/file/fbjQOYJdTgKePqcjquRD",
      userID: "51e80d71c07dc5b8c5000003",
      writeable: true}];

    scope.wxrTableizer();
    expect(Object.keys(scope.wxrTable)).toEqual(['theadClass', 'tbodyClass', 'columns', 'rows']);
  });
});
