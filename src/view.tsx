/**
 * @author WMXPY
 * @namespace Silent
 * @description View
 */

import { assertIfFalse, assertIfTri, mergeClasses } from "@sudoo/jss";
import { Classes } from "jss";
import * as React from "react";
import { Silent, SilentProps } from "./silent";
import { SilentViewStyle } from "./style/view";

export type SilentViewProps = {

    readonly style: React.CSSProperties;
    readonly zIndex?: number;
    readonly onCancel?: () => void;
} & SilentProps;

export const SilentView: React.FC<SilentViewProps> = (props: SilentViewProps) => {

    const style: Classes = SilentViewStyle.use();
    const hasOnCancel: boolean = typeof props.onCancel === 'function';

    return (<div
        className={mergeClasses(
            style.outer,
            assertIfTri(hasOnCancel, style.outerCancelable, style.outerTransparent),
        )}
        style={{
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            zIndex: props.zIndex || 15,
        }}
        onClick={props.onCancel}
    >
        <div
            className={mergeClasses(
                style.inner,
                assertIfFalse(hasOnCancel, style.innerTransparent),
            )}
            style={props.style}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
            <Silent
                header={props.header}
                config={props.config}
            />
        </div>
    </div>);
};
