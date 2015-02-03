'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataSchema = new Schema({
  itemName: String,
  timePlot1: Date,
  timePlot2: Date,
  timePlot3: Date,
  timePlot4: Date,
  timePlot5: Date,
  func1: String,
  result1: String,
  func2: String,
  result2: String,
  func3: String,
  result3: String,
  func4: String,
  result4: String,
  testerName: String,
  devicename:String,
  deviceSpec:String,
  loginUsed: String,
  logged_date:Date,
  active: Boolean
});

module.exports = mongoose.model('Data', DataSchema);