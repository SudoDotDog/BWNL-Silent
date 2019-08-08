/**
 * @author WMXPY
 * @namespace Silent
 * @description Config
 */

import { SilentCommand } from "./command";

export class SilentConfig {

    public static create(): SilentConfig {

        return new SilentConfig();
    }

    private readonly _commands: SilentCommand[];

    private constructor() {

        this._commands = [];
    }

    public addCommand(command: SilentCommand): this {

        this._commands.push(command);
        return this;
    }

    public getAutocomplete(keyword: string): SilentCommand[] {

        const distanced: Array<{
            distance: number;
            command: SilentCommand;
        }> = this._commands.map((command: SilentCommand) => {
            const distance: number = command.distance(keyword);
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
