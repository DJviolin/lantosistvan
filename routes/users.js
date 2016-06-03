'use strict';

const util    = require('util'),
      express = require('express'),
      router  = express.Router();
const request = require('request'),
      rp      = require('request-promise');
const parseString = require('xml2js').parseString;

/////////////////////////////////////////////////////////////
// PORNHUB
// http://www.alexa.com/topsites/category/Top/Adult
// http://www.hubtraffic.com/resources/api?site_id=3
// http://www.pornhub.com/webmasters/categories
// http://www.pornhub.com/webmasters/search?search=hard&category=amateur&thumbsize=medium&page=1
/////////////////////////////////////////////////////////////

router.get('/pornhub/category/:category/:page', (req, res, next) => {
  const category = req.params.category;
  const page = parseInt(req.params.page); // Page number as integer

  const options = {
    method: 'GET',
    //uri: 'http://www.eporner.com/api_xml/' + KEYWORDS_REPLACE + '/' + NUMBER_OF_MOVIES + '/' + START_FROM + '/' + ORDER_BY
    uri: 'http://www.pornhub.com/webmasters/search?category=' + category + '&thumbsize=medium&page=' + page
  };

  rp(options)
    .then((data) => {
      // Handle the response
      res.status(200).json(data);
    })
    .catch((err) => {
      // Deal with the error
      console.log(err);
      res.render('error');
    });

});

/////////////////////////////////////////////////////////////
// EXTERNAL API REQUEST
// SEARCH FEATURE:
// http://127.0.0.1:3000/en/users/russian+teen/0
// http://127.0.0.1:3000/en/users/search/russian+teen/0
// http://www.eporner.com/api_xml/anal,teen,hd,russian/5/0/adddate
// http://www.eporner.com/api_xml/Beautiful+vagina+fingering+perfect+body/5/0/adddate
// TODO: In search change the ` ` to `,` or `+`
/////////////////////////////////////////////////////////////

/*router.get('(/search)?/:keywords/:page', (req, res, next) => {
  const page = parseInt(req.params.page); // Page number as integer
  const KEYWORDS = req.params.keywords; // The movies you like to display eg. "anal", "black", "blowjob" OR "all" you you want to display all movies
  const KEYWORDS_REPLACE = KEYWORDS.replace(/ |%20/gi, '+');
  const NUMBER_OF_MOVIES = 5; // Is number of movies you would like to display on your site. For example 5, 10, 15, 30
  const START_FROM = page * NUMBER_OF_MOVIES; // Is the number of movies you would like to skip from the beginning of list
  const ORDER_BY = 'adddate'; // Currently supported "adddate" (will change every database update) and "id" (will be always the same)
  const reqURL = 'http://www.eporner.com/api_xml/' + KEYWORDS_REPLACE + '/' + NUMBER_OF_MOVIES + '/' + START_FROM + '/' + ORDER_BY;
  request(reqURL, (error, response, body) => {
    parseString(body, {trim: false}, (err, result) => {
      //res.status(200).json({data: result});
      res.render('users', {
        bodyClass: 'users',
        active: { blog: true },
        titleShown: true,
        title: 'Users',
        description: '',
        keywords: '',
        divClass: 'users',
        data: result['eporner-data'],
        helpers: {
          substring: function(url) {
            const myString = url.toString();
            return myString.substring(0, myString.lastIndexOf('/'));
          }
        },
        keywords: KEYWORDS
      });
    });
  });
});*/

