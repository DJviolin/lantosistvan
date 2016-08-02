'use strict';

const Koa    = require('koa'),
      router = require('koa-router')();
const app = new Koa();

// routes
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello, World!';
  });

// init
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
