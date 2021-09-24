const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.join(__dirname, '/src');
const aliases = {src: ROOT_PATH};

fs.readdirSync(ROOT_PATH)
  .filter(file => fs.statSync(path.join(ROOT_PATH, file)).isDirectory())
  .forEach(file => (aliases[file] = path.join(ROOT_PATH, file)));

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: aliases,
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
