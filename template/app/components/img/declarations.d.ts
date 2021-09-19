declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

// тестовый проект с использованием svg https://github.com/kristerkari/react-native-svg-example