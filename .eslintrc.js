module.exports = {
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
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
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script", // or "module"
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
    "quotes": ["warn", "single"],
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "no-throw-literal": "error",
  }
}
