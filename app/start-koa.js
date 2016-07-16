// ab -n 1000 -c 100 http://127.0.0.1:3000/

// start-koa.js
/*require('babel-core').transform('code', {
  plugins: ['transform-async-to-generator']
});*/
require('babel-register');

require('./app-koa.js');
