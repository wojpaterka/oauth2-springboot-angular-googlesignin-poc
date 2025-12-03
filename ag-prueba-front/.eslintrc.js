module.exports = {
  root: true,
  overrides: [
    // TypeScript + Angular
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint", "@angular-eslint"],
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      env: {
        browser: true,
        node: true,
        jasmine: true,
      },
      globals: {
        console: "readonly",
        localStorage: "readonly",
        atob: "readonly",
        btoa: "readonly",
        location: "readonly",
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off",
      },
    },

    // Angular HTML templates
    {
      files: ["**/*.html"],
      parser: "@angular-eslint/template-parser",
      plugins: ["@angular-eslint/template"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },

    // Node / config files
    {
      files: ["*.config.js", "*.mjs"],
      env: {
        node: true,
      },
    },
  ],
};
