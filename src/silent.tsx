/**
 * @author WMXPY
 * @namespace Silent
 * @description Silent
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { SilentCommand } from "./command";
import { SilentConfig } from "./config";
import { SilentStyle } from "./style/silent";

export type SilentProps = {

    readonly config: SilentConfig;
};

export type SilentStates = {

    readonly value: string;
    readonly selected: number;
};

export class Silent extends React.Component<SilentProps, SilentStates> {

    public readonly state: SilentStates = {

        value: '',
        selected: 0,
    };

    private _style: Classes = SilentStyle.use();

    public constructor(props: SilentProps) {

        super(props);

        this._renderOption = this._renderOption.bind(this);
    }

    public render() {

        const autoCompletes: SilentCommand[] = this.props.config.getAutocomplete(this.state.value);

        return (<div className={this._style.wrapper}>
            <div className={this._style.header}>Command</div>
            <div className={this._style.body}>
                <input
                    className={this._style.input}
                    onChange={(event) => this.setState({ value: event.target.value })}
                />
            </div>
            <div className={this._style.dropDown}>
                {autoCompletes.map(this._renderOption)}
            </div>
        </div>);
    }

    private _renderOption(each: SilentCommand, index: number) {

        return (<div
            key={each.command}
            className={mergeClasses(
                this._style.option,
                assertIfTrue(index === this.state.selected, this._style.selected),
            )}
        >
            {each.command}
        </div>);
    }
}
