import { BrowserOrDesktopOrNativeRouter, Switch, Route } from './routing';
import React from 'react';
import { View } from 'react-native';
import Title from 'pages/Title';

interface AppProps { };

export default class App extends React.PureComponent<AppProps> {
    render() {
        return (
            <View>
                <BrowserOrDesktopOrNativeRouter>
                    <Switch>
                        <Route exact path='/' render={props => <Title {...props} />} />
                        {/* <Route path='/some_another_page' render={props => <AnotherPage {...props} />} /> */}
                    </Switch>
                </BrowserOrDesktopOrNativeRouter>
            </View>
        );
    }
}
