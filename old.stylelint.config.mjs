/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  rules: {
    'keyframes-name-pattern': null,
    'color-named': null,
    'alpha-value-notation': 'number',
    'color-function-notation': 'modern',
    'font-family-name-quotes': 'always-unless-keyword',
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
  ignoreFiles: ['**/*.d.ts', '**/*.js', '**/*.ts', '**/*.tsx'],
};
