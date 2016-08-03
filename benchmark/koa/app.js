'use strict';

const Koa     = require('koa'),
      //views   = require('koa-views'),
      handlebars = require('handlebars'),
      //hbs     = require('koa-hbs'),
      hbsKoa  = require('koa-handlebars'),
      router  = require('koa-router')();
const app = new Koa();

// templating
/*app.use(views(__dirname + '/views', {
  extension: 'hbs',
  map: { handlbars: 'handlebars' }
}))

//app.use(async (ctx) => {
router.get('/', async (ctx, next) => {
  await ctx.render('home', {
    Name: 'Iris',
    Type: 'Web',
    Path: '/'
  });
});*/

app.use(hbsKoa({
  handlebars: handlebars,
  extension: 'hbs',
  defaultLayout: 'layout',
  viewsDir: 'views',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  cache: false
}));

router.get('/', async (ctx, next) => {
  await ctx.render('home', {
    Name: 'Iris',
    Type: 'Web',
    Path: '/'
  });
});


/*app.use(hbs.middleware({
  extname: '.hbs',
  viewPath: __dirname + '/views',
  layoutsPath: __dirname + '/views/layouts',
  defaultLayout: 'layout',
  partialsPath: __dirname + '/views/partials',
}));

router.get('/', async (ctx, next) => {
  await ctx.render('home', {
    Name: 'Iris',
    Type: 'Web',
    Path: '/'
  });
});*/

// routes
/*router.get('/', async (ctx, next) => {
  ctx.state = {
    session: this.session,
    title: 'koa2 title'
  };
  await ctx.render('home', {
    Name: 'Iris',
    Type: 'Web',
    Path: '/'
  });
})*/

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
