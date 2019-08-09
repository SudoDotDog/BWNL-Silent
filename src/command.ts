/**
 * @author WMXPY
 * @namespace Silent
 * @description Command
 */

import { compare } from "@sudoo/bark/string";
import { SilentCallback } from "./declare";

export class SilentCommand {

    public static with(command: string, callback: SilentCallback): SilentCommand {

        return new SilentCommand(command, callback);
    }

    private readonly _command: string;
    private readonly _callback: SilentCallback;

    private _description: string = '';
    private _close: boolean = true;

    private constructor(command: string, callback: SilentCallback) {

        this._command = command;
        this._callback = callback;
    }

    public get command(): string {

        return this._command;
    }

    public get callback(): SilentCallback {

        return this._callback;
    }

    public get description(): string {

        return this._description;
    }

    public get close(): boolean {

        return this._close;
    }

    public setDescription(description: string): this {

        this._description = description;
        return this;
    }

    public preventClose(): this {

        this._close = false;
        return this;
    }

    public execute(value: string): this {

        const splited: string[] = value.split(':');

        if (splited.length === 2) {
            const arg: string = splited[1];
            this.callback(arg.trim());
        } else {
            this._callback();
        }
        return this;
    }

    public distance(target: string): number {

        const result: number = compare(this._command).with(target).distance;
        return result;
    }

    public toString(): string {

        return this._command;
    }
}
