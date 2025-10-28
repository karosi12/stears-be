module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // your overrides
    'prettier/prettier': 'error',
  },
overrides: [
    {
      files: ['src/utils/loggers.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
