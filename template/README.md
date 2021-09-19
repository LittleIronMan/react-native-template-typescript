# Android
## При первом запуске `npm run android` высрет ошибку:
> `SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at '<project_path>\android\local.properties'`
- Нужно установить переменную окружения `ANDROID_SDK_ROOT`, например `%LOCALAPPDATA%\Android\Sdk`
	- Вот [тут](https://stackoverflow.com/questions/23042638/how-do-i-set-android-sdk-home-environment-variable) есть некоторая информация о переменных окружения для сборки Android-приложений. В частности `ANDROID_HOME` считается устаревшей
- Много проблем решаются открытием android-проекта в Android Studio. Даже запускать ничего не нужно, просто он сам подготовит и наладит все зависимости.

# iOS

# React-Native-Windows
Для создания Windows решения(visual studio solution) поверх уже имеющегося проекта, используй `npx react-native-windows-init --overwrite`
Информация взята из официального источника: https://microsoft.github.io/react-native-windows/docs/getting-started

> В сентябре 2021 была установлена react-native-web@0.65.2, и оказалась непригодной для использования (не поддерживает svg, imagePicker).
Было решено десктопную версию делать на куда более мощном, старом и популярном electron.

# Electron
Сборка десктопного приложения под Windows и MacOS взята и адаптирована из этого шаблона https://github.com/LittleIronMan/electron-react-typescript-webpack-boilerplate