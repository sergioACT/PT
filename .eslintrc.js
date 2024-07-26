module.exports = {
   plugins: ['react', 'react-hooks', 'prettier'],
  root: true,
  extends: 'airbnb',
  rules: {
    edi,
     'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathPrefix: '_',
        rootPathSuffix: 'src',
      },
    },
  },
};
