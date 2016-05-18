import pathToRegexp from 'path-to-regexp';

/**
 * get hash by full url
 * @param {String} url
 * @returns {string}
 */
export function getHash(url) {
    return url.indexOf('#') !== -1 ? url.substring(url.indexOf('#') + 1) : '/';
}

/**
 * get route from routes filter by url
 * @param {Array} routes
 * @param {String} url
 * @returns {Object}
 */
export function getRoute(routes, url){
    for (let i = 0, len = routes.length; i < len; i++) {
        let route = routes[i];
        let keys = [];
        const regex = pathToRegexp(route.url, keys);
        const match = regex.exec(url);
        if (match) {
            route.params = {};
            for (let j = 0, l = keys.length; j < l; j++) {
                const key = keys[j];
                const name = key.name;
                route.params[name] = match[j + 1];
            }
            return route;
        }
    }
    return null;
}

/**
 * noop
 */
export function noop() {

}