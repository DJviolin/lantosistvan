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

router.post('/', (req, res) => {
  res.send(
    'Name: ' + req.body.name + '<br />' +
    'Email: ' + req.body.email + '<br />' +
    'Subject: ' + req.body.subject + '<br />' +
    'Message: ' + req.body.message + '<br />'
  );
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
