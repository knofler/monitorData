/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tracelog = require('./tracelog.model');

exports.register = function(socket) {
  Tracelog.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tracelog.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tracelog:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tracelog:remove', doc);
}