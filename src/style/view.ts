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
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
    },
    outerTransparent: {
        pointerEvents: 'none',
    },
    outerCancelable: {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    inner: {
    },
    innerTransparent: {
        pointerEvents: 'auto',
    },
};

export const SilentViewStyle: StyleManager = StyleManager.create(SilentViewStyleBase, 'View').setPrefix('BWNL-Silent-');
