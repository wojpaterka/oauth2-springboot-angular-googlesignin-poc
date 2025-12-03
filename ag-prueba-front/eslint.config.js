import angular from "@angular-eslint/eslint-plugin";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["**/node_modules/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@angular-eslint": angular,
      "@typescript-eslint": ts,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@angular-eslint/recommended"
    ],
    rules: {},
  },
];
