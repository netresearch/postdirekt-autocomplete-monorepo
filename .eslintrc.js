module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {

        // allow for..{in,of} syntax and async/await
        "no-restricted-syntax": "off",
        "indent": ["error", 4],
        "@typescript-eslint/indent": ["error", 4]
    },
    parserOptions: {
        project: ['./packages/*/tsconfig.eslint.json'],
    },
    overrides: [
        {
            files: ["**/test/**/*.{ts,js}"],
            rules: {
                "import/no-extraneous-dependencies": "off"
            }
        }
    ],
    env: {
        "browser": true,
        "es6": true
    }
};
