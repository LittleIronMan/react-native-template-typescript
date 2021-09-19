import React from 'react';
import { DefaultWindowLayout, SubmitBlock, WindowComponent } from 'rnweb_ui';
import { Formik, FormikErrors, FormikProps } from 'rnweb_ui';
import { globalStyles, globalStyleSheet } from 'global/styles';
import i18n from 'global/Localizer';
import { TextInputWithTitle } from 'rnweb_ui';
import { MyScrollView } from 'rnweb_ui';
import { View } from 'react-native';
import { getPasswordStrength } from 'ironman_utils';

interface Props {
    onSubmit: (email: string, password: string, login?: string) => void,
}

interface MyFormValues {
    email: string;
    login: string;
    secret: string;
    secret2: string;
}

class WindowSignUp_Form extends React.PureComponent<FormikProps<MyFormValues> & {otherProps: Props & { window: WindowComponent }}> {
    componentDidMount() {
        //this.props.otherProps.onMount(this);
    }

    render() { 
    let p = this.props;
    const isSignUp = this.props.otherProps.window.windowId == 'signUp';

    return (
    <View style={{flex: 1}}>
        <MyScrollView key='mainContent'
        style={globalStyleSheet.flex1bg}
        persistentScrollbar={true}
        >
            <TextInputWithTitle title={i18n('windowSignUp_email')}
                maxLength={254}
                formikError={p.checkError('email')}
                onChangeText={p.handleChange('email')}
                onBlur={(event) => {p.handleBlur('email');}}
                value={p.values.email}
            />

            {isSignUp ?
            <TextInputWithTitle title={i18n('windowSignUp_login')}
                maxLength={33}
                formikError={p.checkError('login')}
                onChangeText={p.handleChange('login')}
                onBlur={(event) => {p.handleBlur('login');}}
                value={p.values.login}
            />
            : null}

            <TextInputWithTitle title={i18n('windowSignUp_password')}
                secureTextEntry={true}
                formikError={p.checkError('secret')}
                onChangeText={p.handleChange('secret')}
                onBlur={p.handleBlur('secret')}
                value={p.values.secret}
            />

            {isSignUp ?
            <TextInputWithTitle title={i18n('windowSignUp_password2')}
                secureTextEntry={true}
                formikError={p.checkError('secret2')}
                onChangeText={p.handleChange('secret2')}
                onBlur={p.handleBlur('secret2')}
                value={p.values.secret2}
            />
            : null}
        </MyScrollView>
        <SubmitBlock
            submitTitle={isSignUp ? i18n('windowSignUp_signUp') : i18n('windowSignUp_signIn')}
            onSubmit={async () => {
                let noErrors = p.handleSubmit();
                if (noErrors) {
                    p.otherProps.onSubmit(p.values.email, p.values.secret, p.values.login);
                }
            }}
        />
    </View>
    );
    }
}

/**
 * Окно регистрации или входа в систему
 */
export default class WindowSignUp extends WindowComponent<Props> {
    render() {
        const isSignUp = this.windowId == 'signUp';

        return (
        <DefaultWindowLayout title={isSignUp ? i18n('windowSignUp_title') : i18n('windowSignUp_titleSignIn')} window={this}>
            <Formik<MyFormValues, Props & { window: WindowComponent }>
            otherProps={{...this.props, window: this}}
            component={WindowSignUp_Form}
            initialValues={{
                email: '',
                login: '',
                secret: '',
                secret2: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validate={(values) => {
                const errors: FormikErrors<MyFormValues> = { };

                // просто проверяет, что юзер ввел в поле электронной почты нечто,
                // хотябы отдаленно похожее на email
                const validateEmail = function(email: string) {
                    return /\S+@\S+\.\S+/.test(email);
                };

                // email
                let err: string | undefined = undefined;
                let e = values.email;
                if (!validateEmail(e)) { err = i18n('windowSignUp_invalidEmail'); }
                errors.email = err;

                // login
                if (isSignUp) {
                    err = undefined;
                    let l = values.login;
                    if (l.length == 0) { err = i18n('validateForm_required'); }
                    else if (l.length < 4) { err = i18n('validateForm_tooShort'); }
                    else if (l.length > 32) { err = i18n('validateForm_tooLong'); }
                    errors.login = err;
                }

                // password
                err = undefined;
                let p1 = values.secret;
                if (p1.length == 0) { err = i18n('validateForm_required'); }
                else if (isSignUp) {
                    if (p1.length < 8) { err = i18n('windowSignUp_passwordTooShort12'); }
                    else {
                        const result = getPasswordStrength(p1);
                        const warnings: string[] = [];
                        if (result.digits == 0) {
                            warnings.push(i18n('windowSignUp_atLeastOneDigit'));
                        }
                        if (result.special == 0) {
                            warnings.push(i18n('windowSignUp_atLeastOneSpec'));
                        }
                        if (result.lower == 0) {
                            warnings.push(i18n('windowSignUp_atLeastOneLower'));
                        }
                        if (result.upper == 0) {
                            warnings.push(i18n('windowSignUp_atLeastOneUpper'));
                        }

                        if (warnings.length > 0) {
                            err = i18n('windowSignUp_atLeastPrefix') + warnings.join(', ') + '.';
                        }
                    }
                }
                errors.secret = err;

                // repeat password
                if (isSignUp) {
                    err = undefined;
                    let p2 = values.secret2;
                    if (p2 !== p1) { err = i18n('windowSignUp_passwordsDontMatch'); }
                    errors.secret2 = err;
                }

                return errors;
            }}
        />
        </DefaultWindowLayout>
        );
    }
}