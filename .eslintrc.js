module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.3'
    }
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': 0
  }
};
