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
  /*"rules": {
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
    "max-len": ["warn", 80],
    // Enforce placing 'use strict' at the top function scope
    //"strict": true,
    "strict": ["error", "global"],
    // Own Rules
    "no-console": "off",
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "curly": ["error", "all"],
    "prefer-const": "error",
    "no-const-assign": "error",
    "no-throw-literal": "error",
    "no-sync": "error", // Disallow Synchronous Methods
  }*/
  // airBnB style guide: https://github.com/airbnb/javascript
  "rules": {
    // References
    // const and let only exist in the blocks they are defined in.
    "prefer-const": "error", // Suggest using const
    "no-const-assign": "error", // Disallow modifying variables that are declared using const
    "no-var": "error", // require let or const instead of var
    // Objects
    "no-new-object": " error", // disallow Object constructors
    "object-shorthand". ["error", "properties"], // Require Object Literal Shorthand Syntax
    "quote-props": "error", // Quoting Style for Property Names
    // Arrays
    "no-array-constructor". "error", // disallow Array constructors
    "array-callback-return": "error", // Enforces return statements in callbacks of array’s methods
    // Destructuring
    // Strings
    "quotes": ["warn", "single"], // Enforce Quote Style
    "prefer-template": "error", // Suggest using template literals instead of string concatenation
    "template-curly-spacing": ["error", "never"], // Enforce Usage of Spacing in Template Strings
    "no-useless-escape": "error", // Disallow unnecessary escape usage
  }
}
