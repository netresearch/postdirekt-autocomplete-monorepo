import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    // Global ignores
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/lib/**',
            '**/bin/**',
            '**/tools/**',
            '**/docs/**',
            '**/coverage/**',
            'jest.config.js',
            'rollup.config.*.js',
        ],
    },

    // Base ESLint recommended rules
    eslint.configs.recommended,

    // TypeScript ESLint recommended rules
    ...tseslint.configs.recommended,

    // Main configuration for TypeScript files
    {
        files: ['packages/*/src/**/*.ts'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Preserve existing rules from .eslintrc.js
            'no-restricted-syntax': 'off',
            // Note: @typescript-eslint/indent was removed in v8, use base indent rule
            'indent': ['error', 4],

            // Recommended TypeScript rules adjustments
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
        },
    },

    // Test files configuration
    {
        files: ['**/test/**/*.ts', '**/test/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            // Relaxed rules for tests
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
);
