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

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
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

/////////////////////////////////////////////////////////////
// Translation
// https://www.npmjs.com/package/i18n
// https://gist.github.com/mashpie/5246334
/////////////////////////////////////////////////////////////

i18n.configure({
  locales: ['en', 'hu'],
  cookie: 'locale',
  directory: '' + __dirname + '/locales'
});

app.configure(function () {
  // setup hbs
  app.set('views', '' + __dirname + '/views');
  app.set('view engine', 'hbs');
  app.engine('hbs', hbs.__express);

  // you'll need cookies
  app.use(express.cookieParser());

  // init i18n module for this loop
  app.use(i18n.init);

});

// register hbs helpers in res.locals' context which provides this.locale
hbs.registerHelper('__', function () {
  return i18n.__.apply(this, arguments);
});
hbs.registerHelper('__n', function () {
  return i18n.__n.apply(this, arguments);
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
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
