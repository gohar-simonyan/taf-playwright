const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      },
    },
    rules: {
      'no-unused-vars': 'warn',
    }
  },
  {
    ignores: [
      "node_modules/**",
      "./src/tests/**",
      "*.config.js",
    ],
  },
];
