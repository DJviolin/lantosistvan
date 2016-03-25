'use strict';

var express = require('express'),
    router  = express.Router();

var config          = require('../config'),
    articlesPerPage = config.articlesPerPage;

var functions = require('../lib/functions'),
    fsAsync   = functions.fsAsync,
    actualYear = functions.actualYear;

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY TAGS
/////////////////////////////////////////////////////////////

router.get('/:tag', function (req, res, next) {
  fsAsync(function(err, data) {
    if (err) {
      return res.render('404', {
        layout: 'main',
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
        actualYear: actualYear
      });
    }

    var articles = data[1].articles.reverse();

    // See if the tag is in the array with IndexOf
    var q = articles.filter(function (callback) {
      var tagInArray = false;
      callback.tags.forEach(function(tag){
        if(tag === req.params.tag){
          tagInArray = true;
        }
      });
      return tagInArray;
    });

    //console.log(q);

    // Internal api request
    var slice = q.slice(0, articlesPerPage);
    var json = [{ articles: slice }];
    // Sum of all pages on the blog
    var pagesLength = q.length / articlesPerPage;
    var pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages
    // Turn off pagination on the last page
    var paginationLast = true;
    if(0 === pagesAll) {
      var paginationLast = false;
    };

    // Rendering content
    res.render('blog', {
      layout: 'main',
      titleShown: true,
      title: 'Tag: ' + req.params.tag,
      description: 'Tags page',
      keywords: 'tag,wedding,photography,film,lantos,istvan',
      actualYear: actualYear,
      divClass: 'tag',
      data: json,
      paginationFirst: false,
      paginationLast: paginationLast,
      paginationNext: 1,
      paginationParams: req.params.tag,
      paginationParamsSlash: true
    });
  });
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY TAGS PER PAGE
/////////////////////////////////////////////////////////////

router.get('/:tag/page/:id', function (req, res, next) {
  fsAsync(function (err, data) {
    if (err) {
      return res.render('404', {
        layout: 'main',
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
        actualYear: actualYear
      });
    }
    
    var articles = data[1].articles.reverse();

    // See if the tag is in the array with IndexOf
    var q = articles.filter(function (callback) {
      var tagInArray = false;
      callback.tags.forEach(function(tag){
          if(tag === req.params.tag){
            tagInArray = true;
          }
      });
      return tagInArray;
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
      layout: 'main',
      titleShown: true,
      title: 'Tag: ' + req.params.tag,
      description: 'Tags page',
      keywords: 'tag,wedding,photography,film,lantos,istvan',
      actualYear: actualYear,
      divClass: 'tag',
      data: json,
      paginationFirst: paginationFirst,
      paginationLast: paginationLast,
      paginationPrev: prev,
      paginationNext: next,
      paginationFirstURL: paginationFirstURL,
      paginationParams: req.params.tag,
      paginationParamsSlash: true
    });
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
