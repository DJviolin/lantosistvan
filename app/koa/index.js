// ab -n 1000 -c 100 http://127.0.0.1:3000/
// koa2 koa-generator --hbs --git && cd koa-generator
// > SET DEBUG=koa* & npm start koa-generator

// https://github.com/koajs/koa/tree/v2.x#old-signature-middleware-v1x---deprecated

require('babel-register');
require('./app.js');
