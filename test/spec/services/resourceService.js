'use strict';

describe('Service: resourceService', function () {
  var scope,
    provide;

  // load the service's module
  beforeEach(module('quiverApp', function ($provide) {
    provide = $provide;
  }));

  // instantiate service
  var resourceService;
  beforeEach(inject(function (_resourceService_, $resource, $q, $rootScope) {
    resourceService = _resourceService_;
    scope = $rootScope.$new();
    provide.value('$rootScope', scope); // Does not appear to work
    provide.value('$resource', $resource); // Does not appear to work
  }));

  it('should get a resource', inject(function ($httpBackend) {
    $httpBackend.when('GET', '/user').respond({user: 'chris', token: '123', quakeRoot: '/quake', stripePK: '456', filepickerPK: '789'});
    var resource = resourceService.getResource('/test/me', {save: {method: 'PUT'}});
    resourceService.scope.$apply();
    $httpBackend.flush();

    expect(resourceService.scope.user).toBe('chris');
    expect(resourceService.scope.quake.root).toBe('/quake');
  }));

});
