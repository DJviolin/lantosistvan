const express = require('express');
const router = express.Router();
//const pool = require('../sql/config/pgConfig');
const query = require('../sql/config/pgQuery');

router.route('/')
  .get((req, res) => {
    res.render('profile_index', {
      layout: 'profile',
    });
  })
  .post((req, res) => {
    const text = `
      /* INSERT INTO users (
        id,
        username,
        password,
        privilege
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      ); */
      SELECT * FROM users;
    `;
    /*const values = [
      req.body.id,
      req.body.username,
      req.body.password,
      req.body.privilege,
    ];*/
    const values = [];
    query(text, values, (err, rows, all) => {
      //if (err) return next(err);
      if (err) throw err;
      console.log('POST finished!: ', rows);
      //console.log('POST finished! - ALL: ', all);
      res.status(204).end();
    });
    res.redirect('back');
  });

router.get('/', (req, res) => {
  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  /*pool.connect((err, client, done) => {
    if (err) throw console.error('error fetching client from pool', err);

    /*client.query('SELECT $1::int AS number', ['1'], (err, result) => {
      //call `done()` to release the client back to the pool
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
      //output: 1
    });*/

    /*client.query('CREATE TABLE IF NOT EXISTS visit (date timestamptz)');
    client.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], (err) => {
      if (err) throw err;
      // get the total number of visits today (including the current visit)
      client.query('SELECT COUNT(date) AS count FROM visit', (err, result) => {
        // handle an error from the query
        if (err) throw err;
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(`You are visitor number ${result.rows[0].count}`);
      });
    });*/

    /*client.query('\
      SELECT datname \
      FROM pg_database \
      WHERE datistemplate = false;\
    ', (err, result) => {
      done(); //call `done()` to release the client back to the pool
      if (err) {
        return console.error('error running query', err);
      }
      //console.log(result.rows[0].number); // output: 1
      const resp = result.rows[0].datname; // typeof => string
      console.log(resp);
    });

    client.query(`
      -- This is a single line comment
      /* CREATE TABLE users (
        id INTEGER,
        username TEXT,
        password TEXT,
        privilege TEXT
      );

      INSERT INTO users (
        id,
        username,
        password,
        privilege
      ) VALUES (
        1,
        'Lanti',
        'password',
        'admin'
      ); *

      SELECT * FROM users;
    `, (err, result) => {
      done(); //call `done()` to release the client back to the pool
      if (err) {
        return console.error('error running query', err);
      }
      //console.log(result.rows[0].number); // output: 1
      const resp = result.rows; // typeof => string
      console.log(resp);
    });

    client.query('SELECT * FROM users;', (err, result) => {
      // Count of columns
      const columnCount = result.fields.length;
      console.log('Count of columns: ', columnCount);
      // Count of rows
      const rowsCount = result.rows.length;
      console.log('Count of rows: ', rowsCount);
      // Returned rows
      const rowsLoop = result.rows.map((f) => {
        return f.username;
      }).join(', ')
      console.log('Returned rows: ', rowsLoop);
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
  });*/

  res.render('profile_index', {
    layout: 'profile',
  });
});

/////////////////////////////////////////////////////////////
// INIT EXPRESS ROUTER
/////////////////////////////////////////////////////////////

module.exports = router;
