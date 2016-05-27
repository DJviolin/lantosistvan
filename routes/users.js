'use strict';

const util    = require('util'),
      express = require('express'),
      router  = express.Router();
const request = require('request');
const parseString = require('xml2js').parseString;

/////////////////////////////////////////////////////////////
// EXTERNAL API REQUEST
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

router.get('/:tag/:start/:end/:order/', (req, res, next) => {
  const reqURL = 'http://www.eporner.com/api_xml/' + req.params.tag + '/' + req.params.start + '/' + req.params.end + '/' + req.params.order;
  request(reqURL, (error, response, body) => {
    parseString(body, {trim: false}, (err, result) => {
      //console.log([{ articles: result }]);
      //console.log(util.inspect(result, { showHidden: false, depth: null }));
      //
      //q = util.inspect(result, { showHidden: false, depth: null });
      res.status(200).json(result);
    });
  });
});

router.get('/:keywords/:page', (req, res, next) => {

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
      res.status(200).json(result);
    });
  });

});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
