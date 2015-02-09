'use strict';

angular.module('serveMeApp')
  .controller('DataCtrl',['$scope','dataSrv','$http','socket', function ($scope,dataSrv,$http,socket) {

  	$scope.prepare_Redditdata = function (payload){
		var data = payload.data.children;
		  data.forEach(function(d){
			  d.data.created *=1000;
		     });
		return data;
	 };
	$scope.addredditColumn    = function (rowsEnter){
  		rowsEnter.append("td")
			 .text(function(d){return d.data.score });
			// Column-2
			rowsEnter.append("td") 
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .append("img")
			 .attr({
			   src: function(d){return d.data.thumbnail }
			  });
			// Column-3
			rowsEnter.append("td")
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .text(function(d){return d.data.title });
			// Column-4
			rowsEnter.append("td")
			 .text(function(d){return d.data.ups });
			// Column-5
			rowsEnter.append("td")
			.text(function(d){return d.data.downs });	
  	 };
  	 
	// $scope.prepare_thingsdata = function (payload){
	// 	var data = payload
	// 	return data;
	//  };
 //    $scope.addThingsColumn    = function (rowsEnter){
 //    	rowsEnter.append("td")
	// 		 .text(function(d){return d.name });
	// 		// Column-2
	// 		rowsEnter.append("td")
	// 		.text(function(d){return d.info });	
 //     };

    $scope.prepare_scatterdata = function (payload){
		var data = payload.data.children;
		data.forEach(function(d){
			d.data.created *= 1000;
		})
		// console.log(data);

		return data;
	 };

	$scope.prepare_tracedata = function (payload){
		// console.log(payload);
		var data = payload
		data.forEach(function(d){
			d.launchCount *= 100;
			// console.log("d",d);
		})
		// console.log(data);

		return data;
	 };  


    //call table service 
    // setTimeout(function(){
    //    dataSrv.tableDisplay("assets/dataDir/data.json","JSON",".col-md-12",$scope.prepare_Redditdata,$scope.addredditColumn);
    // },4200);
   
    // dataSrv.tableDisplay("/api/things/","JSON",".col-md-12",$scope.prepare_thingsdata,$scope.addThingsColumn);  

    //call scatterplot service
    // setTimeout(function(){
 	  // dataSrv.scatterPlotDisplay("assets/dataDir/data.json","JSON","#svg3",$scope.prepare_scatterdata); 
    // },4200);


     setTimeout(function(){
	  dataSrv.scatterPlotDisplay('/api/tracelogs/',"JSON","#svg1",$scope.prepare_tracedata); 
	 },2000);	

	 socket.socket.on('changeGraphA',function(data){
	 	console.log("data recieved on update model ", data.sockMsg.data);
	 	dataSrv.updateGraphA('/api/tracelogs/',"JSON","#svg3",$scope.prepare_tracedata);
	 });
	 socket.socket.on('changeGraphB',function(data){
	 	console.log("data recieved on update model ", data.sockMsg.data);
	 	dataSrv.updateGraphB('/api/tracelogs/',"JSON","#svg3",$scope.prepare_tracedata);
	 })

  //    socket.on('data', function(streamData) {
  // 		setTimeout(function(){
 	//   	dataSrv.scatterPlotDisplay('/api/tracelogs/',"JSON","#svg3",$scope.prepare_tracedata); 
  //   	},200);	
	 // });
   
    //call Brush service
    // setTimeout(function(){
    //    dataSrv.brushDisplay("assets/dataDir/data.json","JSON","#svg4",$scope.prepare_scatterdata); 
    // },4200);
 	
  	
  }]);
