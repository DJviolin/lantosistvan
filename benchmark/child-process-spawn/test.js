'use strict';

// spawn_python.js
//const util = require('util');
const path = require('path');
const spawn = require('child_process').spawn;

/*function sayHi(...args) {
  for (let i = 0; i < args.length; i++) {
    const merge = [];
    merge.push(args[i]);
    return console.log(`Hi, ${merge}`);
  }
}
sayHi('Cat', 'Alice');*/

/*let py = '';
function exec(...args) {
  //for (let i = 0; i < args.length; i++) {
  //  py = spawn('python', ['c:\\www\\node\\lantosistvan\\benchmark\\child-process-spawn\\lib\\test.py', args[i]]);
  //}
  //py = spawn('python', ['c:\\www\\node\\lantosistvan\\benchmark\\child-process-spawn\\lib\\test.py', args[0], args[1]]);

  const merged = [];
  for (let i = 0; i < args.length; i++) {
    //return args[i];
    merged.push(args[i]).toString();
  }

  py = spawn('python', ['c:\\www\\node\\lantosistvan\\benchmark\\child-process-spawn\\lib\\test.py', merged]);
  return py;
}
exec('Hello', 'World');*/

/*let argv1 = 'Hello'.length;
let argv2 = 'Worlddd'.length - 2;
//const args = [argv1, argv2];

const py = spawn('python', [path.join(__dirname, 'lib/test.py'), argv1, argv2]);

//util.log('readingin');

py.stdout.on('data', (chunk) => {
  const textChunk = chunk.toString('utf8'); // buffer to string
  //util.log(textChunk);
  //console.log(textChunk);

  const array = textChunk.split(', ');
  console.log(array);
});*/

function exec(argumentOne, argumentTwo) {
  const py = spawn('python', [path.join(__dirname, 'lib/test.py'), argumentOne, argumentTwo]);
  py.stdout.on('data', (chunk) => {
    const textChunk = chunk.toString('utf8'); // buffer to string
    const array = textChunk.split(', ');
    console.log(array);
  });
}
exec('argument1', 'argument2');
