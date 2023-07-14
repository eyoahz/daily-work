/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@antfu'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  }
}
