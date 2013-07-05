'use strict';

describe('Service: resourceService', function () {

  // load the service's module
  beforeEach(module('testApp'));

  // instantiate service
  var resourceService;
  beforeEach(inject(function (_resourceService_) {
    resourceService = _resourceService_;
  }));

  it('should do something', function () {
    expect(!!resourceService).toBe(true);
  });

});
