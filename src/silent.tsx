/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/unbound-method */
/**
 * @author WMXPY
 * @namespace Silent
 * @description Silent
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { SilentOption } from "./components/option";
import { SilentCommand } from "./config/command";
import { SilentConfig } from "./config/config";
import { SilentStyle } from "./style/silent";
import { relativeNumber } from "./util";

export type SilentProps = {

    readonly closeButton?: React.ReactNode;
    readonly header?: React.ReactNode;
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
    private _inputRef: HTMLInputElement | null = null;

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

        const dropDown: boolean = this._shouldDisplayDropdown();
        return (<div className={this._style.wrapper}>
            {this._renderHeader()}
            <div className={mergeClasses(
                this._style.body,
                assertIfTrue(dropDown, this._style.bodyBorder),
            )}>
                <span className={this._style.inputWrapper}>
                    <input
                        autoFocus
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        ref={(ref: HTMLInputElement) => this._inputRef = ref}
                        className={this._style.input}
                        value={this.state.value}
                        onKeyDown={this._handleKeyDown}
                        onChange={this._handleChange}
                    />
                </span>
            </div>
            {true &&
                <div
                    className={this._style.dropDown}
                    ref={(ref: HTMLDivElement) => this._dropdownRef = ref}
                >
                    {this.state.options.map(this._renderOption)}
                </div>}
        </div>);
    }

    private _renderHeader() {

        if (!(this.props.header || this.props.closeButton)) {
            return null;
        }

        return (<div className={this._style.headerWrapper}>
            <div className={this._style.header}>
                {this.props.header || null}
            </div>
            {this.props.closeButton && <div>
                {this.props.closeButton}
            </div>}
        </div>);
    }

    private _renderOption(each: SilentCommand, index: number) {

        const selected: boolean = index === this.state.selected;
        return (<SilentOption
            onClick={() => this._executeCommand(each, this.state.value)}
            key={each.command}
            command={each}
            selected={selected}
        />);
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        const newValue: string = event.target.value;
        const command: SilentCommand | undefined = this.state.options[this.state.selected];
        if (!command) {
            if (this._isArgumentStage() && newValue.includes(':')) {
                return;
            }
        }
        this._performChange(command, newValue);
        return;
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
                this._executeCommand(command, this.state.value);
                break;
            }
            case 'Escape': {
                event.preventDefault();
                event.stopPropagation();
                this.props.config.cancel();
                break;
            }
        }
        return;
    }

    private _executeCommand(command: SilentCommand, value: string) {

        if (command.shouldClose) {
            this.props.config.cancel();
        }
        if (this._isArgumentStage()) {
            command.execute(value);
            return;
        }
        if (command.isRequireArgument) {
            this._performChange(command, `${command.command}:`);
            if (this._inputRef) {
                this._inputRef.focus();
            }
            return;
        }
        command.execute(value);
    }

    private _performChange(command: SilentCommand, value: string) {

        if (this._isArgumentStage()) {

            const spliterCount: number = value.split(':').length;
            if (spliterCount >= 3) {
                return;
            }
        } else {

            if (value.includes(':')) {
                if (!command) {
                    return;
                }
                const fixedValue: string = `${command.command}:`;
                this.setState({
                    selected: 0,
                    value: fixedValue,
                    options: this.props.config.getAutocomplete(fixedValue),
                }, this._correctWindow);
                return;
            }
        }
        this.setState({
            selected: 0,
            value,
            options: this.props.config.getAutocomplete(value),
        }, this._correctWindow);
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
        const topLine: number = nextPosition * 25 + 25;
        const bottomLine: number = topLine;

        const scrollTop: number = relativeNumber(this._dropdownRef.scrollTop);
        const clientHeight: number = relativeNumber(this._dropdownRef.clientHeight);

        const windowTop: number = relativeNumber(scrollTop);
        const windowBottom: number = relativeNumber(clientHeight + scrollTop);

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

    private _shouldDisplayDropdown() {

        if (this.state.options.length === 0) {
            return false;
        }

        return true;
    }

    private _isArgumentStage() {

        return this.state.value.includes(':');
    }
}
