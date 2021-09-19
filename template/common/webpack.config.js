const path = require('path');
const webpackEnv = process.env.NODE_ENV || 'development';
// ^^^ const isEnvProduction = process.env.NODE_ENV === 'production';
// ^^^ const isEnvDevelopment = process.env.NODE_ENV === 'development';
const rootDir = path.join(__dirname, '..');

function srcPath(src) {
  return path.join(rootDir, src);
}

/** @type {import('webpack').Configuration} */
const commonConfig = {
  devtool: 'source-map',
  // ^^^ devtool: isEnvDevelopment ? 'source-map' : false,
  mode: webpackEnv,
  // ^^^ mode: isEnvProduction ? 'production' : 'development',
  // ^^^ context: path.resolve(__dirname, '..'), // The base directory (absolute path!) for resolving the `entry` option
  // output: {
  //   // @@@ path: path.resolve(rootDir, 'dist'),
  //   // ^^^ path: srcPath('dist'),
  // },
  // ^^^ node: { __dirname: false, __filename: false },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      // ^^^ '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
      // 'ui': srcPath('app/components/ui'),
      'windows': srcPath('app/components/windows'),
      'pages': srcPath('app/pages'),
      'global': srcPath('app/global'),
      'img': srcPath('app/components/img'),
    },
    symlinks: false,
  },
  module: {
    rules: [
      {
        // ^^^ test: /\.(ts|tsx)$/,
        test: /\.(tsx|ts|mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      // ^^^ {
      //   test: /\.(scss|css)$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(gif|jpe?g|png)$/,
        // ^^^ test: /\.(jpg|png|svg|ico|icns)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // ^^^ name: '[path][name].[ext]',
            esModule: false, // enable a CommonJS module syntax
          }
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@svgr/webpack',
          }
        ]
      },
      // deprecated, но вдруг пригодится
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: function (content) {
      //     return /node_modules/.test(content) &&
      //       !/react-native-elements/.test(content) &&
      //       !/react-native-vector-icons/.test(content) &&
      //       !/react-native-ratings/.test(content);
      //   },
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         [
      //           '@babel/preset-env',
      //           //{
      //           //  targets: {
      //           //    chrome: '70'
      //           //  }
      //           //}
      //         ],
      //         '@babel/preset-react'
      //       ],
      //       plugins: [
      //         //['@babel/plugin-proposal-class-properties', { loose: true }],
      //         //['@babel/plugin-transform-runtime', { 'regenerator': true }],
      //         //'babel-plugin-react-native-web',
      //       ]
      //     }
      //   }
      // },
    ],
  },
};

module.exports = { commonConfig, srcPath, rootDir };