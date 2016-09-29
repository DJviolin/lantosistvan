// https://www.npmjs.com/package/pg
// https://github.com/brianc/node-postgres
// https://github.com/brianc/node-postgres/wiki/Extras
// https://github.com/brianc/node-postgres/wiki/Example
//
// https://gist.github.com/brianc/6908287
// https://gist.github.com/brianc/f906bacc17409203aee0
// https://github.com/brianc/node-querybox
// https://github.com/brianc/node-pg-query
//
// https://github.com/brianc/node-postgres/blob/master/script/create-test-tables.js
// https://github.com/brianc/node-postgres/blob/master/script/dump-db-types.js
// https://github.com/brianc/node-postgres/blob/master/script/list-db-types.js

// pg-promise
// http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/
// http://programmers.stackexchange.com/a/279003/233099
// http://bluebirdjs.com/docs/benchmarks.html

// Client pooling
const pg = require('pg');
// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const pgConfig = {
  user: process.env.PGUSER || 'postgres', //env var: PGUSER
  database: process.env.PGDATABASE || 'postgres', //env var: PGDATABASE
  password: process.env.PGPASSWORD || 'password', //env var: PGPASSWORD
  port: process.env.PGPORT || 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(pgConfig);

module.exports = pool;
