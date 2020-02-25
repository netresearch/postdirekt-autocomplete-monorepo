module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
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
        project: ['./tsconfig.eslint.json'],
    },
    env: {
        "browser": true,
        "es6": true
    }
};
