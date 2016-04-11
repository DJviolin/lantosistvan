# EXPRESS 5 MIGRATION & BEST PRACTICES

http://expressjs.com/en/guide/migrating-4.html

http://expressjs.com/en/guide/migrating-5.html

http://expressjs.com/en/advanced/best-practice-security.html

http://expressjs.com/en/advanced/best-practice-performance.html

http://expressjs.com/en/resources/middleware.html

http://expressjs.com/en/guide/error-handling.html

https://strongloop.com/strongblog/best-practices-for-express-in-production-part-one-security/

https://strongloop.com/strongblog/best-practices-for-express-in-production-part-two-performance-and-reliability/

# TODOS COMPLETED

Enable strict routing:

http://expressjs.com/en/api.html#app.set

http://expressjs.com/en/4x/api.html#router

https://github.com/ericf/express-slash

# FLEXBOX CHEATSHEET

http://stackoverflow.com/questions/32551291/in-css-flexbox-why-are-there-no-justify-items-and-justify-self-properties

# i18n

```
// https://www.npmjs.com/package/i18n
// https://github.com/mashpie/i18n-node
// https://gist.github.com/mashpie/5246334
// https://www.codementor.io/nodejs/tutorial/cookie-management-in-express-js
// https://github.com/expressjs/express/blob/master/examples/cookies/index.js
// http://stackoverflow.com/questions/31747021/i18n-node-2-express-and-a-handlebars-helper
// http://stackoverflow.com/questions/7760332/how-to-make-i18n-with-handlebars-js-mustache-templates/35752656#35752656
//
// https://www.npmjs.com/package/i18next
// https://github.com/i18next/i18next-express-middleware
// https://www.npmjs.com/package/i18next-express-middleware
// https://github.com/i18next/i18next-express-middleware

/*app.get('/', function (req, res) {
  if(req.query.lang === 'hu') { // http://127.0.0.1:3000/?lang=hu
    res.cookie('locale', 'hu', { maxAge: 900000, httpOnly: true });
  };
  if(req.query.lang === 'en') { // http://127.0.0.1:3000/?lang=en
    res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
  };
});*/

app.get('/cookie', function(req, res) { // http://127.0.0.1:3000/cookie
  res.send(req.cookies);
});
app.get('/clearcookie', function(req, res){ // http://127.0.0.1:3000/clearcookie
  res.clearCookie('locale');
  res.redirect('/cookie');
});

app.get('/p', function(req, res) { // http://127.0.0.1:3000/p?tagId=5
  res.send('tagId is set to ' + req.query.tagId);
});

```

# FLORALS

https://www.google.com/search?hl=hu-US&tbs=simg:CAES1wEa1AELEKjU2AQaBAgDCAoMCxCwjKcIGmEKXwgDEifNE8wTzgLQE8sT0RMEygLSE9QdriOOKagg4DePKdsr4SyyINopjSkaMK7pJP8G69Y9px3NM2MxjF9ZOrD5jQ2CT9JrEsybfvYvhbwtRl3JJa68kuK4QTI6bCADDAsQjq7-CBoKCggIARIE92UpiQwLEJ3twQkaQQoICgZmbG93ZXIKBwoFcGxhbnQKCgoIbGluZSBhcnQKDQoLY3V0IGZsb3dlcnMKEQoPZmxvd2VyaW5nIHBsYW50DA&tbm=isch&sa=X&ved=0ahUKEwjDh6XvxMrLAhWo93IKHR3GAgQQsw4ISA

http://www.freepik.com/index.php?goto=2&k=handdrawn&order=2&searchform=1&vars=4

https://www.google.hu/search?q=handdrawn+vector+graphic&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwj84P3y9snLAhWjvXIKHfCwAAgQsAQILQ&biw=1920&bih=945

http://www.freepik.com/index.php?goto=2&k=floral%20handdrawn&order=2&searchform=1&vars=2



# WEBSITES FOR DEVELOPMENT

http://whatsmyuseragent.com/

http://devicepixelratio.com/

# CSS NOTES

```
/* Mobile Menu */
/*
http://blog.adtile.me/2014/03/03/responsive-fixed-one-page-navigation/
http://www.adtile.me/fixed-nav/
https://github.com/adtile/fixed-nav
https://ftlabs.github.io/fastclick/
https://github.com/ftlabs/fastclick

http://www.roblukedesign.com/trunk/trunk.html
http://slicknav.com/
http://jordanm.co.uk/lab/topdrawer/
http://responsive-nav.com/
*/
```

