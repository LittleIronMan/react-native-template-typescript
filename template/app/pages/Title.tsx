import React from 'react';
import {
    View, StyleSheet,
    Image,
    Platform,
    Animated,
} from 'react-native';
import { ImagePickerBtn, MenuItem, Sidebar } from 'rnweb_ui';
import { WindowsManager, Window, getWM } from 'rnweb_ui';
import windows from 'windows/Windows';
import i18n from 'global/Localizer';
import { RouteComponentProps } from '../routing';
import { FileTreeData, EventEmitter } from 'ironman_utils';

import IconSettings from 'img/settings.svg';

const titleHeaderHeight = 60;
const titleHeaderPadding = 5;
const iconsHeight = 40;
const menuMaxWidth = 200;

interface TitleProps extends RouteComponentProps { };

interface TitleState {
}

export default class Title extends React.Component<TitleProps, TitleState> {

    wm = getWM(true);
    menuOffsetX = new Animated.Value(0);
    firstLoading: Window | null = null;

    constructor(props: TitleProps) {
        super(props);

        this.state = {
        };

        this.openTestWindows = this.openTestWindows.bind(this);
    }

    unsubscribe() { }

    componentDidMount() {
        this.openTestWindows();
    }

    openTestWindows() {
        windows.showErrorWindow('Error title', 'Error description');
        windows.showLoadingWindow(true);
        windows.showSignUpWindow(() => {});
        const selectImageHook = new EventEmitter<string>('');
        windows.showSelectImageWindow(new FileTreeData(), selectImageHook);
        windows.testWindow('test1', 'ImagePickerBtn test',
            <ImagePickerBtn
                pickerTitle={'Upload image'}
                onImgUpload={() => {}}
                onFail={() => {}}
            >
            </ImagePickerBtn>
        );
        windows.testWindow('test2', 'SVG test',
            <IconSettings width='100%' height='100%' color='white' fill='white'/>
        );
    }

    render() {
        const menuItems: MenuItem[] = [
            { key: 'settings', title: i18n('titleMenu_settings') },
            { key: 'help', title: i18n('titleMenu_help') },
            { key: 'about', title: i18n('titleMenu_about') },
            { key: 'openTests', title: 'Открыть окна', onClick: this.openTestWindows },
        ];

        return (
            <View style={{
                height: Platform.OS === 'web' ? '100vh' : '100%',
                //backgroundColor: 'rgb(41, 41, 45)',
                alignItems: 'flex-start',
                //justifyContent: 'center',
            }}
            >
                {/* фоновое изображение */}
                <Image
                    style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}
                    source={require('./title_bg.jpg')}
                    //blurRadius={5}
                />

                {/* Лого */}
                <View style={{ /*position: 'absolute',*/ width: '100%' }}>
                    {/*<Text style={{color: 'white', fontSize: 64, paddingLeft: 28, fontWeight: 'bold'}}>Whats next</Text>*/}
                    <View style={{ width: '100%', height: titleHeaderHeight, padding: titleHeaderPadding, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('./logo.png')} style={{ /*width: '100%', */width: 70, height: iconsHeight, resizeMode: 'contain' }}/>
                        <Image source={require('./title_label.png')} style={{ /*width: '100%', width: 320, maxWidth: '80%',*/width: 200, height: iconsHeight, marginLeft: 5, resizeMode: 'contain' }}/>
                    </View>

                    <View style={{ position: 'absolute', width: '100%', height: titleHeaderHeight, backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    </View>
                </View>

                {/* Меню */}
                <Sidebar style={{ flex: 1, maxWidth: menuMaxWidth, transform: [{translateX: this.menuOffsetX as any}] }}
                    menuItems={menuItems}
                />

                <WindowsManager data={this.wm}/>
            </View>
        );
    }
}