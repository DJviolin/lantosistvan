'use strict';
// ctx = Context specific methods and accessors
// ctx = request handler callback
// const ctx = this.createContext(req, res);

//const Koa = require('koa');
import http from 'http';
import Koa from 'koa';
const app = new Koa();

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// Response
app.use(ctx => {
  ctx.body = 'Hello World';
});

// Create HTTP server
const port = process.env.PORT || '3000';
http.Server(app.callback()).listen(
  port, () => console.log(`HTTP Server started on PORT ${port}...`)
);
