import _ from 'lodash';
import { globalStyles as defaultTheme } from 'rnweb_ui';
export { globalStyleSheet, rgba, lighten, darken } from 'rnweb_ui';

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * Кастомные свойства проекта
 */
const customStyles: RecursivePartial<typeof defaultTheme> = {
    common: {
        backgroundColor_m1: "rgb(0,81,81)",
        backgroundColor: "rgb(0,91,91)",
        backgroundColor2: "rgb(0,111,111)",
        backgroundColor3: "rgb(0,131,131)",
    },
    window: {
        borderRadius: 0,
    }
};

export const globalStyles = _.merge(defaultTheme, customStyles);