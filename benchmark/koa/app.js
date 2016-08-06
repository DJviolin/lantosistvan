'use strict';

const Koa        = require('koa'),
      views      = require('koa-views'),
      handlebars = require('handlebars'),
      fs         = require('fs'),
      glob       = require('glob'),
      path       = require('path'),
      //hbs       = require('koa-hbs'),
      //hbsKoa    = require('koa-handlebars'),
      router     = require('koa-router')();
const app        = new Koa();

// http://stackoverflow.com/questions/38731487/how-to-render-the-main-layout-and-partials-with-koa-views-handlebars/38806035#38806035

function readAsPromise (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      resolve({path: path, data: data});
    })
  })
};

function registerPartial (partial) {
  const partialName = path.basename(partial.path, '.hbs');
  handlebars.registerPartial(partialName, partial.data);
};

var loadPartials = new Promise((resolve, reject) => {
  glob('./views/partials/*.hbs', (err, files) => {
    Promise.all(files.map(readAsPromise)).then((partials) => {
      partials.forEach(registerPartial);
      resolve();
    })
  })
});

app.use(async (ctx, next) => {
  await loadPartials;
});

router
  .get('/hello', (ctx, next) => {
    ctx.body = 'Hello, World!';
  });

// templating
app.use(views(__dirname + '/views', {
  extension: 'hbs',
  map: { hbs: 'handlebars' }
}));

//app.use(async (ctx) => {
router.get('/', async (ctx, next) => {
  await ctx.render('home', {
    Name: 'Iris',
    Type: 'Web',
    Path: '/'
  });
});

// init
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

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
