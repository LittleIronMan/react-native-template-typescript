import * as React from 'react';

export {
    // BrowserOrDesktopOrNativeRouter разный для разных платформ, см. файлы .native, .browser, .electron
    // MemoryRouter в данном файле выбран для примера, чтобы компилятор не ругался
    MemoryRouter as BrowserOrDesktopOrNativeRouter,
    Switch,
    Route,
    RouteComponentProps,
    // Link // Разный для разных платформ
} from 'react-router';

// взял отсюда: https://codersera.com/blog/react-native-web-tutorials-your-first-hybrid-app/