const express = require('express');
const router = express.Router();
//const glob    = require('glob');

const functions = require('../lib/functions');
const fsAsync = functions.fsAsync;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data
// $ curl -d user=Lanti -H Accept:application/json --url http://127.0.0.1:8081/profile
// $ curl -d user=Lanti --header "Content-Type: application/json" --url http://127.0.0.1:8081/profile
// $ curl -d {"user":"Lanti"} -H Accept:application/json --url http://127.0.0.1:8081/profile
// $ curl -d {"user":"Lanti"} -H "Content-Type: application/json" --url http://127.0.0.1:8081/profile
//router.post('/profile', upload.array(), (req, res, next) => {
/*router.post('/profile', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.json(JSON.stringify(req.body));
});*/

// $ curl http://127.0.0.1:8081/hu/test
/*router.get('/test', (req, res) => {
  // The form's action is '/test' and its method is 'POST',
  // so the `app.post('/test', ...` route will receive the
  // result of our form
  const html =
  '<form action="/" method="post">\n\
     Enter your name:\n\
     <input type="text" name="userName" placeholder="..." />\n\
     <br>\n\
     <button type="submit">Submit</button>\n\
  </form>';
  res.send(html);
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
router.post('/test', (req, res) => {
  const userName = req.body.userName;
  const html =
  `Hello: ${userName}.<br>\n\
  <a href="/">Try again.</a>`;
  res.send(html);
});*/

router.route('/test')
  .get((req, res) => {
    const html =
      '<form action="" method="POST">\n\
         Enter your name:\n\
         <input type="text" name="userName" placeholder="..." />\n\
         <br>\n\
         <button type="submit">Submit</button>\n\
      </form>';
    res.send(html);
  })
  .post((req, res) => {
    const userName = req.body.userName;
    const html =
      `Hello: ${userName}.<br>\n\
      <a href="/">Try again.</a>`;
    res.send(html);
  });

// POST /api/users gets JSON bodies
router.post('/profile', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
    // create user in req.body
    console.log(JSON.stringify(req.body));
    return res.json(JSON.stringify(req.body));
  }
});

/////////////////////////////////////////////////////////////
// INTERNAL API
// RETURNS JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

/*router.get('/', (req, res) => {
  fsAsync((err, data) => {
    if(err) {
      res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404'
      });
    }

    const gallery = data[0].gallery.portfolio.love;
    //const json = gallery;
    //console.log(json);

    const articles = data[1].articles.reverse();
    const slice = articles.slice(0, 6);
    const json = [{ articles: slice }];

    res.render('index', {
      //layout: 'main',
      bodyClass: 'index',
      active: { index: true },
      titleShown: false,
      title: 'Hi!',
      description: 'Home page',
      keywords: 'wedding,photography,film,lantos,istvan',
      data: gallery,
      latestPosts: json
    });
  });
});*/

/*router.get('/', async (req, res, err) => {
  try {
    await fsAsync((err, data) => {
      if(err) {
        res.render('404', {
          titleShown: true,
          title: 'Error 404',
          description: 'Error 404',
          keywords: 'error,404'
        });
      }
      const gallery = data[0].gallery.portfolio.love;
      const articles = data[1].articles.reverse();
      const slice = articles.slice(0, 6);
      const json = [{ articles: slice }];
      res.status(200).render('index', {
        //layout: 'main',
        bodyClass: 'index',
        active: { index: true },
        titleShown: false,
        title: 'Hi!',
        description: 'Home page',
        keywords: 'wedding,photography,film,lantos,istvan',
        data: gallery,
        latestPosts: json
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get('/', (req, res) => {
  fsAsync()
    .then((data) => {
      const gallery = data[0].gallery.portfolio.love;
      const articles = data[1].articles.reverse();
      const slice = articles.slice(0, 6);
      const json = [{ articles: slice }];
      //console.log(json);
      res.render('index', {
        //layout: 'main',
        bodyClass: 'index',
        active: { index: true },
        titleShown: false,
        title: 'Hi!',
        description: 'Home page',
        keywords: 'wedding,photography,film,lantos,istvan',
        data: gallery,
        latestPosts: json,
      });
    })
    .catch((err) => {
      // handle the error from either file-one or file-two
      console.error(err);
      res.render('404', {
        titleShown: true,
        title: 'Error 404',
        description: 'Error 404',
        keywords: 'error,404',
      });
    });
});

/////////////////////////////////////////////////////////////
// INTERNAL API WITH GLOB
// RETURNS JOURNAL FRONTPAGE
/////////////////////////////////////////////////////////////

/* GET home page. */
/*router.get('/', (req, res, next) => {
  glob('*.jpg', { cwd: 'public/portfolio/weddings/', sort: true }, (err, images) => {
    const results = images;
    res.render('portfolio', {
      //layout: 'main',
      active: { index: false },
      titleShown: false,
      title: 'Hi!',
      description: 'Home page',
      keywords: 'wedding,photography,film,lantos,istvan',
      imagesFolder: '\/portfolio\/weddings\/',
      images: results
    });
  });
});*/

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
