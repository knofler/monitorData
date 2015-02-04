'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TracelogSchema = new Schema({
  itemName: String,
  launchCount: Number,
  launchTime: Date,
  midTime: Date,
  endTime: Date, 
  active: Boolean
});

module.exports = mongoose.model('Tracelog', TracelogSchema);