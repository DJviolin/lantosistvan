'use strict';

const {adapter} = require('spirit').node,
      route     = require('spirit-router'),
      http      = require('http');

const hello = () => {
  return 'Hello, World!';
};

const app = route.define([
  route.get('/', hello)
]);

http.createServer(adapter(app)).listen(3030);
