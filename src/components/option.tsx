/**
 * @author WMXPY
 * @namespace Components
 * @description Option
 */

import { assertIfTrue, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { SilentCommand } from "../config/command";
import { SilentStyle } from "../style/silent";

export type SilentOptionProps = {

    readonly command: SilentCommand;
    readonly onClick: () => void;
    readonly selected: boolean;
};

export const SilentOption: React.FC<SilentOptionProps> = (props: SilentOptionProps) => {

    const style: Classes = SilentStyle.use();

    const selected: boolean = props.selected;
    const command: SilentCommand = props.command;

    return (<div
        onClick={props.onClick}
        className={mergeClasses(
            style.option,
            assertIfTrue(selected, style.selected),
        )}
    >
        <div className={style.sentence}>
            {command.command}
        </div>
        {selected &&
            <div className={style.subSentence}>
                {command.description}
            </div>
        }
    </div>);
};
