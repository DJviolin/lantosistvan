const app = require('../app');
const http = require('http');
const debug = require('debug');
const SOCKET_IO = require('socket.io');

/////////////////////////////////////////////////////////////
// Optimizations
/////////////////////////////////////////////////////////////

http.globalAgent.maxSockets = Infinity;

/////////////////////////////////////////////////////////////
// Create HTTP server
/////////////////////////////////////////////////////////////

const server = http.createServer(app);
// const server = http.Server(app);

/////////////////////////////////////////////////////////////
// PORT
/////////////////////////////////////////////////////////////

// Normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // named pipe
  }
  if (port >= 0) {
    return port; // port number
  }
  return false;
}

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);
// http://expressjs.com/en/4x/api.html#app.set
// http://expressjs.com/en/guide/behind-proxies.html
// http://stackoverflow.com/a/23426060/1442219
app.set('trust proxy', true);
app.set('x-powered-by', false);

/////////////////////////////////////////////////////////////
// Debugging
// https://expressjs.com/en/advanced/best-practice-performance.html
// https://expressjs.com/en/guide/debugging.html
// https://nodejs.org/api/util.html#util_util_format_format
/////////////////////////////////////////////////////////////

const error = debug('app:error');
const log = debug('app:log');

// Event listener for HTTP server "error" event
function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      error('%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      error('%s is already in use', bind);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  log('Listening on %s', bind);
}

/////////////////////////////////////////////////////////////
// INIT
/////////////////////////////////////////////////////////////

// Socket.io
// SocketIO does not work with routes it works with sockets
// http://stackoverflow.com/a/33596348/1442219
// http://socket.io/get-started/chat/
/*const io = app.io
io.listen(server);*/
const io = SOCKET_IO.listen(server);
require('../sockets')(io);

// Listen on provided port, on all network interfaces
//server.listen(port);
server.listen(port, process.env.PRIVATE_IP_DOCKER || '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/////////////////////////////////////////////////////////////
// CLUSTER
// https://nodejs.org/api/cluster.html
/////////////////////////////////////////////////////////////

/*const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  //http.createServer((req, res) => {
  //  res.writeHead(200);
  //  res.end('hello world\n');
  //}).listen(8000);

  server.listen(port, process.env.PRIVATE_IP_DOCKER || '0.0.0.0');
  server.on('error', onError);
  server.on('listening', onListening);
  log('App is listening on %s threads', numCPUs);
}*/
