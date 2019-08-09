/**
 * @author WMXPY
 * @namespace Silent
 * @description Config
 */

import { SilentCommand } from "./command";
import { SilentCancelCallback } from "./declare";
import { partialMatch } from "./util";

export class SilentConfig {

    public static create(): SilentConfig {

        return new SilentConfig();
    }

    private readonly _commands: SilentCommand[];
    private _onCancel: SilentCancelCallback | null = null;

    private constructor() {

        this._commands = [];
    }

    public cancel(): void {

        if (this._onCancel) {
            this._onCancel();
        }
    }

    public addCommand(command: SilentCommand): this {

        this._commands.push(command);
        return this;
    }

    public setOnCancel(callback: SilentCancelCallback): this {

        this._onCancel = callback;
        return this;
    }

    public getAutocomplete(keyword: string): SilentCommand[] {

        const splited: string[] = keyword.split(':');
        const parsedKeyword: string = splited[0].toLowerCase();
        const distanced: Array<{
            distance: number;
            command: SilentCommand;
        }> = this._commands
            .filter((command: SilentCommand) => partialMatch(parsedKeyword, command.command.toLowerCase()))
            .map((command: SilentCommand) => {
                const distance: number = command.distance(parsedKeyword);
                return { distance, command };
            });

        const sorted = distanced
            .sort((first, second) => {
                if (first.distance === second.distance) {
                    return 0;
                }
                return first.distance > second.distance ? 1 : -1;
            })
            .map((each) => each.command);

        return sorted;
    }
}
