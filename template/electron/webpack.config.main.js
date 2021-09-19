const CopyPlugin = require('copy-webpack-plugin');
const { commonConfig, srcPath } = require('../common/webpack.config');

/** @type {import('webpack').Configuration[]} */
const configs = [
  {
    ...commonConfig,
    target: 'electron-main',
    entry: srcPath('electron/main/main.ts'),
    // ^^^ entry: './src/main/main.ts',
    output: {
      path: srcPath('electron/dist'),
      filename: 'main.bundle.js',
      // ^^^ ...commonConfig.output,
      // ^^^ filename: 'main.bundle.js',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'package.json',
            to: 'package.json',
            transform: (content, _path) => {
              // eslint-disable-line no-unused-vars
              const jsonContent = JSON.parse(content);

              delete jsonContent.devDependencies;
              delete jsonContent.scripts;
              delete jsonContent.build;

              jsonContent.main = './main.bundle.js';
              jsonContent.scripts = { start: 'electron ./main.bundle.js' };
              jsonContent.postinstall = 'electron-builder install-app-deps';

              return JSON.stringify(jsonContent, undefined, 2);
            },
          },
        ],
      }),
    ],
  },
  {
    ...commonConfig,
    target: 'electron-preload',
    entry: srcPath('electron/main/preload.ts'),
    // ^^^ entry: './src/main/preload.ts',
    output: {
      path: srcPath('electron/dist'),
      filename: 'preload.bundle.js',
      // ^^^ ...commonConfig.output,
      // ^^^ filename: 'preload.bundle.js',
    },
    devtool: 'inline-source-map',
  },
];

module.exports = configs;
