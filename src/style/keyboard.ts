/**
 * @author WMXPY
 * @namespace Style
 * @description Keyboard
 */

import { NAVY } from "@bwnl/shiny-inline";
import { JSSStyle, StyleManager } from "@sudoo/jss";

const KeyboardStyleBase: JSSStyle = {

    key: {
        border: `1px solid ${NAVY}`,
        display: 'inline-block',
        borderRadius: '3px',
        borderBottom: `2px solid ${NAVY}`,
        paddingLeft: '5px',
        paddingRight: '5px',
        marginLeft: '1px',
        marginRight: '1px',
        fontSize: '13px',
    },
};

export const KeyboardStyle: StyleManager = StyleManager.create(KeyboardStyleBase, 'Keyboard').setPrefix('BWNL-Silent-');
