'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

//const bat = spawn('cmd.exe', ['/c', 'my.bat']);  // On Windows Only ...
//const python = spawn( 'python', __dirname + 'lib/myName.py', 'Luke');
//const python = spawn('python', path.join(__dirname, 'lib/myName.py'), 'Luke');
//const py = spawn('python', [path.join(__dirname, 'lib/myName.py'), 'Luke']);

//console.log(path.join(__dirname, 'lib/compute_input.py'));

const py = spawn('python', ['c:\\www\\node\\lantosistvan\\benchmark\\child-process-spawn\\lib\\myName.py']);

let chunk = '';
//python.stdout.on('data', data => chunk += data);
//python.stdout.on('close', () => console.log(chunk));

py.stdout.on('data', (data) => {
  chunk += data;
});
py.stdout.on('close', () => {
  console.log(chunk);
});

py.stderr.on('data', (data) => {
  console.log(data);
});
py.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

/*bat.stdout.on('data', (data) => {
  console.log(data);
});

bat.stderr.on('data', (data) => {
  console.log(data);
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});*/
