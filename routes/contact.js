'use strict';

var express = require('express'),
    router  = express.Router();

var functions  = require('../lib/functions'),
    actualYear = functions.actualYear;

/* GET info page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    layout: 'main',
    titleShown: true,
    title: 'Contact',
    description: 'Get in touch',
    keywords: 'info,wedding,photography,film,lantos,istvan',
    actualYear: actualYear
  });
});

module.exports = router;
