import React from 'react';
import { View } from 'react-native';
import { globalStyles, globalStyleSheet } from 'global/styles';
import i18n from 'global/Localizer';
import { MyText } from 'rnweb_ui';
import { DefaultWindowLayout, SubmitBlock, WindowComponent } from 'rnweb_ui';

interface Props {
    errorDesc: string,
    errorTitle?: string,
}

class WindowError extends WindowComponent<Props> {
    render() {
        return (
        <DefaultWindowLayout title={i18n('windowError_title')} window={this} size={{minHeightPx: 200}}>
            {this.props.errorTitle ?
            <MyText>{this.props.errorTitle}</MyText>
            : null}

            <View style={globalStyleSheet.flex1bg}>
                <MyText style={{color: globalStyles.error.textColor}}>{this.props.errorDesc}</MyText>
            </View>

            <SubmitBlock submitTitle={i18n('ok')} onSubmit={() => {
                this.close();
            }}/>
        </DefaultWindowLayout>
        );
    }
}
export default WindowError;