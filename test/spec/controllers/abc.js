'use strict';

describe('Controller: AbcCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var AbcCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AbcCtrl = $controller('AbcCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
