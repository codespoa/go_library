module.exports = {
  env: {
    node: true,
  },
  extends: [
    'standard',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  rules: {
    "prettier/prettier": ["error", {
      "endOfLine": "auto"
    }],
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
  },
};