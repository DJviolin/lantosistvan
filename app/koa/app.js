'use strict';
// ctx = Context specific methods and accessors
// ctx = request handler callback
// const ctx = this.createContext(req, res);

import http from 'http';
import Koa from 'koa';
import koaRouter from 'koa-router';
import handlebars from 'handlebars';
import hbsKoa from 'koa-handlebars';

const app = new Koa();
const router = new koaRouter();

// Routes
const index = require('./routes/index');
const users = require('./routes/users');

// View engine setup
app.use(
  hbsKoa({
    //handlebars: handlebars,
    viewsDir: __dirname + '/views',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'main',
    extension: 'hbs',
    /*cache: app.env !== 'development',
    helpers: {
      firstLetterUppercase: function(url) {
        const myString = url.toString();
        return myString.charAt(0).toUpperCase() + myString.slice(1);
      }
    }*/
  })
);


router.get('/hello', async (ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {
  });
});

router.get('/', ctx => {
  ctx.status = 200;
  ctx.body = 'Hello World!';
});

/*router.get('/hello', (ctx, next) => {
  ctx.status = 200;
  ctx.koahbs('index', {
    title: 'koa2 title'
  });
});*/

// Router init
//router.use('/', index);
//router.use('/users', users);

/*router.get('/hello', async (ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {
  });
});*/

/*router.get('/hello', (ctx, next) => {
  ctx.render('index', {
    title: 'koa2 title'
  });
});

router.get('/', (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'Hello World!';
});*/

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
/*app.use(ctx => {
  ctx.body = 'Hello World';
});*/

app.use(router.routes());
app.use(router.allowedMethods());

// Create HTTP server
const port = process.env.PORT || '3000';
http.Server(app.callback()).listen(
  port, () => console.log(`HTTP Server started on PORT ${port}...`)
);
