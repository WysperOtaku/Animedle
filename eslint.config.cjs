const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const unusedImports = require('eslint-plugin-unused-imports');
const astroPlugin = require('eslint-plugin-astro');
const prettier = require('eslint-config-prettier');

module.exports = [
  // Ignorados
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.astro/**',
      '**/.vercel/**',
      '**/.turbo/**',
      '**/.env',
      '**/.env.*'
    ]
  },

  // JS base (flat)
  js.configs.recommended,

  // TS base (flat)
  ...tseslint.configs.recommended,

  // Reglas TS/JS comunes
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      // Imports no usados
      'unused-imports/no-unused-imports': 'error',

      // Vars no usadas (pero permite _)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],

      // Reglas útiles de import (SIN usar importPlugin.configs.recommended)
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Relax
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // ASTRO: aplica solo a .astro (para que no meta cosas en TS normal)
  {
    files: ['**/*.astro'],
    ...astroPlugin.configs.recommended
  },

  // Prettier al final (flat)
  prettier
];
