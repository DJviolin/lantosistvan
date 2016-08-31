'use strict';

// http://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

const spawn = require('child_process').spawn;

const py = spawn('python', ['c:\\www\\node\\lantosistvan\\benchmark\\child-process-spawn\\lib\\compute_input.py']);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const dataString = '';

py.stdout.on('data', (data) => {
  dataString += data.toString();
});
py.stdout.on('end', () => {
  console.log('Sum of numbers=', dataString);
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();