```
/*
Three flex properties important to align:

Align items to vertical align: http://www.w3schools.com/cssref/css3_pr_align-items.asp

Justify content to horizontal align: http://www.w3schools.com/cssref/css3_pr_justify-content.asp

Align content for items on multi-lines inside a container: http://www.w3schools.com/cssref/css3_pr_align-content.asp



http://stackoverflow.com/questions/24313271/display-property-differences-for-inline-something

https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties

http://callmenick.com/_development/flexbox-examples/index2.html

Since youre working with flexbox, remove the flex divs width/height values (like height: 20vh)
and use the flex property instead:
http://www.w3schools.com/cssref/css3_pr_flex.asp
Example: flex: 0 0 auto

Another common flex property is the flex direction:;
http://www.w3schools.com/cssref/css3_pr_flex-direction.asp
used to set the divs direction (column or row) in a container.

Sometimes flex wrap is also necessary:
http://www.w3schools.com/cssref/css3_pr_flex-wrap.asp
Take a look in these 3 properties and I'm sure you'll get rid of these undesired scrolls.
*/
```

```
/*
https://css-tricks.com/centering-css-complete-guide/#both-unknown
http://stackoverflow.com/a/19791185/1442219
http://caniuse.com/#search=flex
https://css-tricks.com/using-flexbox/
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
https://css-tricks.com/designing-a-product-page-layout-with-flexbox/

http://css-tricks.com/centering-in-the-unknown/
https://github.com/kenwheeler/slick/issues/281
*/

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

# Desktop apps

http://electron.atom.io/

http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/

http://www.toptal.com/javascript/electron-cross-platform-desktop-apps-easy

http://appjs.com/

http://nwjs.io/

https://github.com/nwjs/nw.js

http://stackoverflow.com/questions/8794140/is-it-possible-to-create-desktop-applications-with-node-js

http://code.tutsplus.com/tutorials/introduction-to-html5-desktop-apps-with-node-webkit--net-36296

http://tutorialzine.com/2015/01/your-first-node-webkit-app/



# ORIGINAL REQUEST STRUCTURE

```
[ { articles: [ [Object], [Object], [Object], [Object], [Object] ] },
  { users: [ [Object], [Object] ] } ]
