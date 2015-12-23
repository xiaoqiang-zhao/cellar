/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** ../web/src/main.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 程序入口
	 *
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	
	// 依赖的库
	var Vue = __webpack_require__(/*! ./dep/vue.js */ 1);
	var VueRouter = __webpack_require__(/*! ./dep/vue-router.js */ 2);
	
	// 样式重置
	__webpack_require__(/*! ./dep/normalize.css */ 3);
	
	var template = __webpack_require__(/*! ./main.tpl */ 7);
	var header = __webpack_require__(/*! ./components/header/header.js */ 8);
	// var footer = require('./component/header/header.js');
	var vm = new Vue({
	    el: document.body,//'#app',//document.body,
	    replace: false,
	    template: template,
	    components: {
	        'header-c': header
	    }
	});


/***/ },
/* 1 */
/*!*****************************!*\
  !*** ../web/src/dep/vue.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v1.0.10
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Vue = factory();
	}(this, function () { 'use strict';
	
	  function set(obj, key, val) {
	    if (hasOwn(obj, key)) {
	      obj[key] = val;
	      return;
	    }
	    if (obj._isVue) {
	      set(obj._data, key, val);
	      return;
	    }
	    var ob = obj.__ob__;
	    if (!ob) {
	      obj[key] = val;
	      return;
	    }
	    ob.convert(key, val);
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._proxy(key);
	        vm._digest();
	      }
	    }
	  }
	
	  /**
	   * Delete a property and trigger change if necessary.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   */
	
	  function del(obj, key) {
	    if (!hasOwn(obj, key)) {
	      return;
	    }
	    delete obj[key];
	    var ob = obj.__ob__;
	    if (!ob) {
	      return;
	    }
	    ob.dep.notify();
	    if (ob.vms) {
	      var i = ob.vms.length;
	      while (i--) {
	        var vm = ob.vms[i];
	        vm._unproxy(key);
	        vm._digest();
	      }
	    }
	  }
	
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  /**
	   * Check whether the object has the property.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @return {Boolean}
	   */
	
	  function hasOwn(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  }
	
	  /**
	   * Check if an expression is a literal value.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */
	
	  var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	  function isLiteral(exp) {
	    return literalValueRE.test(exp);
	  }
	
	  /**
	   * Check if a string starts with $ or _
	   *
	   * @param {String} str
	   * @return {Boolean}
	   */
	
	  function isReserved(str) {
	    var c = (str + '').charCodeAt(0);
	    return c === 0x24 || c === 0x5F;
	  }
	
	  /**
	   * Guard text output, make sure undefined outputs
	   * empty string
	   *
	   * @param {*} value
	   * @return {String}
	   */
	
	  function _toString(value) {
	    return value == null ? '' : value.toString();
	  }
	
	  /**
	   * Check and convert possible numeric strings to numbers
	   * before setting back to data
	   *
	   * @param {*} value
	   * @return {*|Number}
	   */
	
	  function toNumber(value) {
	    if (typeof value !== 'string') {
	      return value;
	    } else {
	      var parsed = Number(value);
	      return isNaN(parsed) ? value : parsed;
	    }
	  }
	
	  /**
	   * Convert string boolean literals into real booleans.
	   *
	   * @param {*} value
	   * @return {*|Boolean}
	   */
	
	  function toBoolean(value) {
	    return value === 'true' ? true : value === 'false' ? false : value;
	  }
	
	  /**
	   * Strip quotes from a string
	   *
	   * @param {String} str
	   * @return {String | false}
	   */
	
	  function stripQuotes(str) {
	    var a = str.charCodeAt(0);
	    var b = str.charCodeAt(str.length - 1);
	    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	  }
	
	  /**
	   * Camelize a hyphen-delmited string.
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var camelizeRE = /-(\w)/g;
	
	  function camelize(str) {
	    return str.replace(camelizeRE, toUpper);
	  }
	
	  function toUpper(_, c) {
	    return c ? c.toUpperCase() : '';
	  }
	
	  /**
	   * Hyphenate a camelCase string.
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	  function hyphenate(str) {
	    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	  }
	
	  /**
	   * Converts hyphen/underscore/slash delimitered names into
	   * camelized classNames.
	   *
	   * e.g. my-component => MyComponent
	   *      some_else    => SomeElse
	   *      some/comp    => SomeComp
	   *
	   * @param {String} str
	   * @return {String}
	   */
	
	  var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	  function classify(str) {
	    return str.replace(classifyRE, toUpper);
	  }
	
	  /**
	   * Simple bind, faster than native
	   *
	   * @param {Function} fn
	   * @param {Object} ctx
	   * @return {Function}
	   */
	
	  function bind$1(fn, ctx) {
	    return function (a) {
	      var l = arguments.length;
	      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    };
	  }
	
	  /**
	   * Convert an Array-like object to a real Array.
	   *
	   * @param {Array-like} list
	   * @param {Number} [start] - start index
	   * @return {Array}
	   */
	
	  function toArray(list, start) {
	    start = start || 0;
	    var i = list.length - start;
	    var ret = new Array(i);
	    while (i--) {
	      ret[i] = list[i + start];
	    }
	    return ret;
	  }
	
	  /**
	   * Mix properties into target object.
	   *
	   * @param {Object} to
	   * @param {Object} from
	   */
	
	  function extend(to, from) {
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	      to[keys[i]] = from[keys[i]];
	    }
	    return to;
	  }
	
	  /**
	   * Quick object check - this is primarily used to tell
	   * Objects from primitive values when we know the value
	   * is a JSON-compliant type.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	  }
	
	  /**
	   * Strict object type check. Only returns true
	   * for plain JavaScript objects.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  var toString = Object.prototype.toString;
	  var OBJECT_STRING = '[object Object]';
	
	  function isPlainObject(obj) {
	    return toString.call(obj) === OBJECT_STRING;
	  }
	
	  /**
	   * Array type check.
	   *
	   * @param {*} obj
	   * @return {Boolean}
	   */
	
	  var isArray = Array.isArray;
	
	  /**
	   * Define a non-enumerable property
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   * @param {Boolean} [enumerable]
	   */
	
	  function def(obj, key, val, enumerable) {
	    Object.defineProperty(obj, key, {
	      value: val,
	      enumerable: !!enumerable,
	      writable: true,
	      configurable: true
	    });
	  }
	
	  /**
	   * Debounce a function so it only gets called after the
	   * input stops arriving after the given wait period.
	   *
	   * @param {Function} func
	   * @param {Number} wait
	   * @return {Function} - the debounced function
	   */
	
	  function _debounce(func, wait) {
	    var timeout, args, context, timestamp, result;
	    var later = function later() {
	      var last = Date.now() - timestamp;
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    };
	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = Date.now();
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	      }
	      return result;
	    };
	  }
	
	  /**
	   * Manual indexOf because it's slightly faster than
	   * native.
	   *
	   * @param {Array} arr
	   * @param {*} obj
	   */
	
	  function indexOf(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	      if (arr[i] === obj) return i;
	    }
	    return -1;
	  }
	
	  /**
	   * Make a cancellable version of an async callback.
	   *
	   * @param {Function} fn
	   * @return {Function}
	   */
	
	  function cancellable(fn) {
	    var cb = function cb() {
	      if (!cb.cancelled) {
	        return fn.apply(this, arguments);
	      }
	    };
	    cb.cancel = function () {
	      cb.cancelled = true;
	    };
	    return cb;
	  }
	
	  /**
	   * Check if two values are loosely equal - that is,
	   * if they are plain objects, do they have the same shape?
	   *
	   * @param {*} a
	   * @param {*} b
	   * @return {Boolean}
	   */
	
	  function looseEqual(a, b) {
	    /* eslint-disable eqeqeq */
	    return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	    /* eslint-enable eqeqeq */
	  }
	
	  var hasProto = ('__proto__' in {});
	
	  // Browser environment sniffing
	  var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	  var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;
	
	  var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;
	
	  var transitionProp = undefined;
	  var transitionEndEvent = undefined;
	  var animationProp = undefined;
	  var animationEndEvent = undefined;
	
	  // Transition property/event sniffing
	  if (inBrowser && !isIE9) {
	    var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	    var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	    transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	    transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	    animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	    animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	  }
	
	  /**
	   * Defer a task to execute it asynchronously. Ideally this
	   * should be executed as a microtask, so we leverage
	   * MutationObserver if it's available, and fallback to
	   * setTimeout(0).
	   *
	   * @param {Function} cb
	   * @param {Object} ctx
	   */
	
	  var nextTick = (function () {
	    var callbacks = [];
	    var pending = false;
	    var timerFunc;
	    function nextTickHandler() {
	      pending = false;
	      var copies = callbacks.slice(0);
	      callbacks = [];
	      for (var i = 0; i < copies.length; i++) {
	        copies[i]();
	      }
	    }
	    /* istanbul ignore if */
	    if (typeof MutationObserver !== 'undefined') {
	      var counter = 1;
	      var observer = new MutationObserver(nextTickHandler);
	      var textNode = document.createTextNode(counter);
	      observer.observe(textNode, {
	        characterData: true
	      });
	      timerFunc = function () {
	        counter = (counter + 1) % 2;
	        textNode.data = counter;
	      };
	    } else {
	      timerFunc = setTimeout;
	    }
	    return function (cb, ctx) {
	      var func = ctx ? function () {
	        cb.call(ctx);
	      } : cb;
	      callbacks.push(func);
	      if (pending) return;
	      pending = true;
	      timerFunc(nextTickHandler, 0);
	    };
	  })();
	
	  function Cache(limit) {
	    this.size = 0;
	    this.limit = limit;
	    this.head = this.tail = undefined;
	    this._keymap = Object.create(null);
	  }
	
	  var p = Cache.prototype;
	
	  /**
	   * Put <value> into the cache associated with <key>.
	   * Returns the entry which was removed to make room for
	   * the new entry. Otherwise undefined is returned.
	   * (i.e. if there was enough room already).
	   *
	   * @param {String} key
	   * @param {*} value
	   * @return {Entry|undefined}
	   */
	
	  p.put = function (key, value) {
	    var entry = {
	      key: key,
	      value: value
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    if (this.size === this.limit) {
	      return this.shift();
	    } else {
	      this.size++;
	    }
	  };
	
	  /**
	   * Purge the least recently used (oldest) entry from the
	   * cache. Returns the removed entry or undefined if the
	   * cache was empty.
	   */
	
	  p.shift = function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = this.head.newer;
	      this.head.older = undefined;
	      entry.newer = entry.older = undefined;
	      this._keymap[entry.key] = undefined;
	    }
	    return entry;
	  };
	
	  /**
	   * Get and register recent use of <key>. Returns the value
	   * associated with <key> or undefined if not in cache.
	   *
	   * @param {String} key
	   * @param {Boolean} returnEntry
	   * @return {Entry|*}
	   */
	
	  p.get = function (key, returnEntry) {
	    var entry = this._keymap[key];
	    if (entry === undefined) return;
	    if (entry === this.tail) {
	      return returnEntry ? entry : entry.value;
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	      if (entry === this.head) {
	        this.head = entry.newer;
	      }
	      entry.newer.older = entry.older; // C <-- E.
	    }
	    if (entry.older) {
	      entry.older.newer = entry.newer; // C. --> E
	    }
	    entry.newer = undefined; // D --x
	    entry.older = this.tail; // D. --> E
	    if (this.tail) {
	      this.tail.newer = entry; // E. <-- D
	    }
	    this.tail = entry;
	    return returnEntry ? entry : entry.value;
	  };
	
	  var cache$1 = new Cache(1000);
	  var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	  var reservedArgRE = /^in$|^-?\d+/;
	
	  /**
	   * Parser state
	   */
	
	  var str;
	  var dir;
	  var c;
	  var i;
	  var l;
	  var lastFilterIndex;
	  var inSingle;
	  var inDouble;
	  var curly;
	  var square;
	  var paren;
	  /**
	   * Push a filter to the current directive object
	   */
	
	  function pushFilter() {
	    var exp = str.slice(lastFilterIndex, i).trim();
	    var filter;
	    if (exp) {
	      filter = {};
	      var tokens = exp.match(filterTokenRE);
	      filter.name = tokens[0];
	      if (tokens.length > 1) {
	        filter.args = tokens.slice(1).map(processFilterArg);
	      }
	    }
	    if (filter) {
	      (dir.filters = dir.filters || []).push(filter);
	    }
	    lastFilterIndex = i + 1;
	  }
	
	  /**
	   * Check if an argument is dynamic and strip quotes.
	   *
	   * @param {String} arg
	   * @return {Object}
	   */
	
	  function processFilterArg(arg) {
	    if (reservedArgRE.test(arg)) {
	      return {
	        value: toNumber(arg),
	        dynamic: false
	      };
	    } else {
	      var stripped = stripQuotes(arg);
	      var dynamic = stripped === arg;
	      return {
	        value: dynamic ? arg : stripped,
	        dynamic: dynamic
	      };
	    }
	  }
	
	  /**
	   * Parse a directive value and extract the expression
	   * and its filters into a descriptor.
	   *
	   * Example:
	   *
	   * "a + 1 | uppercase" will yield:
	   * {
	   *   expression: 'a + 1',
	   *   filters: [
	   *     { name: 'uppercase', args: null }
	   *   ]
	   * }
	   *
	   * @param {String} str
	   * @return {Object}
	   */
	
	  function parseDirective(s) {
	
	    var hit = cache$1.get(s);
	    if (hit) {
	      return hit;
	    }
	
	    // reset parser state
	    str = s;
	    inSingle = inDouble = false;
	    curly = square = paren = 0;
	    lastFilterIndex = 0;
	    dir = {};
	
	    for (i = 0, l = str.length; i < l; i++) {
	      c = str.charCodeAt(i);
	      if (inSingle) {
	        // check single quote
	        if (c === 0x27) inSingle = !inSingle;
	      } else if (inDouble) {
	        // check double quote
	        if (c === 0x22) inDouble = !inDouble;
	      } else if (c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	        if (dir.expression == null) {
	          // first filter, end of expression
	          lastFilterIndex = i + 1;
	          dir.expression = str.slice(0, i).trim();
	        } else {
	          // already has filter
	          pushFilter();
	        }
	      } else {
	        switch (c) {
	          case 0x22:
	            inDouble = true;break; // "
	          case 0x27:
	            inSingle = true;break; // '
	          case 0x28:
	            paren++;break; // (
	          case 0x29:
	            paren--;break; // )
	          case 0x5B:
	            square++;break; // [
	          case 0x5D:
	            square--;break; // ]
	          case 0x7B:
	            curly++;break; // {
	          case 0x7D:
	            curly--;break; // }
	        }
	      }
	    }
	
	    if (dir.expression == null) {
	      dir.expression = str.slice(0, i).trim();
	    } else if (lastFilterIndex !== 0) {
	      pushFilter();
	    }
	
	    cache$1.put(s, dir);
	    return dir;
	  }
	
	  var directive = Object.freeze({
	    parseDirective: parseDirective
	  });
	
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var cache = undefined;
	  var tagRE = undefined;
	  var htmlRE = undefined;
	  /**
	   * Escape a string so it can be used in a RegExp
	   * constructor.
	   *
	   * @param {String} str
	   */
	
	  function escapeRegex(str) {
	    return str.replace(regexEscapeRE, '\\$&');
	  }
	
	  function compileRegex() {
	    var open = escapeRegex(config.delimiters[0]);
	    var close = escapeRegex(config.delimiters[1]);
	    var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	    var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	    tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	    htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	    // reset cache
	    cache = new Cache(1000);
	  }
	
	  /**
	   * Parse a template text string into an array of tokens.
	   *
	   * @param {String} text
	   * @return {Array<Object> | null}
	   *               - {String} type
	   *               - {String} value
	   *               - {Boolean} [html]
	   *               - {Boolean} [oneTime]
	   */
	
	  function parseText(text) {
	    if (!cache) {
	      compileRegex();
	    }
	    var hit = cache.get(text);
	    if (hit) {
	      return hit;
	    }
	    text = text.replace(/\n/g, '');
	    if (!tagRE.test(text)) {
	      return null;
	    }
	    var tokens = [];
	    var lastIndex = tagRE.lastIndex = 0;
	    var match, index, html, value, first, oneTime;
	    /* eslint-disable no-cond-assign */
	    while (match = tagRE.exec(text)) {
	      /* eslint-enable no-cond-assign */
	      index = match.index;
	      // push text token
	      if (index > lastIndex) {
	        tokens.push({
	          value: text.slice(lastIndex, index)
	        });
	      }
	      // tag token
	      html = htmlRE.test(match[0]);
	      value = html ? match[1] : match[2];
	      first = value.charCodeAt(0);
	      oneTime = first === 42; // *
	      value = oneTime ? value.slice(1) : value;
	      tokens.push({
	        tag: true,
	        value: value.trim(),
	        html: html,
	        oneTime: oneTime
	      });
	      lastIndex = index + match[0].length;
	    }
	    if (lastIndex < text.length) {
	      tokens.push({
	        value: text.slice(lastIndex)
	      });
	    }
	    cache.put(text, tokens);
	    return tokens;
	  }
	
	  /**
	   * Format a list of tokens into an expression.
	   * e.g. tokens parsed from 'a {{b}} c' can be serialized
	   * into one single expression as '"a " + b + " c"'.
	   *
	   * @param {Array} tokens
	   * @return {String}
	   */
	
	  function tokensToExp(tokens) {
	    if (tokens.length > 1) {
	      return tokens.map(function (token) {
	        return formatToken(token);
	      }).join('+');
	    } else {
	      return formatToken(tokens[0], true);
	    }
	  }
	
	  /**
	   * Format a single token.
	   *
	   * @param {Object} token
	   * @param {Boolean} single
	   * @return {String}
	   */
	
	  function formatToken(token, single) {
	    return token.tag ? inlineFilters(token.value, single) : '"' + token.value + '"';
	  }
	
	  /**
	   * For an attribute with multiple interpolation tags,
	   * e.g. attr="some-{{thing | filter}}", in order to combine
	   * the whole thing into a single watchable expression, we
	   * have to inline those filters. This function does exactly
	   * that. This is a bit hacky but it avoids heavy changes
	   * to directive parser and watcher mechanism.
	   *
	   * @param {String} exp
	   * @param {Boolean} single
	   * @return {String}
	   */
	
	  var filterRE$1 = /[^|]\|[^|]/;
	  function inlineFilters(exp, single) {
	    if (!filterRE$1.test(exp)) {
	      return single ? exp : '(' + exp + ')';
	    } else {
	      var dir = parseDirective(exp);
	      if (!dir.filters) {
	        return '(' + exp + ')';
	      } else {
	        return 'this._applyFilters(' + dir.expression + // value
	        ',null,' + // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'; // write?
	      }
	    }
	  }
	
	  var text$1 = Object.freeze({
	    compileRegex: compileRegex,
	    parseText: parseText,
	    tokensToExp: tokensToExp
	  });
	
	  var delimiters = ['{{', '}}'];
	  var unsafeDelimiters = ['{{{', '}}}'];
	
	  var config = Object.defineProperties({
	
	    /**
	     * Whether to print debug messages.
	     * Also enables stack trace for warnings.
	     *
	     * @type {Boolean}
	     */
	
	    debug: false,
	
	    /**
	     * Whether to suppress warnings.
	     *
	     * @type {Boolean}
	     */
	
	    silent: false,
	
	    /**
	     * Whether to use async rendering.
	     */
	
	    async: true,
	
	    /**
	     * Whether to warn against errors caught when evaluating
	     * expressions.
	     */
	
	    warnExpressionErrors: true,
	
	    /**
	     * Whether or not to handle fully object properties which
	     * are already backed by getters and seters. Depending on
	     * use case and environment, this might introduce non-neglible
	     * performance penalties.
	     */
	    convertAllProperties: false,
	
	    /**
	     * Internal flag to indicate the delimiters have been
	     * changed.
	     *
	     * @type {Boolean}
	     */
	
	    _delimitersChanged: true,
	
	    /**
	     * List of asset types that a component can own.
	     *
	     * @type {Array}
	     */
	
	    _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	    /**
	     * prop binding modes
	     */
	
	    _propBindingModes: {
	      ONE_WAY: 0,
	      TWO_WAY: 1,
	      ONE_TIME: 2
	    },
	
	    /**
	     * Max circular updates allowed in a batcher flush cycle.
	     */
	
	    _maxUpdateCount: 100
	
	  }, {
	    delimiters: { /**
	                   * Interpolation delimiters. Changing these would trigger
	                   * the text parser to re-compile the regular expressions.
	                   *
	                   * @type {Array<String>}
	                   */
	
	      get: function get() {
	        return delimiters;
	      },
	      set: function set(val) {
	        delimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    },
	    unsafeDelimiters: {
	      get: function get() {
	        return unsafeDelimiters;
	      },
	      set: function set(val) {
	        unsafeDelimiters = val;
	        compileRegex();
	      },
	      configurable: true,
	      enumerable: true
	    }
	  });
	
	  var warn = undefined;
	
	  if (true) {
	    (function () {
	      var hasConsole = typeof console !== 'undefined';
	      warn = function (msg, e) {
	        if (hasConsole && (!config.silent || config.debug)) {
	          console.warn('[Vue warn]: ' + msg);
	          /* istanbul ignore if */
	          if (config.debug) {
	            if (e) {
	              throw e;
	            } else {
	              console.warn(new Error('Warning Stack Trace').stack);
	            }
	          }
	        }
	      };
	    })();
	  }
	
	  /**
	   * Append with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function appendWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      target.appendChild(el);
	    }, vm, cb);
	  }
	
	  /**
	   * InsertBefore with transition.
	   *
	   * @param {Element} el
	   * @param {Element} target
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function beforeWithTransition(el, target, vm, cb) {
	    applyTransition(el, 1, function () {
	      before(el, target);
	    }, vm, cb);
	  }
	
	  /**
	   * Remove with transition.
	   *
	   * @param {Element} el
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function removeWithTransition(el, vm, cb) {
	    applyTransition(el, -1, function () {
	      remove(el);
	    }, vm, cb);
	  }
	
	  /**
	   * Apply transitions with an operation callback.
	   *
	   * @param {Element} el
	   * @param {Number} direction
	   *                  1: enter
	   *                 -1: leave
	   * @param {Function} op - the actual DOM operation
	   * @param {Vue} vm
	   * @param {Function} [cb]
	   */
	
	  function applyTransition(el, direction, op, vm, cb) {
	    var transition = el.__v_trans;
	    if (!transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    !transition.hooks && !transitionEndEvent ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    vm.$parent && !vm.$parent._isCompiled) {
	      op();
	      if (cb) cb();
	      return;
	    }
	    var action = direction > 0 ? 'enter' : 'leave';
	    transition[action](op, cb);
	  }
	
	  /**
	   * Query an element selector if it's not an element already.
	   *
	   * @param {String|Element} el
	   * @return {Element}
	   */
	
	  function query(el) {
	    if (typeof el === 'string') {
	      var selector = el;
	      el = document.querySelector(el);
	      if (!el) {
	        'development' !== 'production' && warn('Cannot find element: ' + selector);
	      }
	    }
	    return el;
	  }
	
	  /**
	   * Check if a node is in the document.
	   * Note: document.documentElement.contains should work here
	   * but always returns false for comment nodes in phantomjs,
	   * making unit tests difficult. This is fixed by doing the
	   * contains() check on the node's parentNode instead of
	   * the node itself.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */
	
	  function inDoc(node) {
	    var doc = document.documentElement;
	    var parent = node && node.parentNode;
	    return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	  }
	
	  /**
	   * Get and remove an attribute from a node.
	   *
	   * @param {Node} node
	   * @param {String} _attr
	   */
	
	  function getAttr(node, _attr) {
	    var val = node.getAttribute(_attr);
	    if (val !== null) {
	      node.removeAttribute(_attr);
	    }
	    return val;
	  }
	
	  /**
	   * Get an attribute with colon or v-bind: prefix.
	   *
	   * @param {Node} node
	   * @param {String} name
	   * @return {String|null}
	   */
	
	  function getBindAttr(node, name) {
	    var val = getAttr(node, ':' + name);
	    if (val === null) {
	      val = getAttr(node, 'v-bind:' + name);
	    }
	    return val;
	  }
	
	  /**
	   * Insert el before target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function before(el, target) {
	    target.parentNode.insertBefore(el, target);
	  }
	
	  /**
	   * Insert el after target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function after(el, target) {
	    if (target.nextSibling) {
	      before(el, target.nextSibling);
	    } else {
	      target.parentNode.appendChild(el);
	    }
	  }
	
	  /**
	   * Remove el from DOM
	   *
	   * @param {Element} el
	   */
	
	  function remove(el) {
	    el.parentNode.removeChild(el);
	  }
	
	  /**
	   * Prepend el to target
	   *
	   * @param {Element} el
	   * @param {Element} target
	   */
	
	  function prepend(el, target) {
	    if (target.firstChild) {
	      before(el, target.firstChild);
	    } else {
	      target.appendChild(el);
	    }
	  }
	
	  /**
	   * Replace target with el
	   *
	   * @param {Element} target
	   * @param {Element} el
	   */
	
	  function replace(target, el) {
	    var parent = target.parentNode;
	    if (parent) {
	      parent.replaceChild(el, target);
	    }
	  }
	
	  /**
	   * Add event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   */
	
	  function on$1(el, event, cb) {
	    el.addEventListener(event, cb);
	  }
	
	  /**
	   * Remove event listener shorthand.
	   *
	   * @param {Element} el
	   * @param {String} event
	   * @param {Function} cb
	   */
	
	  function off(el, event, cb) {
	    el.removeEventListener(event, cb);
	  }
	
	  /**
	   * Add class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {Strong} cls
	   */
	
	  function addClass(el, cls) {
	    if (el.classList) {
	      el.classList.add(cls);
	    } else {
	      var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	      if (cur.indexOf(' ' + cls + ' ') < 0) {
	        el.setAttribute('class', (cur + cls).trim());
	      }
	    }
	  }
	
	  /**
	   * Remove class with compatibility for IE & SVG
	   *
	   * @param {Element} el
	   * @param {Strong} cls
	   */
	
	  function removeClass(el, cls) {
	    if (el.classList) {
	      el.classList.remove(cls);
	    } else {
	      var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	      var tar = ' ' + cls + ' ';
	      while (cur.indexOf(tar) >= 0) {
	        cur = cur.replace(tar, ' ');
	      }
	      el.setAttribute('class', cur.trim());
	    }
	    if (!el.className) {
	      el.removeAttribute('class');
	    }
	  }
	
	  /**
	   * Extract raw content inside an element into a temporary
	   * container div
	   *
	   * @param {Element} el
	   * @param {Boolean} asFragment
	   * @return {Element}
	   */
	
	  function extractContent(el, asFragment) {
	    var child;
	    var rawContent;
	    /* istanbul ignore if */
	    if (isTemplate(el) && el.content instanceof DocumentFragment) {
	      el = el.content;
	    }
	    if (el.hasChildNodes()) {
	      trimNode(el);
	      rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	      /* eslint-disable no-cond-assign */
	      while (child = el.firstChild) {
	        /* eslint-enable no-cond-assign */
	        rawContent.appendChild(child);
	      }
	    }
	    return rawContent;
	  }
	
	  /**
	   * Trim possible empty head/tail textNodes inside a parent.
	   *
	   * @param {Node} node
	   */
	
	  function trimNode(node) {
	    trim(node, node.firstChild);
	    trim(node, node.lastChild);
	  }
	
	  function trim(parent, node) {
	    if (node && node.nodeType === 3 && !node.data.trim()) {
	      parent.removeChild(node);
	    }
	  }
	
	  /**
	   * Check if an element is a template tag.
	   * Note if the template appears inside an SVG its tagName
	   * will be in lowercase.
	   *
	   * @param {Element} el
	   */
	
	  function isTemplate(el) {
	    return el.tagName && el.tagName.toLowerCase() === 'template';
	  }
	
	  /**
	   * Create an "anchor" for performing dom insertion/removals.
	   * This is used in a number of scenarios:
	   * - fragment instance
	   * - v-html
	   * - v-if
	   * - v-for
	   * - component
	   *
	   * @param {String} content
	   * @param {Boolean} persist - IE trashes empty textNodes on
	   *                            cloneNode(true), so in certain
	   *                            cases the anchor needs to be
	   *                            non-empty to be persisted in
	   *                            templates.
	   * @return {Comment|Text}
	   */
	
	  function createAnchor(content, persist) {
	    var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	    anchor.__vue_anchor = true;
	    return anchor;
	  }
	
	  /**
	   * Find a component ref attribute that starts with $.
	   *
	   * @param {Element} node
	   * @return {String|undefined}
	   */
	
	  var refRE = /^v-ref:/;
	
	  function findRef(node) {
	    if (node.hasAttributes()) {
	      var attrs = node.attributes;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        var name = attrs[i].name;
	        if (refRE.test(name)) {
	          return camelize(name.replace(refRE, ''));
	        }
	      }
	    }
	  }
	
	  /**
	   * Map a function to a range of nodes .
	   *
	   * @param {Node} node
	   * @param {Node} end
	   * @param {Function} op
	   */
	
	  function mapNodeRange(node, end, op) {
	    var next;
	    while (node !== end) {
	      next = node.nextSibling;
	      op(node);
	      node = next;
	    }
	    op(end);
	  }
	
	  /**
	   * Remove a range of nodes with transition, store
	   * the nodes in a fragment with correct ordering,
	   * and call callback when done.
	   *
	   * @param {Node} start
	   * @param {Node} end
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Function} cb
	   */
	
	  function removeNodeRange(start, end, vm, frag, cb) {
	    var done = false;
	    var removed = 0;
	    var nodes = [];
	    mapNodeRange(start, end, function (node) {
	      if (node === end) done = true;
	      nodes.push(node);
	      removeWithTransition(node, vm, onRemoved);
	    });
	    function onRemoved() {
	      removed++;
	      if (done && removed >= nodes.length) {
	        for (var i = 0; i < nodes.length; i++) {
	          frag.appendChild(nodes[i]);
	        }
	        cb && cb();
	      }
	    }
	  }
	
	  var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	
	  /**
	   * Check if an element is a component, if yes return its
	   * component id.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Object|undefined}
	   */
	
	  function checkComponentAttr(el, options) {
	    var tag = el.tagName.toLowerCase();
	    var hasAttrs = el.hasAttributes();
	    if (!commonTagRE.test(tag) && tag !== 'component') {
	      if (resolveAsset(options, 'components', tag)) {
	        return { id: tag };
	      } else {
	        var is = hasAttrs && getIsBinding(el);
	        if (is) {
	          return is;
	        } else if (true) {
	          if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	          // Chrome returns unknown for several HTML5 elements.
	          // https://code.google.com/p/chromium/issues/detail?id=540526
	          !/^(data|time|rtc|rb)$/.test(tag)) {
	            warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	          }
	        }
	      }
	    } else if (hasAttrs) {
	      return getIsBinding(el);
	    }
	  }
	
	  /**
	   * Get "is" binding from an element.
	   *
	   * @param {Element} el
	   * @return {Object|undefined}
	   */
	
	  function getIsBinding(el) {
	    // dynamic syntax
	    var exp = getAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp };
	    } else {
	      exp = getBindAttr(el, 'is');
	      if (exp != null) {
	        return { id: exp, dynamic: true };
	      }
	    }
	  }
	
	  /**
	   * Set a prop's initial value on a vm and its data object.
	   *
	   * @param {Vue} vm
	   * @param {Object} prop
	   * @param {*} value
	   */
	
	  function initProp(vm, prop, value) {
	    var key = prop.path;
	    vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	  }
	
	  /**
	   * Assert whether a prop is valid.
	   *
	   * @param {Object} prop
	   * @param {*} value
	   */
	
	  function assertProp(prop, value) {
	    // if a prop is not provided and is not required,
	    // skip the check.
	    if (prop.raw === null && !prop.required) {
	      return true;
	    }
	    var options = prop.options;
	    var type = options.type;
	    var valid = true;
	    var expectedType;
	    if (type) {
	      if (type === String) {
	        expectedType = 'string';
	        valid = typeof value === expectedType;
	      } else if (type === Number) {
	        expectedType = 'number';
	        valid = typeof value === 'number';
	      } else if (type === Boolean) {
	        expectedType = 'boolean';
	        valid = typeof value === 'boolean';
	      } else if (type === Function) {
	        expectedType = 'function';
	        valid = typeof value === 'function';
	      } else if (type === Object) {
	        expectedType = 'object';
	        valid = isPlainObject(value);
	      } else if (type === Array) {
	        expectedType = 'array';
	        valid = isArray(value);
	      } else {
	        valid = value instanceof type;
	      }
	    }
	    if (!valid) {
	      'development' !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	      return false;
	    }
	    var validator = options.validator;
	    if (validator) {
	      if (!validator.call(null, value)) {
	        'development' !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	        return false;
	      }
	    }
	    return true;
	  }
	
	  function formatType(val) {
	    return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	  }
	
	  function formatValue(val) {
	    return Object.prototype.toString.call(val).slice(8, -1);
	  }
	
	  /**
	   * Option overwriting strategies are functions that handle
	   * how to merge a parent option value and a child option
	   * value into the final value.
	   *
	   * All strategy functions follow the same signature:
	   *
	   * @param {*} parentVal
	   * @param {*} childVal
	   * @param {Vue} [vm]
	   */
	
	  var strats = config.optionMergeStrategies = Object.create(null);
	
	  /**
	   * Helper that recursively merges two data objects together.
	   */
	
	  function mergeData(to, from) {
	    var key, toVal, fromVal;
	    for (key in from) {
	      toVal = to[key];
	      fromVal = from[key];
	      if (!hasOwn(to, key)) {
	        set(to, key, fromVal);
	      } else if (isObject(toVal) && isObject(fromVal)) {
	        mergeData(toVal, fromVal);
	      }
	    }
	    return to;
	  }
	
	  /**
	   * Data
	   */
	
	  strats.data = function (parentVal, childVal, vm) {
	    if (!vm) {
	      // in a Vue.extend merge, both should be functions
	      if (!childVal) {
	        return parentVal;
	      }
	      if (typeof childVal !== 'function') {
	        'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	        return parentVal;
	      }
	      if (!parentVal) {
	        return childVal;
	      }
	      // when parentVal & childVal are both present,
	      // we need to return a function that returns the
	      // merged result of both functions... no need to
	      // check if parentVal is a function here because
	      // it has to be a function to pass previous merges.
	      return function mergedDataFn() {
	        return mergeData(childVal.call(this), parentVal.call(this));
	      };
	    } else if (parentVal || childVal) {
	      return function mergedInstanceDataFn() {
	        // instance merge
	        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	        if (instanceData) {
	          return mergeData(instanceData, defaultData);
	        } else {
	          return defaultData;
	        }
	      };
	    }
	  };
	
	  /**
	   * El
	   */
	
	  strats.el = function (parentVal, childVal, vm) {
	    if (!vm && childVal && typeof childVal !== 'function') {
	      'development' !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return;
	    }
	    var ret = childVal || parentVal;
	    // invoke the element factory if this is instance merge
	    return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	  };
	
	  /**
	   * Hooks and param attributes are merged as arrays.
	   */
	
	  strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	  };
	
	  /**
	   * 0.11 deprecation warning
	   */
	
	  strats.paramAttributes = function () {
	    /* istanbul ignore next */
	    'development' !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	  };
	
	  /**
	   * Assets
	   *
	   * When a vm is present (instance creation), we need to do
	   * a three-way merge between constructor options, instance
	   * options and parent options.
	   */
	
	  function mergeAssets(parentVal, childVal) {
	    var res = Object.create(parentVal);
	    return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	  }
	
	  config._assetTypes.forEach(function (type) {
	    strats[type + 's'] = mergeAssets;
	  });
	
	  /**
	   * Events & Watchers.
	   *
	   * Events & watchers hashes should not overwrite one
	   * another, so we merge them as arrays.
	   */
	
	  strats.watch = strats.events = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = {};
	    extend(ret, parentVal);
	    for (var key in childVal) {
	      var parent = ret[key];
	      var child = childVal[key];
	      if (parent && !isArray(parent)) {
	        parent = [parent];
	      }
	      ret[key] = parent ? parent.concat(child) : [child];
	    }
	    return ret;
	  };
	
	  /**
	   * Other object hashes.
	   */
	
	  strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	    if (!childVal) return parentVal;
	    if (!parentVal) return childVal;
	    var ret = Object.create(null);
	    extend(ret, parentVal);
	    extend(ret, childVal);
	    return ret;
	  };
	
	  /**
	   * Default strategy.
	   */
	
	  var defaultStrat = function defaultStrat(parentVal, childVal) {
	    return childVal === undefined ? parentVal : childVal;
	  };
	
	  /**
	   * Make sure component options get converted to actual
	   * constructors.
	   *
	   * @param {Object} options
	   */
	
	  function guardComponents(options) {
	    if (options.components) {
	      var components = options.components = guardArrayAssets(options.components);
	      var def;
	      var ids = Object.keys(components);
	      for (var i = 0, l = ids.length; i < l; i++) {
	        var key = ids[i];
	        if (commonTagRE.test(key)) {
	          'development' !== 'production' && warn('Do not use built-in HTML elements as component ' + 'id: ' + key);
	          continue;
	        }
	        def = components[key];
	        if (isPlainObject(def)) {
	          components[key] = Vue.extend(def);
	        }
	      }
	    }
	  }
	
	  /**
	   * Ensure all props option syntax are normalized into the
	   * Object-based format.
	   *
	   * @param {Object} options
	   */
	
	  function guardProps(options) {
	    var props = options.props;
	    var i, val;
	    if (isArray(props)) {
	      options.props = {};
	      i = props.length;
	      while (i--) {
	        val = props[i];
	        if (typeof val === 'string') {
	          options.props[val] = null;
	        } else if (val.name) {
	          options.props[val.name] = val;
	        }
	      }
	    } else if (isPlainObject(props)) {
	      var keys = Object.keys(props);
	      i = keys.length;
	      while (i--) {
	        val = props[keys[i]];
	        if (typeof val === 'function') {
	          props[keys[i]] = { type: val };
	        }
	      }
	    }
	  }
	
	  /**
	   * Guard an Array-format assets option and converted it
	   * into the key-value Object format.
	   *
	   * @param {Object|Array} assets
	   * @return {Object}
	   */
	
	  function guardArrayAssets(assets) {
	    if (isArray(assets)) {
	      var res = {};
	      var i = assets.length;
	      var asset;
	      while (i--) {
	        asset = assets[i];
	        var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	        if (!id) {
	          'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	        } else {
	          res[id] = asset;
	        }
	      }
	      return res;
	    }
	    return assets;
	  }
	
	  /**
	   * Merge two option objects into a new one.
	   * Core utility used in both instantiation and inheritance.
	   *
	   * @param {Object} parent
	   * @param {Object} child
	   * @param {Vue} [vm] - if vm is present, indicates this is
	   *                     an instantiation merge.
	   */
	
	  function mergeOptions(parent, child, vm) {
	    guardComponents(child);
	    guardProps(child);
	    var options = {};
	    var key;
	    if (child.mixins) {
	      for (var i = 0, l = child.mixins.length; i < l; i++) {
	        parent = mergeOptions(parent, child.mixins[i], vm);
	      }
	    }
	    for (key in parent) {
	      mergeField(key);
	    }
	    for (key in child) {
	      if (!hasOwn(parent, key)) {
	        mergeField(key);
	      }
	    }
	    function mergeField(key) {
	      var strat = strats[key] || defaultStrat;
	      options[key] = strat(parent[key], child[key], vm, key);
	    }
	    return options;
	  }
	
	  /**
	   * Resolve an asset.
	   * This function is used because child instances need access
	   * to assets defined in its ancestor chain.
	   *
	   * @param {Object} options
	   * @param {String} type
	   * @param {String} id
	   * @return {Object|Function}
	   */
	
	  function resolveAsset(options, type, id) {
	    var assets = options[type];
	    var camelizedId;
	    return assets[id] ||
	    // camelCase ID
	    assets[camelizedId = camelize(id)] ||
	    // Pascal Case ID
	    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  }
	
	  /**
	   * Assert asset exists
	   */
	
	  function assertAsset(val, type, id) {
	    if (!val) {
	      'development' !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	    }
	  }
	
	  var arrayProto = Array.prototype;
	  var arrayMethods = Object.create(arrayProto)
	
	  /**
	   * Intercept mutating methods and emit events
	   */
	
	  ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	    // cache original method
	    var original = arrayProto[method];
	    def(arrayMethods, method, function mutator() {
	      // avoid leaking arguments:
	      // http://jsperf.com/closure-with-arguments
	      var i = arguments.length;
	      var args = new Array(i);
	      while (i--) {
	        args[i] = arguments[i];
	      }
	      var result = original.apply(this, args);
	      var ob = this.__ob__;
	      var inserted;
	      switch (method) {
	        case 'push':
	          inserted = args;
	          break;
	        case 'unshift':
	          inserted = args;
	          break;
	        case 'splice':
	          inserted = args.slice(2);
	          break;
	      }
	      if (inserted) ob.observeArray(inserted);
	      // notify change
	      ob.dep.notify();
	      return result;
	    });
	  });
	
	  /**
	   * Swap the element at the given index with a new value
	   * and emits corresponding event.
	   *
	   * @param {Number} index
	   * @param {*} val
	   * @return {*} - replaced element
	   */
	
	  def(arrayProto, '$set', function $set(index, val) {
	    if (index >= this.length) {
	      this.length = index + 1;
	    }
	    return this.splice(index, 1, val)[0];
	  });
	
	  /**
	   * Convenience method to remove the element at given index.
	   *
	   * @param {Number} index
	   * @param {*} val
	   */
	
	  def(arrayProto, '$remove', function $remove(item) {
	    /* istanbul ignore if */
	    if (!this.length) return;
	    var index = indexOf(this, item);
	    if (index > -1) {
	      return this.splice(index, 1);
	    }
	  });
	
	  var uid$3 = 0;
	
	  /**
	   * A dep is an observable that can have multiple
	   * directives subscribing to it.
	   *
	   * @constructor
	   */
	  function Dep() {
	    this.id = uid$3++;
	    this.subs = [];
	  }
	
	  // the current target watcher being evaluated.
	  // this is globally unique because there could be only one
	  // watcher being evaluated at any time.
	  Dep.target = null;
	
	  /**
	   * Add a directive subscriber.
	   *
	   * @param {Directive} sub
	   */
	
	  Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	  };
	
	  /**
	   * Remove a directive subscriber.
	   *
	   * @param {Directive} sub
	   */
	
	  Dep.prototype.removeSub = function (sub) {
	    this.subs.$remove(sub);
	  };
	
	  /**
	   * Add self as a dependency to the target watcher.
	   */
	
	  Dep.prototype.depend = function () {
	    Dep.target.addDep(this);
	  };
	
	  /**
	   * Notify all subscribers of a new value.
	   */
	
	  Dep.prototype.notify = function () {
	    // stablize the subscriber list first
	    var subs = toArray(this.subs);
	    for (var i = 0, l = subs.length; i < l; i++) {
	      subs[i].update();
	    }
	  };
	
	  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	  /**
	   * Observer class that are attached to each observed
	   * object. Once attached, the observer converts target
	   * object's property keys into getter/setters that
	   * collect dependencies and dispatches updates.
	   *
	   * @param {Array|Object} value
	   * @constructor
	   */
	
	  function Observer(value) {
	    this.value = value;
	    this.dep = new Dep();
	    def(value, '__ob__', this);
	    if (isArray(value)) {
	      var augment = hasProto ? protoAugment : copyAugment;
	      augment(value, arrayMethods, arrayKeys);
	      this.observeArray(value);
	    } else {
	      this.walk(value);
	    }
	  }
	
	  // Instance methods
	
	  /**
	   * Walk through each property and convert them into
	   * getter/setters. This method should only be called when
	   * value type is Object.
	   *
	   * @param {Object} obj
	   */
	
	  Observer.prototype.walk = function (obj) {
	    var keys = Object.keys(obj);
	    var i = keys.length;
	    while (i--) {
	      this.convert(keys[i], obj[keys[i]]);
	    }
	  };
	
	  /**
	   * Observe a list of Array items.
	   *
	   * @param {Array} items
	   */
	
	  Observer.prototype.observeArray = function (items) {
	    var i = items.length;
	    while (i--) {
	      observe(items[i]);
	    }
	  };
	
	  /**
	   * Convert a property into getter/setter so we can emit
	   * the events when the property is accessed/changed.
	   *
	   * @param {String} key
	   * @param {*} val
	   */
	
	  Observer.prototype.convert = function (key, val) {
	    defineReactive(this.value, key, val);
	  };
	
	  /**
	   * Add an owner vm, so that when $set/$delete mutations
	   * happen we can notify owner vms to proxy the keys and
	   * digest the watchers. This is only called when the object
	   * is observed as an instance's root $data.
	   *
	   * @param {Vue} vm
	   */
	
	  Observer.prototype.addVm = function (vm) {
	    (this.vms || (this.vms = [])).push(vm);
	  };
	
	  /**
	   * Remove an owner vm. This is called when the object is
	   * swapped out as an instance's $data object.
	   *
	   * @param {Vue} vm
	   */
	
	  Observer.prototype.removeVm = function (vm) {
	    this.vms.$remove(vm);
	  };
	
	  // helpers
	
	  /**
	   * Augment an target Object or Array by intercepting
	   * the prototype chain using __proto__
	   *
	   * @param {Object|Array} target
	   * @param {Object} proto
	   */
	
	  function protoAugment(target, src) {
	    target.__proto__ = src;
	  }
	
	  /**
	   * Augment an target Object or Array by defining
	   * hidden properties.
	   *
	   * @param {Object|Array} target
	   * @param {Object} proto
	   */
	
	  function copyAugment(target, src, keys) {
	    var i = keys.length;
	    var key;
	    while (i--) {
	      key = keys[i];
	      def(target, key, src[key]);
	    }
	  }
	
	  /**
	   * Attempt to create an observer instance for a value,
	   * returns the new observer if successfully observed,
	   * or the existing observer if the value already has one.
	   *
	   * @param {*} value
	   * @param {Vue} [vm]
	   * @return {Observer|undefined}
	   * @static
	   */
	
	  function observe(value, vm) {
	    if (!value || typeof value !== 'object') {
	      return;
	    }
	    var ob;
	    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	      ob = value.__ob__;
	    } else if ((isArray(value) || isPlainObject(value)) && !Object.isFrozen(value) && !value._isVue) {
	      ob = new Observer(value);
	    }
	    if (ob && vm) {
	      ob.addVm(vm);
	    }
	    return ob;
	  }
	
	  /**
	   * Define a reactive property on an Object.
	   *
	   * @param {Object} obj
	   * @param {String} key
	   * @param {*} val
	   */
	
	  function defineReactive(obj, key, val) {
	    var dep = new Dep();
	
	    // cater for pre-defined getter/setters
	    var getter, setter;
	    if (config.convertAllProperties) {
	      var property = Object.getOwnPropertyDescriptor(obj, key);
	      if (property && property.configurable === false) {
	        return;
	      }
	      getter = property && property.get;
	      setter = property && property.set;
	    }
	
	    var childOb = observe(val);
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      configurable: true,
	      get: function reactiveGetter() {
	        var value = getter ? getter.call(obj) : val;
	        if (Dep.target) {
	          dep.depend();
	          if (childOb) {
	            childOb.dep.depend();
	          }
	          if (isArray(value)) {
	            for (var e, i = 0, l = value.length; i < l; i++) {
	              e = value[i];
	              e && e.__ob__ && e.__ob__.dep.depend();
	            }
	          }
	        }
	        return value;
	      },
	      set: function reactiveSetter(newVal) {
	        var value = getter ? getter.call(obj) : val;
	        if (newVal === value) {
	          return;
	        }
	        if (setter) {
	          setter.call(obj, newVal);
	        } else {
	          val = newVal;
	        }
	        childOb = observe(newVal);
	        dep.notify();
	      }
	    });
	  }
	
	  var util = Object.freeze({
	  	defineReactive: defineReactive,
	  	set: set,
	  	del: del,
	  	hasOwn: hasOwn,
	  	isLiteral: isLiteral,
	  	isReserved: isReserved,
	  	_toString: _toString,
	  	toNumber: toNumber,
	  	toBoolean: toBoolean,
	  	stripQuotes: stripQuotes,
	  	camelize: camelize,
	  	hyphenate: hyphenate,
	  	classify: classify,
	  	bind: bind$1,
	  	toArray: toArray,
	  	extend: extend,
	  	isObject: isObject,
	  	isPlainObject: isPlainObject,
	  	def: def,
	  	debounce: _debounce,
	  	indexOf: indexOf,
	  	cancellable: cancellable,
	  	looseEqual: looseEqual,
	  	isArray: isArray,
	  	hasProto: hasProto,
	  	inBrowser: inBrowser,
	  	isIE9: isIE9,
	  	isAndroid: isAndroid,
	  	get transitionProp () { return transitionProp; },
	  	get transitionEndEvent () { return transitionEndEvent; },
	  	get animationProp () { return animationProp; },
	  	get animationEndEvent () { return animationEndEvent; },
	  	nextTick: nextTick,
	  	query: query,
	  	inDoc: inDoc,
	  	getAttr: getAttr,
	  	getBindAttr: getBindAttr,
	  	before: before,
	  	after: after,
	  	remove: remove,
	  	prepend: prepend,
	  	replace: replace,
	  	on: on$1,
	  	off: off,
	  	addClass: addClass,
	  	removeClass: removeClass,
	  	extractContent: extractContent,
	  	trimNode: trimNode,
	  	isTemplate: isTemplate,
	  	createAnchor: createAnchor,
	  	findRef: findRef,
	  	mapNodeRange: mapNodeRange,
	  	removeNodeRange: removeNodeRange,
	  	mergeOptions: mergeOptions,
	  	resolveAsset: resolveAsset,
	  	assertAsset: assertAsset,
	  	checkComponentAttr: checkComponentAttr,
	  	initProp: initProp,
	  	assertProp: assertProp,
	  	commonTagRE: commonTagRE,
	  	get warn () { return warn; }
	  });
	
	  var uid = 0;
	
	  function initMixin (Vue) {
	
	    /**
	     * The main init sequence. This is called for every
	     * instance, including ones that are created from extended
	     * constructors.
	     *
	     * @param {Object} options - this options object should be
	     *                           the result of merging class
	     *                           options and the options passed
	     *                           in to the constructor.
	     */
	
	    Vue.prototype._init = function (options) {
	
	      options = options || {};
	
	      this.$el = null;
	      this.$parent = options.parent;
	      this.$root = this.$parent ? this.$parent.$root : this;
	      this.$children = [];
	      this.$refs = {}; // child vm references
	      this.$els = {}; // element references
	      this._watchers = []; // all watchers as an array
	      this._directives = []; // all directives
	
	      // a uid
	      this._uid = uid++;
	
	      // a flag to avoid this being observed
	      this._isVue = true;
	
	      // events bookkeeping
	      this._events = {}; // registered callbacks
	      this._eventsCount = {}; // for $broadcast optimization
	
	      // fragment instance properties
	      this._isFragment = false;
	      this._fragment = // @type {DocumentFragment}
	      this._fragmentStart = // @type {Text|Comment}
	      this._fragmentEnd = null; // @type {Text|Comment}
	
	      // lifecycle state
	      this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	      this._unlinkFn = null;
	
	      // context:
	      // if this is a transcluded component, context
	      // will be the common parent vm of this instance
	      // and its host.
	      this._context = options._context || this.$parent;
	
	      // scope:
	      // if this is inside an inline v-for, the scope
	      // will be the intermediate scope created for this
	      // repeat fragment. this is used for linking props
	      // and container directives.
	      this._scope = options._scope;
	
	      // fragment:
	      // if this instance is compiled inside a Fragment, it
	      // needs to reigster itself as a child of that fragment
	      // for attach/detach to work properly.
	      this._frag = options._frag;
	      if (this._frag) {
	        this._frag.children.push(this);
	      }
	
	      // push self into parent / transclusion host
	      if (this.$parent) {
	        this.$parent.$children.push(this);
	      }
	
	      // merge options.
	      options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	      // set ref
	      this._updateRef();
	
	      // initialize data as empty object.
	      // it will be filled up in _initScope().
	      this._data = {};
	
	      // call init hook
	      this._callHook('init');
	
	      // initialize data observation and scope inheritance.
	      this._initState();
	
	      // setup event system and option events.
	      this._initEvents();
	
	      // call created hook
	      this._callHook('created');
	
	      // if `el` option is passed, start compilation.
	      if (options.el) {
	        this.$mount(options.el);
	      }
	    };
	  }
	
	  var pathCache = new Cache(1000);
	
	  // actions
	  var APPEND = 0;
	  var PUSH = 1;
	  var INC_SUB_PATH_DEPTH = 2;
	  var PUSH_SUB_PATH = 3;
	
	  // states
	  var BEFORE_PATH = 0;
	  var IN_PATH = 1;
	  var BEFORE_IDENT = 2;
	  var IN_IDENT = 3;
	  var IN_SUB_PATH = 4;
	  var IN_SINGLE_QUOTE = 5;
	  var IN_DOUBLE_QUOTE = 6;
	  var AFTER_PATH = 7;
	  var ERROR = 8;
	
	  var pathStateMachine = [];
	
	  pathStateMachine[BEFORE_PATH] = {
	    'ws': [BEFORE_PATH],
	    'ident': [IN_IDENT, APPEND],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };
	
	  pathStateMachine[IN_PATH] = {
	    'ws': [IN_PATH],
	    '.': [BEFORE_IDENT],
	    '[': [IN_SUB_PATH],
	    'eof': [AFTER_PATH]
	  };
	
	  pathStateMachine[BEFORE_IDENT] = {
	    'ws': [BEFORE_IDENT],
	    'ident': [IN_IDENT, APPEND]
	  };
	
	  pathStateMachine[IN_IDENT] = {
	    'ident': [IN_IDENT, APPEND],
	    '0': [IN_IDENT, APPEND],
	    'number': [IN_IDENT, APPEND],
	    'ws': [IN_PATH, PUSH],
	    '.': [BEFORE_IDENT, PUSH],
	    '[': [IN_SUB_PATH, PUSH],
	    'eof': [AFTER_PATH, PUSH]
	  };
	
	  pathStateMachine[IN_SUB_PATH] = {
	    "'": [IN_SINGLE_QUOTE, APPEND],
	    '"': [IN_DOUBLE_QUOTE, APPEND],
	    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	    ']': [IN_PATH, PUSH_SUB_PATH],
	    'eof': ERROR,
	    'else': [IN_SUB_PATH, APPEND]
	  };
	
	  pathStateMachine[IN_SINGLE_QUOTE] = {
	    "'": [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_SINGLE_QUOTE, APPEND]
	  };
	
	  pathStateMachine[IN_DOUBLE_QUOTE] = {
	    '"': [IN_SUB_PATH, APPEND],
	    'eof': ERROR,
	    'else': [IN_DOUBLE_QUOTE, APPEND]
	  };
	
	  /**
	   * Determine the type of a character in a keypath.
	   *
	   * @param {Char} ch
	   * @return {String} type
	   */
	
	  function getPathCharType(ch) {
	    if (ch === undefined) {
	      return 'eof';
	    }
	
	    var code = ch.charCodeAt(0);
	
	    switch (code) {
	      case 0x5B: // [
	      case 0x5D: // ]
	      case 0x2E: // .
	      case 0x22: // "
	      case 0x27: // '
	      case 0x30:
	        // 0
	        return ch;
	
	      case 0x5F: // _
	      case 0x24:
	        // $
	        return 'ident';
	
	      case 0x20: // Space
	      case 0x09: // Tab
	      case 0x0A: // Newline
	      case 0x0D: // Return
	      case 0xA0: // No-break space
	      case 0xFEFF: // Byte Order Mark
	      case 0x2028: // Line Separator
	      case 0x2029:
	        // Paragraph Separator
	        return 'ws';
	    }
	
	    // a-z, A-Z
	    if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	      return 'ident';
	    }
	
	    // 1-9
	    if (code >= 0x31 && code <= 0x39) {
	      return 'number';
	    }
	
	    return 'else';
	  }
	
	  /**
	   * Format a subPath, return its plain form if it is
	   * a literal string or number. Otherwise prepend the
	   * dynamic indicator (*).
	   *
	   * @param {String} path
	   * @return {String}
	   */
	
	  function formatSubPath(path) {
	    var trimmed = path.trim();
	    // invalid leading 0
	    if (path.charAt(0) === '0' && isNaN(path)) {
	      return false;
	    }
	    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	  }
	
	  /**
	   * Parse a string path into an array of segments
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */
	
	  function parse(path) {
	    var keys = [];
	    var index = -1;
	    var mode = BEFORE_PATH;
	    var subPathDepth = 0;
	    var c, newChar, key, type, transition, action, typeMap;
	
	    var actions = [];
	
	    actions[PUSH] = function () {
	      if (key !== undefined) {
	        keys.push(key);
	        key = undefined;
	      }
	    };
	
	    actions[APPEND] = function () {
	      if (key === undefined) {
	        key = newChar;
	      } else {
	        key += newChar;
	      }
	    };
	
	    actions[INC_SUB_PATH_DEPTH] = function () {
	      actions[APPEND]();
	      subPathDepth++;
	    };
	
	    actions[PUSH_SUB_PATH] = function () {
	      if (subPathDepth > 0) {
	        subPathDepth--;
	        mode = IN_SUB_PATH;
	        actions[APPEND]();
	      } else {
	        subPathDepth = 0;
	        key = formatSubPath(key);
	        if (key === false) {
	          return false;
	        } else {
	          actions[PUSH]();
	        }
	      }
	    };
	
	    function maybeUnescapeQuote() {
	      var nextChar = path[index + 1];
	      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	        index++;
	        newChar = '\\' + nextChar;
	        actions[APPEND]();
	        return true;
	      }
	    }
	
	    while (mode != null) {
	      index++;
	      c = path[index];
	
	      if (c === '\\' && maybeUnescapeQuote()) {
	        continue;
	      }
	
	      type = getPathCharType(c);
	      typeMap = pathStateMachine[mode];
	      transition = typeMap[type] || typeMap['else'] || ERROR;
	
	      if (transition === ERROR) {
	        return; // parse error
	      }
	
	      mode = transition[0];
	      action = actions[transition[1]];
	      if (action) {
	        newChar = transition[2];
	        newChar = newChar === undefined ? c : newChar;
	        if (action() === false) {
	          return;
	        }
	      }
	
	      if (mode === AFTER_PATH) {
	        keys.raw = path;
	        return keys;
	      }
	    }
	  }
	
	  /**
	   * External parse that check for a cache hit first
	   *
	   * @param {String} path
	   * @return {Array|undefined}
	   */
	
	  function parsePath(path) {
	    var hit = pathCache.get(path);
	    if (!hit) {
	      hit = parse(path);
	      if (hit) {
	        pathCache.put(path, hit);
	      }
	    }
	    return hit;
	  }
	
	  /**
	   * Get from an object from a path string
	   *
	   * @param {Object} obj
	   * @param {String} path
	   */
	
	  function getPath(obj, path) {
	    return parseExpression(path).get(obj);
	  }
	
	  /**
	   * Warn against setting non-existent root path on a vm.
	   */
	
	  var warnNonExistent;
	  if (true) {
	    warnNonExistent = function (path) {
	      warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	    };
	  }
	
	  /**
	   * Set on an object from a path
	   *
	   * @param {Object} obj
	   * @param {String | Array} path
	   * @param {*} val
	   */
	
	  function setPath(obj, path, val) {
	    var original = obj;
	    if (typeof path === 'string') {
	      path = parse(path);
	    }
	    if (!path || !isObject(obj)) {
	      return false;
	    }
	    var last, key;
	    for (var i = 0, l = path.length; i < l; i++) {
	      last = obj;
	      key = path[i];
	      if (key.charAt(0) === '*') {
	        key = parseExpression(key.slice(1)).get.call(original, original);
	      }
	      if (i < l - 1) {
	        obj = obj[key];
	        if (!isObject(obj)) {
	          obj = {};
	          if ('development' !== 'production' && last._isVue) {
	            warnNonExistent(path);
	          }
	          set(last, key, obj);
	        }
	      } else {
	        if (isArray(obj)) {
	          obj.$set(key, val);
	        } else if (key in obj) {
	          obj[key] = val;
	        } else {
	          if ('development' !== 'production' && obj._isVue) {
	            warnNonExistent(path);
	          }
	          set(obj, key, val);
	        }
	      }
	    }
	    return true;
	  }
	
	  var path = Object.freeze({
	    parsePath: parsePath,
	    getPath: getPath,
	    setPath: setPath
	  });
	
	  var expressionCache = new Cache(1000);
	
	  var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	  var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	  // keywords that don't make sense inside expressions
	  var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	  var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	  var wsRE = /\s/g;
	  var newlineRE = /\n/g;
	  var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g;
	  var restoreRE = /"(\d+)"/g;
	  var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	  var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g;
	  var booleanLiteralRE = /^(true|false)$/;
	
	  /**
	   * Save / Rewrite / Restore
	   *
	   * When rewriting paths found in an expression, it is
	   * possible for the same letter sequences to be found in
	   * strings and Object literal property keys. Therefore we
	   * remove and store these parts in a temporary array, and
	   * restore them after the path rewrite.
	   */
	
	  var saved = [];
	
	  /**
	   * Save replacer
	   *
	   * The save regex can match two possible cases:
	   * 1. An opening object literal
	   * 2. A string
	   * If matched as a plain string, we need to escape its
	   * newlines, since the string needs to be preserved when
	   * generating the function body.
	   *
	   * @param {String} str
	   * @param {String} isString - str if matched as a string
	   * @return {String} - placeholder with index
	   */
	
	  function save(str, isString) {
	    var i = saved.length;
	    saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	    return '"' + i + '"';
	  }
	
	  /**
	   * Path rewrite replacer
	   *
	   * @param {String} raw
	   * @return {String}
	   */
	
	  function rewrite(raw) {
	    var c = raw.charAt(0);
	    var path = raw.slice(1);
	    if (allowedKeywordsRE.test(path)) {
	      return raw;
	    } else {
	      path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	      return c + 'scope.' + path;
	    }
	  }
	
	  /**
	   * Restore replacer
	   *
	   * @param {String} str
	   * @param {String} i - matched save index
	   * @return {String}
	   */
	
	  function restore(str, i) {
	    return saved[i];
	  }
	
	  /**
	   * Rewrite an expression, prefixing all path accessors with
	   * `scope.` and generate getter/setter functions.
	   *
	   * @param {String} exp
	   * @return {Function}
	   */
	
	  function compileGetter(exp) {
	    if (improperKeywordsRE.test(exp)) {
	      'development' !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	    }
	    // reset state
	    saved.length = 0;
	    // save strings and object literal keys
	    var body = exp.replace(saveRE, save).replace(wsRE, '');
	    // rewrite all paths
	    // pad 1 space here becaue the regex matches 1 extra char
	    body = (' ' + body).replace(pathReplaceRE, rewrite).replace(restoreRE, restore);
	    return makeGetterFn(body);
	  }
	
	  /**
	   * Build a getter function. Requires eval.
	   *
	   * We isolate the try/catch so it doesn't affect the
	   * optimization of the parse function when it is not called.
	   *
	   * @param {String} body
	   * @return {Function|undefined}
	   */
	
	  function makeGetterFn(body) {
	    try {
	      return new Function('scope', 'return ' + body + ';');
	    } catch (e) {
	      'development' !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	    }
	  }
	
	  /**
	   * Compile a setter function for the expression.
	   *
	   * @param {String} exp
	   * @return {Function|undefined}
	   */
	
	  function compileSetter(exp) {
	    var path = parsePath(exp);
	    if (path) {
	      return function (scope, val) {
	        setPath(scope, path, val);
	      };
	    } else {
	      'development' !== 'production' && warn('Invalid setter expression: ' + exp);
	    }
	  }
	
	  /**
	   * Parse an expression into re-written getter/setters.
	   *
	   * @param {String} exp
	   * @param {Boolean} needSet
	   * @return {Function}
	   */
	
	  function parseExpression(exp, needSet) {
	    exp = exp.trim();
	    // try cache
	    var hit = expressionCache.get(exp);
	    if (hit) {
	      if (needSet && !hit.set) {
	        hit.set = compileSetter(hit.exp);
	      }
	      return hit;
	    }
	    var res = { exp: exp };
	    res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	    // optimized super simple getter
	    ? makeGetterFn('scope.' + exp)
	    // dynamic getter
	    : compileGetter(exp);
	    if (needSet) {
	      res.set = compileSetter(exp);
	    }
	    expressionCache.put(exp, res);
	    return res;
	  }
	
	  /**
	   * Check if an expression is a simple path.
	   *
	   * @param {String} exp
	   * @return {Boolean}
	   */
	
	  function isSimplePath(exp) {
	    return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.';
	  }
	
	  var expression = Object.freeze({
	    parseExpression: parseExpression,
	    isSimplePath: isSimplePath
	  });
	
	  // we have two separate queues: one for directive updates
	  // and one for user watcher registered via $watch().
	  // we want to guarantee directive updates to be called
	  // before user watchers so that when user watchers are
	  // triggered, the DOM would have already been in updated
	  // state.
	  var queue = [];
	  var userQueue = [];
	  var has = {};
	  var circular = {};
	  var waiting = false;
	  var internalQueueDepleted = false;
	
	  /**
	   * Reset the batcher's state.
	   */
	
	  function resetBatcherState() {
	    queue = [];
	    userQueue = [];
	    has = {};
	    circular = {};
	    waiting = internalQueueDepleted = false;
	  }
	
	  /**
	   * Flush both queues and run the watchers.
	   */
	
	  function flushBatcherQueue() {
	    runBatcherQueue(queue);
	    internalQueueDepleted = true;
	    runBatcherQueue(userQueue);
	    // dev tool hook
	    /* istanbul ignore if */
	    if (true) {
	      if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	      }
	    }
	    resetBatcherState();
	  }
	
	  /**
	   * Run the watchers in a single queue.
	   *
	   * @param {Array} queue
	   */
	
	  function runBatcherQueue(queue) {
	    // do not cache length because more watchers might be pushed
	    // as we run existing watchers
	    for (var i = 0; i < queue.length; i++) {
	      var watcher = queue[i];
	      var id = watcher.id;
	      has[id] = null;
	      watcher.run();
	      // in dev build, check and stop circular updates.
	      if ('development' !== 'production' && has[id] != null) {
	        circular[id] = (circular[id] || 0) + 1;
	        if (circular[id] > config._maxUpdateCount) {
	          queue.splice(has[id], 1);
	          warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	        }
	      }
	    }
	  }
	
	  /**
	   * Push a watcher into the watcher queue.
	   * Jobs with duplicate IDs will be skipped unless it's
	   * pushed when the queue is being flushed.
	   *
	   * @param {Watcher} watcher
	   *   properties:
	   *   - {Number} id
	   *   - {Function} run
	   */
	
	  function pushWatcher(watcher) {
	    var id = watcher.id;
	    if (has[id] == null) {
	      // if an internal watcher is pushed, but the internal
	      // queue is already depleted, we run it immediately.
	      if (internalQueueDepleted && !watcher.user) {
	        watcher.run();
	        return;
	      }
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	
	  var uid$2 = 0;
	
	  /**
	   * A watcher parses an expression, collects dependencies,
	   * and fires callback when the expression value changes.
	   * This is used for both the $watch() api and directives.
	   *
	   * @param {Vue} vm
	   * @param {String} expression
	   * @param {Function} cb
	   * @param {Object} options
	   *                 - {Array} filters
	   *                 - {Boolean} twoWay
	   *                 - {Boolean} deep
	   *                 - {Boolean} user
	   *                 - {Boolean} sync
	   *                 - {Boolean} lazy
	   *                 - {Function} [preProcess]
	   *                 - {Function} [postProcess]
	   * @constructor
	   */
	  function Watcher(vm, expOrFn, cb, options) {
	    // mix in options
	    if (options) {
	      extend(this, options);
	    }
	    var isFn = typeof expOrFn === 'function';
	    this.vm = vm;
	    vm._watchers.push(this);
	    this.expression = isFn ? expOrFn.toString() : expOrFn;
	    this.cb = cb;
	    this.id = ++uid$2; // uid for batching
	    this.active = true;
	    this.dirty = this.lazy; // for lazy watchers
	    this.deps = Object.create(null);
	    this.newDeps = null;
	    this.prevError = null; // for async error stacks
	    // parse expression for getter/setter
	    if (isFn) {
	      this.getter = expOrFn;
	      this.setter = undefined;
	    } else {
	      var res = parseExpression(expOrFn, this.twoWay);
	      this.getter = res.get;
	      this.setter = res.set;
	    }
	    this.value = this.lazy ? undefined : this.get();
	    // state for avoiding false triggers for deep and Array
	    // watchers during vm._digest()
	    this.queued = this.shallow = false;
	  }
	
	  /**
	   * Add a dependency to this directive.
	   *
	   * @param {Dep} dep
	   */
	
	  Watcher.prototype.addDep = function (dep) {
	    var id = dep.id;
	    if (!this.newDeps[id]) {
	      this.newDeps[id] = dep;
	      if (!this.deps[id]) {
	        this.deps[id] = dep;
	        dep.addSub(this);
	      }
	    }
	  };
	
	  /**
	   * Evaluate the getter, and re-collect dependencies.
	   */
	
	  Watcher.prototype.get = function () {
	    this.beforeGet();
	    var scope = this.scope || this.vm;
	    var value;
	    try {
	      value = this.getter.call(scope, scope);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	      }
	    }
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    if (this.preProcess) {
	      value = this.preProcess(value);
	    }
	    if (this.filters) {
	      value = scope._applyFilters(value, null, this.filters, false);
	    }
	    if (this.postProcess) {
	      value = this.postProcess(value);
	    }
	    this.afterGet();
	    return value;
	  };
	
	  /**
	   * Set the corresponding value with the setter.
	   *
	   * @param {*} value
	   */
	
	  Watcher.prototype.set = function (value) {
	    var scope = this.scope || this.vm;
	    if (this.filters) {
	      value = scope._applyFilters(value, this.value, this.filters, true);
	    }
	    try {
	      this.setter.call(scope, scope, value);
	    } catch (e) {
	      if ('development' !== 'production' && config.warnExpressionErrors) {
	        warn('Error when evaluating setter "' + this.expression + '"', e);
	      }
	    }
	    // two-way sync for v-for alias
	    var forContext = scope.$forContext;
	    if (forContext && forContext.alias === this.expression) {
	      if (forContext.filters) {
	        'development' !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	        return;
	      }
	      forContext._withLock(function () {
	        if (scope.$key) {
	          // original is an object
	          forContext.rawValue[scope.$key] = value;
	        } else {
	          forContext.rawValue.$set(scope.$index, value);
	        }
	      });
	    }
	  };
	
	  /**
	   * Prepare for dependency collection.
	   */
	
	  Watcher.prototype.beforeGet = function () {
	    Dep.target = this;
	    this.newDeps = Object.create(null);
	  };
	
	  /**
	   * Clean up for dependency collection.
	   */
	
	  Watcher.prototype.afterGet = function () {
	    Dep.target = null;
	    var ids = Object.keys(this.deps);
	    var i = ids.length;
	    while (i--) {
	      var id = ids[i];
	      if (!this.newDeps[id]) {
	        this.deps[id].removeSub(this);
	      }
	    }
	    this.deps = this.newDeps;
	  };
	
	  /**
	   * Subscriber interface.
	   * Will be called when a dependency changes.
	   *
	   * @param {Boolean} shallow
	   */
	
	  Watcher.prototype.update = function (shallow) {
	    if (this.lazy) {
	      this.dirty = true;
	    } else if (this.sync || !config.async) {
	      this.run();
	    } else {
	      // if queued, only overwrite shallow with non-shallow,
	      // but not the other way around.
	      this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	      this.queued = true;
	      // record before-push error stack in debug mode
	      /* istanbul ignore if */
	      if ('development' !== 'production' && config.debug) {
	        this.prevError = new Error('[vue] async stack trace');
	      }
	      pushWatcher(this);
	    }
	  };
	
	  /**
	   * Batcher job interface.
	   * Will be called by the batcher.
	   */
	
	  Watcher.prototype.run = function () {
	    if (this.active) {
	      var value = this.get();
	      if (value !== this.value ||
	      // Deep watchers and Array watchers should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      (isArray(value) || this.deep) && !this.shallow) {
	        // set new value
	        var oldValue = this.value;
	        this.value = value;
	        // in debug + async mode, when a watcher callbacks
	        // throws, we also throw the saved before-push error
	        // so the full cross-tick stack trace is available.
	        var prevError = this.prevError;
	        /* istanbul ignore if */
	        if ('development' !== 'production' && config.debug && prevError) {
	          this.prevError = null;
	          try {
	            this.cb.call(this.vm, value, oldValue);
	          } catch (e) {
	            nextTick(function () {
	              throw prevError;
	            }, 0);
	            throw e;
	          }
	        } else {
	          this.cb.call(this.vm, value, oldValue);
	        }
	      }
	      this.queued = this.shallow = false;
	    }
	  };
	
	  /**
	   * Evaluate the value of the watcher.
	   * This only gets called for lazy watchers.
	   */
	
	  Watcher.prototype.evaluate = function () {
	    // avoid overwriting another watcher that is being
	    // collected.
	    var current = Dep.target;
	    this.value = this.get();
	    this.dirty = false;
	    Dep.target = current;
	  };
	
	  /**
	   * Depend on all deps collected by this watcher.
	   */
	
	  Watcher.prototype.depend = function () {
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].depend();
	    }
	  };
	
	  /**
	   * Remove self from all dependencies' subcriber list.
	   */
	
	  Watcher.prototype.teardown = function () {
	    if (this.active) {
	      // remove self from vm's watcher list
	      // we can skip this if the vm if being destroyed
	      // which can improve teardown performance.
	      if (!this.vm._isBeingDestroyed) {
	        this.vm._watchers.$remove(this);
	      }
	      var depIds = Object.keys(this.deps);
	      var i = depIds.length;
	      while (i--) {
	        this.deps[depIds[i]].removeSub(this);
	      }
	      this.active = false;
	      this.vm = this.cb = this.value = null;
	    }
	  };
	
	  /**
	   * Recrusively traverse an object to evoke all converted
	   * getters, so that every nested property inside the object
	   * is collected as a "deep" dependency.
	   *
	   * @param {*} val
	   */
	
	  function traverse(val) {
	    var i, keys;
	    if (isArray(val)) {
	      i = val.length;
	      while (i--) traverse(val[i]);
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]]);
	    }
	  }
	
	  var cloak = {
	    bind: function bind() {
	      var el = this.el;
	      this.vm.$once('hook:compiled', function () {
	        el.removeAttribute('v-cloak');
	      });
	    }
	  };
	
	  var ref = {
	    bind: function bind() {
	      'development' !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	    }
	  };
	
	  var el = {
	
	    priority: 1500,
	
	    bind: function bind() {
	      /* istanbul ignore if */
	      if (!this.arg) {
	        return;
	      }
	      var id = this.id = camelize(this.arg);
	      var refs = (this._scope || this.vm).$els;
	      if (hasOwn(refs, id)) {
	        refs[id] = this.el;
	      } else {
	        defineReactive(refs, id, this.el);
	      }
	    },
	
	    unbind: function unbind() {
	      var refs = (this._scope || this.vm).$els;
	      if (refs[this.id] === this.el) {
	        refs[this.id] = null;
	      }
	    }
	  };
	
	  var prefixes = ['-webkit-', '-moz-', '-ms-'];
	  var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	  var importantRE = /!important;?$/;
	  var propCache = Object.create(null);
	
	  var testEl = null;
	
	  var style = {
	
	    deep: true,
	
	    update: function update(value) {
	      if (typeof value === 'string') {
	        this.el.style.cssText = value;
	      } else if (isArray(value)) {
	        this.handleObject(value.reduce(extend, {}));
	      } else {
	        this.handleObject(value || {});
	      }
	    },
	
	    handleObject: function handleObject(value) {
	      // cache object styles so that only changed props
	      // are actually updated.
	      var cache = this.cache || (this.cache = {});
	      var name, val;
	      for (name in cache) {
	        if (!(name in value)) {
	          this.handleSingle(name, null);
	          delete cache[name];
	        }
	      }
	      for (name in value) {
	        val = value[name];
	        if (val !== cache[name]) {
	          cache[name] = val;
	          this.handleSingle(name, val);
	        }
	      }
	    },
	
	    handleSingle: function handleSingle(prop, value) {
	      prop = normalize(prop);
	      if (!prop) return; // unsupported prop
	      // cast possible numbers/booleans into strings
	      if (value != null) value += '';
	      if (value) {
	        var isImportant = importantRE.test(value) ? 'important' : '';
	        if (isImportant) {
	          value = value.replace(importantRE, '').trim();
	        }
	        this.el.style.setProperty(prop, value, isImportant);
	      } else {
	        this.el.style.removeProperty(prop);
	      }
	    }
	
	  };
	
	  /**
	   * Normalize a CSS property name.
	   * - cache result
	   * - auto prefix
	   * - camelCase -> dash-case
	   *
	   * @param {String} prop
	   * @return {String}
	   */
	
	  function normalize(prop) {
	    if (propCache[prop]) {
	      return propCache[prop];
	    }
	    var res = prefix(prop);
	    propCache[prop] = propCache[res] = res;
	    return res;
	  }
	
	  /**
	   * Auto detect the appropriate prefix for a CSS property.
	   * https://gist.github.com/paulirish/523692
	   *
	   * @param {String} prop
	   * @return {String}
	   */
	
	  function prefix(prop) {
	    prop = hyphenate(prop);
	    var camel = camelize(prop);
	    var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	    if (!testEl) {
	      testEl = document.createElement('div');
	    }
	    if (camel in testEl.style) {
	      return prop;
	    }
	    var i = prefixes.length;
	    var prefixed;
	    while (i--) {
	      prefixed = camelPrefixes[i] + upper;
	      if (prefixed in testEl.style) {
	        return prefixes[i] + prop;
	      }
	    }
	  }
	
	  // xlink
	  var xlinkNS = 'http://www.w3.org/1999/xlink';
	  var xlinkRE = /^xlink:/;
	
	  // these input element attributes should also set their
	  // corresponding properties
	  var inputProps = {
	    value: 1,
	    checked: 1,
	    selected: 1
	  };
	
	  // these attributes should set a hidden property for
	  // binding v-model to object values
	  var modelProps = {
	    value: '_value',
	    'true-value': '_trueValue',
	    'false-value': '_falseValue'
	  };
	
	  // check for attributes that prohibit interpolations
	  var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	
	  var bind = {
	
	    priority: 850,
	
	    bind: function bind() {
	      var attr = this.arg;
	      var tag = this.el.tagName;
	      // should be deep watch on object mode
	      if (!attr) {
	        this.deep = true;
	      }
	      // handle interpolation bindings
	      if (this.descriptor.interp) {
	        // only allow binding on native attributes
	        if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	          'development' !== 'production' && warn(attr + '="' + this.descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	          this.el.removeAttribute(attr);
	          this.invalid = true;
	        }
	
	        /* istanbul ignore if */
	        if (true) {
	          var raw = attr + '="' + this.descriptor.raw + '": ';
	          // warn src
	          if (attr === 'src') {
	            warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	          }
	
	          // warn style
	          if (attr === 'style') {
	            warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	          }
	        }
	      }
	    },
	
	    update: function update(value) {
	      if (this.invalid) {
	        return;
	      }
	      var attr = this.arg;
	      if (this.arg) {
	        this.handleSingle(attr, value);
	      } else {
	        this.handleObject(value || {});
	      }
	    },
	
	    // share object handler with v-bind:class
	    handleObject: style.handleObject,
	
	    handleSingle: function handleSingle(attr, value) {
	      if (inputProps[attr] && attr in this.el) {
	        this.el[attr] = attr === 'value' ? value || '' : // IE9 will set input.value to "null" for null...
	        value;
	      }
	      // set model props
	      var modelProp = modelProps[attr];
	      if (modelProp) {
	        this.el[modelProp] = value;
	        // update v-model if present
	        var model = this.el.__v_model;
	        if (model) {
	          model.listener();
	        }
	      }
	      // do not set value attribute for textarea
	      if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	        this.el.removeAttribute(attr);
	        return;
	      }
	      // update attribute
	      if (value != null && value !== false) {
	        if (xlinkRE.test(attr)) {
	          this.el.setAttributeNS(xlinkNS, attr, value);
	        } else {
	          this.el.setAttribute(attr, value);
	        }
	      } else {
	        this.el.removeAttribute(attr);
	      }
	    }
	  };
	
	  // keyCode aliases
	  var keyCodes = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    'delete': 46,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	  };
	
	  function keyFilter(handler, keys) {
	    var codes = keys.map(function (key) {
	      var charCode = key.charCodeAt(0);
	      if (charCode > 47 && charCode < 58) {
	        return parseInt(key, 10);
	      }
	      if (key.length === 1) {
	        charCode = key.toUpperCase().charCodeAt(0);
	        if (charCode > 64 && charCode < 91) {
	          return charCode;
	        }
	      }
	      return keyCodes[key];
	    });
	    return function keyHandler(e) {
	      if (codes.indexOf(e.keyCode) > -1) {
	        return handler.call(this, e);
	      }
	    };
	  }
	
	  function stopFilter(handler) {
	    return function stopHandler(e) {
	      e.stopPropagation();
	      return handler.call(this, e);
	    };
	  }
	
	  function preventFilter(handler) {
	    return function preventHandler(e) {
	      e.preventDefault();
	      return handler.call(this, e);
	    };
	  }
	
	  var on = {
	
	    acceptStatement: true,
	    priority: 700,
	
	    bind: function bind() {
	      // deal with iframes
	      if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	        var self = this;
	        this.iframeBind = function () {
	          on$1(self.el.contentWindow, self.arg, self.handler);
	        };
	        this.on('load', this.iframeBind);
	      }
	    },
	
	    update: function update(handler) {
	      // stub a noop for v-on with no value,
	      // e.g. @mousedown.prevent
	      if (!this.descriptor.raw) {
	        handler = function () {};
	      }
	
	      if (typeof handler !== 'function') {
	        'development' !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	        return;
	      }
	
	      // apply modifiers
	      if (this.modifiers.stop) {
	        handler = stopFilter(handler);
	      }
	      if (this.modifiers.prevent) {
	        handler = preventFilter(handler);
	      }
	      // key filter
	      var keys = Object.keys(this.modifiers).filter(function (key) {
	        return key !== 'stop' && key !== 'prevent';
	      });
	      if (keys.length) {
	        handler = keyFilter(handler, keys);
	      }
	
	      this.reset();
	      this.handler = handler;
	
	      if (this.iframeBind) {
	        this.iframeBind();
	      } else {
	        on$1(this.el, this.arg, this.handler);
	      }
	    },
	
	    reset: function reset() {
	      var el = this.iframeBind ? this.el.contentWindow : this.el;
	      if (this.handler) {
	        off(el, this.arg, this.handler);
	      }
	    },
	
	    unbind: function unbind() {
	      this.reset();
	    }
	  };
	
	  var checkbox = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      this.getValue = function () {
	        return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	      };
	
	      function getBooleanValue() {
	        var val = el.checked;
	        if (val && el.hasOwnProperty('_trueValue')) {
	          return el._trueValue;
	        }
	        if (!val && el.hasOwnProperty('_falseValue')) {
	          return el._falseValue;
	        }
	        return val;
	      }
	
	      this.listener = function () {
	        var model = self._watcher.value;
	        if (isArray(model)) {
	          var val = self.getValue();
	          if (el.checked) {
	            if (indexOf(model, val) < 0) {
	              model.push(val);
	            }
	          } else {
	            model.$remove(val);
	          }
	        } else {
	          self.set(getBooleanValue());
	        }
	      };
	
	      this.on('change', this.listener);
	      if (el.checked) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      var el = this.el;
	      if (isArray(value)) {
	        el.checked = indexOf(value, this.getValue()) > -1;
	      } else {
	        if (el.hasOwnProperty('_trueValue')) {
	          el.checked = looseEqual(value, el._trueValue);
	        } else {
	          el.checked = !!value;
	        }
	      }
	    }
	  };
	
	  var select = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      // method to force update DOM using latest value.
	      this.forceUpdate = function () {
	        if (self._watcher) {
	          self.update(self._watcher.get());
	        }
	      };
	
	      // check if this is a multiple select
	      var multiple = this.multiple = el.hasAttribute('multiple');
	
	      // attach listener
	      this.listener = function () {
	        var value = getValue(el, multiple);
	        value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	        self.set(value);
	      };
	      this.on('change', this.listener);
	
	      // if has initial value, set afterBind
	      var initValue = getValue(el, multiple, true);
	      if (multiple && initValue.length || !multiple && initValue !== null) {
	        this.afterBind = this.listener;
	      }
	
	      // All major browsers except Firefox resets
	      // selectedIndex with value -1 to 0 when the element
	      // is appended to a new parent, therefore we have to
	      // force a DOM update whenever that happens...
	      this.vm.$on('hook:attached', this.forceUpdate);
	    },
	
	    update: function update(value) {
	      var el = this.el;
	      el.selectedIndex = -1;
	      var multi = this.multiple && isArray(value);
	      var options = el.options;
	      var i = options.length;
	      var op, val;
	      while (i--) {
	        op = options[i];
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        /* eslint-disable eqeqeq */
	        op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	        /* eslint-enable eqeqeq */
	      }
	    },
	
	    unbind: function unbind() {
	      /* istanbul ignore next */
	      this.vm.$off('hook:attached', this.forceUpdate);
	    }
	  };
	
	  /**
	   * Get select value
	   *
	   * @param {SelectElement} el
	   * @param {Boolean} multi
	   * @param {Boolean} init
	   * @return {Array|*}
	   */
	
	  function getValue(el, multi, init) {
	    var res = multi ? [] : null;
	    var op, val, selected;
	    for (var i = 0, l = el.options.length; i < l; i++) {
	      op = el.options[i];
	      selected = init ? op.hasAttribute('selected') : op.selected;
	      if (selected) {
	        val = op.hasOwnProperty('_value') ? op._value : op.value;
	        if (multi) {
	          res.push(val);
	        } else {
	          return val;
	        }
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Native Array.indexOf uses strict equal, but in this
	   * case we need to match string/numbers with custom equal.
	   *
	   * @param {Array} arr
	   * @param {*} val
	   */
	
	  function indexOf$1(arr, val) {
	    var i = arr.length;
	    while (i--) {
	      if (looseEqual(arr[i], val)) {
	        return i;
	      }
	    }
	    return -1;
	  }
	
	  var radio = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	
	      this.getValue = function () {
	        // value overwrite via v-bind:value
	        if (el.hasOwnProperty('_value')) {
	          return el._value;
	        }
	        var val = el.value;
	        if (self.params.number) {
	          val = toNumber(val);
	        }
	        return val;
	      };
	
	      this.listener = function () {
	        self.set(self.getValue());
	      };
	      this.on('change', this.listener);
	
	      if (el.checked) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      this.el.checked = looseEqual(value, this.getValue());
	    }
	  };
	
	  var text$2 = {
	
	    bind: function bind() {
	      var self = this;
	      var el = this.el;
	      var isRange = el.type === 'range';
	      var lazy = this.params.lazy;
	      var number = this.params.number;
	      var debounce = this.params.debounce;
	
	      // handle composition events.
	      //   http://blog.evanyou.me/2014/01/03/composition-event/
	      // skip this for Android because it handles composition
	      // events quite differently. Android doesn't trigger
	      // composition events for language input methods e.g.
	      // Chinese, but instead triggers them for spelling
	      // suggestions... (see Discussion/#162)
	      var composing = false;
	      if (!isAndroid && !isRange) {
	        this.on('compositionstart', function () {
	          composing = true;
	        });
	        this.on('compositionend', function () {
	          composing = false;
	          // in IE11 the "compositionend" event fires AFTER
	          // the "input" event, so the input handler is blocked
	          // at the end... have to call it here.
	          //
	          // #1327: in lazy mode this is unecessary.
	          if (!lazy) {
	            self.listener();
	          }
	        });
	      }
	
	      // prevent messing with the input when user is typing,
	      // and force update on blur.
	      this.focused = false;
	      if (!isRange) {
	        this.on('focus', function () {
	          self.focused = true;
	        });
	        this.on('blur', function () {
	          self.focused = false;
	          self.listener();
	        });
	      }
	
	      // Now attach the main listener
	      this.listener = function () {
	        if (composing) return;
	        var val = number || isRange ? toNumber(el.value) : el.value;
	        self.set(val);
	        // force update on next tick to avoid lock & same value
	        // also only update when user is not typing
	        nextTick(function () {
	          if (self._bound && !self.focused) {
	            self.update(self._watcher.value);
	          }
	        });
	      };
	
	      // apply debounce
	      if (debounce) {
	        this.listener = _debounce(this.listener, debounce);
	      }
	
	      // Support jQuery events, since jQuery.trigger() doesn't
	      // trigger native events in some cases and some plugins
	      // rely on $.trigger()
	      //
	      // We want to make sure if a listener is attached using
	      // jQuery, it is also removed with jQuery, that's why
	      // we do the check for each directive instance and
	      // store that check result on itself. This also allows
	      // easier test coverage control by unsetting the global
	      // jQuery variable in tests.
	      this.hasjQuery = typeof jQuery === 'function';
	      if (this.hasjQuery) {
	        jQuery(el).on('change', this.listener);
	        if (!lazy) {
	          jQuery(el).on('input', this.listener);
	        }
	      } else {
	        this.on('change', this.listener);
	        if (!lazy) {
	          this.on('input', this.listener);
	        }
	      }
	
	      // IE9 doesn't fire input event on backspace/del/cut
	      if (!lazy && isIE9) {
	        this.on('cut', function () {
	          nextTick(self.listener);
	        });
	        this.on('keyup', function (e) {
	          if (e.keyCode === 46 || e.keyCode === 8) {
	            self.listener();
	          }
	        });
	      }
	
	      // set initial value if present
	      if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	        this.afterBind = this.listener;
	      }
	    },
	
	    update: function update(value) {
	      this.el.value = _toString(value);
	    },
	
	    unbind: function unbind() {
	      var el = this.el;
	      if (this.hasjQuery) {
	        jQuery(el).off('change', this.listener);
	        jQuery(el).off('input', this.listener);
	      }
	    }
	  };
	
	  var handlers = {
	    text: text$2,
	    radio: radio,
	    select: select,
	    checkbox: checkbox
	  };
	
	  var model = {
	
	    priority: 800,
	    twoWay: true,
	    handlers: handlers,
	    params: ['lazy', 'number', 'debounce'],
	
	    /**
	     * Possible elements:
	     *   <select>
	     *   <textarea>
	     *   <input type="*">
	     *     - text
	     *     - checkbox
	     *     - radio
	     *     - number
	     */
	
	    bind: function bind() {
	      // friendly warning...
	      this.checkFilters();
	      if (this.hasRead && !this.hasWrite) {
	        'development' !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	      }
	      var el = this.el;
	      var tag = el.tagName;
	      var handler;
	      if (tag === 'INPUT') {
	        handler = handlers[el.type] || handlers.text;
	      } else if (tag === 'SELECT') {
	        handler = handlers.select;
	      } else if (tag === 'TEXTAREA') {
	        handler = handlers.text;
	      } else {
	        'development' !== 'production' && warn('v-model does not support element type: ' + tag);
	        return;
	      }
	      el.__v_model = this;
	      handler.bind.call(this);
	      this.update = handler.update;
	      this._unbind = handler.unbind;
	    },
	
	    /**
	     * Check read/write filter stats.
	     */
	
	    checkFilters: function checkFilters() {
	      var filters = this.filters;
	      if (!filters) return;
	      var i = filters.length;
	      while (i--) {
	        var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	        if (typeof filter === 'function' || filter.read) {
	          this.hasRead = true;
	        }
	        if (filter.write) {
	          this.hasWrite = true;
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.__v_model = null;
	      this._unbind && this._unbind();
	    }
	  };
	
	  var show = {
	
	    bind: function bind() {
	      // check else block
	      var next = this.el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        this.elseEl = next;
	      }
	    },
	
	    update: function update(value) {
	      this.apply(this.el, value);
	      if (this.elseEl) {
	        this.apply(this.elseEl, !value);
	      }
	    },
	
	    apply: function apply(el, value) {
	      applyTransition(el, value ? 1 : -1, function () {
	        el.style.display = value ? '' : 'none';
	      }, this.vm);
	    }
	  };
	
	  var templateCache = new Cache(1000);
	  var idSelectorCache = new Cache(1000);
	
	  var map = {
	    efault: [0, '', ''],
	    legend: [1, '<fieldset>', '</fieldset>'],
	    tr: [2, '<table><tbody>', '</tbody></table>'],
	    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	  };
	
	  map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	  map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	  map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	  map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	  /**
	   * Check if a node is a supported template node with a
	   * DocumentFragment content.
	   *
	   * @param {Node} node
	   * @return {Boolean}
	   */
	
	  function isRealTemplate(node) {
	    return isTemplate(node) && node.content instanceof DocumentFragment;
	  }
	
	  var tagRE$1 = /<([\w:]+)/;
	  var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/;
	
	  /**
	   * Convert a string template to a DocumentFragment.
	   * Determines correct wrapping by tag types. Wrapping
	   * strategy found in jQuery & component/domify.
	   *
	   * @param {String} templateString
	   * @param {Boolean} raw
	   * @return {DocumentFragment}
	   */
	
	  function stringToFragment(templateString, raw) {
	    // try a cache hit first
	    var hit = templateCache.get(templateString);
	    if (hit) {
	      return hit;
	    }
	
	    var frag = document.createDocumentFragment();
	    var tagMatch = templateString.match(tagRE$1);
	    var entityMatch = entityRE.test(templateString);
	
	    if (!tagMatch && !entityMatch) {
	      // text only, return a single text node.
	      frag.appendChild(document.createTextNode(templateString));
	    } else {
	
	      var tag = tagMatch && tagMatch[1];
	      var wrap = map[tag] || map.efault;
	      var depth = wrap[0];
	      var prefix = wrap[1];
	      var suffix = wrap[2];
	      var node = document.createElement('div');
	
	      if (!raw) {
	        templateString = templateString.trim();
	      }
	      node.innerHTML = prefix + templateString + suffix;
	      while (depth--) {
	        node = node.lastChild;
	      }
	
	      var child;
	      /* eslint-disable no-cond-assign */
	      while (child = node.firstChild) {
	        /* eslint-enable no-cond-assign */
	        frag.appendChild(child);
	      }
	    }
	
	    templateCache.put(templateString, frag);
	    return frag;
	  }
	
	  /**
	   * Convert a template node to a DocumentFragment.
	   *
	   * @param {Node} node
	   * @return {DocumentFragment}
	   */
	
	  function nodeToFragment(node) {
	    // if its a template tag and the browser supports it,
	    // its content is already a document fragment.
	    if (isRealTemplate(node)) {
	      trimNode(node.content);
	      return node.content;
	    }
	    // script template
	    if (node.tagName === 'SCRIPT') {
	      return stringToFragment(node.textContent);
	    }
	    // normal node, clone it to avoid mutating the original
	    var clonedNode = cloneNode(node);
	    var frag = document.createDocumentFragment();
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = clonedNode.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	    trimNode(frag);
	    return frag;
	  }
	
	  // Test for the presence of the Safari template cloning bug
	  // https://bugs.webkit.org/showug.cgi?id=137755
	  var hasBrokenTemplate = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var a = document.createElement('div');
	      a.innerHTML = '<template>1</template>';
	      return !a.cloneNode(true).firstChild.innerHTML;
	    } else {
	      return false;
	    }
	  })();
	
	  // Test for IE10/11 textarea placeholder clone bug
	  var hasTextareaCloneBug = (function () {
	    /* istanbul ignore else */
	    if (inBrowser) {
	      var t = document.createElement('textarea');
	      t.placeholder = 't';
	      return t.cloneNode(true).value === 't';
	    } else {
	      return false;
	    }
	  })();
	
	  /**
	   * 1. Deal with Safari cloning nested <template> bug by
	   *    manually cloning all template instances.
	   * 2. Deal with IE10/11 textarea placeholder bug by setting
	   *    the correct value after cloning.
	   *
	   * @param {Element|DocumentFragment} node
	   * @return {Element|DocumentFragment}
	   */
	
	  function cloneNode(node) {
	    if (!node.querySelectorAll) {
	      return node.cloneNode();
	    }
	    var res = node.cloneNode(true);
	    var i, original, cloned;
	    /* istanbul ignore if */
	    if (hasBrokenTemplate) {
	      var tempClone = res;
	      if (isRealTemplate(node)) {
	        node = node.content;
	        tempClone = res.content;
	      }
	      original = node.querySelectorAll('template');
	      if (original.length) {
	        cloned = tempClone.querySelectorAll('template');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	        }
	      }
	    }
	    /* istanbul ignore if */
	    if (hasTextareaCloneBug) {
	      if (node.tagName === 'TEXTAREA') {
	        res.value = node.value;
	      } else {
	        original = node.querySelectorAll('textarea');
	        if (original.length) {
	          cloned = res.querySelectorAll('textarea');
	          i = cloned.length;
	          while (i--) {
	            cloned[i].value = original[i].value;
	          }
	        }
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Process the template option and normalizes it into a
	   * a DocumentFragment that can be used as a partial or a
	   * instance template.
	   *
	   * @param {*} template
	   *        Possible values include:
	   *        - DocumentFragment object
	   *        - Node object of type Template
	   *        - id selector: '#some-template-id'
	   *        - template string: '<div><span>{{msg}}</span></div>'
	   * @param {Boolean} shouldClone
	   * @param {Boolean} raw
	   *        inline HTML interpolation. Do not check for id
	   *        selector and keep whitespace in the string.
	   * @return {DocumentFragment|undefined}
	   */
	
	  function parseTemplate(template, shouldClone, raw) {
	    var node, frag;
	
	    // if the template is already a document fragment,
	    // do nothing
	    if (template instanceof DocumentFragment) {
	      trimNode(template);
	      return shouldClone ? cloneNode(template) : template;
	    }
	
	    if (typeof template === 'string') {
	      // id selector
	      if (!raw && template.charAt(0) === '#') {
	        // id selector can be cached too
	        frag = idSelectorCache.get(template);
	        if (!frag) {
	          node = document.getElementById(template.slice(1));
	          if (node) {
	            frag = nodeToFragment(node);
	            // save selector to cache
	            idSelectorCache.put(template, frag);
	          }
	        }
	      } else {
	        // normal string template
	        frag = stringToFragment(template, raw);
	      }
	    } else if (template.nodeType) {
	      // a direct node
	      frag = nodeToFragment(template);
	    }
	
	    return frag && shouldClone ? cloneNode(frag) : frag;
	  }
	
	  var template = Object.freeze({
	    cloneNode: cloneNode,
	    parseTemplate: parseTemplate
	  });
	
	  /**
	   * Abstraction for a partially-compiled fragment.
	   * Can optionally compile content with a child scope.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   * @param {DocumentFragment} frag
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   */
	  function Fragment(linker, vm, frag, host, scope, parentFrag) {
	    this.children = [];
	    this.childFrags = [];
	    this.vm = vm;
	    this.scope = scope;
	    this.inserted = false;
	    this.parentFrag = parentFrag;
	    if (parentFrag) {
	      parentFrag.childFrags.push(this);
	    }
	    this.unlink = linker(vm, frag, host, scope, this);
	    var single = this.single = frag.childNodes.length === 1 &&
	    // do not go single mode if the only node is an anchor
	    !frag.childNodes[0].__vue_anchor;
	    if (single) {
	      this.node = frag.childNodes[0];
	      this.before = singleBefore;
	      this.remove = singleRemove;
	    } else {
	      this.node = createAnchor('fragment-start');
	      this.end = createAnchor('fragment-end');
	      this.frag = frag;
	      prepend(this.node, frag);
	      frag.appendChild(this.end);
	      this.before = multiBefore;
	      this.remove = multiRemove;
	    }
	    this.node.__vfrag__ = this;
	  }
	
	  /**
	   * Call attach/detach for all components contained within
	   * this fragment. Also do so recursively for all child
	   * fragments.
	   *
	   * @param {Function} hook
	   */
	
	  Fragment.prototype.callHook = function (hook) {
	    var i, l;
	    for (i = 0, l = this.children.length; i < l; i++) {
	      hook(this.children[i]);
	    }
	    for (i = 0, l = this.childFrags.length; i < l; i++) {
	      this.childFrags[i].callHook(hook);
	    }
	  };
	
	  /**
	   * Destroy the fragment.
	   */
	
	  Fragment.prototype.destroy = function () {
	    if (this.parentFrag) {
	      this.parentFrag.childFrags.$remove(this);
	    }
	    this.unlink();
	  };
	
	  /**
	   * Insert fragment before target, single node version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */
	
	  function singleBefore(target, withTransition) {
	    this.inserted = true;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    method(this.node, target, this.vm);
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }
	
	  /**
	   * Remove fragment, single node version
	   */
	
	  function singleRemove() {
	    this.inserted = false;
	    var shouldCallRemove = inDoc(this.node);
	    var self = this;
	    self.callHook(destroyChild);
	    removeWithTransition(this.node, this.vm, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }
	
	  /**
	   * Insert fragment before target, multi-nodes version
	   *
	   * @param {Node} target
	   * @param {Boolean} withTransition
	   */
	
	  function multiBefore(target, withTransition) {
	    this.inserted = true;
	    var vm = this.vm;
	    var method = withTransition !== false ? beforeWithTransition : before;
	    mapNodeRange(this.node, this.end, function (node) {
	      method(node, target, vm);
	    });
	    if (inDoc(this.node)) {
	      this.callHook(attach);
	    }
	  }
	
	  /**
	   * Remove fragment, multi-nodes version
	   */
	
	  function multiRemove() {
	    this.inserted = false;
	    var self = this;
	    var shouldCallRemove = inDoc(this.node);
	    self.callHook(destroyChild);
	    removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	      if (shouldCallRemove) {
	        self.callHook(detach);
	      }
	      self.destroy();
	    });
	  }
	
	  /**
	   * Call attach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */
	
	  function attach(child) {
	    if (!child._isAttached) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Call destroy for all contained instances,
	   * with remove:false and defer:true.
	   * Defer is necessary because we need to
	   * keep the children to call detach hooks
	   * on them.
	   *
	   * @param {Vue} child
	   */
	
	  function destroyChild(child) {
	    child.$destroy(false, true);
	  }
	
	  /**
	   * Call detach hook for a Vue instance.
	   *
	   * @param {Vue} child
	   */
	
	  function detach(child) {
	    if (child._isAttached) {
	      child._callHook('detached');
	    }
	  }
	
	  var linkerCache = new Cache(5000);
	
	  /**
	   * A factory that can be used to create instances of a
	   * fragment. Caches the compiled linker if possible.
	   *
	   * @param {Vue} vm
	   * @param {Element|String} el
	   */
	  function FragmentFactory(vm, el) {
	    this.vm = vm;
	    var template;
	    var isString = typeof el === 'string';
	    if (isString || isTemplate(el)) {
	      template = parseTemplate(el, true);
	    } else {
	      template = document.createDocumentFragment();
	      template.appendChild(el);
	    }
	    this.template = template;
	    // linker can be cached, but only for components
	    var linker;
	    var cid = vm.constructor.cid;
	    if (cid > 0) {
	      var cacheId = cid + (isString ? el : el.outerHTML);
	      linker = linkerCache.get(cacheId);
	      if (!linker) {
	        linker = compile(template, vm.$options, true);
	        linkerCache.put(cacheId, linker);
	      }
	    } else {
	      linker = compile(template, vm.$options, true);
	    }
	    this.linker = linker;
	  }
	
	  /**
	   * Create a fragment instance with given host and scope.
	   *
	   * @param {Vue} host
	   * @param {Object} scope
	   * @param {Fragment} parentFrag
	   */
	
	  FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	    var frag = cloneNode(this.template);
	    return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	  };
	
	  var vIf = {
	
	    priority: 2000,
	
	    bind: function bind() {
	      var el = this.el;
	      if (!el.__vue__) {
	        // check else block
	        var next = el.nextElementSibling;
	        if (next && getAttr(next, 'v-else') !== null) {
	          remove(next);
	          this.elseFactory = new FragmentFactory(this.vm, next);
	        }
	        // check main block
	        this.anchor = createAnchor('v-if');
	        replace(el, this.anchor);
	        this.factory = new FragmentFactory(this.vm, el);
	      } else {
	        'development' !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	        this.invalid = true;
	      }
	    },
	
	    update: function update(value) {
	      if (this.invalid) return;
	      if (value) {
	        if (!this.frag) {
	          this.insert();
	        }
	      } else {
	        this.remove();
	      }
	    },
	
	    insert: function insert() {
	      if (this.elseFrag) {
	        this.elseFrag.remove();
	        this.elseFrag = null;
	      }
	      this.frag = this.factory.create(this._host, this._scope, this._frag);
	      this.frag.before(this.anchor);
	    },
	
	    remove: function remove() {
	      if (this.frag) {
	        this.frag.remove();
	        this.frag = null;
	      }
	      if (this.elseFactory && !this.elseFrag) {
	        this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	        this.elseFrag.before(this.anchor);
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	    }
	  };
	
	  var uid$1 = 0;
	
	  var vFor = {
	
	    priority: 2000,
	
	    params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	    bind: function bind() {
	      // support "item in items" syntax
	      var inMatch = this.expression.match(/(.*) in (.*)/);
	      if (inMatch) {
	        var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	        if (itMatch) {
	          this.iterator = itMatch[1].trim();
	          this.alias = itMatch[2].trim();
	        } else {
	          this.alias = inMatch[1].trim();
	        }
	        this.expression = inMatch[2];
	      }
	
	      if (!this.alias) {
	        'development' !== 'production' && warn('Alias is required in v-for.');
	        return;
	      }
	
	      // uid as a cache identifier
	      this.id = '__v-for__' + ++uid$1;
	
	      // check if this is an option list,
	      // so that we know if we need to update the <select>'s
	      // v-model when the option list has changed.
	      // because v-model has a lower priority than v-for,
	      // the v-model is not bound here yet, so we have to
	      // retrive it in the actual updateModel() function.
	      var tag = this.el.tagName;
	      this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	      // setup anchor nodes
	      this.start = createAnchor('v-for-start');
	      this.end = createAnchor('v-for-end');
	      replace(this.el, this.end);
	      before(this.start, this.end);
	
	      // cache
	      this.cache = Object.create(null);
	
	      // fragment factory
	      this.factory = new FragmentFactory(this.vm, this.el);
	    },
	
	    update: function update(data) {
	      this.diff(data);
	      this.updateRef();
	      this.updateModel();
	    },
	
	    /**
	     * Diff, based on new data and old data, determine the
	     * minimum amount of DOM manipulations needed to make the
	     * DOM reflect the new data Array.
	     *
	     * The algorithm diffs the new data Array by storing a
	     * hidden reference to an owner vm instance on previously
	     * seen data. This allows us to achieve O(n) which is
	     * better than a levenshtein distance based algorithm,
	     * which is O(m * n).
	     *
	     * @param {Array} data
	     */
	
	    diff: function diff(data) {
	      // check if the Array was converted from an Object
	      var item = data[0];
	      var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	      var trackByKey = this.params.trackBy;
	      var oldFrags = this.frags;
	      var frags = this.frags = new Array(data.length);
	      var alias = this.alias;
	      var iterator = this.iterator;
	      var start = this.start;
	      var end = this.end;
	      var inDocument = inDoc(start);
	      var init = !oldFrags;
	      var i, l, frag, key, value, primitive;
	
	      // First pass, go through the new Array and fill up
	      // the new frags array. If a piece of data has a cached
	      // instance for it, we reuse it. Otherwise build a new
	      // instance.
	      for (i = 0, l = data.length; i < l; i++) {
	        item = data[i];
	        key = convertedFromObject ? item.$key : null;
	        value = convertedFromObject ? item.$value : item;
	        primitive = !isObject(value);
	        frag = !init && this.getCachedFrag(value, i, key);
	        if (frag) {
	          // reusable fragment
	          frag.reused = true;
	          // update $index
	          frag.scope.$index = i;
	          // update $key
	          if (key) {
	            frag.scope.$key = key;
	          }
	          // update iterator
	          if (iterator) {
	            frag.scope[iterator] = key !== null ? key : i;
	          }
	          // update data for track-by, object repeat &
	          // primitive values.
	          if (trackByKey || convertedFromObject || primitive) {
	            frag.scope[alias] = value;
	          }
	        } else {
	          // new isntance
	          frag = this.create(value, alias, i, key);
	          frag.fresh = !init;
	        }
	        frags[i] = frag;
	        if (init) {
	          frag.before(end);
	        }
	      }
	
	      // we're done for the initial render.
	      if (init) {
	        return;
	      }
	
	      // Second pass, go through the old fragments and
	      // destroy those who are not reused (and remove them
	      // from cache)
	      var removalIndex = 0;
	      var totalRemoved = oldFrags.length - frags.length;
	      for (i = 0, l = oldFrags.length; i < l; i++) {
	        frag = oldFrags[i];
	        if (!frag.reused) {
	          this.deleteCachedFrag(frag);
	          this.remove(frag, removalIndex++, totalRemoved, inDocument);
	        }
	      }
	
	      // Final pass, move/insert new fragments into the
	      // right place.
	      var targetPrev, prevEl, currentPrev;
	      var insertionIndex = 0;
	      for (i = 0, l = frags.length; i < l; i++) {
	        frag = frags[i];
	        // this is the frag that we should be after
	        targetPrev = frags[i - 1];
	        prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	        if (frag.reused && !frag.staggerCb) {
	          currentPrev = findPrevFrag(frag, start, this.id);
	          if (currentPrev !== targetPrev && (!currentPrev ||
	          // optimization for moving a single item.
	          // thanks to suggestions by @livoras in #1807
	          findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	            this.move(frag, prevEl);
	          }
	        } else {
	          // new instance, or still in stagger.
	          // insert with updated stagger index.
	          this.insert(frag, insertionIndex++, prevEl, inDocument);
	        }
	        frag.reused = frag.fresh = false;
	      }
	    },
	
	    /**
	     * Create a new fragment instance.
	     *
	     * @param {*} value
	     * @param {String} alias
	     * @param {Number} index
	     * @param {String} [key]
	     * @return {Fragment}
	     */
	
	    create: function create(value, alias, index, key) {
	      var host = this._host;
	      // create iteration scope
	      var parentScope = this._scope || this.vm;
	      var scope = Object.create(parentScope);
	      // ref holder for the scope
	      scope.$refs = Object.create(parentScope.$refs);
	      scope.$els = Object.create(parentScope.$els);
	      // make sure point $parent to parent scope
	      scope.$parent = parentScope;
	      // for two-way binding on alias
	      scope.$forContext = this;
	      // define scope properties
	      defineReactive(scope, alias, value);
	      defineReactive(scope, '$index', index);
	      if (key) {
	        defineReactive(scope, '$key', key);
	      } else if (scope.$key) {
	        // avoid accidental fallback
	        def(scope, '$key', null);
	      }
	      if (this.iterator) {
	        defineReactive(scope, this.iterator, key !== null ? key : index);
	      }
	      var frag = this.factory.create(host, scope, this._frag);
	      frag.forId = this.id;
	      this.cacheFrag(value, frag, index, key);
	      return frag;
	    },
	
	    /**
	     * Update the v-ref on owner vm.
	     */
	
	    updateRef: function updateRef() {
	      var ref = this.descriptor.ref;
	      if (!ref) return;
	      var hash = (this._scope || this.vm).$refs;
	      var refs;
	      if (!this.fromObject) {
	        refs = this.frags.map(findVmFromFrag);
	      } else {
	        refs = {};
	        this.frags.forEach(function (frag) {
	          refs[frag.scope.$key] = findVmFromFrag(frag);
	        });
	      }
	      hash[ref] = refs;
	    },
	
	    /**
	     * For option lists, update the containing v-model on
	     * parent <select>.
	     */
	
	    updateModel: function updateModel() {
	      if (this.isOption) {
	        var parent = this.start.parentNode;
	        var model = parent && parent.__v_model;
	        if (model) {
	          model.forceUpdate();
	        }
	      }
	    },
	
	    /**
	     * Insert a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Node} prevEl
	     * @param {Boolean} inDocument
	     */
	
	    insert: function insert(frag, index, prevEl, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	      }
	      var staggerAmount = this.getStagger(frag, index, null, 'enter');
	      if (inDocument && staggerAmount) {
	        // create an anchor and insert it synchronously,
	        // so that we can resolve the correct order without
	        // worrying about some elements not inserted yet
	        var anchor = frag.staggerAnchor;
	        if (!anchor) {
	          anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	          anchor.__vfrag__ = frag;
	        }
	        after(anchor, prevEl);
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.before(anchor);
	          remove(anchor);
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        frag.before(prevEl.nextSibling);
	      }
	    },
	
	    /**
	     * Remove a fragment. Handles staggering.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {Boolean} inDocument
	     */
	
	    remove: function remove(frag, index, total, inDocument) {
	      if (frag.staggerCb) {
	        frag.staggerCb.cancel();
	        frag.staggerCb = null;
	        // it's not possible for the same frag to be removed
	        // twice, so if we have a pending stagger callback,
	        // it means this frag is queued for enter but removed
	        // before its transition started. Since it is already
	        // destroyed, we can just leave it in detached state.
	        return;
	      }
	      var staggerAmount = this.getStagger(frag, index, total, 'leave');
	      if (inDocument && staggerAmount) {
	        var op = frag.staggerCb = cancellable(function () {
	          frag.staggerCb = null;
	          frag.remove();
	        });
	        setTimeout(op, staggerAmount);
	      } else {
	        frag.remove();
	      }
	    },
	
	    /**
	     * Move a fragment to a new position.
	     * Force no transition.
	     *
	     * @param {Fragment} frag
	     * @param {Node} prevEl
	     */
	
	    move: function move(frag, prevEl) {
	      frag.before(prevEl.nextSibling, false);
	    },
	
	    /**
	     * Cache a fragment using track-by or the object key.
	     *
	     * @param {*} value
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {String} [key]
	     */
	
	    cacheFrag: function cacheFrag(value, frag, index, key) {
	      var trackByKey = this.params.trackBy;
	      var cache = this.cache;
	      var primitive = !isObject(value);
	      var id;
	      if (key || trackByKey || primitive) {
	        id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	        if (!cache[id]) {
	          cache[id] = frag;
	        } else if (trackByKey !== '$index') {
	          'development' !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        id = this.id;
	        if (hasOwn(value, id)) {
	          if (value[id] === null) {
	            value[id] = frag;
	          } else {
	            'development' !== 'production' && this.warnDuplicate(value);
	          }
	        } else {
	          def(value, id, frag);
	        }
	      }
	      frag.raw = value;
	    },
	
	    /**
	     * Get a cached fragment from the value/index/key
	     *
	     * @param {*} value
	     * @param {Number} index
	     * @param {String} key
	     * @return {Fragment}
	     */
	
	    getCachedFrag: function getCachedFrag(value, index, key) {
	      var trackByKey = this.params.trackBy;
	      var primitive = !isObject(value);
	      var frag;
	      if (key || trackByKey || primitive) {
	        var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	        frag = this.cache[id];
	      } else {
	        frag = value[this.id];
	      }
	      if (frag && (frag.reused || frag.fresh)) {
	        'development' !== 'production' && this.warnDuplicate(value);
	      }
	      return frag;
	    },
	
	    /**
	     * Delete a fragment from cache.
	     *
	     * @param {Fragment} frag
	     */
	
	    deleteCachedFrag: function deleteCachedFrag(frag) {
	      var value = frag.raw;
	      var trackByKey = this.params.trackBy;
	      var scope = frag.scope;
	      var index = scope.$index;
	      // fix #948: avoid accidentally fall through to
	      // a parent repeater which happens to have $key.
	      var key = hasOwn(scope, '$key') && scope.$key;
	      var primitive = !isObject(value);
	      if (trackByKey || key || primitive) {
	        var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	        this.cache[id] = null;
	      } else {
	        value[this.id] = null;
	        frag.raw = null;
	      }
	    },
	
	    /**
	     * Get the stagger amount for an insertion/removal.
	     *
	     * @param {Fragment} frag
	     * @param {Number} index
	     * @param {Number} total
	     * @param {String} type
	     */
	
	    getStagger: function getStagger(frag, index, total, type) {
	      type = type + 'Stagger';
	      var trans = frag.node.__v_trans;
	      var hooks = trans && trans.hooks;
	      var hook = hooks && (hooks[type] || hooks.stagger);
	      return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	    },
	
	    /**
	     * Pre-process the value before piping it through the
	     * filters. This is passed to and called by the watcher.
	     */
	
	    _preProcess: function _preProcess(value) {
	      // regardless of type, store the un-filtered raw value.
	      this.rawValue = value;
	      return value;
	    },
	
	    /**
	     * Post-process the value after it has been piped through
	     * the filters. This is passed to and called by the watcher.
	     *
	     * It is necessary for this to be called during the
	     * wathcer's dependency collection phase because we want
	     * the v-for to update when the source Object is mutated.
	     */
	
	    _postProcess: function _postProcess(value) {
	      if (isArray(value)) {
	        return value;
	      } else if (isPlainObject(value)) {
	        // convert plain object to array.
	        var keys = Object.keys(value);
	        var i = keys.length;
	        var res = new Array(i);
	        var key;
	        while (i--) {
	          key = keys[i];
	          res[i] = {
	            $key: key,
	            $value: value[key]
	          };
	        }
	        return res;
	      } else {
	        if (typeof value === 'number') {
	          value = range(value);
	        }
	        return value || [];
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.descriptor.ref) {
	        (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	      }
	      if (this.frags) {
	        var i = this.frags.length;
	        var frag;
	        while (i--) {
	          frag = this.frags[i];
	          this.deleteCachedFrag(frag);
	          frag.destroy();
	        }
	      }
	    }
	  };
	
	  /**
	   * Helper to find the previous element that is a fragment
	   * anchor. This is necessary because a destroyed frag's
	   * element could still be lingering in the DOM before its
	   * leaving transition finishes, but its inserted flag
	   * should have been set to false so we can skip them.
	   *
	   * If this is a block repeat, we want to make sure we only
	   * return frag that is bound to this v-for. (see #929)
	   *
	   * @param {Fragment} frag
	   * @param {Comment|Text} anchor
	   * @param {String} id
	   * @return {Fragment}
	   */
	
	  function findPrevFrag(frag, anchor, id) {
	    var el = frag.node.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	    while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	      el = el.previousSibling;
	      /* istanbul ignore if */
	      if (!el) return;
	      frag = el.__vfrag__;
	    }
	    return frag;
	  }
	
	  /**
	   * Find a vm from a fragment.
	   *
	   * @param {Fragment} frag
	   * @return {Vue|undefined}
	   */
	
	  function findVmFromFrag(frag) {
	    var node = frag.node;
	    // handle multi-node frag
	    if (frag.end) {
	      while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	        node = node.nextSibling;
	      }
	    }
	    return node.__vue__;
	  }
	
	  /**
	   * Create a range array from given number.
	   *
	   * @param {Number} n
	   * @return {Array}
	   */
	
	  function range(n) {
	    var i = -1;
	    var ret = new Array(n);
	    while (++i < n) {
	      ret[i] = i;
	    }
	    return ret;
	  }
	
	  if (true) {
	    vFor.warnDuplicate = function (value) {
	      warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	    };
	  }
	
	  var html = {
	
	    bind: function bind() {
	      // a comment node means this is a binding for
	      // {{{ inline unescaped html }}}
	      if (this.el.nodeType === 8) {
	        // hold nodes
	        this.nodes = [];
	        // replace the placeholder with proper anchor
	        this.anchor = createAnchor('v-html');
	        replace(this.el, this.anchor);
	      }
	    },
	
	    update: function update(value) {
	      value = _toString(value);
	      if (this.nodes) {
	        this.swap(value);
	      } else {
	        this.el.innerHTML = value;
	      }
	    },
	
	    swap: function swap(value) {
	      // remove old nodes
	      var i = this.nodes.length;
	      while (i--) {
	        remove(this.nodes[i]);
	      }
	      // convert new value to a fragment
	      // do not attempt to retrieve from id selector
	      var frag = parseTemplate(value, true, true);
	      // save a reference to these nodes so we can remove later
	      this.nodes = toArray(frag.childNodes);
	      before(frag, this.anchor);
	    }
	  };
	
	  var text = {
	
	    bind: function bind() {
	      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	    },
	
	    update: function update(value) {
	      this.el[this.attr] = _toString(value);
	    }
	  };
	
	  // must export plain object
	  var publicDirectives = {
	    text: text,
	    html: html,
	    'for': vFor,
	    'if': vIf,
	    show: show,
	    model: model,
	    on: on,
	    bind: bind,
	    el: el,
	    ref: ref,
	    cloak: cloak
	  };
	
	  var queue$1 = [];
	  var queued = false;
	
	  /**
	   * Push a job into the queue.
	   *
	   * @param {Function} job
	   */
	
	  function pushJob(job) {
	    queue$1.push(job);
	    if (!queued) {
	      queued = true;
	      nextTick(flush);
	    }
	  }
	
	  /**
	   * Flush the queue, and do one forced reflow before
	   * triggering transitions.
	   */
	
	  function flush() {
	    // Force layout
	    var f = document.documentElement.offsetHeight;
	    for (var i = 0; i < queue$1.length; i++) {
	      queue$1[i]();
	    }
	    queue$1 = [];
	    queued = false;
	    // dummy return, so js linters don't complain about
	    // unused variable f
	    return f;
	  }
	
	  var TYPE_TRANSITION = 1;
	  var TYPE_ANIMATION = 2;
	  var transDurationProp = transitionProp + 'Duration';
	  var animDurationProp = animationProp + 'Duration';
	
	  /**
	   * A Transition object that encapsulates the state and logic
	   * of the transition.
	   *
	   * @param {Element} el
	   * @param {String} id
	   * @param {Object} hooks
	   * @param {Vue} vm
	   */
	  function Transition(el, id, hooks, vm) {
	    this.id = id;
	    this.el = el;
	    this.enterClass = id + '-enter';
	    this.leaveClass = id + '-leave';
	    this.hooks = hooks;
	    this.vm = vm;
	    // async state
	    this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	    this.justEntered = false;
	    this.entered = this.left = false;
	    this.typeCache = {};
	    // bind
	    var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	      self[m] = bind$1(self[m], self);
	    });
	  }
	
	  var p$1 = Transition.prototype;
	
	  /**
	   * Start an entering transition.
	   *
	   * 1. enter transition triggered
	   * 2. call beforeEnter hook
	   * 3. add enter class
	   * 4. insert/show element
	   * 5. call enter hook (with possible explicit js callback)
	   * 6. reflow
	   * 7. based on transition type:
	   *    - transition:
	   *        remove class now, wait for transitionend,
	   *        then done if there's no explicit js callback.
	   *    - animation:
	   *        wait for animationend, remove class,
	   *        then done if there's no explicit js callback.
	   *    - no css transition:
	   *        done now if there's no explicit js callback.
	   * 8. wait for either done or js callback, then call
	   *    afterEnter hook.
	   *
	   * @param {Function} op - insert/show the element
	   * @param {Function} [cb]
	   */
	
	  p$1.enter = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeEnter');
	    this.cb = cb;
	    addClass(this.el, this.enterClass);
	    op();
	    this.entered = false;
	    this.callHookWithCb('enter');
	    if (this.entered) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.enterCancelled;
	    pushJob(this.enterNextTick);
	  };
	
	  /**
	   * The "nextTick" phase of an entering transition, which is
	   * to be pushed into a queue and executed after a reflow so
	   * that removing the class can trigger a CSS transition.
	   */
	
	  p$1.enterNextTick = function () {
	
	    // Important hack:
	    // in Chrome, if a just-entered element is applied the
	    // leave class while its interpolated property still has
	    // a very small value (within one frame), Chrome will
	    // skip the leave transition entirely and not firing the
	    // transtionend event. Therefore we need to protected
	    // against such cases using a one-frame timeout.
	    this.justEntered = true;
	    var self = this;
	    setTimeout(function () {
	      self.justEntered = false;
	    }, 17);
	
	    var enterDone = this.enterDone;
	    var type = this.getCssTransitionType(this.enterClass);
	    if (!this.pendingJsCb) {
	      if (type === TYPE_TRANSITION) {
	        // trigger transition by removing enter class now
	        removeClass(this.el, this.enterClass);
	        this.setupCssCb(transitionEndEvent, enterDone);
	      } else if (type === TYPE_ANIMATION) {
	        this.setupCssCb(animationEndEvent, enterDone);
	      } else {
	        enterDone();
	      }
	    } else if (type === TYPE_TRANSITION) {
	      removeClass(this.el, this.enterClass);
	    }
	  };
	
	  /**
	   * The "cleanup" phase of an entering transition.
	   */
	
	  p$1.enterDone = function () {
	    this.entered = true;
	    this.cancel = this.pendingJsCb = null;
	    removeClass(this.el, this.enterClass);
	    this.callHook('afterEnter');
	    if (this.cb) this.cb();
	  };
	
	  /**
	   * Start a leaving transition.
	   *
	   * 1. leave transition triggered.
	   * 2. call beforeLeave hook
	   * 3. add leave class (trigger css transition)
	   * 4. call leave hook (with possible explicit js callback)
	   * 5. reflow if no explicit js callback is provided
	   * 6. based on transition type:
	   *    - transition or animation:
	   *        wait for end event, remove class, then done if
	   *        there's no explicit js callback.
	   *    - no css transition:
	   *        done if there's no explicit js callback.
	   * 7. wait for either done or js callback, then call
	   *    afterLeave hook.
	   *
	   * @param {Function} op - remove/hide the element
	   * @param {Function} [cb]
	   */
	
	  p$1.leave = function (op, cb) {
	    this.cancelPending();
	    this.callHook('beforeLeave');
	    this.op = op;
	    this.cb = cb;
	    addClass(this.el, this.leaveClass);
	    this.left = false;
	    this.callHookWithCb('leave');
	    if (this.left) {
	      return; // user called done synchronously.
	    }
	    this.cancel = this.hooks && this.hooks.leaveCancelled;
	    // only need to handle leaveDone if
	    // 1. the transition is already done (synchronously called
	    //    by the user, which causes this.op set to null)
	    // 2. there's no explicit js callback
	    if (this.op && !this.pendingJsCb) {
	      // if a CSS transition leaves immediately after enter,
	      // the transitionend event never fires. therefore we
	      // detect such cases and end the leave immediately.
	      if (this.justEntered) {
	        this.leaveDone();
	      } else {
	        pushJob(this.leaveNextTick);
	      }
	    }
	  };
	
	  /**
	   * The "nextTick" phase of a leaving transition.
	   */
	
	  p$1.leaveNextTick = function () {
	    var type = this.getCssTransitionType(this.leaveClass);
	    if (type) {
	      var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	      this.setupCssCb(event, this.leaveDone);
	    } else {
	      this.leaveDone();
	    }
	  };
	
	  /**
	   * The "cleanup" phase of a leaving transition.
	   */
	
	  p$1.leaveDone = function () {
	    this.left = true;
	    this.cancel = this.pendingJsCb = null;
	    this.op();
	    removeClass(this.el, this.leaveClass);
	    this.callHook('afterLeave');
	    if (this.cb) this.cb();
	    this.op = null;
	  };
	
	  /**
	   * Cancel any pending callbacks from a previously running
	   * but not finished transition.
	   */
	
	  p$1.cancelPending = function () {
	    this.op = this.cb = null;
	    var hasPending = false;
	    if (this.pendingCssCb) {
	      hasPending = true;
	      off(this.el, this.pendingCssEvent, this.pendingCssCb);
	      this.pendingCssEvent = this.pendingCssCb = null;
	    }
	    if (this.pendingJsCb) {
	      hasPending = true;
	      this.pendingJsCb.cancel();
	      this.pendingJsCb = null;
	    }
	    if (hasPending) {
	      removeClass(this.el, this.enterClass);
	      removeClass(this.el, this.leaveClass);
	    }
	    if (this.cancel) {
	      this.cancel.call(this.vm, this.el);
	      this.cancel = null;
	    }
	  };
	
	  /**
	   * Call a user-provided synchronous hook function.
	   *
	   * @param {String} type
	   */
	
	  p$1.callHook = function (type) {
	    if (this.hooks && this.hooks[type]) {
	      this.hooks[type].call(this.vm, this.el);
	    }
	  };
	
	  /**
	   * Call a user-provided, potentially-async hook function.
	   * We check for the length of arguments to see if the hook
	   * expects a `done` callback. If true, the transition's end
	   * will be determined by when the user calls that callback;
	   * otherwise, the end is determined by the CSS transition or
	   * animation.
	   *
	   * @param {String} type
	   */
	
	  p$1.callHookWithCb = function (type) {
	    var hook = this.hooks && this.hooks[type];
	    if (hook) {
	      if (hook.length > 1) {
	        this.pendingJsCb = cancellable(this[type + 'Done']);
	      }
	      hook.call(this.vm, this.el, this.pendingJsCb);
	    }
	  };
	
	  /**
	   * Get an element's transition type based on the
	   * calculated styles.
	   *
	   * @param {String} className
	   * @return {Number}
	   */
	
	  p$1.getCssTransitionType = function (className) {
	    /* istanbul ignore if */
	    if (!transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    this.hooks && this.hooks.css === false ||
	    // element is hidden
	    isHidden(this.el)) {
	      return;
	    }
	    var type = this.typeCache[className];
	    if (type) return type;
	    var inlineStyles = this.el.style;
	    var computedStyles = window.getComputedStyle(this.el);
	    var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	    if (transDuration && transDuration !== '0s') {
	      type = TYPE_TRANSITION;
	    } else {
	      var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	      if (animDuration && animDuration !== '0s') {
	        type = TYPE_ANIMATION;
	      }
	    }
	    if (type) {
	      this.typeCache[className] = type;
	    }
	    return type;
	  };
	
	  /**
	   * Setup a CSS transitionend/animationend callback.
	   *
	   * @param {String} event
	   * @param {Function} cb
	   */
	
	  p$1.setupCssCb = function (event, cb) {
	    this.pendingCssEvent = event;
	    var self = this;
	    var el = this.el;
	    var onEnd = this.pendingCssCb = function (e) {
	      if (e.target === el) {
	        off(el, event, onEnd);
	        self.pendingCssEvent = self.pendingCssCb = null;
	        if (!self.pendingJsCb && cb) {
	          cb();
	        }
	      }
	    };
	    on$1(el, event, onEnd);
	  };
	
	  /**
	   * Check if an element is hidden - in that case we can just
	   * skip the transition alltogether.
	   *
	   * @param {Element} el
	   * @return {Boolean}
	   */
	
	  function isHidden(el) {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	
	  var transition = {
	
	    priority: 1100,
	
	    update: function update(id, oldId) {
	      var el = this.el;
	      // resolve on owner vm
	      var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	      id = id || 'v';
	      // apply on closest vm
	      el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	      if (oldId) {
	        removeClass(el, oldId + '-transition');
	      }
	      addClass(el, id + '-transition');
	    }
	  };
	
	  var bindingModes = config._propBindingModes;
	
	  var propDef = {
	
	    bind: function bind() {
	
	      var child = this.vm;
	      var parent = child._context;
	      // passed in from compiler directly
	      var prop = this.descriptor.prop;
	      var childKey = prop.path;
	      var parentKey = prop.parentPath;
	      var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	      var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	        if (assertProp(prop, val)) {
	          child[childKey] = val;
	        }
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // v-for scope if present
	        scope: this._scope
	      });
	
	      // set the child initial value.
	      initProp(child, prop, parentWatcher.value);
	
	      // setup two-way binding
	      if (twoWay) {
	        // important: defer the child watcher creation until
	        // the created hook (after data observation)
	        var self = this;
	        child.$once('hook:created', function () {
	          self.childWatcher = new Watcher(child, childKey, function (val) {
	            parentWatcher.set(val);
	          }, {
	            // ensure sync upward before parent sync down.
	            // this is necessary in cases e.g. the child
	            // mutates a prop array, then replaces it. (#1683)
	            sync: true
	          });
	        });
	      }
	    },
	
	    unbind: function unbind() {
	      this.parentWatcher.teardown();
	      if (this.childWatcher) {
	        this.childWatcher.teardown();
	      }
	    }
	  };
	
	  var component = {
	
	    priority: 1500,
	
	    params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	    /**
	     * Setup. Two possible usages:
	     *
	     * - static:
	     *   <comp> or <div v-component="comp">
	     *
	     * - dynamic:
	     *   <component :is="view">
	     */
	
	    bind: function bind() {
	      if (!this.el.__vue__) {
	        // keep-alive cache
	        this.keepAlive = this.params.keepAlive;
	        if (this.keepAlive) {
	          this.cache = {};
	        }
	        // check inline-template
	        if (this.params.inlineTemplate) {
	          // extract inline template as a DocumentFragment
	          this.inlineTemplate = extractContent(this.el, true);
	        }
	        // component resolution related state
	        this.pendingComponentCb = this.Component = null;
	        // transition related state
	        this.pendingRemovals = 0;
	        this.pendingRemovalCb = null;
	        // create a ref anchor
	        this.anchor = createAnchor('v-component');
	        replace(this.el, this.anchor);
	        // remove is attribute.
	        // this is removed during compilation, but because compilation is
	        // cached, when the component is used elsewhere this attribute
	        // will remain at link time.
	        this.el.removeAttribute('is');
	        // remove ref, same as above
	        if (this.descriptor.ref) {
	          this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	        }
	        // if static, build right now.
	        if (this.literal) {
	          this.setComponent(this.expression);
	        }
	      } else {
	        'development' !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	      }
	    },
	
	    /**
	     * Public update, called by the watcher in the dynamic
	     * literal scenario, e.g. <component :is="view">
	     */
	
	    update: function update(value) {
	      if (!this.literal) {
	        this.setComponent(value);
	      }
	    },
	
	    /**
	     * Switch dynamic components. May resolve the component
	     * asynchronously, and perform transition based on
	     * specified transition mode. Accepts a few additional
	     * arguments specifically for vue-router.
	     *
	     * The callback is called when the full transition is
	     * finished.
	     *
	     * @param {String} value
	     * @param {Function} [cb]
	     */
	
	    setComponent: function setComponent(value, cb) {
	      this.invalidatePending();
	      if (!value) {
	        // just remove current
	        this.unbuild(true);
	        this.remove(this.childVM, cb);
	        this.childVM = null;
	      } else {
	        var self = this;
	        this.resolveComponent(value, function () {
	          self.mountComponent(cb);
	        });
	      }
	    },
	
	    /**
	     * Resolve the component constructor to use when creating
	     * the child vm.
	     */
	
	    resolveComponent: function resolveComponent(id, cb) {
	      var self = this;
	      this.pendingComponentCb = cancellable(function (Component) {
	        self.ComponentName = Component.options.name || id;
	        self.Component = Component;
	        cb();
	      });
	      this.vm._resolveComponent(id, this.pendingComponentCb);
	    },
	
	    /**
	     * Create a new instance using the current constructor and
	     * replace the existing instance. This method doesn't care
	     * whether the new component and the old one are actually
	     * the same.
	     *
	     * @param {Function} [cb]
	     */
	
	    mountComponent: function mountComponent(cb) {
	      // actual mount
	      this.unbuild(true);
	      var self = this;
	      var activateHook = this.Component.options.activate;
	      var cached = this.getCached();
	      var newComponent = this.build();
	      if (activateHook && !cached) {
	        this.waitingFor = newComponent;
	        activateHook.call(newComponent, function () {
	          self.waitingFor = null;
	          self.transition(newComponent, cb);
	        });
	      } else {
	        // update ref for kept-alive component
	        if (cached) {
	          newComponent._updateRef();
	        }
	        this.transition(newComponent, cb);
	      }
	    },
	
	    /**
	     * When the component changes or unbinds before an async
	     * constructor is resolved, we need to invalidate its
	     * pending callback.
	     */
	
	    invalidatePending: function invalidatePending() {
	      if (this.pendingComponentCb) {
	        this.pendingComponentCb.cancel();
	        this.pendingComponentCb = null;
	      }
	    },
	
	    /**
	     * Instantiate/insert a new child vm.
	     * If keep alive and has cached instance, insert that
	     * instance; otherwise build a new one and cache it.
	     *
	     * @param {Object} [extraOptions]
	     * @return {Vue} - the created instance
	     */
	
	    build: function build(extraOptions) {
	      var cached = this.getCached();
	      if (cached) {
	        return cached;
	      }
	      if (this.Component) {
	        // default options
	        var options = {
	          name: this.ComponentName,
	          el: cloneNode(this.el),
	          template: this.inlineTemplate,
	          // make sure to add the child with correct parent
	          // if this is a transcluded component, its parent
	          // should be the transclusion host.
	          parent: this._host || this.vm,
	          // if no inline-template, then the compiled
	          // linker can be cached for better performance.
	          _linkerCachable: !this.inlineTemplate,
	          _ref: this.descriptor.ref,
	          _asComponent: true,
	          _isRouterView: this._isRouterView,
	          // if this is a transcluded component, context
	          // will be the common parent vm of this instance
	          // and its host.
	          _context: this.vm,
	          // if this is inside an inline v-for, the scope
	          // will be the intermediate scope created for this
	          // repeat fragment. this is used for linking props
	          // and container directives.
	          _scope: this._scope,
	          // pass in the owner fragment of this component.
	          // this is necessary so that the fragment can keep
	          // track of its contained components in order to
	          // call attach/detach hooks for them.
	          _frag: this._frag
	        };
	        // extra options
	        // in 1.0.0 this is used by vue-router only
	        /* istanbul ignore if */
	        if (extraOptions) {
	          extend(options, extraOptions);
	        }
	        var child = new this.Component(options);
	        if (this.keepAlive) {
	          this.cache[this.Component.cid] = child;
	        }
	        /* istanbul ignore if */
	        if ('development' !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	          warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	        }
	        return child;
	      }
	    },
	
	    /**
	     * Try to get a cached instance of the current component.
	     *
	     * @return {Vue|undefined}
	     */
	
	    getCached: function getCached() {
	      return this.keepAlive && this.cache[this.Component.cid];
	    },
	
	    /**
	     * Teardown the current child, but defers cleanup so
	     * that we can separate the destroy and removal steps.
	     *
	     * @param {Boolean} defer
	     */
	
	    unbuild: function unbuild(defer) {
	      if (this.waitingFor) {
	        this.waitingFor.$destroy();
	        this.waitingFor = null;
	      }
	      var child = this.childVM;
	      if (!child || this.keepAlive) {
	        if (child) {
	          // remove ref
	          child._updateRef(true);
	        }
	        return;
	      }
	      // the sole purpose of `deferCleanup` is so that we can
	      // "deactivate" the vm right now and perform DOM removal
	      // later.
	      child.$destroy(false, defer);
	    },
	
	    /**
	     * Remove current destroyed child and manually do
	     * the cleanup after removal.
	     *
	     * @param {Function} cb
	     */
	
	    remove: function remove(child, cb) {
	      var keepAlive = this.keepAlive;
	      if (child) {
	        // we may have a component switch when a previous
	        // component is still being transitioned out.
	        // we want to trigger only one lastest insertion cb
	        // when the existing transition finishes. (#1119)
	        this.pendingRemovals++;
	        this.pendingRemovalCb = cb;
	        var self = this;
	        child.$remove(function () {
	          self.pendingRemovals--;
	          if (!keepAlive) child._cleanup();
	          if (!self.pendingRemovals && self.pendingRemovalCb) {
	            self.pendingRemovalCb();
	            self.pendingRemovalCb = null;
	          }
	        });
	      } else if (cb) {
	        cb();
	      }
	    },
	
	    /**
	     * Actually swap the components, depending on the
	     * transition mode. Defaults to simultaneous.
	     *
	     * @param {Vue} target
	     * @param {Function} [cb]
	     */
	
	    transition: function transition(target, cb) {
	      var self = this;
	      var current = this.childVM;
	      // for devtool inspection
	      if (true) {
	        if (current) current._inactive = true;
	        target._inactive = false;
	      }
	      this.childVM = target;
	      switch (self.params.transitionMode) {
	        case 'in-out':
	          target.$before(self.anchor, function () {
	            self.remove(current, cb);
	          });
	          break;
	        case 'out-in':
	          self.remove(current, function () {
	            target.$before(self.anchor, cb);
	          });
	          break;
	        default:
	          self.remove(current);
	          target.$before(self.anchor, cb);
	      }
	    },
	
	    /**
	     * Unbind.
	     */
	
	    unbind: function unbind() {
	      this.invalidatePending();
	      // Do not defer cleanup when unbinding
	      this.unbuild();
	      // destroy all keep-alive cached instances
	      if (this.cache) {
	        for (var key in this.cache) {
	          this.cache[key].$destroy();
	        }
	        this.cache = null;
	      }
	    }
	  };
	
	  var vClass = {
	
	    deep: true,
	
	    update: function update(value) {
	      if (value && typeof value === 'string') {
	        this.handleObject(stringToObject(value));
	      } else if (isPlainObject(value)) {
	        this.handleObject(value);
	      } else if (isArray(value)) {
	        this.handleArray(value);
	      } else {
	        this.cleanup();
	      }
	    },
	
	    handleObject: function handleObject(value) {
	      this.cleanup(value);
	      var keys = this.prevKeys = Object.keys(value);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        var key = keys[i];
	        if (value[key]) {
	          addClass(this.el, key);
	        } else {
	          removeClass(this.el, key);
	        }
	      }
	    },
	
	    handleArray: function handleArray(value) {
	      this.cleanup(value);
	      for (var i = 0, l = value.length; i < l; i++) {
	        if (value[i]) {
	          addClass(this.el, value[i]);
	        }
	      }
	      this.prevKeys = value.slice();
	    },
	
	    cleanup: function cleanup(value) {
	      if (this.prevKeys) {
	        var i = this.prevKeys.length;
	        while (i--) {
	          var key = this.prevKeys[i];
	          if (key && (!value || !contains$1(value, key))) {
	            removeClass(this.el, key);
	          }
	        }
	      }
	    }
	  };
	
	  function stringToObject(value) {
	    var res = {};
	    var keys = value.trim().split(/\s+/);
	    var i = keys.length;
	    while (i--) {
	      res[keys[i]] = true;
	    }
	    return res;
	  }
	
	  function contains$1(value, key) {
	    return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	  }
	
	  var internalDirectives = {
	    style: style,
	    'class': vClass,
	    component: component,
	    prop: propDef,
	    transition: transition
	  };
	
	  var propBindingModes = config._propBindingModes;
	  var empty = {};
	
	  // regexes
	  var identRE = /^[$_a-zA-Z]+[\w$]*$/;
	  var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	  /**
	   * Compile props on a root element and return
	   * a props link function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Array} propOptions
	   * @return {Function} propsLinkFn
	   */
	
	  function compileProps(el, propOptions) {
	    var props = [];
	    var names = Object.keys(propOptions);
	    var i = names.length;
	    var options, name, attr, value, path, parsed, prop;
	    while (i--) {
	      name = names[i];
	      options = propOptions[name] || empty;
	
	      if ('development' !== 'production' && name === '$data') {
	        warn('Do not use $data as prop.');
	        continue;
	      }
	
	      // props could contain dashes, which will be
	      // interpreted as minus calculations by the parser
	      // so we need to camelize the path here
	      path = camelize(name);
	      if (!identRE.test(path)) {
	        'development' !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	        continue;
	      }
	
	      prop = {
	        name: name,
	        path: path,
	        options: options,
	        mode: propBindingModes.ONE_WAY,
	        raw: null
	      };
	
	      attr = hyphenate(name);
	      // first check dynamic version
	      if ((value = getBindAttr(el, attr)) === null) {
	        if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	          prop.mode = propBindingModes.TWO_WAY;
	        } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	          prop.mode = propBindingModes.ONE_TIME;
	        }
	      }
	      if (value !== null) {
	        // has dynamic binding!
	        prop.raw = value;
	        parsed = parseDirective(value);
	        value = parsed.expression;
	        prop.filters = parsed.filters;
	        // check binding type
	        if (isLiteral(value)) {
	          // for expressions containing literal numbers and
	          // booleans, there's no need to setup a prop binding,
	          // so we can optimize them as a one-time set.
	          prop.optimizedLiteral = true;
	        } else {
	          prop.dynamic = true;
	          // check non-settable path for two-way bindings
	          if ('development' !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	            prop.mode = propBindingModes.ONE_WAY;
	            warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	          }
	        }
	        prop.parentPath = value;
	
	        // warn required two-way
	        if ('development' !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	          warn('Prop "' + name + '" expects a two-way binding type.');
	        }
	      } else if ((value = getAttr(el, attr)) !== null) {
	        // has literal binding!
	        prop.raw = value;
	      } else if (options.required) {
	        // warn missing required
	        'development' !== 'production' && warn('Missing required prop: ' + name);
	      }
	      // push prop
	      props.push(prop);
	    }
	    return makePropsLinkFn(props);
	  }
	
	  /**
	   * Build a function that applies props to a vm.
	   *
	   * @param {Array} props
	   * @return {Function} propsLinkFn
	   */
	
	  function makePropsLinkFn(props) {
	    return function propsLinkFn(vm, scope) {
	      // store resolved props info
	      vm._props = {};
	      var i = props.length;
	      var prop, path, options, value, raw;
	      while (i--) {
	        prop = props[i];
	        raw = prop.raw;
	        path = prop.path;
	        options = prop.options;
	        vm._props[path] = prop;
	        if (raw === null) {
	          // initialize absent prop
	          initProp(vm, prop, getDefault(vm, options));
	        } else if (prop.dynamic) {
	          // dynamic prop
	          if (vm._context) {
	            if (prop.mode === propBindingModes.ONE_TIME) {
	              // one time binding
	              value = (scope || vm._context).$get(prop.parentPath);
	              initProp(vm, prop, value);
	            } else {
	              // dynamic binding
	              vm._bindDir({
	                name: 'prop',
	                def: propDef,
	                prop: prop
	              }, null, null, scope); // el, host, scope
	            }
	          } else {
	              'development' !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	            }
	        } else if (prop.optimizedLiteral) {
	          // optimized literal, cast it and just set once
	          var stripped = stripQuotes(raw);
	          value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	          initProp(vm, prop, value);
	        } else {
	          // string literal, but we need to cater for
	          // Boolean props with no value
	          value = options.type === Boolean && raw === '' ? true : raw;
	          initProp(vm, prop, value);
	        }
	      }
	    };
	  }
	
	  /**
	   * Get the default value of a prop.
	   *
	   * @param {Vue} vm
	   * @param {Object} options
	   * @return {*}
	   */
	
	  function getDefault(vm, options) {
	    // no default, return undefined
	    if (!hasOwn(options, 'default')) {
	      // absent boolean value defaults to false
	      return options.type === Boolean ? false : undefined;
	    }
	    var def = options['default'];
	    // warn against non-factory defaults for Object & Array
	    if (isObject(def)) {
	      'development' !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	    }
	    // call factory function for non-Function types
	    return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	  }
	
	  // special binding prefixes
	  var bindRE = /^v-bind:|^:/;
	  var onRE = /^v-on:|^@/;
	  var argRE = /:(.*)$/;
	  var modifierRE = /\.[^\.]+/g;
	  var transitionRE = /^(v-bind:|:)?transition$/;
	
	  // terminal directives
	  var terminalDirectives = ['for', 'if'];
	
	  // default directive priority
	  var DEFAULT_PRIORITY = 1000;
	
	  /**
	   * Compile a template and return a reusable composite link
	   * function, which recursively contains more link functions
	   * inside. This top level compile function would normally
	   * be called on instance root nodes, but can also be used
	   * for partial compilation if the partial argument is true.
	   *
	   * The returned composite link function, when called, will
	   * return an unlink function that tearsdown all directives
	   * created during the linking phase.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Object} options
	   * @param {Boolean} partial
	   * @return {Function}
	   */
	
	  function compile(el, options, partial) {
	    // link function for the node itself.
	    var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	    // link function for the childNodes
	    var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	    /**
	     * A composite linker function to be called on a already
	     * compiled piece of DOM, which instantiates all directive
	     * instances.
	     *
	     * @param {Vue} vm
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host] - host vm of transcluded content
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - link context fragment
	     * @return {Function|undefined}
	     */
	
	    return function compositeLinkFn(vm, el, host, scope, frag) {
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(el.childNodes);
	      // link
	      var dirs = linkAndCapture(function compositeLinkCapturer() {
	        if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	        if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	      }, vm);
	      return makeUnlinkFn(vm, dirs);
	    };
	  }
	
	  /**
	   * Apply a linker to a vm/element pair and capture the
	   * directives created during the process.
	   *
	   * @param {Function} linker
	   * @param {Vue} vm
	   */
	
	  function linkAndCapture(linker, vm) {
	    var originalDirCount = vm._directives.length;
	    linker();
	    var dirs = vm._directives.slice(originalDirCount);
	    dirs.sort(directiveComparator);
	    for (var i = 0, l = dirs.length; i < l; i++) {
	      dirs[i]._bind();
	    }
	    return dirs;
	  }
	
	  /**
	   * Directive priority sort comparator
	   *
	   * @param {Object} a
	   * @param {Object} b
	   */
	
	  function directiveComparator(a, b) {
	    a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	    b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	    return a > b ? -1 : a === b ? 0 : 1;
	  }
	
	  /**
	   * Linker functions return an unlink function that
	   * tearsdown all directives instances generated during
	   * the process.
	   *
	   * We create unlink functions with only the necessary
	   * information to avoid retaining additional closures.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Vue} [context]
	   * @param {Array} [contextDirs]
	   * @return {Function}
	   */
	
	  function makeUnlinkFn(vm, dirs, context, contextDirs) {
	    return function unlink(destroying) {
	      teardownDirs(vm, dirs, destroying);
	      if (context && contextDirs) {
	        teardownDirs(context, contextDirs);
	      }
	    };
	  }
	
	  /**
	   * Teardown partial linked directives.
	   *
	   * @param {Vue} vm
	   * @param {Array} dirs
	   * @param {Boolean} destroying
	   */
	
	  function teardownDirs(vm, dirs, destroying) {
	    var i = dirs.length;
	    while (i--) {
	      dirs[i]._teardown();
	      if (!destroying) {
	        vm._directives.$remove(dirs[i]);
	      }
	    }
	  }
	
	  /**
	   * Compile link props on an instance.
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   * @param {Object} props
	   * @param {Object} [scope]
	   * @return {Function}
	   */
	
	  function compileAndLinkProps(vm, el, props, scope) {
	    var propsLinkFn = compileProps(el, props);
	    var propDirs = linkAndCapture(function () {
	      propsLinkFn(vm, scope);
	    }, vm);
	    return makeUnlinkFn(vm, propDirs);
	  }
	
	  /**
	   * Compile the root element of an instance.
	   *
	   * 1. attrs on context container (context scope)
	   * 2. attrs on the component template root node, if
	   *    replace:true (child scope)
	   *
	   * If this is a fragment instance, we only need to compile 1.
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   * @param {Object} options
	   * @param {Object} contextOptions
	   * @return {Function}
	   */
	
	  function compileRoot(el, options, contextOptions) {
	    var containerAttrs = options._containerAttrs;
	    var replacerAttrs = options._replacerAttrs;
	    var contextLinkFn, replacerLinkFn;
	
	    // only need to compile other attributes for
	    // non-fragment instances
	    if (el.nodeType !== 11) {
	      // for components, container and replacer need to be
	      // compiled separately and linked in different scopes.
	      if (options._asComponent) {
	        // 2. container attributes
	        if (containerAttrs && contextOptions) {
	          contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	        }
	        if (replacerAttrs) {
	          // 3. replacer attributes
	          replacerLinkFn = compileDirectives(replacerAttrs, options);
	        }
	      } else {
	        // non-component, just compile as a normal element.
	        replacerLinkFn = compileDirectives(el.attributes, options);
	      }
	    } else if ('development' !== 'production' && containerAttrs) {
	      // warn container directives for fragment instances
	      var names = containerAttrs.filter(function (attr) {
	        // allow vue-loader/vueify scoped css attributes
	        return attr.name.indexOf('_v-') < 0 &&
	        // allow event listeners
	        !onRE.test(attr.name) &&
	        // allow slots
	        attr.name !== 'slot';
	      }).map(function (attr) {
	        return '"' + attr.name + '"';
	      });
	      if (names.length) {
	        var plural = names.length > 1;
	        warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	      }
	    }
	
	    return function rootLinkFn(vm, el, scope) {
	      // link context scope dirs
	      var context = vm._context;
	      var contextDirs;
	      if (context && contextLinkFn) {
	        contextDirs = linkAndCapture(function () {
	          contextLinkFn(context, el, null, scope);
	        }, context);
	      }
	
	      // link self
	      var selfDirs = linkAndCapture(function () {
	        if (replacerLinkFn) replacerLinkFn(vm, el);
	      }, vm);
	
	      // return the unlink function that tearsdown context
	      // container directives.
	      return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	    };
	  }
	
	  /**
	   * Compile a node and return a nodeLinkFn based on the
	   * node type.
	   *
	   * @param {Node} node
	   * @param {Object} options
	   * @return {Function|null}
	   */
	
	  function compileNode(node, options) {
	    var type = node.nodeType;
	    if (type === 1 && node.tagName !== 'SCRIPT') {
	      return compileElement(node, options);
	    } else if (type === 3 && node.data.trim()) {
	      return compileTextNode(node, options);
	    } else {
	      return null;
	    }
	  }
	
	  /**
	   * Compile an element and return a nodeLinkFn.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|null}
	   */
	
	  function compileElement(el, options) {
	    // preprocess textareas.
	    // textarea treats its text content as the initial value.
	    // just bind it as an attr directive for value.
	    if (el.tagName === 'TEXTAREA') {
	      var tokens = parseText(el.value);
	      if (tokens) {
	        el.setAttribute(':value', tokensToExp(tokens));
	        el.value = '';
	      }
	    }
	    var linkFn;
	    var hasAttrs = el.hasAttributes();
	    // check terminal directives (for & if)
	    if (hasAttrs) {
	      linkFn = checkTerminalDirectives(el, options);
	    }
	    // check element directives
	    if (!linkFn) {
	      linkFn = checkElementDirectives(el, options);
	    }
	    // check component
	    if (!linkFn) {
	      linkFn = checkComponent(el, options);
	    }
	    // normal directives
	    if (!linkFn && hasAttrs) {
	      linkFn = compileDirectives(el.attributes, options);
	    }
	    return linkFn;
	  }
	
	  /**
	   * Compile a textNode and return a nodeLinkFn.
	   *
	   * @param {TextNode} node
	   * @param {Object} options
	   * @return {Function|null} textNodeLinkFn
	   */
	
	  function compileTextNode(node, options) {
	    // skip marked text nodes
	    if (node._skip) {
	      return removeText;
	    }
	
	    var tokens = parseText(node.wholeText);
	    if (!tokens) {
	      return null;
	    }
	
	    // mark adjacent text nodes as skipped,
	    // because we are using node.wholeText to compile
	    // all adjacent text nodes together. This fixes
	    // issues in IE where sometimes it splits up a single
	    // text node into multiple ones.
	    var next = node.nextSibling;
	    while (next && next.nodeType === 3) {
	      next._skip = true;
	      next = next.nextSibling;
	    }
	
	    var frag = document.createDocumentFragment();
	    var el, token;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	      frag.appendChild(el);
	    }
	    return makeTextNodeLinkFn(tokens, frag, options);
	  }
	
	  /**
	   * Linker for an skipped text node.
	   *
	   * @param {Vue} vm
	   * @param {Text} node
	   */
	
	  function removeText(vm, node) {
	    remove(node);
	  }
	
	  /**
	   * Process a single text token.
	   *
	   * @param {Object} token
	   * @param {Object} options
	   * @return {Node}
	   */
	
	  function processTextToken(token, options) {
	    var el;
	    if (token.oneTime) {
	      el = document.createTextNode(token.value);
	    } else {
	      if (token.html) {
	        el = document.createComment('v-html');
	        setTokenType('html');
	      } else {
	        // IE will clean up empty textNodes during
	        // frag.cloneNode(true), so we have to give it
	        // something here...
	        el = document.createTextNode(' ');
	        setTokenType('text');
	      }
	    }
	    function setTokenType(type) {
	      if (token.descriptor) return;
	      var parsed = parseDirective(token.value);
	      token.descriptor = {
	        name: type,
	        def: publicDirectives[type],
	        expression: parsed.expression,
	        filters: parsed.filters
	      };
	    }
	    return el;
	  }
	
	  /**
	   * Build a function that processes a textNode.
	   *
	   * @param {Array<Object>} tokens
	   * @param {DocumentFragment} frag
	   */
	
	  function makeTextNodeLinkFn(tokens, frag) {
	    return function textNodeLinkFn(vm, el, host, scope) {
	      var fragClone = frag.cloneNode(true);
	      var childNodes = toArray(fragClone.childNodes);
	      var token, value, node;
	      for (var i = 0, l = tokens.length; i < l; i++) {
	        token = tokens[i];
	        value = token.value;
	        if (token.tag) {
	          node = childNodes[i];
	          if (token.oneTime) {
	            value = (scope || vm).$eval(value);
	            if (token.html) {
	              replace(node, parseTemplate(value, true));
	            } else {
	              node.data = value;
	            }
	          } else {
	            vm._bindDir(token.descriptor, node, host, scope);
	          }
	        }
	      }
	      replace(el, fragClone);
	    };
	  }
	
	  /**
	   * Compile a node list and return a childLinkFn.
	   *
	   * @param {NodeList} nodeList
	   * @param {Object} options
	   * @return {Function|undefined}
	   */
	
	  function compileNodeList(nodeList, options) {
	    var linkFns = [];
	    var nodeLinkFn, childLinkFn, node;
	    for (var i = 0, l = nodeList.length; i < l; i++) {
	      node = nodeList[i];
	      nodeLinkFn = compileNode(node, options);
	      childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	      linkFns.push(nodeLinkFn, childLinkFn);
	    }
	    return linkFns.length ? makeChildLinkFn(linkFns) : null;
	  }
	
	  /**
	   * Make a child link function for a node's childNodes.
	   *
	   * @param {Array<Function>} linkFns
	   * @return {Function} childLinkFn
	   */
	
	  function makeChildLinkFn(linkFns) {
	    return function childLinkFn(vm, nodes, host, scope, frag) {
	      var node, nodeLinkFn, childrenLinkFn;
	      for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	        node = nodes[n];
	        nodeLinkFn = linkFns[i++];
	        childrenLinkFn = linkFns[i++];
	        // cache childNodes before linking parent, fix #657
	        var childNodes = toArray(node.childNodes);
	        if (nodeLinkFn) {
	          nodeLinkFn(vm, node, host, scope, frag);
	        }
	        if (childrenLinkFn) {
	          childrenLinkFn(vm, childNodes, host, scope, frag);
	        }
	      }
	    };
	  }
	
	  /**
	   * Check for element directives (custom elements that should
	   * be resovled as terminal directives).
	   *
	   * @param {Element} el
	   * @param {Object} options
	   */
	
	  function checkElementDirectives(el, options) {
	    var tag = el.tagName.toLowerCase();
	    if (commonTagRE.test(tag)) return;
	    var def = resolveAsset(options, 'elementDirectives', tag);
	    if (def) {
	      return makeTerminalNodeLinkFn(el, tag, '', options, def);
	    }
	  }
	
	  /**
	   * Check if an element is a component. If yes, return
	   * a component link function.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function|undefined}
	   */
	
	  function checkComponent(el, options) {
	    var component = checkComponentAttr(el, options);
	    if (component) {
	      var ref = findRef(el);
	      var descriptor = {
	        name: 'component',
	        ref: ref,
	        expression: component.id,
	        def: internalDirectives.component,
	        modifiers: {
	          literal: !component.dynamic
	        }
	      };
	      var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	        if (ref) {
	          defineReactive((scope || vm).$refs, ref, null);
	        }
	        vm._bindDir(descriptor, el, host, scope, frag);
	      };
	      componentLinkFn.terminal = true;
	      return componentLinkFn;
	    }
	  }
	
	  /**
	   * Check an element for terminal directives in fixed order.
	   * If it finds one, return a terminal link function.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Function} terminalLinkFn
	   */
	
	  function checkTerminalDirectives(el, options) {
	    // skip v-pre
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    // skip v-else block, but only if following v-if
	    if (el.hasAttribute('v-else')) {
	      var prev = el.previousElementSibling;
	      if (prev && prev.hasAttribute('v-if')) {
	        return skip;
	      }
	    }
	    var value, dirName;
	    for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	      dirName = terminalDirectives[i];
	      /* eslint-disable no-cond-assign */
	      if (value = el.getAttribute('v-' + dirName)) {
	        return makeTerminalNodeLinkFn(el, dirName, value, options);
	      }
	      /* eslint-enable no-cond-assign */
	    }
	  }
	
	  function skip() {}
	  skip.terminal = true;
	
	  /**
	   * Build a node link function for a terminal directive.
	   * A terminal link function terminates the current
	   * compilation recursion and handles compilation of the
	   * subtree in the directive.
	   *
	   * @param {Element} el
	   * @param {String} dirName
	   * @param {String} value
	   * @param {Object} options
	   * @param {Object} [def]
	   * @return {Function} terminalLinkFn
	   */
	
	  function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	    var parsed = parseDirective(value);
	    var descriptor = {
	      name: dirName,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      raw: value,
	      // either an element directive, or if/for
	      def: def || publicDirectives[dirName]
	    };
	    // check ref for v-for and router-view
	    if (dirName === 'for' || dirName === 'router-view') {
	      descriptor.ref = findRef(el);
	    }
	    var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	      if (descriptor.ref) {
	        defineReactive((scope || vm).$refs, descriptor.ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    fn.terminal = true;
	    return fn;
	  }
	
	  /**
	   * Compile the directives on an element and return a linker.
	   *
	   * @param {Array|NamedNodeMap} attrs
	   * @param {Object} options
	   * @return {Function}
	   */
	
	  function compileDirectives(attrs, options) {
	    var i = attrs.length;
	    var dirs = [];
	    var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	    while (i--) {
	      attr = attrs[i];
	      name = rawName = attr.name;
	      value = rawValue = attr.value;
	      tokens = parseText(value);
	      // reset arg
	      arg = null;
	      // check modifiers
	      modifiers = parseModifiers(name);
	      name = name.replace(modifierRE, '');
	
	      // attribute interpolations
	      if (tokens) {
	        value = tokensToExp(tokens);
	        arg = name;
	        pushDir('bind', publicDirectives.bind, true);
	        // warn against mixing mustaches with v-bind
	        if (true) {
	          if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	            return attr.name === ':class' || attr.name === 'v-bind:class';
	          })) {
	            warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	          }
	        }
	      } else
	
	        // special attribute: transition
	        if (transitionRE.test(name)) {
	          modifiers.literal = !bindRE.test(name);
	          pushDir('transition', internalDirectives.transition);
	        } else
	
	          // event handlers
	          if (onRE.test(name)) {
	            arg = name.replace(onRE, '');
	            pushDir('on', publicDirectives.on);
	          } else
	
	            // attribute bindings
	            if (bindRE.test(name)) {
	              dirName = name.replace(bindRE, '');
	              if (dirName === 'style' || dirName === 'class') {
	                pushDir(dirName, internalDirectives[dirName]);
	              } else {
	                arg = dirName;
	                pushDir('bind', publicDirectives.bind);
	              }
	            } else
	
	              // normal directives
	              if (name.indexOf('v-') === 0) {
	                // check arg
	                arg = (arg = name.match(argRE)) && arg[1];
	                if (arg) {
	                  name = name.replace(argRE, '');
	                }
	                // extract directive name
	                dirName = name.slice(2);
	
	                // skip v-else (when used with v-show)
	                if (dirName === 'else') {
	                  continue;
	                }
	
	                dirDef = resolveAsset(options, 'directives', dirName);
	
	                if (true) {
	                  assertAsset(dirDef, 'directive', dirName);
	                }
	
	                if (dirDef) {
	                  pushDir(dirName, dirDef);
	                }
	              }
	    }
	
	    /**
	     * Push a directive.
	     *
	     * @param {String} dirName
	     * @param {Object|Function} def
	     * @param {Boolean} [interp]
	     */
	
	    function pushDir(dirName, def, interp) {
	      var parsed = parseDirective(value);
	      dirs.push({
	        name: dirName,
	        attr: rawName,
	        raw: rawValue,
	        def: def,
	        arg: arg,
	        modifiers: modifiers,
	        expression: parsed.expression,
	        filters: parsed.filters,
	        interp: interp
	      });
	    }
	
	    if (dirs.length) {
	      return makeNodeLinkFn(dirs);
	    }
	  }
	
	  /**
	   * Parse modifiers from directive attribute name.
	   *
	   * @param {String} name
	   * @return {Object}
	   */
	
	  function parseModifiers(name) {
	    var res = Object.create(null);
	    var match = name.match(modifierRE);
	    if (match) {
	      var i = match.length;
	      while (i--) {
	        res[match[i].slice(1)] = true;
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Build a link function for all directives on a single node.
	   *
	   * @param {Array} directives
	   * @return {Function} directivesLinkFn
	   */
	
	  function makeNodeLinkFn(directives) {
	    return function nodeLinkFn(vm, el, host, scope, frag) {
	      // reverse apply because it's sorted low to high
	      var i = directives.length;
	      while (i--) {
	        vm._bindDir(directives[i], el, host, scope, frag);
	      }
	    };
	  }
	
	  var specialCharRE = /[^\w\-:\.]/;
	
	  /**
	   * Process an element or a DocumentFragment based on a
	   * instance option object. This allows us to transclude
	   * a template node/fragment before the instance is created,
	   * so the processed fragment can then be cloned and reused
	   * in v-for.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */
	
	  function transclude(el, options) {
	    // extract container attributes to pass them down
	    // to compiler, because they need to be compiled in
	    // parent scope. we are mutating the options object here
	    // assuming the same object will be used for compile
	    // right after this.
	    if (options) {
	      options._containerAttrs = extractAttrs(el);
	    }
	    // for template tags, what we want is its content as
	    // a documentFragment (for fragment instances)
	    if (isTemplate(el)) {
	      el = parseTemplate(el);
	    }
	    if (options) {
	      if (options._asComponent && !options.template) {
	        options.template = '<slot></slot>';
	      }
	      if (options.template) {
	        options._content = extractContent(el);
	        el = transcludeTemplate(el, options);
	      }
	    }
	    if (el instanceof DocumentFragment) {
	      // anchors for fragment instance
	      // passing in `persist: true` to avoid them being
	      // discarded by IE during template cloning
	      prepend(createAnchor('v-start', true), el);
	      el.appendChild(createAnchor('v-end', true));
	    }
	    return el;
	  }
	
	  /**
	   * Process the template option.
	   * If the replace option is true this will swap the $el.
	   *
	   * @param {Element} el
	   * @param {Object} options
	   * @return {Element|DocumentFragment}
	   */
	
	  function transcludeTemplate(el, options) {
	    var template = options.template;
	    var frag = parseTemplate(template, true);
	    if (frag) {
	      var replacer = frag.firstChild;
	      var tag = replacer.tagName && replacer.tagName.toLowerCase();
	      if (options.replace) {
	        /* istanbul ignore if */
	        if (el === document.body) {
	          'development' !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	        }
	        // there are many cases where the instance must
	        // become a fragment instance: basically anything that
	        // can create more than 1 root nodes.
	        if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' || resolveAsset(options, 'components', tag) || replacer.hasAttribute('is') || replacer.hasAttribute(':is') || replacer.hasAttribute('v-bind:is') ||
	        // element directive
	        resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')) {
	          return frag;
	        } else {
	          options._replacerAttrs = extractAttrs(replacer);
	          mergeAttrs(el, replacer);
	          return replacer;
	        }
	      } else {
	        el.appendChild(frag);
	        return el;
	      }
	    } else {
	      'development' !== 'production' && warn('Invalid template option: ' + template);
	    }
	  }
	
	  /**
	   * Helper to extract a component container's attributes
	   * into a plain object array.
	   *
	   * @param {Element} el
	   * @return {Array}
	   */
	
	  function extractAttrs(el) {
	    if (el.nodeType === 1 && el.hasAttributes()) {
	      return toArray(el.attributes);
	    }
	  }
	
	  /**
	   * Merge the attributes of two elements, and make sure
	   * the class names are merged properly.
	   *
	   * @param {Element} from
	   * @param {Element} to
	   */
	
	  function mergeAttrs(from, to) {
	    var attrs = from.attributes;
	    var i = attrs.length;
	    var name, value;
	    while (i--) {
	      name = attrs[i].name;
	      value = attrs[i].value;
	      if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	        to.setAttribute(name, value);
	      } else if (name === 'class') {
	        value.split(/\s+/).forEach(function (cls) {
	          addClass(to, cls);
	        });
	      }
	    }
	  }
	
	  var compiler = Object.freeze({
	  	compile: compile,
	  	compileAndLinkProps: compileAndLinkProps,
	  	compileRoot: compileRoot,
	  	transclude: transclude
	  });
	
	  function stateMixin (Vue) {
	
	    /**
	     * Accessor for `$data` property, since setting $data
	     * requires observing the new object and updating
	     * proxied properties.
	     */
	
	    Object.defineProperty(Vue.prototype, '$data', {
	      get: function get() {
	        return this._data;
	      },
	      set: function set(newData) {
	        if (newData !== this._data) {
	          this._setData(newData);
	        }
	      }
	    });
	
	    /**
	     * Setup the scope of an instance, which contains:
	     * - observed data
	     * - computed properties
	     * - user methods
	     * - meta properties
	     */
	
	    Vue.prototype._initState = function () {
	      this._initProps();
	      this._initMeta();
	      this._initMethods();
	      this._initData();
	      this._initComputed();
	    };
	
	    /**
	     * Initialize props.
	     */
	
	    Vue.prototype._initProps = function () {
	      var options = this.$options;
	      var el = options.el;
	      var props = options.props;
	      if (props && !el) {
	        'development' !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	      }
	      // make sure to convert string selectors into element now
	      el = options.el = query(el);
	      this._propsUnlinkFn = el && el.nodeType === 1 && props
	      // props must be linked in proper scope if inside v-for
	      ? compileAndLinkProps(this, el, props, this._scope) : null;
	    };
	
	    /**
	     * Initialize the data.
	     */
	
	    Vue.prototype._initData = function () {
	      var propsData = this._data;
	      var optionsDataFn = this.$options.data;
	      var optionsData = optionsDataFn && optionsDataFn();
	      if (optionsData) {
	        this._data = optionsData;
	        for (var prop in propsData) {
	          if ('development' !== 'production' && hasOwn(optionsData, prop)) {
	            warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	          }
	          if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	            set(optionsData, prop, propsData[prop]);
	          }
	        }
	      }
	      var data = this._data;
	      // proxy data on instance
	      var keys = Object.keys(data);
	      var i, key;
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        this._proxy(key);
	      }
	      // observe data
	      observe(data, this);
	    };
	
	    /**
	     * Swap the instance's $data. Called in $data's setter.
	     *
	     * @param {Object} newData
	     */
	
	    Vue.prototype._setData = function (newData) {
	      newData = newData || {};
	      var oldData = this._data;
	      this._data = newData;
	      var keys, key, i;
	      // unproxy keys not present in new data
	      keys = Object.keys(oldData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!(key in newData)) {
	          this._unproxy(key);
	        }
	      }
	      // proxy keys not already proxied,
	      // and trigger change for changed values
	      keys = Object.keys(newData);
	      i = keys.length;
	      while (i--) {
	        key = keys[i];
	        if (!hasOwn(this, key)) {
	          // new property
	          this._proxy(key);
	        }
	      }
	      oldData.__ob__.removeVm(this);
	      observe(newData, this);
	      this._digest();
	    };
	
	    /**
	     * Proxy a property, so that
	     * vm.prop === vm._data.prop
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype._proxy = function (key) {
	      if (!isReserved(key)) {
	        // need to store ref to self here
	        // because these getter/setters might
	        // be called by child scopes via
	        // prototype inheritance.
	        var self = this;
	        Object.defineProperty(self, key, {
	          configurable: true,
	          enumerable: true,
	          get: function proxyGetter() {
	            return self._data[key];
	          },
	          set: function proxySetter(val) {
	            self._data[key] = val;
	          }
	        });
	      }
	    };
	
	    /**
	     * Unproxy a property.
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype._unproxy = function (key) {
	      if (!isReserved(key)) {
	        delete this[key];
	      }
	    };
	
	    /**
	     * Force update on every watcher in scope.
	     */
	
	    Vue.prototype._digest = function () {
	      for (var i = 0, l = this._watchers.length; i < l; i++) {
	        this._watchers[i].update(true); // shallow updates
	      }
	    };
	
	    /**
	     * Setup computed properties. They are essentially
	     * special getter/setters
	     */
	
	    function noop() {}
	    Vue.prototype._initComputed = function () {
	      var computed = this.$options.computed;
	      if (computed) {
	        for (var key in computed) {
	          var userDef = computed[key];
	          var def = {
	            enumerable: true,
	            configurable: true
	          };
	          if (typeof userDef === 'function') {
	            def.get = makeComputedGetter(userDef, this);
	            def.set = noop;
	          } else {
	            def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	            def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	          }
	          Object.defineProperty(this, key, def);
	        }
	      }
	    };
	
	    function makeComputedGetter(getter, owner) {
	      var watcher = new Watcher(owner, getter, null, {
	        lazy: true
	      });
	      return function computedGetter() {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value;
	      };
	    }
	
	    /**
	     * Setup instance methods. Methods must be bound to the
	     * instance since they might be passed down as a prop to
	     * child components.
	     */
	
	    Vue.prototype._initMethods = function () {
	      var methods = this.$options.methods;
	      if (methods) {
	        for (var key in methods) {
	          this[key] = bind$1(methods[key], this);
	        }
	      }
	    };
	
	    /**
	     * Initialize meta information like $index, $key & $value.
	     */
	
	    Vue.prototype._initMeta = function () {
	      var metas = this.$options._meta;
	      if (metas) {
	        for (var key in metas) {
	          defineReactive(this, key, metas[key]);
	        }
	      }
	    };
	  }
	
	  var eventRE = /^v-on:|^@/;
	
	  function eventsMixin (Vue) {
	
	    /**
	     * Setup the instance's option events & watchers.
	     * If the value is a string, we pull it from the
	     * instance's methods by name.
	     */
	
	    Vue.prototype._initEvents = function () {
	      var options = this.$options;
	      if (options._asComponent) {
	        registerComponentEvents(this, options.el);
	      }
	      registerCallbacks(this, '$on', options.events);
	      registerCallbacks(this, '$watch', options.watch);
	    };
	
	    /**
	     * Register v-on events on a child component
	     *
	     * @param {Vue} vm
	     * @param {Element} el
	     */
	
	    function registerComponentEvents(vm, el) {
	      var attrs = el.attributes;
	      var name, handler;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        name = attrs[i].name;
	        if (eventRE.test(name)) {
	          name = name.replace(eventRE, '');
	          handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	          vm.$on(name.replace(eventRE), handler);
	        }
	      }
	    }
	
	    /**
	     * Register callbacks for option events and watchers.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {Object} hash
	     */
	
	    function registerCallbacks(vm, action, hash) {
	      if (!hash) return;
	      var handlers, key, i, j;
	      for (key in hash) {
	        handlers = hash[key];
	        if (isArray(handlers)) {
	          for (i = 0, j = handlers.length; i < j; i++) {
	            register(vm, action, key, handlers[i]);
	          }
	        } else {
	          register(vm, action, key, handlers);
	        }
	      }
	    }
	
	    /**
	     * Helper to register an event/watch callback.
	     *
	     * @param {Vue} vm
	     * @param {String} action
	     * @param {String} key
	     * @param {Function|String|Object} handler
	     * @param {Object} [options]
	     */
	
	    function register(vm, action, key, handler, options) {
	      var type = typeof handler;
	      if (type === 'function') {
	        vm[action](key, handler, options);
	      } else if (type === 'string') {
	        var methods = vm.$options.methods;
	        var method = methods && methods[handler];
	        if (method) {
	          vm[action](key, method, options);
	        } else {
	          'development' !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	        }
	      } else if (handler && type === 'object') {
	        register(vm, action, key, handler.handler, handler);
	      }
	    }
	
	    /**
	     * Setup recursive attached/detached calls
	     */
	
	    Vue.prototype._initDOMHooks = function () {
	      this.$on('hook:attached', onAttached);
	      this.$on('hook:detached', onDetached);
	    };
	
	    /**
	     * Callback to recursively call attached hook on children
	     */
	
	    function onAttached() {
	      if (!this._isAttached) {
	        this._isAttached = true;
	        this.$children.forEach(callAttach);
	      }
	    }
	
	    /**
	     * Iterator to call attached hook
	     *
	     * @param {Vue} child
	     */
	
	    function callAttach(child) {
	      if (!child._isAttached && inDoc(child.$el)) {
	        child._callHook('attached');
	      }
	    }
	
	    /**
	     * Callback to recursively call detached hook on children
	     */
	
	    function onDetached() {
	      if (this._isAttached) {
	        this._isAttached = false;
	        this.$children.forEach(callDetach);
	      }
	    }
	
	    /**
	     * Iterator to call detached hook
	     *
	     * @param {Vue} child
	     */
	
	    function callDetach(child) {
	      if (child._isAttached && !inDoc(child.$el)) {
	        child._callHook('detached');
	      }
	    }
	
	    /**
	     * Trigger all handlers for a hook
	     *
	     * @param {String} hook
	     */
	
	    Vue.prototype._callHook = function (hook) {
	      var handlers = this.$options[hook];
	      if (handlers) {
	        for (var i = 0, j = handlers.length; i < j; i++) {
	          handlers[i].call(this);
	        }
	      }
	      this.$emit('hook:' + hook);
	    };
	  }
	
	  function noop() {}
	
	  /**
	   * A directive links a DOM element with a piece of data,
	   * which is the result of evaluating an expression.
	   * It registers a watcher with the expression and calls
	   * the DOM update function when a change is triggered.
	   *
	   * @param {String} name
	   * @param {Node} el
	   * @param {Vue} vm
	   * @param {Object} descriptor
	   *                 - {String} name
	   *                 - {Object} def
	   *                 - {String} expression
	   *                 - {Array<Object>} [filters]
	   *                 - {Boolean} literal
	   *                 - {String} attr
	   *                 - {String} raw
	   * @param {Object} def - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   * @constructor
	   */
	  function Directive(descriptor, vm, el, host, scope, frag) {
	    this.vm = vm;
	    this.el = el;
	    // copy descriptor properties
	    this.descriptor = descriptor;
	    this.name = descriptor.name;
	    this.expression = descriptor.expression;
	    this.arg = descriptor.arg;
	    this.modifiers = descriptor.modifiers;
	    this.filters = descriptor.filters;
	    this.literal = this.modifiers && this.modifiers.literal;
	    // private
	    this._locked = false;
	    this._bound = false;
	    this._listeners = null;
	    // link context
	    this._host = host;
	    this._scope = scope;
	    this._frag = frag;
	    // store directives on node in dev mode
	    if ('development' !== 'production' && this.el) {
	      this.el._vue_directives = this.el._vue_directives || [];
	      this.el._vue_directives.push(this);
	    }
	  }
	
	  /**
	   * Initialize the directive, mixin definition properties,
	   * setup the watcher, call definition bind() and update()
	   * if present.
	   *
	   * @param {Object} def
	   */
	
	  Directive.prototype._bind = function () {
	    var name = this.name;
	    var descriptor = this.descriptor;
	
	    // remove attribute
	    if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	      var attr = descriptor.attr || 'v-' + name;
	      this.el.removeAttribute(attr);
	    }
	
	    // copy def properties
	    var def = descriptor.def;
	    if (typeof def === 'function') {
	      this.update = def;
	    } else {
	      extend(this, def);
	    }
	
	    // setup directive params
	    this._setupParams();
	
	    // initial bind
	    if (this.bind) {
	      this.bind();
	    }
	
	    if (this.literal) {
	      this.update && this.update(descriptor.raw);
	    } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	      // wrapped updater for context
	      var dir = this;
	      if (this.update) {
	        this._update = function (val, oldVal) {
	          if (!dir._locked) {
	            dir.update(val, oldVal);
	          }
	        };
	      } else {
	        this._update = noop;
	      }
	      var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	      var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	      var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      });
	      // v-model with inital inline value need to sync back to
	      // model instead of update to DOM on init. They would
	      // set the afterBind hook to indicate that.
	      if (this.afterBind) {
	        this.afterBind();
	      } else if (this.update) {
	        this.update(watcher.value);
	      }
	    }
	    this._bound = true;
	  };
	
	  /**
	   * Setup all param attributes, e.g. track-by,
	   * transition-mode, etc...
	   */
	
	  Directive.prototype._setupParams = function () {
	    if (!this.params) {
	      return;
	    }
	    var params = this.params;
	    // swap the params array with a fresh object.
	    this.params = Object.create(null);
	    var i = params.length;
	    var key, val, mappedKey;
	    while (i--) {
	      key = params[i];
	      mappedKey = camelize(key);
	      val = getBindAttr(this.el, key);
	      if (val != null) {
	        // dynamic
	        this._setupParamWatcher(mappedKey, val);
	      } else {
	        // static
	        val = getAttr(this.el, key);
	        if (val != null) {
	          this.params[mappedKey] = val === '' ? true : val;
	        }
	      }
	    }
	  };
	
	  /**
	   * Setup a watcher for a dynamic param.
	   *
	   * @param {String} key
	   * @param {String} expression
	   */
	
	  Directive.prototype._setupParamWatcher = function (key, expression) {
	    var self = this;
	    var called = false;
	    var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	      self.params[key] = val;
	      // since we are in immediate mode,
	      // only call the param change callbacks if this is not the first update.
	      if (called) {
	        var cb = self.paramWatchers && self.paramWatchers[key];
	        if (cb) {
	          cb.call(self, val, oldVal);
	        }
	      } else {
	        called = true;
	      }
	    }, {
	      immediate: true
	    });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	  };
	
	  /**
	   * Check if the directive is a function caller
	   * and if the expression is a callable one. If both true,
	   * we wrap up the expression and use it as the event
	   * handler.
	   *
	   * e.g. on-click="a++"
	   *
	   * @return {Boolean}
	   */
	
	  Directive.prototype._checkStatement = function () {
	    var expression = this.expression;
	    if (expression && this.acceptStatement && !isSimplePath(expression)) {
	      var fn = parseExpression(expression).get;
	      var scope = this._scope || this.vm;
	      var handler = function handler(e) {
	        scope.$event = e;
	        fn.call(scope, scope);
	        scope.$event = null;
	      };
	      if (this.filters) {
	        handler = scope._applyFilters(handler, null, this.filters);
	      }
	      this.update(handler);
	      return true;
	    }
	  };
	
	  /**
	   * Set the corresponding value with the setter.
	   * This should only be used in two-way directives
	   * e.g. v-model.
	   *
	   * @param {*} value
	   * @public
	   */
	
	  Directive.prototype.set = function (value) {
	    /* istanbul ignore else */
	    if (this.twoWay) {
	      this._withLock(function () {
	        this._watcher.set(value);
	      });
	    } else if (true) {
	      warn('Directive.set() can only be used inside twoWay' + 'directives.');
	    }
	  };
	
	  /**
	   * Execute a function while preventing that function from
	   * triggering updates on this directive instance.
	   *
	   * @param {Function} fn
	   */
	
	  Directive.prototype._withLock = function (fn) {
	    var self = this;
	    self._locked = true;
	    fn.call(self);
	    nextTick(function () {
	      self._locked = false;
	    });
	  };
	
	  /**
	   * Convenience method that attaches a DOM event listener
	   * to the directive element and autometically tears it down
	   * during unbind.
	   *
	   * @param {String} event
	   * @param {Function} handler
	   */
	
	  Directive.prototype.on = function (event, handler) {
	    on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	  };
	
	  /**
	   * Teardown the watcher and call unbind.
	   */
	
	  Directive.prototype._teardown = function () {
	    if (this._bound) {
	      this._bound = false;
	      if (this.unbind) {
	        this.unbind();
	      }
	      if (this._watcher) {
	        this._watcher.teardown();
	      }
	      var listeners = this._listeners;
	      var i;
	      if (listeners) {
	        i = listeners.length;
	        while (i--) {
	          off(this.el, listeners[i][0], listeners[i][1]);
	        }
	      }
	      var unwatchFns = this._paramUnwatchFns;
	      if (unwatchFns) {
	        i = unwatchFns.length;
	        while (i--) {
	          unwatchFns[i]();
	        }
	      }
	      if ('development' !== 'production' && this.el) {
	        this.el._vue_directives.$remove(this);
	      }
	      this.vm = this.el = this._watcher = this._listeners = null;
	    }
	  };
	
	  function lifecycleMixin (Vue) {
	
	    /**
	     * Update v-ref for component.
	     *
	     * @param {Boolean} remove
	     */
	
	    Vue.prototype._updateRef = function (remove) {
	      var ref = this.$options._ref;
	      if (ref) {
	        var refs = (this._scope || this._context).$refs;
	        if (remove) {
	          if (refs[ref] === this) {
	            refs[ref] = null;
	          }
	        } else {
	          refs[ref] = this;
	        }
	      }
	    };
	
	    /**
	     * Transclude, compile and link element.
	     *
	     * If a pre-compiled linker is available, that means the
	     * passed in element will be pre-transcluded and compiled
	     * as well - all we need to do is to call the linker.
	     *
	     * Otherwise we need to call transclude/compile/link here.
	     *
	     * @param {Element} el
	     * @return {Element}
	     */
	
	    Vue.prototype._compile = function (el) {
	      var options = this.$options;
	
	      // transclude and init element
	      // transclude can potentially replace original
	      // so we need to keep reference; this step also injects
	      // the template and caches the original attributes
	      // on the container node and replacer node.
	      var original = el;
	      el = transclude(el, options);
	      this._initElement(el);
	
	      // root is always compiled per-instance, because
	      // container attrs and props can be different every time.
	      var contextOptions = this._context && this._context.$options;
	      var rootLinker = compileRoot(el, options, contextOptions);
	
	      // compile and link the rest
	      var contentLinkFn;
	      var ctor = this.constructor;
	      // component compilation can be cached
	      // as long as it's not using inline-template
	      if (options._linkerCachable) {
	        contentLinkFn = ctor.linker;
	        if (!contentLinkFn) {
	          contentLinkFn = ctor.linker = compile(el, options);
	        }
	      }
	
	      // link phase
	      // make sure to link root with prop scope!
	      var rootUnlinkFn = rootLinker(this, el, this._scope);
	      var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	      // register composite unlink function
	      // to be called during instance destruction
	      this._unlinkFn = function () {
	        rootUnlinkFn();
	        // passing destroying: true to avoid searching and
	        // splicing the directives
	        contentUnlinkFn(true);
	      };
	
	      // finally replace original
	      if (options.replace) {
	        replace(original, el);
	      }
	
	      this._isCompiled = true;
	      this._callHook('compiled');
	      return el;
	    };
	
	    /**
	     * Initialize instance element. Called in the public
	     * $mount() method.
	     *
	     * @param {Element} el
	     */
	
	    Vue.prototype._initElement = function (el) {
	      if (el instanceof DocumentFragment) {
	        this._isFragment = true;
	        this.$el = this._fragmentStart = el.firstChild;
	        this._fragmentEnd = el.lastChild;
	        // set persisted text anchors to empty
	        if (this._fragmentStart.nodeType === 3) {
	          this._fragmentStart.data = this._fragmentEnd.data = '';
	        }
	        this._fragment = el;
	      } else {
	        this.$el = el;
	      }
	      this.$el.__vue__ = this;
	      this._callHook('beforeCompile');
	    };
	
	    /**
	     * Create and bind a directive to an element.
	     *
	     * @param {String} name - directive name
	     * @param {Node} node   - target node
	     * @param {Object} desc - parsed directive descriptor
	     * @param {Object} def  - directive definition object
	     * @param {Vue} [host] - transclusion host component
	     * @param {Object} [scope] - v-for scope
	     * @param {Fragment} [frag] - owner fragment
	     */
	
	    Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	      this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	    };
	
	    /**
	     * Teardown an instance, unobserves the data, unbind all the
	     * directives, turn off all the event listeners, etc.
	     *
	     * @param {Boolean} remove - whether to remove the DOM node.
	     * @param {Boolean} deferCleanup - if true, defer cleanup to
	     *                                 be called later
	     */
	
	    Vue.prototype._destroy = function (remove, deferCleanup) {
	      if (this._isBeingDestroyed) {
	        if (!deferCleanup) {
	          this._cleanup();
	        }
	        return;
	      }
	      this._callHook('beforeDestroy');
	      this._isBeingDestroyed = true;
	      var i;
	      // remove self from parent. only necessary
	      // if parent is not being destroyed as well.
	      var parent = this.$parent;
	      if (parent && !parent._isBeingDestroyed) {
	        parent.$children.$remove(this);
	        // unregister ref (remove: true)
	        this._updateRef(true);
	      }
	      // destroy all children.
	      i = this.$children.length;
	      while (i--) {
	        this.$children[i].$destroy();
	      }
	      // teardown props
	      if (this._propsUnlinkFn) {
	        this._propsUnlinkFn();
	      }
	      // teardown all directives. this also tearsdown all
	      // directive-owned watchers.
	      if (this._unlinkFn) {
	        this._unlinkFn();
	      }
	      i = this._watchers.length;
	      while (i--) {
	        this._watchers[i].teardown();
	      }
	      // remove reference to self on $el
	      if (this.$el) {
	        this.$el.__vue__ = null;
	      }
	      // remove DOM element
	      var self = this;
	      if (remove && this.$el) {
	        this.$remove(function () {
	          self._cleanup();
	        });
	      } else if (!deferCleanup) {
	        this._cleanup();
	      }
	    };
	
	    /**
	     * Clean up to ensure garbage collection.
	     * This is called after the leave transition if there
	     * is any.
	     */
	
	    Vue.prototype._cleanup = function () {
	      if (this._isDestroyed) {
	        return;
	      }
	      // remove self from owner fragment
	      // do it in cleanup so that we can call $destroy with
	      // defer right when a fragment is about to be removed.
	      if (this._frag) {
	        this._frag.children.$remove(this);
	      }
	      // remove reference from data ob
	      // frozen object may not have observer.
	      if (this._data.__ob__) {
	        this._data.__ob__.removeVm(this);
	      }
	      // Clean up references to private properties and other
	      // instances. preserve reference to _data so that proxy
	      // accessors still work. The only potential side effect
	      // here is that mutating the instance after it's destroyed
	      // may affect the state of other components that are still
	      // observing the same object, but that seems to be a
	      // reasonable responsibility for the user rather than
	      // always throwing an error on them.
	      this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	      // call the last hook...
	      this._isDestroyed = true;
	      this._callHook('destroyed');
	      // turn off all instance listeners.
	      this.$off();
	    };
	  }
	
	  function miscMixin (Vue) {
	
	    /**
	     * Apply a list of filter (descriptors) to a value.
	     * Using plain for loops here because this will be called in
	     * the getter of any watcher with filters so it is very
	     * performance sensitive.
	     *
	     * @param {*} value
	     * @param {*} [oldValue]
	     * @param {Array} filters
	     * @param {Boolean} write
	     * @return {*}
	     */
	
	    Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	      var filter, fn, args, arg, offset, i, l, j, k;
	      for (i = 0, l = filters.length; i < l; i++) {
	        filter = filters[i];
	        fn = resolveAsset(this.$options, 'filters', filter.name);
	        if (true) {
	          assertAsset(fn, 'filter', filter.name);
	        }
	        if (!fn) continue;
	        fn = write ? fn.write : fn.read || fn;
	        if (typeof fn !== 'function') continue;
	        args = write ? [value, oldValue] : [value];
	        offset = write ? 2 : 1;
	        if (filter.args) {
	          for (j = 0, k = filter.args.length; j < k; j++) {
	            arg = filter.args[j];
	            args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	          }
	        }
	        value = fn.apply(this, args);
	      }
	      return value;
	    };
	
	    /**
	     * Resolve a component, depending on whether the component
	     * is defined normally or using an async factory function.
	     * Resolves synchronously if already resolved, otherwise
	     * resolves asynchronously and caches the resolved
	     * constructor on the factory.
	     *
	     * @param {String} id
	     * @param {Function} cb
	     */
	
	    Vue.prototype._resolveComponent = function (id, cb) {
	      var factory = resolveAsset(this.$options, 'components', id);
	      if (true) {
	        assertAsset(factory, 'component', id);
	      }
	      if (!factory) {
	        return;
	      }
	      // async component factory
	      if (!factory.options) {
	        if (factory.resolved) {
	          // cached
	          cb(factory.resolved);
	        } else if (factory.requested) {
	          // pool callbacks
	          factory.pendingCallbacks.push(cb);
	        } else {
	          factory.requested = true;
	          var cbs = factory.pendingCallbacks = [cb];
	          factory(function resolve(res) {
	            if (isPlainObject(res)) {
	              res = Vue.extend(res);
	            }
	            // cache resolved
	            factory.resolved = res;
	            // invoke callbacks
	            for (var i = 0, l = cbs.length; i < l; i++) {
	              cbs[i](res);
	            }
	          }, function reject(reason) {
	            'development' !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	          });
	        }
	      } else {
	        // normal component
	        cb(factory);
	      }
	    };
	  }
	
	  function globalAPI (Vue) {
	
	    /**
	     * Expose useful internals
	     */
	
	    Vue.util = util;
	    Vue.config = config;
	    Vue.set = set;
	    Vue['delete'] = del;
	    Vue.nextTick = nextTick;
	
	    /**
	     * The following are exposed for advanced usage / plugins
	     */
	
	    Vue.compiler = compiler;
	    Vue.FragmentFactory = FragmentFactory;
	    Vue.internalDirectives = internalDirectives;
	    Vue.parsers = {
	      path: path,
	      text: text$1,
	      template: template,
	      directive: directive,
	      expression: expression
	    };
	
	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */
	
	    Vue.cid = 0;
	    var cid = 1;
	
	    /**
	     * Class inheritance
	     *
	     * @param {Object} extendOptions
	     */
	
	    Vue.extend = function (extendOptions) {
	      extendOptions = extendOptions || {};
	      var Super = this;
	      var isFirstExtend = Super.cid === 0;
	      if (isFirstExtend && extendOptions._Ctor) {
	        return extendOptions._Ctor;
	      }
	      var name = extendOptions.name || Super.options.name;
	      var Sub = createClass(name || 'VueComponent');
	      Sub.prototype = Object.create(Super.prototype);
	      Sub.prototype.constructor = Sub;
	      Sub.cid = cid++;
	      Sub.options = mergeOptions(Super.options, extendOptions);
	      Sub['super'] = Super;
	      // allow further extension
	      Sub.extend = Super.extend;
	      // create asset registers, so extended classes
	      // can have their private assets too.
	      config._assetTypes.forEach(function (type) {
	        Sub[type] = Super[type];
	      });
	      // enable recursive self-lookup
	      if (name) {
	        Sub.options.components[name] = Sub;
	      }
	      // cache constructor
	      if (isFirstExtend) {
	        extendOptions._Ctor = Sub;
	      }
	      return Sub;
	    };
	
	    /**
	     * A function that returns a sub-class constructor with the
	     * given name. This gives us much nicer output when
	     * logging instances in the console.
	     *
	     * @param {String} name
	     * @return {Function}
	     */
	
	    function createClass(name) {
	      return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    }
	
	    /**
	     * Plugin system
	     *
	     * @param {Object} plugin
	     */
	
	    Vue.use = function (plugin) {
	      /* istanbul ignore if */
	      if (plugin.installed) {
	        return;
	      }
	      // additional parameters
	      var args = toArray(arguments, 1);
	      args.unshift(this);
	      if (typeof plugin.install === 'function') {
	        plugin.install.apply(plugin, args);
	      } else {
	        plugin.apply(null, args);
	      }
	      plugin.installed = true;
	      return this;
	    };
	
	    /**
	     * Apply a global mixin by merging it into the default
	     * options.
	     */
	
	    Vue.mixin = function (mixin) {
	      Vue.options = mergeOptions(Vue.options, mixin);
	    };
	
	    /**
	     * Create asset registration methods with the following
	     * signature:
	     *
	     * @param {String} id
	     * @param {*} definition
	     */
	
	    config._assetTypes.forEach(function (type) {
	      Vue[type] = function (id, definition) {
	        if (!definition) {
	          return this.options[type + 's'][id];
	        } else {
	          /* istanbul ignore if */
	          if (true) {
	            if (type === 'component' && commonTagRE.test(id)) {
	              warn('Do not use built-in HTML elements as component ' + 'id: ' + id);
	            }
	          }
	          if (type === 'component' && isPlainObject(definition)) {
	            definition.name = id;
	            definition = Vue.extend(definition);
	          }
	          this.options[type + 's'][id] = definition;
	          return definition;
	        }
	      };
	    });
	  }
	
	  var filterRE = /[^|]\|[^|]/;
	
	  function dataAPI (Vue) {
	
	    /**
	     * Get the value from an expression on this vm.
	     *
	     * @param {String} exp
	     * @param {Boolean} [asStatement]
	     * @return {*}
	     */
	
	    Vue.prototype.$get = function (exp, asStatement) {
	      var res = parseExpression(exp);
	      if (res) {
	        if (asStatement && !isSimplePath(exp)) {
	          var self = this;
	          return function statementHandler() {
	            res.get.call(self, self);
	          };
	        } else {
	          try {
	            return res.get.call(this, this);
	          } catch (e) {}
	        }
	      }
	    };
	
	    /**
	     * Set the value from an expression on this vm.
	     * The expression must be a valid left-hand
	     * expression in an assignment.
	     *
	     * @param {String} exp
	     * @param {*} val
	     */
	
	    Vue.prototype.$set = function (exp, val) {
	      var res = parseExpression(exp, true);
	      if (res && res.set) {
	        res.set.call(this, this, val);
	      }
	    };
	
	    /**
	     * Delete a property on the VM
	     *
	     * @param {String} key
	     */
	
	    Vue.prototype.$delete = function (key) {
	      del(this._data, key);
	    };
	
	    /**
	     * Watch an expression, trigger callback when its
	     * value changes.
	     *
	     * @param {String|Function} expOrFn
	     * @param {Function} cb
	     * @param {Object} [options]
	     *                 - {Boolean} deep
	     *                 - {Boolean} immediate
	     * @return {Function} - unwatchFn
	     */
	
	    Vue.prototype.$watch = function (expOrFn, cb, options) {
	      var vm = this;
	      var parsed;
	      if (typeof expOrFn === 'string') {
	        parsed = parseDirective(expOrFn);
	        expOrFn = parsed.expression;
	      }
	      var watcher = new Watcher(vm, expOrFn, cb, {
	        deep: options && options.deep,
	        filters: parsed && parsed.filters
	      });
	      if (options && options.immediate) {
	        cb.call(vm, watcher.value);
	      }
	      return function unwatchFn() {
	        watcher.teardown();
	      };
	    };
	
	    /**
	     * Evaluate a text directive, including filters.
	     *
	     * @param {String} text
	     * @param {Boolean} [asStatement]
	     * @return {String}
	     */
	
	    Vue.prototype.$eval = function (text, asStatement) {
	      // check for filters.
	      if (filterRE.test(text)) {
	        var dir = parseDirective(text);
	        // the filter regex check might give false positive
	        // for pipes inside strings, so it's possible that
	        // we don't get any filters here
	        var val = this.$get(dir.expression, asStatement);
	        return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	      } else {
	        // no filter
	        return this.$get(text, asStatement);
	      }
	    };
	
	    /**
	     * Interpolate a piece of template text.
	     *
	     * @param {String} text
	     * @return {String}
	     */
	
	    Vue.prototype.$interpolate = function (text) {
	      var tokens = parseText(text);
	      var vm = this;
	      if (tokens) {
	        if (tokens.length === 1) {
	          return vm.$eval(tokens[0].value) + '';
	        } else {
	          return tokens.map(function (token) {
	            return token.tag ? vm.$eval(token.value) : token.value;
	          }).join('');
	        }
	      } else {
	        return text;
	      }
	    };
	
	    /**
	     * Log instance data as a plain JS object
	     * so that it is easier to inspect in console.
	     * This method assumes console is available.
	     *
	     * @param {String} [path]
	     */
	
	    Vue.prototype.$log = function (path) {
	      var data = path ? getPath(this._data, path) : this._data;
	      if (data) {
	        data = clean(data);
	      }
	      // include computed fields
	      if (!path) {
	        for (var key in this.$options.computed) {
	          data[key] = clean(this[key]);
	        }
	      }
	      console.log(data);
	    };
	
	    /**
	     * "clean" a getter/setter converted object into a plain
	     * object copy.
	     *
	     * @param {Object} - obj
	     * @return {Object}
	     */
	
	    function clean(obj) {
	      return JSON.parse(JSON.stringify(obj));
	    }
	  }
	
	  function domAPI (Vue) {
	
	    /**
	     * Convenience on-instance nextTick. The callback is
	     * auto-bound to the instance, and this avoids component
	     * modules having to rely on the global Vue.
	     *
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$nextTick = function (fn) {
	      nextTick(fn, this);
	    };
	
	    /**
	     * Append instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$appendTo = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, append, appendWithTransition);
	    };
	
	    /**
	     * Prepend instance to target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$prependTo = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.hasChildNodes()) {
	        this.$before(target.firstChild, cb, withTransition);
	      } else {
	        this.$appendTo(target, cb, withTransition);
	      }
	      return this;
	    };
	
	    /**
	     * Insert instance before target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$before = function (target, cb, withTransition) {
	      return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	    };
	
	    /**
	     * Insert instance after target
	     *
	     * @param {Node} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$after = function (target, cb, withTransition) {
	      target = query(target);
	      if (target.nextSibling) {
	        this.$before(target.nextSibling, cb, withTransition);
	      } else {
	        this.$appendTo(target.parentNode, cb, withTransition);
	      }
	      return this;
	    };
	
	    /**
	     * Remove instance from DOM
	     *
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition] - defaults to true
	     */
	
	    Vue.prototype.$remove = function (cb, withTransition) {
	      if (!this.$el.parentNode) {
	        return cb && cb();
	      }
	      var inDocument = this._isAttached && inDoc(this.$el);
	      // if we are not in document, no need to check
	      // for transitions
	      if (!inDocument) withTransition = false;
	      var self = this;
	      var realCb = function realCb() {
	        if (inDocument) self._callHook('detached');
	        if (cb) cb();
	      };
	      if (this._isFragment) {
	        removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	      } else {
	        var op = withTransition === false ? removeWithCb : removeWithTransition;
	        op(this.$el, this, realCb);
	      }
	      return this;
	    };
	
	    /**
	     * Shared DOM insertion function.
	     *
	     * @param {Vue} vm
	     * @param {Element} target
	     * @param {Function} [cb]
	     * @param {Boolean} [withTransition]
	     * @param {Function} op1 - op for non-transition insert
	     * @param {Function} op2 - op for transition insert
	     * @return vm
	     */
	
	    function insert(vm, target, cb, withTransition, op1, op2) {
	      target = query(target);
	      var targetIsDetached = !inDoc(target);
	      var op = withTransition === false || targetIsDetached ? op1 : op2;
	      var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	      if (vm._isFragment) {
	        mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	          op(node, target, vm);
	        });
	        cb && cb();
	      } else {
	        op(vm.$el, target, vm, cb);
	      }
	      if (shouldCallHook) {
	        vm._callHook('attached');
	      }
	      return vm;
	    }
	
	    /**
	     * Check for selectors
	     *
	     * @param {String|Element} el
	     */
	
	    function query(el) {
	      return typeof el === 'string' ? document.querySelector(el) : el;
	    }
	
	    /**
	     * Append operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function append(el, target, vm, cb) {
	      target.appendChild(el);
	      if (cb) cb();
	    }
	
	    /**
	     * InsertBefore operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Node} target
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function beforeWithCb(el, target, vm, cb) {
	      before(el, target);
	      if (cb) cb();
	    }
	
	    /**
	     * Remove operation that takes a callback.
	     *
	     * @param {Node} el
	     * @param {Vue} vm - unused
	     * @param {Function} [cb]
	     */
	
	    function removeWithCb(el, vm, cb) {
	      remove(el);
	      if (cb) cb();
	    }
	  }
	
	  function eventsAPI (Vue) {
	
	    /**
	     * Listen on the given `event` with `fn`.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$on = function (event, fn) {
	      (this._events[event] || (this._events[event] = [])).push(fn);
	      modifyListenerCount(this, event, 1);
	      return this;
	    };
	
	    /**
	     * Adds an `event` listener that will be invoked a single
	     * time then automatically removed.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$once = function (event, fn) {
	      var self = this;
	      function on() {
	        self.$off(event, on);
	        fn.apply(this, arguments);
	      }
	      on.fn = fn;
	      this.$on(event, on);
	      return this;
	    };
	
	    /**
	     * Remove the given callback for `event` or all
	     * registered callbacks.
	     *
	     * @param {String} event
	     * @param {Function} fn
	     */
	
	    Vue.prototype.$off = function (event, fn) {
	      var cbs;
	      // all
	      if (!arguments.length) {
	        if (this.$parent) {
	          for (event in this._events) {
	            cbs = this._events[event];
	            if (cbs) {
	              modifyListenerCount(this, event, -cbs.length);
	            }
	          }
	        }
	        this._events = {};
	        return this;
	      }
	      // specific event
	      cbs = this._events[event];
	      if (!cbs) {
	        return this;
	      }
	      if (arguments.length === 1) {
	        modifyListenerCount(this, event, -cbs.length);
	        this._events[event] = null;
	        return this;
	      }
	      // specific handler
	      var cb;
	      var i = cbs.length;
	      while (i--) {
	        cb = cbs[i];
	        if (cb === fn || cb.fn === fn) {
	          modifyListenerCount(this, event, -1);
	          cbs.splice(i, 1);
	          break;
	        }
	      }
	      return this;
	    };
	
	    /**
	     * Trigger an event on self.
	     *
	     * @param {String} event
	     * @return {Boolean} shouldPropagate
	     */
	
	    Vue.prototype.$emit = function (event) {
	      var cbs = this._events[event];
	      var shouldPropagate = !cbs;
	      if (cbs) {
	        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	        var args = toArray(arguments, 1);
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          var res = cbs[i].apply(this, args);
	          if (res === true) {
	            shouldPropagate = true;
	          }
	        }
	      }
	      return shouldPropagate;
	    };
	
	    /**
	     * Recursively broadcast an event to all children instances.
	     *
	     * @param {String} event
	     * @param {...*} additional arguments
	     */
	
	    Vue.prototype.$broadcast = function (event) {
	      // if no child has registered for this event,
	      // then there's no need to broadcast.
	      if (!this._eventsCount[event]) return;
	      var children = this.$children;
	      for (var i = 0, l = children.length; i < l; i++) {
	        var child = children[i];
	        var shouldPropagate = child.$emit.apply(child, arguments);
	        if (shouldPropagate) {
	          child.$broadcast.apply(child, arguments);
	        }
	      }
	      return this;
	    };
	
	    /**
	     * Recursively propagate an event up the parent chain.
	     *
	     * @param {String} event
	     * @param {...*} additional arguments
	     */
	
	    Vue.prototype.$dispatch = function () {
	      this.$emit.apply(this, arguments);
	      var parent = this.$parent;
	      while (parent) {
	        var shouldPropagate = parent.$emit.apply(parent, arguments);
	        parent = shouldPropagate ? parent.$parent : null;
	      }
	      return this;
	    };
	
	    /**
	     * Modify the listener counts on all parents.
	     * This bookkeeping allows $broadcast to return early when
	     * no child has listened to a certain event.
	     *
	     * @param {Vue} vm
	     * @param {String} event
	     * @param {Number} count
	     */
	
	    var hookRE = /^hook:/;
	    function modifyListenerCount(vm, event, count) {
	      var parent = vm.$parent;
	      // hooks do not get broadcasted so no need
	      // to do bookkeeping for them
	      if (!parent || !count || hookRE.test(event)) return;
	      while (parent) {
	        parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	        parent = parent.$parent;
	      }
	    }
	  }
	
	  function lifecycleAPI (Vue) {
	
	    /**
	     * Set instance target element and kick off the compilation
	     * process. The passed in `el` can be a selector string, an
	     * existing Element, or a DocumentFragment (for block
	     * instances).
	     *
	     * @param {Element|DocumentFragment|string} el
	     * @public
	     */
	
	    Vue.prototype.$mount = function (el) {
	      if (this._isCompiled) {
	        'development' !== 'production' && warn('$mount() should be called only once.');
	        return;
	      }
	      el = query(el);
	      if (!el) {
	        el = document.createElement('div');
	      }
	      this._compile(el);
	      this._initDOMHooks();
	      if (inDoc(this.$el)) {
	        this._callHook('attached');
	        ready.call(this);
	      } else {
	        this.$once('hook:attached', ready);
	      }
	      return this;
	    };
	
	    /**
	     * Mark an instance as ready.
	     */
	
	    function ready() {
	      this._isAttached = true;
	      this._isReady = true;
	      this._callHook('ready');
	    }
	
	    /**
	     * Teardown the instance, simply delegate to the internal
	     * _destroy.
	     */
	
	    Vue.prototype.$destroy = function (remove, deferCleanup) {
	      this._destroy(remove, deferCleanup);
	    };
	
	    /**
	     * Partially compile a piece of DOM and return a
	     * decompile function.
	     *
	     * @param {Element|DocumentFragment} el
	     * @param {Vue} [host]
	     * @return {Function}
	     */
	
	    Vue.prototype.$compile = function (el, host, scope, frag) {
	      return compile(el, this.$options, true)(this, el, host, scope, frag);
	    };
	  }
	
	  /**
	   * The exposed Vue constructor.
	   *
	   * API conventions:
	   * - public API methods/properties are prefixed with `$`
	   * - internal methods/properties are prefixed with `_`
	   * - non-prefixed properties are assumed to be proxied user
	   *   data.
	   *
	   * @constructor
	   * @param {Object} [options]
	   * @public
	   */
	
	  function Vue(options) {
	    this._init(options);
	  }
	
	  // install internals
	  initMixin(Vue);
	  stateMixin(Vue);
	  eventsMixin(Vue);
	  lifecycleMixin(Vue);
	  miscMixin(Vue);
	
	  // install APIs
	  globalAPI(Vue);
	  dataAPI(Vue);
	  domAPI(Vue);
	  eventsAPI(Vue);
	  lifecycleAPI(Vue);
	
	  var convertArray = vFor._postProcess;
	
	  /**
	   * Limit filter for arrays
	   *
	   * @param {Number} n
	   * @param {Number} offset (Decimal expected)
	   */
	
	  function limitBy(arr, n, offset) {
	    offset = offset ? parseInt(offset, 10) : 0;
	    return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	  }
	
	  /**
	   * Filter filter for arrays
	   *
	   * @param {String} search
	   * @param {String} [delimiter]
	   * @param {String} ...dataKeys
	   */
	
	  function filterBy(arr, search, delimiter) {
	    arr = convertArray(arr);
	    if (search == null) {
	      return arr;
	    }
	    if (typeof search === 'function') {
	      return arr.filter(search);
	    }
	    // cast to lowercase string
	    search = ('' + search).toLowerCase();
	    // allow optional `in` delimiter
	    // because why not
	    var n = delimiter === 'in' ? 3 : 2;
	    // extract and flatten keys
	    var keys = toArray(arguments, n).reduce(function (prev, cur) {
	      return prev.concat(cur);
	    }, []);
	    var res = [];
	    var item, key, val, j;
	    for (var i = 0, l = arr.length; i < l; i++) {
	      item = arr[i];
	      val = item && item.$value || item;
	      j = keys.length;
	      if (j) {
	        while (j--) {
	          key = keys[j];
	          if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	            res.push(item);
	            break;
	          }
	        }
	      } else if (contains(item, search)) {
	        res.push(item);
	      }
	    }
	    return res;
	  }
	
	  /**
	   * Filter filter for arrays
	   *
	   * @param {String} sortKey
	   * @param {String} reverse
	   */
	
	  function orderBy(arr, sortKey, reverse) {
	    arr = convertArray(arr);
	    if (!sortKey) {
	      return arr;
	    }
	    var order = reverse && reverse < 0 ? -1 : 1;
	    // sort on a copy to avoid mutating original array
	    return arr.slice().sort(function (a, b) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	      return a === b ? 0 : a > b ? order : -order;
	    });
	  }
	
	  /**
	   * String contain helper
	   *
	   * @param {*} val
	   * @param {String} search
	   */
	
	  function contains(val, search) {
	    var i;
	    if (isPlainObject(val)) {
	      var keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        if (contains(val[keys[i]], search)) {
	          return true;
	        }
	      }
	    } else if (isArray(val)) {
	      i = val.length;
	      while (i--) {
	        if (contains(val[i], search)) {
	          return true;
	        }
	      }
	    } else if (val != null) {
	      return val.toString().toLowerCase().indexOf(search) > -1;
	    }
	  }
	
	  var digitsRE = /(\d{3})(?=\d)/g;
	
	  // asset collections must be a plain object.
	  var filters = {
	
	    orderBy: orderBy,
	    filterBy: filterBy,
	    limitBy: limitBy,
	
	    /**
	     * Stringify value.
	     *
	     * @param {Number} indent
	     */
	
	    json: {
	      read: function read(value, indent) {
	        return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	      },
	      write: function write(value) {
	        try {
	          return JSON.parse(value);
	        } catch (e) {
	          return value;
	        }
	      }
	    },
	
	    /**
	     * 'abc' => 'Abc'
	     */
	
	    capitalize: function capitalize(value) {
	      if (!value && value !== 0) return '';
	      value = value.toString();
	      return value.charAt(0).toUpperCase() + value.slice(1);
	    },
	
	    /**
	     * 'abc' => 'ABC'
	     */
	
	    uppercase: function uppercase(value) {
	      return value || value === 0 ? value.toString().toUpperCase() : '';
	    },
	
	    /**
	     * 'AbC' => 'abc'
	     */
	
	    lowercase: function lowercase(value) {
	      return value || value === 0 ? value.toString().toLowerCase() : '';
	    },
	
	    /**
	     * 12345 => $12,345.00
	     *
	     * @param {String} sign
	     */
	
	    currency: function currency(value, _currency) {
	      value = parseFloat(value);
	      if (!isFinite(value) || !value && value !== 0) return '';
	      _currency = _currency != null ? _currency : '$';
	      var stringified = Math.abs(value).toFixed(2);
	      var _int = stringified.slice(0, -3);
	      var i = _int.length % 3;
	      var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	      var _float = stringified.slice(-3);
	      var sign = value < 0 ? '-' : '';
	      return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	    },
	
	    /**
	     * 'item' => 'items'
	     *
	     * @params
	     *  an array of strings corresponding to
	     *  the single, double, triple ... forms of the word to
	     *  be pluralized. When the number to be pluralized
	     *  exceeds the length of the args, it will use the last
	     *  entry in the array.
	     *
	     *  e.g. ['single', 'double', 'triple', 'multiple']
	     */
	
	    pluralize: function pluralize(value) {
	      var args = toArray(arguments, 1);
	      return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	    },
	
	    /**
	     * Debounce a handler function.
	     *
	     * @param {Function} handler
	     * @param {Number} delay = 300
	     * @return {Function}
	     */
	
	    debounce: function debounce(handler, delay) {
	      if (!handler) return;
	      if (!delay) {
	        delay = 300;
	      }
	      return _debounce(handler, delay);
	    }
	  };
	
	  var partial = {
	
	    priority: 1750,
	
	    params: ['name'],
	
	    // watch changes to name for dynamic partials
	    paramWatchers: {
	      name: function name(value) {
	        vIf.remove.call(this);
	        if (value) {
	          this.insert(value);
	        }
	      }
	    },
	
	    bind: function bind() {
	      this.anchor = createAnchor('v-partial');
	      replace(this.el, this.anchor);
	      this.insert(this.params.name);
	    },
	
	    insert: function insert(id) {
	      var partial = resolveAsset(this.vm.$options, 'partials', id);
	      if (true) {
	        assertAsset(partial, 'partial', id);
	      }
	      if (partial) {
	        this.factory = new FragmentFactory(this.vm, partial);
	        vIf.insert.call(this);
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.frag) {
	        this.frag.destroy();
	      }
	    }
	  };
	
	  // This is the elementDirective that handles <content>
	  // transclusions. It relies on the raw content of an
	  // instance being stored as `$options._content` during
	  // the transclude phase.
	
	  var slot = {
	
	    priority: 1750,
	
	    params: ['name'],
	
	    bind: function bind() {
	      var host = this.vm;
	      var raw = host.$options._content;
	      var content;
	      if (!raw) {
	        this.fallback();
	        return;
	      }
	      var context = host._context;
	      var slotName = this.params.name;
	      if (!slotName) {
	        // Default content
	        var self = this;
	        var compileDefaultContent = function compileDefaultContent() {
	          self.compile(extractFragment(raw.childNodes, raw, true), context, host);
	        };
	        if (!host._isCompiled) {
	          // defer until the end of instance compilation,
	          // because the default outlet must wait until all
	          // other possible outlets with selectors have picked
	          // out their contents.
	          host.$once('hook:compiled', compileDefaultContent);
	        } else {
	          compileDefaultContent();
	        }
	      } else {
	        var selector = '[slot="' + slotName + '"]';
	        var nodes = raw.querySelectorAll(selector);
	        if (nodes.length) {
	          content = extractFragment(nodes, raw);
	          if (content.hasChildNodes()) {
	            this.compile(content, context, host);
	          } else {
	            this.fallback();
	          }
	        } else {
	          this.fallback();
	        }
	      }
	    },
	
	    fallback: function fallback() {
	      this.compile(extractContent(this.el, true), this.vm);
	    },
	
	    compile: function compile(content, context, host) {
	      if (content && context) {
	        var scope = host ? host._scope : this._scope;
	        this.unlink = context.$compile(content, host, scope, this._frag);
	      }
	      if (content) {
	        replace(this.el, content);
	      } else {
	        remove(this.el);
	      }
	    },
	
	    unbind: function unbind() {
	      if (this.unlink) {
	        this.unlink();
	      }
	    }
	  };
	
	  /**
	   * Extract qualified content nodes from a node list.
	   *
	   * @param {NodeList} nodes
	   * @param {Element} parent
	   * @param {Boolean} main
	   * @return {DocumentFragment}
	   */
	
	  function extractFragment(nodes, parent, main) {
	    var frag = document.createDocumentFragment();
	    for (var i = 0, l = nodes.length; i < l; i++) {
	      var node = nodes[i];
	      // if this is the main outlet, we want to skip all
	      // previously selected nodes;
	      // otherwise, we want to mark the node as selected.
	      // clone the node so the original raw content remains
	      // intact. this ensures proper re-compilation in cases
	      // where the outlet is inside a conditional block
	      if (main && !node.__v_selected) {
	        append(node);
	      } else if (!main && node.parentNode === parent) {
	        node.__v_selected = true;
	        append(node);
	      }
	    }
	    return frag;
	
	    function append(node) {
	      if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	        node = parseTemplate(node);
	      }
	      node = cloneNode(node);
	      frag.appendChild(node);
	    }
	  }
	
	  var elementDirectives = {
	    slot: slot,
	    partial: partial
	  };
	
	  Vue.version = '1.0.10';
	
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */
	
	  Vue.options = {
	    directives: publicDirectives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };
	
	  // devtools global hook
	  /* istanbul ignore if */
	  if (true) {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	    }
	  }
	
	  return Vue;
	
	}));

