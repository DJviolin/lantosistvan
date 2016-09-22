/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser'),
const methodOverride = require('method-override');
const compression = require('compression');
const serveStatic = require('serve-static');
const logger = require('morgan');
const debug = require('debug');
const slashes = require('connect-slashes');
// Security
const helmet = require('helmet');
const hpp = require('hpp');

/////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
/////////////////////////////////////////////////////////////

const app = express();
//app.set('strict routing', false);

/////////////////////////////////////////////////////////////
// CUSTOM CONSOLE
// https://nodejs.org/api/console.html
// http://eslint.org/docs/rules/no-console
/////////////////////////////////////////////////////////////

const error = debug('app:error');
const log = debug('app:log');

/////////////////////////////////////////////////////////////
// path.join Windows Hack
// http://stackoverflow.com/a/33590800/1442219
/////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////
// DEVELOPMENT
/////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
  app.use(serveStatic(path.join(__dirname, '/public')));
  log('serveStatic is ON!');
}
log('process.env.NODE_ENV = %s', process.env.NODE_ENV);

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////



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
//app.use(cookieParser()); // Cookies
app.use(helmet()); // Securing app with various HTTP headers
app.use(hpp()); // Middleware to protect against HTTP Parameter Pollution attacks
// Morgan
// https://www.npmjs.com/package/morgan
app.use(logger('dev')); // Morgan
//app.use(logger('combined'));
app.use(compression()); // Gzip
app.use(slashes(false)); // Adding or removing trailing slashes from URL's end

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
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
