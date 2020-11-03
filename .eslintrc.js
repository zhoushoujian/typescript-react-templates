module.exports = {
  extends: [
    "@shuyun-ep-team/eslint-config"
  ],
  parser: "babel-eslint",
  parserOptions: {
    target: "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    module: "ESNext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  globals: {
    Babel: true,
    React: true,
  },
  rules: {
    "no-alert": 0,
    'max-len': [
      'error',
      160,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ], //强制行的最大长度
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-nested-ternary": 0,
    "react/jsx-filename-extension": 0,
    "require-atomic-updates": 0,
    "react/no-unescaped-entities": 0,
    "class-methods-use-this": 0,
    semi: 0,
    "no-return-assign": 0,
    "dot-notation": 0
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: "0.53", // Flow version
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
      },
    },
    "import/extensions": [".js", ".ts", ".mjs", ".jsx", ".tsx"],
  },
  plugins: ["react", "import", "react-hooks", "babel", "jsx-a11y"],
};
