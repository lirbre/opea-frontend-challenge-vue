module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/base'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    createDefaultProgram: false,
    extraFileExtensions: ['.vue']
  },
  plugins: ['@typescript-eslint', 'vue'],
  extends: ['prettier'],
  rules: {}
}
