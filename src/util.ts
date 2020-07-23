/**
 * @author WMXPY
 * @namespace Silent
 * @description Util
 */

export const STANDARD_PAD: number = 25;

export const partialMatch = (children: string, parent: string): boolean => {

    if (children.length === 0) {
        return true;
    }
    if (parent.length === 0) {
        return false;
    }
    let current: number = 0;
    for (const char of parent) {

        if (char === children[current]) {
            current++;
        }
        if (current >= children.length) {
            return true;
        }
    }
    return false;
};

export const relativeNumber = (target: number): number => {

    const times: number = Math.round(target / STANDARD_PAD);
    return times * STANDARD_PAD;
};
