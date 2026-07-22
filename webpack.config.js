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

moduleFederationConfig.output.publicPath = process.env.PUBLIC_PATH;

module.exports = moduleFederationConfig;
