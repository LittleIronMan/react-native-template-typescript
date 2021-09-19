import React from 'react';
import { View } from 'react-native';
import { globalStyles, globalStyleSheet } from 'global/styles';
import i18n from 'global/Localizer';
import { MyText } from 'rnweb_ui';
import { DefaultWindowLayout, SubmitBlock, WindowComponent } from 'rnweb_ui';

interface Props {
    title: string,
    content: React.ReactNode;
}

class Window_Test extends WindowComponent<Props> {
    render() {
        return (
        <DefaultWindowLayout title={this.props.title} window={this} size={{minHeightPx: 200}}>
            <View style={globalStyleSheet.flex1bg}>
                {this.props.content}
            </View>

            <SubmitBlock submitTitle={i18n('ok')} onSubmit={() => {
                this.close();
            }}/>
        </DefaultWindowLayout>
        );
    }
}
export default Window_Test;