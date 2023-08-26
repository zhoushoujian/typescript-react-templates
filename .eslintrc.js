module.exports = {
  extends: ['@szhou/eslint-config'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {},
};
