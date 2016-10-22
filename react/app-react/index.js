#!/usr/bin/env node

// For airBnB, babel inserting strict mode
//'use strict';

require('babel-register')({
  presets: ['react', 'es2015'],
});
require('./src/bin/www');
