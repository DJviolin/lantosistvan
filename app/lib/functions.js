'use strict';

const fs = require('fs');

const config = require('../config/routes'),
      db     = config.db;

/////////////////////////////////////////////////////////////
// READS DATABASE FROM JSON FILE
// https://www.promisejs.org/
// https://nodejs.org/api/process.html#process_event_unhandledrejection
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
// https://expressjs.com/en/advanced/best-practice-performance.html
// http://first-time-ceo.tumblr.com/post/104273001643/using-promises-with-expressjs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://www.toptal.com/javascript/javascript-promises
/////////////////////////////////////////////////////////////

//exports.fsAsync = function fsAsync(callback) {
/*exports.fsAsync = (callback) => {
  fs.readFile(__dirname + db, 'utf8', (err, data) => {
    if (err) {
      throw callback(err);
    }
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};*/

exports.fsAsync = () => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + db, 'utf8', (err, data) => {
      if (err) {
        throw reject(err); // If there was an error, use `reject()` with the error
      }
      resolve(JSON.parse(data)); // If the read is successful, we use `resolve()` with the data
    });
  });
  return promise; // return our Promise so the calling code can use it...
};
