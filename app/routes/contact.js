const express = require('express');
const nodemailer = require('nodemailer');
const functions = require('../lib/functions');
const config = require('../config/mail');

const router = express.Router();
const fsAsync = functions.fsAsync;

/////////////////////////////////////////////////////////////
// Nodemailer MIDDLEWARE
/////////////////////////////////////////////////////////////

router.post('/', (req, res, next) => {
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const captcha = req.body.captcha;

  req.firstname = firstname;
  req.surname = surname;
  req.email = email;
  req.subject = subject;
  req.message = message;
  req.captcha = captcha;

  if (req.captcha.length === 0 ||
    !req.captcha.match(/^kettő|ketto|two$/igm)) {
    console.log('AJAX ERROR: captcha is empty and/or the entered value is invalid. Value: ' + req.captcha);
    var validateCaptcha = false;
  } else {
    console.log('AJAX OK: captcha. Value: ' + req.captcha);
    var validateCaptcha = true;
  }

  if (validateCaptcha === true) {
    console.log('SUCCESS: Form validated!');
    // send mail with defined transport object
    req.sending = true;
  } else {
    console.log('ERROR: Form not validated!');
    req.sending = false;
  }

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
      pass: config.pass,
    },
    logger: true, // log to console
    debug: true, // include SMTP traffic in the logs
    // use up to 5 parallel connections
    maxConnections: 5,
    // do not send more than 10 messages per connection
    maxMessages: 10,
    // do not send more than 5 messages in a second
    rateLimit: 5,
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
      'Üzenet:\n' + '    ' + req.message,
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
  //console.log(req.mailOptions);

  if (!req.xhr && req.sending === true) {
    // send mail with defined transport object
    req.transporter.sendMail(req.mailOptions, (err, info) => {
      if (err) {
        console.log('Error occurred');
        console.log(err.message);
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
      res.send('<div class="form-validation-success">SUCCESS: Message sent successfully!</div>');
    });
  } else {
    res.send('<div class="form-validation-error">ERROR: Message cannot be sent!</div>');
  }

  //if(req.sending === false) {
  //  req.displayBlock = 'display: block;'
  //  //res.status(302).redirect('/' + req.getLocale() + '/contact');
  //};

  //next();
});

/////////////////////////////////////////////////////////////
// GET Contact page
/////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  fsAsync()
    .then((data) => {
      const contact = data[2].contact;
      res.render('contact', {
        data: contact,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

/////////////////////////////////////////////////////////////
// REFACTORING
/////////////////////////////////////////////////////////////

/*router.route('/')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    //next();

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
        pass: config.pass,
      },
      logger: true, // log to console
      debug: true, // include SMTP traffic in the logs
      // use up to 5 parallel connections
      maxConnections: 5,
      // do not send more than 10 messages per connection
      maxMessages: 10,
      // do not send more than 5 messages in a second
      rateLimit: 5,
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
        'Üzenet:\n' + '    ' + req.message,
    };
    next();
  })
  .post((req, res) => {
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const captcha = req.body.captcha;

    req.firstname = firstname;
    req.surname = surname;
    req.email = email;
    req.subject = subject;
    req.message = message;
    req.captcha = captcha;

    if (req.captcha.length === 0 ||
      !req.captcha.match(/^kettő|ketto|two$/igm)) {
      console.log('AJAX ERROR: captcha is empty and/or the entered value is invalid. Value: ' + req.captcha);
      var validateCaptcha = false;
    } else {
      console.log('AJAX OK: captcha. Value: ' + req.captcha);
      var validateCaptcha = true;
    }

    if (validateCaptcha === true) {
      console.log('SUCCESS: Form validated!');
      // send mail with defined transport object
      req.sending = true;
    } else {
      console.log('ERROR: Form not validated!');
      req.sending = false;
    }

    if (!req.xhr && req.sending === true) {
      // send mail with defined transport object
      req.transporter.sendMail(req.mailOptions, (err, info) => {
        if (err) {
          console.log('Error occurred');
          console.log(err.message);
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        res.send('<div class="form-validation-success">SUCCESS: Message sent successfully!</div>');
      });
    } else {
      res.send('<div class="form-validation-error">ERROR: Message cannot be sent!</div>');
    }
  })
  .get((req, res) => {
    fsAsync()
      .then((data) => {
        const contact = data[2].contact;
        res.render('contact', {
          bodyClass: 'contact',
          active: { information: true },
          titleShown: true,
          title: 'Contact',
          description: 'Get in touch',
          keywords: 'info,wedding,photography,film,lantos,istvan',
          data: contact,
        });
      })
      .catch((err) => {
        console.error(err);
        res.render('404', {
          titleShown: true,
          title: 'Error 404',
          description: 'Error 404',
          keywords: 'error,404',
        });
      });
  });*/

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
