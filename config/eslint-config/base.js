/**@type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/react', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
