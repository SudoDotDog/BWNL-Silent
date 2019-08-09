/**
 * @author WMXPY
 * @namespace Silent
 * @description View
 */

import { Classes } from "jss";
import * as React from "react";
import { Silent, SilentProps } from "./silent";
import { SilentViewStyle } from "./style/view";

export type SilentViewProps = {

    readonly style: React.CSSProperties;
} & SilentProps;

export const SilentView: React.FC<SilentViewProps> = (props: SilentViewProps) => {

    const style: Classes = SilentViewStyle.use();

    return (<div className={style.outer}>
        <div className={style.inner} style={props.style}>
            <Silent config={props.config} />
        </div>
    </div>);
};
