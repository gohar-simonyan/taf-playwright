import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    { ignores:
            ['node_modules/**', 'allure-report/**'],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        rules: {
            semi: 'error',
            'no-unused-vars': 'warn',
            quotes: ['error', 'single'],
            'no-console': 'error',
        },
    },
);