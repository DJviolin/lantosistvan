#!/usr/bin/env node

'use strict';

// ab -n 1000 -c 100 http://127.0.0.1:8081/

/*require('babel-core').transform('code', {
  presets: ['node6']
});*/
require('babel-register');
require('./bin/www');
