module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 解决解析标签错误问题
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    // 取消方法括号后面必须加空格问题
     "space-before-function-paren": 0,
     // 取消必须使用单引号
     "quotes": [1, "single"],
     // 可以使用分号
     // 'semi': ["error", "always"]
  }
}
