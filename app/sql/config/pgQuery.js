// https://gist.github.com/brianc/f906bacc17409203aee0
// https://github.com/brianc/node-querybox
// https://github.com/felixfbecker/node-sql-template-strings

// https://github.com/brianc/node-postgres/wiki/Parameterized-queries-and-Prepared-Statements
// error: cannot insert multiple commands into a prepared statement
// https://github.com/vitaly-t/pg-promise/wiki/SQL-Files
// http://stackoverflow.com/questions/29100807/node-postgres-with-massive-amount-of-queries
// https://github.com/vitaly-t/pg-promise-demo

const pool = require('./pgConfig');

/*module.exports = {
   query: (text, values, cb) => {
      pg.connect((err, client, done) => {
        client.query(text, values, (err, result) => {
          done();
          cb(err, result);
        });
      });
   },
};*/

//I have omitted logging, but my function is usually sprinkled with logs
module.exports = (text, values, cb) => {
//module.exports = (text, cb) => {
  pool.connect((err, client, done) => {
    //connection failure
    //we don't need to release anything
    //because we were never handed a client in this case
    if (err) return cb(err);
    return client.query(text, values, (err, result) => {
    //client.query(text, (err, result) => {
      done(); // always call `done()` to release the client back to the pool
      if (err) return cb(err);
      //i like to return the rows directly since 99% of the time
      //I don't care about the other properties on the result object
      return cb(null, result.rows, result);
      ////cb(err, result);
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
};
