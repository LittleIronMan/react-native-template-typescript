const { commonConfig, srcPath } = require('../common/webpack.config');
const webpack = require('webpack');
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
    path: srcPath('browser/dist'),
    filename: 'app-[hash].bundle.js',
    // ^^^ ...commonConfig.output,
    // ^^^ filename: 'renderer.bundle.js',
  },

  resolve: {
    ...commonConfig.resolve,
    extensions: commonConfig.resolve.extensions.concat([
      '.browser.tsx',
      '.browser.ts',
      '.browser.jsx',
      '.browser.js',
    ]),
  },

  // ^^^ devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true, // чтобы можно было пользоватся роутером во время разработки. Взято отсюда: https://stackoverflow.com/a/43212553
  },
  // /** @type {import('webpack-dev-server').Configuration} */
  // ^^^ devServer: {
  //   contentBase: path.join(__dirname, '../dist/renderer'),
  //   historyApiFallback: true,
  //   compress: true,
  //   hot: true,
  //   port: 4000,
  //   publicPath: '/',
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath('browser/index.html'),
      // ^^^ template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;