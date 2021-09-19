/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * А лучше смотреть документацию к конфигурации самого metro https://facebook.github.io/metro/docs/configuration/
 * В основе своей конфиг был скопирован из [react-native-svg-transformer](https://www.npmjs.com/package/react-native-svg-transformer).
 *
 * @format
 */
// const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  /** @type {import('./metro.config').MetroConfig} */
  const config = {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      blockList: exclusionList([
        // в папке electron/dist после сборки создается копия package.json файла, из-за него metro выдает ошибку
        /electron\/dist\/.*/,
      ]),
      // // ^^^ react-native-windows-init
      // blockList: exclusionList([
      //   // This stops "react-native run-windows" from causing the metro server to crash if its already running
      //   new RegExp(
      //     `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
      //   ),
      //   // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip
      //   /.*\.ProjectImports\.zip/,
      // ]),
    },
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      // // ^^^ react-native-windows-init
      // getTransformOptions: async () => ({
      //   transform: {
      //     experimentalImportSupport: false,
      //     inlineRequires: true,
      //   },
      // }),
    },
  };

  return config;
})();