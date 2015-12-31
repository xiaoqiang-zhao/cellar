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
/*!******************************************!*\
  !*** ../web/src/components/main/main.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 程序入口
	 *
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	
	// 依赖的库
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var VueRouter = __webpack_require__(/*! ../../dep/vue-router.js */ 2);
	
	// 样式重置
	__webpack_require__(/*! ../../dep/normalize.css */ 3);
	// 组织组件时需要一个容器，这里定义容器的样式(包括响应式)
	__webpack_require__(/*! ./main.css */ 7);
	
	var template = __webpack_require__(/*! ./main.tpl */ 9);
	var header = __webpack_require__(/*! ../header/header.js */ 10);
	var footer = __webpack_require__(/*! ../footer/footer.js */ 17);
	
	var body = document.body;
	var app = new Vue({
	    el: body,
	    replace: false,
	    template: template,
	    components: {
	        'header-c': header,
	        'footer-c': footer
	    }
	});
	
	// 路由配置
	Vue.use(VueRouter);
	var router = new VueRouter();
	var articleList = __webpack_require__(/*! ../article-list/article-list.js */ 21);
	var articleDetail = __webpack_require__(/*! ../article-detail/article-detail.js */ 28);
	router.map({
	    '': {
	        component: articleList
	    },
	    '/articles': {
	        component: articleList
	    },
	    '/articles/:id': {
	        component: articleDetail
	    }
	});
	
	router.start(Vue.extend({}), body);

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
/*!*******************************************!*\
  !*** ../web/src/components/main/main.css ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./main.css */ 8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/*!***********************************************************!*\
  !*** ../~/css-loader!../web/src/components/main/main.css ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * src/components/main.css\n *\n * 组织组件时需要一个容器，这里定义容器的样式(包括响应式)\n */\n\n.page-body {\n    position: relative;\n    max-width: 1000px;\n    margin: 0 auto;\n    line-height: 1.5;\n    color: #333;\n}\n.page-body a {\n    color: inherit;\n    text-decoration: none;\n    word-wrap: break-word;\n}", ""]);
	
	// exports


/***/ },
/* 9 */
/*!*******************************************!*\
  !*** ../web/src/components/main/main.tpl ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = "<header-c></header-c>\n<div class=\"page-body\">\n    <router-view></router-view>\n</div>\n<footer-c></footer-c>";

/***/ },
/* 10 */
/*!**********************************************!*\
  !*** ../web/src/components/header/header.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var template = __webpack_require__(/*! ./header.tpl */ 11);
	
	// 依赖的样式
	__webpack_require__(/*! ./header.css */ 12);
	__webpack_require__(/*! ../icon/menu-button.css */ 15);
	
	var header = Vue.extend({
	    template: template
	});
	
	module.exports = header;

/***/ },
/* 11 */
/*!***********************************************!*\
  !*** ../web/src/components/header/header.tpl ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = "<header class=\"page-header\">\n    <h1>\n        <span class=\"main-title\">龙则的个人站点</span>\n        <span class=\"subtitle\">记录我在北京的生活与感悟，记录在某大公司的技术(主要是前端)研究</span>\n    </h1>\n    <nav class=\"nav\">\n        <button class=\"icon-menu-button\"></button>\n        <menu>\n            <a class=\"item\">Home</a>\n            <a class=\"item\">前端技术</a>\n            <a class=\"item\">技术梳理</a>\n            <a class=\"item\">本站成书</a>\n            <a class=\"item\">本站 & 站主</a>\n        </menu>\n    </nav>\n</header>";

/***/ },
/* 12 */
/*!***********************************************!*\
  !*** ../web/src/components/header/header.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./header.css */ 13);
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
/* 13 */
/*!***************************************************************!*\
  !*** ../~/css-loader!../web/src/components/header/header.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * src/components/header/header.css\n *\n * 头部的标题和导航\n */\n/* TODO 高度143px，一个前端工程师的自我修养 */\n.page-header {\n    font-size: 16px;\n    background-color: #f2f2f2;\n    overflow: hidden;\n}\n.page-header h1 {\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    height: 64px;\n    max-width: 800px;\n    margin: 10px auto;\n    padding: 3px 0 3px 77px;\n    font-weight: 200;\n    background: center left url(" + __webpack_require__(/*! ./picture.png */ 14) + ") no-repeat;\n    background-size: contain;\n}\n.page-header h1 .main-title {\n    font-size: 16px;\n    line-height: 20px;\n    color: #333;\n}\n.page-header h1 .subtitle {\n    display: block;\n    font-size: 14px;\n    line-height: 26px;\n    color: #666;\n}\n.page-header .icon-menu-button {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n}\n/* 导航 */\n.page-header .nav {\n    width: 800px;\n    position: absolute;\n    top: 25px;\n    left: 50%;\n    margin-left: -400px;\n    display: none; /* 暂时隐藏 */\n}\n.page-header .nav menu {\n    display: none;\n    position: absolute;\n    top: 54px;\n    right: 0;\n    margin: 0;\n    padding: 0;\n    background-color: #f2f2f2;\n    border: solid 1px #fff;\n    border-top: none;\n}\n.page-header .nav .item {\n    display: block;\n    line-height: 2.8em;\n    margin: 0 15px;\n    padding: 0 2em;\n    border-bottom: 1px solid #f8f8f8;\n    color: #606566;\n    font-size: 14px;\n}\n.page-header .nav .item:last-child {\n    border: none;\n}\n\n/* 小于 500 像素时 调整样式为移动端 */\n@media screen and (max-width: 500px) {\n    .page-header h1 .main-title {\n        line-height: 64px;\n    }\n    .page-header h1 .subtitle {\n        display: none;\n    }\n}\n/* 小于800时需调整导航方案 */\n@media screen and (max-width: 800px) {\n    .page-header .nav {\n        width: auto;\n        max-width: 800px;\n        right: 0;\n        margin-left: 0;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 14 */
/*!************************************************!*\
  !*** ../web/src/components/header/picture.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 15 */
/*!**************************************************!*\
  !*** ../web/src/components/icon/menu-button.css ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./menu-button.css */ 16);
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
/* 16 */
/*!******************************************************************!*\
  !*** ../~/css-loader!../web/src/components/icon/menu-button.css ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/* component/icon/menu-button.css */\n\n/* Menu 按钮图标 */\n.icon-menu-button {\n    position: relative;\n    width: 35px;\n    height: 30px;\n    padding: 14px 5px;\n    background-color: #006a00;\n    -webkit-background-clip: content-box;\n    -moz-background-clip: content-box;\n    background-clip: content-box;\n    box-sizing: border-box;\n    border: none;\n    outline: none;\n}\n.icon-menu-button:before,\n.icon-menu-button:after {\n    position: absolute;\n    display: block;\n    width: 25px;\n    height: 2px;\n    background-color: #006a00;\n    content: \"\\200B\";\n}\n\n.icon-menu-button:before {\n    top: 6px;\n}\n.icon-menu-button:after {\n    bottom: 6px;\n}", ""]);
	
	// exports


/***/ },
/* 17 */
/*!**********************************************!*\
  !*** ../web/src/components/footer/footer.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var template = __webpack_require__(/*! ./footer.tpl */ 18);
	
	// 依赖的样式
	__webpack_require__(/*! ./footer.css */ 19);
	
	var footer = Vue.extend({
	    template: template
	});
	
	module.exports = footer;

/***/ },
/* 18 */
/*!***********************************************!*\
  !*** ../web/src/components/footer/footer.tpl ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = "<footer class=\"page-footer\">\n\n</footer>";

/***/ },
/* 19 */
/*!***********************************************!*\
  !*** ../web/src/components/footer/footer.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./footer.css */ 20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./footer.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./footer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/*!***************************************************************!*\
  !*** ../~/css-loader!../web/src/components/footer/footer.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, ".footer {\n\n}", ""]);
	
	// exports


/***/ },
/* 21 */
/*!**********************************************************!*\
  !*** ../web/src/components/article-list/article-list.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 文章列表页模块
	 *
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var $ = __webpack_require__(/*! ../../dep/jquery-2.1.4.js */ 22);
	var template = __webpack_require__(/*! ./article-list.tpl */ 23);
	
	// 依赖的样式
	__webpack_require__(/*! ./article-list.css */ 24);
	__webpack_require__(/*! ../icon/tag.css */ 26);
	
	var articleList = Vue.extend({
	    data: function () {
	        var me = this;
	        $.ajax({
	            url: '/articles/published-articles.json',
	            success: function (data) {
	                //me.$set('list', data);// 下面的效率更高
	                me.$data.list = data;
	            }
	        });
	
	        return {
	            list: []
	        };
	    },
	    template: template
	});
	
	module.exports = articleList;

