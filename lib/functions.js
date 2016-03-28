'use strict';

var fs = require('fs');

var config = require('../config'),
    db     = config.db;

/////////////////////////////////////////////////////////////
// READS DATABASE FROM JSON FILE
/////////////////////////////////////////////////////////////

exports.fsAsync = function fsAsync(callback) {
  fs.readFile(__dirname + db, 'utf8', (err, data) => { // function(err, data) {
    if (err) throw callback(err);
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};
