module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/state-in-constructor": 0
  },
  globals: {
    document: true
  },
  parser: "babel-eslint",
  env: {
    browser: true
  }
};
