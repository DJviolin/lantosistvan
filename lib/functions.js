'use strict';

var fs = require('fs');

var config = require('../config'),
    db     = config.db;

/////////////////////////////////////////////////////////////
// READS DATABASE FROM JSON FILE
/////////////////////////////////////////////////////////////

exports.fsAsync = function fsAsync(callback) {
  fs.readFile(__dirname + db, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};

/////////////////////////////////////////////////////////////
// RETURNS ACTUAL YEAR
/////////////////////////////////////////////////////////////

var d = new Date();
var actualYear = d.getFullYear();
exports.actualYear = actualYear;
