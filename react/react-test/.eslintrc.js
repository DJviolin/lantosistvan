// http://eslint.org/docs/user-guide/configuring
// http://eslint.org/docs/rules/
// http://eslint.org/docs/user-guide/configuring#configuring-rules
// http://kangax.github.io/compat-table/es5/
// https://kangax.github.io/compat-table/es6/
// http://caniuse.com/#feat=es5

module.exports = {
  "root": true,

  "parser": "babel-eslint", // https://www.npmjs.com/package/babel-eslint

  //"extends": "eslint:recommended",
  "extends": "airbnb",

  "globals": {
    "jQuery": true,
    "$": true
  },

  env: {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module', // "script" or "module"
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  "rules": {
    "spaced-comment": "off",
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "react/require-extension": "off", // Atom error
    //"react/prefer-es6-class": ["error", "never"],
    //"react/prefer-stateless-function": "off",
  },
}
