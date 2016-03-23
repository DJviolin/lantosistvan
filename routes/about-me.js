'use strict';

var express = require('express'),
    router  = express.Router();

var config          = require('../config'),
    siteName        = config.siteName;

var functions  = require('../lib/functions'),
    actualYear = functions.actualYear;

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
