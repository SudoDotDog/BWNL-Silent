/**
 * @author WMXPY
 * @namespace Silent
 * @description Silent
 */

import * as React from "react";
import { SilentCommand } from "./command";
import { SilentConfig } from "./config";

export type SilentProps = {

    readonly config: SilentConfig;
};

export type SilentStates = {

    readonly value: string;
};

export class Silent extends React.Component<SilentProps, SilentStates> {

    public readonly state: SilentStates = {

        value: '',
    };

    public render() {

        const autoCompletes: SilentCommand[] = this.props.config.getAutocomplete(this.state.value);
        console.log(autoCompletes);

        return (<div>
            <div>Command</div>
            <div>
                <input />
            </div>
        </div>);
    }
}
