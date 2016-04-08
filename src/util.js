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

/**
 * get route regex (ref to backbone)
 * @param route
 * @returns {RegExp}
 */
export function getRegExp(route) {
    const optionalParam = /\((.*?)\)/g;
    const namedParam = /(\(\?)?:\w+/g;
    const splatParam = /\*\w+/g;
    const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    route = route.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function (match, optional) {
            return optional ? match : '([^/?]+)';
        })
        .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}

/**
 * get params from route
 * @param {String} route
 * @returns {Array} params
 */
export function getParams(route) {
    const regex = /:(\w+)/g;
    let params = [];
    let found;
    while ((found = regex.exec(route)) !== null) {
        params.push(found[1]);
    }
    return params;
}