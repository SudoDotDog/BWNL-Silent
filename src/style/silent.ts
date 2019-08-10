/**
 * @author WMXPY
 * @namespace Style
 * @description Silent
 */

import { GRAY, NAVY, WHITE } from "@bwnl/shiny-inline";
import { JSSStyle, StyleManager } from "@sudoo/jss";

const SilentStyleBase: JSSStyle = {

    wrapper: {
        backgroundColor: WHITE,
        border: `3px solid ${NAVY}`,

        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: 'auto',
        paddingLeft: '5px',
        color: NAVY,
    },
    body: {
        display: 'flex',
        flex: 1,
    },
    bodyBorder: {
        borderBottom: `3px solid ${NAVY}`,
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        boxSizing: 'border-box',
        width: 'calc(100% - 1px)',
        border: 0,
        outline: 0,
        margin: 0,
        padding: 0,
        paddingLeft: '9px',
        paddingRight: '9px',
        height: '36px',
        fontSize: '25px',
    },
    dropDown: {
        maxHeight: `${25 * 6}px`,
        overflow: 'auto',
    },
    sentence: {
        height: '25px',
        fontSize: '16px',
    },
    subSentence: {
        color: GRAY,
        height: '25px',
        fontSize: '15px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    option: {
        boxSizing: 'border-box',
        paddingLeft: '9px',
        paddingRight: '9px',
        height: '25px',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            backgroundColor: NAVY,
            color: WHITE,
        },
    },
    selected: {
        backgroundColor: NAVY,
        color: WHITE,
        height: '50px',
    },
};

export const SilentStyle: StyleManager = StyleManager.create(SilentStyleBase, 'Silent').setPrefix('BWNL-Silent-');
