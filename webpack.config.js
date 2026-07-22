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

// Permite que Webpack detecte automáticamente la URL
// (localhost en desarrollo y GitHub Pages en producción)
moduleFederationConfig.output.publicPath = 'auto';

module.exports = moduleFederationConfig;
