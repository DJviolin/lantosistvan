'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

const exec = (file, argv1, argv2) => {
  const py = spawn('python', [path.join(__dirname, file), argv1, argv2]);
  py.stdout.on('data', (chunk) => {
    const textChunk = chunk.toString('utf8'); // buffer to string
    const array = textChunk.split(', ');
    console.log(array);
  });
};
exec('lib/test.py', 'argument1', 'argument2'.length - 2);  // => [ 'argument1', '7' ]
exec('lib/test.py', 'arg3', 'arg4'.length - 2);  // => [ 'arg3', '2' ]

/*const execFile = require('child_process').execFile;
const child = execFile('python', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});*/
