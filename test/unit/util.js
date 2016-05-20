import {expect} from 'chai';
import {jsdom} from 'jsdom';
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

describe('util.getRoute', () => {
    const routes = [{
        url: '/home',
        render: function () {
            return `home`;
        }
    }, {
        url: '/post/:id?',
        render: function () {
            const id = this.params.id;
            return `post ${id}`;
        }
    }, {
        url: '/user/:userId/post/:postId',
        render: function () {
            const userId = this.params['userId'];
            return `user ${userId}`;
        }
    }];

    it('should return null', () => {
        const route = util.getRoute(routes, '/category');
        expect(route).to.be.equal(null);
    });

    it('should return route', () => {
        const route = util.getRoute(routes, '/home');
        expect(route).to.be.not.equal(null);
        expect(route.url).to.be.equal(routes[0].url);
        expect(route.render).to.be.equal(routes[0].render);
    });

    it('should return route', () => {
        const route = util.getRoute(routes, `/post`);
        expect(route).to.be.not.equal(null);
        expect(route.url).to.be.equal(routes[1].url);
        expect(route.render).to.be.equal(routes[1].render);
        expect(route.params.id).to.be.equal(undefined);
    });

    it('should return route', () => {
        const id = '2';
        const route = util.getRoute(routes, `/post/${id}`);
        expect(route).to.be.not.equal(null);
        expect(route.url).to.be.equal(routes[1].url);
        expect(route.render).to.be.equal(routes[1].render);
        expect(route.params.id).to.be.equal(id);
    });

    it('should return route', () => {
        const userId = '2';
        const postId = '3';
        const route = util.getRoute(routes, `/user/${userId}/post/${postId}`);
        expect(route).to.be.not.equal(null);
        expect(route.url).to.be.equal(routes[2].url);
        expect(route.render).to.be.equal(routes[2].render);
        expect(route.params['userId']).to.be.equal(userId);
        expect(route.params['postId']).to.be.equal(postId);
    });
});

describe('util.hasChildren', () => {
    it('should have no children when body is empty', () => {
        const document = jsdom('   ');
        const body = document.body;

        const hasChildren = util.hasChildren(body);

        expect(hasChildren).to.be.equal(false);
    });

    it('should have no children when body is empty', () => {
        const document = jsdom('hello');
        const body = document.body;

        const hasChildren = util.hasChildren(body);

        expect(hasChildren).to.be.equal(false);
    });

    it('should have children when body is not empty', () => {
        const document = jsdom('<div>router</div>');
        const body = document.body;

        const hasChildren = util.hasChildren(body);

        expect(hasChildren).to.be.equal(true);
    });
});