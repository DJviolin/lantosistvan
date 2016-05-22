'use strict';

const express    = require('express'),
      nodemailer = require('nodemailer'),
      router     = express.Router();

const functions = require('../lib/functions'),
      fsAsync   = functions.fsAsync;

const config = require('../config/mail');

/////////////////////////////////////////////////////////////
// Nodemailer MIDDLEWARE
/////////////////////////////////////////////////////////////

router.post('/', (req, res, next) => {
  const firstname = req.body.firstname,
        surname   = req.body.surname,
        email     = req.body.email,
        subject   = req.body.subject,
        message   = req.body.message,
        captcha   = req.body.captcha;
  req.firstname = firstname;
  req.surname   = surname;
  req.email     = email;
  req.subject   = subject;
  req.message   = message;
  req.captcha   = captcha;

if(req.firstname.length === 0 ||
     !req.firstname.match(/\D+/igm)) {
    console.log('AJAX ERROR: Firstname is empty and/or have a number. Value: ' + req.firstname);
    var validateFirstname = false;
  } else {
    console.log('AJAX OK: firstname. Value: ' + req.firstname);
    var validateFirstname = true;
  };

  if(req.captcha.length === 0 ||
    !req.captcha.match(/^kettő|ketto|two$/igm)) {
    console.log('AJAX ERROR: captcha is empty and/or the entered value is invalid. Value: ' + req.captcha);
    var validateCaptcha = false;
  } else {
    console.log('AJAX OK: captcha. Value: ' + captcha);
    var validateCaptcha = true;
  };

  if(validateFirstname === true && validateCaptcha === true) {
    console.log('SUCCESS: Form validated!');
    // send mail with defined transport object
    req.sending = true;
  } else {
    console.log('ERROR: Form not validated!');
    req.sending = false;
  };

  next();
});

router.use((req, res, next) => {
  console.log(req.firstname + '\n\n' +
              req.surname + '\n\n' +
              req.email + '\n\n' +
              req.subject + '\n\n' +
              req.message + '\n\n' +
              req.captcha);
  // create reusable transporter object using the default SMTP transport
  req.transporter = nodemailer.createTransport({
    pool: false,
    host: config.host,
    port: config.port,
    secure: true, // use SSL
    auth: {
      user: config.user,
      pass: config.pass
    },
    logger: true, // log to console
    debug: true, // include SMTP traffic in the logs
    // use up to 5 parallel connections
    maxConnections: 5,
    // do not send more than 10 messages per connection
    maxMessages: 10,
    // do not send more than 5 messages in a second
    rateLimit: 5
  });
  // setup e-mail data with unicode symbols
  req.mailOptions = {
    from: '"👥 LantosIstvan.com" <' + config.from + '>', // sender address
    to: config.to, // list of receivers
    subject: '<< Contact Form >>', // Subject line
    text: // plaintext body
      'Captcha:\n' + '    ' + req.captcha + '\n\n' +
      'Nyelv:\n' + '    ' + req.getLocale() + '\n\n' +
      'Keresztnév:\n' + '    ' + req.firstname + '\n\n' +
      'Vezetéknév:\n' + '    ' + req.surname + '\n\n' +
      'Email cím:\n' + '    ' + req.email + '\n\n' +
      'Tárgy:\n' + '    ' + req.subject + '\n\n' +
      'Üzenet:\n' + '    ' + req.message
  };
  next();
});

/*router.use((req, res, next) => {
  console.log(req.body); // populated!
  next();
});*/

/////////////////////////////////////////////////////////////
// Nodemailer
/////////////////////////////////////////////////////////////

router.post('/', (req, res, next) => {
  console.log(req.mailOptions);
  if(req.sending === true) {
    // send mail with defined transport object
    req.transporter.sendMail(req.mailOptions, (err, info) => {
      if(err) {
        console.log('Error occurred');
        console.log(err.message);
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
    });
  };

  if(req.sending === false) {
    req.displayBlock = 'display: block;'
    //res.status(302).redirect('/' + req.getLocale() + '/contact');
  };
  //next();
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// GET Contact page
/////////////////////////////////////////////////////////////

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

    //console.log('Content-Type (router.get): ' + req.get('Content-Type'));

    /*if(req.sending === false) {
      var formValidationError = 'display: block;'
      return formValidationError;
      res.status(302).redirect('/' + req.getLocale() + '/contact');
    };*/

    console.log('req.displayBlock: ' + req.displayBlock);

    res.render('contact', {
      bodyClass: 'contact',
      active: { information: true },
      titleShown: true,
      title: 'Contact',
      description: 'Get in touch',
      keywords: 'info,wedding,photography,film,lantos,istvan',
      data: contact,
      formValidationError: req.displayBlock
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

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
