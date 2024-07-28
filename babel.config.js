module.exports = api => {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['react-native-reanimated/plugin', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
