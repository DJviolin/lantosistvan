'use strict';

var express = require('express'),
    router  = express.Router();

var config          = require('../config'),
    articlesPerPage = config.articlesPerPage;

var functions = require('../lib/functions'),
    fsAsync   = functions.fsAsync;

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY CATEGORY
/////////////////////////////////////////////////////////////

router.get('/:cat', function (req, res, next) {
  fsAsync(function(err, data) {
    if (err) {
      return res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    var articles = data[1].articles.reverse();

    var q = articles.filter(function (article) {
      return article.category === req.params.cat;
    });

    var slice = q.slice(0, articlesPerPage);
    var json = [{ articles: slice }];

    var pagesLength = q.length / articlesPerPage;
    var pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages

    var paginationLast = true;
    if(0 === pagesAll) {
      var paginationLast = false;
    };

    res.render('blog', {
      active: { blog: true },
      titleShown: true,
      title: 'Category: ' + req.params.cat,
      description: 'Category page',
      keywords: 'category,wedding,photography,film,lantos,istvan',
      divClass: 'category',
      data: json,
      paginationFirst: false,
      paginationLast: paginationLast,
      paginationNext: 1,
      paginationParams: req.params.cat,
      paginationParamsSlash: true
    });
  });
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY CATEGORY PER PAGE
/////////////////////////////////////////////////////////////

router.get('/:cat/page/:id', function (req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }
    
    var articles = data[1].articles.reverse();

    var q = articles.filter(function (article) {
      return article.category === req.params.cat;
    });

    //console.log(q);

    // Internal api request
    var count = parseInt(req.params.id); // Page number as integer
    var countResult = count * articlesPerPage;
    var start = countResult + 0;
    var end = countResult + articlesPerPage;
    var slice = q.slice(start, end);
    var json = [{ articles: slice }];
    // Prev, next buttons under the blog
    var prev = count - 1;
    var next = count + 1;
    // Sum of all pages on the blog
    var pagesLength = q.length / articlesPerPage;
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
      active: { blog: true },
      titleShown: true,
      title: 'Category: ' + req.params.cat,
      description: 'Category page',
      keywords: 'category,wedding,photography,film,lantos,istvan',
      divClass: 'category',
      data: json,
      paginationFirst: paginationFirst,
      paginationLast: paginationLast,
      paginationPrev: prev,
      paginationNext: next,
      paginationFirstURL: paginationFirstURL,
      paginationParams: req.params.cat,
      paginationParamsSlash: true
    });
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
