const { commonConfig, srcPath } = require('../common/webpack.config');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  ...commonConfig,
  target: 'web',
  entry: {
    app: srcPath('./index.web.ts'),
  },
  // ^^^ entry: './src/renderer/renderer.tsx',
  output: {
    path: srcPath('electron/dist'),
    filename: 'renderer.bundle.js',
  },

  resolve: {
    ...commonConfig.resolve,
    extensions: commonConfig.resolve.extensions.concat([
      '.electron.tsx',
      '.electron.ts',
      '.electron.jsx',
      '.electron.js',
    ]),
  },

  devtool: 'inline-source-map',
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    historyApiFallback: true, // чтобы можно было пользоватся роутером во время разработки. Взято отсюда: https://stackoverflow.com/a/43212553
    compress: true,
    hot: true,
    port: 4000,
    static: srcPath('electron/dist/renderer'), // раньше это поле называлось contentBase, смотри миграцию с v3 на v4 https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
    // ^^^ publicPath: '/', // deprecated in v4
		// ^^^ devMiddleware: {
    //   publicPath: '/',
    // },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath('browser/index.html'),
      // ^^^ template: path.resolve(__dirname, '../public/index.html'),
    }),
    // @@@ new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;