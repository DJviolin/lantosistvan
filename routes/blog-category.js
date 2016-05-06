'use strict';

const express = require('express'),
      router  = express.Router();

const config          = require('../config/routes'),
      articlesPerPage = config.articlesPerPage;

const functions = require('../lib/functions'),
      fsAsync   = functions.fsAsync;

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS ARTICLES BY CATEGORY
/////////////////////////////////////////////////////////////

router.get('/:cat', (req, res, next) => {
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

    const q = articles.filter((article) => article.category === req.params.cat);

    const slice = q.slice(0, articlesPerPage);
    const json = [{ articles: slice }];

    const pagesLength = q.length / articlesPerPage;
    const pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages

    let paginationLast = true;
    if(0 === pagesAll) {
      paginationLast = false;
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

router.get('/:cat/page/:id', (req, res, next) => {
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

    const q = articles.filter((article) => article.category === req.params.cat);

    //console.log(q);

    // Internal api request
    const count = parseInt(req.params.id); // Page number as integer
    const countResult = count * articlesPerPage;
    const start = countResult + 0;
    const end = countResult + articlesPerPage;
    const slice = q.slice(start, end);
    const json = [{ articles: slice }];
    // Prev, next buttons under the blog
    const prev = count - 1;
    const next = count + 1;
    // Sum of all pages on the blog
    const pagesLength = q.length / articlesPerPage;
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
