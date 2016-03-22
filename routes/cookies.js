'use strict';

var express = require('express'),
    router  = express.Router();

/////////////////////////////////////////////////////////////
// locale
/////////////////////////////////////////////////////////////

router.all('*', function (req, res) {
  if(req.query.lang === 'hu') {
    res.cookie('locale', 'hu', { maxAge: 900000, httpOnly: true })
    res.send('CookiesHU: ', req.cookies);
    console.log('CookiesHU: ', req.cookies);
  };
  if(req.query.lang === 'en') {
    res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true })
    res.send('CookiesEN: ', req.cookies);
    console.log('CookiesEN: ', req.cookies);
  };
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
