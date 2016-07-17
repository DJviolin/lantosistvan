#!/usr/bin/env node

'use strict';

// ab -n 1000 -c 100 http://127.0.0.1:8081/

// Performance
// https://engineering.linkedin.com/nodejs/blazing-fast-nodejs-10-performance-tips-linkedin-mobile
// https://strongloop.com/strongblog/node-js-performance-scaling-proxies-clusters/

// async/await & try/catch
// https://www.youtube.com/watch?v=COKdtOgopWQ
// https://medium.com/@yamalight/danger-of-using-async-await-in-es7-8006e3eb7efb#.vsu0gxqdn
// http://slides.com/stephenbelanger-1/easier-express-with-async-await#/3

/*require('babel-core').transform('code', {
  presets: ['node6']
});*/
require('babel-register');
require('./bin/www');