router.get('(/search)?/:keywords/:page', (req, res, next) => {
  const page = parseInt(req.params.page); // Page number as integer
  const KEYWORDS = req.params.keywords; // The movies you like to display eg. "anal", "black", "blowjob" OR "all" you you want to display all movies
  const KEYWORDS_REPLACE = KEYWORDS.replace(/ |%20/gi, '+');
  const NUMBER_OF_MOVIES = 5; // Is number of movies you would like to display on your site. For example 5, 10, 15, 30
  const START_FROM = page * NUMBER_OF_MOVIES; // Is the number of movies you would like to skip from the beginning of list
  const ORDER_BY = 'adddate'; // Currently supported "adddate" (will change every database update) and "id" (will be always the same)

  const options = {
    method: 'GET',
    uri: 'http://www.eporner.com/api_xml/' + KEYWORDS_REPLACE + '/' + NUMBER_OF_MOVIES + '/' + START_FROM + '/' + ORDER_BY
  };

  rp(options)
    .then((data) => {
      // Handle the response
      parseString(data, {trim: false}, (err, result) => {
        //res.status(200).json({data: result});
        res.render('users', {
          bodyClass: 'users',
          active: { blog: true },
          titleShown: true,
          title: 'Users',
          description: '',
          keywords: '',
          divClass: 'users',
          data: result['eporner-data'],
          helpers: {
            substring: function(url) {
              const myString = url.toString();
              return myString.substring(0, myString.lastIndexOf('/'));
            }
          },
          keywords: KEYWORDS
        });
      });
    })
    .catch((err) => {
      // Deal with the error
      console.log(err);
      res.render('error');
    });

});

/////////////////////////////////////////////////////////////
// API DEVELOPMENT
// http://stackoverflow.com/questions/37422715/match-everything-until-last-presence-of-a-character
//
// REGEX:
// /.+\// -> http://regexr.com/3dg1g
// /^.+\// -> http://regexr.com/3dg1a
// ".+/" -> https://regex101.com/r/iL0oE5/1
//
// var s = 'http://domain.com/images/1/10/104/104901/7.jpg'
// var r = s.replace(/[^/]+$/, '')
// //=> "http://domain.com/images/1/10/104/104901/"
//
// http://thumbs1.eu.cdn.eporner.com/thumbs/static4/1/10/104/1049017/7.jpg
// http://thumbs1.eu.cdn.eporner.com/thumbs/static4/1/10/104/1049017/1049017-preview.mp4
//
// ES6 ALTERNATIVE
// myString.substring(0, myString.lastIndexOf('/'))
/*
var myString = 'http://domain.com/images/1/10/104/104901/7.jpg';
console.time("With regex");
console.log(myString.replace(/[^/]+$/, ''));
console.timeEnd("With regex");                   // outputs 0.94ms
console.time("With String methods");
console.log(myString.substring(0, myString.lastIndexOf('/')));
console.timeEnd("With String methods");          // outputs 0.53ms
*/
/////////////////////////////////////////////////////////////

router.get('/api/:keywords/:page', (req, res, next) => {

  const myString = 'http://thumbs1.eu.cdn.eporner.com/thumbs/static4/1/10/104/1049017/7.jpg';
  console.time('With regex');
  console.log(myString.replace(/[^/]+$/, ''));
  console.timeEnd('With regex');                   // outputs 0.94ms
  console.time('With String methods');
  console.log(myString.substring(0, myString.lastIndexOf('/')));
  console.timeEnd('With String methods');          // outputs 0.53ms

  const page = parseInt(req.params.page); // Page number as integer
  const KEYWORDS = req.params.keywords; // The movies you like to display eg. "anal", "black", "blowjob" OR "all" you you want to display all movies
  const NUMBER_OF_MOVIES = 5; // Is number of movies you would like to display on your site. For example 5, 10, 15, 30
  const START_FROM = page * NUMBER_OF_MOVIES; // Is the number of movies you would like to skip from the beginning of list
  const ORDER_BY = 'adddate'; // Currently supported "adddate" (will change every database update) and "id" (will be always the same)

  console.log('NUMBER_OF_MOVIES: ' + NUMBER_OF_MOVIES + ', START_FROM: ' + START_FROM);

  const reqURL = 'http://www.eporner.com/api_xml/' + KEYWORDS + '/' + NUMBER_OF_MOVIES + '/' + START_FROM + '/' + ORDER_BY;

  request(reqURL, (error, response, body) => {
    parseString(body, {trim: false}, (err, result) => {
      res.status(200).json({data: result});
    });
  });

});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
