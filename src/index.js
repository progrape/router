import * as util from './util';
import pathToRegexp from 'path-to-regexp';

/**
 * a very simple router for the **demo** of [weui](https://github.com/weui/weui)
 */
class Router {

    // default option
    _options = {
        container: '#container',
        enter: 'enter',
        enterTimeout: 0,
        leave: 'leave',
        leaveTimeout: 0
    };

    _index = 1;

    // container element
    _$container = null;

    // array of route config
    _routes = [];

    // default route config
    _default = null;

    /**
     * constructor
     * @param options
     */
    constructor(options) {
        this._options = Object.assign({}, this._options, options);
        this._$container = document.querySelector(this._options.container);
    }

    /**
     * initial
     * @returns {Router}
     */
    init() {

        // why not `history.pushState`? see https://github.com/weui/weui/issues/26, Router in wechat webview
        window.addEventListener('hashchange', (event) => {
            const hash = util.getHash(event.newURL);
            const state = history.state || {};

            this.go(hash, state._index <= this._index);
        }, false);

        if (history.state && history.state._index) {
            this._index = history.state._index;
        }

        this._index--;

        const hash = util.getHash(location.href);
        const route = util.getRoute(this._routes, hash);
        this.go(route ? hash : this._default);

        return this;
    }

    /**
     * push route config into routes array
     * @param {Object} route
     * @returns {Router}
     */
    push(route) {
        route = Object.assign({}, {
            url: '*',
            className: '',
            render: util.noop,
            bind: util.noop
        }, route);
        this._routes.push(route);
        return this;
    }

    /**
     * set default url when no matcher was found
     * @param {String} url
     * @returns {Router}
     */
    setDefault(url) {
        this._default = url;
        return this;
    }

    /**
     * go to the specify url
     * @param {String} url
     * @param {Boolean} isBack, default: false
     * @returns {Router}
     */
    go(url, isBack = false) {
        const route = util.getRoute(this._routes, url);
        if (route) {

            const callback = (err, html = '') => {
                if (err) {
                    throw err;
                }

                // if have child already
                const hasChildren = util.hasChildren(this._$container);
                if (hasChildren) {
                    let child = this._$container.children[0];
                    if (isBack) {
                        child.classList.add(this._options.leave);
                    }

                    if (this._options.leaveTimeout > 0) {
                        setTimeout(() => {
                            child.parentNode.removeChild(child);
                        }, this._options.leaveTimeout);
                    }
                    else {
                        child.parentNode.removeChild(child);
                    }

                }

                let node = document.createElement('div');

                // add class name
                if (route.className) {
                    node.classList.add(route.className);
                }

                node.innerHTML = html;
                this._$container.appendChild(node);
                // add class
                if (!isBack && this._options.enter && hasChildren) {
                    node.classList.add(this._options.enter);
                }

                if (this._options.enterTimeout > 0) {
                    setTimeout(() => {
                        node.classList.remove(this._options.enter);
                    }, this._options.enterTimeout);
                }
                else {
                    node.classList.remove(this._options.enter);
                }


                location.hash = `#${url}`;
                try {
                    isBack ? this._index-- : this._index++;
                    history.replaceState && history.replaceState({_index: this._index}, '', location.href);
                } catch (e) {

                }

                if (typeof route.bind === 'function'/* && !route.__isBind*/) {
                    route.bind.call(node);
                    //route.__isBind = true;
                }
            };

            const res = route.render(callback);
            // promise
            if (res && typeof res.then === 'function') {
                res.then((html) => {
                    callback(null, html);
                }, callback);
            }
            // synchronous
            else if (route.render.length === 0) {
                callback(null, res);
            }
            // callback
            else {

            }
        }
        else {
            throw new Error(`url ${url} was not found`);
        }
        return this;
    }
}

export default Router;