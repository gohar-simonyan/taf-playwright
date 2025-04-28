import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import mochaPlugin from 'eslint-plugin-mocha';
import globals from 'globals';

export default defineConfig([
  eslint.configs.recommended,
  mochaPlugin.configs.flat.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
    files: ['**/*.js'],
    ignores:
        ['node_modules/**'],
    rules: {
      'mocha/no-skipped-tests': 'error',
      'mocha/no-exclusive-tests': 'error',
      quotes: ['error', 'single'],
      semi: 'error',
      'no-unused-vars': 'warn',
      'no-console': 'error',
      'max-len': [
        'error',
        140,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ]
    }
  },
]);