```

blog.js structure:

```
[ { articles: [ [Object], [Object] ] } ]
```

# TUTORIALS

http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/

# req.params vs req.query

http://expressjs.com/en/api.html

# Old code backups

Reach the second level JSON data:

```
{{#each data.0.articles}}
    <article class="id-{{this.id}}">
        <h1><a href="/journal/{{this.url}}">{{this.title}}</a></h1>
        <p>{{this.body}}</p>
    </article>

    {{else}}
        <p class="empty">No content</p>
{{/each}}
```

Note if you didn't have the second articles you would need to include square brackets around the index: `{{#each data.[0]}}`

See segment-literal syntax: `http://handlebarsjs.com/expressions.html`

## JSON GENERATOR

http://www.objgen.com/json?demo=true

```
articles[0]
  id = 0
  url = foo
  title = Foo
  body = some foo bar
  category= foo
  tags[] = foo
articles[1]
  id = 1
  url = foo-bar
  title = Foo bar
  body = more foo bar
  category = foo
  tags[] = foo, bar
articles[2]
  id = 2
  url = foo-bar-baz
  title = Foo bar baz
  body = more foo bar baz
  category = foo
  tags[] = foo, bar, baz


// Model & generate Live JSON data values
// interactively using a simple syntax.
// String is the default value type
product = Live JSON generator

// Number, Date & Boolean are also supported
// Specify types after property names
version n = 3.1
releaseDate d = 2014-06-25
demo b = true

// Tabs or spaces define complex values
person
  id number = 12345
  name = John Doe
  phones
    home = 800-123-4567
    mobile = 877-123-1234

  // Use [] to define simple type arrays
  email[] s = jd@example.com, jd@example.org
  dateOfBirth d = 1980-01-02
  registered b = true

  // Use [n] to define object arrays
  emergencyContacts[0]
    name s = Jane Doe
    phone s = 888-555-1212
    relationship = spouse
  emergencyContacts[1]
    name s = Justin Doe
    phone s = 877-123-1212
    relationship = parent

// See our Help page for additional info
// We hope you enjoy the tool!

```

## routes/api.js (Old Parts)

```
// http://stackoverflow.com/questions/35374031/referencing-child-objects-in-a-javascript-array-for-express-api/

// Fake posts database
/*var data =
[
  { articles:
    [
      { id: '0', url: 'audrey-hepburn', title: 'Audrey Hepburn', body: 'Nothing is impossible, the word itself says \'I\'m possible\'!', category: 'foo', tags: [ 'foo' ] },
      { id: '1', url: 'walt-disney', title: 'Walt Disney', body: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you.', category: 'foo', tags: [ 'foo', 'bar' ] },
      { id: '2', url: 'unknown', title: 'Unknown', body: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.', category: 'bar', tags: [ 'foo', 'bar', 'baz' ] },
      { id: '3', url: 'neale-donald-walsch', title: 'Neale Donald Walsch', body: 'You are afraid to die, and you\'re afraid to live. What a way to exist.', category: 'bar', tags: [ 'foo', 'bar', 'baz' ] }
    ]
  },
  { users:
    [
      { name: 'Admin' },
      { name: 'User' }
    ]
  }
];*/
```

## routes/api-backup.js

```
'use strict';

var express = require('express'),
    router = express.Router(),
    fs = require('fs');

// http://stackoverflow.com/questions/35374031/referencing-child-objects-in-a-javascript-array-for-express-api/

// Read database from json file
function fsAsync(callback) {
  fs.readFile(__dirname + '/../public/articles/data.json', 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }
    // Do anything else with the results (files) if you need to here
    //callback(null, data); // null means no error, return results in callback
    callback(null, JSON.parse(data)); // null means no error, return results in callback
  });
};

// Grabs everything from the api
// http://127.0.0.1:3000/api
router.get('/', function(req, res) {
  //res.json({ data: data });
  
  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    console.log(data);
    res.json({ data: data });
  });

  /*fs.readFile(__dirname + '/../public/articles/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
    res.json({ data: JSON.parse(data) });
  });*/

  /*if(data.length <= req.params.id || req.params.id < 0) {
    res.status = 404;
    res.json({ error: 'Empty query' });
  };*/
});




// Fake posts database
/*var data =
[
  { articles:
    [
      { id: '0', url: 'audrey-hepburn', title: 'Audrey Hepburn', body: 'Nothing is impossible, the word itself says \'I\'m possible\'!', category: 'foo', tags: [ 'foo' ] },
      { id: '1', url: 'walt-disney', title: 'Walt Disney', body: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you.', category: 'foo', tags: [ 'foo', 'bar' ] },
      { id: '2', url: 'unknown', title: 'Unknown', body: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.', category: 'bar', tags: [ 'foo', 'bar', 'baz' ] },
      { id: '3', url: 'neale-donald-walsch', title: 'Neale Donald Walsch', body: 'You are afraid to die, and you\'re afraid to live. What a way to exist.', category: 'bar', tags: [ 'foo', 'bar', 'baz' ] }
    ]
  },
  { users:
    [
      { name: 'Admin' },
      { name: 'User' }
    ]
  }
];

// Grabs everything from the api
// http://127.0.0.1:3000/api
router.get('/', function(req, res) {
  res.json({ data: data });

  if(data.length <= req.params.id || req.params.id < 0) {
    res.status = 404;
    res.json({ error: 'Empty query' });
  };
});*/




// Grabs every articles
// http://127.0.0.1:3000/api/articles
router.get('/articles', function(req, res) {
  /*var articles = data[0].articles;
  res.json(articles);*/

  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[0].articles;
    res.json(articles);
  });
});

// Grabs single article by url
// Match any field like "url" and not just the index "id" in the array
// http://127.0.0.1:3000/api/articles/url/foo
router.get('/articles/url/:id', function(req, res) {
  /*var articles = data[0].articles;
  var q = articles.filter(function (article) {
    // return article.id === req.params.id;
    return article.url === req.params.id;
  });
  res.json(q[0]);*/

  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[0].articles;
    var q = articles.filter(function (article) {
      // return article.id === req.params.id;
      return article.url === req.params.id;
    });
    res.json(q[0]);
  });
});

// Grabs article by category
// http://127.0.0.1:3000/api/articles/category/foo
router.get('/articles/category/:id', function(req, res) {
  /*var articles = data[0].articles;
  var q = articles.filter(function (article) {
    return article.category === req.params.id;
  });
  res.json(q);*/

  fsAsync(function(err, data) {
    if (err) {
      return res.send(err);
    }
    var articles = data[0].articles;
    var q = articles.filter(function (article) {
      return article.category === req.params.id;
    });
    res.json(q);
  });
});

// Grabs articles by categories and tags
// http://127.0.0.1:3000/api/articles/category/foo/tag/bar
router.get('/articles/category/:cat/tag/:tag', function(req, res) {
  var articles = data[0].articles;
  var q = articles.filter(function (article) {
    return article.category === req.params.cat && article.tags.some(function(tagId) { return tagId === req.params.tag; });
  });
  //res.json(req.params);
  res.json(q);
});

// Grabs articles by tag
// http://127.0.0.1:3000/api/articles/tag/foo
router.get('/articles/tag/:id', function(req, res) {
  var articles = data[0].articles;
  var q = articles.filter(function (article) {
    return article.tags.some(function(tagId) { return tagId === req.params.id;});
  });
  res.json(q);
});

// Grabs random url (every other route should below this)
// http://127.0.0.1:3000/api/articles/random
router.get('/articles/random', function(req, res) {
  var articles = data[0].articles;
  var id = Math.floor(Math.random() * articles.length);
  var q = articles[id];
  res.json(q);
});

module.exports = router;
```

## app.js

```
/////////////////////////////////////////////////////////////
// VIEW ENGINE SETUP
/////////////////////////////////////////////////////////////

app.set('views', './views-jade');
app.set('view engine', 'jade');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
};
```

## routes/home.js

```
'use strict';

var express = require('express'),
    router = express.Router();
var glob = require('glob');

var functions = require('../functions');
functions.hello(); // "Hello World!"

function globAsync(params, callback) {
  glob(params.wildcard || '*.jpg', {
    cwd: params.cwd || 'public/portfolio/weddings/',
    sort: true
  }, function(err, files) {
    if (err) {
      return callback(err);
    }
    // Do anything else with the results (files) if you need to here
    callback(null, files);  // null means no error, return results in callback
  });
}

router.get('/', function(req, res, next) {
  globAsync({
    wildcard: '*.jpg',   // use default in globAsync if not passed in
    cwd: 'public/portfolio/weddings/' // use default in globAsync if not passed in
  }, function(err, results) {
    if (err) {
      return res.send(err);
    }
    res.render('portfolio', {
      layout: 'main',
      centering: true,
      titleShown: false,
      title: 'Hi!',
      description: 'Home page of Lantos Istvan Photography',
      keywords: 'wedding,photography,film,lantos,istvan',
      bodyClass: 'horizontal',
      imagesFolder: '\/portfolio\/weddings\/',
      images: results
    });
  });
});

/*
http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
https://github.com/maxogden/art-of-node#callbacks
You should make globResults a parameter of the globCaller (and an argument of the callback call).
images: globCaller() makes no sense.
If you want an array, why do you pass the results through JSON.stringify()? Just remove that line.
*/
/*var globResults = undefined;
function globAsync(callback) {
  glob('*.jpg', { cwd: 'public/portfolio/weddings/', sort: true }, function (err, files) {
    //var results = '\''+files.join('\',\'')+'\'';
    //globResults = '[' + results + ']';
    var results = JSON.stringify(files);
    globResults = results;
    callback();
  });
};
function globCaller() {
  //var g = JSON.stringify(globResults); // convert JS function to String
  var g = globResults;
  console.log('STRING: ' + g);
  return g;
};
globAsync(globCaller); // This will init globCaller()

/* GET home page. */
/*router.get('/', function(req, res, next) {
  glob('*.jpg', { cwd: 'public/portfolio/weddings/', sort: true }, function (err, files) {
    var results = files;
    res.render('portfolio', {
      layout: 'main',
      centering: true,
      titleShown: false,
      title: 'Hi!',
      description: 'Home page of Lantos Istvan Photography',
      keywords: 'wedding,photography,film,lantos,istvan',
      bodyClass: 'horizontal',
      imagesFolder: '\/portfolio\/weddings\/',
      images: results
    });
  });
});*/

/* GET home page. *
router.get('/', function(req, res, next) {
  res.render('portfolio', {
    layout: 'main',
    centering: true,
    titleShown: false,
    title: 'Hi!',
    description: 'Home page of Lantos Istvan Photography',
    keywords: 'wedding,photography,film,lantos,istvan',
    bodyClass: 'horizontal',
    imagesFolder: '\/portfolio\/weddings\/',
    images: [
      'image-1',
      'image-2',
      'image-3',
      'image-4',
      'image-5',
      'image-6',
      'image-7',
      'image-8',
      'image-9',
      'image-10',
      'image-11',
      'image-12',
      'image-13',
      'image-14',
      'image-15',
      'image-16',
      'image-17',
      'image-18',
      'image-19',
      'image-20',
      'image-21',
      'image-22',
      'image-23',
      'image-24',
      'image-25',
      'image-26',
      'image-27',
      'image-28',
      'image-29',
      'image-30',
      'image-31',
      'image-32',
      'image-33',
      'image-34',
      'image-35',
      'image-36',
      'image-37',
      'image-38',
      'image-39',
      'image-40',
      'image-41',
      'image-42',
      'image-43',
      'image-44',
      'image-45',
      'image-46',
      'image-47',
      'image-48',
      'image-49',
      'image-50',
      'image-51',
      'image-52',
      'image-53',
      'image-54',
      'image-55',
      'image-56',
      'image-57',
      'image-58',
      'image-59',
      'image-60',
      'image-61',
      'image-62',
      'image-63',
      'image-64'
    ]
  });
});*/

module.exports = router;
```
