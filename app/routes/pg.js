const express = require('express');
const router = express.Router();
const pool = require('../config/pg');

router.get('/', (req, res) => {
  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  pool.connect((err, client, done) => {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], (err, result) => {
      //call `done()` to release the client back to the pool
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
      //output: 1
    });
  });
  pool.on('error', (err, client) => {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack);
  });

  res.render('profile_index', {
    layout: 'profile',
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
