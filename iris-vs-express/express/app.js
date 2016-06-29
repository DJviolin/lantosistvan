'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const express        = require('express'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      compression    = require('compression'),
      exphbs         = require('express-handlebars'),
      logger         = require('morgan');

/////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
/////////////////////////////////////////////////////////////

const app = express();

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance
  helpers: {
    // register hbs helpers in res.locals' context which provides this.locale
    __: function() { return i18n.__.apply(this, arguments); },
    __n: function() { return i18n.__n.apply(this, arguments); },
    boldme: function(url) {
      const myString = url.toString();
      return '<b> ' + myString + '</b>';
    }
  }
}));
app.set('view engine', '.hbs');

/////////////////////////////////////////////////////////////
// INIT MIDDLEWARES
/////////////////////////////////////////////////////////////

// bodyParser
// This will let us get the data from a POST
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// methodOverride
// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
app.use(methodOverride('_method'));
app.use(logger('dev')); // Morgan
app.use(compression()); // Gzip

/////////////////////////////////////////////////////////////
// INIT ROUTES
/////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    'Name': 'Iris',
    'Type': 'Web',
    'Path': '/'
  });
});

app.get('/nolayout', (req, res) => {
    res.render('home', {});
});

app.get('/my', (req, res) => {
  res.render('home', {
    layout: 'mylayout',
    'Name': 'Iris',
    'Type': 'Web',
    'Path': '/my/'
  });
});

app.get('/my/other', (req, res) => {
  res.render('home', {
    layout: 'mylayout',
    'Name': 'Iris',
    'Type': 'Web',
    'Path': '/my/other'
  });
});

/////////////////////////////////////////////////////////////
// ERROR HANDLING MIDDLEWARE
/////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handler - catch all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err.stack);
  res.render('error', {
    layout: 'main',
    titleShown: true,
    title: err.message + ' - ' + err.status,
    description: err.message + ' - ' + err.status,
    keywords: err.message + ',' + err.status,
    // Specific stuff
    message: err.message,
    //error: {}, // production
    error: err // development, styled by views/error.hbs
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
