'use strict';

const fs = require('fs');

const config = require('../config/routes'),
      db     = config.db;

/////////////////////////////////////////////////////////////
// READS DATABASE FROM JSON FILE
/////////////////////////////////////////////////////////////

//exports.fsAsync = function fsAsync(callback) {
exports.fsAsync = (callback) => {
  fs.readFile(__dirname + db, 'utf8', (err, data) => { // function(err, data) {
    if(err) {
      throw callback(err)
    };
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};
