const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    assetExts: ['jpg', 'jpeg', 'png', 'svg', 'gif'], // Incluye todas las extensiones necesarias
  },
};


module.exports = mergeConfig(getDefaultConfig(__dirname), config);
