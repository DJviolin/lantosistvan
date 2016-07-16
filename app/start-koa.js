// start-koa.js
require('babel-core').transform('code', {
  plugins: ['transform-async-to-generator']
});

require('./app-koa.js');