/***/ },
/* 22 */
/*!**************************************!*\
  !*** ../web/src/dep/jquery-2.1.4.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//
	
	var arr = [];
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,
	
		version = "2.1.4",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor(null);
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},
	
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
	
			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );
	
			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				}
	
			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;
	
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
	
		context = context || document;
		results = results || [];
		nodeType = context.nodeType;
	
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		if ( !seed && documentIsHTML ) {
	
			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}
	
				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
	
				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}
	
			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;
	
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );
	
					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";
	
					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}
	
				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;
	
		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return doc;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];
	
							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}
	
										if ( node === elem ) {
											break;
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context !== document && context;
				}
	
				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {
	
			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};
	
	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;
	
			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},
	
		sibling: function( n, elem ) {
			var matched = [];
	
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}
	
			return matched;
		}
	});
	
	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});
	
	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);
	
	
	
	// String to Object options format cache
	var optionsCache = {};
	
	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );
	
		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend({
	
		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	});
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};
	
	
	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
	
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	Data.accepts = jQuery.acceptData;
	
	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}
	
			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];
	
			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;
	
				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );
	
				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}
	
			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}
	
			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];
	
			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}
	
			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			if ( key === undefined ) {
				this.cache[ unlock ] = {};
	
			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();
	
	var data_user = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}
	
				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});
	
	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );
	
					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}
	
			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});
	
	
	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});
	
	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}
	
			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};
	
	var rcheckableType = (/^(?:checkbox|radio)$/i);
	
	
	
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;
	
	
	
	support.focusinBubbles = "onfocusin" in window;
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );
	
			if ( !elemData || !(events = elemData.events) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},
	
		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};
	
	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});
	
	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );
	
					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}
	
	jQuery.fn.extend({
	
		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;
	
			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}
	
			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}
	
			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},
	
		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	
		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
	
			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
			_default: [ 0, "", "" ]
		};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}
	
		return elem;
	}
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			data_user.set( dest, udataCur );
		}
	}
	
	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;
	
			for ( ; i < l; i++ ) {
				elem = elems[ i ];
	
				if ( elem || elem === 0 ) {
	
					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );
	
					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );
	
						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
	
						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}
	
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );
	
						// Remember the top-level container
						tmp = fragment.firstChild;
	
						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}
	
			// Remove wrapper from fragment
			fragment.textContent = "";
	
			i = 0;
			while ( (elem = nodes[ i++ ]) ) {
	
				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}
	
				contains = jQuery.contains( elem.ownerDocument, elem );
	
				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );
	
				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}
	
				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}
	
			return fragment;
		},
	
		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];
	
					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});
	
	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},
	
		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},
	
		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},
	
		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},
	
		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},
	
		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;
	
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}
	
				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
	
			return this;
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = value.replace( rxhtmlTag, "<$1></$2>" );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var arg = arguments[ 0 ];
	
			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;
	
				jQuery.cleanData( getAll( this ) );
	
				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});
	
			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},
	
		detach: function( selector ) {
			return this.remove( selector, true );
		},
	
		domManip: function( args, callback ) {
	
			// Flatten any nested arrays
			args = concat.apply( [], args );
	
			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );
	
			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}
	
			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;
	
				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}
	
				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;
	
					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;
	
						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );
	
							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}
	
						callback.call( this[ i ], node, i );
					}
	
					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;
	
						// Reenable scripts
						jQuery.map( scripts, restoreScript );
	
						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
	
								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}
	
			return this;
		}
	});
	
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	});
	
	
	var iframe,
		elemdisplay = {};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?
	
				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = (/^margin/);
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}
	
			return window.getComputedStyle( elem, null );
		};
	
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}
	
		if ( computed ) {
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}
	
	
	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );
	
			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";
	
			docElem.removeChild( container );
		}
	
		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {
	
					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {
	
					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );
	
					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );
	
					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );
	
					docElem.removeChild( container );
					div.removeChild( marginDiv );
	
					return ret;
				}
			});
		}
	})();
	
	
	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}
	
		return origName;
	}
	
	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend({
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}
	
			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});
	
	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});
	
	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;
	
				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];
	
					// Make sure we update the tween properties later on
					parts = parts || [];
	
					// Iteratively approximate from a nonzero starting point
					start = +target || 1;
	
					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";
	
						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );
	
					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}
	
				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}
	
				return tween;
			} ]
		};
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;
	
				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ]);
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			});
		}
	});
	
	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});
	
	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};
	
	
	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();
	
	
	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});
	
	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;
	
			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}
	
			if ( value !== undefined ) {
	
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
	
				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}
	
			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;
	
			} else {
				ret = jQuery.find.attr( elem, name );
	
				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	
	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});
	
	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
	
		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );
	
			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});
	
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}
	
	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}
	
			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}
	
			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];
	
					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},
	
		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
	
			return false;
		}
	});
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each(function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});
	
	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});
	
	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});
	
	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});
	
	
	var nonce = jQuery.now();
	
	var rquery = (/\?/);
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Document location
		ajaxLocation = window.location.href,
	
		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
	
					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend({
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};
	
	
	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map(function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				}).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}
	
			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			});
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},
	
		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
	
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};
	
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport(function( options ) {
		var callback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;
	
					xhr.open( options.type, options.url, options.async, options.username, options.password );
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");
	
					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");
	
					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;
	
				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			});
	
			// Delegate to script
			return "script";
		}
	});
	
	
	
	
	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}
	
		parsed = jQuery.buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf(" ");
	
		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,
	
				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
	
	
	
	
	var docElem = window.document.documentElement;
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
	
				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || docElem;
			});
		}
	});
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});
	
	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});
	
	
	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	return jQuery;
	
	}));


/***/ },
/* 23 */
/*!***********************************************************!*\
  !*** ../web/src/components/article-list/article-list.tpl ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"article-list-container\">\n    <article class=\"article-list-item\" v-for=\"article in list\">\n        <a href=\"#!/articles/{{article.enName}}\">\n            <h1 class=\"title\">{{article.title}}</h1>\n            <summary>\n                {{article.introduction}}\n            </summary>\n        </a>\n        <footer>\n            <section class=\"tags-container\">\n                <i class=\"icon-tag\" title=\"Tags\"></i>\n                <a class=\"tag-item\" v-for=\"tag in article.tags\">{{tag}}</a>\n            </section>\n        </footer>\n    </article>\n</div>";

/***/ },
/* 24 */
/*!***********************************************************!*\
  !*** ../web/src/components/article-list/article-list.css ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./article-list.css */ 25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./article-list.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./article-list.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/*!***************************************************************************!*\
  !*** ../~/css-loader!../web/src/components/article-list/article-list.css ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * src/components/article-list/article-list.css\n *\n * 文章列表页样式\n */\n.article-list-container {\n\n}\n.article-list-container a {\n    color: inherit;\n    text-decoration: none;\n}\n.article-list-item {\n    margin: 1em 0;\n    padding: 1em 1em .5em 1em;\n    background-color: #f2f2f2;\n}\n.article-list-item .title {\n    font-size: inherit;\n    line-height: 17px;\n    font-weight: 700;\n}\n.article-list-item summary {\n    font-size: 14px;\n    color: #696566;\n}\n.article-list-item footer {\n    border-top: 1px solid #d6d6d6;\n    margin-top: 10px;\n}\n.article-list-item .tags-container {\n    padding-top: 6px;\n}\n.article-list-item .tags-container .icon-tag {\n    top: 3px;\n}\n.article-list-item .tags-container .tag-item {\n    background: #c3bfbf;\n    padding: 2px 5px;\n    margin-left: 5px;\n    color: #fff;\n    font-size: 12px;\n}", ""]);
	
	// exports


/***/ },
/* 26 */
/*!******************************************!*\
  !*** ../web/src/components/icon/tag.css ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./tag.css */ 27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./tag.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./tag.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/*!**********************************************************!*\
  !*** ../~/css-loader!../web/src/components/icon/tag.css ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/* component/icon/tag.css */\n\n/* Tag 图标 */\n.icon-tag {\n    position: relative;\n    display: inline-block;\n    width: 14px;\n    height: 14px;\n    background: #c3bfbf;\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n}\n.icon-tag::before {\n    position: absolute;\n    right: -5px;\n    top: 2px;\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    background: inherit;\n    transform: rotate(45deg);\n    -webkit-transform: rotate(45deg);\n    content: \"\\200B\";\n}\n.icon-tag::after {\n    position: absolute;\n    right: -2px;\n    top: 5px;\n    width: 4px;\n    height: 4px;\n    border-radius: 2px;\n    background: #fff;\n    content: \"\\200B\";\n}\n", ""]);
	
	// exports


/***/ },
/* 28 */
/*!**************************************************************!*\
  !*** ../web/src/components/article-detail/article-detail.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 文章详情页模块
	 *
	 * Created by zhaoxiaoqiang on 15/12/23.
	 */
	
	var Vue = __webpack_require__(/*! ../../dep/vue.js */ 1);
	var $ = __webpack_require__(/*! ../../dep/jquery-2.1.4.js */ 22);
	var template = __webpack_require__(/*! ./article-detail.tpl */ 29);
	var markdownTool = __webpack_require__(/*! ./markdown-tool.js */ 30);
	
	// 依赖的样式
	__webpack_require__(/*! ./prettify.css */ 32);
	__webpack_require__(/*! ./markdown-reader.css */ 34);
	__webpack_require__(/*! ./article-detail.css */ 36);
	__webpack_require__(/*! ../icon/tag.css */ 26);
	
	var articleDetail = Vue.extend({
	    template: template,
	    data: function () {
	        var me = this;
	        // 获取文章详情的 md 文档
	        $.ajax({
	            url: '/articles/' + this.$route.params.id + '/main.md',
	            success: function (data) {
	                data = markdownTool.mark(data);
	                me.$data.htmlContent = data.htmlContent;
	                var headerTree = [];
	                if (data.headerTree.length > 0) {
	                    headerTree = data.headerTree[0].children;
	                    me.$data.headerTree = headerTree;
	                }
	                window.setTimeout(function () {
	                    if ($(window).width() > 800) {
	                        // 数据改变触发异步回调，所以需要将命令加入异步队列
	                        resizeHeaderAndDetailWidth();
	                    }
	                    listenWindowScrollEvent(me);
	                });
	            }
	        });
	
	        return {
	            htmlContent: '',
	            headerTree: [],
	            isOpenHeaders: false
	        };
	    },
	    methods: {
	        // 点击标题列表，滚动滚动条到对应内容处
	        scrollToHeaderContent: function (event) {
	            var headerId = event.target.getAttribute('data-value');
	            var headerDom = document.getElementById(headerId);
	            // 可做动画 TODO
	            document.body.scrollTop = headerDom.offsetTop - 20;
	        },
	        // 展开目录
	        openHeaders: function () {
	            this.$data.isOpenHeaders = true;
	            $('.article-detail-headers-container').css('height', 'auto');
	        },
	        // 关闭目录
	        closeHeaders: function () {
	            this.$data.isOpenHeaders = false;
	            $('.article-detail-headers-container').css('height', '40px');
	        }
	    }
	});
	
	// 从新调整标题和内容的尺寸
	function resizeHeaderAndDetailWidth() {
	    var articleDetailHeadersContainer$ = $('.article-detail-headers-container');
	    var articleDetailContainer$ = $('.article-detail-container');
	    var headerWidth = articleDetailHeadersContainer$.width();
	    $('.article-detail-container').css({
	        'margin-right': (headerWidth + 30) + 'px'
	    });
	    var contentWidth = articleDetailContainer$.width();
	    articleDetailHeadersContainer$.css({
	        'margin-left': (contentWidth + 48) + 'px'
	    })
	}
	
	// 监听 body 滚动条
	function listenWindowScrollEvent(vm) {
	    var articleDetailHeadersContainer$ = $('.article-detail-headers-container');
	    var window$ = $(window);
	    window$.scroll(function () {
	        var scrollTop = window$.scrollTop();
	        var headerHeight = $('.page-header').height();
	        var windowWidth = window$.width();
	        var windowHeight = window$.height();
	        // 临界值
	        var criticalValue = headerHeight + 15;
	        var css = {};
	        // 悬挂布局
	        if (scrollTop > criticalValue) {
	            var height = window$.height();
	            css = {
	                position: 'fixed',
	                right: 'auto',
	                height: height + 'px'
	            };
	
	        }
	        // 还原
	        else {
	            css = {
	                position: 'absolute',
	                height: 'auto'
	            };
	        }
	
	        // 处理移动端
	        if (vm.$data.isOpenHeaders) {
	            var ulHeight = articleDetailHeadersContainer$.find('>ul').outerHeight(true);
	            if (ulHeight + 30 > windowHeight) {
	                css.height = windowHeight + 'px';
	            }
	            else {
	                css.height = 'auto';
	            }
	        }
	        else if (windowWidth < 800) {
	            css.height = '40px';
	        }
	        if (windowWidth < 800 ) {
	            css.right = 0;
	        }
	
	        articleDetailHeadersContainer$.css(css);
	    });
	}
	
	module.exports = articleDetail;

