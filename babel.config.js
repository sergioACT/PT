module.exports = api => {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [['react-native-reanimated/plugin']],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
