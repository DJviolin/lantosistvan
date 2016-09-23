## gulp

```
// ES6: 'use strict' is unnecessary inside of modules.
// http://node.green
// http://es6-features.org/#ExpressionBodies
// http://es6-features.org/#DefaultParameterValues
// http://es6-features.org/#StringInterpolation
// http://es6-features.org/#CustomInterpolation
// http://es6-features.org/#PropertyShorthand
// http://es6-features.org/#ValueExportImport

// https://gist.github.com/demisx/beef93591edc1521330a
// http://stackoverflow.com/questions/32475614/gulp-4-gulpfile-js-set-up
// https://gist.github.com/CodeTheory/cc7d79d1dad0622a9f9c
// https://blog.wearewizards.io/migrating-to-gulp-4-by-example
// https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/
```

## Flexbox CHEATSHEET

https://chriswrightdesign.com/experiments/flexbox-adventures/

https://css-tricks.com/snippets/css/a-guide-to-flexbox/

https://kyusuf.com/post/almost-complete-guide-to-flexbox-without-flexbox

https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties

## V8 Experimental features

Strong mode:

https://github.com/v8/v8/wiki/Experiments%20with%20Strengthening%20JavaScript

Webassembly:

```
https://www.npmjs.com/package/wasm
https://github.com/nodejs/NG/issues/19
https://brendaneich.com/2015/06/from-asm-js-to-webassembly/
http://v8project.blogspot.hu/2016/03/experimental-support-for-webassembly.html
https://hacks.mozilla.org/2016/03/a-webassembly-milestone/
https://blogs.windows.com/msedgedev/2016/03/15/previewing-webassembly-experiments/
https://github.com/WebAssembly/design/blob/master/TextFormat.md#official-text-format
https://medium.com/javascript-scene/what-is-webassembly-the-dawn-of-a-new-era-61256ec5a8f6#.5bzwl1ec2
https://medium.com/javascript-scene/why-we-need-webassembly-an-interview-with-brendan-eich-7fb2a60b0723#.gpm5vcbxy
http://llvm.org/docs/doxygen/html/WebAssembly_8h.html
http://moduscreate.com/webassembly-explained/

http://bytearcher.com/articles/run-java-natively-in-browser-with-webassembly/

https://hacks.mozilla.org/2015/12/compiling-to-webassembly-its-happening/

http://www.planetnodejs.com/article/55944c97c18fa30e001b6c53/the-future-of-programming-webassembly-life-after-javascript

https://webassembly.github.io/demo/

# Compiling to JS and ASM.js:
https://www.unrealengine.com/what-is-unreal-engine-4
https://www.reddit.com/r/gamedev/comments/3tnvb2/unrealjs_released_unrealengine_javascript/
https://github.com/ncsoft/Unreal.js

https://unity3d.com/unity/multiplatform
```

https://github.com/webassembly

http://webassembly.github.io/

https://www.w3.org/community/webassembly/

V8 Ignition:

https://github.com/v8/v8/wiki/Interpreter

https://news.ycombinator.com/item?id=10034068

https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit

http://mshockwave.blogspot.hu/2016/03/ignition-interpreter-in-v8-javascript.html

http://v8project.blogspot.hu/

TurboFan & Crankshaft optimization killers:

https://arewefastyet.com/

https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

https://github.com/vhf/v8-bailout-reasons












```
https://nodejs.org/en/docs/es6/

https://github.com/gulpjs/gulp/issues/1571
https://github.com/gulpjs/gulp/blob/4.0/CHANGELOG.md
https://github.com/gulpjs/gulp/tree/4.0/docs/recipes
$ npm info graceful-fs -v
$ npm ls graceful-fs
$ npm info gulp dist-tags

"gulp": ">= 3.9.1",

$ npm install gulpjs/gulp.git#4.0 --save-dev
"devDependencies": { "gulp": "github:gulpjs/gulp#4.0" }

Run the following to check the version of gulp cli that is installed on your machine.
$ gulp -v
If you are not running version 4, do the following to install gulp globally on your machine.
$ npm uninstall -g gulp
$ npm install -g "gulpjs/gulp#4.0"
Now install gulp 4 locally
$ npm uninstall gulp --save-dev
$ npm install "gulpjs/gulp#4.0" --save-dev

$ npm update --no-optional
$ npm install --no-optional
```

##### TODO

https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-16-04-server?utm_content=buffer036d0&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer

Docker + Nginx + Reverse Proxy:

https://www.digitalocean.com/community/tutorials/docker-explained-how-to-containerize-and-use-nginx-as-a-proxy

https://developer.atlassian.com/blog/2016/01/docker-cluster-reverse-proxy-1/



nginScript:
https://www.nginx.com/blog/launching-nginscript-and-looking-ahead/



Redirecting URL to localhost:

https://www.namecheap.com/support/knowledgebase/article.aspx/9678/77/how-to-redirect-subdomain-to-a-certain-ip-address-along-with-a-port

Find out my public ip address:

```
$ curl -s checkip.dyndns.org | sed -e 's/.*Current IP Address: //' -e 's/<.*$//'
$ wget http://ipinfo.io/ip -qO -
$ curl ipecho.net/plain ; echo
$ dig +short myip.opendns.com @resolver1.opendns.com
```

Nginx common misconfiguration errors:

https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#root-inside-location-block

Nginx Mail Server:

http://nginx.org/en/docs/mail/ngx_mail_core_module.html

https://www.nginx.com/resources/admin-guide/mail-proxy/

http://blog.siphos.be/2012/12/nginx-as-reverse-smtp-proxy/

http://serverfault.com/a/331547/319692

