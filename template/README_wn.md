## Хаки
- Для того, чтобы дебажить приложение на устройстве, запусти `npm run android`, и в chrome перейди по этой ссылке:
	`http://localhost:8081/debugger-ui`
- Отладка на нативке: https://developers.google.com/web/tools/chrome-devtools/remote-debugging
	- суть той статьи - заюзать команду: `chrome://inspect#devices`
- Когда реконнектишь кабель от телефона к компу, чтобы react-native-dev-tools снова опознал телефон - выполни эту команду в *cmd* `adb reverse tcp:8081 tcp:8081`
- Пакет, реализующий scale-9 масштабирование изображений на андроиде (не работает корректно)
	`npm install git+https://git@github.com/LittleIronMan/react-native-image-capinsets.git`
	
## Кажется это настройка андроид-студии
- SDK Folder: `C:\Users\mrsta\AppData\Local\Android\Sdk`
- JDK Location: `C:\Program Files\Android\Android Studio\jre`
- JAVA_HOME должен быть установлен как JDK Location
- В PATH нужно добавить `C:\Users\mrsta\AppData\Local\Android\Sdk\platform-tools`
- Еще нужно просто открыть Android проект в студии, иначе вылазит ошибка: `Task 'installDebug' not found in project ':app'`
- Затем нужно будет еще перейти в `C:\Users\mrsta\AppData\Local\Android\Sdk\tools\bin` и выполнить там `./sdkmanager --licenses`

## Способы создания нового проекта react-native(web) под typescript:
- (новый)
	- Инструкция для создания нового typescript-проекта на react-native взята отсюда https://github.com/react-native-community/react-native-template-typescript/#arrow_forward-usage
		- `npx react-native init MyApp --template react-native-template-typescript`
		- а лучше так(стабильная своя версия): `npx react-native init <ShortName> https://github.com/LittleIronMan/react-native-template-typescript`
	- чтобы совместить с web-версией - используй этот шаблон: https://github.com/vemarav/react-native-web-typescript-template
		- ну, или этот: https://github.com/LittleIronMan/react-native-web-typescript-template
	- добавить в path `C:\Users\<имя юзера>\AppData\Local\Android\Sdk\platform-tools`
		- как минимум для того, чтобы можно было вызывать команды adb

- (устаревший) `npm install -g react-native-cli`
	- Чтобы избавиться от ошибки "powershell выполнение сценариев отключено в этой системе"
		- Открываем терминал(PowerShell) от админа.
		- Пишем и запускаем: Set-ExecutionPolicy RemoteSigned
		- На вопрос отвечаем: A (Да для всех)
	- ?? `npm install -g create-react-app`
	- `react-native init MyAwesomeProject --template typescript`
	- затем, чтобы запустить это все:
		- добавить в path `C:\Users\<имя юзера>\AppData\Local\Android\Sdk\platform-tools`
		- создать переменную окружения ANDROID_HOME `C:\Users\mrsta\AppData\Local\Android\Sdk`