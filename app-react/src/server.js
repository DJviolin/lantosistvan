// src/server.js

import path from 'path';
//import { Server } from 'http';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import logger from 'morgan';
import debug from 'debug';

import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

/////////////////////////////////////////////////////////////
// EXPRESS SETTINGS
/////////////////////////////////////////////////////////////

// initialize the server and configure support for ejs templates
//const app = new Express();
const app = express();
//const server = new Server(app);

/////////////////////////////////////////////////////////////
// CUSTOM CONSOLE
// https://nodejs.org/api/console.html
// http://eslint.org/docs/rules/no-console
/////////////////////////////////////////////////////////////

const error = debug('app:error');
//const log = debug('app:log');

/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP - AKA: V(iew)
/////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'static')));

/////////////////////////////////////////////////////////////
// INIT MIDDLEWARES
/////////////////////////////////////////////////////////////

// bodyParser
// This will let us get the data from a POST
////app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
////app.use(bodyParser.urlencoded({ extended: true }));
// methodOverride
// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
////app.use(methodOverride('_method'));
//app.use(cookieParser()); // Cookies
////app.use(helmet()); // Securing app with various HTTP headers
////app.use(hpp()); // Middleware to protect against HTTP Parameter Pollution attacks
// Morgan
// https://www.npmjs.com/package/morgan
app.use(logger('dev')); // Morgan
//app.use(logger('combined'));
////app.use(compression()); // Gzip
////app.use(slashes(false)); // Adding or removing trailing slashes from URL's end

/////////////////////////////////////////////////////////////
// ROUTES
/////////////////////////////////////////////////////////////

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps} />);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
/*const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
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
