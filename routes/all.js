'use strict';

var express = require('express'),
    router  = express.Router();
//var glob    = require('glob');

/////////////////////////////////////////////////////////////
// ROUTING FOR ALL ROUTES
/////////////////////////////////////////////////////////////

router.all('/:lang/*', function(req, res, next){
  //i18n.setLocale(req, req.params.lang);
  i18n.setLocale([req, res.locals], req.params.lang);
  console.log('GOT /:lang/* request');
  next();
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
