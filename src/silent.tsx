/**
 * @author WMXPY
 * @namespace Silent
 * @description Silent
 */

import { assertIfFalse, assertIfTrue, mergeClasses } from "@sudoo/jss";
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
            <div className={this._style.header}>{this._getHeader()}</div>
            <div className={mergeClasses(
                this._style.body,
                assertIfFalse(this._isArgumentStage(), this._style.bodyBorder),
            )}>
                <span className={this._style.inputWrapper}>
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
                </span>
            </div>
            {
                !this._isArgumentStage() &&
                <div
                    className={this._style.dropDown}
                    ref={(ref: HTMLDivElement) => this._dropdownRef = ref}
                >
                    {this.state.options.map(this._renderOption)}
                </div>
            }
        </div>);
    }

    private _getHeader() {

        if (!this._isArgumentStage()) {
            return (<span>Command</span>);
        }

        const command: SilentCommand | undefined = this.state.options[this.state.selected];
        if (!command) {
            return null;
        }

        return (<span><strong>{command.command}</strong> Argument</span>);
    }

    private _renderOption(each: SilentCommand, index: number) {

        const selected: boolean = index === this.state.selected;
        return (<div
            key={each.command}
            className={mergeClasses(
                this._style.option,
                assertIfTrue(selected, this._style.selected),
            )}
        >
            <div className={this._style.sentence}>{each.command}</div>
            {selected && <div className={this._style.subSentence}>{each.description}</div>}
        </div>);
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        const newValue: string = event.target.value;
        console.log(newValue, this._isArgumentStage());
        if (this._isArgumentStage()) {

            const spliterCount: number = newValue.split(':').length;
            if (spliterCount >= 3) {
                return;
            }
        } else {

            if (newValue.includes(':')) {
                const command: SilentCommand | undefined = this.state.options[this.state.selected];
                if (!command) {
                    return;
                }
                this.setState({
                    selected: 0,
                    value: command.command + ':',
                    options: this.props.config.getAutocomplete(newValue),
                }, this._correctWindow);
                return;
            }
            this.setState({
                options: this.props.config.getAutocomplete(newValue),
            });
        }
        this.setState({
            selected: 0,
            value: newValue,
        }, this._correctWindow);
    }

    private _handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

        switch (event.key) {
            case 'ArrowUp':
                if (this._isArgumentStage()) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorUp();
                break;
            case 'ArrowDown':
                if (this._isArgumentStage()) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorDown();
                break;
            case 'Tab':
                if (this._isArgumentStage()) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this._moveCursorDown(true);
                break;
            case 'Enter': {
                const command: SilentCommand | undefined = this.state.options[this.state.selected];
                if (!command) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                command.execute(this.state.value);
                break;
            }
            case 'Escape': {
                event.preventDefault();
                event.stopPropagation();
                this.props.config.cancel();
            }
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
        const topLine: number = Math.round(nextPosition * 25 + 25);
        const bottomLine: number = Math.round(topLine - 25);

        const windowTop: number = Math.round(this._dropdownRef.scrollTop);
        const windowBottom: number = Math.round(this._dropdownRef.clientHeight + this._dropdownRef.scrollTop);

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

    private _isArgumentStage() {

        return this.state.value.includes(':');
    }
}
