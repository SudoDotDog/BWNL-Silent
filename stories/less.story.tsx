/**
 * @author WMXPY
 * @namespace Silent
 * @description Less
 * @override Story
 */

import * as React from 'react';
import { Silent, SilentCommand, SilentConfig } from "../src/index";

export default {
    title: 'Less',
};

export const Less = () => {

    const config: SilentConfig = SilentConfig.create()
        .addCommand(SilentCommand.with('First Option', (arg) => console.log(arg)).setDescription('Description'))
        .addCommand(SilentCommand.with('Reload Window', () => console.log('Reload Window')));

    return (<Silent
        closeButton="X"
        config={config}
    />);
};
