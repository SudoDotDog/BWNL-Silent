/**
 * @author WMXPY
 * @namespace Style
 * @description Silent
 */

import { GRAY, NAVY, WHITE } from "@bwnl/shiny-inline";
import { StyleManager, Styles } from "@sudoo/jss";
import { STANDARD_PAD } from "../util";

const SilentStyleBase: Styles = {

    wrapper: {
        backgroundColor: WHITE,
        border: `3px solid ${NAVY}`,

        display: 'flex',
        flexDirection: 'column',
    },
    headerWrapper: {
        display: 'flex',
    },
    header: {
        height: 'auto',
        paddingLeft: '5px',
        color: NAVY,
        flex: 1,
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
        marginTop: '1px',
        marginBottom: '1px',
        marginLeft: '1px',
        paddingLeft: '9px',
        paddingRight: '9px',
        height: '36px',
        fontSize: '25px',
    },
    dropDown: {
        maxHeight: `${STANDARD_PAD * 6}px`,
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
