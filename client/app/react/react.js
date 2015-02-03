'use strict';

angular.module('serveMeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('react', {
        url: '/react',
        templateUrl: 'app/react/react.html',
        controller: 'ReactCtrl'
      });
  });