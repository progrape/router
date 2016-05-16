/**
 * simple `extend` method
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
export function extend(target, source) {
    for (let key in source) {
        target[key] = source[key];
    }
    return target;
}

/**
 * get hash by full url
 * @param {String} url
 * @returns {string}
 */
export function getHash(url) {
    return url.indexOf('#') !== -1 ? url.substring(url.indexOf('#') + 1) : '/';
}

/**
 * noop
 */
export function noop() {

}