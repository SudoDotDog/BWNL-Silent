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

    private _description: string;

    private constructor(command: string, callback: SilentCallback) {

        this._command = command;
        this._callback = callback;
    }

    public get command(): string {

        return this._command;
    }

    public setDescription(description: string): this {

        this._description = description;
        return this;
    }

    public distance(target: string): number {

        const result: number = compare(this._command).with(target).distance;
        console.log(this._command, target, result);
        return result;
    }

    public toString(): string {

        return this._command;
    }
}