/***/ },
/* 2 */
/*!************************************!*\
  !*** ../web/src/dep/vue-router.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.7
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';
	
	  var babelHelpers = {};
	
	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }
	
	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;
	
	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }
	
	      this.matcher.add(this.path, target);
	
	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };
	
	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }
	
	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },
	
	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;
	
	      var match = generateMatch(path, matcher, delegate);
	
	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }
	
	      callback(match);
	    }
	  };
	
	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;
	
	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }
	
	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }
	
	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }
	
	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;
	
	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);
	
	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }
	
	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();
	
	    callback(generateMatch("", matcher, this.delegate));
	
	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }
	
	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }
	
	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat
	
	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;
	
	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },
	
	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },
	
	    generate: function generate() {
	      return this.string;
	    }
	  };
	
	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },
	
	    regex: function regex() {
	      return "([^/]+)";
	    },
	
	    generate: function generate(params) {
	      return params[this.name];
	    }
	  };
	
	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },
	
	    regex: function regex() {
	      return "(.+)";
	    },
	
	    generate: function generate(params) {
	      return params[this.name];
	    }
	  };
	
	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };
	
	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }
	
	    var segments = route.split("/"),
	        results = [];
	
	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;
	
	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }
	
	    specificity.val = +specificity.val;
	
	    return results;
	  }
	
	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.
	
	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }
	
	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];
	
	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	        if (isEqual) {
	          return child;
	        }
	      }
	    },
	
	    put: function put(charSpec) {
	      var state;
	
	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }
	
	      // Make a new state for the character spec
	      state = new State(charSpec);
	
	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);
	
	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }
	
	      // Return the new state
	      return state;
	    },
	
	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;
	
	      // DEBUG "  " + debugState(this)
	      var returned = [];
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];
	
	        charSpec = child.charSpec;
	
	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }
	
	      return returned;
	    }
	
	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };
	
	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }
	
	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/
	
	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }
	
	  function recognizeChar(states, ch) {
	    var nextStates = [];
	
	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];
	
	      nextStates = nextStates.concat(state.match(ch));
	    }
	
	    return nextStates;
	  }
	
	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };
	
	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });
	
	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);
	
	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};
	
	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }
	
	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }
	
	    return result;
	  }
	
	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;
	
	      currentState = currentState.put(ch);
	    });
	
	    return currentState;
	  }
	
	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return decodeURIComponent(part);
	  }
	
	  // The main interface
	
	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };
	
	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;
	
	      var isEmpty = true;
	
	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];
	
	        var segments = parse(route.path, names, specificity);
	
	        allSegments = allSegments.concat(segments);
	
	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];
	
	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }
	
	          isEmpty = false;
	
	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";
	
	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }
	
	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }
	
	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }
	
	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;
	
	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },
	
	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }
	
	      return result;
	    },
	
	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },
	
	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      var segments = route.segments;
	
	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        output += "/";
	        output += segment.generate(params);
	      }
	
	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }
	
	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }
	
	      return output;
	    },
	
	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }
	
	      if (pairs.length === 0) {
	        return '';
	      }
	
	      return "?" + pairs.join("&");
	    },
	
	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },
	
	    recognize: function recognize(path) {
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;
	
	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        queryParams = this.parseQueryString(queryString);
	      }
	
	      path = decodeURI(path);
	
	      // DEBUG GROUP path
	
	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }
	
	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }
	
	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }
	
	      // END DEBUG GROUP
	
	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }
	
	      states = sortSolutions(solutions);
	
	      var state = solutions[0];
	
	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };
	
	  RouteRecognizer.prototype.map = map;
	
	  RouteRecognizer.VERSION = '0.1.9';
	
	  var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */
	
	  function warn(msg) {
	    /* istanbul ignore next */
	    if (window.console) {
	      console.warn('[vue-router] ' + msg);
	      /* istanbul ignore if */
	      if (!exports$1.Vue || exports$1.Vue.config.debug) {
	        console.warn(new Error('warning stack trace:').stack);
	      }
	    }
	  }
	
	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */
	
	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }
	
	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */
	
	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }
	
	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */
	
	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }
	
	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */
	
	  var resolver = undefined;
	
	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }
	
	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */
	
	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};
	
	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      if (!val) {
	        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }
	
	  var hashRE = /#.*$/;
	
	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);
	
	      if (root) {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }
	
	    HTML5History.prototype.start = function start() {
	      var _this = this;
	
	      this.listener = function (e) {
	        var url = decodeURI(location.pathname + location.search);
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };
	
	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };
	
	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '');
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };
	
	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };
	
	    return HTML5History;
	  })();
	
	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);
	
	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }
	
	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };
	
	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };
	
	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };
	
	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };
	
	    return HashHistory;
	  })();
	
	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);
	
	      this.onChange = onChange;
	      this.currentPath = '/';
	    }
	
	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };
	
	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };
	
	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };
	
	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };
	
	    return AbstractHistory;
	  })();
	
	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */
	
	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }
	
	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }
	
	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }
	
	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }
	
	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */
	
	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      // fix 1.0.0-alpha.3 compat
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }
	
	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');
	
	    view.depth = depth;
	    view.activated = false;
	
	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);
	
	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);
	      // handle keep-alive.
	      // if the view has keep-alive, the child vm is not actually
	      // destroyed - its nested views will still be in router's
	      // view list. We need to removed these child views and
	      // cache them on the child vm.
	      if (view.keepAlive) {
	        var views = transition.router._views;
	        var i = views.indexOf(view);
	        if (i > 0) {
	          transition.router._views = views.slice(i);
	          if (view.childVM) {
	            view.childVM._routerViews = views.slice(0, i);
	          }
	        }
	      }
	
	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        }
	      });
	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedViews = component._routerViews;
	        if (cachedViews) {
	          transition.router._views = cachedViews.concat(transition.router._views);
	          view.childView = cachedViews[cachedViews.length - 1];
	          component._routerViews = null;
	        }
	      }
	    }
	
	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };
	
	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };
	
	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, insert, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        insert();
	      }
	    };
	
	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup
	      });
	    } else {
	      afterActivate();
	    }
	  }
	
	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */
	
	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }
	
	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */
	
	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function (data, onError) {
	      // merge data from multiple data hooks
	      if (Array.isArray(data) && data._needMerge) {
	        data = data.reduce(function (res, obj) {
	          if (isPlainObject(obj)) {
	            Object.keys(obj).forEach(function (key) {
	              res[key] = obj[key];
	            });
	          }
	          return res;
	        }, Object.create(null));
	      }
	      // handle promise sugar syntax
	      var promises = [];
	      if (isPlainObject(data)) {
	        Object.keys(data).forEach(function (key) {
	          var val = data[key];
	          if (isPromise(val)) {
	            promises.push(val.then(function (resolvedVal) {
	              component.$set(key, resolvedVal);
	            }));
	          } else {
	            component.$set(key, val);
	          }
	        });
	      }
	      if (!promises.length) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      } else {
	        promises[0].constructor.all(promises).then(function (_) {
	          component.$loadingRouteData = false;
	          cb && cb();
	        }, onError);
	      }
	    }, {
	      cleanup: cleanup,
	      expectData: true
	    });
	  }
	
	  function isPlainObject(obj) {
	    return Object.prototype.toString.call(obj) === '[object Object]';
	  }
	
	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */
	
	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);
	
	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	
	      // start by determine the queues
	
	      // the deactivate queue is an array of router-view
	      // directive instances that need to be deactivated,
	      // deepest first.
	      this.deactivateQueue = router._views;
	
	      // check the default handler of the deepest match
	      var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	      // the activate queue is an array of route handlers
	      // that need to be activated
	      this.activateQueue = matched.map(function (match) {
	        return match.handler;
	      });
	    }
	
	    /**
	     * Abort current transition and return to previous location.
	     */
	
	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };
	
	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */
	
	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };
	
	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;
	      var daq = this.deactivateQueue;
	      var aq = this.activateQueue;
	      var rdaq = daq.slice().reverse();
	      var reuseQueue = undefined;
	
	      // 1. Reusability phase
	      var i = undefined;
	      for (i = 0; i < rdaq.length; i++) {
	        if (!canReuse(rdaq[i], aq[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = rdaq.slice(0, i);
	        daq = rdaq.slice(i).reverse();
	        aq = aq.slice(i);
	      }
	
	      // 2. Validation phase
	      transition.runQueue(daq, canDeactivate, function () {
	        transition.runQueue(aq, canActivate, function () {
	          transition.runQueue(daq, deactivate, function () {
	            // 3. Activation phase
	
	            // Update router current route
	            transition.router._onTransitionValidated(transition);
	
	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              reuse(view, transition);
	            });
	
	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (daq.length) {
	              var view = daq[daq.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };
	
	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };
	
	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} expectData
	     *                 - {Function} cleanup
	     */
	
	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$expectData = _ref.expectData;
	      var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	      var cleanup = _ref.cleanup;
	
	      var transition = this;
	      var nextCalled = false;
	
	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };
	
	      // handle errors
	      var onError = function onError(err) {
	        // cleanup indicates an after-activation hook,
	        // so instead of aborting we just let the transition
	        // finish.
	        cleanup ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };
	
	      // advance the transition to the next step
	      var next = function next(data) {
	        if (nextCalled) {
	          warn('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb(data, onError);
	      };
	
	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };
	
	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }
	
	      // handle boolean/promise return values
	      var resIsPromise = isPromise(res);
	      if (expectBoolean) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (resIsPromise) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onError);
	        } else if (!hook.length) {
	          next(res);
	        }
	      } else if (resIsPromise) {
	        res.then(next, onError);
	      } else if (expectData && isPlainOjbect(res) || !hook.length) {
	        next(res);
	      }
	    };
	
	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */
	
	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;
	
	      if (Array.isArray(hooks)) {
	        (function () {
	          var res = [];
	          res._needMerge = true;
	          var onError = undefined;
	          _this.runQueue(hooks, function (hook, _, next) {
	            if (!_this.aborted) {
	              _this.callHook(hook, context, function (r, onError) {
	                if (r) res.push(r);
	                onError = onError;
	                next();
	              }, options);
	            }
	          }, function () {
	            cb(res, onError);
	          });
	        })();
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };
	
	    return RouteTransition;
	  })();
	
	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }
	
	  var internalKeysRE = /^(component|subRoutes)$/;
	
	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */
	
	  var Route = function Route(path, router) {
	    var _this = this;
	
	    babelHelpers.classCallCheck(this, Route);
	
	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    this.router = router;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };
	
	  function applyOverride (Vue) {
	
	    var _ = Vue.util;
	
	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      var root = options._parent || options.parent || this;
	      var route = root.$route;
	      if (route) {
	        route.router._children.push(this);
	        if (!this.$route) {
	          /* istanbul ignore if */
	          if (this._defineMeta) {
	            // 0.12
	            this._defineMeta('$route', route);
	          } else {
	            // 1.0
	            _.defineReactive(this, '$route', route);
	          }
	        }
	      }
	      init.call(this, options);
	    };
	
	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed) {
	        var route = this.$root.$route;
	        if (route) {
	          route.router._children.$remove(this);
	        }
	        destroy.apply(this, arguments);
	      }
	    };
	
	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        _.extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }
	
	  function View (Vue) {
	
	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);
	
	    // with some overrides
	    _.extend(viewDef, {
	
	      _isRouterView: true,
	
	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);
	
	        // all we need to do here is registering this view
	        // in the router. actual component switching will be
	        // managed by the pipeline.
	        var router = this.router = route.router;
	        router._views.unshift(this);
	
	        // note the views are in reverse order.
	        var parentView = router._views[1];
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          parentView.childView = this;
	        }
	
	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },
	
	      unbind: function unbind() {
	        this.router._views.$remove(this);
	        componentDef.unbind.call(this);
	      }
	    });
	
	    Vue.elementDirective('router-view', viewDef);
	  }
	
	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;
	
	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	
	    var _ = Vue.util;
	
	    Vue.directive('link', {
	
	      bind: function bind() {
	        var _this = this;
	
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn('v-link can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        var router = vm.$route.router;
	        this.handler = function (e) {
	          // don't redirect with control keys
	          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	          // don't redirect when preventDefault called
	          if (e.defaultPrevented) return;
	          // don't redirect on right click
	          if (e.button !== 0) return;
	
	          var target = _this.target;
	          var go = function go(target) {
	            e.preventDefault();
	            if (target != null) {
	              router.go(target);
	            }
	          };
	
	          if (_this.el.tagName === 'A' || e.target === _this.el) {
	            // v-link on <a v-link="'path'">
	            go(target);
	          } else {
	            // v-link delegate on <div v-link>
	            var el = e.target;
	            while (el && el.tagName !== 'A' && el !== _this.el) {
	              el = el.parentNode;
	            }
	            if (!el) return;
	            if (el.tagName !== 'A' || !el.href) {
	              // allow not anchor
	              go(target);
	            } else if (sameOrigin(el)) {
	              go({
	                path: el.pathname,
	                replace: target && target.replace,
	                append: target && target.append
	              });
	            }
	          }
	        };
	        this.el.addEventListener('click', this.handler);
	        // manage active link class
	        this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	      },
	
	      update: function update(path) {
	        var router = this.vm.$route.router;
	        var append = undefined;
	        this.target = path;
	        if (_.isObject(path)) {
	          append = path.append;
	          this.exact = path.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = path.activeClass;
	        }
	        path = this.path = router._stringifyPath(path);
	        this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	        this.updateClasses(this.vm.$route.path);
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	        if (this.el.tagName === 'A') {
	          if (href) {
	            this.el.href = href;
	          } else {
	            this.el.removeAttribute('href');
	          }
	        }
	      },
	
	      updateClasses: function updateClasses(path) {
	        var el = this.el;
	        var router = this.vm.$route.router;
	        var activeClass = this.activeClass || router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass !== activeClass) {
	          _.removeClass(el, this.prevActiveClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            _.addClass(el, activeClass);
	          } else {
	            _.removeClass(el, activeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            _.addClass(el, activeClass);
	          } else {
	            _.removeClass(el, activeClass);
	          }
	        }
	      },
	
	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });
	
	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }
	  }
	
	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };
	
	  // late bind during install
	  var Vue = undefined;
	
	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */
	
	  var Router = (function () {
	    function Router() {
	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);
	
	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }
	
	      // Vue instances
	      this.app = null;
	      this._views = [];
	      this._children = [];
	
	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();
	
	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];
	
	      // feature detection
	      this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;
	
	      // history mode
	      this._abstract = abstract;
	      this._hashbang = hashbang;
	      this._history = this._hasPushState && history;
	
	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	
	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	      var History = historyBackends[this.mode];
	      var self = this;
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          self._match(path, state, anchor);
	        }
	      });
	    }
	
	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */
	
	    // API ===================================================
	
	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */
	
	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	    };
	
	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */
	
	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	    };
	
	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	    };
	
	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	    };
	
	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	    };
	
	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	    };
	
	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */
	
	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this._stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };
	
	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */
	
	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };
	
	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */
	
	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }
	      this.history.start();
	    };
	
	    /**
	     * Stop listening to route changes.
	     */
	
	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };
	
	    // Internal methods ======================================
	
	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */
	
	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };
	
	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */
	
	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };
	
	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */
	
	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };
	
	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */
	
	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };
	
	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */
	
	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this = this;
	
	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this, realPath);
	        }
	      }]);
	    };
	
	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */
	
	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };
	
	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this2 = this;
	
	      if (this._checkGuard(path)) {
	        return;
	      }
	
	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;
	
	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }
	
	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);
	
	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;
	
	      if (!this.app) {
	        // initial render
	        this.app = new this._appConstructor({
	          el: this._appContainer,
	          _meta: {
	            $route: route
	          }
	        });
	      }
	
	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this2._postTransition(route, state, anchor);
	        });
	      };
	
	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this2._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }
	
	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }
	
	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };
	
	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */
	
	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };
	
	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };
	
	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */
	
	    Router.prototype._stringifyPath = function _stringifyPath(path) {
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var params = path.params || {};
	          if (path.query) {
	            params.queryParams = path.query;
	          }
	          return this._recognizer.generate(path.name, params);
	        } else if (path.path) {
	          var fullPath = path.path;
	          if (path.query) {
	            var query = this._recognizer.generateQueryString(path.query);
	            if (fullPath.indexOf('?') > -1) {
	              fullPath += '&' + query.slice(1);
	            } else {
	              fullPath += query;
	            }
	          }
	          return fullPath;
	        } else {
	          return '';
	        }
	      } else {
	        return path ? path + '' : '';
	      }
	    };
	
	    return Router;
	  })();
	
	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn('invalid component for route "' + path + '".');
	    }
	  }
	
	  /* Installation */
	
	  Router.installed = false;
	
	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */
	
	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };
	
	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }
	
	  return Router;
	
	}));
	//# sourceMappingURL=vue-router.js.map

