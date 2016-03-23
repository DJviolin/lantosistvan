'use strict';

var express        = require('express'),
    serveStatic    = require('serve-static'),
    serveIndex     = require('serve-index'),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    methodOverride = require('method-override'),
    compression    = require('compression'),
    exphbs         = require('express-handlebars'),
    logger         = require('morgan'),
    i18n           = require('i18n');
var app = express();

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP
/////////////////////////////////////////////////////////////

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance
  helpers: {
    // register hbs helpers in res.locals' context which provides this.locale
    __: function() { return i18n.__.apply(this, arguments); },
    __n: function() { return i18n.__n.apply(this, arguments); }
  }
}));
app.set('view engine', '.hbs');

/////////////////////////////////////////////////////////////
// INIT
/////////////////////////////////////////////////////////////

// bodyParser
// This will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookieParser
app.use(cookieParser());
// methodOverride
// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
app.use(methodOverride('_method'));
// Morgan logger
app.use(logger('dev'));
// Gzip compression
app.use(compression());

/////////////////////////////////////////////////////////////
// Translation
// https://www.npmjs.com/package/i18n
// https://github.com/mashpie/i18n-node
// https://gist.github.com/mashpie/5246334
// https://www.codementor.io/nodejs/tutorial/cookie-management-in-express-js
// https://github.com/expressjs/express/blob/master/examples/cookies/index.js
// http://stackoverflow.com/questions/31747021/i18n-node-2-express-and-a-handlebars-helper
// http://stackoverflow.com/questions/7760332/how-to-make-i18n-with-handlebars-js-mustache-templates/35752656#35752656
//
// https://www.npmjs.com/package/i18next
// https://github.com/i18next/i18next-express-middleware
// https://www.npmjs.com/package/i18next-express-middleware
// https://github.com/i18next/i18next-express-middleware
/////////////////////////////////////////////////////////////

i18n.configure({
  // setup some locales - other locales default to hu silently
  locales: ['hu', 'en'],
  // fall back from English to Hungarian
  fallbacks: {'en': 'hu'},
  // you may alter a site wide default locale
  defaultLocale: 'hu',
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  cookie: 'locale',
  // query parameter to switch locale (ie. /home?lang=en) - defaults to NULL
  queryParameter: 'lang',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',
  // controll mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
  directoryPermissions: '755',
  // watch for changes in json files to reload locale on updates - defaults to false
  autoReload: true,
  // whether to write new locale information to disk - defaults to true
  updateFiles: true,
  // enable object notation
  objectNotation: true,
  // hash to specify different aliases for i18n's internal methods to apply on the request/response objects (method -> alias).
  // note that this will *not* overwrite existing properties with the same name
  api: {
    '__': '__',  //now req.__ becomes req.__
    '__n': '__n' //and req.__n can be called as req.__n
  }
});
// init i18n module for this loop
app.use(i18n.init);

/////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////

// Static (before routes)
app.use(serveStatic(__dirname + '/public'));
// FTP
app.use('/ftp', serveIndex('public/ftp', {'icons': true, 'view': 'details'}));
// API
app.use('/api', require('./routes/api-external'));
// Dynamic
app.use('/', require('./routes/portfolio'));
app.use('/blog', require('./routes/blog'));
app.use('/category', require('./routes/blog-category'));
app.use('/tag', require('./routes/blog-tag'));
app.use('/about-me', require('./routes/about-me'));
// i18n
/*app.all('*', function (req, res) {
  if(req.query.lang === 'hu') {
    //i18n.setLocale(res, 'hu');
    res.cookie('locale', 'hu', { maxAge: 900000, httpOnly: true });
    //res.send('---LOCALE-HU--- ', req.cookies.locale);
    //console.log('---LOCALE-HU--- ', req.cookies.locale);
  };
  if(req.query.lang === 'en') {
    //i18n.setLocale(res, 'en');
    res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
    //res.send('---LOCALE-EN--- ', req.cookies.locale);
    //console.log('---LOCALE-EN--- ', req.cookies.locale);
  };
});*/
app.get('/hello', function(req, res) {
  res.send(req.cookies);
});
// i18n
//app.all('*', require('./routes/cookies'));

/////////////////////////////////////////////////////////////
// EXPRESS ERROR HANDLING
/////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
