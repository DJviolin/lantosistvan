'use strict';

var express = require('express'),
    router  = express.Router();

var config          = require('../config'),
    apiToken        = config.apiToken,
    articlesPerPage = config.articlesPerPage;

var functions = require('../lib/functions');
var fsAsync   = functions.fsAsync;

/////////////////////////////////////////////////////////////
// GRABS EVERYTHING FROM THE API ROOT (FOR TESTING)
// http://127.0.0.1:3000/api/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if(err) {
      //return res.send(err);
      return res.status(404).json({ error: 'Empty query' }); // New method (Express 5)
    }

    var apiAll = data;
    var q = apiAll.filter(function (article) {
      return article && apiToken === req.params.token;
    });
    res.status(200).json({ data: q }); // New method (Express 5)
  });
});

/////////////////////////////////////////////////////////////
// GRABS EVERY ARTICLES BY LATEST (FOR TESTING)
// http://127.0.0.1:3000/api/articles/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      //return res.send(err);
      return res.status(404).json({ error: 'Empty query' }); // New method (Express 5)
    }
    var articles = data[1].articles.reverse();

    var q = articles.filter(function (article) {
      return article && apiToken === req.params.token;
    });
    res.status(200).json(q); // New method (Express 5)
  });
});

/////////////////////////////////////////////////////////////
// GRABS EVERY ARTICLES PER PAGES BY LATEST
// http://127.0.0.1:3000/api/articles/page/0/2/order/adddate/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/page/:start/:end/order/:order/auth/:token', function(req, res) {
//router.get('/articles/page/:id/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      //return res.send(err);
      return res.status(404).json({ error: 'Empty query' }); // New method (Express 5)
    }

    if(req.params.order === 'adddate') {
      var articles = data[1].articles.reverse();
    }
    else {
      var articles = data[1].articles;
    }

    var start = req.params.start;
    var end = req.params.end;
    var slice = articles.slice(start, end);

    var q = slice.filter(function (article) {
      return article && apiToken === req.params.token;
    });
    // (0*2+0=0, 0*2+2=2), (1*2+0=2, 1*2+2=4), (2*2+0=4, 2*2+2=6), (3*2+0=6, 3*2+2=8)
    res.status(200).json(q); // New method (Express 5)
  });
});

/////////////////////////////////////////////////////////////
// RETURNS ARTICLE PAGE COUNT
// http://127.0.0.1:3000/api/articles/pagecount
// TOKEN NEEDS TO BE FIXED
/////////////////////////////////////////////////////////////

router.get('/articles/pagecount', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles;

    var pagesLength = articles.length / articlesPerPage;
    var pagesLengthCeil = Math.ceil(pagesLength); // Sum of all pages

    res.json({ pagesLengthCeil: pagesLengthCeil });
  });
});

/////////////////////////////////////////////////////////////
// GRABS SINGLE ARTICLE BY URL
// http://127.0.0.1:3000/api/articles/url/foo/auth/<API-TOKEN>
// Match any field like "url" and not just the index "id"
/////////////////////////////////////////////////////////////

router.get('/articles/url/:id/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles;
    var q = articles.filter(function (article) {
      // return article.id === req.params.id;
      return article.url === req.params.id && apiToken === req.params.token;
    });
    res.json(q[0]);
  });
});

/////////////////////////////////////////////////////////////
// GRABS ARTICLES BY CATEGORY BY LATEST
// http://127.0.0.1:3000/api/articles/category/foo/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/category/:id/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles.reverse();
    var q = articles.filter(function (article) {
      return article.category === req.params.id && apiToken === req.params.token;
    });
    res.json(q);
  });
});

/////////////////////////////////////////////////////////////
// GRABS ARTICLES BY TAGS BY LATEST
// http://127.0.0.1:3000/api/articles/tag/foo/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/tag/:id/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles.reverse();
    var q = articles.filter(function (article) {
      return article.tags.some(function(tagId) { return tagId === req.params.id;}) && apiToken === req.params.token;
    });
    res.json(q);
  });
});

/////////////////////////////////////////////////////////////
// GRABS ARTICLES BY CATEGORIES AND TAGS BY LATEST
// http://127.0.0.1:3000/api/articles/category/foo/tag/bar/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/category/:cat/tag/:tag/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles.reverse();
    var q = articles.filter(function (article) {
      //return article.category === req.params.cat && article.tags.some(function(tagId) { return tagId === req.params.tag; });
      return article.category === req.params.cat && article.tags.indexOf(req.params.tag) !== -1 && apiToken === req.params.token;
      // PROBLEM: It is doing the category test repeatedly now (which is not needed),
      // moved the article.category === req.params.cat inside the some callback function,
      // this actually multiply the execution of that test, which will always be the same.
    });
    //res.json(req.params); // Debugging
    res.json(q);
  });
});

/////////////////////////////////////////////////////////////
// GRABS RANDOM URL (FOR TESTING)
// http://127.0.0.1:3000/api/articles/random/auth/<API-TOKEN>
/////////////////////////////////////////////////////////////

router.get('/articles/random/auth/:token', function(req, res) {
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[1].articles;
    var id = Math.floor(Math.random() * articles.length);
    var q = articles[id];
    res.json(q) && apiToken === req.params.token;
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS MODULE
/////////////////////////////////////////////////////////////

module.exports = router;
