'use strict';

var express = require('express'),
    router  = express.Router();

var functions  = require('../lib/functions'),
    fsAsync    = functions.fsAsync;

/* GET info page. */
router.get('/', function(req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    var contact = data[2].contact;

    res.render('contact', {
      titleShown: true,
      title: 'Contact',
      description: 'Get in touch',
      keywords: 'info,wedding,photography,film,lantos,istvan',
      data: contact
    });
  });
});

/* GET info page. */
/* Async Test */
/*router.get('/', (req, res, next) => {
  res.render('contact', {
    titleShown: true,
    title: 'Contact',
    description: 'Get in touch',
    keywords: 'info,wedding,photography,film,lantos,istvan'
  }, (err, html) => {
    if (err) throw err;
    res.send(html);
    //console.log('sent this static stuff');
  });
  //console.log('this is async');
});*/

module.exports = router;
