'use strict';

describe('Directive: fastNg', function () {

  // load the directive's module
  beforeEach(module('serveMeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fast-ng></fast-ng>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fastNg directive');
  }));
});