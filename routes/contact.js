'use strict';

const express    = require('express'),
      nodemailer = require('nodemailer'),
      //smtpPool   = require('nodemailer-smtp-pool'),
      router     = express.Router();

const functions = require('../lib/functions'),
      fsAsync   = functions.fsAsync;

const config = require('../config/mail');

/////////////////////////////////////////////////////////////
// Nodemailer
/////////////////////////////////////////////////////////////

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  pool: true,
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

/*// Message object
const message = {
  // Comma separated list of recipients
  to: '"Receiver Name" <kerozin.joe@gmail.com>',
  // Subject of the message
  subject: 'Nodemailer is unicode friendly ✔',
  // plaintext body
  text: 'Hello to myself!',
  // HTML body
  html: '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
      '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
  // Apple Watch specific HTML body
  watchHtml: '<b>Hello</b> to myself'
};

transporter.sendMail(message, (error, info) => {
  if(error) {
    console.log('Error occurred');
    console.log(error.message);
    return;
  }
  console.log('Message sent successfully!');
  console.log('Server responded with "%s"', info.response);
});*/

// TODO: "req.body.email" is same to "config.to"

router.post('/', (req, res) => {
  transporter.sendMail({
    from:    req.body.email,
    to:      config.to,
    name:    req.body.name,
    subject: req.body.subject,
    text:
      'Név:\n' + '    ' + req.body.name + '\n\n' +
      'Email cím:\n' + '    ' + req.body.email + '\n\n' +
      'Tárgy:\n' + '    ' + req.body.subject + '\n\n' +
      'Üzenet:\n' + '    ' + req.body.message
  }, (err, response) => {
    console.log(err || response);
  });

  //console.log(JSON.stringify(req.body));
  //console.log('req.body.name', req.body['name']);
  /*console.log(
    'Name: ' + req.body.name + '<br />' +
    'Email: ' + req.body.email + '<br />' +
    'Subject: ' + req.body.subject + '<br />' +
    'Message: ' + req.body.message
  );*/

  res.status(302).redirect('/' + req.getLocale() + '/contact');
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// GET Contact page
/////////////////////////////////////////////////////////////

router.get('/', (req, res, next) => {

  const captcha = require('node-svgcaptcha');
  const options = {
    values: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', // String with chars to generate random captcha
    length: 4, // lenght of chars in generated captcha
    width: 100, // width of the generated image
    height: 35, // height of the generated image
    color: false, // true means that letters are painted in colors and false in gray scale
    lines: 0, // number of lines in the captcha
    noise: 0 // level of noise (points) in the captcha
  };
  const genCaptcha = captcha(options);
  if(req.session) { //save value in session
    req.session.captcha = genCaptcha.captchaValue;
  };

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
      data: contact,
      captcha: genCaptcha.svg
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
