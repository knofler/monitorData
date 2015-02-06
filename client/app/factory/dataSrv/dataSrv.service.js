'use strict';

angular.module('serveMeApp')
  .service('dataSrv',['$rootScope', function ($rootScope) {

if (!d3.chart) d3.chart = {};

d3.chart.scatterLabel = function (){
  var g ;
  var dispatch   = d3.dispatch(chart,"hover");

  //reusable chart pattern
  function chart (container){
      //initialization code
      g = container;
      update();
      };
  function update(){  
    // ************************************* Label **************************************
    var circleData = [
       { "cx": 100, "cy": 30, "radius": 8, "color" : "green" ,"msg" : "Elapsed time"},
        { "cx": 100, "cy": 60, "radius": 8, "color" : "blue"  ,"msg" : "Mid time"}];

    var circlesLabel = g.selectAll("circle")
      .data(circleData)
      .enter()
      .append("circle");

    //Add the circle attributes
    var circleAttributes = circlesLabel
     .attr("cx", function (d) { return d.cx; })
     .attr("cy", function (d) { return d.cy; })
     .attr("r", function (d) { return d.radius; })
     .style("fill", function (d) { return d.color; });   

     //Add the SVG Text Element to the svgContainer
    var text = g.selectAll("texts")
        .data(circleData)
        .enter()
        .append("text");

        //Add SVG Text Element Attributes
    var textLabels = text
        .attr("x", function(d) { return d.cx+14; })
        .attr("y", function(d) { return d.cy+6; })
        .text( function (d) { return " - " + d.msg })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "#444");     
    };
  return d3.rebind(chart,dispatch,"on");
 }; 
d3.chart.scatterAplot = function (){
    var g,data;
    var width = 500, height = 200;
    var cx = 0,cy=0;

    var dispatch   = d3.dispatch(chart,"hover");
    //reusable chart pattern
    function chart (container){
      //initialization code
      g = container;
      g.append("g").classed("xaxis",true);
      g.append("g").classed("yaxis",true);
      update();
      };
    
    chart.update = update;
  
    function update(){  
      var maxCreated = d3.max(data,function(d){
         var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minCreated = d3.min(data,function(d){
        var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minScore  = d3.min(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });  
      var maxScore  = d3.max(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });
      // var minScore = 0, maxScore = 1000;

      var createScaleA = d3.time.scale()
        .domain([minCreated,maxCreated])
        .range([cx,width]);

      var colorScale = d3.scale.linear()
        .domain([minCreated,maxCreated])
        .range(["#D5E9E5","#12882A"])
        .interpolate(d3.interpolateHcl)

      var yScale  = d3.scale.linear()
      .domain([0,maxScore+50])
      .range([height,cy]);

      var xAxis = d3.svg.axis()
        .scale(createScaleA)
        .ticks(4)
        .tickFormat(d3.time.format("%H:%M"));
        // .tickFormat(d3.time.format("%x,%H:%M"));

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient("left");

      var xg = g.select(".xaxis")
            .classed("axis",true)
          .attr("transform","translate(" + [0,height] + ")")
          .transition()
          .call(xAxis);

      var yg = g.select(".yaxis")
          .classed("axis",true)
          .classed("yAxis",true)
          .attr("transform","translate(" + [cx - 5.0] + ")")
          .transition()
          .call(yAxis);

      var xScale = d3.time.scale()
        .domain(d3.extent(data,function(d){return d.launchCount}))
        .range([101,width]);

      g.attr("transform","translate(101,15)");

      var circlesA = g.selectAll("circle")
      .data(data);



    
      // ***************************************** A ************************************

      circlesA.enter()
      .append("circle");  

      circlesA.transition()
      .attr({
        cx:function(d,i){
          // console.log("d.launchCount" , d.launchCount); 
          return xScale(d.launchCount)},
        cy:function(d,i){
          var end = new Date (d.endTime);
          var start = new Date (d.launchTime);
          var endSec = end.getTime()/1000;
          var launchSec = start.getTime()/1000;
          // console.log("score is : ", endSec - launchSec) ;
          var elapsedTime = endSec - launchSec;
          return yScale(elapsedTime);
        },
        r:4
      })
      .style("fill","green");

      circlesA.exit().remove();

      circlesA.on("mouseover",function(d){
        d3.select(this).style("fill","orange");
        dispatch.hover([d]);
      });
      circlesA.on("mouseout",function(d){
        d3.select(this).style("fill","green")
        dispatch.hover([]);
      });

   };

    chart.highlight = function(data){
      var circles = g.selectAll("circle")
      .style("stroke","")
      .style("stroke-width",3)

      circles.data(data,function(d){return d.launchCount})
      .style("stroke","green")
      .style("stroke-width",4);

      };
    chart.data      = function(value){
      if(!arguments.length) return data;
      data = value;
      return chart;
     };

    
    // return chart;
      return d3.rebind(chart,dispatch,"on");
   };  
d3.chart.scatterBplot = function (){
    var g,data;
    var width = 500, height = 200;
    var cx = 0,cy=0;

    var dispatch   = d3.dispatch(chart,"hover");
    //reusable chart pattern
    function chart (container){
      //initialization code
      g = container;
      g.append("g").classed("xaxis",true);
      g.append("g").classed("yaxis",true);
      update();
      };
    
    chart.update = update;
  
    function update(){  
      var maxCreated = d3.max(data,function(d){
         var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minCreated = d3.min(data,function(d){
        var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minScore  = d3.min(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });  
      var maxScore  = d3.max(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });
      // var minScore = 0, maxScore = 1000;

      var createScaleA = d3.time.scale()
        .domain([minCreated,maxCreated])
        .range([cx,width]);

      var colorScale = d3.scale.linear()
        .domain([minCreated,maxCreated])
        .range(["#D5E9E5","#12882A"])
        .interpolate(d3.interpolateHcl)

      var yScale  = d3.scale.linear()
      .domain([0,maxScore+50])
      .range([height,cy]);

      var xAxis = d3.svg.axis()
        .scale(createScaleA)
        .ticks(4)
        .tickFormat(d3.time.format("%H:%M"));
        // .tickFormat(d3.time.format("%x,%H:%M"));

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient("left");

      var xg = g.select(".xaxis")
            .classed("axis",true)
          .attr("transform","translate(" + [0,height] + ")")
          .transition()
          .call(xAxis);

      var yg = g.select(".yaxis")
          .classed("axis",true)
          .classed("yAxis",true)
          .attr("transform","translate(" + [cx - 5.0] + ")")
          .transition()
          .call(yAxis);

      var xScale = d3.time.scale()
        .domain(d3.extent(data,function(d){return d.launchCount}))
        .range([102,width]);

      g.attr("transform","translate(101,150)");

      var circlesB = g.selectAll("circle")
      .data(data);

       //   // ******************************************* B **********************************************
    
    circlesB.enter()
      .append("circle");  

      circlesB.transition()
      .attr({
        cx:function(d,i){
          // console.log("d.launchCount" , d.launchCount); 
          return xScale(d.launchCount)},
        cy:function(d,i){
          var mid = new Date (d.midTime);
          var start = new Date (d.launchTime);
          var midSec = mid.getTime()/1000;
          var launchSec = start.getTime()/1000;
          // console.log("score is : ", endSec - launchSec) ;
          var elapsedTime = midSec - launchSec;
          console.log("elapsedTime is : ", elapsedTime);
          return yScale(elapsedTime);
        },
        r:4
      })
      .style("fill","blue");

      circlesB.exit().remove();

      circlesB.on("mouseover",function(d){
        d3.select(this).style("fill","red");
        dispatch.hover([d]);
      });
      circlesB.on("mouseout",function(d){
        d3.select(this).style("fill","blue")
        dispatch.hover([]);
      });
   
   };

    chart.highlight = function(data){
      var circles = g.selectAll("circle")
      .style("stroke","")
      .style("stroke-width",3)

      circles.data(data,function(d){return d.launchCount})
      .style("stroke","green")
      .style("stroke-width",4);

      };
    chart.data      = function(value){
      if(!arguments.length) return data;
      data = value;
      return chart;
     };

    
    // return chart;
      return d3.rebind(chart,dispatch,"on");
   };     
d3.chart.scatter      = function (){
    var g,data;
    var width = 500, height = 200;
    var cx = 0,cy=0;

    var dispatch   = d3.dispatch(chart,"hover");
    //reusable chart pattern
    function chart (container){
      //initialization code
      g = container;
      g.append("g").classed("xaxis",true);
      g.append("g").classed("yaxis",true);
      update();
      };
    
    chart.update = update;
  
    function update(){  
      var maxCreated = d3.max(data,function(d){
         var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minCreated = d3.min(data,function(d){
        var launchTime = new Date(d.launchTime);
        return launchTime;
      });
      var minScore  = d3.min(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });  
      var maxScore  = d3.max(data,function(d){
        var end = new Date (d.endTime);
        var start = new Date (d.launchTime);
        var endSec = end.getTime()/1000;
        var launchSec = start.getTime()/1000;
        // console.log("score is : ", endSec - launchSec) ;
        return endSec - launchSec;
      });
      // var minScore = 0, maxScore = 1000;

      var createScaleA = d3.time.scale()
        .domain([minCreated,maxCreated])
        .range([cx,width]);

      var colorScale = d3.scale.linear()
        .domain([minCreated,maxCreated])
        .range(["#D5E9E5","#12882A"])
        .interpolate(d3.interpolateHcl)

      var yScale  = d3.scale.linear()
      .domain([0,maxScore+50])
      .range([height,cy]);

      var xAxis = d3.svg.axis()
        .scale(createScaleA)
        .ticks(4)
        .tickFormat(d3.time.format("%H:%M"));
        // .tickFormat(d3.time.format("%x,%H:%M"));

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient("left");

      var xg = g.select(".xaxis")
            .classed("axis",true)
          .attr("transform","translate(" + [0,height] + ")")
          .transition()
          .call(xAxis);

      var yg = g.select(".yaxis")
          .classed("axis",true)
          .classed("yAxis",true)
          .attr("transform","translate(" + [cx - 5.0] + ")")
          .transition()
          .call(yAxis);

      var xScale = d3.time.scale()
        .domain(d3.extent(data,function(d){return d.launchCount}))
        .range([0,width]);

      g.attr("transform","translate(101,15)");

      var circlesA = g.selectAll("circle")
      .data(data);

      var circlesB = g.selectAll("circle")
      .data(data);  

      // ***************************************** A ************************************

      circlesA.enter()
      .append("circle");  

      circlesA.transition()
      .attr({
        cx:function(d,i){
          // console.log("d.launchCount" , d.launchCount); 
          return xScale(d.launchCount)},
        cy:function(d,i){
          var end = new Date (d.endTime);
          var start = new Date (d.launchTime);
          var endSec = end.getTime()/1000;
          var launchSec = start.getTime()/1000;
          // console.log("score is : ", endSec - launchSec) ;
          var elapsedTime = endSec - launchSec;
          return yScale(elapsedTime);
        },
        r:4
      })
      .style("fill","green");

      circlesA.exit().remove();

      circlesA.on("mouseover",function(d){
        d3.select(this).style("fill","orange");
        dispatch.hover([d]);
      });
      circlesA.on("mouseout",function(d){
        d3.select(this).style("fill","green")
        dispatch.hover([]);
      });


    //   // ******************************************* B **********************************************
    
    circlesB.enter()
      .append("circle");  

      circlesB.transition()
      .attr({
        cx:function(d,i){
          // console.log("d.launchCount" , d.launchCount); 
          return xScale(d.launchCount)},
        cy:function(d,i){
          var mid = new Date (d.midTime);
          var start = new Date (d.launchTime);
          var midSec = mid.getTime()/1000;
          var launchSec = start.getTime()/1000;
          // console.log("score is : ", endSec - launchSec) ;
          var elapsedTime = midSec - launchSec;
          return yScale(elapsedTime);
        },
        r:4
      })
      .style("fill","blue");

      circlesB.exit().remove();

      circlesB.on("mouseover",function(d){
        d3.select(this).style("fill","pink");
        dispatch.hover([d]);
      });
      circlesB.on("mouseout",function(d){
        d3.select(this).style("fill","blue")
        dispatch.hover([]);
      });
   };

    chart.highlight = function(data){
      var circles = g.selectAll("circle")
      .style("stroke","")
      .style("stroke-width",3)

      circles.data(data,function(d){return d.launchCount})
      .style("stroke","green")
      .style("stroke-width",4);

      };
    chart.data      = function(value){
      if(!arguments.length) return data;
      data = value;
      return chart;
     };
    chart.width     = function(value){
      if(!arguments.length) return width;
      width = value;
      return chart;
     };
    chart.height    = function(value){
      if(!arguments.length) return height;
      height = value;
      return chart;
     };
     //return chart function as the condition of reusable chart pattern
    
    // return chart;
      return d3.rebind(chart,dispatch,"on");
   };  


$rootScope.scatterPlotDisplay = function (url,dataType,targetDiv,prepareData){
   var data = ''; 

   if(dataType == "JSON"){
     d3.json(url,function(err,payload){
      // capture data in a avariable    
      data = prepareData(payload);
      // console.log("data coming ", data)
     });
    } else if (dataType == "CSV"){

      
     }   
     setTimeout(function(){
     var svg = d3.select(targetDiv)
     //scatter plot
     $rootScope.sgroupLabel   = svg.append("g");
     $rootScope.sgroupDisplay = d3.select('#svg3').append("g");
     $rootScope.scatterLabel = d3.chart.scatterLabel();
     $rootScope.scatter      = d3.chart.scatter();
     // console.log("check data ", data);
     $rootScope.scatter.data(data);
     $rootScope.scatterLabel($rootScope.sgroupLabel); 
     $rootScope.scatter($rootScope.sgroupDisplay); 
     // arbitary highlight ten scatter plot
     // $rootScope.scatter.highlight(data.slice(0,10));
     $rootScope.scatter.on("hover",function(hovered){
        // console.log(hovered)
        $rootScope.table.highlight(hovered);
      });   
    },200)
    };
$rootScope.updateGraphA = function(url,dataType,targetDiv,prepareData){
 var data = ''; 

 if(dataType == "JSON"){
   d3.json(url,function(err,payload){
    // capture data in a avariable    
    data = prepareData(payload);
    // console.log("data coming ", data)
   });
  } else if (dataType == "CSV"){

    
   }   
   setTimeout(function(){
   var svgA = d3.select(targetDiv)
   //scatter plot
   // $rootScope.sgroupA  = svg.append("g");
   $rootScope.scatterA = d3.chart.scatterAplot();
   // console.log("check data ", data);
   $rootScope.scatterA.data(data);
   $rootScope.scatterA(svgA); 
   // arbitary highlight ten scatter plot
   // $rootScope.scatter.highlight(data.slice(0,10));
   $rootScope.scatterA.on("hover",function(hovered){
      // console.log(hovered)
   
    });   
  },200)
  }; 
$rootScope.updateGraphB = function(url,dataType,targetDiv,prepareData){
 var data = ''; 

 if(dataType == "JSON"){
   d3.json(url,function(err,payload){
    // capture data in a avariable    
    data = prepareData(payload);
    // console.log("data coming ", data)
   });
  } else if (dataType == "CSV"){

    
   }   
   setTimeout(function(){
   var svgB = d3.select(targetDiv)
   //scatter plot
   // $rootScope.sgroupB  = svg.append("g");
   $rootScope.scatterB = d3.chart.scatterBplot();
   // console.log("check data ", data);
   $rootScope.scatterB.data(data);
   $rootScope.scatterB(svgB); 
   // arbitary highlight ten scatter plot
   // $rootScope.scatter.highlight(data.slice(0,10));
   $rootScope.scatterB.on("hover",function(hovered){
      // console.log(hovered)
 
    });   
  },200)
  }; 

  
return {
  scatterPlotDisplay  : $rootScope.scatterPlotDisplay,
  updateGraphA         : $rootScope.updateGraphA,
  updateGraphB         : $rootScope.updateGraphB  
 }

  }]);
