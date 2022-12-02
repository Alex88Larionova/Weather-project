module.exports = {
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-unused-vars': 'off',
    curly: ['error', 'all'],
    semi: ['error', 'never'],
    eqeqeq: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'key-spacing': ['error', { 'afterColon': true }],
    'object-property-newline': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-tabs': 'error',
    'no-trailing-spaces': ['error'],
    'no-await-in-loop': 'error',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-lonely-if': 'error',
    'no-useless-concat': 'error',
    'no-multi-spaces': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'block-spacing': 'error',
    'dot-location': ['error', 'property'],
    'prefer-template': 'error',
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': ['error', 'always'],
    'prefer-const': 'error',
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
    'vue/no-unused-vars': 'error',
    'vue/require-default-prop': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { 'registeredComponentsOnly': false, ignores: ['i18n-t'] }],
    'vue/max-attributes-per-line': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/dot-location': ['error', 'property'],
    'vue/arrow-spacing': ['error', { 'before': true, 'after': true }],
    'vue/comma-dangle': ['error', 'never'],
    'vue/component-tags-order': ['error', {
      'order': [ 'script', 'template', 'style' ]
    }],
    'vue/valid-v-slot': ['error', {
      'allowModifiers': true
    }]
  }
}