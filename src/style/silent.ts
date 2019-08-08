/**
 * @author WMXPY
 * @namespace Style
 * @description Silent
 */

import { JSSStyle, StyleManager } from "@sudoo/jss";

const SilentStyleBase: JSSStyle = {
};

export const SilentStyle: StyleManager = StyleManager.create(SilentStyleBase, 'Silent').setPrefix('BWNL-Silent-');
