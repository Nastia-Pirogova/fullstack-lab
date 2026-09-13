module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    plugins: [
        '@typescript-eslint',
        'prettier',
    ],

    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],

    env: {
        browser: true,
        es2021: true,
    },

    ignorePatterns: [
        'dist/',
        'node_modules/',
        'commitlint.config.ts',
        'vite.config.ts',
    ],
};