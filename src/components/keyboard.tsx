/**
 * @author WMXPY
 * @namespace Components
 * @description Keyboard
 */

import { Classes } from "jss";
import * as React from "react";
import { KeyboardStyle } from "../style/keyboard";

export type KeyboardKeyProps = {

    readonly key: string;
};

export const KeyboardKey: React.FC<KeyboardKeyProps> = (props: KeyboardKeyProps) => {

    const style: Classes = KeyboardStyle.use();

    return (<div className={style.outer}>
        123
    </div>);
};
