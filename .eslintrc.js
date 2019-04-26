module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  // required to lint *.vue files
  plugins: [
    "prettier",
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "prefer-const": "off",
    "no-lonely-if": "off",
    "handle-callback-err": "off",
    "standard/computed-property-even-spacing": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": "error"
  }
};
