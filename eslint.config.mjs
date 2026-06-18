import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,

      // Code quality
      'camelcase': ['error', { properties: 'never' }],
      'no-underscore-dangle': 'error',
      'eqeqeq': ['error', 'always'],
      'no-eval': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-undef': 'off',
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'complexity': ['error', { max: 12 }],
      'max-depth': ['error', 5],
      'max-lines': ['error', { max: 600, skipComments: true }],
      'max-params': ['error', { max: 6 }],
      'no-console': 'off',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^(this|_)' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',

      // Readability
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: 'multiline-expression', next: 'expression' },
        { blankLine: 'always', prev: 'expression', next: 'multiline-expression' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },

  // Relax max-lines for test specs and shared layer (equivalent to steps/pageObjects)
  {
    files: ['tests/**/*.ts', 'shared/**/*.ts'],
    rules: {
      'max-lines': 'off',
    },
  },

  // Relax complexity for utilities
  {
    files: ['shared/utils/**/*.ts'],
    rules: {
      'complexity': 'off',
    },
  },

  prettier,

  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'reports/**',
      'allure-results/**',
      'allure-report/**',
      'playwright-report/**',
      '*.config.mjs',
    ],
  },
];
