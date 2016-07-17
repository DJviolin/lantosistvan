// ab -n 1000 -c 100 http://127.0.0.1:3000/
// koa2 koa-generator --hbs --git && cd koa-generator
// > SET DEBUG=koa* & npm start koa-generator

/*
Packages:
    "koa": ">= 2.0.0",
    "koa-render": ">= 0.2.1",
    "koa-router": ">= 7.0.1",
    "handlebars": ">= 4.0.5",
    "koa-handlebars": ">= 0.5.7",

    "babel-register": ">= 6.9.0",
    "babel-preset-node6": ">= 11.0.0",
    "babel-plugin-transform-async-to-generator": ">= 6.8.0"
*/

// https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x---deprecated

// Express 5.0 state
// https://github.com/expressjs/express/pull/2237#issuecomment-189510525
// https://medium.com/@nodejs/only-at-node-js-interactive-the-state-of-express-from-doug-wilson-d2c748470e83#.npveos1v7
// https://www.reddit.com/r/javascript/comments/47s9o8/im_closing_down_express_50/
// https://www.reddit.com/r/node/comments/3af9a0/what_is_strongloop/csca6ad
// https://www.reddit.com/r/javascript/comments/47s9o8/im_closing_down_express_50/d0fdo0z
// Reddit Mobile -> Koa.js
// https://m.reddit.com
// https://github.com/reddit/reddit-mobile

// Not use mongoDB?
// https://www.reddit.com/r/programming/comments/3dvzsl/why_you_should_never_ever_ever_use_mongodb/
// http://cryto.net/%7Ejoepie91/blog/2015/07/19/why-you-should-never-ever-ever-use-mongodb/
/// -> postgreSQL

// Koa.js
// http://koajs.com/
// https://github.com/koajs/koa
// https://github.com/koajs/examples
// https://github.com/koajs/koa/wiki
// https://medium.com/@l1ambda/why-you-should-use-koa-with-node-js-7c231a8174fa#.h2qvonrpm
// https://github.com/llambda/koa-boiler
// https://blog.risingstack.com/introduction-to-koa-generators/
// https://blog.risingstack.com/getting-started-with-koa-part-2/
// https://blog.risingstack.com/shipping-node-js-applications-with-docker-and-codeship/
// https://blog.risingstack.com/asynchronous-javascript/

// Koa 2.0 and learn
// https://github.com/koajs/koa/issues/533
// https://github.com/koajs/kick-off-koa
// https://github.com/koajs/workshop
// http://knowthen.com/episode-3-koajs-quickstart-guide/
// Koa 2.0 Boilerplate
// https://github.com/llambda/koa-boiler
// Koa Api Boilerplate
// https://github.com/koajs/api-boilerplate
// Koa 2.0 Generator
// https://github.com/17koa/koa-generator
// https://github.com/dominhhai/koa-generator
// https://github.com/gusnips/node-koa-mvc
// https://github.com/justmyfreak/koa-starter
// https://github.com/geekplux/koa2-boilerplate
// https://github.com/ptariche/ecma7-koa2-starter
// Socket.io + Koa:
// https://github.com/mattstyles/koa-socket
// Koa 2.0 Docs
// https://github.com/koajs/koa/tree/v2.x/docs
// Demo repo
// https://github.com/mapmeld/1batch

// Koa + Handlebars
// http://stackoverflow.com/questions/29311196/combining-koa-router-with-koa-handlebar
// https://github.com/dominicbarnes/koa-handlebars // Handlebars ^3.0.0
// https://github.com/gilt/koa-hbs // Handlebars ^2.0.0

require('babel-register');
require('./app.js');
