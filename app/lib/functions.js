'use strict';

const fs = require('fs');

const config = require('../config/routes'),
      db     = config.db;

/////////////////////////////////////////////////////////////
// READS DATABASE FROM JSON FILE
// https://www.promisejs.org/
/////////////////////////////////////////////////////////////

//exports.fsAsync = function fsAsync(callback) {
exports.fsAsync = (callback) => {
  fs.readFile(__dirname + db, 'utf8', (err, data) => {
    if (err) {
      throw callback(err);
    }
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};

exports.readJSON = (filename) => {
  return new Promise((fulfill, reject) => {
    fs.readFile(filename, 'utf8').done((data) => {
      try {
        fulfill(JSON.parse(data));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
};
