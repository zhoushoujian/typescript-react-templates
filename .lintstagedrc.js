module.exports = {
  'src/**/*.{js,ts,jsx,tsx}': ["eslint --rule \"'no-console':'error'\""],
  'src/**/*.{ts,tsx}': () => 'tsc --noEmit',
};
