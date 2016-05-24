'use strict';

const util    = require('util'),
      express = require('express'),
      router  = express.Router();
//const Client  = require('node-rest-client').Client;
//const client  = new Client();
const request = require('request');
const parseString = require('xml2js').parseString;

/////////////////////////////////////////////////////////////
// EXTERNAL API REQUEST
/////////////////////////////////////////////////////////////

//const reqURL = 'http://www.eporner.com/api_xml/blowjob/5/10/adddate';

/*request(reqURL, (error, response, body) => {
  parseString(body, {trim: false}, (err, result) => {
    //console.log([{ articles: result }]);
    console.log(util.inspect(result, { showHidden: false, depth: null }));
  });
});*/

/////////////////////////////////////////////////////////////
// PAGE RENDERING
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

  const reqURL = 'http://www.eporner.com/api_xml/' + req.params.tag + '/' + req.start + '/' + end + '/' + 'adddate';

  request(reqURL, (error, response, body) => {
    parseString(body, {trim: false}, (err, result) => {
      res.status(200).json(result);
    });
  });

});

/////////////////////////////////////////////////////////////
// EXTERNAL API REQUEST
/////////////////////////////////////////////////////////////

/*router.get('/', (req, res, next) => {
  const reqURL = req.protocol + '://' + req.hostname + ':' + usedPort + '/api/articles/page/' + 0 + '/' + articlesPerPage + '/order/' + 'adddate' + '/auth/' + apiToken;
  request(reqURL, (error, response, body) => {
    console.log([{ articles: JSON.parse(body) }]);
    const articles = [{ articles: JSON.parse(body) }];
    res.render('blog', {
      bodyClass: 'Users',
      active: { blog: true },
      titleShown: true,
      title: 'Users',
      description: '',
      keywords: '',
      divClass: 'Users',
      data: articles,
      paginationParams: null,
      paginationParamsSlash: false
    });
  })
});*/

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
