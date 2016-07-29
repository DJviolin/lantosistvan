module.exports = {
  // http://eslint.org/docs/user-guide/configuring
  // http://eslint.org/docs/rules/
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  // http://kangax.github.io/compat-table/es5/
  // https://kangax.github.io/compat-table/es6/
  // http://caniuse.com/#feat=es5

  "root": true,
  "extends": "eslint:recommended",
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
  "rules": {
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
  }
}
