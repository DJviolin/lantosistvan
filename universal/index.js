#!/usr/bin/env node

// For airBnB, babel inserting strict mode
//'use strict';

require('babel-register')({
  presets: ['node6'],
  plugins: ['transform-async-to-generator']
});
require('./server/bin/www');
