/**
 * @author WMXPY
 * @namespace Style
 * @description Silent
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";
import { NAVY } from "./color";

const SilentStyleBase: JSSStyle = {

    wrapper: {
        border: `3px solid ${NAVY}`,

        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: 'auto',
    },
    body: {
        display: 'flex',
        flex: 1,
    },
    input: {
        border: 0,
        flex: 1,
        outline: 0,
        paddingLeft: '9px',
        height: '36px',
        fontSize: '25px',
    },
    dropDown: {
        height: `${25 * 6}px`,
        overflow: 'auto',
    },
    option: {
        paddingLeft: '9px',
        height: '25px',
    },
    selected: {
        backgroundColor: NAVY,
        color: 'white',
    },
};

export const SilentStyle: StyleManager = StyleManager.create(SilentStyleBase, 'Silent').setPrefix('BWNL-Silent-');
