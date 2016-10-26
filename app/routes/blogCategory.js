const express = require('express');
const functions = require('../lib/functions');
const config = require('../config/routes');

const router = express.Router();
const fsAsync = functions.fsAsync;
const articlesPerPage = config.articlesPerPage;

/////////////////////////////////////////////////////////////
// ARTICLES BY CATEGORY
/////////////////////////////////////////////////////////////

router.get('/:cat', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();

      const q = articles.filter(article => article.category === req.params.cat);

      const slice = q.slice(0, articlesPerPage);

      const pagesLength = q.length / articlesPerPage;
      const pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages

      let paginationLast = true;
      if (pagesAll === 0) {
        paginationLast = false;
      }

      res.render('blog', {
        title: `Category: ${req.params.cat}`,
        description: 'Category page',
        keywords: 'category,wedding,photography,film,lantos,istvan',
        divClass: 'category',
        articles: slice,
        paginationFirst: false,
        paginationLast,
        paginationNext: 1,
        paginationParams: req.params.cat,
        paginationParamsSlash: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

/////////////////////////////////////////////////////////////
// ARTICLES BY CATEGORY PER PAGE
/////////////////////////////////////////////////////////////

router.get('/:cat/page/:id', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();

      const q = articles.filter(article => article.category === req.params.cat);

      //console.log(q);

      // Internal api request
      const count = parseInt(req.params.id, 10); // Page number as integer
      const countResult = count * articlesPerPage;
      const start = countResult + 0;
      const end = countResult + articlesPerPage;
      const slice = q.slice(start, end);
      // Prev, next buttons under the blog
      const prev = count - 1;
      const next = count + 1;
      // Sum of all pages on the blog
      const pagesLength = q.length / articlesPerPage;
      const pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages
      // Turn off pagination on the first page
      let paginationFirst = true;
      if (count === 0) {
        paginationFirst = false;
      }
      // Turn off pagination on the last page
      let paginationLast = true;
      if (count >= pagesAll) {
        paginationLast = false;
      }
      // Turn off /page/0 URL chunk on /page/1
      let paginationFirstURL = true;
      if (count === 1) {
        paginationFirstURL = false;
      }

      res.render('blog', {
        bodyClass: 'blog',
        active: { blog: true },
        titleShown: true,
        title: `Category: ${req.params.cat}`,
        description: 'Category page',
        keywords: 'category,wedding,photography,film,lantos,istvan',
        divClass: 'category',
        articles: slice,
        paginationFirst,
        paginationLast,
        paginationPrev: prev,
        paginationNext: next,
        paginationFirstURL,
        paginationParams: req.params.cat,
        paginationParamsSlash: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
