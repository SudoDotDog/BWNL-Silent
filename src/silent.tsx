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
    readonly options: SilentCommand[];
    readonly selected: number;
};

export class Silent extends React.Component<SilentProps, SilentStates> {

    public readonly state: SilentStates = {

        value: '',
        options: this.props.config.getAutocomplete(''),
        selected: 0,
    };

    private _style: Classes = SilentStyle.use();
    private _dropdownRef: HTMLDivElement | null = null;

    public constructor(props: SilentProps) {

        super(props);

        this._renderOption = this._renderOption.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._moveCursorUp = this._moveCursorUp.bind(this);
        this._moveCursorDown = this._moveCursorDown.bind(this);
        this._correctWindow = this._correctWindow.bind(this);
    }

    public render() {

        return (<div className={this._style.wrapper}>
            <div className={this._style.header}>Command</div>
            <div className={this._style.body}>
                <input
                    autoFocus
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    className={this._style.input}
                    value={this.state.value}
                    onKeyDown={this._handleKeyDown}
                    onChange={this._handleChange}
                />
            </div>
            <div
                className={this._style.dropDown}
                ref={(ref: HTMLDivElement) => this._dropdownRef = ref}
            >
                {this.state.options.map(this._renderOption)}
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

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        const newValue: string = event.target.value;
        this.setState({
            selected: 0,
            value: event.target.value,
            options: this.props.config.getAutocomplete(event.target.value),
        }, this._correctWindow);
    }

    private _handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

        console.log(event.key);
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorUp();
                break;
            case 'ArrowDown':
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorDown();
                break;
            case 'Tab':
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorDown(true);
                break;
        }
        return;
    }

    private _moveCursorUp(recursive?: boolean) {

        const newSelected: number = this.state.selected - 1;
        if (recursive) {
            this.setState({ selected: newSelected < 0 ? this.state.options.length - 1 : newSelected }, this._correctWindow);
        } else {
            this.setState({ selected: Math.max(newSelected, 0) }, this._correctWindow);
        }
    }

    private _moveCursorDown(recursive?: boolean) {

        const newSelected: number = this.state.selected + 1;
        if (recursive) {
            this.setState({ selected: newSelected > this.state.options.length - 1 ? 0 : newSelected }, this._correctWindow);
        } else {
            this.setState({ selected: Math.min(newSelected, this.state.options.length - 1) }, this._correctWindow);
        }
    }

    private _correctWindow() {

        if (!this._dropdownRef) {
            return;
        }
        const nextPosition: number = this.state.selected;
        const topLine: number = nextPosition * 25;
        const bottomLine: number = topLine + 25;

        const windowTop: number = this._dropdownRef.scrollTop;
        const windowBottom: number = this._dropdownRef.clientHeight + this._dropdownRef.scrollTop;
        if (topLine >= windowBottom) {
            this._dropdownRef.scrollTo({
                top: windowTop + 25,
            });
        }
        if (bottomLine <= windowTop) {
            this._dropdownRef.scrollTo({
                top: windowTop - 25,
            });
        }
    }
}
