#!/usr/bin/env node

'use strict';

/*require('babel-core').transform('code', {
  presets: ['node6']
});*/
require('babel-register');
require('./bin/www');
