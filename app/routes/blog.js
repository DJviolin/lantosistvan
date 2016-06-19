'use strict';

const express = require('express'),
      router  = express.Router();
//const request = require('request');

const config          = require('../config/routes'),
      //usedPort        = config.usedPort,
      articlesPerPage = config.articlesPerPage;

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

    const articles = data[1].articles.reverse();
    const slice = articles.slice(0, articlesPerPage);
    const json = [{ articles: slice }];

    res.render('blog', {
      bodyClass: 'blog',
      active: { blog: true },
      titleShown: true,
      title: 'Journal',
      description: 'Blog Page',
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      divClass: 'blog',
      data: json,
      paginationFirst: false,
      paginationLast: true,
      paginationNext: 1,
      paginationParams: null,
      paginationParamsSlash: false
    });
  });
});

/////////////////////////////////////////////////////////////
// EXTERNAL API REQUEST
// RETURNS JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

/*router.get('/', (req, res, next) => {
  const reqURL = req.protocol + '://' + req.hostname + ':' + usedPort + '/api/articles/page/' + 0 + '/' + articlesPerPage + '/order/' + 'adddate' + '/auth/' + apiToken;
  request(reqURL, (error, response, body) => {
    console.log([{ articles: JSON.parse(body) }]);
    const articles = [{ articles: JSON.parse(body) }];
    res.render('blog', {
      active: { blog: true },
      titleShown: true,
      title: 'Journal',
      description: 'Blog page',
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      divClass: 'blog',
      data: articles,
      paginationParams: null,
      paginationParamsSlash: false
    });
  })
});*/

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS JOURNAL PAGES
/////////////////////////////////////////////////////////////

router.get('/page/:id', (req, res, next) => {
  fsAsync((err, data) => {
    if(err) {
      res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    const articles = data[1].articles.reverse();

    // Internal api request
    const count = parseInt(req.params.id); // Page number as integer
    const countResult = count * articlesPerPage;
    const start = countResult + 0;
    const end = countResult + articlesPerPage;
    const slice = articles.slice(start, end);
    const json = [{ articles: slice }];
    // Prev, next buttons under the blog
    const prev = count - 1;
    const next = count + 1;
    // Sum of all pages on the blog
    const pagesLength = articles.length / articlesPerPage;
    const pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages
    // Turn off pagination on the first page
    let paginationFirst = true;
    if(count === 0) {
      paginationFirst = false;
    };
    // Turn off pagination on the last page
    let paginationLast = true;
    if(count >= pagesAll) {
      paginationLast = false;
    };
    // Turn off /page/0 URL chunk on /page/1
    let paginationFirstURL = true;
    if(count === 1) {
      paginationFirstURL = false;
    };

    res.render('blog', {
      bodyClass: 'blog',
      active: { blog: true },
      titleShown: true,
      title: 'Journal',
      description: 'Blog page',
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      divClass: 'blog',
      data: json,
      paginationFirst: paginationFirst,
      paginationLast: paginationLast,
      paginationPrev: prev,
      paginationNext: next,
      paginationFirstURL: paginationFirstURL,
      paginationParams: null,
      paginationParamsSlash: false
    });
  });
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY URL
/////////////////////////////////////////////////////////////

router.get('/:url', (req, res, next) => {
  fsAsync((err, data) => {
    if(err) {
      res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    const articles = data[1].articles;

    // this will get you the first article matching the url
    /*const selectedArticle = articles.find(function(article) {
      return article.url === req.params.url;
    });*/
    const selectedArticle = articles.find((article) => article.url === req.params.url);

    // render your page with selectedArticle
    res.render('blog-article', {
      bodyClass: 'blog',
      active: { blog: true },
      titleShown: true,
      title: selectedArticle.title,
      description: selectedArticle.description,
      keywords: selectedArticle.keywords,
      data: selectedArticle
    });

  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
