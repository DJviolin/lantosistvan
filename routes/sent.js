'use strict';

const express    = require('express'),
      //nodemailer = require('nodemailer'),
      router     = express.Router();

//const config = require('../config/mail');

/////////////////////////////////////////////////////////////
// Nodemailer
/////////////////////////////////////////////////////////////

/*router.post('/sent', function(req, res) {
  //console.log(JSON.stringify(req.body));
  //console.log('req.body.name', req.body['name']);
});*/

router.get('/sent', (req, res) => {
  res.send('Name: ' + req.body.name);
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
