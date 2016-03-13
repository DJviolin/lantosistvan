'use strict';

var express = require('express'),
    router  = express.Router();
//var request = require('request');

var config          = require('../config'),
    articlesPerPage = config.articlesPerPage,
    siteName        = config.siteName;

var functions  = require('../lib/functions'),
    fsAsync    = functions.fsAsync,
    actualYear = functions.actualYear;

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

router.get('/', function (req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        layout: 'main',
        blogNavCat: true,
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
        bodyClass: 'error',
        actualYear: actualYear,
        siteName: siteName
      });
    }

    var articles = data[1].articles.reverse();

    var slice = articles.slice(0, articlesPerPage);
    var json = [{ articles: slice }];

    res.render('blog', {
      layout: 'main',
      blogNavCat: true,
      titleShown: true,
      title: 'Journal',
      description: 'Journal of ' + siteName,
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      bodyClass: 'blog',
      actualYear: actualYear,
      siteName: siteName,
      divClass: 'journal',
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

/*router.get('/', function(req, res, next) {
  var reqURL = req.protocol + '://' + req.hostname + ':' + usedPort + '/api/articles/page/' + 0 + '/' + articlesPerPage + '/order/' + 'adddate' + '/auth/' + apiToken;
  request(reqURL, function (error, response, body) {
    console.log([{ articles: JSON.parse(body) }]);
    var articles = [{ articles: JSON.parse(body) }];
    res.render('blog', {
      layout: 'main',
      blogNavCat: true,
      titleShown: true,
      title: 'Journal',
      description: 'Journal of ' + siteName,
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      bodyClass: 'blog',
      actualYear: actualYear,
      siteName: siteName,
      divClass: 'journal',
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

router.get('/page/:id', function (req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        layout: 'main',
        blogNavCat: true,
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
        bodyClass: 'error',
        actualYear: actualYear,
        siteName: siteName
      });
    }

    var articles = data[1].articles.reverse();

    // Internal api request
    var count = parseInt(req.params.id); // Page number as integer
    var countResult = count * articlesPerPage;
    var start = countResult + 0;
    var end = countResult + articlesPerPage;
    var slice = articles.slice(start, end);
    var json = [{ articles: slice }];
    // Prev, next buttons under the blog
    var prev = count - 1;
    var next = count + 1;
    // Sum of all pages on the blog
    var pagesLength = articles.length / articlesPerPage;
    var pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages
    // Turn off pagination on the first page
    var paginationFirst = true;
    if(count === 0) {
      var paginationFirst = false;
    };
    // Turn off pagination on the last page
    var paginationLast = true;
    if(count >= pagesAll) {
      var paginationLast = false;
    };
    // Turn off /page/0 URL chunk on /page/1
    var paginationFirstURL = true;
    if(count === 1) {
      var paginationFirstURL = false;
    };

    res.render('blog', {
      layout: 'main',
      blogNavCat: true,
      titleShown: true,
      title: 'Journal',
      description: 'Journal of ' + siteName,
      keywords: 'journal,wedding,photography,film,lantos,istvan',
      bodyClass: 'blog',
      actualYear: actualYear,
      siteName: siteName,
      divClass: 'journal',
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

router.get('/:url', function (req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        layout: 'main',
        blogNavCat: true,
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
        bodyClass: 'error',
        actualYear: actualYear,
        siteName: siteName
      });
    }

    var articles = data[1].articles;

    // this will get you the first article matching the url
    var selectedArticle = articles.find(function(article) {
      return article.url === req.params.url;
    });

    // render your page with selectedArticle
    res.render('blog-article', {
      layout: 'main',
      blogNavCat: true,
      titleShown: true,
      title: selectedArticle.title,
      description: selectedArticle.description,
      keywords: selectedArticle.keywords,
      bodyClass: 'blog',
      actualYear: actualYear,
      siteName: siteName,
      data: selectedArticle
    });

  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
