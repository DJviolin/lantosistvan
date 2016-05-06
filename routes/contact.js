'use strict';

const express    = require('express'),
      nodemailer = require('nodemailer'),
      router     = express.Router();

const functions = require('../lib/functions'),
      fsAsync   = functions.fsAsync;

const config        = require('../config/mail'),
      smtpTransport = config.smtpTransport;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(smtpTransport);

/* GET info page. */
router.get('/', (req, res, next) => {
  fsAsync((err, data) => {
    if(err) {
      res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    const contact = data[2].contact;

    res.render('contact', {
      active: { information: true },
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
