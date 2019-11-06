module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/state-in-constructor": 0,
    "no-console": 0,
    "react/destructuring-assignment": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "object-curly-newline": 0,
    "comma-dangle": 0,
    "arrow-parens": 0,
    "implicit-arrow-linebreak": 0,
    "function-paren-newline": 0,
    quotes: 0
  },
  globals: {
    document: true
  },
  parser: "babel-eslint",
  env: {
    browser: true
  }
};
