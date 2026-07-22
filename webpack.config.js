require('dotenv').config();

const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const moduleFederationConfig = withModuleFederationPlugin({
  remotes: {},

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});

// Para GitHub Pages
moduleFederationConfig.output.publicPath = 'auto';

module.exports = moduleFederationConfig;
