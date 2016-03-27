'use strict';

var express = require('express'),
    router  = express.Router();

/* GET info page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    titleShown: true,
    title: 'Contact',
    description: 'Get in touch',
    keywords: 'info,wedding,photography,film,lantos,istvan'
  });
});

module.exports = router;
