const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const multer = require('multer');
//const cookieParser = require('cookie-parser'),
const methodOverride = require('method-override');
const compression = require('compression');
const serveStatic = require('serve-static');
//const exphbs = require('express-handlebars');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const debug = require('debug');
//const winston = require('winston');
const i18n = require('i18n');
const slashes = require('connect-slashes');
// Security
const helmet = require('helmet');
const hpp = require('hpp');

////////////////////////////////////////////////////////////////////////////////////////////////////
// Libs
////////////////////////////////////////////////////////////////////////////////////////////////////

const helpers = require('./lib/helpers');

////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES - AKA: C(ontroller)
////////////////////////////////////////////////////////////////////////////////////////////////////

const profile = require('./routes/profile');
const pg = require('./routes/pg');

const api = require('./routes/api-external');
const index = require('./routes/index');
const blog = require('./routes/blog');
const category = require('./routes/blog-category');
const tag = require('./routes/blog-tag');
const contact = require('./routes/contact');

const user = require('./routes/user');

////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
//const upload = multer(); // for parsing multipart/form-data
//app.set('strict routing', false);

// Set headers (before routes)
// http://enable-cors.org/server_expressjs.html
// https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// Standard is JSON Web Tokens: https://scotch.io/tutorials/the-anatomy-of-a-json-web-token
// https://jwt.io/ | https://auth0.com/ | https://github.com/auth0/node-jsonwebtoken
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// https://www.sitepoint.com/creating-restful-apis-express-4/
// Tokens stored on client side, not sent by server every request like regular auth.
// `*` in the ACAO header is that it does not allow requests to supply credentials
// like HTTP authentication, client-side SSL certificates, or cookies.
// We could even create a permission based token and pass this along to a third-party application,
// to access only the information that we allowed with that specific token.
app.use((req, res, next) => {
  //res.set('Access-Control-Allow-Origin', '*');
  //res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });
  next();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM CONSOLE
// https://nodejs.org/api/console.html
// http://eslint.org/docs/rules/no-console
////////////////////////////////////////////////////////////////////////////////////////////////////

const error = debug('app:error');
const log = debug('app:log');

////////////////////////////////////////////////////////////////////////////////////////////////////
// path.join Windows Hack
// http://stackoverflow.com/a/33590800/1442219
////////////////////////////////////////////////////////////////////////////////////////////////////

if (process.platform === ('win32' || 'win64')) {
  path.join2 = path.join;
  path.sep = '/';
  path.join = (...args) => {
    let res = path.join2.apply({}, args);
    res = res.replace(/\\/g, path.sep);
    return res;
  };
  log(`This platform is ${process.platform}`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// DEBUGGING & LOGGING
////////////////////////////////////////////////////////////////////////////////////////////////////

//const error = debug('app:error');
//const log = debug('app:log');
//app.error = error;
//app.log = log;

////////////////////////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO MIDDLEWARE
// https://www.npmjs.com/package/socket.io
// http://socket.io/docs
// http://stackoverflow.com/a/28325154/1442219
// http://enterprisewebbook.com/ch8_websockets.html
// TUTORIAL:
// http://stackoverflow.com/a/33826289/1442219
// http://gulivert.ch/create-a-chat-app-with-nodejs-express-and-socket-io/
//
// https://onedesigncompany.com/news/express-generator-and-socket-io
// https://github.com/onedesign/express-socketio-tutorial
////////////////////////////////////////////////////////////////////////////////////////////////////

//const io = socket_io();
//app.io   = io;

//const contact = require('./routes/contact')(io);

/*// socket.io events
io.on('connection', (socket) => {
  console.log('A user connected');
});*/

/*io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// DEVELOPMENT
////////////////////////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
  app.use(serveStatic(path.join(__dirname, '/public')));
  log('serveStatic is ON!');
}
log('process.env.NODE_ENV = %s', process.env.NODE_ENV);

////////////////////////////////////////////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
////////////////////////////////////////////////////////////////////////////////////////////////////

/*const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance
  // helpers: helpers,
  // Shorthand syntax: http://eslint.org/docs/rules/object-shorthand
  //helpers: () => {},
  helpers,
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
//app.set('view cache', true);*/

// https://mozilla.github.io/nunjucks/api.html#custom-filters
// https://mozilla.github.io/nunjucks/templating.html#builtin-filters
// https://github.com/mozilla/nunjucks/blob/master/src/filters.js
// https://mozilla.github.io/nunjucks/templating.html#string
app.set('view engine', 'njk');
nunjucks.configure(path.join(__dirname, 'views-nunjucks'), {
  autoescape: true,
  express: app,
})
  .addFilter('__', (...args) => i18n.__.apply(this, args))
  .addFilter('__n', (...args) => i18n.__n.apply(this, args));
  /*.addFilter('__', function () {
    return i18n.__.apply(this, arguments);
  })
  .addFilter('__n', function () {
    return i18n.__n.apply(this, arguments);
  });*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// MODELS - AKA: M(odel)
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT MIDDLEWARES
////////////////////////////////////////////////////////////////////////////////////////////////////

// bodyParser
// This will let us get the data from a POST
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// methodOverride
// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
app.use(methodOverride('_method'));
//app.use(cookieParser()); // Cookies
app.use(helmet()); // Securing app with various HTTP headers
app.use(hpp()); // Middleware to protect against HTTP Parameter Pollution attacks
// Morgan
// https://www.npmjs.com/package/morgan
app.use(logger('dev')); // Morgan
//app.use(logger('combined'));
app.use(compression()); // Gzip
app.use(slashes(false)); // Adding or removing trailing slashes from URL's end

////////////////////////////////////////////////////////////////////////////////////////////////////
// MONGOOSE
////////////////////////////////////////////////////////////////////////////////////////////////////

/*const mongoose = require('mongoose');
const config = require('./config/db'); // get our config file
// http://mongoosejs.com/docs/promises.html
mongoose.connect(config.database); // connect to database
app.set('jwtTokenSecret', config.secret); // secret variable*/

//const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//const User = require('./models/user'); // get our mongoose model

// Make our db accessible to our router
/*app.use((req, res, next) => {
  req.db = config.database;
  next();
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// i18n translation
////////////////////////////////////////////////////////////////////////////////////////////////////

// https://www.reddit.com/r/node/comments/3m1f25/whats_the_best_practice_for_setting_up_routing/
i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'hu'],
  // fall back from English to Hungarian
  fallbacks: { en: 'hu' },
  // you may alter a site wide default locale
  defaultLocale: 'en',
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  //cookie: 'locale',
  // query parameter to switch locale (ie. /home?lang=en) - defaults to NULL
  queryParameter: 'lang',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: path.join(__dirname, '/locales'),
  // controll mode on directory creation - defaults to NULL which defaults to umask of process user.
  // Setting has no effect on win.
  directoryPermissions: '755',
  // watch for changes in json files to reload locale on updates - defaults to false
  autoReload: true,
  // whether to write new locale information to disk - defaults to true
  updateFiles: true,
  // enable object notation
  // Set dot to anyting else: https://github.com/mashpie/i18n-node#object-notation
  //objectNotation: true,
  objectNotation: false,
  // hash to specify different aliases for i18n's internal methods to apply
  // on the request/response objects (method -> alias).
  // note that this will *not* overwrite existing properties with the same name
  api: {
    __: '__',  // now req.__ becomes req.__
    __n: '__n', // and req.__n can be called as req.__n
  },
});
app.use(i18n.init); // init i18n module for this loop

// i18n helpers
/*app.get('/cookie', (req, res) => { // http://127.0.0.1:3000/cookie
  res.status(200).send(req.cookies.locale); // New method (Express 5)
});
app.get('/clearcookie', (req, res) => { // http://127.0.0.1:3000/clearcookie
  res.clearCookie('locale');
  res.redirect('/cookie');
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL CONFIGURATION
// CHANGES FOR ALL USERS
////////////////////////////////////////////////////////////////////////////////////////////////////

// Site name
app.locals.siteName = 'Lantos István Photography';
// Returns actual year
app.locals.actualYear = new Date().getFullYear();

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT ROUTES BEFORE req.params.lang
////////////////////////////////////////////////////////////////////////////////////////////////////

// Admin
app.use('/pg', pg);
app.use('/profile', profile);

// API
app.use('/api', api);
app.use('/user', user);

////////////////////////////////////////////////////////////////////////////////////////////////////
// OWN MIDDLEWARE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////

// https://github.com/mashpie/i18n-node/issues/216#issuecomment-207819363

// Handling language query parameter in URLs
// https://github.com/mashpie/i18n-node#i18nsetlocale
const langRouter = (req, res, next) => {
  const paramsLang = req.params.lang;
  const resLocals = res.locals;
  if (/^(en|hu)$/.exec(paramsLang)) {
    i18n.setLocale([req, resLocals], paramsLang);
    resLocals.language = `/${paramsLang}`;
  }
  next();
};

// Add i18n CSS class to <html> tag
const langClass = (req, res, next) => {
  const activeLang = req.getLocale();
  const resLocals = res.locals;
  resLocals.langClass = `${activeLang}-${activeLang.toUpperCase()}`;
  next();
};

app.all('*', langClass); // Making sure function is executed without any query.param
app.all('/:lang/*', langRouter, langClass);
app.use('/:lang', langRouter, langClass);

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT ROUTES AFTER req.params.lang
////////////////////////////////////////////////////////////////////////////////////////////////////

//app.use('/:lang/blog', blog);
app.use('/hu/blog', blog);
app.use('/blog', blog);

//app.use('/:lang/category', category);
//app.use('/', category);
/*app.use('/category', (req, res) =>
  res.status(302).redirect(`/${req.getLocale()}/category`)
);*/

//app.use('/:lang/tag', tag);
//app.use('/', tag);
/*app.use('/tag', (req, res) =>
  res.status(302).redirect(`/${req.getLocale()}/tag`)
);*/

//app.use('/:lang/contact', contact);
//app.use('/', contact);
/*app.use('/contact', (req, res) =>
  res.status(302).redirect(`/${req.getLocale()}/contact`)
);*/

/*app.use('/:lang/form', form);
app.use('/form', (req, res) =>
  res.status(302).redirect(`/${req.getLocale()}/form`)
);*/

// Place under every other routes, because it can block others!
////app.use('/:lang', index);
////app.use('/', index);
/*app.use('/', (req, res) =>
  //res.status(302).redirect(path.join('/', req.getLocale()))
  //res.status(302).redirect(path.join(req.getLocale()))
  res.status(302).redirect(`/${req.getLocale()}`)
);*/

// Place under every other routes, because it can block others!
// $ curl -H "accept-language: hu" -I 127.0.0.1:8081
app.use('/hu', index);
app.use('/', (req, res, next) => {
  if (req.headers['accept-language'] === 'hu') {
    return res.status(302).redirect('/hu');
  }
  return next();
});
app.use('/', index);

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT i18n WITH COOKIES
////////////////////////////////////////////////////////////////////////////////////////////////////

// i18n
/*const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour*/
/*const websiteURL = (req, res, next) => {
  const a = req.protocol + '://' + req.hostname + ':' + '3000';
  console.log(a);
  return String(a);
  next();
};*/
//app.use(websiteURL);
/*app.get('/hu', (req, res) => { // http://127.0.0.1:3000/hu
  res.cookie('locale', 'hu', {
    secure: false, // If true, only sends the cookie over HTTPS
    //domain: 'example.com',
    //domain: websiteURL,
    httpOnly: true,
    expires: expiryDate
  });
  res.redirect('back');
});
app.get('/en', (req, res) => { // http://127.0.0.1:3000/en
  res.cookie('locale', 'en', {
    secure: false, // If true, only sends the cookie over HTTPS
    //domain: 'example.com',
    //domain: websiteURL,
    httpOnly: true,
    expires: expiryDate
  });
  res.redirect('back');
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// ERROR HANDLING MIDDLEWARE
////////////////////////////////////////////////////////////////////////////////////////////////////

/*// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handler - catch all errors
app.use((err, req, res) => {
  res.status(err.status || 500);
  error(err.stack);
  res.render('error', {
    layout: 'main',
    titleShown: true,
    title: `${err.message} - ${err.status}`,
    description: `${err.message} - ${err.status}`,
    keywords: `${err.message},${err.status}`,
    // Specific stuff
    message: err.message,
    //error: {}, // production
    error: err, // development, styled by views/error.hbs
  });
});*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT EXPRESS APP
////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;
