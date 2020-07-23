/**
 * @author WMXPY
 * @namespace Silent
 * @description Example
 * @override Story
 */

import * as React from 'react';
import { Silent, SilentCommand, SilentConfig } from "../src/index";

export default {
    title: 'Example',
};

export const Simple = () => {

    const config: SilentConfig = SilentConfig.create()
        .addCommand(SilentCommand.with('First Option', () => console.log('First Option')).setDescription('A Very Long Description '.repeat(10)))
        .addCommand(SilentCommand.with('Reload Window', () => console.log('Reload Window')))
        .addCommand(SilentCommand.with('Second Option', () => console.log('Second Option')))
        .addCommand(SilentCommand.with('Something Else', () => console.log('Something Else')))
        .addCommand(SilentCommand.with('Third Option', () => console.log('Third Option')))
        .addCommand(SilentCommand.with('Very Short', () => console.log('Very Short')))
        .addCommand(SilentCommand.with('Require Argument', () => console.log('Aha')).requireArgument())
        .addCommand(SilentCommand.with('Another Command That is really long', () => console.log('Another Command That is really long')))
        .addCommand(SilentCommand.with('End Option', () => console.log('End Option')));

    return (<Silent
        header={<span>Header</span>}
        closeButton={<div style={{ width: '50px', backgroundColor: 'black' }}>1t</div>}
        config={config}
    />);
};
