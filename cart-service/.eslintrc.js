module.exports = {
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'no-only-tests',
    'security',
    'simple-import-sort',
  ],
  env: {
    node: true,
  },
  rules: {
    // Should be switched to error in future PRs
    '@typescript-eslint/no-explicit-any': 'warn',
    // TODO: Remove when issue is fixed https://github.com/sequelize/sequelize/issues/12954
    '@typescript-eslint/ban-ts-comment': 'warn',

    // Good rules
    'import/newline-after-import': ['error', { count: 1 }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-process-env': 'error',
    'no-console': 'error',
    'require-await': 'error',
    eqeqeq: ['error', 'smart'],
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
