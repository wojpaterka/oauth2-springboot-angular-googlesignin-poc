const tsParser = require("@typescript-eslint/parser");
const ts = require("@typescript-eslint/eslint-plugin");
const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");

const eslintJs = require("@eslint/js");

module.exports = [

  // 1. Bazowe reguły JS
  eslintJs.configs.recommended,

  // 2. TypeScript rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      "@typescript-eslint": ts,
      "@angular-eslint": angular
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...angular.configs.recommended.rules
    }
  },

  // 3. Angular HTML templates
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules
    }
  }
];