/***/ },
/* 3 */
/*!************************************!*\
  !*** ../web/src/dep/normalize.css ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./normalize.css */ 4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./normalize.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./normalize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/*!****************************************************!*\
  !*** ../~/css-loader!../web/src/dep/normalize.css ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n    font-family: sans-serif; /* 1 */\n    -ms-text-size-adjust: 100%; /* 2 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n    margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n    display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n    display: inline-block; /* 1 */\n    vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n    display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n    background-color: transparent;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n    outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n    font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n    font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n    font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n    border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n    margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n    overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, monospace;\n    font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n    color: inherit; /* 1 */\n    font: inherit; /* 2 */\n    margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n    overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n    text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n    -webkit-appearance: button; /* 2 */\n    cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n    cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n    line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box; /* 2 */\n    box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n    border: 0; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n    overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n    font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\ntd,\nth {\n    padding: 0;\n}", ""]);
	
	// exports


/***/ },
/* 5 */
/*!***************************************!*\
  !*** ../~/css-loader/lib/css-base.js ***!
  \***************************************/
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
/* 6 */
/*!**************************************!*\
  !*** ../~/style-loader/addStyles.js ***!
  \**************************************/
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
		if(true) {
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
		var sourceMap = obj.sourceMap;
	
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
		var media = obj.media;
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
/* 7 */
/*!***************************!*\
  !*** ../web/src/main.tpl ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = "<header-c></header-c>\n<div>---</div>";

/***/ },
/* 8 */
/*!**********************************************!*\
  !*** ../web/src/components/header/header.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var template = __webpack_require__(/*! ./header.tpl */ 9);
	
	// 依赖的样式
	__webpack_require__(/*! ./header.css */ 10);
	__webpack_require__(/*! ../icon/menu-button.css */ 13);
	
	var header = Vue.extend({
	    template: template
	});
	
	module.exports = header;

