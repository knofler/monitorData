// 'use strict';

angular.module('serveMeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $anchorScroll) {
    
  // @@@@@@@@@@@@@@@@@@@ DATA SOURCES and Models @@@@@@@@@@@@@@@@@@@@@@@
    $scope.awesomeThings = [];
    $scope.dataRepo = '';


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

   $scope.formData = {} ;

   $scope.lastItem_id = '';

   $http.get('api/datas/').success(function(getData){
      $scope.dataRepo = getData;
      socket.syncUpdates('data',$scope.dataRepo);
    }); 

    $scope.setTotalItems = function(){
      $scope.totalItems = $scope.dataRepo.length;
    };

    $scope.addData    = function() {
      if($scope.formData === '') {
        return;
      }
      $http.post('/api/datas', { 
        itemName : $scope.formData.itemName, 
        timePlot1: new Date(), 
        timePlot2: new Date(), 
        timePlot3: new Date(), 
        timePlot4: new Date(), 
        timePlot5: new Date(), 
        func1: $scope.formData.func1,
        result1: $scope.formData.result1,
        func2: $scope.formData.func2,
        result2: $scope.formData.result2,
        func3: $scope.formData.func3,
        result3: $scope.formData.result3,
        func4: $scope.formData.func4,
        result4: $scope.formData.result4,
        testerName: $scope.formData.testerName,
        devicename:$scope.formData.devicename,
        deviceSpec:$scope.formData.deviceSpec,
        loginUsed: $scope.formData.loginUsed,
        logged_date:new Date() 
      });
      $scope.formData = '';
      };

  // scroll to feature included for SPA App
    $scope.scrollTo    = function(id) {
      $location.hash(id);
      $anchorScroll();
     };

  $scope.isLaunch = false;    
  $scope.isReady  = true;
  $scope.isWindow = true;

  // TRACE LOG Functions   
  $scope.traceLaunch = function (itemName){  
    var launchCount =0;
      $http.get('/api/tracelogs/items/').success(function(getLastEntry){
          // console.log(getLastEntry.launchCount)
          launchCount = getLastEntry.launchCount;
          if(launchCount == undefined){
            launchCount = 0;
          }
        });

    // add entry to db
    setTimeout(function(){
     $http.post("/api/tracelogs/",{
       itemName : itemName,
       launchCount : launchCount+1,
       launchTime  : new Date()
      }).success(function(response){
        // console.log("response",response._id);
        $scope.lastItem_id = response._id;
      });
     // console.log("launch data recorded " + launchCount);
    },300);
    $scope.isLaunch  = true;
    $scope.isWindow  = false;
    $("#clickStatus").show();
   };
  $scope.traceWindow = function (itemName){  
    // console.log("now last id is : " , $scope.lastItem_id);
    var targetId =  $scope.lastItem_id ;
    // update window open time for tagetId to db
     $http.put("/api/tracelogs/"+targetId,{
       midTime: new Date() 
      }).success(function(response){
        console.log("Ready response is available : " , response );
        console.log("emit dataUpdate event now");
        socket.socket.emit('dataBUpdate',{data:"hello"});
      });
    $scope.isWindow  = true;
    $scope.isReady  = false;
   }; 
  $scope.traceReady  = function (itemName){  
    // console.log("now last id is : " , $scope.lastItem_id);
    var targetId =  $scope.lastItem_id ;
    // update window open time for tagetId to db
     $http.put("/api/tracelogs/"+targetId,{
       endTime: new Date() 
      }).success(function(response){
        console.log("Ready response is available : " , response );
        console.log("emit dataAUpdate event now");
        socket.socket.emit('dataAUpdate',{data:"hello"});
      });

    $scope.isReady  = true;
    $scope.isLaunch  = false;
    $("#clickStatus").delay(2500).fadeOut("slow");
   };  

  // ########## Event Controls with socketio #########
  $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      });
  
  });

  

