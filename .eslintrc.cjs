/* eslint-env node */
module.exports = {
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': false,
    'prettier/prettier': 'error',
    'spaced-comment': 'off',
    'no-return-await': 'off',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'req|res|next|value',
      },
    ],
    // 'no-var-requires': 'off',
  },
  root: true,
};
