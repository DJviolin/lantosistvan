#!/usr/bin/env node

// For airBnB, babel inserting strict mode
//'use strict';

// Packages
/*
    "babel-core": ">= 6.11.4",
    "babel-register": ">= 6.11.6",
    "babel-preset-node6": ">= 11.0.0",
    "babel-plugin-transform-async-to-generator": ">= 6.8.0",

    "koa": ">= 2.0.0-beta.4"
*/

/*require('babel-register')({
  presets: ['node6'],
  plugins: ['transform-async-to-generator'],
});*/
require('./dist/app');
