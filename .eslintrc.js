module.exports = {
  extends: [
    'airbnb',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': ['error', { ignore: ['dotenv'] }],
  },
};
