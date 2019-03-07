module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-trailing-spaces': ["error", { "skipBlankLines": true }],
        'indent': 'off',
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1
        }],
        'vue/html-indent': ['error', 4, {
            'baseIndent': 1
        }],
        'vue/no-v-html': 'off',
        'vue/html-self-closing': 'off',
        'semi': ['warn', 'never'],
        'eol-last': ["warn", "always"]
    }
}
