module.exports = {
  // http://eslint.org/docs/user-guide/configuring
  // http://eslint.org/docs/rules/
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  // http://kangax.github.io/compat-table/es5/
  // https://kangax.github.io/compat-table/es6/
  // http://caniuse.com/#feat=es5

  "root": true,
  "extends": "eslint:recommended",
  //"extends": "airbnb",
  "globals": {
    "jQuery": true,
    "$": true
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },
  // https://www.npmjs.com/package/babel-eslint
  //"parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    //"sourceType": "module", // "script" or "module"
    "sourceType": "script", // "script" or "module"
    //"allowImportExportEverywhere": false,
    "ecmaFeatures": {
      //"modules": false,
      "jsx": true
    }
  },
  /*"rules": {
    // disable rules from base configurations
    "no-console": "off",
    // enable additional rules
    "indent": ["off", 2],
    "linebreak-style": ["error", "unix"],
    // Own rules
    "semi": ["error", "always"],
    "eqeqeq": "warn",
    "curly": ["error", "all"],
    "strict": ["error", "global"],
    //"strict": "off",
    "quotes": ["warn", "single"],
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "no-throw-literal": "error",
    // Disallow Synchronous Methods
    "no-sync": "error",
  }*/
  // airBnB
  "rules": {
    // Force all variable names to use either camelCase style or UPPER_CASE
    // with underscores.
    "camelcase": "warn",
    // Prohibit use of == and != in favor of === and !==.
    "eqeqeq": "warn",
    // Suppress warnings about == null comparisons.
    //"eqnull": true,
    "no-eq-null": "error",
    // Enforce tab width of 2 spaces.
    "indent": ["error", 2],
    // Prohibit use of a variable before it is defined.
    //"latedef": true,
    "no-use-before-define": "error",
    // Require capitalized names for constructor functions.
    //"newcap": true,
    "new-cap": "error",
    // Enforce use of single quotation marks for strings.
    //"quotmark": true,
    "quotes": ["warn", "single"],
    // Prohibit trailing whitespace.
    //"trailing": true,
    "no-trailing-spaces": "warn",
    // Prohibit use of explicitly undeclared variables.
    //"undef": true,
    "no-undef": "error",
    // Warn when variables are defined but never used.
    //"unused": true,
    "no-unused-vars": "warn",
    // Enforce line length to 80 characters
    //"maxlen": 80,
    "max-len": ["error", 80],
    // Enforce placing 'use strict' at the top function scope
    //"strict": true,
    "strict": ["error", "global"],
    // Own Rules
    "no-console": "off",
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "curly": ["error", "all"],
    "prefer-const": "warn",
    "no-throw-literal": "error",
    "no-sync": "error", // Disallow Synchronous Methods
  }
}
