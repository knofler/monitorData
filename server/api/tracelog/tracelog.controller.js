'use strict';

var _ = require('lodash');
var Tracelog = require('./tracelog.model');

// Get list of tracelogs
exports.index = function(req, res) {
  Tracelog.find(function (err, tracelogs) {
    if(err) { return handleError(res, err); }
    return res.json(200, tracelogs);
  });
};

// Get a single tracelog
exports.show = function(req, res) {
  Tracelog.findById(req.params.id, function (err, tracelog) {
    if(err) { return handleError(res, err); }
    if(!tracelog) { return res.send(404); }
    return res.json(tracelog);
  });
};

// // Get last item
exports.lastEntry = function(req, res) {
  var singleEntry = '';
  Tracelog.find(function (err, tracelogs) {
    if(err) { return handleError(res, err); }

      tracelogs = tracelogs.sort({_id : -1});

      singleEntry = tracelogs[tracelogs.length-1];
      return res.json(200, singleEntry);
      });   
};



// Creates a new tracelog in the DB.
exports.create = function(req, res) {
  Tracelog.create(req.body, function(err, tracelog) {
    if(err) { return handleError(res, err); }
    return res.json(201, tracelog);
  });
};

// Updates an existing tracelog in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tracelog.findById(req.params.id, function (err, tracelog) {
    if (err) { return handleError(res, err); }
    if(!tracelog) { return res.send(404); }
    var updated = _.merge(tracelog, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tracelog);
    });
  });
};

// Deletes a tracelog from the DB.
exports.destroy = function(req, res) {
  Tracelog.findById(req.params.id, function (err, tracelog) {
    if(err) { return handleError(res, err); }
    if(!tracelog) { return res.send(404); }
    tracelog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}