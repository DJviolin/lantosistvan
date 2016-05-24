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
//=> "http://domain.com/images/1/10/104/104901/"
//
// http://thumbs1.eu.cdn.eporner.com/thumbs/static4/1/10/104/1049017/7.jpg
// http://thumbs1.eu.cdn.eporner.com/thumbs/static4/1/10/104/1049017/1049017-preview.mp4
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

router.get('/:tag/:page', (req, res, next) => {

  const count = parseInt(req.params.page); // Page number as integer
  const videoPerPage = 5; // How many videos per page
  if(count === 0) { // is number of movies you would like to display on your site. For example 5, 10, 15, 30
    req.start = videoPerPage;
  } else {
    req.start = req.params.page * videoPerPage; // 1 * 5 = 5
  };
  const end = req.start - videoPerPage; // 5 - 5 = 0 --> is the number of movies you would like to skip from the beginning of list

  console.log('req.start: ' + req.start + ', end: ' + end);

  const reqURL = 'http://www.eporner.com/api_xml/' + req.params.tag + '/' + req.start + '/' + end + '/' + 'adddate';

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
