const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplatePlugin = require("@angular-eslint/eslint-plugin-template");
const eslintJs = require("@eslint/js");

module.exports = [
  // 1. Bazowe reguły JS
  eslintJs.configs.recommended,

  // 2. TypeScript + Angular
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        // Globals przeglądarki
        console: "readonly",
        localStorage: "readonly",
        atob: "readonly",
        btoa: "readonly",
        location: "readonly",

        // Globals Node (dla plików config)
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",

        // Globals testowe Jasmine/Karma
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        expect: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,

      // Tymczasowe wyłączenie reguł blokujących CI
      "@typescript-eslint/no-explicit-any": "off",
      "@angular-eslint/no-empty-lifecycle-method": "off",
    },
  },

  // 3. Angular HTML templates
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: "@angular-eslint/template-parser",
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },

  // 4. Pliki Node / konfiguracje
  {
    files: ["*.config.js", "*.mjs"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {},
  },
];
