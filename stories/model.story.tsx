/**
 * @author WMXPY
 * @namespace Silent
 * @description Model
 * @override Story
 */

import * as React from 'react';
import { SilentCommand, SilentConfig, SilentView } from "../src/index";

export default {
    title: 'Model',
};

export const Model = () => {

    const config: SilentConfig = SilentConfig.create()
        .addCommand(SilentCommand.with('First Option', (arg) => console.log(arg)).setDescription('Description'))
        .addCommand(SilentCommand.with('Reload Window', () => console.log('Reload Window')));

    return (<SilentView
        onCancel={() => console.log('canceled')}
        style={{
            marginTop: '30%',
            width: '60%',
        }}
        config={config}
    />);
};
