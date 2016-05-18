import {expect} from 'chai';
import * as util from '../../src/util';

describe('util.getHash', () => {
    it('should return "/" when no hash', () => {
        const url = 'https://weui.com';
        const hash = util.getHash(url);
        expect(hash).to.be.equal('/');
    });

    it('should return "" when empty hash', () => {
        const url = 'https://weui.com/#';
        const hash = util.getHash(url);
        expect(hash).to.be.equal('');
    });

    it('should return "/home" with hash', () => {
        const url = 'https://weui.com/#/home';
        const hash = util.getHash(url);
        expect(hash).to.be.equal('/home');
    });
});