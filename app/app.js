'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

/*import express from 'express';
//import socket_io from 'socket.io';
import bodyParser from 'body-parser';
//import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import compression from 'compression';
import exphbs from 'express-handlebars';
import logger from 'morgan';
//import debug from 'debug';
//import winston from 'winston';
import i18n from 'i18n';
import slashes from 'connect-slashes';
// Security
import helmet from 'helmet';
import hpp from 'hpp';*/

const express = require('express'),
      //socket_io = require('socket.io'),
      bodyParser = require('body-parser'),
      //cookieParser = require('cookie-parser'),
      methodOverride = require('method-override'),
      compression = require('compression'),
      exphbs = require('express-handlebars'),
      logger = require('morgan'),
      //debug = require('debug'),
      //winston = require('winston'),
      i18n = require('i18n'),
      slashes = require('connect-slashes'),
      // Security
      helmet = require('helmet'),
      hpp = require('hpp');

/////////////////////////////////////////////////////////////
// ROUTES - AKA: C(ontroller)
/////////////////////////////////////////////////////////////

/*import api from './routes/api-external';
import index from './routes/index';
import blog from './routes/blog';
import category from './routes/blog-category';
import tag from './routes/blog-tag';
import contact from './routes/contact';
import tube from './routes/tube';*/

const api      = require('./routes/api-external'),
      index    = require('./routes/index'),
      blog     = require('./routes/blog'),
      category = require('./routes/blog-category'),
      tag      = require('./routes/blog-tag'),
      contact  = require('./routes/contact'),
      tube     = require('./routes/tube');

/////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
/////////////////////////////////////////////////////////////

const app = express();
//app.set('strict routing', false);

/////////////////////////////////////////////////////////////
// DEBUGGING & LOGGING
/////////////////////////////////////////////////////////////

//const error = debug('app:error'),
//      log = debug('app:log');
//app.error = error;
//app.log = log;

/////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////
// DEVELOPMENT
/////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
  const serveStatic = require('serve-static');
  app.use(serveStatic(__dirname + '/public'));
  console.log('serveStatic is ON!');
  //log('serveStatic is ON!');
}
console.log('process.env.NODE_ENV = %s', process.env.NODE_ENV);
//log('process.env.NODE_ENV = %s', process.env.NODE_ENV);

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
    subString: function(url) {
      const myString = url.toString();
      return myString.substring(0, myString.lastIndexOf('/'));
    },
    hyphenToSpace: function(url) {
      const myString = url.toString();
      return myString.replace(/-/ig, ' ');
    },
    firstLetterUppercase: function(url) {
      const myString = url.toString();
      return myString.charAt(0).toUpperCase() + myString.slice(1);
    },
    removeNumbers: function(url) {
      const myString = url.toString();
      return myString.replace(/\d/ig, '');
    },
    removeLastSpace: function(url) {
      const myString = url.toString();
      return myString.replace(/\s(?=\S*$)$/igm, '');
    },
    oneToThreeCharWords: function(url) {
      const myString = url.toString();
      if (myString.match(/^\S{1,3}$/igm)) {
        return myString.toUpperCase();
      } else {
        return myString;
      }
    },
    unwanted: function(url) {
      const myString = url.toString();
      if (myString.match(/^.*?\b(gay)\b.*$/igm)) {
        return null;
      } else {
        return myString;
      }
    }
  }
}));
app.set('view engine', '.hbs');
app.set('view cache', true);

/////////////////////////////////////////////////////////////
// MODELS - AKA: M(odel)
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
// i18n translation
/////////////////////////////////////////////////////////////

i18n.configure({
  // setup some locales - other locales default to hu silently
  locales: ['hu', 'en'],
  // fall back from English to Hungarian
  fallbacks: {'en': 'hu'},
  // you may alter a site wide default locale
  defaultLocale: 'en',
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  //cookie: 'locale',
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
  // Set dot to anyting else: https://github.com/mashpie/i18n-node#object-notation
  //objectNotation: true,
  objectNotation: false,
  // hash to specify different aliases for i18n's internal methods to apply on the request/response objects (method -> alias).
  // note that this will *not* overwrite existing properties with the same name
  api: {
    '__': '__',  //now req.__ becomes req.__
    '__n': '__n' //and req.__n can be called as req.__n
  }
});
// init i18n module for this loop
app.use(i18n.init);

// i18n helpers
/*app.get('/cookie', (req, res) => { // http://127.0.0.1:3000/cookie
  res.status(200).send(req.cookies.locale); // New method (Express 5)
});
app.get('/clearcookie', (req, res) => { // http://127.0.0.1:3000/clearcookie
  res.clearCookie('locale');
  res.redirect('/cookie');
});*/

/////////////////////////////////////////////////////////////
// GLOBAL CONFIGURATION
// CHANGES FOR ALL USERS
/////////////////////////////////////////////////////////////

// Site name
app.locals.siteName = 'Lantos István Photography';
// Returns actual year
app.locals.actualYear = new Date().getFullYear();

/////////////////////////////////////////////////////////////
// INIT ROUTES BEFORE req.params.lang
/////////////////////////////////////////////////////////////

// API
app.use('/api', api);

/////////////////////////////////////////////////////////////
// OWN MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

// Prints request time to console
/*app.use((req, res, next) => {
  const d = new Date();
  const n = d.getFullYear()
            + '-' +
            d.getMonth()
            + '-' +
            d.getDate()
            + '_' +
            d.getHours()
            + ':' +
            d.getMinutes()
            + ':' +
            d.getSeconds()
            + '.' +
            d.getMilliseconds();
  console.log('Request time: ' + n);
  next();
});*/

// Handling language query parameter in URLs
// https://github.com/mashpie/i18n-node#i18nsetlocale
//const langRouter = function(req, res, next) {
const langRouter = (req, res, next) => {
  const selectedLang = req.params.lang;
  //i18n.setLocale(req, req.params.lang);
  i18n.setLocale([req, res.locals], selectedLang);
  res.locals.language = '/' + selectedLang;
  next();
};

// Add i18n CSS class to <html> tag
//const langClass = function(req, res, next) {
const langClass = (req, res, next) => {
  //const defaultLang = 'hu';
  //const activeLang = req.params.lang || defaultLang;
  //const activeLang = i18n.getLocale(req);
  const activeLang = req.getLocale();
  res.locals.langClass = activeLang + '-' + activeLang.toUpperCase(); // views/layout-top.hbs
  next();
};

app.all('*', langClass); // Making sure function is executed without any query.param
app.all('/:lang/*', langRouter, langClass);
app.use('/:lang', langRouter, langClass);

/////////////////////////////////////////////////////////////
// INIT ROUTES AFTER req.params.lang
/////////////////////////////////////////////////////////////

app.use('/:lang/blog', blog);
app.use('/blog', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/blog')
);

app.use('/:lang/category', category);
app.use('/category', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/category')
);

app.use('/:lang/tag', tag);
app.use('/tag', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/tag')
);

app.use('/:lang/contact', contact);
app.use('/contact', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/contact')
);

/*app.use('/:lang/form', form);
app.use('/form', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/form')
);*/

app.use('/:lang/tube', tube);
app.use('/tube', (req, res) =>
  res.status(302).redirect('/' + req.getLocale() + '/tube')
);

// Place under every other routes, because it can block others!
app.use('/:lang', index);
//app.use('/', index);
app.use('/', (req, res) =>
  res.status(302).redirect('/' + req.getLocale())
);

/////////////////////////////////////////////////////////////
// INIT i18n WITH COOKIES
/////////////////////////////////////////////////////////////

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
