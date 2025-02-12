const parser = require('@typescript-eslint/parser');
const eslintPluginImport = require('eslint-plugin-import');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // Base ESLint recommended rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: eslintPluginImport,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier-related rules
      ...prettierConfig.rules,
      'prettier/prettier': ['error', { printWidth: 100 }],

      // TypeScript rules
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Import-related rules
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
        },
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/no-duplicates': 'warn',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/first': 'error',
      'import/prefer-default-export': 0,

      // Formatting and style rules
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'newline-before-return': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'object-shorthand': ['error', 'always'],

      // General JavaScript rules
      'no-console': 'error',
      'no-eval': 'error',
      'no-use-before-define': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-return-await': 0,
      'consistent-return': 0,
      'max-classes-per-file': 0,
      'class-methods-use-this': 0,
      'no-useless-constructor': 0,

      // Code style preferences
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['off', 2, { SwitchCase: 1 }],
      'comma-dangle': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];
