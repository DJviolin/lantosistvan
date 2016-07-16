module.exports = {
  "root": true,
  "extends": "eslint:recommended",
  "globals": {
    "jQuery": true,
    "$": true
  },
  "env": {
    //"es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },
  //"ecmaFeatures": {
  //  "modules": false
  //},
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script",
    "ecmaFeatures": {
      "modules": false,
      "jsx": true
    }
  },
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    //"quotes": ["error", "double"],
    "semi": ["error", "always"],

    // override default options for rules from base configurations
    "comma-dangle": ["error", "always"],
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",

    "eqeqeq": 1,
    "curly": [2, "all"],
    //"strict": 0,
    //"quotes": [1, "single"],
    "strict": [2, "global"],
    "quotes": [1, "single", null],
    "strict": [2, "global"],
    "no-unused-vars": 1,
    "prefer-const": 1,
    "no-throw-literal": "error",
  }
}
