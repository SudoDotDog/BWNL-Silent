/**
 * @author WMXPY
 * @namespace Silent
 * @description Declare
 */

export type SilentParamType = "string";

export type SilentCancelCallback = () => void;
export type SilentCallback = (arg?: string) => void;

export type SilentStructure = {

    readonly command: string;
    readonly callback: SilentCallback;

    readonly description?: string;
    readonly required?: boolean;
};
