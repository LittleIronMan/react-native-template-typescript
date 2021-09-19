import React from 'react';
import { View } from 'react-native';
import { globalStyles } from 'global/styles';
import i18n from 'global/Localizer';
import { WindowComponent } from 'rnweb_ui';
import { DefaultWindowLayout, SubmitBlock, Formik, FormikProps, FormikErrors } from 'rnweb_ui';
import { TextInputWithTitle } from 'rnweb_ui';
import { FileTree, FileTreeData } from 'ironman_utils';

interface Props {
    /** current dir */
    cd: FileTree;
    onSubmit: (dirname: string) => void;
}

interface MyFormValues {
    folderName: string;
}

class WindowCreateNewFolder_Form extends React.PureComponent<FormikProps<MyFormValues> & {otherProps: Props & { window: WindowComponent }}> {
    render() {
        return <View>
            <View style={{flex: 1}}>
                <TextInputWithTitle
                    title={i18n('windowNewFolder_folderName')}
                    placeholder={i18n('windowNewFolder_folderNamePlaceholder')}
                    value={this.props.values.folderName}
                    formikError={this.props.checkError('folderName')}
                    onChangeText={this.props.handleChange('folderName')}
                />
            </View>
            <SubmitBlock
                submitTitle={i18n('create')}
                onSubmit={() => {
                    let noErrors = this.props.handleSubmit();
                    if (noErrors) {
                        this.props.otherProps.onSubmit(this.props.values.folderName);
                        this.props.otherProps.window.close();
                    }
                }}
            />
        </View>
    }
}

class WindowCreateNewFolder extends WindowComponent<Props> {
    render() {
        return <DefaultWindowLayout title={i18n('windowNewFolder_title')} window={this} size={{minHeightPx: 0}} style={{width: undefined, height: undefined}}>
            <Formik<MyFormValues, Props & { window: WindowComponent }>
                otherProps={{...this.props, window: this}}
                component={WindowCreateNewFolder_Form}
                initialValues={{
                    folderName: '',
                }}
                validateOnBlur={false}
                validateOnChange={false}
                validate={(values) => {
                    let errors: FormikErrors<MyFormValues> = { };

                    // название папки
                    let err: string | undefined = undefined;
                    let f = values.folderName;
                    if (f.length == 0) { err = i18n('validateForm_required'); }
                    // else if (f.length < 4) { err = i18n('tooShort'); }
                    // else if (f.length > 16) { err = i18n('tooLong'); }
                    errors.folderName = err;

                    if (!errors.folderName) {
                        if (!FileTree.isValidName(f)) {
                            errors.folderName = i18n('validateForm_invalidFilename');
                        }
                    }

                    if (!errors.folderName) {
                        if (FileTree.findDuplicates(this.props.cd, f)) {
                            errors.folderName = i18n('windowNewFolder_foundDuplicates');
                        }
                    }

                    return errors;
                }}
            />
        </DefaultWindowLayout>
    }
}
export default WindowCreateNewFolder;