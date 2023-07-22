module.exports = {
  extends: ['eslint-config-ts-base'],
  parserOptions: {
    target:
      'es5',
    module:
      'ESNext',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {},
};
