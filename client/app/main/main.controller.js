// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
    $scope.awesomeThings = [];

  // ########## API CALLS and Promises #################
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
      });
    
    // Functions interating with api calls and rendering pages
    $scope.addThing    = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
      };
    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
     };


  // scroll to feature included for SPA App
    $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
     };

  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  