/***/ },
/* 29 */
/*!***************************************************************!*\
  !*** ../web/src/components/article-detail/article-detail.tpl ***!
  \***************************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"article-detail-headers-container\" v-bind:class=\"{ 'open': isOpenHeaders}\">\n    <span class=\"icon-catalogue\" v-on:click=\"openHeaders\">\n        <i></i>\n    </span>\n    <i class=\"icon-close\" v-on:click=\"closeHeaders\"></i>\n    <p><strong>文章目录</strong></p>\n    <ul>\n        <li v-for=\"item in headerTree\">\n            <a v-on:click=\"scrollToHeaderContent\" data-value=\"{{item.id}}\">{{item.text}}</a>\n            <ul v-if=\"item.children.length > 0\">\n                <li v-for=\"item in item.children\">\n                    <a v-on:click=\"scrollToHeaderContent\" data-value=\"{{item.id}}\">{{item.text}}</a>\n                </li>\n            </ul>\n        </li>\n    </ul>\n</div>\n<div class=\"article-detail-container\">{{{htmlContent}}}</div>\n";

/***/ },
/* 30 */
/*!*************************************************************!*\
  !*** ../web/src/components/article-detail/markdown-tool.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 配置 markdown 文档的自定义渲染方式
	 * 注：此文件中提到的渲染指将 markdown 文档按照一定规则生成 html 的过程
	 *
	 * Created by zhaoxiaoqiang on 15/12/11.
	 */
	
	var marked = __webpack_require__(/*! ../../dep/marked.js */ 31);
	
	// markdown 转成 html
	var renderer = new marked.Renderer();
	var options = {
	    renderer: renderer
	};
	
	/**
	 * 重写链接的渲染方式
	 *
	 * @param {string} href 链接地址
	 * @param {string} title 链接 title
	 * @param {string} text 链接文本
	 *
	 * @returns {string} 渲染后的  标签
	 */
	renderer.link = function (href, title, text) {
	    var attrStr = ''
	        + ' href="' + href + '"'
	            // + ' title="' + title + '"'
	        + ' target="_blank"';
	    return '<a' + attrStr + '>' + text + '</a>';
	};
	
	/******************** 重写各级标题的渲染方式 ********************/
	var headerIdPrefix = 'header-'; // 生成 id 时添加的前缀
	// 设置此额外节点是为了防止一篇文章有多个一级标题
	// 同时也为一级标题树立一个悬挂的位置
	var rootNode = {
	    text: '根节点',
	    level: 0,
	    children: [],
	    id: headerIdPrefix,
	    parentNode: null
	};
	// 上一个标题，采用外部标量的形式存储，
	// 因为标题在标题树的位置直接和上一个标题有关
	var preNode = rootNode;
	/**
	 * 重写各级标题的渲染方式
	 * 渲染时会改变此函数的外部变量 rootNode 的值，得到层级化之后的标题树
	 *
	 * @param {string} text 标题文字
	 * @param {Number} level 标题级别
	 *
	 * @returns {string} 渲染后的 h1-h6 标签
	 */
	renderer.heading = function (text, level) {
	    var html;
	    var preLevel = preNode.level;
	    var currentNode;
	    // 同级(与前一个相比，下同)
	    if (level === preLevel) {
	        currentNode = createHeaderNode(text, level, preNode.parentNode);
	    }
	    // 下一级或多级(如果目录不规范有可能一级后直接三级)
	    else if (level > preLevel) {
	        while (level - preLevel > 0) {
	            currentNode = createHeaderNode(null, ++preLevel, preNode);
	        }
	        currentNode.text = text;
	    }
	    // 上一级或多级
	    else {
	        // 找同级
	        while (level < preNode.level) {
	            // 这里的 preNode 暂借用为临时存储变量
	            preNode = preNode.parentNode;
	        }
	        currentNode = createHeaderNode(text, level, preNode.parentNode);
	    }
	
	    html = '<h' + level + ' id="' + currentNode.id + '">'
	        + text
	        + '</h' + level + '>\n';
	    return html;
	};
	
	/**
	 * 创建标题节点数据对象
	 *
	 * @param {string|null} text 标题文本，
	 *                           为 null 是为了兼顾文档不规范出现标题跳级现象，
	 *                           (如一级标题之后直接出现三级标题)
	 *                           但树结构不能出现断层的现象，所以做兼容
	 * @param {Number} level 标题层级
	 * @param {Object} parentNode 上一级标题节点
	 *
	 * @returns {Object} newNode  新节点
	 */
	function createHeaderNode(text, level, parentNode) {
	    var idSpace = parentNode.level === 0 ? '' : '-';
	    var newNode = {
	        level: level,
	        id: parentNode.id + idSpace + (parentNode.children.length + 1),
	        children: [],
	        parentNode: parentNode
	    };
	    parentNode.children.push(newNode);
	    if (text !== null) {
	        newNode.text = text;
	    }
	    preNode = newNode;
	    return newNode;
	}
	
	/**
	 * 渲染 markdown 文档
	 *
	 * @param {string} mdContent md 文档内容
	 *
	 * @returns {Object} 渲染生成的html 文本和 副产品数据组成的对象
	 *                   {htmlContent: string, headerTree: Array}
	 */
	function mark(mdContent) {
	    // 开始一篇文章时清零根节点的子节点
	    rootNode.children = [];
	    var htmlContent = marked(mdContent, options);
	    return {
	        htmlContent: htmlContent,
	        headerTree: rootNode.children
	    };
	}
	
	module.exports = {
	    mark: mark
	};

