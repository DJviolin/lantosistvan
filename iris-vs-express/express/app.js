'use strict';

// MODULE DEPENDENCIES
const express = require('express'),
      exphbs  = require('express-handlebars');
const app = express();

// VIEW ENGINE SETUP - AKA: V(iew)
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance
  helpers: {
    boldme: function(url) {
      const myString = url.toString();
      return '<strong> ' + myString + '</strong>';
    }
  }
}));
app.set('view engine', '.hbs');

// INIT ROUTES
app.get('/', (req, res) => {
  res.render('home', {
    layout: 'layout',
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

// INIT EXPRESS APP
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
