'use strict';

const Koa     = require('koa'),
      views   = require('koa-views'),
      hbs     = require('handlebars'),
      router  = require('koa-router')();
const app = new Koa();

// routes
router
  .get('/hello', (ctx, next) => {
    ctx.body = 'Hello, World!';
  });

// init
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);

//CLUSTER
/*const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

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
  app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
  });
}*/
