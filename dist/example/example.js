/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	__webpack_require__(5);

	var _list = __webpack_require__(9);

	var _list2 = _interopRequireDefault(_list);

	var _article = __webpack_require__(13);

	var _article2 = _interopRequireDefault(_article);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = new _index2.default({
	    container: '#container',
	    enterTimeout: 300,
	    leaveTimeout: 300
	});

	router.push(_list2.default).push(_article2.default).setDefault('/').init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var util = _interopRequireWildcard(_util);

	var _pathToRegexp = __webpack_require__(3);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * a very simple router for the **demo** of [weui](https://github.com/weui/weui)
	 */

	var Router = function () {

	    /**
	     * constructor
	     * @param options
	     */


	    // array of route config

	    function Router(options) {
	        _classCallCheck(this, Router);

	        this._options = {
	            container: '#container',
	            enter: 'enter',
	            enterTimeout: 0,
	            leave: 'leave',
	            leaveTimeout: 0
	        };
	        this._index = 1;
	        this._$container = null;
	        this._routes = [];
	        this._default = null;

	        this._options = _extends({}, this._options, options);
	        this._$container = document.querySelector(this._options.container);
	    }

	    /**
	     * initial
	     * @returns {Router}
	     */


	    // default route config


	    // container element


	    // default option


	    _createClass(Router, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            // why not `history.pushState`? see https://github.com/weui/weui/issues/26, Router in wechat webview
	            window.addEventListener('hashchange', function (event) {
	                var hash = util.getHash(event.newURL);
	                var state = history.state || {};

	                _this.go(hash, state._index <= _this._index);
	            }, false);

	            if (history.state && history.state._index) {
	                this._index = history.state._index;
	            }

	            this._index--;

	            var hash = util.getHash(location.href);
	            var route = util.getRoute(this._routes, hash);
	            this.go(route ? hash : this._default);

	            return this;
	        }

	        /**
	         * push route config into routes array
	         * @param {Object} route
	         * @returns {Router}
	         */

	    }, {
	        key: 'push',
	        value: function push(route) {
	            route = _extends({}, {
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

	    }, {
	        key: 'setDefault',
	        value: function setDefault(url) {
	            this._default = url;
	            return this;
	        }

	        /**
	         * go to the specify url
	         * @param {String} url
	         * @param {Boolean} isBack, default: false
	         * @returns {Router}
	         */

	    }, {
	        key: 'go',
	        value: function go(url) {
	            var _this2 = this;

	            var isBack = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var route = util.getRoute(this._routes, url);
	            if (route) {
	                (function () {
	                    var html = typeof route.render === 'function' ? route.render(route.params) : '';

	                    // if have child already
	                    var hasChildren = util.hasChildren(_this2._$container);
	                    if (hasChildren) {
	                        (function () {
	                            var child = _this2._$container.children[0];
	                            if (isBack) {
	                                child.classList.add(_this2._options.leave);
	                            }

	                            if (_this2._options.leaveTimeout > 0) {
	                                setTimeout(function () {
	                                    child.parentNode.removeChild(child);
	                                }, _this2._options.leaveTimeout);
	                            } else {
	                                child.parentNode.removeChild(child);
	                            }
	                        })();
	                    }

	                    var node = document.createElement('div');

	                    // add class name
	                    if (route.className) {
	                        node.classList.add(route.className);
	                    }

	                    node.innerHTML = html;
	                    _this2._$container.appendChild(node);
	                    // add class
	                    if (!isBack && _this2._options.enter && hasChildren) {
	                        node.classList.add(_this2._options.enter);
	                    }

	                    if (_this2._options.enterTimeout > 0) {
	                        setTimeout(function () {
	                            node.classList.remove(_this2._options.enter);
	                        }, _this2._options.enterTimeout);
	                    } else {
	                        node.classList.remove(_this2._options.enter);
	                    }

	                    location.hash = '#' + url;
	                    try {
	                        isBack ? _this2._index-- : _this2._index++;
	                        history.replaceState && history.replaceState({ _index: _this2._index }, '', location.href);
	                    } catch (e) {}

	                    if (typeof route.bind === 'function' && !route.__isBind) {
	                        route.bind.call(node);
	                        route.__isBind = true;
	                    }
	                })();
	            } else {
	                throw new Error('url ' + url + ' was not found');
	            }
	            return this;
	        }
	    }]);

	    return Router;
	}();

	exports.default = Router;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getHash = getHash;
	exports.getRoute = getRoute;
	exports.hasChildren = hasChildren;
	exports.noop = noop;

	var _pathToRegexp = __webpack_require__(3);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * get hash by full url
	 * @param {String} url
	 * @returns {string}
	 */
	function getHash(url) {
	    return url.indexOf('#') !== -1 ? url.substring(url.indexOf('#') + 1) : '/';
	}

	/**
	 * get route from routes filter by url
	 * @param {Array} routes
	 * @param {String} url
	 * @returns {Object}
	 */
	function getRoute(routes, url) {
	    for (var i = 0, len = routes.length; i < len; i++) {
	        var route = routes[i];
	        var keys = [];
	        var regex = (0, _pathToRegexp2.default)(route.url, keys);
	        var match = regex.exec(url);
	        if (match) {
	            route.params = {};
	            for (var j = 0, l = keys.length; j < l; j++) {
	                var key = keys[j];
	                var name = key.name;
	                route.params[name] = match[j + 1];
	            }
	            return route;
	        }
	    }
	    return null;
	}

	/**
	 * has children
	 * @param {HTMLElement} parent
	 * @returns {boolean}
	 */
	function hasChildren(parent) {
	    var children = parent.children;
	    return children.length > 0;
	}

	/**
	 * noop
	 */
	function noop() {}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(4)

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Only use the prefix when followed by another path segment.
	    if (prefix != null && next != null && next !== prefix) {
	      path += prefix
	      prefix = null
	    }

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Encode characters for segment that could cause trouble for parsing.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[/?#'"]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = token.pattern

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (prefix) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/less-loader/index.js!./app.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/less-loader/index.js!./app.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n}\nhtml,\nbody {\n  height: 100%;\n}\nbody {\n  overflow-x: hidden;\n}\n.container {\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.container > div {\n  background-color: #fff;\n}\n@-webkit-keyframes slideIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n    opacity: 0;\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes slideIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n    opacity: 0;\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes slideOut {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n    opacity: 0;\n  }\n}\n@keyframes slideOut {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n    opacity: 0;\n  }\n}\n.enter,\n.leave {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n}\n.enter {\n  -webkit-animation: slideIn .2s forwards;\n          animation: slideIn .2s forwards;\n}\n.leave {\n  -webkit-animation: slideOut .25s forwards;\n          animation: slideOut .25s forwards;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _templateDebug = __webpack_require__(10);

	var _templateDebug2 = _interopRequireDefault(_templateDebug);

	var _data = __webpack_require__(11);

	var _data2 = _interopRequireDefault(_data);

	var _list = __webpack_require__(12);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    url: '/',
	    render: function render() {
	        return _templateDebug2.default.compile(_list2.default)({ list: _data2.default });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * artTemplate - Template Engine
	 * https://github.com/aui/artTemplate
	 * Released under the MIT, BSD, and GPL Licenses
	 */
	 
	!(function () {


	/**
	 * 模板引擎
	 * @name    template
	 * @param   {String}            模板名
	 * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
	 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
	 */
	var template = function (filename, content) {
	    return typeof content === 'string'
	    ?   compile(content, {
	            filename: filename
	        })
	    :   renderFile(filename, content);
	};


	template.version = '3.0.0';


	/**
	 * 设置全局配置
	 * @name    template.config
	 * @param   {String}    名称
	 * @param   {Any}       值
	 */
	template.config = function (name, value) {
	    defaults[name] = value;
	};



	var defaults = template.defaults = {
	    openTag: '<%',    // 逻辑语法开始标签
	    closeTag: '%>',   // 逻辑语法结束标签
	    escape: true,     // 是否编码输出变量的 HTML 字符
	    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
	    compress: false,  // 是否压缩输出
	    parser: null      // 自定义语法格式器 @see: template-syntax.js
	};


	var cacheStore = template.cache = {};


	/**
	 * 渲染模板
	 * @name    template.render
	 * @param   {String}    模板
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	template.render = function (source, options) {
	    return compile(source, options);
	};


	/**
	 * 渲染模板(根据模板名)
	 * @name    template.render
	 * @param   {String}    模板名
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	var renderFile = template.renderFile = function (filename, data) {
	    var fn = template.get(filename) || showDebugInfo({
	        filename: filename,
	        name: 'Render Error',
	        message: 'Template not found'
	    });
	    return data ? fn(data) : fn;
	};


	/**
	 * 获取编译缓存（可由外部重写此方法）
	 * @param   {String}    模板名
	 * @param   {Function}  编译好的函数
	 */
	template.get = function (filename) {

	    var cache;
	    
	    if (cacheStore[filename]) {
	        // 使用内存缓存
	        cache = cacheStore[filename];
	    } else if (typeof document === 'object') {
	        // 加载模板并编译
	        var elem = document.getElementById(filename);
	        
	        if (elem) {
	            var source = (elem.value || elem.innerHTML)
	            .replace(/^\s*|\s*$/g, '');
	            cache = compile(source, {
	                filename: filename
	            });
	        }
	    }

	    return cache;
	};


	var toString = function (value, type) {

	    if (typeof value !== 'string') {

	        type = typeof value;
	        if (type === 'number') {
	            value += '';
	        } else if (type === 'function') {
	            value = toString(value.call(value));
	        } else {
	            value = '';
	        }
	    }

	    return value;

	};


	var escapeMap = {
	    "<": "&#60;",
	    ">": "&#62;",
	    '"': "&#34;",
	    "'": "&#39;",
	    "&": "&#38;"
	};


	var escapeFn = function (s) {
	    return escapeMap[s];
	};

	var escapeHTML = function (content) {
	    return toString(content)
	    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};


	var isArray = Array.isArray || function (obj) {
	    return ({}).toString.call(obj) === '[object Array]';
	};


	var each = function (data, callback) {
	    var i, len;        
	    if (isArray(data)) {
	        for (i = 0, len = data.length; i < len; i++) {
	            callback.call(data, data[i], i, data);
	        }
	    } else {
	        for (i in data) {
	            callback.call(data, data[i], i);
	        }
	    }
	};


	var utils = template.utils = {

		$helpers: {},

	    $include: renderFile,

	    $string: toString,

	    $escape: escapeHTML,

	    $each: each
	    
	};/**
	 * 添加模板辅助方法
	 * @name    template.helper
	 * @param   {String}    名称
	 * @param   {Function}  方法
	 */
	template.helper = function (name, helper) {
	    helpers[name] = helper;
	};

	var helpers = template.helpers = utils.$helpers;




	/**
	 * 模板错误事件（可由外部重写此方法）
	 * @name    template.onerror
	 * @event
	 */
	template.onerror = function (e) {
	    var message = 'Template Error\n\n';
	    for (var name in e) {
	        message += '<' + name + '>\n' + e[name] + '\n\n';
	    }
	    
	    if (typeof console === 'object') {
	        console.error(message);
	    }
	};


	// 模板调试器
	var showDebugInfo = function (e) {

	    template.onerror(e);
	    
	    return function () {
	        return '{Template Error}';
	    };
	};


	/**
	 * 编译模板
	 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
	 * @name    template.compile
	 * @param   {String}    模板字符串
	 * @param   {Object}    编译选项
	 *
	 *      - openTag       {String}
	 *      - closeTag      {String}
	 *      - filename      {String}
	 *      - escape        {Boolean}
	 *      - compress      {Boolean}
	 *      - debug         {Boolean}
	 *      - cache         {Boolean}
	 *      - parser        {Function}
	 *
	 * @return  {Function}  渲染方法
	 */
	var compile = template.compile = function (source, options) {
	    
	    // 合并默认配置
	    options = options || {};
	    for (var name in defaults) {
	        if (options[name] === undefined) {
	            options[name] = defaults[name];
	        }
	    }


	    var filename = options.filename;


	    try {
	        
	        var Render = compiler(source, options);
	        
	    } catch (e) {
	    
	        e.filename = filename || 'anonymous';
	        e.name = 'Syntax Error';

	        return showDebugInfo(e);
	        
	    }
	    
	    
	    // 对编译结果进行一次包装

	    function render (data) {
	        
	        try {
	            
	            return new Render(data, filename) + '';
	            
	        } catch (e) {
	            
	            // 运行时出错后自动开启调试模式重新编译
	            if (!options.debug) {
	                options.debug = true;
	                return compile(source, options)(data);
	            }
	            
	            return showDebugInfo(e)();
	            
	        }
	        
	    }
	    

	    render.prototype = Render.prototype;
	    render.toString = function () {
	        return Render.toString();
	    };


	    if (filename && options.cache) {
	        cacheStore[filename] = render;
	    }

	    
	    return render;

	};




	// 数组迭代
	var forEach = utils.$each;


	// 静态分析模板变量
	var KEYWORDS =
	    // 关键字
	    'break,case,catch,continue,debugger,default,delete,do,else,false'
	    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
	    + ',throw,true,try,typeof,var,void,while,with'

	    // 保留字
	    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
	    + ',final,float,goto,implements,import,int,interface,long,native'
	    + ',package,private,protected,public,short,static,super,synchronized'
	    + ',throws,transient,volatile'

	    // ECMA 5 - use strict
	    + ',arguments,let,yield'

	    + ',undefined';

	var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
	var SPLIT_RE = /[^\w$]+/g;
	var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
	var BOUNDARY_RE = /^,+|,+$/g;
	var SPLIT2_RE = /^$|,+/;


	// 获取变量
	function getVariable (code) {
	    return code
	    .replace(REMOVE_RE, '')
	    .replace(SPLIT_RE, ',')
	    .replace(KEYWORDS_RE, '')
	    .replace(NUMBER_RE, '')
	    .replace(BOUNDARY_RE, '')
	    .split(SPLIT2_RE);
	};


	// 字符串转义
	function stringify (code) {
	    return "'" + code
	    // 单引号与反斜杠转义
	    .replace(/('|\\)/g, '\\$1')
	    // 换行符转义(windows + linux)
	    .replace(/\r/g, '\\r')
	    .replace(/\n/g, '\\n') + "'";
	}


	function compiler (source, options) {
	    
	    var debug = options.debug;
	    var openTag = options.openTag;
	    var closeTag = options.closeTag;
	    var parser = options.parser;
	    var compress = options.compress;
	    var escape = options.escape;
	    

	    
	    var line = 1;
	    var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};
	    


	    var isNewEngine = ''.trim;// '__proto__' in {}
	    var replaces = isNewEngine
	    ? ["$out='';", "$out+=", ";", "$out"]
	    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

	    var concat = isNewEngine
	        ? "$out+=text;return $out;"
	        : "$out.push(text);";
	          
	    var print = "function(){"
	    +      "var text=''.concat.apply('',arguments);"
	    +       concat
	    +  "}";

	    var include = "function(filename,data){"
	    +      "data=data||$data;"
	    +      "var text=$utils.$include(filename,data,$filename);"
	    +       concat
	    +   "}";

	    var headerCode = "'use strict';"
	    + "var $utils=this,$helpers=$utils.$helpers,"
	    + (debug ? "$line=0," : "");
	    
	    var mainCode = replaces[0];

	    var footerCode = "return new String(" + replaces[3] + ");"
	    
	    // html与逻辑语法分离
	    forEach(source.split(openTag), function (code) {
	        code = code.split(closeTag);
	        
	        var $0 = code[0];
	        var $1 = code[1];
	        
	        // code: [html]
	        if (code.length === 1) {
	            
	            mainCode += html($0);
	         
	        // code: [logic, html]
	        } else {
	            
	            mainCode += logic($0);
	            
	            if ($1) {
	                mainCode += html($1);
	            }
	        }
	        

	    });
	    
	    var code = headerCode + mainCode + footerCode;
	    
	    // 调试语句
	    if (debug) {
	        code = "try{" + code + "}catch(e){"
	        +       "throw {"
	        +           "filename:$filename,"
	        +           "name:'Render Error',"
	        +           "message:e.message,"
	        +           "line:$line,"
	        +           "source:" + stringify(source)
	        +           ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
	        +       "};"
	        + "}";
	    }
	    
	    
	    
	    try {
	        
	        
	        var Render = new Function("$data", "$filename", code);
	        Render.prototype = utils;

	        return Render;
	        
	    } catch (e) {
	        e.temp = "function anonymous($data,$filename) {" + code + "}";
	        throw e;
	    }



	    
	    // 处理 HTML 语句
	    function html (code) {
	        
	        // 记录行号
	        line += code.split(/\n/).length - 1;

	        // 压缩多余空白与注释
	        if (compress) {
	            code = code
	            .replace(/\s+/g, ' ')
	            .replace(/<!--[\w\W]*?-->/g, '');
	        }
	        
	        if (code) {
	            code = replaces[1] + stringify(code) + replaces[2] + "\n";
	        }

	        return code;
	    }
	    
	    
	    // 处理逻辑语句
	    function logic (code) {

	        var thisLine = line;
	       
	        if (parser) {
	        
	             // 语法转换插件钩子
	            code = parser(code, options);
	            
	        } else if (debug) {
	        
	            // 记录行号
	            code = code.replace(/\n/g, function () {
	                line ++;
	                return "$line=" + line +  ";";
	            });
	            
	        }
	        
	        
	        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
	        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
	        if (code.indexOf('=') === 0) {

	            var escapeSyntax = escape && !/^=[=#]/.test(code);

	            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

	            // 对内容编码
	            if (escapeSyntax) {

	                var name = code.replace(/\s*\([^\)]+\)/, '');

	                // 排除 utils.* | include | print
	                
	                if (!utils[name] && !/^(include|print)$/.test(name)) {
	                    code = "$escape(" + code + ")";
	                }

	            // 不编码
	            } else {
	                code = "$string(" + code + ")";
	            }
	            

	            code = replaces[1] + code + replaces[2];

	        }
	        
	        if (debug) {
	            code = "$line=" + thisLine + ";" + code;
	        }
	        
	        // 提取模板中的变量名
	        forEach(getVariable(code), function (name) {
	            
	            // name 值可能为空，在安卓低版本浏览器下
	            if (!name || uniq[name]) {
	                return;
	            }

	            var value;

	            // 声明模板变量
	            // 赋值优先级:
	            // [include, print] > utils > helpers > data
	            if (name === 'print') {

	                value = print;

	            } else if (name === 'include') {
	                
	                value = include;
	                
	            } else if (utils[name]) {

	                value = "$utils." + name;

	            } else if (helpers[name]) {

	                value = "$helpers." + name;

	            } else {

	                value = "$data." + name;
	            }
	            
	            headerCode += name + "=" + value + ",";
	            uniq[name] = true;
	            
	            
	        });
	        
	        return code + "\n";
	    }
	    
	    
	};



	// 定义模板引擎的语法


	defaults.openTag = '{{';
	defaults.closeTag = '}}';


	var filtered = function (js, filter) {
	    var parts = filter.split(':');
	    var name = parts.shift();
	    var args = parts.join(':') || '';

	    if (args) {
	        args = ', ' + args;
	    }

	    return '$helpers.' + name + '(' + js + args + ')';
	}


	defaults.parser = function (code, options) {

	    // var match = code.match(/([\w\$]*)(\b.*)/);
	    // var key = match[1];
	    // var args = match[2];
	    // var split = args.split(' ');
	    // split.shift();

	    code = code.replace(/^\s/, '');

	    var split = code.split(' ');
	    var key = split.shift();
	    var args = split.join(' ');

	    

	    switch (key) {

	        case 'if':

	            code = 'if(' + args + '){';
	            break;

	        case 'else':
	            
	            if (split.shift() === 'if') {
	                split = ' if(' + split.join(' ') + ')';
	            } else {
	                split = '';
	            }

	            code = '}else' + split + '{';
	            break;

	        case '/if':

	            code = '}';
	            break;

	        case 'each':
	            
	            var object = split[0] || '$data';
	            var as     = split[1] || 'as';
	            var value  = split[2] || '$value';
	            var index  = split[3] || '$index';
	            
	            var param   = value + ',' + index;
	            
	            if (as !== 'as') {
	                object = '[]';
	            }
	            
	            code =  '$each(' + object + ',function(' + param + '){';
	            break;

	        case '/each':

	            code = '});';
	            break;

	        case 'echo':

	            code = 'print(' + args + ');';
	            break;

	        case 'print':
	        case 'include':

	            code = key + '(' + split.join(',') + ');';
	            break;

	        default:

	            // 过滤器（辅助方法）
	            // {{value | filterA:'abcd' | filterB}}
	            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
	            // TODO: {{ddd||aaa}} 不包含空格
	            if (/^\s*\|\s*[\w\$]/.test(args)) {

	                var escape = true;

	                // {{#value | link}}
	                if (code.indexOf('#') === 0) {
	                    code = code.substr(1);
	                    escape = false;
	                }

	                var i = 0;
	                var array = code.split('|');
	                var len = array.length;
	                var val = array[i++];

	                for (; i < len; i ++) {
	                    val = filtered(val, array[i]);
	                }

	                code = (escape ? '=' : '=#') + val;

	            // 即将弃用 {{helperName value}}
	            } else if (template.helpers[key]) {
	                
	                code = '=#' + key + '(' + split.join(',') + ');';
	            
	            // 内容直接输出 {{value}}
	            } else {

	                code = '=' + code;
	            }

	            break;
	    }
	    
	    
	    return code;
	};



	// RequireJS && SeaJS
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return template;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// NodeJS
	} else if (typeof exports !== 'undefined') {
	    module.exports = template;
	} else {
	    this.template = template;
	}

	})();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = [{
	    id: 1,
	    title: '微信Web App开发最佳实践',
	    cover: 'https://mmrb.github.io/avatar/kl.jpg',
	    summary: '组内小伙伴 jf 去 Feday 广州站的分享，有蛮多干货，都是微信 web app 开发者们关注的一些问题。 不做过多介绍，没有去现场听得朋友可以下载ppt来看。 感兴趣的朋友也可以下载广州站的所有ppt，以及关注接下来的 Feday 日程。'
	}, {
	    id: 2,
	    title: 'X5即将升级内核到Blink',
	    cover: 'https://mmrb.github.io/avatar/shenfei.jpg',
	    summary: '我们从QQ浏览器团队得到消息，X5已经完成升级到Blink的开发工作，最近已经开始下发到客户端中，而X5内核的更新是热更新，也就是说不需要用户更新微信客户端，在良好的网络环境下(比如WiFi)会在后台静默更新。 根据我们拿到的版本，X5用的Blink版本是Chrome 37。虽然'
	}, {
	    id: 3,
	    title: 'WeUI的设计稿开源',
	    cover: 'https://mmrb.github.io/avatar/bear.jpg',
	    summary: '自从 WeUI 开源后，已经收到 7000 多 star ，将近 2000 的 fork，我们在欣喜之余，也收到了蛮多有价值的意见与建议，其中之一就是将设计稿开源——好吧，其实设计稿叫『开放下载』更合适一些。 那我们今天开放了基于 WeUI 0.4 版本的设计稿 sketch 文'
	}, {
	    id: 4,
	    title: 'HTML5+CSS3 loading 效果收集',
	    cover: 'https://mmrb.github.io/avatar/gaby.jpg',
	    summary: '用gif图片来做loading的时代已经过去了，它显得太low了，而用HTML5/CSS3以及SVG和canvas来做加载动画显得既炫酷又逼格十足。这已经成为一种趋势。 这里收集了几十个用html5和css3实现的loading效果，以供学习参考。 01. CSS Rainbow'
	}, {
	    id: 5,
	    title: '微信网页开发者工具发布',
	    cover: 'https://mmrb.github.io/avatar/xx.jpg',
	    summary: '兄弟团队内测已久的微信网页开发者工具终于在今天的微信公开课Pro大会上发布了，喜大普奔。 这个工具有主要有3个功能： 使用真实用户身份，调试微信网页授权。 校验页面的 JSSDK 权限，以及模拟大部分 SDK 的输入和输出。 利用集成的 Chrome DevTools 和基本'
	}];
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"weui_panel weui_panel_access\">\n    <div class=\"weui_panel_hd\">图文组合列表</div>\n    <div class=\"weui_panel_bd\">\n        {{each list as item i}}\n        <a href=\"#/article/{{item.id}}\" class=\"weui_media_box weui_media_appmsg\">\n            <div class=\"weui_media_hd\">\n                <img src=\"{{item.cover}}\" alt=\"\" class=\"weui_media_appmsg_thumb\">\n            </div>\n            <div class=\"weui_media_bd\">\n                <h4 class=\"weui_media_title\">{{item.title}}</h4>\n                <p class=\"weui_media_desc\">{{item.summary}}</p>\n            </div>\n        </a>\n        {{/each}}\n    </div>\n</div>"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _templateDebug = __webpack_require__(10);

	var _templateDebug2 = _interopRequireDefault(_templateDebug);

	var _data = __webpack_require__(11);

	var _data2 = _interopRequireDefault(_data);

	var _article = __webpack_require__(14);

	var _article2 = _interopRequireDefault(_article);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    url: '/article/:id',
	    render: function render() {
	        var id = this.params.id;
	        var article = _data2.default.filter(function (article) {
	            return article.id == id;
	        })[0];
	        return _templateDebug2.default.compile(_article2.default)({ article: article });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<article class=\"weui_article\">\n    <section>\n        <h2 class=\"title\">{{article.title}}</h2>\n        <section>\n            <p>{{article.summary}}</p>\n        </section>\n        <section>\n            <p>{{article.summary}}</p>\n        </section>\n    </section>\n</article>"

/***/ }
/******/ ]);