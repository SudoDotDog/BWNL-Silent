/**
 * @author WMXPY
 * @namespace Silent
 * @description Util
 * @override Unit Test
 */

import { expect } from 'chai';
import { partialMatch } from '../../src/util';

describe('Given [Util] helper methods', (): void => {

    it('should be able to validate string - 1', (): void => {

        const children: string = 'abc';
        const parent: string = 'abc';

        const result: boolean = partialMatch(children, parent);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('should be able to validate string - 2', (): void => {

        const children: string = 'abc';
        const parent: string = 'acbdc';

        const result: boolean = partialMatch(children, parent);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('should be able to validate string - 3', (): void => {

        const children: string = 'abc';
        const parent: string = 'acbddab';

        const result: boolean = partialMatch(children, parent);

        // tslint:disable-next-line
        expect(result).to.be.false;
    });

    it('should be able to validate string - 4', (): void => {

        const children: string = 'c';
        const parent: string = 'apple';

        const result: boolean = partialMatch(children, parent);

        // tslint:disable-next-line
        expect(result).to.be.false;
    });

    it('should be able to validate string - 5', (): void => {

        const children: string = 'c c';
        const parent: string = 'abc plane c';

        const result: boolean = partialMatch(children, parent);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });
});
