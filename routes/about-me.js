'use strict';

var express = require('express'),
    router  = express.Router();

var config          = require('../config'),
    siteName        = config.siteName;

var functions  = require('../lib/functions'),
    actualYear = functions.actualYear;

/////////////////////////////////////////////////////////////
// Translation
/////////////////////////////////////////////////////////////

var i18n = require('i18n');
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
router.use(i18n.init);

/* GET info page. */
router.get('/:lang', function(req, res, next) {
  if(req.params.lang === 'hu') {
    i18n.setLocale(res, 'hu');
    /*res.cookie('locale', 'hu', { maxAge: 900000, httpOnly: true });
    res.send('---LOCALE-HU--- ', req.cookies.locale);
    console.log('---LOCALE-HU--- ', req.cookies.locale);*/
  };
  if(req.params.lang === 'en') {
    i18n.setLocale(res, 'en');
    /*res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
    res.send('---LOCALE-EN--- ', req.cookies.locale);
    console.log('---LOCALE-EN--- ', req.cookies.locale);*/
  };
});

/* GET info page. */
router.get('/', function(req, res, next) {
  res.render('about-me', {
    layout: 'main',
    titleShown: true,
    title: 'About me',
    description: 'Get in touch with ' + siteName,
    keywords: 'info,wedding,photography,film,lantos,istvan',
    actualYear: actualYear,
    siteName: siteName
  });
});

module.exports = router;
