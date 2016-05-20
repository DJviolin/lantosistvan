'use strict';

const express    = require('express'),
      nodemailer = require('nodemailer'),
      router     = express.Router();

const config = require('../config/mail');

/////////////////////////////////////////////////////////////
// Nodemailer
/////////////////////////////////////////////////////////////

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
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

router.post('/', (req, res) => {
  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: '"👥 LantosIstvan.com" <' + config.from + '>', // sender address
    to: config.to, // list of receivers
    subject: '<< Contact Form >>', // Subject line
    text: // plaintext body
      'Captcha:\n' + '    ' + req.body.captcha + '\n\n' +
      'Nyelv:\n' + '    ' + req.getLocale() + '\n\n' +
      'Keresztnév:\n' + '    ' + req.body.firstname + '\n\n' +
      'Vezetéknév:\n' + '    ' + req.body.surname + '\n\n' +
      'Email cím:\n' + '    ' + req.body.email + '\n\n' +
      'Tárgy:\n' + '    ' + req.body.subject + '\n\n' +
      'Üzenet:\n' + '    ' + req.body.message
  };

  // You have to check the captcha before you call sendMail.
  // There is no way to abort already running email transaction in Nodemailer
  /*if(req.body.captcha === 'kettő' ||
     req.body.captcha === 'ketto' ||
     req.body.captcha === 'Kettő' ||
     req.body.captcha === 'Ketto' ||
     req.body.captcha === 'KETTŐ' ||
     req.body.captcha === 'KETTO' ||
     req.body.captcha === 'two' ||
     req.body.captcha === 'Two' ||
     req.body.captcha === 'TWO') {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        console.log('Error occurred');
        console.log(err.message);
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
    });
  };*/

  if(req.xhr === true) {
    console.log('req.xhr detected on server-side!');
  };

  if(req.body.firstname.length === 0 ||
     !req.body.firstname.match(/\D+/igm)) {
    console.log('AJAX ERROR: Firstname is empty and/or have a number. Value: ' + req.body.firstname);
    var validateFirstname = false;
  }
  else {
    console.log('AJAX OK: firstname. Value: ' + req.body.firstname);
    var validateFirstname = true;
  };

  if(req.body.captcha.length === 0 ||
    !req.body.captcha.match(/^kettő|ketto|two$/igm)) {
    console.log('AJAX ERROR: captcha is empty and/or the entered value is invalid. Value: ' + req.body.captcha);
    var validateCaptcha = false;
  }
  else {
    console.log('AJAX OK: captcha. Value: ' + req.body.captcha);
    var validateCaptcha = true;
  };

  if(validateFirstname === true && validateCaptcha === true) {
    console.log('SUCCESS: Form validated!');
  } else {
    console.log('ERROR: Form not validated!');
  };

  //res.status(302).redirect('/' + req.getLocale() + '/contact');
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
