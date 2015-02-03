'use strict';

angular.module('serveMeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('data', {
        url: '/data',
        templateUrl: 'app/data/data.html',
        controller: 'DataCtrl'
      });
  });