/***/ },
/* 9 */
/*!***********************************************!*\
  !*** ../web/src/components/header/header.tpl ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = "<header class=\"page-header\">\n    <h1>\n        <span class=\"main-title\">龙则的个人站点</span>\n        <span class=\"subtitle\">记录我在北京的生活与感悟，记录在某大公司的技术(主要是前端)研究</span>\n    </h1>\n    <nav class=\"nav\">\n        <button class=\"icon-menu-button\"></button>\n        <menu>\n            <a class=\"item\">Home</a>\n            <a class=\"item\">前端技术</a>\n            <a class=\"item\">技术梳理</a>\n            <a class=\"item\">本站成书</a>\n            <a class=\"item\">本站 & 站主</a>\n        </menu>\n    </nav>\n</header>";

/***/ },
/* 10 */
/*!***********************************************!*\
  !*** ../web/src/components/header/header.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./header.css */ 11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./header.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./header.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/*!***************************************************************!*\
  !*** ../~/css-loader!../web/src/components/header/header.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/* 本站定义的全局样式 */\nmenu {\n    margin: 0;\n    padding: 0;\n}\n/* 头部的标题和导航 */\n/* TODO 高度143px，一个前端工程师的自我修养 */\n.page-header {\n    font-size: 16px;\n    background-color: #f2f2f2;\n    overflow: hidden;\n}\n.page-header h1 {\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    height: 64px;\n    max-width: 800px;\n    margin: 10px auto;\n    padding: 3px 0 3px 77px;\n    font-weight: 200;\n    background: center left url(" + __webpack_require__(/*! ./picture.png */ 12) + ") no-repeat;\n    background-size: contain;\n}\n.page-header h1 .main-title {\n    font-size: 16px;\n    line-height: 20px;\n    color: #333;\n}\n.page-header h1 .subtitle {\n    display: block;\n    font-size: 14px;\n    line-height: 26px;\n    color: #666;\n}\n.page-header .icon-menu-button {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n}\n/* 导航 */\n.page-header .nav {\n    width: 800px;\n    position: absolute;\n    top: 25px;\n    left: 50%;\n    margin-left: -400px;\n}\n.page-header .nav menu {\n    display: none;\n    position: absolute;\n    top: 54px;\n    right: 0;\n    margin: 0;\n    background-color: #f2f2f2;\n    border: solid 1px #fff;\n    border-top: none;\n}\n.page-header .nav .item {\n    display: block;\n    line-height: 2.8em;\n    margin: 0 15px;\n    padding: 0 2em;\n    border-bottom: 1px solid #f8f8f8;\n    color: #606566;\n    font-size: 14px;\n}\n.page-header .nav .item:last-child {\n    border: none;\n}\n/* 小于 500 像素时 调整样式为移动端 */\n@media screen and (max-width: 500px) {\n    .page-header h1 .main-title {\n        line-height: 64px;\n    }\n    .page-header h1 .subtitle {\n        display: none;\n    }\n}\n/* 小于800时需调整导航方案 */\n@media screen and (max-width: 800px) {\n    .page-header .nav {\n        width: auto;\n        max-width: 800px;\n        right: 0;\n        margin-left: 0;\n    }\n}\n.page-body {\n    max-width: 800px;\n    margin: 0 auto;\n    line-height: 1.5;\n    color: #333;\n}\n.page-body a {\n    color: inherit;\n    text-decoration: none;\n}", ""]);
	
	// exports


/***/ },
/* 12 */
/*!************************************************!*\
  !*** ../web/src/components/header/picture.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 13 */
/*!**************************************************!*\
  !*** ../web/src/components/icon/menu-button.css ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./menu-button.css */ 14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./menu-button.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./menu-button.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/*!******************************************************************!*\
  !*** ../~/css-loader!../web/src/components/icon/menu-button.css ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/* component/icon/menu-button.css */\n\n/* Menu 按钮图标 */\n.icon-menu-button {\n    position: relative;\n    width: 35px;\n    height: 30px;\n    padding: 14px 5px;\n    background-color: #006a00;\n    -webkit-background-clip: content-box;\n    -moz-background-clip: content-box;\n    background-clip: content-box;\n    box-sizing: border-box;\n    border: none;\n    outline: none;\n}\n.icon-menu-button:before,\n.icon-menu-button:after {\n    position: absolute;\n    display: block;\n    width: 25px;\n    height: 2px;\n    background-color: #006a00;\n    content: \"\\200B\";\n}\n\n.icon-menu-button:before {\n    top: 6px;\n}\n.icon-menu-button:after {\n    bottom: 6px;\n}", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map