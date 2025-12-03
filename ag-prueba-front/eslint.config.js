import { defineConfig } from 'eslint-define-config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import eslintJs from '@eslint/js';

export default defineConfig([
  // 1. Bazowe reguły JS dla wszystkich plików
  {
    files: ['*.js'],
    extends: ['eslint:recommended'],
  },

  // 2. TypeScript + Angular
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        localStorage: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
      },
    },
    env: {
      browser: true,
      node: false,   // frontend nie używa Node
      jasmine: true, // dla testów Karma/Jasmine
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
    },
    extends: [
      'plugin:@angular-eslint/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
    },
  },

  // 3. Angular HTML templates
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    extends: ['plugin:@angular-eslint/template/recommended'],
    rules: {},
  },

  // 4. Pliki Node / konfiguracje
  {
    files: ['*.config.js', '*.mjs'],
    env: {
      node: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {},
  },
]);
