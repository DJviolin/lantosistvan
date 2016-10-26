const express = require('express');
const functions = require('../lib/functions');

const router = express.Router();
const fsAsync = functions.fsAsync;

/////////////////////////////////////////////////////////////
// Frontpage
/////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  fsAsync()
    .then((data) => {
      const gallery = data[0].gallery.portfolio.love;
      const articles = data[1].articles.reverse();
      const latestPosts = articles.slice(0, 6);
      res.render('index', {
        gallery,
        latestPosts,
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
