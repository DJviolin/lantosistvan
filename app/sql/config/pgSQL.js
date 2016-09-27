// https://github.com/brianc/node-postgres/wiki/Parameterized-queries-and-Prepared-Statements
// https://github.com/felixfbecker/node-sql-template-strings
module.exports = function SQL(parts, ...values) {
  return {
    text: parts.reduce((prev, curr, i) => prev + '$' + i + curr),
    values,
  };
};
