/**
 * @author WMXPY
 * @namespace Silent
 * @description View
 * @override Story
 */

import * as React from 'react';
import { SilentCommand, SilentConfig, SilentView } from "../src/index";

export default {
    title: 'View',
};

export const View = () => {

    const config: SilentConfig = SilentConfig.create()
        .addCommand(SilentCommand.with('First Option', (arg) => console.log(arg)).setDescription('Description'))
        .addCommand(SilentCommand.with('Reload Window', () => console.log('Reload Window')));

    return (<SilentView
        style={{
            marginTop: '30%',
            width: '60%',
        }}
        config={config}
    />);
};
