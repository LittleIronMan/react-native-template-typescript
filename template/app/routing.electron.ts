export {
	// BrowserRouter не работает на Electron, см. https://github.com/electron-userland/electron-builder/issues/2662
	HashRouter as BrowserOrDesktopOrNativeRouter,
	Switch,
	Route,
	Link,
	RouteComponentProps,
} from 'react-router-dom';