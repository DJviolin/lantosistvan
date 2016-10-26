const express = require('express');
const functions = require('../lib/functions');
const config = require('../config/routes');

const router = express.Router();
const fsAsync = functions.fsAsync;
const articlesPerPage = config.articlesPerPage;

/////////////////////////////////////////////////////////////
// JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  //console.log(req.headers['accept-language']);
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();
      const slice = articles.slice(0, articlesPerPage);
      res.render('blog', {
        title: 'Journal',
        description: 'Blog Page',
        keywords: 'journal,wedding,photography,film,lantos,istvan',
        articles: slice,
        paginationFirst: false,
        paginationLast: true,
        paginationNext: 1,
        paginationParams: null,
        paginationParamsSlash: false,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

/////////////////////////////////////////////////////////////
// JOURNAL PAGES
/////////////////////////////////////////////////////////////

router.get('/page/:id', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();

      // Internal api request
      const count = parseInt(req.params.id, 10); // Page number as integer
      const countResult = count * articlesPerPage;
      const start = countResult + 0;
      const end = countResult + articlesPerPage;
      const slice = articles.slice(start, end);
      // Prev, next buttons under the blog
      const prev = count - 1;
      const next = count + 1;
      // Sum of all pages on the blog
      const pagesLength = articles.length / articlesPerPage;
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
        title: 'Journal',
        description: 'Blog page',
        keywords: 'journal,wedding,photography,film,lantos,istvan',
        articles: slice,
        paginationFirst,
        paginationLast,
        paginationPrev: prev,
        paginationNext: next,
        paginationFirstURL,
        paginationParams: null,
        paginationParamsSlash: false,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

/////////////////////////////////////////////////////////////
// ARTICLES BY URL
/////////////////////////////////////////////////////////////

router.get('/:url', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles;
      // this will get you the first article matching the url
      //const selectedArticle = articles.find(function(article) {
      //  return article.url === req.params.url;
      //});
      const selectedArticle = articles.find(article => article.url === req.params.url);
      // render your page with selectedArticle
      res.render('blogArticle', {
        title: selectedArticle.title,
        description: selectedArticle.description,
        keywords: selectedArticle.keywords,
        articles: selectedArticle,
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
