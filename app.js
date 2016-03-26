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
// methodOverride
// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(logger('dev')); // Morgan
app.use(compression()); // Gzip

/////////////////////////////////////////////////////////////
// Translation
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
// GLOBAL CONFIGURATION
// CHANGES FOR ALL USERS
/////////////////////////////////////////////////////////////

// Site name
app.locals.siteName = 'Lantos István Photography';
// Returns actual year
app.locals.actualYear = new Date().getFullYear();

/////////////////////////////////////////////////////////////
// OWN MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  var defaultLang = 'hu';
  var activeLang = req.cookies.locale || defaultLang;
  res.locals.langClass = activeLang + '-' + activeLang.toUpperCase();
  next();
});

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
app.use('/contact', require('./routes/contact'));
// i18n
app.get('/hu', function (req, res) { // http://127.0.0.1:3000/hu
  res.cookie('locale', 'hu', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});
app.get('/en', function (req, res) { // http://127.0.0.1:3000/en
  res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
  res.redirect('back');
});
// i18n helpers
app.get('/cookie', function(req, res) { // http://127.0.0.1:3000/cookie
  res.status(200).send(req.cookies.locale); // New method (Express 5)

});
app.get('/clearcookie', function(req, res){ // http://127.0.0.1:3000/clearcookie
  res.clearCookie('locale');
  res.redirect('/cookie');
});

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
// ERROR HANDLING MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
