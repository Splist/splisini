const codeStyle = require('@splist/code-style');

module.exports = codeStyle.eslint.tsx;

// module.exports = {
//     extends: [
//         'eslint:recommended',
//         'plugin:react/recommended',
//         'plugin:@typescript-eslint/recommended',
//         'prettier/@typescript-eslint'
//     ],
//     plugins: ['react', '@typescript-eslint'],
//     env: {
//         browser: true,
//         jasmine: true,
//         jest: true
//     },
//     settings: {
//         react: {
//             pragma: 'React',
//             version: 'detect'
//         }
//     },
//     parser: '@typescript-eslint/parser'
// };
