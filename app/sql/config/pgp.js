// pg-promise
// http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/
// http://programmers.stackexchange.com/a/279003/233099
// http://bluebirdjs.com/docs/benchmarks.html

// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/index.js
// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/repos/products.js
// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/sql/products/create.sql

const promise = require('bluebird');

const options = {
  // Use a custom promise library, instead of the default ES6 Promise
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);

// Database connection parameters
const config = {
  host: 'localhost',
  port: process.env.PGPORT || 5433, //env var: PGPORT
  database: process.env.PGDATABASE || 'postgres', //env var: PGDATABASE
  user: process.env.PGUSER || 'postgres', //env var: PGUSER
  password: process.env.PGPASSWORD || 'password', //env var: PGPASSWORD
  //max: 10, // max number of clients in the pool
  //idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
const db = pgp(config);

module.exports = {
    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp,
    // Database instance. Only one instance per database is needed
    // within any application.
    db,
};
