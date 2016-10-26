const express = require('express');
const functions = require('../lib/functions');
const config = require('../config/routes');

const router = express.Router();
const fsAsync = functions.fsAsync;
const articlesPerPage = config.articlesPerPage;

/////////////////////////////////////////////////////////////
// ARTICLES BY TAGS
/////////////////////////////////////////////////////////////

router.get('/:tag', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();

      // See if the tag is in the array with IndexOf
      const q = articles.filter((callback) => {
        let tagInArray = false;
        callback.tags.forEach((tag) => {
          if (tag === req.params.tag) {
            tagInArray = true;
          }
        });
        return tagInArray;
      });

      //console.log(q);

      // Internal api request
      const slice = q.slice(0, articlesPerPage);
      // Sum of all pages on the blog
      const pagesLength = q.length / articlesPerPage;
      const pagesAll = Math.ceil(pagesLength) - 1; // Sum of all pages
      // Turn off pagination on the last page
      let paginationLast = true;
      if (pagesAll === 0) {
        paginationLast = false;
      }

      res.render('blog', {
        title: `Tag: ${req.params.tag}`,
        description: 'Tags page',
        keywords: 'tag,wedding,photography,film,lantos,istvan',
        articles: slice,
        paginationFirst: false,
        paginationLast,
        paginationNext: 1,
        paginationParams: req.params.tag,
        paginationParamsSlash: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('404');
    });
});

////////////////////////////////////////////////////////////
// ARTICLES BY TAGS PER PAGE
/////////////////////////////////////////////////////////////

router.get('/:tag/page/:id', (req, res) => {
  fsAsync()
    .then((data) => {
      const articles = data[1].articles.reverse();

      // See if the tag is in the array with IndexOf
      const q = articles.filter((callback) => {
        let tagInArray = false;
        callback.tags.forEach((tag) => {
          if (tag === req.params.tag) {
            tagInArray = true;
          }
        });
        return tagInArray;
      });

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
        title: `Tag: ${req.params.tag}`,
        description: 'Tags page',
        keywords: 'tag,wedding,photography,film,lantos,istvan',
        articles: slice,
        paginationFirst,
        paginationLast,
        paginationPrev: prev,
        paginationNext: next,
        paginationFirstURL,
        paginationParams: req.params.tag,
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
