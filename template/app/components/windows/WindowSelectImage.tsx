import React from 'react';
import { View } from 'react-native';
import { globalStyles } from 'global/styles';
import i18n from 'global/Localizer';
import { FileBrowser } from 'rnweb_ui';
import { FileTreeData } from 'ironman_utils';
import { DefaultWindowLayout, SubmitBlock, WindowComponent } from 'rnweb_ui';

interface Props {
    imagesStorage: FileTreeData;
    newImage: (fileBrowserRef: FileBrowser) => void;
    createFolder: (fileBrowserRef: FileBrowser) => void;
    onSelectImage: (componentPath: string) => void;
}
interface State {
    selectedImagePath: string | null;
}

class WindowSelectComponentFromWarehouse extends WindowComponent<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {selectedImagePath: null};
    }

    render() {
        return <DefaultWindowLayout title={i18n('windowSelectImage_title')} window={this} size={{minWidthPx: 500, minHeightPx: 500}}>
            <FileBrowser key='mainContent'
                fileTree={this.props.imagesStorage}
                newFileClick={this.props.newImage}
                newFolderClick={this.props.createFolder}
                onReselectComponent={(componentPath) => this.setState({selectedImagePath: componentPath})}
                style={{
                    flex: 1,
                    marginBottom: globalStyles.common.margin,
                    padding: 0.5 * globalStyles.common.margin,
                    paddingRight: 0,
                }}
            />
            <SubmitBlock
                submitTitle={i18n('ok')}
                onSubmit={() => {
                    if (this.state.selectedImagePath) {
                        this.props.onSelectImage(this.state.selectedImagePath)
                    }
                    this.close();
                }}
            />
        </DefaultWindowLayout>
    }
}
export default WindowSelectComponentFromWarehouse;