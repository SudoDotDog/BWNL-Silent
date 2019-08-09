/**
 * @author WMXPY
 * @namespace Silent
 * @description Util
 */

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
