/**
 * @author WMXPY
 * @namespace Style
 * @description View
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const SilentViewStyleBase: JSSStyle = {

    outer: {
        position: 'fixed',
        zIndex: 15,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        width: '100vw',
    },
    inner: {

    },
};

export const SilentViewStyle: StyleManager = StyleManager.create(SilentViewStyleBase, 'View').setPrefix('BWNL-Silent-');
