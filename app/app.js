const bodyParser = require('body-parser');
const compression = require('compression');
const debug = require('debug');
//const exphbs = require('express-handlebars');
const express = require('express');
const helmet = require('helmet'); // Security
const hpp = require('hpp'); // Security
const i18n = require('i18n');
const logger = require('morgan');
const methodOverride = require('method-override');
//const multer = require('multer'); // Upload
const nunjucks = require('nunjucks');
const path = require('path');
const serveStatic = require('serve-static');
const slashes = require('connect-slashes');
//const winston = require('winston');

/////////////////////////////////////////////////////////////
// ROUTES - AKA: C(ontroller)
/////////////////////////////////////////////////////////////

//const pg = require('./routes/pg');
//const profile = require('./routes/profile');

const api = require('./routes/api-external');
const blog = require('./routes/blog');
const category = require('./routes/blogCategory');
const contact = require('./routes/contact');
const index = require('./routes/index');
const tag = require('./routes/blogTag');

//const user = require('./routes/user');

/////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
/////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////
// DEBUGGING & LOGGING
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
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
})
  .addFilter('__', (...args) => i18n.__.apply(this, args))
  .addFilter('__n', (...args) => i18n.__n.apply(this, args));

/////////////////////////////////////////////////////////////
// INIT MIDDLEWARES
/////////////////////////////////////////////////////////////

app.use(bodyParser.json()); // get the data from a POST
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')); // Use HTTP verbs such as PUT or DELETE
app.use(helmet()); // Securing app with various HTTP headers
app.use(hpp()); // Middleware to protect against HTTP Parameter Pollution attacks
app.use(logger('dev')); // Morgan => dev | combined
app.use(compression()); // Gzip
app.use(slashes(false)); // Adding or removing trailing slashes from URL's end

/////////////////////////////////////////////////////////////
// i18n translation
/////////////////////////////////////////////////////////////

// https://www.reddit.com/r/node/comments/3m1f25/whats_the_best_practice_for_setting_up_routing/
i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'hu'],
  // fall back from English to Hungarian
  //fallbacks: { en: 'hu' },
  fallbacks: { en: 'en' },
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

// Admin
//app.use('/pg', pg);
//app.use('/profile', profile);

// API
app.use('/api', api);
app.use('/user', user);

/////////////////////////////////////////////////////////////
// OWN MIDDLEWARE FUNCTIONS
/////////////////////////////////////////////////////////////

// https://github.com/mashpie/i18n-node/issues/216#issuecomment-207819363

// Handling language query parameter in URLs
// https://github.com/mashpie/i18n-node#i18nsetlocale
const langRouter = (req, res, next) => {
  if (/^(en|hu)$/.exec(req.params.lang)) {
    i18n.setLocale([req, res.locals], req.params.lang);
    res.locals.language = `/${req.params.lang}`;
  }
  next();
};

// Add i18n CSS class to <html> tag
const langClass = (req, res, next) => {
  const activeLang = req.getLocale();
  res.locals.langClass = `${activeLang}-${activeLang.toUpperCase()}`;
  next();
};

app.all('*', langClass); // Making sure function is executed without any query.param
app.all('/:lang/*', langRouter, langClass);
app.use('/:lang', langRouter, langClass);

/////////////////////////////////////////////////////////////
// INIT ROUTES AFTER req.params.lang
/////////////////////////////////////////////////////////////

/*app.use('/:lang/form', form);
app.use('/form', (req, res) =>
  res.status(302).redirect(`/${req.getLocale()}/form`)
);*/

app.use('/hu/blog', blog);
app.use('/blog', blog);

app.use('/hu/category', category);
app.use('/category', category);

app.use('/hu/tag', tag);
app.use('/tag', tag);

app.use('/hu/contact', contact);
app.use('/contact', contact);

// Place under every other routes, because it can block others!
// $ curl -H "accept-language: hu" -I 127.0.0.1:8081
// https://github.com/mashpie/i18n-node#i18n__l
app.use('/hu', index);
/*app.use('/', (req, res, next) => {
  if (req.headers['accept-language'] === 'hu') {
    return res.status(302).redirect('/hu');
  }
  return next();
});*/
app.use('/', index);

/////////////////////////////////////////////////////////////
// ERROR HANDLING MIDDLEWARE
/////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////
// INIT EXPRESS APP
/////////////////////////////////////////////////////////////

module.exports = app;