/***/ },
/* 31 */
/*!********************************!*\
  !*** ../web/src/dep/marked.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	
	(function () {
	
	    /**
	     * Block-Level Grammar
	     */
	
	    var block = {
	        newline: /^\n+/,
	        code: /^( {4}[^\n]+\n*)+/,
	        fences: noop,
	        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	        nptable: noop,
	        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	        table: noop,
	        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	        text: /^[^\n]+/
	    };
	
	    block.bullet = /(?:[*+-]|\d+\.)/;
	    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	    block.item = replace(block.item, 'gm')
	    (/bull/g, block.bullet)
	    ();
	
	    block.list = replace(block.list)
	    (/bull/g, block.bullet)
	    ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	    ('def', '\\n+(?=' + block.def.source + ')')
	    ();
	
	    block.blockquote = replace(block.blockquote)
	    ('def', block.def)
	    ();
	
	    block._tag = '(?!(?:'
	        + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	        + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	        + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
	
	    block.html = replace(block.html)
	    ('comment', /<!--[\s\S]*?-->/)
	    ('closed', /<(tag)[\s\S]+?<\/\1>/)
	    ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	    (/tag/g, block._tag)
	    ();
	
	    block.paragraph = replace(block.paragraph)
	    ('hr', block.hr)
	    ('heading', block.heading)
	    ('lheading', block.lheading)
	    ('blockquote', block.blockquote)
	    ('tag', '<' + block._tag)
	    ('def', block.def)
	    ();
	
	    /**
	     * Normal Block Grammar
	     */
	
	    block.normal = merge({}, block);
	
	    /**
	     * GFM Block Grammar
	     */
	
	    block.gfm = merge({}, block.normal, {
	        fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
	        paragraph: /^/
	    });
	
	    block.gfm.paragraph = replace(block.paragraph)
	    ('(?!', '(?!'
	        + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	        + block.list.source.replace('\\1', '\\3') + '|')
	    ();
	
	    /**
	     * GFM + Tables Block Grammar
	     */
	
	    block.tables = merge({}, block.gfm, {
	        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	    });
	
	    /**
	     * Block Lexer
	     */
	
	    function Lexer(options) {
	        this.tokens = [];
	        this.tokens.links = {};
	        this.options = options || marked.defaults;
	        this.rules = block.normal;
	
	        if (this.options.gfm) {
	            if (this.options.tables) {
	                this.rules = block.tables;
	            } else {
	                this.rules = block.gfm;
	            }
	        }
	    }
	
	    /**
	     * Expose Block Rules
	     */
	
	    Lexer.rules = block;
	
	    /**
	     * Static Lex Method
	     */
	
	    Lexer.lex = function (src, options) {
	        var lexer = new Lexer(options);
	        return lexer.lex(src);
	    };
	
	    /**
	     * Preprocessing
	     */
	
	    Lexer.prototype.lex = function (src) {
	        src = src
	            .replace(/\r\n|\r/g, '\n')
	            .replace(/\t/g, '    ')
	            .replace(/\u00a0/g, ' ')
	            .replace(/\u2424/g, '\n');
	
	        return this.token(src, true);
	    };
	
	    /**
	     * Lexing
	     */
	
	    Lexer.prototype.token = function (src, top, bq) {
	        var src = src.replace(/^ +$/gm, '')
	            , next
	            , loose
	            , cap
	            , bull
	            , b
	            , item
	            , space
	            , i
	            , l;
	
	        while (src) {
	            // newline
	            if (cap = this.rules.newline.exec(src)) {
	                src = src.substring(cap[0].length);
	                if (cap[0].length > 1) {
	                    this.tokens.push({
	                        type: 'space'
	                    });
	                }
	            }
	
	            // code
	            if (cap = this.rules.code.exec(src)) {
	                src = src.substring(cap[0].length);
	                cap = cap[0].replace(/^ {4}/gm, '');
	                this.tokens.push({
	                    type: 'code',
	                    text: !this.options.pedantic
	                        ? cap.replace(/\n+$/, '')
	                        : cap
	                });
	                continue;
	            }
	
	            // fences (gfm)
	            if (cap = this.rules.fences.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'code',
	                    lang: cap[2],
	                    text: cap[3]
	                });
	                continue;
	            }
	
	            // heading
	            if (cap = this.rules.heading.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'heading',
	                    depth: cap[1].length,
	                    text: cap[2]
	                });
	                continue;
	            }
	
	            // table no leading pipe (gfm)
	            if (top && (cap = this.rules.nptable.exec(src))) {
	                src = src.substring(cap[0].length);
	
	                item = {
	                    type: 'table',
	                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	                    cells: cap[3].replace(/\n$/, '').split('\n')
	                };
	
	                for (i = 0; i < item.align.length; i++) {
	                    if (/^ *-+: *$/.test(item.align[i])) {
	                        item.align[i] = 'right';
	                    } else if (/^ *:-+: *$/.test(item.align[i])) {
	                        item.align[i] = 'center';
	                    } else if (/^ *:-+ *$/.test(item.align[i])) {
	                        item.align[i] = 'left';
	                    } else {
	                        item.align[i] = null;
	                    }
	                }
	
	                for (i = 0; i < item.cells.length; i++) {
	                    item.cells[i] = item.cells[i].split(/ *\| */);
	                }
	
	                this.tokens.push(item);
	
	                continue;
	            }
	
	            // lheading
	            if (cap = this.rules.lheading.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'heading',
	                    depth: cap[2] === '=' ? 1 : 2,
	                    text: cap[1]
	                });
	                continue;
	            }
	
	            // hr
	            if (cap = this.rules.hr.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'hr'
	                });
	                continue;
	            }
	
	            // blockquote
	            if (cap = this.rules.blockquote.exec(src)) {
	                src = src.substring(cap[0].length);
	
	                this.tokens.push({
	                    type: 'blockquote_start'
	                });
	
	                cap = cap[0].replace(/^ *> ?/gm, '');
	
	                // Pass `top` to keep the current
	                // "toplevel" state. This is exactly
	                // how markdown.pl works.
	                this.token(cap, top, true);
	
	                this.tokens.push({
	                    type: 'blockquote_end'
	                });
	
	                continue;
	            }
	
	            // list
	            if (cap = this.rules.list.exec(src)) {
	                src = src.substring(cap[0].length);
	                bull = cap[2];
	
	                this.tokens.push({
	                    type: 'list_start',
	                    ordered: bull.length > 1
	                });
	
	                // Get each top-level item.
	                cap = cap[0].match(this.rules.item);
	
	                next = false;
	                l = cap.length;
	                i = 0;
	
	                for (; i < l; i++) {
	                    item = cap[i];
	
	                    // Remove the list item's bullet
	                    // so it is seen as the next token.
	                    space = item.length;
	                    item = item.replace(/^ *([*+-]|\d+\.) +/, '');
	
	                    // Outdent whatever the
	                    // list item contains. Hacky.
	                    if (~item.indexOf('\n ')) {
	                        space -= item.length;
	                        item = !this.options.pedantic
	                            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	                            : item.replace(/^ {1,4}/gm, '');
	                    }
	
	                    // Determine whether the next list item belongs here.
	                    // Backpedal if it does not belong in this list.
	                    if (this.options.smartLists && i !== l - 1) {
	                        b = block.bullet.exec(cap[i + 1])[0];
	                        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	                            src = cap.slice(i + 1).join('\n') + src;
	                            i = l - 1;
	                        }
	                    }
	
	                    // Determine whether item is loose or not.
	                    // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	                    // for discount behavior.
	                    loose = next || /\n\n(?!\s*$)/.test(item);
	                    if (i !== l - 1) {
	                        next = item.charAt(item.length - 1) === '\n';
	                        if (!loose) loose = next;
	                    }
	
	                    this.tokens.push({
	                        type: loose
	                            ? 'loose_item_start'
	                            : 'list_item_start'
	                    });
	
	                    // Recurse.
	                    this.token(item, false, bq);
	
	                    this.tokens.push({
	                        type: 'list_item_end'
	                    });
	                }
	
	                this.tokens.push({
	                    type: 'list_end'
	                });
	
	                continue;
	            }
	
	            // html
	            if (cap = this.rules.html.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: this.options.sanitize
	                        ? 'paragraph'
	                        : 'html',
	                    pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
	                    text: cap[0]
	                });
	                continue;
	            }
	
	            // def
	            if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	                src = src.substring(cap[0].length);
	                this.tokens.links[cap[1].toLowerCase()] = {
	                    href: cap[2],
	                    title: cap[3]
	                };
	                continue;
	            }
	
	            // table (gfm)
	            if (top && (cap = this.rules.table.exec(src))) {
	                src = src.substring(cap[0].length);
	
	                item = {
	                    type: 'table',
	                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	                    cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	                };
	
	                for (i = 0; i < item.align.length; i++) {
	                    if (/^ *-+: *$/.test(item.align[i])) {
	                        item.align[i] = 'right';
	                    } else if (/^ *:-+: *$/.test(item.align[i])) {
	                        item.align[i] = 'center';
	                    } else if (/^ *:-+ *$/.test(item.align[i])) {
	                        item.align[i] = 'left';
	                    } else {
	                        item.align[i] = null;
	                    }
	                }
	
	                for (i = 0; i < item.cells.length; i++) {
	                    item.cells[i] = item.cells[i]
	                        .replace(/^ *\| *| *\| *$/g, '')
	                        .split(/ *\| */);
	                }
	
	                this.tokens.push(item);
	
	                continue;
	            }
	
	            // top-level paragraph
	            if (top && (cap = this.rules.paragraph.exec(src))) {
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'paragraph',
	                    text: cap[1].charAt(cap[1].length - 1) === '\n'
	                        ? cap[1].slice(0, -1)
	                        : cap[1]
	                });
	                continue;
	            }
	
	            // text
	            if (cap = this.rules.text.exec(src)) {
	                // Top-level should never reach here.
	                src = src.substring(cap[0].length);
	                this.tokens.push({
	                    type: 'text',
	                    text: cap[0]
	                });
	                continue;
	            }
	
	            if (src) {
	                throw new
	                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
	            }
	        }
	
	        return this.tokens;
	    };
	
	    /**
	     * Inline-Level Grammar
	     */
	
	    var inline = {
	        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	        url: noop,
	        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	        link: /^!?\[(inside)\]\(href\)/,
	        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	        em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	        br: /^ {2,}\n(?!\s*$)/,
	        del: noop,
	        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	    };
	
	    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
	
	    inline.link = replace(inline.link)
	    ('inside', inline._inside)
	    ('href', inline._href)
	    ();
	
	    inline.reflink = replace(inline.reflink)
	    ('inside', inline._inside)
	    ();
	
	    /**
	     * Normal Inline Grammar
	     */
	
	    inline.normal = merge({}, inline);
	
	    /**
	     * Pedantic Inline Grammar
	     */
	
	    inline.pedantic = merge({}, inline.normal, {
	        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	    });
	
	    /**
	     * GFM Inline Grammar
	     */
	
	    inline.gfm = merge({}, inline.normal, {
	        escape: replace(inline.escape)('])', '~|])')(),
	        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	        del: /^~~(?=\S)([\s\S]*?\S)~~/,
	        text: replace(inline.text)
	        (']|', '~]|')
	        ('|', '|https?://|')
	        ()
	    });
	
	    /**
	     * GFM + Line Breaks Inline Grammar
	     */
	
	    inline.breaks = merge({}, inline.gfm, {
	        br: replace(inline.br)('{2,}', '*')(),
	        text: replace(inline.gfm.text)('{2,}', '*')()
	    });
	
	    /**
	     * Inline Lexer & Compiler
	     */
	
	    function InlineLexer(links, options) {
	        this.options = options || marked.defaults;
	        this.links = links;
	        this.rules = inline.normal;
	        this.renderer = this.options.renderer || new Renderer;
	        this.renderer.options = this.options;
	
	        if (!this.links) {
	            throw new
	                Error('Tokens array requires a `links` property.');
	        }
	
	        if (this.options.gfm) {
	            if (this.options.breaks) {
	                this.rules = inline.breaks;
	            } else {
	                this.rules = inline.gfm;
	            }
	        } else if (this.options.pedantic) {
	            this.rules = inline.pedantic;
	        }
	    }
	
	    /**
	     * Expose Inline Rules
	     */
	
	    InlineLexer.rules = inline;
	
	    /**
	     * Static Lexing/Compiling Method
	     */
	
	    InlineLexer.output = function (src, links, options) {
	        var inline = new InlineLexer(links, options);
	        return inline.output(src);
	    };
	
	    /**
	     * Lexing/Compiling
	     */
	
	    InlineLexer.prototype.output = function (src) {
	        var out = ''
	            , link
	            , text
	            , href
	            , cap;
	
	        while (src) {
	            // escape
	            if (cap = this.rules.escape.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += cap[1];
	                continue;
	            }
	
	            // autolink
	            if (cap = this.rules.autolink.exec(src)) {
	                src = src.substring(cap[0].length);
	                if (cap[2] === '@') {
	                    text = cap[1].charAt(6) === ':'
	                        ? this.mangle(cap[1].substring(7))
	                        : this.mangle(cap[1]);
	                    href = this.mangle('mailto:') + text;
	                } else {
	                    text = escape(cap[1]);
	                    href = text;
	                }
	                out += this.renderer.link(href, null, text);
	                continue;
	            }
	
	            // url (gfm)
	            if (!this.inLink && (cap = this.rules.url.exec(src))) {
	                src = src.substring(cap[0].length);
	                text = escape(cap[1]);
	                href = text;
	                out += this.renderer.link(href, null, text);
	                continue;
	            }
	
	            // tag
	            if (cap = this.rules.tag.exec(src)) {
	                if (!this.inLink && /^<a /i.test(cap[0])) {
	                    this.inLink = true;
	                } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	                    this.inLink = false;
	                }
	                src = src.substring(cap[0].length);
	                out += this.options.sanitize
	                    ? escape(cap[0])
	                    : cap[0];
	                continue;
	            }
	
	            // link
	            if (cap = this.rules.link.exec(src)) {
	                src = src.substring(cap[0].length);
	                this.inLink = true;
	                out += this.outputLink(cap, {
	                    href: cap[2],
	                    title: cap[3]
	                });
	                this.inLink = false;
	                continue;
	            }
	
	            // reflink, nolink
	            if ((cap = this.rules.reflink.exec(src))
	                || (cap = this.rules.nolink.exec(src))) {
	                src = src.substring(cap[0].length);
	                link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	                link = this.links[link.toLowerCase()];
	                if (!link || !link.href) {
	                    out += cap[0].charAt(0);
	                    src = cap[0].substring(1) + src;
	                    continue;
	                }
	                this.inLink = true;
	                out += this.outputLink(cap, link);
	                this.inLink = false;
	                continue;
	            }
	
	            // strong
	            if (cap = this.rules.strong.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += this.renderer.strong(this.output(cap[2] || cap[1]));
	                continue;
	            }
	
	            // em
	            if (cap = this.rules.em.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += this.renderer.em(this.output(cap[2] || cap[1]));
	                continue;
	            }
	
	            // code
	            if (cap = this.rules.code.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += this.renderer.codespan(escape(cap[2], true));
	                continue;
	            }
	
	            // br
	            if (cap = this.rules.br.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += this.renderer.br();
	                continue;
	            }
	
	            // del (gfm)
	            if (cap = this.rules.del.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += this.renderer.del(this.output(cap[1]));
	                continue;
	            }
	
	            // text
	            if (cap = this.rules.text.exec(src)) {
	                src = src.substring(cap[0].length);
	                out += escape(this.smartypants(cap[0]));
	                continue;
	            }
	
	            if (src) {
	                throw new
	                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
	            }
	        }
	
	        return out;
	    };
	
	    /**
	     * Compile Link
	     */
	
	    InlineLexer.prototype.outputLink = function (cap, link) {
	        var href = escape(link.href)
	            , title = link.title ? escape(link.title) : null;
	
	        return cap[0].charAt(0) !== '!'
	            ? this.renderer.link(href, title, this.output(cap[1]))
	            : this.renderer.image(href, title, escape(cap[1]));
	    };
	
	    /**
	     * Smartypants Transformations
	     */
	
	    InlineLexer.prototype.smartypants = function (text) {
	        if (!this.options.smartypants) return text;
	        return text
	            // em-dashes
	            .replace(/--/g, '\u2014')
	            // opening singles
	            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	            // closing singles & apostrophes
	            .replace(/'/g, '\u2019')
	            // opening doubles
	            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	            // closing doubles
	            .replace(/"/g, '\u201d')
	            // ellipses
	            .replace(/\.{3}/g, '\u2026');
	    };
	
	    /**
	     * Mangle Links
	     */
	
	    InlineLexer.prototype.mangle = function (text) {
	        var out = ''
	            , l = text.length
	            , i = 0
	            , ch;
	
	        for (; i < l; i++) {
	            ch = text.charCodeAt(i);
	            if (Math.random() > 0.5) {
	                ch = 'x' + ch.toString(16);
	            }
	            out += '&#' + ch + ';';
	        }
	
	        return out;
	    };
	
	    /**
	     * Renderer
	     */
	
	    function Renderer(options) {
	        this.options = options || {};
	    }
	
	    Renderer.prototype.code = function (code, lang, escaped) {
	        if (this.options.highlight) {
	            var out = this.options.highlight(code, lang);
	            if (out != null && out !== code) {
	                escaped = true;
	                code = out;
	            }
	        }
	
	        if (!lang) {
	            return '<pre><code>'
	                + (escaped ? code : escape(code, true))
	                + '\n</code></pre>';
	        }
	
	        return '<pre><code class="'
	            + this.options.langPrefix
	            + escape(lang, true)
	            + '">'
	            + (escaped ? code : escape(code, true))
	            + '\n</code></pre>\n';
	    };
	
	    Renderer.prototype.blockquote = function (quote) {
	        return '<blockquote>\n' + quote + '</blockquote>\n';
	    };
	
	    Renderer.prototype.html = function (html) {
	        return html;
	    };
	
	    Renderer.prototype.heading = function (text, level, raw) {
	        return '<h'
	            + level
	            + ' id="'
	            + this.options.headerPrefix
	            + raw.toLowerCase().replace(/[^\w]+/g, '-')
	            + '">'
	            + text
	            + '</h'
	            + level
	            + '>\n';
	    };
	
	    Renderer.prototype.hr = function () {
	        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	    };
	
	    Renderer.prototype.list = function (body, ordered) {
	        var type = ordered ? 'ol' : 'ul';
	        return '<' + type + '>\n' + body + '</' + type + '>\n';
	    };
	
	    Renderer.prototype.listitem = function (text) {
	        return '<li>' + text + '</li>\n';
	    };
	
	    Renderer.prototype.paragraph = function (text) {
	        return '<p>' + text + '</p>\n';
	    };
	
	    Renderer.prototype.table = function (header, body) {
	        return '<table>\n'
	            + '<thead>\n'
	            + header
	            + '</thead>\n'
	            + '<tbody>\n'
	            + body
	            + '</tbody>\n'
	            + '</table>\n';
	    };
	
	    Renderer.prototype.tablerow = function (content) {
	        return '<tr>\n' + content + '</tr>\n';
	    };
	
	    Renderer.prototype.tablecell = function (content, flags) {
	        var type = flags.header ? 'th' : 'td';
	        var tag = flags.align
	            ? '<' + type + ' style="text-align:' + flags.align + '">'
	            : '<' + type + '>';
	        return tag + content + '</' + type + '>\n';
	    };
	
	// span level renderer
	    Renderer.prototype.strong = function (text) {
	        return '<strong>' + text + '</strong>';
	    };
	
	    Renderer.prototype.em = function (text) {
	        return '<em>' + text + '</em>';
	    };
	
	    Renderer.prototype.codespan = function (text) {
	        return '<code>' + text + '</code>';
	    };
	
	    Renderer.prototype.br = function () {
	        return this.options.xhtml ? '<br/>' : '<br>';
	    };
	
	    Renderer.prototype.del = function (text) {
	        return '<del>' + text + '</del>';
	    };
	
	    Renderer.prototype.link = function (href, title, text) {
	        if (this.options.sanitize) {
	            try {
	                var prot = decodeURIComponent(unescape(href))
	                    .replace(/[^\w:]/g, '')
	                    .toLowerCase();
	            } catch (e) {
	                return '';
	            }
	            if (prot.indexOf('javascript:') === 0) {
	                return '';
	            }
	        }
	        var out = '<a href="' + href + '"';
	        if (title) {
	            out += ' title="' + title + '"';
	        }
	        out += '>' + text + '</a>';
	        return out;
	    };
	
	    Renderer.prototype.image = function (href, title, text) {
	        var out = '<img src="' + href + '" alt="' + text + '"';
	        if (title) {
	            out += ' title="' + title + '"';
	        }
	        out += this.options.xhtml ? '/>' : '>';
	        return out;
	    };
	
	    /**
	     * Parsing & Compiling
	     */
	
	    function Parser(options) {
	        this.tokens = [];
	        this.token = null;
	        this.options = options || marked.defaults;
	        this.options.renderer = this.options.renderer || new Renderer;
	        this.renderer = this.options.renderer;
	        this.renderer.options = this.options;
	    }
	
	    /**
	     * Static Parse Method
	     */
	
	    Parser.parse = function (src, options, renderer) {
	        var parser = new Parser(options, renderer);
	        return parser.parse(src);
	    };
	
	    /**
	     * Parse Loop
	     */
	
	    Parser.prototype.parse = function (src) {
	        this.inline = new InlineLexer(src.links, this.options, this.renderer);
	        this.tokens = src.reverse();
	
	        var out = '';
	        while (this.next()) {
	            out += this.tok();
	        }
	
	        return out;
	    };
	
	    /**
	     * Next Token
	     */
	
	    Parser.prototype.next = function () {
	        return this.token = this.tokens.pop();
	    };
	
	    /**
	     * Preview Next Token
	     */
	
	    Parser.prototype.peek = function () {
	        return this.tokens[this.tokens.length - 1] || 0;
	    };
	
	    /**
	     * Parse Text Tokens
	     */
	
	    Parser.prototype.parseText = function () {
	        var body = this.token.text;
	
	        while (this.peek().type === 'text') {
	            body += '\n' + this.next().text;
	        }
	
	        return this.inline.output(body);
	    };
	
	    /**
	     * Parse Current Token
	     */
	
	    Parser.prototype.tok = function () {
	        switch (this.token.type) {
	            case 'space':
	            {
	                return '';
	            }
	            case 'hr':
	            {
	                return this.renderer.hr();
	            }
	            case 'heading':
	            {
	                return this.renderer.heading(
	                    this.inline.output(this.token.text),
	                    this.token.depth,
	                    this.token.text);
	            }
	            case 'code':
	            {
	                return this.renderer.code(this.token.text,
	                    this.token.lang,
	                    this.token.escaped);
	            }
	            case 'table':
	            {
	                var header = ''
	                    , body = ''
	                    , i
	                    , row
	                    , cell
	                    , flags
	                    , j;
	
	                // header
	                cell = '';
	                for (i = 0; i < this.token.header.length; i++) {
	                    flags = {header: true, align: this.token.align[i]};
	                    cell += this.renderer.tablecell(
	                        this.inline.output(this.token.header[i]),
	                        {header: true, align: this.token.align[i]}
	                    );
	                }
	                header += this.renderer.tablerow(cell);
	
	                for (i = 0; i < this.token.cells.length; i++) {
	                    row = this.token.cells[i];
	
	                    cell = '';
	                    for (j = 0; j < row.length; j++) {
	                        cell += this.renderer.tablecell(
	                            this.inline.output(row[j]),
	                            {header: false, align: this.token.align[j]}
	                        );
	                    }
	
	                    body += this.renderer.tablerow(cell);
	                }
	                return this.renderer.table(header, body);
	            }
	            case 'blockquote_start':
	            {
	                var body = '';
	
	                while (this.next().type !== 'blockquote_end') {
	                    body += this.tok();
	                }
	
	                return this.renderer.blockquote(body);
	            }
	            case 'list_start':
	            {
	                var body = ''
	                    , ordered = this.token.ordered;
	
	                while (this.next().type !== 'list_end') {
	                    body += this.tok();
	                }
	
	                return this.renderer.list(body, ordered);
	            }
	            case 'list_item_start':
	            {
	                var body = '';
	
	                while (this.next().type !== 'list_item_end') {
	                    body += this.token.type === 'text'
	                        ? this.parseText()
	                        : this.tok();
	                }
	
	                return this.renderer.listitem(body);
	            }
	            case 'loose_item_start':
	            {
	                var body = '';
	
	                while (this.next().type !== 'list_item_end') {
	                    body += this.tok();
	                }
	
	                return this.renderer.listitem(body);
	            }
	            case 'html':
	            {
	                var html = !this.token.pre && !this.options.pedantic
	                    ? this.inline.output(this.token.text)
	                    : this.token.text;
	                return this.renderer.html(html);
	            }
	            case 'paragraph':
	            {
	                return this.renderer.paragraph(this.inline.output(this.token.text));
	            }
	            case 'text':
	            {
	                return this.renderer.paragraph(this.parseText());
	            }
	        }
	    };
	
	    /**
	     * Helpers
	     */
	
	    function escape(html, encode) {
	        return html
	            .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;');
	    }
	
	    function unescape(html) {
	        return html.replace(/&([#\w]+);/g, function (_, n) {
	            n = n.toLowerCase();
	            if (n === 'colon') return ':';
	            if (n.charAt(0) === '#') {
	                return n.charAt(1) === 'x'
	                    ? String.fromCharCode(parseInt(n.substring(2), 16))
	                    : String.fromCharCode(+n.substring(1));
	            }
	            return '';
	        });
	    }
	
	    function replace(regex, opt) {
	        regex = regex.source;
	        opt = opt || '';
	        return function self(name, val) {
	            if (!name) return new RegExp(regex, opt);
	            val = val.source || val;
	            val = val.replace(/(^|[^\[])\^/g, '$1');
	            regex = regex.replace(name, val);
	            return self;
	        };
	    }
	
	    function noop() {
	    }
	
	    noop.exec = noop;
	
	    function merge(obj) {
	        var i = 1
	            , target
	            , key;
	
	        for (; i < arguments.length; i++) {
	            target = arguments[i];
	            for (key in target) {
	                if (Object.prototype.hasOwnProperty.call(target, key)) {
	                    obj[key] = target[key];
	                }
	            }
	        }
	
	        return obj;
	    }
	
	
	    /**
	     * Marked
	     */
	
	    function marked(src, opt, callback) {
	        if (callback || typeof opt === 'function') {
	            if (!callback) {
	                callback = opt;
	                opt = null;
	            }
	
	            opt = merge({}, marked.defaults, opt || {});
	
	            var highlight = opt.highlight
	                , tokens
	                , pending
	                , i = 0;
	
	            try {
	                tokens = Lexer.lex(src, opt)
	            } catch (e) {
	                return callback(e);
	            }
	
	            pending = tokens.length;
	
	            var done = function (err) {
	                if (err) {
	                    opt.highlight = highlight;
	                    return callback(err);
	                }
	
	                var out;
	
	                try {
	                    out = Parser.parse(tokens, opt);
	                } catch (e) {
	                    err = e;
	                }
	
	                opt.highlight = highlight;
	
	                return err
	                    ? callback(err)
	                    : callback(null, out);
	            };
	
	            if (!highlight || highlight.length < 3) {
	                return done();
	            }
	
	            delete opt.highlight;
	
	            if (!pending) return done();
	
	            for (; i < tokens.length; i++) {
	                (function (token) {
	                    if (token.type !== 'code') {
	                        return --pending || done();
	                    }
	                    return highlight(token.text, token.lang, function (err, code) {
	                        if (err) return done(err);
	                        if (code == null || code === token.text) {
	                            return --pending || done();
	                        }
	                        token.text = code;
	                        token.escaped = true;
	                        --pending || done();
	                    });
	                })(tokens[i]);
	            }
	
	            return;
	        }
	        try {
	            if (opt) opt = merge({}, marked.defaults, opt);
	            return Parser.parse(Lexer.lex(src, opt), opt);
	        } catch (e) {
	            e.message += '\nPlease report this to https://github.com/chjj/marked.';
	            if ((opt || marked.defaults).silent) {
	                return '<p>An error occured:</p><pre>'
	                    + escape(e.message + '', true)
	                    + '</pre>';
	            }
	            throw e;
	        }
	    }
	
	    /**
	     * Options
	     */
	
	    marked.options =
	        marked.setOptions = function (opt) {
	            merge(marked.defaults, opt);
	            return marked;
	        };
	
	    marked.defaults = {
	        gfm: true,
	        tables: true,
	        breaks: false,
	        pedantic: false,
	        sanitize: false,
	        smartLists: false,
	        silent: false,
	        highlight: null,
	        langPrefix: 'lang-',
	        smartypants: false,
	        headerPrefix: '',
	        renderer: new Renderer,
	        xhtml: false
	    };
	
	    /**
	     * Expose
	     */
	
	    marked.Parser = Parser;
	    marked.parser = Parser.parse;
	
	    marked.Renderer = Renderer;
	
	    marked.Lexer = Lexer;
	    marked.lexer = Lexer.lex;
	
	    marked.InlineLexer = InlineLexer;
	    marked.inlineLexer = InlineLexer.output;
	
	    marked.parse = marked;
	
	    if (true) {
	        module.exports = marked;
	    } else if (typeof define === 'function' && define.amd) {
	        define(function () {
	            return marked;
	        });
	    } else {
	        this.marked = marked;
	    }
	
	}).call(function () {
	        return this || (typeof window !== 'undefined' ? window : global);
	    }());
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/*!*********************************************************!*\
  !*** ../web/src/components/article-detail/prettify.css ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./prettify.css */ 33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./prettify.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./prettify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/*!*************************************************************************!*\
  !*** ../~/css-loader!../web/src/components/article-detail/prettify.css ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, ".com {\n    color: #93a1a1;\n}\n\n.lit {\n    color: #195f91;\n}\n\n.pun, .opn, .clo {\n    color: #93a1a1;\n}\n\n.fun {\n    color: #dc322f;\n}\n\n.str, .atv {\n    color: #dd1144;\n}\n\n.kwd, .linenums .tag {\n    color: #1e347b;\n}\n\n.typ, .atn, .dec, .var {\n    color: teal;\n}\n\n.pln {\n    color: #48484c;\n}\n\n.prettyprint {\n    padding: 8px;\n    background-color: #f7f7f9;\n    border: 1px solid #e1e1e8;\n}\n\n.prettyprint.linenums {\n    -webkit-box-shadow: inset 40px 0 0 #fbfbfc, inset 41px 0 0 #ececf0;\n    -moz-box-shadow: inset 40px 0 0 #fbfbfc, inset 41px 0 0 #ececf0;\n    box-shadow: inset 40px 0 0 #fbfbfc, inset 41px 0 0 #ececf0;\n}\n\n/* Specify class=linenums on a pre to get line numbering */\nol.linenums {\n    margin: 0 0 0 33px; /* IE indents via margin-left */\n}\n\nol.linenums li {\n    padding-left: 12px;\n    color: #bebec5;\n    line-height: 18px;\n    text-shadow: 0 1px 0 #ffffff;\n}\n\ncode, pre {\n    padding: 0 3px 2px;\n    font-family: Menlo, Monaco, \"Courier New\", monospace;\n    font-size: 12px;\n    color: #333333;\n    -webkit-border-radius: 3px;\n    -moz-border-radius: 3px;\n    border-radius: 3px;\n}\n\ncode {\n    padding: 0.2em 0.3em;\n    margin: 0;\n    font-size: 85%;\n    background-color: rgba(0,0,0,0.04);\n    border-radius: 3px;\n}\n\npre {\n    display: block;\n    padding: 8.5px;\n    margin: 0 0 9px;\n    font-size: 12px;\n    line-height: 18px;\n    background-color: #393939;\n    border: 1px solid #cccccc;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n    white-space: pre;\n    white-space: pre-wrap;\n    word-break: break-all;\n}\n\npre.prettyprint {\n    margin-bottom: 18px;\n}\n\npre code {\n    padding: 0;\n    background-color: transparent;\n    color: #ecc982;\n}\n", ""]);
	
	// exports


/***/ },
/* 34 */
/*!****************************************************************!*\
  !*** ../web/src/components/article-detail/markdown-reader.css ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./markdown-reader.css */ 35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./markdown-reader.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./markdown-reader.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/*!********************************************************************************!*\
  !*** ../~/css-loader!../web/src/components/article-detail/markdown-reader.css ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n}\n/* 源码容器 */\n#markdown-sound-code-container {\n    display: none;\n}\n/* 展示容器 */\n#markdown-show-container {\n    max-width: 748px;\n    margin: 10px auto;\n    background-color: #f8f8f8;\n    border: 1px solid #cccccc;\n    box-shadow: 0 0 10px #999999;\n    padding: 2em;\n    line-height: 1.4em;\n    font: 13.34px helvetica, arial, freesans, clean, sans-serif;\n    color: black;\n}\n.article-detail-container p {\n    margin: 1em 0;\n    line-height: 1.5em;\n}\n\n.article-detail-container table {\n    font-size: inherit;\n    font: 100%;\n    margin: 1em;\n}\n\n.article-detail-container table th {\n    border-bottom: 1px solid #bbbbbb;\n    padding: .2em 1em;\n}\n\n.article-detail-container table td {\n    border-bottom: 1px solid #dddddd;\n    padding: .2em 1em;\n}\n\n.article-detail-container input[type=text],\n.article-detail-container input[type=password],\n.article-detail-container input[type=image],\n.article-detail-container textarea {\n    font: 99% helvetica, arial, freesans, sans-serif;\n}\n\n.article-detail-container select,\n.article-detail-container option {\n    padding: 0 .25em;\n}\n\n.article-detail-container optgroup {\n    margin-top: .5em;\n}\n\n.article-detail-container img {\n    border: 0;\n    max-width: 100%;\n}\n\n.article-detail-container abbr {\n    border-bottom: none;\n}\n\n.article-detail-container a {\n    color: #4183c4;\n    text-decoration: none;\n}\n\n.article-detail-container a:hover {\n    text-decoration: underline;\n}\n\n.article-detail-container a code,\n.article-detail-container a:link code,\n.article-detail-container a:visited code {\n    color: #4183c4;\n}\n\n.article-detail-container h2,\n.article-detail-container h3 {\n    margin: 1em 0;\n}\n\n.article-detail-container h1,\n.article-detail-container h2,\n.article-detail-container h3,\n.article-detail-container h4,\n.article-detail-container h5,\n.article-detail-container h6 {\n    border: 0;\n}\n\n.article-detail-container h1 {\n    text-align: center;\n    font-size: 170%;\n    border-bottom: 4px solid #aaaaaa;\n    padding-bottom: .5em;\n    margin-top: 1.5em;\n}\n\n.article-detail-container h1:first-child {\n    margin-top: 0;\n    padding-top: .75em;\n    border-top: none;\n}\n\n.article-detail-container h2 {\n    font-size: 150%;\n    margin-top: 1.5em;\n    border-bottom: 4px solid #e0e0e0;\n    padding-bottom: .5em;\n}\n\n.article-detail-container h3 {\n    margin-top: 1em;\n}\n\n.article-detail-container hr {\n    border: 1px solid #dddddd;\n}\n\n.article-detail-container ul {\n    margin: 1em 0 1em 2em;\n}\n\n.article-detail-container ol {\n    margin: 1em 0 1em 2em;\n}\n\n.article-detail-container ul li,\n.article-detail-container ol li {\n    margin-top: .5em;\n    margin-bottom: .5em;\n}\n\n.article-detail-container ul ul,\n.article-detail-container ul ol,\n.article-detail-container ol ol,\n.article-detail-container ol ul {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n\n.article-detail-container blockquote {\n    margin: 1em 0;\n    border-left: 5px solid #dddddd;\n    padding-left: .6em;\n    color: #555555;\n}\n\n.article-detail-container dt {\n    font-weight: bold;\n    margin-left: 1em;\n}\n\n.article-detail-container dd {\n    margin-left: 2em;\n    margin-bottom: 1em;\n}\n\n.article-detail-container strong {\n    font-size: 1.1em;\n}\n\n/* 自动生成的目录列表 */\n#markdown-outline {\n    position: fixed;\n    top: 10px;\n    right: 10px;\n    border: 1px solid #cccccc;\n    box-shadow: 5px 5px 2px #cccccc;\n    padding: 5px 10px;\n    background-color: #ffffff;\n    overflow-y: auto;\n}\n\n#markdown-outline ul {\n    margin: 5px 0 5px 0;\n    padding-left: 30px;\n    font-size: 12px;\n    border-left: 1px dotted #cccccc;\n}\n#markdown-outline ul:first-child {\n    border: none;\n}", ""]);
	
	// exports


/***/ },
/* 36 */
/*!***************************************************************!*\
  !*** ../web/src/components/article-detail/article-detail.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./article-detail.css */ 37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./article-detail.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./article-detail.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/*!*******************************************************************************!*\
  !*** ../~/css-loader!../web/src/components/article-detail/article-detail.css ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 5)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * src/components/article-detail/article-detail.css\n *\n * 文章详情页样式\n */\n\n/* 内容部分 */\n.article-detail-container {\n    margin: 1em 0 0;\n    padding: 1em 1em .5em 1em;\n    background-color: #f2f2f2;\n}\n/* 文章目录 */\n.article-detail-headers-container,\n.article-detail-headers-container.open {\n    position: absolute;\n    top: 0;\n    right: 0;\n    overflow: scroll;\n    box-sizing: border-box;\n    width: auto;\n    max-width: 260px;\n    min-width: 120px;\n    height: auto;\n    border: 1px solid #e2e2e2;\n    padding: 6px;\n    border-radius: 0;\n    font-size: 14px;\n    line-height: 1.5em;\n    background: white;\n    opacity: .9;\n}\n.article-detail-headers-container p {\n    margin: 0;\n    padding: 0 4px;\n}\n.article-detail-headers-container strong {\n    border-bottom: 1px solid #e2e2e2;\n    display: block;\n}\n.article-detail-headers-container ul {\n    margin: .5em 1em .5em 1.5em;\n}\n.article-detail-headers-container a {\n    color: #2479cc;\n    text-decoration: none;\n    cursor: pointer;\n    /* 不折行 */\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; /* 强制不换行 */\n}\n.article-detail-headers-container ul ul {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.article-detail-headers-container .icon-catalogue {\n    display: none; /* 宽屏隐藏 */\n    box-sizing: border-box;\n    margin: -6px -6px;\n    width: 38px;\n    height: 38px;\n    padding: 5px 6px;\n    border-radius: 20px;\n    cursor: pointer;\n}\n.article-detail-headers-container .icon-close {\n    display: none;\n    float: right;\n    margin: -2px;\n}\n/* 文章列表图标 */\n.icon-catalogue {\n    display: inline-block;\n}\n.icon-catalogue i,\n.icon-catalogue i:before,\n.icon-catalogue i:after {\n    position: relative;\n    box-sizing: border-box;\n    display: block;\n    height: 2px;\n    width: 20px;\n    border-left: 2px solid #006a00;\n    border-right: 15px solid #006a00;\n    margin: 13px 2px;\n}\n.icon-catalogue i:before,\n.icon-catalogue i:after {\n    position: absolute;\n    margin: 0;\n    content: \"\\200B\";\n    left: -2px;\n}\n.icon-catalogue i:before {\n    top: -6px;\n}\n.icon-catalogue i:after {\n    bottom: -6px;\n}\n/* 关闭按钮图标 */\n.icon-close {\n    position: relative;\n    box-sizing: border-box;\n    display: inline-block;\n    height: 18px;\n    width: 18px;\n    cursor: pointer;\n}\n.icon-close:before,\n.icon-close:after {\n    position: absolute;\n    width: 100%;\n    height: 2px;\n    top: 50%;\n    background: #006a00;\n    content: \"\\200B\";\n}\n.icon-close:before {\n    transform: rotate(45deg);\n}\n.icon-close:after {\n    transform: rotate(-45deg);\n}\n/* 小于800时文章目录显示为图标 */\n@media screen and (max-width: 800px) {\n    .article-detail-headers-container {\n        width: 40px;\n        min-width: 40px;\n        height: 40px;\n        overflow: hidden;\n        border-radius: 20px;\n        right: 0;\n    }\n    .article-detail-headers-container.open {\n        height: auto;\n    }\n    .article-detail-headers-container .icon-catalogue {\n        display: inline-block;\n    }\n    .article-detail-headers-container.open .icon-catalogue {\n        display: none;\n    }\n    .article-detail-headers-container.open .icon-close {\n        display: inline-block;\n    }\n}\n/* 留言 */\n.article-message-container { }", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map