https://www.digitalocean.com/community/tutorials/how-to-install-and-setup-postfix-on-ubuntu-14-04



Securing Nginx:

https://www.nginx.com/blog/7-tips-for-faster-http2-performance/

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-on-ubuntu-14-04

https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04

https://community.letsencrypt.org/t/can-i-generate-a-letsencrypt-cert-in-local-host-for-a-domain-i-own/3336/8

https://community.letsencrypt.org/t/can-i-test-lets-encrypt-client-on-localhost/15627/4

https://community.letsencrypt.org/t/certificates-for-hosts-on-private-networks/174/2

https://github.com/letsencrypt/boulder/issues/137

https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04

https://www.nginx.com/blog/nginx-1-9-5/




Nginx caching & reverse proxy:

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04

https://www.nginx.com/blog/5-performance-tips-for-node-js-applications/

http://stackoverflow.com/questions/9967887/node-js-itself-or-nginx-frontend-for-serving-static-files

http://expressjs.com/en/advanced/best-practice-performance.html

http://expressjs.com/en/guide/behind-proxies.html

https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/

http://nginx.org/en/docs/http/ngx_http_gzip_module.html

https://serversforhackers.com/nginx-caching

https://www.sitepoint.com/configuring-nginx-ssl-node-js/

https://www.youtube.com/watch?v=FJrs0Ar9asY

http://serverfault.com/questions/601332/how-to-configure-nginx-so-it-works-with-express

Nginx Websocket proxy:

https://www.nginx.com/blog/websocket-nginx/

https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/

http://www.tutorialspoint.com/articles/how-to-configure-nginx-as-reverse-proxy-for-websocket












# Heroku

```
$ heroku login
$ heroku create --ssh-git
https://limitless-beyond-38616.herokuapp.com/ | https://git@heroku.com/limitless-beyond-38616.git
$ git remote -v
$ git push heroku master
$ heroku ps:scale web=1
$ heroku open
$ heroku logs --tail
$ heroku ps
```

# MongoDB

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Installing MongoDB Service and Start:

```
$ "C:\mongodb\bin\mongod.exe" --config "C:\mongodb\mongod.cfg" --install
$ net start MongoDB
```

Accessing MongoDB Shell:

```
$ mongo
```

Removing MongoDB Service and Stop:

```
$ net stop MongoDB
$ "C:\mongodb\bin\mongod.exe" --remove
```















Lwan routing capabilities:

https://github.com/lpereira/lwan/issues/156

https://github.com/adam-hanna/lwan-mustache-c

https://tia.mat.br/posts/2012/11/11/mustache_templates_in_c.html

Change the settings in `app/config.js` if you wish.

Nginx default build flags:

```
nginx version: nginx/1.11.1
built by gcc 4.9.2 (Debian 4.9.2-10)
built with OpenSSL 1.0.1k 8 Jan 2015 (running with OpenSSL 1.0.1t  3 May 2016)
TLS SNI support enabled
configure arguments:
--prefix=/etc/nginx
--sbin-path=/usr/sbin/nginx
--modules-path=/usr/lib/nginx/modules
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log
--http-log-path=/var/log/nginx/access.log
--pid-path=/var/run/nginx.pid
--lock-path=/var/run/nginx.lock
--http-client-body-temp-path=/var/cache/nginx/client_temp
--http-proxy-temp-path=/var/cache/nginx/proxy_temp
--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp
--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp
--http-scgi-temp-path=/var/cache/nginx/scgi_temp
--user=nginx
--group=nginx
--with-http_ssl_module
--with-http_realip_module
--with-http_addition_module
--with-http_sub_module
--with-http_dav_module
--with-http_flv_module
--with-http_mp4_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_random_index_module
--with-http_secure_link_module
--with-http_stub_status_module
--with-http_auth_request_module
--with-http_xslt_module=dynamic
--with-http_image_filter_module=dynamic
--with-http_geoip_module=dynamic
--with-http_perl_module=dynamic
--add-dynamic-module=debian/extra/njs-1c50334fbea6/nginx
--with-threads
--with-stream
--with-stream_ssl_module
--with-http_slice_module
--with-mail
--with-mail_ssl_module
--with-file-aio
--with-ipv6
--with-http_v2_module
--with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2'
--with-ld-opt='-Wl,-z,relro -Wl,--as-needed'
```





























# AJAX

http://mherman.org/blog/2013/10/20/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/

# package.json uncommented

```
"babel-core": ">= 6.7.7",
"babel-preset-es2015": ">= 6.6.0"
```

Rename `gulpfile.js` to `gulpfile.babel.js`

# Arrow functions

http://tc39wiki.calculist.org/es6/arrow-functions/

http://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

Arrow functions are anonymous and change the way `this` binds in functions.
Arrow functions make our code more concise, and simplify function scoping and the `this` keyword.
By using arrow function we avoid having to type the `function` keyword, `return` keyword (it’s implicit in arrow functions), and curly brackets.

`Curly brackets are not required if only one expression is present!`

https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions



# NPM CONSOLE ERRORS

npm WARN deprecated graceful-fs@3.0.8: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.

npm WARN deprecated lodash@1.0.2: lodash@<3.0.0 is no longer maintained. Upgrade to lodash@^4.0.0.

npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.

# ES6

https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.ia9t6ixpb

http://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary

`const` is a signal that the variable won’t be reassigned.

`let`, is a signal that the variable may be reassigned, such as a counter in a loop, or a value swap in an algorithm. It also signals that the variable will be used only in the block it’s defined in, which is not always the entire containing function.

`var` is now the weakest signal available when you define a variable in JavaScript. The variable may or may not be reassigned, and the variable may or may not be used for an entire function, or just for the purpose of a block or loop.

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
