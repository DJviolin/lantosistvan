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

const reqURL = 'http://www.eporner.com/api_xml/blowjob/5/10/adddate';
request(reqURL, (error, response, body) => {
  parseString(body, {trim: false}, (err, result) => {
    //console.log([{ articles: result }]);
    console.log(util.inspect(result, { showHidden: false, depth: null }));
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
