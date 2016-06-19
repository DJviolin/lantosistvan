'use strict';

const express = require('express'),
      router  = express.Router();
//const glob    = require('glob');

const functions = require('../lib/functions'),
      fsAsync   = functions.fsAsync;

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS JOURNAL FRONTPAGE
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

    const gallery = data[0].gallery.portfolio.love;
    //const json = gallery;
    //console.log(json);

    const articles = data[1].articles.reverse();
    const slice = articles.slice(0, 6);
    const json = [{ articles: slice }];

    res.render('index', {
      //layout: 'main',
      bodyClass: 'index',
      active: { index: true },
      titleShown: false,
      title: 'Hi!',
      description: 'Home page',
      keywords: 'wedding,photography,film,lantos,istvan',
      data: gallery,
      latestPosts: json
    });
  });
});

/////////////////////////////////////////////////////////////
// INTERNAL API WITH GLOB
// RETURNS JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

/* GET home page. */
/*router.get('/', (req, res, next) => {
  glob('*.jpg', { cwd: 'public/portfolio/weddings/', sort: true }, (err, images) => {
    const results = images;
    res.render('portfolio', {
      //layout: 'main',
      active: { index: false },
      titleShown: false,
      title: 'Hi!',
      description: 'Home page',
      keywords: 'wedding,photography,film,lantos,istvan',
      imagesFolder: '\/portfolio\/weddings\/',
      images: results
    });
  });
});*/

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;