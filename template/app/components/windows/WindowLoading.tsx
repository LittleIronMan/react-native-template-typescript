import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WindowComponent } from 'rnweb_ui';
// import BaseWindow from './BaseWindow';
import i18n from 'global/Localizer';
import { globalStyles } from 'global/styles';
import { LoadingSpinner } from 'rnweb_ui';
import { MyText } from 'rnweb_ui';

export default class WindowLoading extends WindowComponent {
    render() {
        return (
        <View style={styles.bg}>
            <View style={styles.inner}>
                <LoadingSpinner size={40}/>
                <MyText h={2} style={{marginLeft: 10}}>{i18n('windowLoading_loading')}</MyText>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        width: 240,
        height: 120,
        borderRadius: globalStyles.common.borderRadius,
        backgroundColor: globalStyles.common.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});