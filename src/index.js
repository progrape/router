import * as util from './util';

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
        this._options = util.extend(this._options, options);
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
        const route = this._getRoute(hash);
        this.go(route ? hash : this._default);

        return this;
    }

    /**
     * push route config into routes array
     * @param {Object} route
     * @returns {Router}
     */
    push(route) {
        route = util.extend({
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
        const route = this._getRoute(url);
        if (route) {
            const html = typeof route.render === 'function' ? route.render(route.params) : '';

            // if have child already
            const hasChildren = this._$container.hasChildNodes();
            if (hasChildren) {
                let child = this._$container.childNodes[0];
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
            if (!isBack && this._options.enter) {
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

            if (typeof route.bind === 'function' && !route.__isBind) {
                route.bind.call(node);
                route.__isBind = true;
            }
        }
        else {
            throw new Error(`url ${url} was not found`);
        }
        return this;
    }

    /**
     * get route config by hash
     * @param {String} url
     * @returns {Object}
     * @private
     */
    _getRoute(url) {
        for (let i = 0, len = this._routes.length; i < len; i++) {
            let route = this._routes[i];
            // get the regex of route url
            const regex = util.getRegExp(route.url);

            // get params from route url
            // for example:
            // route config: {url: '/category/:categoryId/post/:postId', ...}
            // params is ['categoryId', 'postId']
            const params = util.getParams(route.url);
            const match = regex.exec(url);
            if (match) {
                route.params = {};
                for (let j = 0, l = params.length; j < l; j++) {
                    const name = params[j];
                    route.params[name] = match[j + 1];
                }
                return route;
            }
        }
        return null;
    }
}

export default Router;