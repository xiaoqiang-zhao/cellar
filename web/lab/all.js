var ecui;
(function () {

//{assign var="phases" value="define,body" delimiter=","}//
//{foreach item="item" from=$phases}//
//{assign var="phase" value=$item}//
//{include file="adapter.js"}//
//{include file="core.js"}//
//{include file="control.js"}//
//{include file="input-control.js"}//
//{include file="button.js"}//
//{include file="scrollbar.js"}//
//{include file="panel.js"}//
//{include file="items.js"}//
//{include file="checkbox.js"}//
//{include file="radio.js"}//
//{include file="select.js"}//

//{include file="combox.js"}//
//{include file="form.js"}//
//{include file="tree-view.js"}//
//{include file="month-view.js"}//
//{include file="table.js"}//
//{include file="locked-table.js"}//
//{include file="popup-menu.js"}//
//{include file="listbox.js"}//
//{include file="tab.js"}//
//{include file="decorate.js"}//
//{include file="combine.js"}//

//*{include file="label.js"}//
//*{include file="progress.js"}//
//*{include file="collection.js"}//
//*{include file="calendar.js"}//
//*{include file="format-edit.js"}//
//*{include file="radio-tree.js"}//
//*{include file="check-tree.js"}//
//*{include file="color.js"}//
//*{include file="palette.js"}//
//*{include file="multi-select.js"}//
//*{include file="locked-table.js"}//
//*{include file="messagebox.js"}//
//*{include file="shield.js"}//
//*{include file="tween.js"}//
//{/foreach}//
})();

//{if 0}//
(function () {
//{/if}//
//{if $phase == "define"}//

//__gzip_unitize__i
//__gzip_unitize__list
//__gzip_unitize__o
//__gzip_unitize__el
//__gzip_unitize__params
    var core = ecui = {},
        array = core.array = {},
        dom = core.dom = {},
        ext = core.ext = {},
        json = core.json = {},
        string = core.string = {},
        ui = core.ui = {},
        util = core.util = {};

    //__gzip_original__WINDOW
    ///__gzip_original__DOCUMENT
    //__gzip_original__DATE
    //__gzip_original__FUNCTION
    //__gzip_original__MATH
    //__gzip_original__REGEXP
    //__gzip_original__ABS
    //__gzip_original__CEIL
    ///__gzip_original__FLOOR
    ///__gzip_original__MAX
    ///__gzip_original__MIN
    //__gzip_original__POW
    ///__gzip_original__ROUND
    ///__gzip_original__PARSEINT
    //__gzip_original__ISNAN
    var undefined,
        WINDOW = window,
        DOCUMENT = document,
        DATE = Date,
        FUNCTION = Function,
        MATH = Math,
        REGEXP = RegExp,
        ABS = MATH.abs,
        CEIL = MATH.ceil,
        FLOOR = MATH.floor,
        MAX = MATH.max,
        MIN = MATH.min,
        POW = MATH.pow,
        ROUND = MATH.round,
        PARSEINT = parseInt,
        ISNAN = isNaN;

    var USER_AGENT = navigator.userAgent,
        isStrict = DOCUMENT.compatMode == 'CSS1Compat',
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,
        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,
        operaVersion = /opera\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,
        safariVersion =
            /(\d+\.\d)(\.\d)?\s+safari/i.test(USER_AGENT) && !/chrome/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined;

    // 字符集基本操作定义
    var charset = {
        utf8: {
            byteLength: function (source) {
                return source.replace(/[\x80-\u07ff]/g, '  ').replace(/[\u0800-\uffff]/g, '   ').length;
            },

            codeLength: function (code) {
                return code > 2047 ? 3 : code > 127 ? 2 : 1;
            }
        },

        gbk: {
            byteLength: function (source) {
                return source.replace(/[\x80-\uffff]/g, '  ').length;
            },

            codeLength: function (code) {
                return code > 127 ? 2 : 1;
            }
        },

        '': {
            byteLength: function (source) {
                return source.length;
            },

            codeLength: function (code) {
                return 1;
            }
        }
    };

    // 读写特殊的 css 属性操作
    var styleFixer = {
        display: ieVersion < 8 ? {
            get: function (el, style) {
                return style.display == 'inline' && style.zoom == 1 ? 'inline-block' : style.display;
            },

            set: function (el, value) {
                if (value == 'inline-block') {
                    value = 'inline';
                    el.style.zoom = 1;
                }
                el.style.display = value;
            }
        } : firefoxVersion < 3 ? {
            get: function (el, style) {
                return style.display == '-moz-inline-box' ? 'inline-block' : style.display;
            },

            set: function (el, value) {
                el.style.display = value == 'inline-block' ? '-moz-inline-box' : value;
            }
        } : undefined,

        opacity: ieVersion < 9 ? {
            get: function (el, style) {
                return /alpha\(opacity=(\d+)/.test(style.filter) ? ((REGEXP.$1 - 0) / 100) + '' : '1';
            },

            set: function (el, value) {
                el.style.filter =
                    el.style.filter.replace(/alpha\([^\)]*\)/gi, '') + 'alpha(opacity=' + value * 100 + ')';
            }
        } : undefined,

        'float': ieVersion ? 'styleFloat' : 'cssFloat'
    };

    /**
     * 查询数组中指定对象的位置序号。
     * indexOf 方法返回完全匹配的对象在数组中的序号，如果在数组中找不到指定的对象，返回 -1。
     * @public
     *
     * @param {Array} list 数组对象
     * @param {Object} obj 需要查询的对象
     * @return {number} 位置序号，不存在返回 -1
     */
    var indexOf = array.indexOf = function (list, obj) {
            for (var i = list.length; i--;) {
                if (list[i] === obj) {
                    break;
                }
            }
            return i;
        },

        /**
         * 从数组中移除对象。
         * @public
         *
         * @param {Array} list 数组对象
         * @param {Object} obj 需要移除的对象
         */
        remove = array.remove = function (list, obj) {
            for (var i = list.length; i--;) {
                if (list[i] === obj) {
                    list.splice(i, 1);
                }
            }
        },

        /**
         * 为 Element 对象添加新的样式。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间使用空白符分隔
         */
        addClass = dom.addClass = function (el, className) {
            // 这里直接添加是为了提高效率，因此对于可能重复添加的属性，请使用标志位判断是否已经存在，
            // 或者先使用 removeClass 方法删除之前的样式
            el.className += ' ' + className;
        },

        /**
         * 获取所有 parentNode 为指定 Element 的子 Element 集合。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {Array} Element 对象数组
         */
        children = dom.children = function (el) {
            for (var result = [], o = el.firstChild; o; o = o.nextSibling) {
                if (o.nodeType == 1) {
                    result.push(o);
                }
            }
            return result;
        },

        /**
         * 判断一个 Element 对象是否包含另一个 Element 对象。
         * contain 方法认为两个相同的 Element 对象相互包含。
         * @public
         *
         * @param {HTMLElement} container 包含的 Element 对象
         * @param {HTMLElement} contained 被包含的 Element 对象
         * @return {boolean} contained 对象是否被包含于 container 对象的 DOM 节点上
         */
        contain = dom.contain = firefoxVersion ? function (container, contained) {
            return container == contained || !!(container.compareDocumentPosition(contained) & 16);
        } : function (container, contained) {
            return container.contains(contained);
        },

        /**
         * 创建 Element 对象。
         * @public
         *
         * @param {string} className 样式名称
         * @param {string} cssText 样式文本
         * @param {string} tagName 标签名称，默认创建一个空的 div 对象
         * @return {HTMLElement} 创建的 Element 对象
         */
        createDom = dom.create = function (className, cssText, tagName) {
            tagName = DOCUMENT.createElement(tagName || 'DIV');
            if (className) {
                tagName.className = className;
            }
            if (cssText) {
                tagName.style.cssText = cssText;
            }
            return tagName;
        },

        /**
         * 获取 Element 对象的第一个子 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 子 Element 对象
         */
        first = dom.first = function (el) {
            return matchNode(el.firstChild, 'nextSibling');
        },

        /**
         * 获取 Element 对象的属性值。
         * 在 IE 下，Element 对象的属性可以通过名称直接访问，效率是 getAttribute 方式的两倍。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 属性名称
         * @return {string} 属性值
         */
        getAttribute = dom.getAttribute = ieVersion < 8 ? function (el, name) {
            return el[name];
        } : function (el, name) {
            return el.getAttribute(name);
        },

        /**
         * 获取 Element 对象的父 Element 对象。
         * 在 IE 下，Element 对象被 removeChild 方法移除时，parentNode 仍然指向原来的父 Element 对象，与 W3C 标准兼容的属性应该是 parentElement。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 父 Element 对象，如果没有，返回 null
         */
        getParent = dom.getParent = ieVersion ? function (el) {
            return el.parentElement;
        } : function (el) {
            return el.parentNode;
        },

        /**
         * 获取 Element 对象的页面位置。
         * getPosition 方法将返回指定 Element 对象的位置信息。属性如下：
         * left {number} X轴坐标
         * top  {number} Y轴坐标
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {Object} 位置信息
         */
        getPosition = dom.getPosition = function (el) {
            var element = baidu.dom.g(el);
            var doc = baidu.dom.getDocument(element),
                browser = baidu.browser,
                getStyle = baidu.dom.getStyle,
            // Gecko 1.9版本以下用getBoxObjectFor计算位置
            // 但是某些情况下是有bug的
            // 对于这些有bug的情况
            // 使用递归查找的方式
                BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 &&
                    doc.getBoxObjectFor &&
                    getStyle(element, 'position') == 'absolute' &&
                    (element.style.top === '' || element.style.left === ''),
                pos = {"left": 0, "top": 0},
                viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
                parent,
                box;

            if (element == viewport) {
                return pos;
            }


            if (element.getBoundingClientRect) { // IE and Gecko 1.9+

                //当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
                //考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
                box = element.getBoundingClientRect();

                pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);

                // IE会给HTML元素添加一个border，默认是medium（2px）
                // 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
                // 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
                // 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
                // clientTop和clientLeft不会更新
                pos.left -= doc.documentElement.clientLeft;
                pos.top -= doc.documentElement.clientTop;

                var htmlDom = doc.body,
                // 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
                    htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
                    htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
                if (browser.ie && !browser.isStrict) {
                    pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                    pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
                }
                /*
                 * 因为firefox 3.6和4.0在特定页面下(场景待补充)都会出现1px偏移,所以暂时移除该逻辑分支
                 * 如果 2.0版本时firefox仍存在问题,该逻辑分支将彻底移除. by rocy 2011-01-20
                 } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT){ // gecko 1.9-

                 // 1.9以下的Gecko，会忽略ancestors的scroll值
                 // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
                 // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

                 box = doc.getBoxObjectFor(element);
                 var vpBox = doc.getBoxObjectFor(viewport);
                 pos.left = box.screenX - vpBox.screenX;
                 pos.top  = box.screenY - vpBox.screenY;
                 */
            } else { // safari/opera/firefox
                parent = element;

                do {
                    pos.left += parent.offsetLeft;
                    pos.top += parent.offsetTop;

                    // safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
                    if (browser.isWebkit > 0 && getStyle(parent, 'position') == 'fixed') {
                        pos.left += doc.body.scrollLeft;
                        pos.top += doc.body.scrollTop;
                        break;
                    }

                    parent = parent.offsetParent;
                } while (parent && parent != element);

                // 对body offsetTop的修正
                if (browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') == 'absolute')) {
                    pos.top -= doc.body.offsetTop;
                }

                // 计算除了body的scroll
                parent = element.offsetParent;
                while (parent && parent != doc.body) {
                    pos.left -= parent.scrollLeft;
                    // see https://bugs.opera.com/show_bug.cgi?id=249965
                    //            if (!b.opera || parent.tagName != 'TR') {
                    if (!browser.opera || parent.tagName != 'TR') {
                        pos.top -= parent.scrollTop;
                    }
                    parent = parent.offsetParent;
                }
            }

            return pos;
        },

        /**
         * 获取 Element 对象的 CssStyle 对象或者是指定的样式值。
         * getStyle 方法如果不指定样式名称，将返回 Element 对象的当前 CssStyle 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @return {CssStyle|Object} CssStyle 对象或样式值
         */
        getStyle = dom.getStyle = function (el, name) {
            var fixer = styleFixer[name],
                style = el.currentStyle || (ieVersion ? el.style : getComputedStyle(el, null));

            return name ? fixer && fixer.get ? fixer.get(el, style) : style[fixer || name] : style;
        },

        /**
         * 获取 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {string} Element 对象的文本
         */
        getText = dom.getText = firefoxVersion ? function (el) {
            return el.textContent;
        } : function (el) {
            return el.innerText;
        },

        /**
         * 将 Element 对象插入指定的 Element 对象之后。
         * 如果指定的 Element 对象没有父 Element 对象，相当于 remove 操作。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertAfter = dom.insertAfter = function (el, target) {
            var parent = getParent(target);
            return parent ? parent.insertBefore(el, target.nextSibling) : removeDom(el);
        },

        /**
         * 将 Element 对象插入指定的 Element 对象之前。
         * 如果指定的 Element 对象没有父 Element 对象，相当于 remove 操作。
         * @public
         *
         * @param {HTMLElement} el 被插入的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @return {HTMLElement} 被插入的 Element 对象
         */
        insertBefore = dom.insertBefore = function (el, target) {
            var parent = getParent(target);
            return parent ? parent.insertBefore(el, target) : removeDom(el);
        },

        /**
         * 向指定的 Element 对象内插入一段 html 代码。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} position 插入 html 的位置信息，取值为 beforeBegin,afterBegin,beforeEnd,afterEnd
         * @param {string} html 要插入的 html 代码
         */
        insertHTML = dom.insertHTML = firefoxVersion ? function (el, position, html) {
            var name = {
                    AFTERBEGIN: 'selectNodeContents',
                    BEFOREEND: 'selectNodeContents',
                    BEFOREBEGIN: 'setStartBefore',
                    AFTEREND: 'setEndAfter'
                }[position.toUpperCase()],
                range = DOCUMENT.createRange();

            range[name](el);
            range.collapse(position.length > 9);
            range.insertNode(range.createContextualFragment(html));
        } : function (el, position, html) {
            el.insertAdjacentHTML(position, html);
        },

        /**
         * 获取 Element 对象的最后一个子 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 子 Element 对象
         */
        last = dom.last = function (el) {
            return matchNode(el.lastChild, 'previousSibling');
        },

        /**
         * 将指定的 Element 对象的内容移动到目标 Element 对象中。
         * @public
         *
         * @param {HTMLElement} source 指定的 Element 对象
         * @param {HTMLElement} target 目标 Element 对象
         * @param {boolean} all 是否移动所有的 DOM 对象，默认仅移动 ElementNode 类型的对象
         */
        moveElements = dom.moveElements = function (source, target, all) {
            //__transform__el_o
            for (var el = source.firstChild; el; el = source) {
                source = el.nextSibling;
                if (all || el.nodeType == 1) {
                    target.appendChild(el);
                }
            }
        },

        /**
         * 获取 Element 对象的下一个 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} Element 对象
         */
        next = dom.next = function (el) {
            return matchNode(el.nextSibling, 'nextSibling');
        },

        /**
         * 从页面中移除 Element 对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {HTMLElement} 被移除的 Element 对象
         */
        removeDom = dom.remove = function (el) {
            var parent = getParent(el);
            if (parent) {
                parent.removeChild(el);
            }
            return el;
        },

        /**
         * 删除 Element 对象中的样式。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} className 样式名，可以是多个，中间用空白符分隔
         */
        removeClass = dom.removeClass = function (el, className) {
            var oldClasses = el.className.split(/\s+/).sort(),
                newClasses = className.split(/\s+/).sort(),
                i = oldClasses.length,
                j = newClasses.length;

            for (; i && j;) {
                if (oldClasses[i - 1] == newClasses[j - 1]) {
                    oldClasses.splice(--i, 1);
                }
                else if (oldClasses[i - 1] < newClasses[j - 1]) {
                    j--;
                }
                else {
                    i--;
                }
            }
            el.className = oldClasses.join(' ');
        },

        /**
         * 设置输入框的表单项属性。
         * 如果没有指定一个表单项，setInput 方法将创建一个表单项。
         * @public
         *
         * @param {HTMLElement} el InputElement 对象
         * @param {string} name 新的表单项名称，默认与 el 相同
         * @param {string} type 新的表单项类型，默认为 el 相同
         * @return {HTMLElement} 设置后的 InputElement 对象
         */
        setInput = dom.setInput = function (el, name, type) {
            if (!el) {
                if (type == 'textarea') {
                    el = createDom('', '', 'textarea');
                }
                else {
                    if (ieVersion < 9) {
                        return createDom('', '', '<input type="' + (type || '') + '" name="' + (name || '') + '" />');
                    }
                    el = createDom('', '', 'input');
                }
            }

            name = name === undefined ? el.name : name;
            type = type === undefined ? el.type : type;

            if (el.name != name || el.type != type) {
                if ((ieVersion && ieVersion < 10 && type != 'textarea') ||
                    el.type != type && (el.type == 'textarea' || type == 'textarea')) {
                    insertHTML(
                        el,
                        'AFTEREND',
                        '<' + (type == 'textarea' ? 'textarea' : 'input type="' + type + '"') +
                        ' name="' + name + '" class="' + el.className +
                        '" style="' + el.style.cssText + '" ' + (el.disabled ? 'disabled' : '') +
                        (el.readOnly ? ' readOnly' : '') + '>'
                    );
                    name = el;
                    (el = el.nextSibling).value = name.value;
                    if (type == 'radio') {
                        el.checked = name.checked;
                    }
                    removeDom(name);
                }
                else {
                    el.type = type;
                    el.name = name;
                }
            }
            return el;
        },

        /**
         * 设置 Element 对象的样式值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} name 样式名称
         * @param {string} value 样式值
         */
        setStyle = dom.setStyle = function (el, name, value) {
            var fixer = styleFixer[name];
            if (fixer && fixer.set) {
                fixer.set(el, value);
            }
            else {
                el.style[fixer || name] = value;
            }
        },

        /**
         * 设置 Element 对象的文本。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} text Element 对象的文本
         */
        setText = dom.setText = firefoxVersion ? function (el, text) {
            el.textContent = text;
        } : function (el, text) {
            el.innerText = text;
        },

        /**
         * JSON字串解析，将JSON字符串解析为JSON对象。
         * @public
         *
         * @param {string} text json字符串
         * @return {Object} json字符串描述的对象
         */
        parse = json.parse = function (text) {
            return new Function('return (' + text + ')')();
        },

        /**
         * JSON对象序列化。
         * @public
         *
         * @param {Object} source 需要序列化的对象
         * @return {string} json字符串
         */
        stringify = json.stringify = (function () {
//__gzip_unitize__result
//__gzip_unitize__source
            var escapeMap = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            /**
             * 字符串序列化。
             * @private
             *
             * @param {string} source 需要序列化的字符串
             */
            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var o = escapeMap[match];
                            if (o) {
                                return o;
                            }
                            o = match.charCodeAt();
                            return '\\u00' + FLOOR(o / 16) + (o % 16).toString(16);
                        }
                    );
                }
                return '"' + source + '"';
            }

            /**
             * 数组序列化。
             * @private
             *
             * @param {Array} source 需要序列化的数组
             */
            function encodeArray(source) {
                var i = 0,
                    result = [],
                    o,
                    l = source.length;

                for (var i = 0, result = [], o, l = source.length; i < l; i++) {
                    if ((o = stringify(source[i])) !== undefined) {
                        result.push(o);
                    }
                }
                return '[' + result.join(',') + ']';
            }

            /**
             * 处理日期序列化时的补零。
             * @private
             *
             * @param {number} source 数值，小于10需要补零
             */
            function pad(source) {
                return source < 10 ? '0' + source : source;
            }

            /**
             * 日期序列化。
             * @private
             *
             * @param {Date} source 需要序列化的日期
             */
            function encodeDate(source) {
                return '"' + source.getFullYear() + '-' + pad(source.getMonth() + 1) + '-' +
                    pad(source.getDate()) + 'T' + pad(source.getHours()) + ':' +
                    pad(source.getMinutes()) + ':' + pad(source.getSeconds()) + '"';
            }

            return function (source) {
                switch (typeof source) {
                    case 'undefined':
                    case 'function':
                    case 'unknown':
                        return undefined;
                    case 'number':
                        if (!isFinite(source)) {
                            return 'null';
                        }
                    // 对于有意义的数值与布尔类型直接输出
                    case 'boolean':
                        return source.toString();
                    case 'string':
                        return encodeString(source);
                    default:
                        if (source === null) {
                            return 'null';
                        }
                        else if (source instanceof Array) {
                            return encodeArray(source);
                        }
                        else if (source instanceof Date) {
                            return encodeDate(source);
                        }
                        else {
                            var result = [],
                                o;

                            for (var i in source) {
                                if ((o = stringify(source[i])) !== undefined) {
                                    result.push(encodeString(i) + ':' + o);
                                }
                            }

                            return '{' + result.join(',') + '}';
                        }
                }
            };
        })(),

        /**
         * 对目标字符串进行 html 解码。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        decodeHTML = string.decodeHTML = (function () {
            var codeTable = {
                quot: '"',
                lt: '<',
                gt: '>',
                amp: '&'
            };

            return function (source) {
                //处理转义的中文和实体字符
                return source.replace(/&(quot|lt|gt|amp|#([\d]+));/g, function (match, $1, $2) {
                    return codeTable[$1] || String.fromCharCode(+$2);
                });
            };
        })(),

        /**
         * 对目标字符串进行 html 编码。
         * encodeHTML 方法对四个字符进行编码，分别是 &<>"
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        encodeHTML = string.encodeHTML = function (source) {
            source = source + '';
            return source.replace(/[&<>"']/g, function (c) {
                return '&#' + c.charCodeAt(0) + ';';
            });
        },

        /**
         * 计算字符串的字节长度。
         * 如果没有指定编码集，相当于获取字符串属性 length 的值。
         *
         * @param {string} source 目标字符串
         * @param {string} charsetName 字符对应的编码集
         * @return {number} 字节长度
         */
        getByteLength = string.getByteLength = function (source, charsetName) {
            return charset[charsetName || ''].byteLength(source);
        },

        /**
         * 根据字节长度截取字符串。
         * 如果没有指定编码集，相当于字符串的 slice 方法。
         *
         * @param {string} source 目标字符串
         * @param {number} length 需要截取的字节长度
         * @param {string} charsetName 字符对应的编码集
         * @return {string} 结果字符串
         */
        sliceByte = string.sliceByte = function (source, length, charsetName) {
            for (var i = 0, func = charset[charsetName || ''].codeLength; i < source.length; i++) {
                length -= func(source.charCodeAt(i));
                if (length < 0) {
                    return source.slice(0, i);
                }
            }

            return source;
        },

        /**
         * 驼峰命名法转换。
         * toCamelCase 方法将 xxx-xxx 字符串转换成 xxxXxx。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        toCamelCase = string.toCamelCase = function (source) {
            if (source.indexOf('-') < 0) {
                return source;
            }
            return source.replace(/\-./g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        },

        /**
         * 将目标字符串中常见全角字符转换成半角字符。
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        toHalfWidth = string.toHalfWidth = function (source) {
            return source.replace(/[\u3000\uFF01-\uFF5E]/g, function (c) {
                return String.fromCharCode(MAX(c.charCodeAt(0) - 65248, 32));
            });
        },

        /**
         * 过滤字符串两端的空白字符。
         * @public
         *
         * @param {string} source 目标字符串
         * @return {string} 结果字符串
         */
        trim = string.trim = function (source) {
            return source && source.replace(/^\s+|\s+$/g, '');
        },

        /**
         * 日期格式化。
         * @public
         *
         * @param {Date} source 日期对象
         * @param {string} pattern 日期格式描述字符串
         * @return {string} 结果字符串
         */
        formatDate = string.formatDate = function (source, pattern) {
            var year = source.getFullYear(),
                month = source.getMonth() + 1,
                date = source.getDate(),
                hours = source.getHours(),
                minutes = source.getMinutes(),
                seconds = source.getSeconds();

            return pattern.replace(/(y+|M+|d+|H+|h+|m+|s+)/g, function (match) {
                var length = match.length;
                switch (match.charAt()) {
                    case 'y':
                        return length > 2 ? year : year.toString().slice(2);
                    case 'M':
                        match = month;
                        break;
                    case 'd':
                        match = date;
                        break;
                    case 'H':
                        match = hours;
                        break;
                    case 'h':
                        match = hours % 12;
                        break;
                    case 'm':
                        match = minutes;
                        break;
                    case 's':
                        match = seconds;
                }
                return length > 1 && match < 10 ? '0' + match : match;
            });
        },

        /**
         * 挂载事件。
         * @public
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        attachEvent = util.attachEvent = (ieVersion && ieVersion < 11) ? function (obj, type, func) {
            obj.attachEvent('on' + type, func);
        } : function (obj, type, func) {
            obj.addEventListener(type, func, false);
        },

    /*
     * 空函数。
     * blank 方法不应该被执行，也不进行任何处理，它用于提供给不需要执行操作的事件方法进行赋值，与 blank 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 cancel。
     * @public
     */
        blank = util.blank = function () {
        },

        /**
         * 调用指定对象超类的指定方法。
         * callSuper 用于不确定超类类型时的访问，例如接口内定义的方法。请注意，接口不允许被子类实现两次，否则将会引发死循环。
         * @public
         *
         * @param {Object} object 需要操作的对象
         * @param {string} name 方法名称
         * @return {Object} 超类方法的返回值
         */
        callSuper = util.callSuper = function (object, name) {
            /**
             * 查找指定的方法对应的超类方法。
             * @private
             *
             * @param {Object} clazz 查找的起始类对象
             * @param {Function} caller 基准方法，即查找 caller 对应的超类方法
             * @return {Function} 基准方法对应的超类方法，没有找到基准方法返回 undefined，基准方法没有超类方法返回 null
             */
            function findPrototype(clazz, caller) {
                for (; clazz; clazz = clazz.constructor.superClass) {
                    if (clazz[name] == caller) {
                        for (; clazz = clazz.constructor.superClass;) {
                            if (clazz[name] != caller) {
                                return clazz[name];
                            }
                        }
                        return null;
                    }
                }
            }

            //__gzip_original__clazz
            var clazz = object.constructor.prototype,
                caller = callSuper.caller,
                func = findPrototype(clazz, caller);

            if (func === undefined) {
                // 如果Items的方法直接位于prototype链上，是caller，如果是间接被别的方法调用Items.xxx.call，是caller.caller
                func = findPrototype(clazz, caller.caller);
            }

            if (func) {
                return func.apply(object, caller.arguments);
            }
        },

    /*
     * 返回 false。
     * cancel 方法不应该被执行，它每次返回 false，用于提供给需要返回逻辑假操作的事件方法进行赋值，例如需要取消默认事件操作的情况，与 cancel 类似的用于给事件方法进行赋值，而不直接被执行的方法还有 blank。
     * @public
     *
     * @return {boolean} false
     */
        cancel = util.cancel = function () {
            return false;
        },

        /**
         * 卸载事件。
         * @public
         *
         * @param {Object} obj 响应事件的对象
         * @param {string} type 事件类型
         * @param {Function} func 事件处理函数
         */
        detachEvent = util.detachEvent = (ieVersion && ieVersion < 11) ? function (obj, type, func) {
            obj.detachEvent('on' + type, func);
        } : function (obj, type, func) {
            obj.removeEventListener(type, func, false);
        },

        /**
         * 对象属性复制。
         * @public
         *
         * @param {Object} target 目标对象
         * @param {Object} source 源对象
         * @return {Object} 目标对象
         */
        extend = util.extend = function (target, source) {
            for (var key in source) {
                target[key] = source[key];
            }
            return target;
        },

        /**
         * 获取浏览器可视区域的相关信息。
         * getView 方法将返回浏览器可视区域的信息。属性如下：
         * top        {number} 可视区域最小X轴坐标
         * right      {number} 可视区域最大Y轴坐标
         * bottom     {number} 可视区域最大X轴坐标
         * left       {number} 可视区域最小Y轴坐标
         * width      {number} 可视区域的宽度
         * height     {number} 可视区域的高度
         * pageWidth  {number} 页面的宽度
         * pageHeight {number} 页面的高度
         * @public
         *
         * @return {Object} 浏览器可视区域信息
         */
        getView = util.getView = function () {
            //__gzip_original__clientWidth
            //__gzip_original__clientHeight
            var body = DOCUMENT.body,
                html = getParent(body),
                client = isStrict ? html : body,
                scrollTop = html.scrollTop + body.scrollTop,
                scrollLeft = html.scrollLeft + body.scrollLeft,
                clientWidth = client.clientWidth,
                clientHeight = client.clientHeight;

            return {
                top: scrollTop,
                right: scrollLeft + clientWidth,
                bottom: scrollTop + clientHeight,
                left: scrollLeft,
                width: clientWidth,
                height: clientHeight,
                pageWidth: MAX(html.scrollWidth, body.scrollWidth, clientWidth),
                pageHeight: MAX(html.scrollHeight, body.scrollHeight, clientHeight)
            };
        },

        /**
         * 类继承。
         * @public
         *
         * @param {Function} subClass 子类
         * @param {Function} superClass 父类
         * @return {Object} subClass 的 prototype 属性
         */
        inherits = util.inherits = function (subClass, superClass) {
            var oldPrototype = subClass.prototype,
                clazz = new FUNCTION();

            clazz.prototype = superClass.prototype;
            extend(subClass.prototype = new clazz(), oldPrototype);
            subClass.prototype.constructor = subClass;
            subClass.superClass = superClass.prototype;

            return subClass.prototype;
        },

        /**
         * 设置缺省的属性值。
         * 如果对象的属性已经被设置，setDefault 方法不进行任何处理，否则将默认值设置到指定的属性上。
         * @public
         *
         * @param {Object} obj 被设置的对象
         * @param {string} key 属性名
         * @param {Object} value 属性的默认值
         */
        setDefault = util.setDefault = function (obj, key, value) {
            if (!obj.hasOwnProperty(key)) {
                obj[key] = value;
            }
        },

        /**
         * 创建一个定时器对象。
         * @public
         *
         * @param {Function} func 定时器需要调用的函数
         * @param {number} delay 定时器延迟调用的毫秒数，如果为负数表示需要连续触发
         * @param {Object} caller 调用者，在 func 被执行时，this 指针指向的对象，可以为空
         * @param {Object} ... 向 func 传递的参数
         * @return {Function} 用于关闭定时器的方法
         */
        timer = util.timer = function (func, delay, caller) {
            function build() {
                return (delay < 0 ? setInterval : setTimeout)(function () {
                    func.apply(caller, args);
                    // 使用delay<0而不是delay>=0，是防止delay没有值的时候，不进入分支
                    if (!(delay < 0)) {
                        func = caller = args = null;
                    }
                }, ABS(delay));
            }

            var args = Array.prototype.slice.call(arguments, 3),
                handle = build(),
                pausing;

            /**
             * 中止定时调用。
             * @public
             *
             * @param {boolean} pause 是否暂时停止定时器，如果参数是 true，再次调用函数并传入参数 true 恢复运行。
             */
            return function (pause) {
                (delay < 0 ? clearInterval : clearTimeout)(handle);
                if (pause) {
                    if (pausing) {
                        handle = build();
                    }
                    pausing = !pausing;
                }
                else {
                    func = caller = args = null;
                }
            };
        },

        /**
         * 将对象转换成数值。
         * toNumber 方法会省略数值的符号，例如字符串 9px 将当成数值的 9，不能识别的数值将默认为 0。
         * @public
         *
         * @param {Object} obj 需要转换的对象
         * @return {number} 对象的数值
         */
        toNumber = util.toNumber = function (obj) {
            return PARSEINT(obj) || 0;
        },

        /**
         * 设置页面加载完毕后自动执行的方法。
         * @public
         *
         * @param {Function} func 需要自动执行的方法
         */
        ready = dom.ready = (function () {
            var hasReady = false,
                list = [],
                check,
                numStyles;

            function ready() {
                if (!hasReady) {
                    hasReady = true;
                    for (var i = 0, o; o = list[i++];) {
                        o();
                    }
                }
            }

            if (DOCUMENT.addEventListener && !operaVersion) {
                DOCUMENT.addEventListener('DOMContentLoaded', ready, false);
            }
            else if (ieVersion && WINDOW == top) {
                check = function () {
                    try {
                        DOCUMENT.documentElement.doScroll('left');
                        ready();
                    }
                    catch (e) {
                        timer(check, 0);
                    }
                };
            }
            else if (safariVersion) {
                check = function () {
                    var i = 0,
                        list,
                        o = DOCUMENT.readyState;

                    if (o != 'loaded' && o != 'complete') {
                        timer(check, 0);
                    }
                    else {
                        if (numStyles === undefined) {
                            numStyles = 0;
                            if (list = DOCUMENT.getElementsByTagName('style')) {
                                numStyles += list.length;
                            }
                            if (list = DOCUMENT.getElementsByTagName('link')) {
                                for (; o = list[i++];) {
                                    if (getAttribute(o, 'rel') == 'stylesheet') {
                                        numStyles++;
                                    }
                                }
                            }
                        }
                        if (DOCUMENT.styleSheets.length != numStyles) {
                            timer(check, 0);
                        }
                        else {
                            ready();
                        }
                    }
                };
            }

            if (check) {
                check();
            }

            attachEvent(WINDOW, 'load', ready);

            return function (func) {
                if (hasReady) {
                    func();
                }
                else {
                    list.push(func);
                }
            };
        })();
//{else}//
    /**
     * 获取 Element 对象指定位置的 Element 对象。
     * @private
     *
     * @param {HTMLElement} el Element 对象
     * @param {string} direction Element 对象遍历的属性
     * @return {HTMLElement} 指定位置的 Element 对象
     */
    function matchNode(el, direction) {
        for (; el; el = el[direction]) {
            if (el.nodeType == 1) {
                break;
            }
        }
        return el;
    }

    try {
        DOCUMENT.execCommand("BackgroundImageCache", false, true);
    }
    catch (e) {
    }
//{/if}//
//{if 0}//
})();
//{/if}//

//{if 0}//
(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ext = core.ext,
        string = core.string,
        util = core.util,
        ui = core.ui,

        undefined,
        WINDOW = window,
        DOCUMENT = document,
        DATE = Date,
        MATH = Math,
        REGEXP = RegExp,
        ABS = MATH.abs,
        MAX = MATH.max,
        MIN = MATH.min,
        ISNAN = isNaN,

        USER_AGENT = navigator.userAgent,
        isStrict = DOCUMENT.compatMode == 'CSS1Compat',
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,
        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined,

        indexOf = array.indexOf,
        remove = array.remove,
        addClass = dom.addClass,
        contain = dom.contain,
        createDom = dom.create,
        getAttribute = dom.getAttribute,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getStyle = dom.getStyle,
        insertHTML = dom.insertHTML,
        ready = dom.ready,
        removeDom = dom.remove,
        removeClass = dom.removeClass,
        setStyle = dom.setStyle,
        toCamelCase = string.toCamelCase,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,
        extend = util.extend,
        getView = util.getView,
        inherits = util.inherits,
        timer = util.timer,
        toNumber = util.toNumber;
//{/if}//
//{if $phase == "define"}//
    var NORMAL = core.NORMAL = 0,
        LOADING = core.LOADING = 1,
        REPAINT = core.REPAINT = 2;

//__gzip_unitize__event
    var $bind,
        $connect,
        $clearState,
        $create,
        $fastCreate,
        calcHeightRevise,
        calcLeftRevise,
        calcTopRevise,
        calcWidthRevise,
        createControl,
        disposeControl,
        drag,

        /**
         * 从指定的 Element 对象开始，依次向它的父节点查找绑定的 ECUI 控件。
         * findControl 方法，会返回从当前 Element 对象开始，依次向它的父 Element 查找到的第一个绑定(参见 $bind 方法)的 ECUI 控件。findControl 方法一般在控件创建时使用，用于查找父控件对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {ecui.ui.Control} ECUI 控件对象，如果不能找到，返回 null
         */
        findControl = core.findControl = function (el) {
            for (; el; el = getParent(el)) {
                if (el.getControl) {
                    return el.getControl();
                }
            }

            return null;
        },
        getActived,
        getAttributeName,
        getFocused,
        getHovered,
        getKey,
        getMouseX,
        getMouseY,
        getOptions,
        getScrollNarrow,
        getStatus,
        inheritsControl,
        intercept,
        isContentBox,
        loseFocus,
        mask,
        needInitClass,
        query,
        restore,
        setFocused,
        triggerEvent,
        wrapEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ];

    (function () {
        /**
         * 创建 ECUI 事件对象。
         * @public
         *
         * @param {string} type 事件类型
         * @param {Event} event 浏览器原生事件对象，忽略将自动填充
         */
        ///__gzip_original__UI_EVENT_CLASS
        var UI_EVENT = ui.Event = function (type, event) {
                this.type = type;

                if (event) {
                    this.pageX = event.pageX;
                    this.pageY = event.pageY;
                    this.which = event.which;
                    this.target = event.target;
                    this._oNative = event;
                }
                else {
                    this.pageX = mouseX;
                    this.pageY = mouseY;
                    this.which = keyCode;
                    this.target = DOCUMENT;
                }
            },
            UI_EVENT_CLASS = UI_EVENT.prototype,

            ecuiName = 'ecui',        // Element 中用于自动渲染的 ecui 属性名称
            isGlobalId,               // 是否自动将 ecui 的标识符全局化
            structural,               // DOM结构生成的方式，0表示填充所有内容，1表示不填充控件的class，2表示完全不填充

            flgContentBox,            // 在计算宽度与高度时，是否需要修正内填充与边框样式的影响
            flgFixedOffset,           // 在计算相对位置时，是否需要修正边框样式的影响
            scrollNarrow,             // 浏览器滚动条相对窄的一边的长度

            initRecursion = 0,        // init 操作的递归次数
            lastClientWidth,          // 浏览器之前的宽度

            plugins = {},             // 扩展组件列表
            maskElements = [],        // 遮罩层组

            mouseX,                   // 当前鼠标光标的X轴坐标
            mouseY,                   // 当前鼠标光标的Y轴坐标
            keyCode = 0,              // 当前键盘按下的键值，解决keypress与keyup中得不到特殊按键的keyCode的问题
            lastClick,                // 上一次产生点击事件的信息

            status,                   // 框架当前状态
            allControls = [],         // 全部生成的控件，供释放控件占用的内存使用
            independentControls = [], // 独立的控件，即使用create($create)方法创建的控件
            namedControls,            // 所有被命名的控件的集合
            uniqueIndex = 0,          // 控件的唯一序号
            connectedControls = {},   // 等待关联的控件集合

            activedControl,           // 当前环境下被激活的控件，即鼠标左键按下时对应的控件，直到左键松开后失去激活状态
            hoveredControl,           // 当前环境下鼠标悬停的控件
            focusedControl,           // 当前环境下拥有焦点的控件

            eventListeners = {},      // 控件事件监听描述对象

            envStack = [],            // 高优先级事件调用时，保存上一个事件环境的栈
            currEnv = {               // 当前操作的环境

                // 鼠标点击时控件如果被屏弊需要取消点击事件的默认处理，此时链接将不能提交
                click: function (event) {
                    event = wrapEvent(event);

                    //__transform__control_o
                    var control = findControl(event.target);

                    if (control && control.isDisabled()) {
                        event.preventDefault();
                    }
                },

                // 鼠标左键按下需要改变框架中拥有焦点的控件
                mousedown: function (event) {
                    if (activedControl) {
                        // 如果按下鼠标左键后，使用ALT+TAB使浏览器失去焦点然后松开鼠标左键，
                        // 需要恢复激活控件状态，第一次点击失效
                        bubble(activedControl, 'deactivate');
                        activedControl = null;
                        return;
                    }

                    event = wrapEvent(event);
                    //edit by coocon
                    //这很卑鄙，但是因为disable的日历控件，想点击失效item也不消失，
                    //所以就传入control的_sPrimary, 走个后门
                    var except = 'ui-monthview-item';
                    //__transform__control_o
                    var control = event.getControl(except),
                    // 修复ie下跨iframe导致的事件类型错误的问题
                        flag = ieVersion < 8 && isScrollClick(event),
                        target = control;

                    if (!(lastClick && isDblClick())) {
                        lastClick = {time: new DATE().getTime()};
                    }

                    if (control) {
                        if (flag) {
                            // IE8以下的版本，如果为控件添加激活样式，原生滚动条的操作会失效
                            // 常见的表现是需要点击两次才能进行滚动操作，而且中途不能离开控件区域
                            // 以免触发悬停状态的样式改变。
                            return;
                        }
                        if (control._bDisabled) {
                            //如果是点击的日历控件 就直接触发一个mousedown事件之后返回，也不用blur
                            mousedown(control, event);
                            return;
                        }

                        for (; target; target = target.getParent()) {
                            if (target.isFocusable()) {
                                if (!(target != control && target.contain(focusedControl))) {
                                    // 允许获得焦点的控件必须是当前激活的控件，或者它没有焦点的时候才允许获得
                                    // 典型的用例是滚动条，滚动条不需要获得焦点，如果滚动条的父控件没有焦点
                                    // 父控件获得焦点，否则焦点不发生变化
                                    setFocused(target);
                                }
                                break;
                            }
                        }

                        if (!flag) {
                            //点击的滚动条
                            //   if(isScrollClick(event)) {
                            //      return;
                            //  }

                            // 如果不是在原生滚动条区域，进行左键按下的处理
                            mousedown(control, event);
                        }
                    }
                    else {
                        if (control = findControl(target = event.target)) {
                            // 如果点击的是失效状态的控件，检查是否需要取消文本选择
                            onselectstart(control, event);
                            // 检查是否INPUT/SELECT/TEXTAREA/BUTTON标签，需要失去焦点
                            if (target.tagName == 'INPUT' || target.tagName == 'SELECT' ||
                                target.tagName == 'TEXTAREA' || target.tagName == 'BUTTON') {
                                timer(function () {
                                    target.blur();
                                });
                            }
                        }
                        // 点击到了空白区域，取消控件的焦点
                        setFocused();
                        // 正常情况下 activedControl 是 null，如果是down按下但未点击到控件，此值为undefined
                        activedControl = undefined;
                    }
                },

                // 鼠标移入的处理，需要计算是不是位于当前移入的控件之外，如果是需要触发移出事件
                mouseover: function (event) {
                    if (currEnv.type != 'drag' && currEnv.type != 'zoom') {
                        event = wrapEvent(event);

                        //__transform__control_o
                        var control = event.getControl(),
                            parent = getCommonParent(control, hoveredControl);

                        bubble(hoveredControl, 'mouseout', event, parent);
                        bubble(control, 'mouseover', event, parent);

                        hoveredControl = control;
                    }
                },

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__transform__control_o
                    var control = event.getControl();

                    bubble(control, 'mousemove', event);
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__control_o
                    var control = event.getControl(),
                        commonParent;

                    if (activedControl !== null) {
                        // 如果为 null 表示之前没有触发 mousedown 事件就触发了 mouseup，
                        // 这种情况出现在鼠标在浏览器外按下了 down 然后回浏览器区域 up，
                        // 或者是 ie 系列浏览器在触发 dblclick 之前会触发一次单独的 mouseup，
                        // dblclick 在 ie 下的事件触发顺序是 mousedown/mouseup/click/mouseup/dblclick
                        bubble(control, 'mouseup', event);

                        if (activedControl) {
                            commonParent = getCommonParent(control, activedControl);
                            bubble(commonParent, 'click', event);
                            // 点击事件在同时响应鼠标按下与弹起周期的控件上触发(如果之间未产生鼠标移动事件)
                            // 模拟点击事件是为了解决控件的 Element 进行了 remove/append 操作后 click 事件不触发的问题
                            if (lastClick) {
                                if (isDblClick() && lastClick.target == control) {
                                    bubble(commonParent, 'dblclick', event);
                                    lastClick = null;
                                }
                                else {
                                    lastClick.target = control;
                                }
                            }
                            bubble(activedControl, 'deactivate', event);
                        }

                        // 将 activeControl 的设置复位，此时表示没有鼠标左键点击
                        activedControl = null;
                    }
                }
            },

            dragEnv = { // 拖曳操作的环境
                type: 'drag',

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target,
                    // 计算期待移到的位置
                        expectX = target.getX() + mouseX - currEnv.x,
                        expectY = target.getY() + mouseY - currEnv.y,
                    // 计算实际允许移到的位置
                        x = MIN(MAX(expectX, currEnv.left), currEnv.right),
                        y = MIN(MAX(expectY, currEnv.top), currEnv.bottom);

                    if (triggerEvent(target, 'dragmove', event, [x, y])) {
                        target.setPosition(x, y);
                    }

                    currEnv.x = mouseX + target.getX() - expectX;
                    currEnv.y = mouseY + target.getY() - expectY;
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target;
                    triggerEvent(target, 'dragend', event);
                    activedControl = currEnv.actived;
                    restore();

                    currEnv.mouseover(event);
                    currEnv.mouseup(event);
                }
            },

            interceptEnv = { // 强制点击拦截操作的环境
                type: 'intercept',

                mousedown: function (event) {
                    event = wrapEvent(event);


                    //__transform__target_o
                    var target = currEnv.target,
                        env = currEnv,
                        control = event.getControl();

                    lastClick = null;

                    if (!isScrollClick(event)) {
                        if (control && !control.isFocusable()) {
                            // 需要捕获但不激活的控件是最高优先级处理的控件，例如滚动条
                            mousedown(control, event);
                        }
                        else if (triggerEvent(target, 'intercept', event)) {
                            // 默认仅拦截一次，框架自动释放环境
                            restore();
                        }
                        else if (!event.cancelBubble) {
                            if (env == currEnv) {
                                // 不改变当前操作环境表示希望继续进行点击拦截操作
                                // 例如弹出菜单点击到选项上时，不自动关闭并对下一次点击继续拦截
                                if (control) {
                                    mousedown(control, event);
                                }
                            }
                            else {
                                // 手动释放环境会造成向外层环境的事件传递
                                currEnv.mousedown(event);
                            }
                        }
                    }
                }
            },

            zoomEnv = { // 缩放操作的环境
                type: 'zoom',

                mousemove: function (event) {
                    event = wrapEvent(event);

                    //__gzip_original__minWidth
                    //__gzip_original__maxWidth
                    //__gzip_original__minHeight
                    //__gzip_original__maxHeight
                    //__transform__target_o
                    var target = currEnv.target,
                        width = currEnv.width = mouseX - currEnv.x + currEnv.width,
                        height = currEnv.height = mouseY - currEnv.y + currEnv.height,
                        minWidth = currEnv.minWidth,
                        maxWidth = currEnv.maxWidth,
                        minHeight = currEnv.minHeight,
                        maxHeight = currEnv.maxHeight;

                    currEnv.x = mouseX;
                    currEnv.y = mouseY;

                    width = minWidth > width ? minWidth : maxWidth < width ? maxWidth : width;
                    height = minHeight > height ? minHeight : maxHeight < height ? maxHeight : height;

                    // 如果宽度或高度是负数，需要重新计算定位
                    target.setPosition(currEnv.left + MIN(width, 0), currEnv.top + MIN(height, 0));
                    if (triggerEvent(target, 'zoom', event)) {
                        target.setSize(ABS(width), ABS(height));
                    }
                },

                mouseup: function (event) {
                    event = wrapEvent(event);

                    //__transform__target_o
                    var target = currEnv.target;
                    triggerEvent(target, 'zoomend', event);
                    activedControl = currEnv.actived;
                    restore();

                    repaint();
                    currEnv.mouseover(event);
                    currEnv.mouseup(event);
                }
            },

            /**
             * 初始化指定的 Element 对象对应的 DOM 节点树。
             * init 方法将初始化指定的 Element 对象及它的子节点，如果这些节点拥有初始化属性(参见 getAttributeName 方法)，将按照规则为它们绑定 ECUI 控件，每一个节点只会被绑定一次，重复的绑定无效。页面加载完成时，将会自动针对 document.body 执行这个方法，相当于自动执行以下的语句：ecui.init(document.body)
             * @public
             *
             * @param {Element} el Element 对象
             */
            init = core.init = function (el) {
                if (!initEnvironment() && el) {
                    var i = 0,
                        list = [],
                        options = el.all || el.getElementsByTagName('*'),
                        elements = [el],
                        o, namedMap = {};

                    if (!(initRecursion++)) {
                        // 第一层 init 循环的时候需要关闭resize事件监听，防止反复的重入
                        detachEvent(WINDOW, 'resize', repaint);
                    }

                    for (; o = options[i++];) {
                        if (getAttribute(o, ecuiName)) {
                            elements.push(o);
                        }
                    }

                    for (i = 0; el = elements[i]; i++) {
                        options = getOptions(el);
                        // 以下使用 el 替代 control
                        if (o = options.type) {
                            options.main = el;
                            list.push($create(ui[toCamelCase(o.charAt(0).toUpperCase() + o.slice(1))], options));
                            if (options.id) {
                                namedMap[options.id] = list[list.length - 1];
                            }
                        }
                    }

                    for (i = 0; o = list[i++];) {
                        o.cache();
                    }

                    for (i = 0; o = list[i++];) {
                        o.init();
                    }

                    if (!(--initRecursion)) {
                        attachEvent(WINDOW, 'resize', repaint);
                    }

                    return namedMap;
                }
            },

            /**
             * 重绘浏览器区域的控件。
             * repaint 方法在页面改变大小时自动触发，一些特殊情况下，例如包含框架的页面，页面变化时不会触发 onresize 事件，需要手工调用 repaint 函数重绘所有的控件。
             * @public
             */
            repaint = core.repaint = function () {
                var i = 0,
                    list = [],
                    widthList = [],
                    o;

                if (ieVersion) {
                    // 防止 ie6/7 下的多次重入
                    o = (isStrict ? DOCUMENT.documentElement : DOCUMENT.body).clientWidth;
                    if (lastClientWidth != o) {
                        lastClientWidth = o;
                    }
                    else {
                        // 如果高度发生变化，相当于滚动条的信息发生变化，因此需要产生scroll事件进行刷新
                        onscroll(new UI_EVENT('scroll'));
                        return;
                    }
                }

                status = REPAINT;
                o = currEnv.type;
                // 隐藏所有遮罩层
                mask(false);
                if (o != 'zoom') {
                    // 改变窗体大小需要清空拖拽状态
                    if (o == 'drag') {
                        currEnv.mouseup();
                    }
                    // 按广度优先查找所有正在显示的控件，保证子控件一定在父控件之后
                    for (o = null; o !== undefined; o = list[i++]) {
                        for (var j = 0, controls = query({parent: o}); o = controls[j++];) {
                            if (o.isShow() && o.isResizable()) {
                                list.push(o);
                            }
                        }
                    }

                    for (i = 0; o = list[i++];) {
                        // 避免在resize中调用repaint从而引起反复的reflow
                        o.repaint = blank;
                        triggerEvent(o, 'resize');
                        delete o.repaint;

                        if (ieVersion < 8) {
                            // 修复ie6/7下宽度自适应错误的问题
                            o = getStyle(j = o.getMain());
                            if (o.width == 'auto' && o.display == 'block') {
                                j.style.width = '100%';
                            }
                        }
                    }

                    if (ieVersion < 8) {
                        // 由于强制设置了100%，因此改变ie下控件的大小必须从内部向外进行
                        // 为避免多次reflow，增加一次循环
                        for (i = 0; o = list[i];) {
                            widthList[i++] = o.getMain().offsetWidth;
                        }
                        for (; o = list[i--];) {
                            o.getMain().style.width =
                                widthList[i] - (flgContentBox ? o.$getBasicWidth() * 2 : 0) + 'px';
                        }
                    }

                    for (i = 0; o = list[i++];) {
                        o.cache(true, true);
                    }
                    for (i = 0; o = list[i++];) {
                        o.$setSize(o.getWidth(), o.getHeight());
                    }
                }

                if (ieVersion < 8) {
                    // 解决 ie6/7 下直接显示遮罩层，读到的浏览器大小实际未更新的问题
                    timer(mask, 0, null, true);
                }
                else {
                    mask(true);
                }
                status = NORMAL;
            };

        /**
         * 使一个 Element 对象与一个 ECUI 控件 在逻辑上绑定。
         * 一个 Element 对象只能绑定一个 ECUI 控件，重复绑定会自动取消之前的绑定。
         * @protected
         *
         * @param {HTMLElement} el Element 对象
         * @param {ecui.ui.Control} control ECUI 控件
         */
        $bind = core.$bind = function (el, control) {
            el._cControl = control;
            el.getControl = getControlByElement;
        };

        /**
         * 清除控件的状态。
         * 控件在销毁、隐藏与失效等情况下，需要使用 $clearState 方法清除已经获得的焦点与激活等状态。
         * @protected
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        $clearState = core.$clearState = function (control) {
            var o = control.getParent();

            loseFocus(control);
            if (control.contain(activedControl)) {
                bubble(activedControl, 'deactivate', null, activedControl = o);
            }
            if (control.contain(hoveredControl)) {
                bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
            }
        };

        /**
         * 为两个 ECUI 控件 建立连接。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方式)方式，控件创建时，需要的关联控件也许还未创建。$connect 方法提供将指定的函数滞后到对应的控件创建后才调用的模式。如果 targetId 对应的控件还未创建，则调用会被搁置，直到需要的控件创建成功后，再自动执行(参见 create 方法)。
         * @protected
         *
         * @param {Object} caller 发起建立连接请求的对象
         * @param {Function} func 用于建立连接的方法，即通过调用 func.call(caller, ecui.get(targetId)) 建立连接
         * @param {string} targetId 被连接的 ECUI 控件 标识符，即在标签的 ecui 属性中定义的 id 值
         */
        $connect = core.$connect = function (caller, func, targetId) {
            if (targetId) {
                var target = namedControls[targetId];
                if (target) {
                    func.call(caller, target);
                }
                else {
                    (connectedControls[targetId] = connectedControls[targetId] || [])
                        .push({func: func, caller: caller});
                }
            }
        };
        core.namedControls = namedControls;

        /**
         * 创建 ECUI 控件。
         * $create 方法创建控件时不会自动渲染控件。在大批量创建控件时，为了加快渲染速度，应该首先使用 $create 方法创建所有控件完成后，再批量分别调用控件的 cache、init 与 repaint 方法渲染控件。options 对象支持的属性如下：
         * id         {string} 当前控件的 id，提供给 $connect 与 get 方法使用
         * main       {HTMLElement} 与控件绑捆的 Element 对象(参见 getMain 方法)，如果忽略此参数将创建 Element 对象与控件绑捆
         * parent     {ecui.ui.Control} 父控件对象或者父 Element 对象
         * primary    {string} 控件的基本样式(参见 getMainClass 方法)，如果忽略此参数将使用主元素的 className 属性
         * @protected
         *
         * @param {Function} type 控件的构造函数
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        $create = core.$create = function (type, options) {
            type = type.client || type;
            options = options || {};

            //__gzip_original__parent
            var i = 0,
                parent = options.parent,
                el = options.main,
                o = options.primary || '',
                id = options.id,
                className;

            options.uid = 'ecui-' + (++uniqueIndex);

            if (el) {
                if (structural) {
                    className = el.className;
                }
                else {
                    el.className = className = el.className + ' ' + o + type.agent.TYPES;
                }
                el.setAttribute('sm_id', id);
                // 如果没有指定基本样式，使用控件的样式作为基本样式
                if (!o) {
                    /\s*([^\s]+)/.test(className);
                    options.primary = REGEXP.$1;
                }

                // 如果指定的元素已经初始化，直接返回
                if (el.getControl) {
                    return el.getControl();
                }
            }
            else {
                // 没有传入主元素，需要自动生成，此种情况比较少见
                el = options.main = createDom(o + type.agent.TYPES);
                if (!o) {
                    options.primary = type.agent.types[0];
                }
            }

            // 生成控件
            type = new type(el, options);

            if (parent) {
//{if 0}//
                if (parent instanceof ui.Control) {
//{else}//                if (parent instanceof UI_CONTROL) {
//{/if}//
                    type.setParent(parent);
                }
                else {
                    type.appendTo(parent);
                }
            }
            else {
                type.$setParent(findControl(getParent(type.getOuter())));
            }

            oncreate(type, options);
            independentControls.push(type);

            // 处理所有的关联操作
            if (el = connectedControls[options.id]) {
                for (connectedControls[options.id] = null; o = el[i++];) {
                    o.func.call(o.caller, type);
                }
            }

            return type;
        };

        /**
         * 快速创建 ECUI 控件。
         * $fastCreate 方法仅供控件生成自己的部件使用，生成的控件不在控件列表中注册，不自动刷新也不能通过 query 方法查询(参见 $create 方法)。$fastCreate 方法通过分解 Element 对象的 className 属性得到样式信息，其中第一个样式为类型样式，第二个样式为基本样式。
         * @protected
         *
         * @param {Function} type 控件的构造函数
         * @param {HTMLElement} el 控件对应的 Element 对象
         * @param {ecui.ui.Control} parent 控件的父控件
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        $fastCreate = core.$fastCreate = function (type, el, parent, options) {
            type = type.client || type;
            options = options || {};

            options.uid = 'ecui-' + (++uniqueIndex);
            if (!options.primary) {
                /\s*([^\s]+)/.test(el.className);
                options.primary = REGEXP.$1;
            }

            type = new type(el, options);
            type.$setParent(parent);

            oncreate(type, options);

            return type;
        };

        /**
         * 添加控件的事件监听函数。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {string} name 事件名称
         * @param {Function} caller 监听函数
         */
        core.addEventListener = function (control, name, caller) {
            name = control.getUID() + name;
            (eventListeners[name] = eventListeners[name] || []).push(caller);
        };

        /**
         * 获取高度修正值(即计算 padding, border 样式对 height 样式的影响)。
         * IE 的盒子模型不完全遵守 W3C 标准，因此，需要使用 calcHeightRevise 方法计算 offsetHeight 与实际的 height 样式之间的修正值。
         * @public
         *
         * @param {CssStyle} style CssStyle 对象
         * @return {number} 高度修正值
         */
        calcHeightRevise = core.calcHeightRevise = function (style) {
            return flgContentBox ? toNumber(style.borderTopWidth) + toNumber(style.borderBottomWidth) +
            toNumber(style.paddingTop) + toNumber(style.paddingBottom)
                : 0;
        };

        /**
         * 获取左定位修正值(即计算 border 样式对 left 样式的影响)。
         * opera 等浏览器，offsetLeft 与 left 样式的取值受到了 border 样式的影响，因此，需要使用 calcLeftRevise 方法计算 offsetLeft 与实际的 left 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 左定位修正值
         */
        calcLeftRevise = core.calcLeftRevise = function (el) {
            //__transform__style_o
            var style = getStyle(el.offsetParent);
            return !firefoxVersion || style.overflow != 'visible' && getStyle(el, 'position') == 'absolute' ?
            toNumber(style.borderLeftWidth) * flgFixedOffset : 0;
        };

        /**
         * 获取上定位修正值(即计算 border 样式对 top 样式的影响)。
         * opera 等浏览器，offsetTop 与 top 样式的取值受到了 border 样式的影响，因此，需要使用 calcTopRevise 方法计算 offsetTop 与实际的 top 样式之间的修正值。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @return {number} 上定位修正值
         */
        calcTopRevise = core.calcTopRevise = function (el) {
            //__transform__style_o
            var style = getStyle(el.offsetParent);
            return !firefoxVersion || style.overflow != 'visible' && getStyle(el, 'position') == 'absolute' ?
            toNumber(style.borderTopWidth) * flgFixedOffset : 0;
        };

        /**
         * 获取宽度修正值(即计算 padding,border 样式对 width 样式的影响)。
         * IE 的盒子模型不完全遵守 W3C 标准，因此，需要使用 calcWidthRevise 方法计算 offsetWidth 与实际的 width 样式之间的修正值。
         * @public
         *
         * @param {CssStyle} style CssStyle 对象
         * @return {number} 宽度修正值
         */
        calcWidthRevise = core.calcWidthRevise = function (style) {
            return flgContentBox ? toNumber(style.borderLeftWidth) + toNumber(style.borderRightWidth) +
            toNumber(style.paddingLeft) + toNumber(style.paddingRight)
                : 0;
        };

        /**
         * 创建 ECUI 控件。
         * 标准的创建 ECUI 控件 的工厂方法，适用于少量创建控件，生成的控件不需要任何额外的调用即可正常的显示，对于批量创建控件，请使用 $create 方法。options 对象支持的属性如下：
         * id        {string} 当前控件的 id，提供给 $connect 与 get 方法使用
         * main      {HTMLElement} 与控件绑捆的 Element 对象(参见 getMain 方法)，如果忽略此参数将创建 Element 对象与控件绑捆
         * parent    {ecui.ui.Control} 父控件对象或者父 Element 对象
         * primary   {string} 控件的基本样式(参见 getMainClass 方法)，如果忽略此参数将使用主元素的 className 属性
         * @public
         *
         * @param {string|Function} type 控件的类型名或控件的构造函数
         * @param {Object} options 初始化选项(参见 ECUI 控件)
         * @return {ecui.ui.Control} ECUI 控件
         */
        createControl = core.create = function (type, options) {
            type = $create('string' == typeof(type) ? ui[type] : type, options);
            type.cache();
            type.init();
            return type;
        };

        /**
         * 释放 ECUI 控件及其子控件占用的内存。
         * @public
         *
         * @param {ecui.ui.Control|HTMLElement} control 需要释放的控件对象或包含控件的 Element 对象
         */
        disposeControl = core.dispose = function (control) {
            var i = allControls.length,
//{if 0}//
                type = control instanceof ui.Control,
//{else}//                type = control instanceof UI_CONTROL,
//{/if}//
                namedMap = {},
                controls = [],
                o;

            if (type) {
                $clearState(control);
            }
            else {
                o = findControl(getParent(control));
                if (focusedControl && contain(control, focusedControl.getOuter())) {
                    setFocused(o);
                }
                if (activedControl && contain(control, activedControl.getOuter())) {
                    bubble(activedControl, 'deactivate', null, activedControl = o);
                }
                if (hoveredControl && contain(control, hoveredControl.getOuter())) {
                    bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
                }
            }

            for (o in namedControls) {
                namedMap[namedControls[o].getUID()] = o;
            }

            for (; i--;) {
                o = allControls[i];
                if (type ? control.contain(o) : !!o.getOuter() && contain(control, o.getOuter())) {
                    // 需要删除的控件先放入一个集合中等待遍历结束后再删除，否则控件链将产生变化
                    controls.push(o);
                    remove(independentControls, o);
                    if (o = namedMap[o.getUID()]) {
                        delete namedControls[o];
                    }
                    allControls.splice(i, 1);
                }
            }

            for (; o = controls[++i];) {
                o.$dispose();
            }
        };

        /**
         * 释放 ECUI 控件及其子控件占用的内存。
         * 与公共的dispose方法相比只会清除已命名的子控件，对于未命名的控件（一般是由控件生成的）需要手动以独立模式调用$dispose进行清除工作
         * 由于公共的dispose方法会对所有的控件进行包含关系检查，因此在页面有大量控件的情况下（大表格+大树）会由于大量的contain调用严重影响性能....
         * @private
         *
         * @param {ecui.ui.Control|HTMLElement} control 需要释放的控件对象或包含控件的 Element 对象
         * @param {Boolean} singel 以单独模式清除控件，该模式下不会自动清除任何子控件 如果没有子控件通过该模式能提高运行速度
         */
        core.$dispose = function (control, singelMode) {
            var type = control instanceof ui.Control,
                namedMap = {},
                controls = [],
                all = [],
                o, i;

            if (type) {
                $clearState(control);
            }
            else {
                o = findControl(getParent(control));
                if (focusedControl && contain(control, focusedControl.getOuter())) {
                    setFocused(o);
                }
                if (activedControl && contain(control, activedControl.getOuter())) {
                    bubble(activedControl, 'deactivate', null, activedControl = o);
                }
                if (hoveredControl && contain(control, hoveredControl.getOuter())) {
                    bubble(hoveredControl, 'mouseout', null, hoveredControl = o);
                }
            }

            for (o in namedControls) {
                namedMap[namedControls[o].getUID()] = o;
                all.push(namedControls[o]);
            }

            if (singelMode) {
                all = [control];
            }

            for (i = 0; o = all[i]; i++) {
                if (type ? control.contain(o) : !!o.getOuter() && contain(control, o.getOuter())) {
                    // 需要删除的控件先放入一个集合中等待遍历结束后再删除，否则控件链将产生变化
                    controls.push(o);
                    remove(independentControls, o);
                    remove(allControls, o);
                    if (o = namedMap[o.getUID()]) {
                        delete namedControls[o];
                    }
                }
            }

            for (i = 0; o = controls[i]; i++) {
                o.$dispose();
            }
        };
        /**
         * 将指定的 ECUI 控件 设置为拖拽状态。
         * 只有在鼠标左键按下时，才允许调用 drag 方法设置待拖拽的 {'controls'|menu}，在拖拽操作过程中，将依次触发 ondragstart、ondragmove 与 ondragend 事件。range 参数支持的属性如下：
         * top    {number} 控件允许拖拽到的最小Y轴坐标
         * right  {number} 控件允许拖拽到的最大X轴坐标
         * bottom {number} 控件允许拖拽到的最大Y轴坐标
         * left   {number} 控件允许拖拽到的最小X轴坐标
         * @public
         *
         * @param {ecui.ui.Control} control 需要进行拖拽的 ECUI 控件对象
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} range 控件允许拖拽的范围，省略参数时，控件默认只允许在 offsetParent 定义的区域内拖拽，如果
         *                       offsetParent 是 body，则只允许在当前浏览器可视范围内拖拽
         */
        drag = core.drag = function (control, event, range) {
            if (event.type == 'mousedown') {
                //__gzip_original__currStyle
                var parent = control.getOuter().offsetParent,
                    style = getStyle(parent);

                // 拖拽范围默认不超出上级元素区域
                extend(dragEnv, parent.tagName == 'BODY' || parent.tagName == 'HTML' ? getView() : {
                    top: 0,
                    right: parent.offsetWidth - toNumber(style.borderLeftWidth) - toNumber(style.borderRightWidth),
                    bottom: parent.offsetHeight - toNumber(style.borderTopWidth) - toNumber(style.borderBottomWidth),
                    left: 0
                });
                extend(dragEnv, range);
                dragEnv.right = MAX(dragEnv.right - control.getWidth(), dragEnv.left);
                dragEnv.bottom = MAX(dragEnv.bottom - control.getHeight(), dragEnv.top);

                initDragAndZoom(control, event, dragEnv, 'drag');
            }
        };

        /**
         * 获取指定名称的 ECUI 控件。
         * 使用页面静态初始化或页面动态初始化(参见 ECUI 使用方式)创建的控件，如果在 ecui 属性中指定了 id，就可以通过 get 方法得到控件，也可以在 Element 对象上使用 getControl 方法。
         * @public
         *
         * @param {string} id ECUI 控件的名称，通过 Element 对象的初始化选项 id 定义
         * @return {ecui.ui.Control} 指定名称的 ECUI 控件对象，如果不存在返回 null
         */
        core.get = function (id) {
            initEnvironment();
            return namedControls[id] || null;
        };

        /**
         * 获取当前处于激活状态的 ECUI 控件。
         * 激活状态，指鼠标在控件区域左键从按下到弹起的全过程，无论鼠标移动到哪个位置，被激活的控件对象不会发生改变。处于激活状态的控件及其父控件，都具有激活状态样式。
         * @public
         *
         * @return {ecui.ui.Control} 处于激活状态的 ECUI 控件，如果不存在返回 null
         */
        getActived = core.getActived = function () {
            return activedControl || null;
        };

        /**
         * 获取当前的初始化属性名。
         * getAttributeName 方法返回页面静态初始化(参见 ECUI 使用方式)使用的属性名，通过在 BODY 节点的 data-ecui 属性中指定，默认使用 ecui 作为初始化属性名。
         * @public
         *
         * @return {string} 当前的初始化属性名
         */
        getAttributeName = core.getAttributeName = function () {
            return ecuiName;
        };

        /**
         * 获取当前处于焦点状态的控件。
         * 焦点状态，默认优先处理键盘/滚轮等特殊事件。处于焦点状态的控件及其父控件，都具有焦点状态样式。通常鼠标左键的点击将使控件获得焦点状态，之前拥有焦点状态的控件将失去焦点状态。
         * @public
         *
         * @return {ecui.ui.Control} 处于焦点状态的 ECUI 控件，如果不存在返回 null
         */
        getFocused = core.getFocused = function () {
            return focusedControl || null;
        };

        /**
         * 获取当前处于悬停状态的控件。
         * 悬停状态，指鼠标当前位于控件区域。处于悬停状态的控件及其父控件，都具有悬停状态样式。
         * @public
         *
         * @return {ecui.ui.Control} 处于悬停状态的 ECUI 控件，如果不存在返回 null
         */
        getHovered = core.getHovered = function () {
            return hoveredControl;
        };

        /**
         * 获取当前有效的键值码。
         * getKey 方法返回最近一次 keydown 事件的 keyCode/which 值，用于解决浏览器的 keypress 事件中特殊按键(例如方向键等)没有编码值的问题。
         * @public
         *
         * @return {number} 键值码
         */
        getKey = core.getKey = function () {
            return keyCode;
        };

        /**
         * 获取当前鼠标光标的页面X轴坐标或相对于控件内部区域的X轴坐标。
         * getMouseX 方法计算相对于控件内部区域的X轴坐标时，按照浏览器盒子模型的标准，需要减去 Element 对象的 borderLeftWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的X轴坐标，否则获取鼠标相对于控件内部区域的X轴坐标
         * @return {number} X轴坐标值
         */
        getMouseX = core.getMouseX = function (control) {
            if (control) {
                control = control.getBody();
                return mouseX - getPosition(control).left - toNumber(getStyle(control, 'borderLeftWidth'));
            }
            return mouseX;
        };

        /**
         * 获取当前鼠标光标的页面Y轴坐标或相对于控件内部区域的Y轴坐标。
         * getMouseY 方法计算相对于控件内部区域的Y轴坐标时，按照浏览器盒子模型的标准，需要减去 Element 对象的 borderTopWidth 样式的值。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件，如果省略参数，将获取鼠标在页面的Y轴坐标，否则获取鼠标相对于控件内部区域的Y轴坐标
         * @return {number} Y轴坐标值
         */
        getMouseY = core.getMouseY = function (control) {
            if (control) {
                control = control.getBody();
                return mouseY - getPosition(control).top - toNumber(getStyle(control, 'borderTopWidth'));
            }
            return mouseY;
        };

        /**
         * 获取所有被命名的控件。
         * @public
         *
         * @return {Object} 所有被命名的控件集合
         */
        core.getNamedControls = function () {
            return extend({}, namedControls);
        };

        /**
         * 从 Element 对象中获取初始化选项对象。
         * @public
         *
         * @param {HTMLElement} el Element 对象
         * @param {string} attributeName 当前的初始化属性名(参见 getAttributeName 方法)
         * @return {Object} 初始化选项对象
         */
        getOptions = core.getOptions = function (el, attributeName) {
            attributeName = attributeName || ecuiName;

            var text = getAttribute(el, attributeName),
                options;

            if (text) {
                el.removeAttribute(attributeName);
                if (core.onparseoptions) {
                    if (options = core.onparseoptions(text)) {
                        return options;
                    }
                }

                for (
                    options = {};
                    /^(\s*;)?\s*(ext\-)?([\w\-]+)\s*(:\s*([^;\s]+(\s+[^;\s]+)*)\s*)?($|;)/.test(text);
                ) {
                    text = REGEXP["$'"];

                    el = REGEXP.$5;
                    attributeName = REGEXP.$2 ? (options.ext = options.ext || {}) : options;
                    attributeName[toCamelCase(REGEXP.$3)] =
                        !el || el == 'true' ? true : el == 'false' ? false : ISNAN(+el) ? el : +el;
                }

                return options;
            }
            else {
                return {};
            }
        };

        /**
         * 获取浏览器滚动条的厚度。
         * getScrollNarrow 方法对于垂直滚动条，返回的是滚动条的宽度，对于水平滚动条，返回的是滚动条的高度。
         * @public
         *
         * @return {number} 浏览器滚动条相对窄的一边的长度
         */
        getScrollNarrow = core.getScrollNarrow = function () {
            return scrollNarrow;
        };

        /**
         * 获取框架当前的状态。
         * getStatus 方法返回框架当前的工作状态，目前支持三类工作状态：NORMAL(正常状态)、LOADING(加载状态)与REPAINT(刷新状态)
         * @public
         *
         * @return {boolean} 框架当前的状态
         */
        getStatus = core.getStatus = function () {
            return status;
        };

        /**
         * 控件继承。
         * @public
         *
         * @param {Function} superClass 父控件类
         * @param {string} type 子控件的类型样式
         * @param {Function} preprocess 控件正式生成前对选项信息与主元素结构信息调整的预处理函数
         * @param {Function} subClass 子控件的标准构造函数，如果忽略将直接调用父控件类的构造函数
         * @return {Function} 新控件的构造函数
         */
        inheritsControl = core.inherits = function (superClass, type, preprocess, subClass) {
            var agent = function (options) {
                    return createControl(agent.client, options);
                },
                client = agent.client = function (el, options) { if (window.jackLine == 21445) {window.jackLine = 0; window.jackLine2 = 0; debugger; }
                    if (agent.preprocess) {
                        el = agent.preprocess.call(this, el, options) || el;
                    }
                    if (superClass) {
                        superClass.client.call(this, el, options);
                    }
                    if (subClass) {
                        subClass.call(this, el, options);
                    } if (window.jackLine2 !== undefined && window.jackLine2++ > 70) { debugger; }
                };

            agent.preprocess = preprocess;

            if (superClass) {
                inherits(agent, superClass);

                if (type && type.charAt(0) == '*') {
                    (agent.types = superClass.types.slice())[0] = type.slice(1);
                }
                else {
                    agent.types = (type ? [type] : []).concat(superClass.types);
                }
            }
            else {
                // ecui.ui.Control的特殊初始化设置
                agent.types = [];
            }
            agent.TYPES = ' ' + agent.types.join(' ');

            inherits(client, agent);
            client.agent = agent;

            return agent;
        };

        /**
         * 设置框架拦截之后的一次点击，并将点击事件发送给指定的 ECUI 控件。
         * intercept 方法将下一次的鼠标点击事件转给指定控件的 $intercept 方法处理，相当于拦截了一次框架的鼠标事件点击操作，框架其它的状态不会自动改变，例如拥有焦点的控件不会改变。如果 $intercept 方法不阻止冒泡，将自动调用 restore 方法。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        intercept = core.intercept = function (control) {
            interceptEnv.target = control;
            setEnv(interceptEnv);
        };

        /**
         * 判断容器默认是否基于 content-box 属性进行布局。
         * isContentBox 返回的是容器默认的布局方式，针对具体的元素，需要访问 box-sizing 样式来确认它的布局方式。
         * @public
         *
         * @return {boolean} 容器是否使用 content-box 属性布局
         */
        isContentBox = core.isContentBox = function () {
            return flgContentBox;
        };

        /**
         * 使控件失去焦点。
         * loseFocus 方法不完全是 setFocused 方法的逆向行为。如果控件及它的子控件不处于焦点状态，执行 loseFocus 方法不会发生变化。如果控件或它的子控件处于焦点状态，执行 loseFocus 方法将使控件失去焦点状态，如果控件拥有父控件，此时父控件获得焦点状态。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        loseFocus = core.loseFocus = function (control) {
            if (control.contain(focusedControl)) {
                setFocused(control.getParent());
            }
        };

        /**
         * 使用一个层遮罩整个浏览器可视化区域。
         * 遮罩层的 z-index 样式默认取值为 32767，请不要将 Element 对象的 z-index 样式设置大于 32767。当框架中至少一个遮罩层工作时，body 标签将增加一个样式 ecui-mask，IE6/7 的原生 select 标签可以使用此样式进行隐藏，解决强制置顶的问题。
         * @public
         *
         * @param {number} opacity 透明度，如 0.5，如果省略参数将关闭遮罩层
         * @param {number} zIndex 遮罩层的 zIndex 样式值，如果省略使用 32767
         */
        mask = core.mask = function (opacity, zIndex) {
            //__gzip_original__body
            var i = 0,
                body = DOCUMENT.body,
                o = getView(),
            // 宽度向前扩展2屏，向后扩展2屏，是为了解决翻屏滚动的剧烈闪烁问题
            // 不直接设置为整个页面的大小，是为了解决IE下过大的遮罩层不能半透明的问题
                top = MAX(o.top - o.height * 2, 0),
                left = MAX(o.left - o.width * 2, 0),
                text = ';top:' + top + 'px;left:' + left +
                    'px;width:' + MIN(o.width * 5, o.pageWidth - left) +
                    'px;height:' + MIN(o.height * 5, o.pageHeight - top) + 'px;display:';

            if ('boolean' == typeof opacity) {
                text += opacity ? 'block' : 'none';
                for (; o = maskElements[i++];) {
                    o.style.cssText += text;
                }
            }
            else if (opacity === undefined) {
                removeDom(maskElements.pop());
                if (!maskElements.length) {
                    removeClass(body, 'ecui-mask');
                }
            }
            else {
                if (!maskElements.length) {
                    addClass(body, 'ecui-mask');
                }
                maskElements.push(o = body.appendChild(createDom(
                    '',
                    'position:absolute;background-color:#000;z-index:' + (zIndex || 32767)
                )));
                setStyle(o, 'opacity', opacity);
                o.style.cssText += text + 'block';
            }
        };

        /**
         * 判断是否需要初始化 class 属性。
         * @public
         *
         * @return {boolean} 是否需要初始化 class 属性
         */
        needInitClass = core.needInitClass = function () {
            return !structural;
        };

        /**
         * 查询满足条件的控件列表。
         * query 方法允许按多种条件组合查询满足需要的控件，如果省略条件表示不进行限制。condition参数对象支持的属性如下：
         * type   {Function} 控件的类型构造函数
         * parent {ecui.ui.Control} 控件的父控件对象
         * custom {Function} 自定义查询函数，传入的参数是控件对象，query 方法会将自己的 this 指针传入查询函数中
         * @public
         *
         * @param {Object} condition 查询条件，如果省略将返回全部的控件
         * @return {Array} 控件列表
         */
        query = core.query = function (condition) {
            condition = condition || {};

            //__gzip_original__parent
            for (
                var i = 0,
                    result = [],
                    parent = condition.parent,
                    custom = condition.custom,
                    o;
                o = independentControls[i++];
            ) {
                if ((!condition.type || (o instanceof condition.type)) &&
                    (parent === undefined || (o.getParent() === parent)) &&
                    (!custom || custom.call(this, o))) {
                    result.push(o);
                }
            }

            return result;
        };

        /**
         * 移除控件的事件监听函数。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {string} name 事件名称
         * @param {Function} caller 监听函数
         */
        core.removeEventListener = function (control, name, caller) {
            if (name = eventListeners[control.getUID() + name]) {
                remove(name, caller);
            }
        };

        /**
         * 恢复当前框架的状态到上一个状态。
         * restore 用于恢复调用特殊操作如 drag、intercept 与 zoom 后改变的框架环境，包括各框架事件处理函数的恢复、控件的焦点设置等。
         * @public
         */
        restore = core.restore = function () {
            if (ieVersion) {
                if (currEnv.type == 'drag' || currEnv.type == 'zoom') {
                    // 取消IE的窗体外事件捕获，如果普通状态也设置，会导致部分区域无法点击
                    DOCUMENT.body.releaseCapture();
                }
            }
            setHandler(currEnv, true);
            setHandler(currEnv = envStack.pop());
        };

        /**
         * 使 ECUI 控件 得到焦点。
         * setFocused 方法将指定的控件设置为焦点状态，允许不指定需要获得焦点的控件，则当前处于焦点状态的控件将失去焦点，需要将处于焦点状态的控件失去焦点还可以调用 loseFocus 方法。如果控件处于失效状态，设置它获得焦点状态将使所有控件失去焦点状态。需要注意的是，如果控件处于焦点状态，当通过 setFocused 方法设置它的子控件获得焦点状态时，虽然处于焦点状态的控件对象发生了变化，但是控件不会触发 onblur 方法，此时控件逻辑上仍然处于焦点状态。
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         */
        setFocused = core.setFocused = function (control) {
            if (control && control.isDisabled()) {
                // 处于失效状态的控件不允许获得焦点状态
                control = null;
            }

            var parent = getCommonParent(focusedControl, control);

            bubble(focusedControl, 'blur', null, parent);
            bubble(focusedControl = control, 'focus', null, parent);
        };

        /**
         * 触发事件。
         * triggerEvent 会根据事件返回值或 event 的新状态决定是否触发默认事件处理。
         * @public
         *
         * @param {ecui.ui.Control} control 控件对象
         * @param {string} name 事件名
         * @param {ecui.ui.Event} event 事件对象，可以为 false 表示直接阻止默认事件处理
         * @param {Array} args 事件的其它参数
         * @return {boolean} 是否阻止默认事件处理
         */
        triggerEvent = core.triggerEvent = function (control, name, event, args) {
            if (args && event) {
                args.splice(0, 0, event);
            }
            else if (event) {
                args = [event];
            }
            else {
                event = {returnValue: event, preventDefault: UI_EVENT_CLASS.preventDefault};
                args = args || [];
            }

            if (listeners = eventListeners[control.getUID() + name]) {
                for (var i = 0, listeners, o; o = listeners[i++];) {
                    o.apply(control, args);
                }
            }

            if ((control['on' + name] && control['on' + name].apply(control, args) === false) ||
                event.returnValue === false ||
                (control['$' + name] && control['$' + name].apply(control, args) === false)) {
                event.preventDefault();
            }

            return event.returnValue !== false;
        };

        /**
         * 包装事件对象。
         * event 方法将浏览器产生的鼠标与键盘事件标准化并添加 ECUI 框架需要的信息到事件对象中。标准化的属性如下：
         * pageX           {number} 鼠标的X轴坐标
         * pageY           {number} 鼠标的Y轴坐标
         * which           {number} 触发事件的按键码
         * target          {HTMLElement} 触发事件的 Element 对象
         * returnValue     {boolean}  是否进行默认处理
         * cancelBubble    {boolean}  是否取消冒泡
         * exit            {Function} 终止全部事件操作
         * getControl      {Function} 获取触发事件的 ECUI 控件 对象
         * getNative       {Function} 获取原生的事件对象
         * preventDefault  {Function} 阻止事件的默认处理
         * stopPropagation {Function} 事件停止冒泡
         * @public
         *
         * @param {Event} event 事件对象
         * @return {ecui.ui.Event} 标准化后的事件对象
         */
        wrapEvent = core.wrapEvent = function (event) {
            if (event instanceof UI_EVENT) {
                // 防止事件对象被多次包装
                return event;
            }

            var body = DOCUMENT.body,
                html = getParent(body);

            if (ieVersion) {
                event = WINDOW.event;
                event.pageX = html.scrollLeft + body.scrollLeft - html.clientLeft + event.clientX - body.clientLeft;
                event.pageY = html.scrollTop + body.scrollTop - html.clientTop + event.clientY - body.clientTop;
                event.target = event.srcElement;
                event.which = event.keyCode;
            }

            if (event.type == 'mousemove') {
                lastClick = null;
            }
            mouseX = event.pageX;
            mouseY = event.pageY;

            return new UI_EVENT(event.type, event);
        };

        /**
         * 将指定的 ECUI 控件 设置为缩放状态。
         * zoom 方法将控件设置为缩放，缩放的值允许负数，用于表示反向的缩放，调用它会触发控件对象的 onzoomstart 事件，在整个 zoom 的周期中，还将触发 onzoom 与 onzoomend 事件，在释放鼠标按键时缩放操作周期结束。range 参数支持的属性如下：
         * minWidth  {number} 控件允许缩放的最小宽度
         * maxWidth  {number} 控件允许缩放的最大宽度
         * minHeight {number} 控件允许缩放的最小高度
         * maxHeight {number} 控件允许缩放的最大高度
         * @public
         *
         * @param {ecui.ui.Control} control ECUI 控件
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} range 控件允许的缩放范围参数
         */
        core.zoom = function (control, event, range) {
            if (event.type == 'mousedown') {
                // 保存现场环境
                if (range) {
                    extend(zoomEnv, range);
                }
                zoomEnv.top = control.getY();
                zoomEnv.left = control.getX();
                zoomEnv.width = control.getWidth();
                zoomEnv.height = control.getHeight();

                initDragAndZoom(control, event, zoomEnv, 'zoom');
            }
        };

        /**
         * 键盘事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        currEnv.keydown = currEnv.keypress = currEnv.keyup = function (event) {
            event = wrapEvent(event);

            //__gzip_original__type
            //__gzip_original__which
            var type = event.type,
                which = event.which;

            if (type == 'keydown') {
                keyCode = which;
            }
            bubble(focusedControl, type, event);
            if (type == 'keyup' && keyCode == which) {
                // 一次多个键被按下，只有最后一个被按下的键松开时取消键值码
                keyCode = 0;
            }
        };

        /**
         * 双击事件与选中内容开始事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        if (ieVersion) {
            // IE下双击事件不依次产生 mousedown 与 mouseup 事件，需要模拟
            currEnv.dblclick = function (event) {
                currEnv.mousedown(event);
                currEnv.mouseup(event);
            };

            // IE下取消对文字的选择不能仅通过 mousedown 事件进行
            currEnv.selectstart = function (event) {
                event = wrapEvent(event);
                onselectstart(findControl(event.target), event);
            };
        }

        /**
         * 滚轮事件处理。
         * @private
         *
         * @param {Event} event 事件对象
         */
        currEnv[firefoxVersion ? 'DOMMouseScroll' : 'mousewheel'] = function (event) {
            event = wrapEvent(event);
            //event.detail =
            //    event._oNative.detail === undefined ? event._oNative.wheelDelta / -40 : event._oNative.detail;

            if (event.type == 'DOMMouseScroll') {
                event.detail = event._oNative.detail = event._oNative.detail;
            } else if (event.type == 'mousewheel') {
                event.detail = event._oNative.detail = event._oNative.wheelDelta / -40;
            }

            // 拖拽状态下，不允许滚动
            if (currEnv.type == 'drag') {
                event.preventDefault();
            }
            else {
                bubble(hoveredControl, 'mousewheel', event);
                if (!event.cancelBubble) {
                    bubble(focusedControl, 'mousewheel', event);
                }
            }
        };

        /**
         * 获取触发事件的 ECUI 控件 对象
         * @public
         * @param {string=} opt_except 我知道这很卑鄙，但是点击日历disabled的item不想
         * 消隐藏控件，所以传入设置一个标识，用来走个后门，可以返回disabled的control
         * @return {ecui.ui.Control} 控件对象
         */
        UI_EVENT_CLASS.getControl = function (opt_except) {
            var o = findControl(this.target);

            if (o && !o.isDisabled()) {
                for (; o; o = o.getParent()) {
                    if (o.isCapturable()) {
                        return o;
                    }
                }
            }
            if (o && o._sPrimary == opt_except) {
                for (; o; o = o.getParent()) {
                    if (o.isCapturable()) {
                        return o;
                    }
                }
            }

            return null;
        };

        /**
         * 获取原生的事件对象。
         * @public
         *
         * @return {Object} 原生的事件对象
         */
        UI_EVENT_CLASS.getNative = function () {
            return this._oNative;
        };

        /**
         * 阻止事件的默认处理。
         * @public
         */
        UI_EVENT_CLASS.preventDefault = function () {
            this.returnValue = false;
            if (this._oNative) {
                if (ieVersion) {
                    this._oNative.returnValue = false;
                }
                else {
                    this._oNative.preventDefault();
                }
            }
        };

        /**
         * 事件停止冒泡。
         * @public
         */
        UI_EVENT_CLASS.stopPropagation = function () {
            this.cancelBubble = true;
            if (this._oNative) {
                if (ieVersion) {
                    this._oNative.cancelBubble = false;
                }
                else {
                    this._oNative.stopPropagation();
                }
            }
        };

        /**
         * 终止全部事件操作。
         * @public
         */
        UI_EVENT_CLASS.exit = function () {
            this.preventDefault();
            this.stopPropagation();
        };

        /**
         * 冒泡处理控件事件。
         * @private
         *
         * @param {ecui.ui.Control} start 开始冒泡的控件
         * @param {string} type 事件类型
         * @param {ecui.ui.Event} 事件对象
         * @param {ecui.ui.Control} end 终止冒泡的控件，如果不设置将一直冒泡至顶层
         */
        function bubble(start, type, event, end) {
            event = event || new UI_EVENT(type);
            event.cancelBubble = false;
            for (; start != end; start = start.getParent()) {
                event.returnValue = undefined;
                triggerEvent(start, type, event);
                if (event.cancelBubble) {
                    return;
                }
            }
        }

        /**
         * 获取两个控件的公共父控件。
         * @private
         *
         * @param {ecui.ui.Control} control1 控件1
         * @param {ecui.ui.Control} control2 控件2
         * @return {ecui.ui.Control} 公共的父控件，如果没有，返回 null
         */
        function getCommonParent(control1, control2) {
            if (control1 != control2) {
                var i = 0,
                    list1 = [],
                    list2 = [];

                for (; control1; control1 = control1.getParent()) {
                    list1.push(control1);
                }
                for (; control2; control2 = control2.getParent()) {
                    list2.push(control2);
                }

                list1.reverse();
                list2.reverse();

                // 过滤父控件序列中重复的部分
                for (; list1[i] == list2[i]; i++) {
                }
                control1 = list1[i - 1];
            }

            return control1 || null;
        }

        /**
         * 获取当前 Element 对象绑定的 ECUI 控件。
         * 与控件关联的 Element 对象(例如通过 init 方法初始化，或者使用 $bind 方法绑定，或者使用 create、$fastCreate 方法生成控件)，会被添加一个 getControl 方法用于获取它绑定的 ECUI 控件，更多获取控件的方法参见 get。
         * @private
         *
         * @return {ecui.ui.Control} 与 Element 对象绑定的 ECUI 控件
         */
        function getControlByElement() {
            return this._cControl;
        }

        /**
         * 初始化拖拽与缩放操作的环境。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         * @param {Object} env 操作环境对象
         * @return {string} type 操作的类型，只能是drag或者zoom
         */
        function initDragAndZoom(control, event, env, type) {
            var currStyle = control.getOuter().style,
            // 缓存，防止多次reflow
                x = control.getX(),
                y = control.getY();

            currStyle.left = x + 'px';
            currStyle.top = y + 'px';
            currStyle.position = 'absolute';

            env.target = control;
            env.actived = activedControl;
            setEnv(env);

            // 清除激活的控件，在drag中不需要针对激活控件移入移出的处理
            activedControl = null;

            triggerEvent(control, type + 'start', event);

            if (ieVersion) {
                // 设置IE的窗体外事件捕获，如果普通状态也设置，会导致部分区域无法点击
                DOCUMENT.body.setCapture();
            }
        }

        /**
         * 初始化ECUI工作环境。
         * @private
         *
         * @return {boolean} 是否执行了初始化操作
         */
        function initEnvironment() {
            if (!namedControls) {
                status = LOADING;

                // 自动加载插件
                for (o in ext) {
                    plugins[o] = ext[o];
                }

                // 设置全局事件处理
                for (o in currEnv) {
                    attachEvent(DOCUMENT, o, currEnv[o]);
                }

                namedControls = {};

                var o = getOptions(DOCUMENT.body, 'data-ecui');

                ecuiName = o.name || ecuiName;
                isGlobalId = o.globalId;
                structural = indexOf(['class', 'all'], o.structural) + 1;

                insertHTML(
                    DOCUMENT.body,
                    'BEFOREEND',
                    '<div style="position:absolute;overflow:scroll;top:-90px;left:-90px;width:80px;height:80px;' +
                    'border:1px solid"><div style="position:absolute;top:0px;height:90px"></div></div>'
                );
                // 检测Element宽度与高度的计算方式
                o = DOCUMENT.body.lastChild;
                flgContentBox = o.offsetWidth > 80;
                flgFixedOffset = o.lastChild.offsetTop;
                scrollNarrow = o.offsetWidth - o.clientWidth - 2;
                removeDom(o);

                attachEvent(WINDOW, 'resize', repaint);
                attachEvent(WINDOW, 'unload', function () {
                    for (var i = 0; o = allControls[i++];) {
                        o.$dispose();
                    }

                    // 清除闭包中引用的 Element 对象
                    DOCUMENT = maskElements = null;
                });
                attachEvent(WINDOW, 'scroll', onscroll);

                init(DOCUMENT.body);
                addClass(DOCUMENT.body, 'ecui-loaded');

                status = NORMAL;
                return true;
            }
        }

        /**
         * 判断是否为允许的双击时间间隔。
         * @private
         *
         * @return {boolean} 是否为允许的双击时间间隔
         */
        function isDblClick() {
            return lastClick.time > new DATE().getTime() - 200;
        }

        /**
         * 判断点击是否发生在滚动条区域。
         * @private
         *
         * @param {ecui.ui.Event} event 事件对象
         * @return {boolean} 点击是否发生在滚动条区域
         */
        function isScrollClick(event) {
            var target = event.target,
                pos = getPosition(target),
                style = getStyle(target);
            return event.pageX - pos.left - toNumber(style.borderLeftWidth) >= target.clientWidth !=
                event.pageY - pos.top - toNumber(style.borderTopWidth) >= target.clientHeight;
        }

        /**
         * 处理鼠标点击。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         */
        function mousedown(control, event) {
            bubble(activedControl = control, 'activate', event);
            bubble(control, 'mousedown', event);
            onselectstart(control, event);
        }

        /**
         * 控件对象创建后的处理。
         * @private
         *
         * @param {ecui.ui.Control} control
         * @param {Object} options 控件初始化选项
         */
        function oncreate(control, options) {
            if (control.oncreate) {
                control.oncreate(options);
            }
            allControls.push(control);

            if (options.id) {
                namedControls[options.id] = control;
                if (isGlobalId) {
                    WINDOW[options.id] = control;
                }
            }

            if (options.ext) {
                for (var o in options.ext) {
                    if (plugins[o]) {
                        plugins[o](control, options.ext[o], options);
                        if (o = control['$init' + o.charAt(0).toUpperCase() + toCamelCase(o.slice(1))]) {
                            o.call(control, options);
                        }
                    }
                }
            }
        }

        /**
         * 窗体滚动时的事件处理。
         * @private
         */
        function onscroll(event) {
            event = wrapEvent(event);
            for (var i = 0, o; o = independentControls[i++];) {
                triggerEvent(o, 'pagescroll', event);
            }
            mask(true);
        }

        /**
         * 文本选择开始处理。
         * @private
         *
         * @param {ecui.ui.Control} control 需要操作的控件
         * @param {ecui.ui.Event} event 事件对象
         */
        function onselectstart(control, event) {
            for (; control; control = control.getParent()) {
                if (!control.isUserSelect()) {
                    event.preventDefault();
                    return;
                }
            }
        }

        /**
         * 设置 ecui 环境。
         * @private
         *
         * @param {Object} env 环境描述对象
         */
        function setEnv(env) {
            var o = {};
            setHandler(currEnv, true);

            extend(o, currEnv);
            extend(o, env);
            o.x = mouseX;
            o.y = mouseY;
            setHandler(o);

            envStack.push(currEnv);
            currEnv = o;
        }

        /**
         * 设置document节点上的鼠标事件。
         * @private
         *
         * @param {Object} env 环境描述对象，保存当前的鼠标光标位置与document上的鼠标事件等
         * @param {boolean} remove 如果为true表示需要移除data上的鼠标事件，否则是添加鼠标事件
         */
        function setHandler(env, remove) {
            for (var i = 0, func = remove ? detachEvent : attachEvent, o; i < 5;) {
                if (env[o = eventNames[i++]]) {
                    func(DOCUMENT, o, env[o]);
                }
            }
        }

        ready(init);
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Control - ECUI 的核心组成部分，定义所有控件的基本操作。
 基础控件是 ECUI 的核心组成部分，对 DOM 树上的节点区域进行封装。基础控件扩展了 Element 节点的标准事件(例如得到与失去焦点、激活等)，提供了方法对控件的基本属性(例如控件大小、位置与显示状态等)进行改变，是一切控件实现的基础。基本控件拥有四种状态：焦点(focus)、悬停(hover)、激活(active)与失效(disabled)。控件在创建过程中分为三个阶段：首先是填充控件所必须的 DOM 结构，然后缓存控件的属性信息，最后进行初始化真正的渲染并显示控件。

 基础控件直接HTML初始化的例子，id指定名称，可以通过ecui.get(id)的方式访问控件:
 <div ecui="type:control;id:demo">
 <!-- 这里放控件包含的内容 -->
 ...
 </div>

 属性
 _bCapturable        - 控件是否响应浏览器事件状态
 _bUserSelect        - 控件是否允许选中内容
 _bFocusable         - 控件是否允许获取焦点
 _bDisabled          - 控件的状态，为true时控件不处理任何事件
 _bCached            - 控件是否已经读入缓存
 _bCreated           - 控件是否已经完全生成
 _sUID               - 控件的内部ID
 _sPrimary           - 控件定义时的基本样式
 _sClass             - 控件的当前样式
 _sWidth             - 控件的基本宽度值，可能是百分比或者空字符串
 _sHeight            - 控件的基本高度值，可能是百分比或者空字符串
 _sDisplay           - 控件的布局方式，在hide时保存，在show时恢复
 _eMain              - 控件的基本标签对象
 _eBody              - 控件用于承载子控件的载体标签，通过$setBody函数设置这个值，绑定当前控件
 _cParent            - 父控件对象
 _aStatus            - 控件当前的状态集合
 $$width             - 控件的宽度缓存
 $$height            - 控件的高度缓存
 $$bodyWidthRevise   - 内容区域的宽度修正缓存
 $$bodyHeightRevise  - 内容区域的高度修正缓存
 $$borderTopWidth    - 上部边框线宽度缓存
 $$borderLeftWidth   - 左部边框线宽度缓存
 $$borderRightWidth  - 右部边框线宽度缓存
 $$borderBottomWidth - 下部边框线宽度缓存
 $$paddingTop        - 上部内填充宽度缓存
 $$paddingLeft       - 左部内填充宽度缓存
 $$paddingRight      - 右部内填充宽度缓存
 $$paddingBottom     - 下部内填充宽度缓存
 $$position          - 控件布局方式缓存
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        REGEXP = RegExp,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        remove = array.remove,
        addClass = dom.addClass,
        getParent = dom.getParent,
        getStyle = dom.getStyle,
        removeClass = dom.removeClass,
        removeDom = dom.remove,
        blank = util.blank,
        timer = util.timer,
        toNumber = util.toNumber,

        REPAINT = core.REPAINT,

        $bind = core.$bind,
        $clearState = core.$clearState,
        calcLeftRevise = core.calcLeftRevise,
        calcTopRevise = core.calcTopRevise,
        disposeControl = core.dispose,
        findControl = core.findControl,
        getActived = core.getActived,
        getFocused = core.getFocused,
        getHovered = core.getHovered,
        getStatus = core.getStatus,
        inheritsControl = core.inherits,
        isContentBox = core.isContentBox,
        loseFocus = core.loseFocus,
        query = core.query,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ];
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_CONTROL
    ///__gzip_original__UI_CONTROL_CLASS
    /**
     * 初始化基础控件。
     * options 对象支持的属性如下：
     * type       控件的类型样式
     * primary    控件的基本样式
     * current    控件的当前样式
     * capturable 是否需要捕获鼠标事件，默认捕获
     * userSelect 是否允许选中内容，默认允许
     * focusable  是否允许获取焦点，默认允许
     * resizable  是否允许改变大小，默认允许
     * disabled   是否失效，默认有效
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CONTROL = ui.Control =
            inheritsControl(
                null,
                null,
                null,
                function (el, options) {
                    $bind(el, this);

                    this._bDisabled = !!options.disabled;
                    this._sUID = options.uid;
                    this._sPrimary = options.primary || '';
                    this._sClass = options.current || this._sPrimary;
                    this._eMain = this._eBody = el;
                    this._cParent = null;

                    this._bCapturable = options.capturable !== false;
                    this._bUserSelect = options.userSelect !== false;
                    this._bFocusable = options.focusable !== false;
                    if (options.resizable !== false) {
                        this._bResizable = true;
                        el = el.style;
                        this._sWidth = el.width;
                        this._sHeight = el.height;
                    }
                    else {
                        this._bResizable = false;
                    }

                    this._aStatus = ['', ' '];
                }
            ),
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_CONTROL_READY_LIST,
        UI_CONTROL_QUERY_SHOW = {
            custom: function (control) {
                return this != control && this.contain(control) && control.isShow();
            }
        };
//{else}//
    /**
     * 设置控件的父对象。
     * @private
     *
     * @param {ecui.ui.Control} control 需要设置的控件对象
     * @param {HTMLElement} parent 父控件对象
     * @param {HTMLElement} parentElement 父 Element 对象
     */
    function UI_CONTROL_ALTER_PARENT(control, parent, parentElement) {
        var oldParent = control._cParent,
            el = control.getOuter(),
            flag = control._bCreated && control.isShow();

        // 触发原来父控件的移除子控件事件
        if (parent != oldParent) {
            if (oldParent) {
                if (!triggerEvent(oldParent, 'remove', null, [control])) {
                    return;
                }
            }
            if (parent) {
                if (!triggerEvent(parent, 'append', null, [control])) {
                    parent = parentElement = null;
                }
            }
        }

        if (parentElement != getParent(el)) {
            if (parentElement) {
                parentElement.appendChild(el);
            }
            else {
                removeDom(el);
            }
            // 当 DOM 树位置发生改变时，$setParent必须被执行
            control.$setParent(parent);
        }

        if (flag != (control._bCreated && control.isShow())) {
            triggerEvent(control, flag ? 'hide' : 'show', false);
        }
    }

    /**
     * 控件获得激活事件的默认处理。
     * 控件获得激活时，添加状态样式 -active。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$activate = function () {
        this.alterClass('+active');
    };

    /**
     * 控件失去焦点事件的默认处理。
     * 控件失去焦点时，移除状态样式 -focus。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$blur = function () {
        this.alterClass('-focus');
    };

    /**
     * 缓存控件的属性。
     * $cache 方法缓存部分控件属性的值，在初始化时避免频繁的读写交替操作，加快渲染的速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @protected
     *
     * @param {CssStyle} style 主元素的 Css 样式对象
     * @param {boolean} cacheSize 是否需要缓存控件的大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     */
    UI_CONTROL_CLASS.$cache = function (style, cacheSize) {
        if (ieVersion < 8) {
            o = style.borderWidth;
            if (o.indexOf(' ') > 0) {
                o = o.split(' ');
                this.$$borderTopWidth = toNumber(o[0]);
                this.$$borderRightWidth = toNumber(o[1]);
                this.$$borderBottomWidth = o[2] ? toNumber(o[2]) : this.$$borderTopWidth;
                this.$$borderLeftWidth = o[3] ? toNumber(o[3]) : this.$$borderRightWidth = toNumber(o[1]);
            }
            else {
                this.$$borderTopWidth = this.$$borderLeftWidth = this.$$borderRightWidth = this.$$borderBottomWidth =
                    toNumber(o);
            }
            o = style.padding;
            if (o.indexOf(' ') > 0) {
                o = o.split(' ');
                this.$$paddingTop = toNumber(o[0]);
                this.$$paddingRight = toNumber(o[1]);
                this.$$paddingBottom = o[2] ? toNumber(o[2]) : this.$$paddingTop;
                this.$$paddingLeft = o[3] ? toNumber(o[3]) : this.$$paddingRight;
            }
            else {
                this.$$paddingTop = this.$$paddingLeft = this.$$paddingRight = this.$$paddingBottom = toNumber(o);
            }
        }
        else {
            for (
                var i = 0,
                    list = [
                        'borderTopWidth', 'borderLeftWidth', 'borderRightWidth', 'borderBottomWidth',
                        'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'
                    ],
                    o;
                o = list[i++];
            ) {
                this['$$' + o] = toNumber(style[o]);
            }
        }

        this.$$position = style.position;

        if (cacheSize !== false) {
            o = isContentBox();
            this.$$width = this._eMain.offsetWidth || toNumber(style.width) + (o ? this.$getBasicWidth() : 0);
            this.$$height = this._eMain.offsetHeight || toNumber(style.height) + (o ? this.$getBasicHeight() : 0);
        }
    };

    /**
     * 控件失去激活事件的默认处理。
     * 控件失去激活时，移除状态样式 -active。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$deactivate = function () {
        this.alterClass('-active');
    };

    /**
     * 销毁控件的默认处理。
     * 页面卸载时将销毁所有的控件，释放循环引用，防止在 IE 下发生内存泄漏，$dispose 方法的调用不会受到 ondispose 事件返回值的影响。
     * @protected
     */
    UI_CONTROL_CLASS.$dispose = function () {
        try {
            triggerEvent(this, 'dispose', false);
        }
        catch (e) {
        }
        this._eMain.getControl = undefined;
        this._eMain = this._eBody = null;
        // 取消 $ready 的操作，防止控件在 onload 结束前被 dispose，从而引发 $ready 访问的信息错误的问题
        this.$ready = blank;
    };

    /**
     * 控件获得焦点事件的默认处理。
     * 控件获得焦点时，添加状态样式 -focus。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$focus = function () {
        this.alterClass('+focus');
    };

    /**
     * 获取控件的基本高度。
     * 控件的基本高度指控件基本区域与用户数据存放区域的高度差值，即主元素与内部元素(如果相同则忽略其中之一)的上下边框宽度(border-width)与上下内填充宽度(padding)之和。
     * @public
     *
     * @return {number} 控件的基本高度
     */
    UI_CONTROL_CLASS.$getBasicHeight = function () {
        return this.$$borderTopWidth + this.$$borderBottomWidth + this.$$paddingTop + this.$$paddingBottom;
    };

    /**
     * 获取控件的基本宽度。
     * 控件的基本宽度指控件基本区域与用户数据存放区域的宽度差值，即主元素与内部元素(如果相同则忽略其中之一)的左右边框宽度(border-width)与左右内填充宽度(padding)之和。
     * @public
     *
     * @return {number} 控件的基本宽度
     */
    UI_CONTROL_CLASS.$getBasicWidth = function () {
        return this.$$borderLeftWidth + this.$$borderRightWidth + this.$$paddingLeft + this.$$paddingRight;
    };

    /**
     * 获取指定的部件。
     * $getSection 方法返回控件的一个部件对象，部件对象也是 ECUI 控件，是当前控件的组成成份，不可缺少，请不要轻易的对部件对象进行操作。
     * @protected
     *
     * @param {string} name 部件名称
     * @return {ecui.ui.Control} 部件对象
     */
    UI_CONTROL_CLASS.$getSection = function (name) {
        return this['_u' + name];
    };

    /**
     * 隐藏控件。
     * $hide 方法直接隐藏控件，控件失去激活、悬停与焦点状态，不检查控件之前的状态，因此不会导致浏览器的刷新操作。
     * @protected
     */
    UI_CONTROL_CLASS.$hide = function () {
        if (this._sDisplay === undefined) {
            if (this._bCreated) {
                for (var i = 0, list = query.call(this, UI_CONTROL_QUERY_SHOW), o; o = list[i++];) {
                    triggerEvent(o, 'hide', false);
                }
            }

            o = this.getOuter().style;

            // 保存控件原来的 display 值，在显示时恢复
            this._sDisplay = o.display;
            o.display = 'none';
            // 控件隐藏时需要清除状态
            $clearState(this);
        }
    };

    /**
     * 设置控件容器支持坐标定位。
     * $locate 方法执行后，容器内部 Element 对象的 offsetParent 将指向主元素(参见 getMain 方法)。
     * @protected
     */
    UI_CONTROL_CLASS.$locate = function () {
        if (this.$$position == 'static') {
            this._eMain.style.position = this.$$position = 'relative';
        }
    };

    /**
     * 鼠标移出事件的默认处理。
     * 鼠标移出控件区域时，控件失去悬停状态，移除状态样式 -hover。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseout = function () {
        this.alterClass('-hover');
    };

    /**
     * 鼠标移入事件的默认处理。
     * 鼠标移入控件区域时，控件获得悬停状态，添加状态样式 -hover。
     * @protected
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    UI_CONTROL_CLASS.$mouseover = function () {
        this.alterClass('+hover');
    };

    /**
     * 控件大小变化事件的默认处理。
     * @protected
     */
    UI_CONTROL_CLASS.$resize = function () {
        //__gzip_original__el
        //__gzip_original__currStyle
        var el = this._eMain,
            currStyle = el.style;

        currStyle.width = this._sWidth;
        if (ieVersion < 8 && getStatus() != REPAINT) {
            // 修复ie6/7下宽度自适应错误的问题
            var style = getStyle(el);
            if (style.width == 'auto' && style.display == 'block') {
                currStyle.width = '100%';
                currStyle.width = el.offsetWidth - (isContentBox() ? this.$getBasicWidth() * 2 : 0) + 'px';
            }
        }
        currStyle.height = this._sHeight;
    };

    /**
     * 设置控件的内层元素。
     * ECUI 控件 逻辑上分为外层元素、主元素与内层元素，外层元素用于控制控件自身布局，主元素是控件生成时捆绑的 Element 对象，而内层元素用于控制控件对象的子控件与文本布局，三者允许是同一个 Element 对象。
     * @protected
     *
     * @param {HTMLElement} el Element 对象
     */
    UI_CONTROL_CLASS.$setBody = function (el) {
        this._eBody = el;
    };

    /**
     * 直接设置父控件。
     * 相对于 setParent 方法，$setParent 方法仅设置控件对象逻辑上的父对象，不进行任何逻辑上的检查，用于某些特殊情况下的设定，如下拉框控件中的选项框子控件需要使用 $setParent 方法设置它的逻辑父控件为下拉框控件。
     * @protected
     *
     * @param {ecui.ui.Control} parent ECUI 控件对象
     */
    UI_CONTROL_CLASS.$setParent = function (parent) {
        this._cParent = parent;
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_CONTROL_CLASS.$setSize = function (width, height) {
        //__gzip_original__style
        var style = this._eMain.style,
            o = this._eMain.tagName,
            fixedSize = isContentBox() && o != 'BUTTON' && o != 'INPUT';

        // 防止负宽度IE下出错
        if (width && (o = width - (fixedSize ? this.$getBasicWidth() : 0)) > 0) {
            style.width = o + 'px';
            this.$$width = width;
        }

        // 防止负高度IE下出错
        if (height && (o = height - (fixedSize ? this.$getBasicHeight() : 0)) > 0) {
            style.height = o + 'px';
            this.$$height = height;
        }
    };

    /**
     * 显示控件。
     * $show 方法直接显示控件，不检查控件之前的状态，因此不会导致浏览器的刷新操作。
     * @protected
     */
    UI_CONTROL_CLASS.$show = function () {
        this.getOuter().style.display = this._sDisplay || '';
        this._sDisplay = undefined;

        if (this._bCreated) {
            for (var i = 0, list = query.call(this, UI_CONTROL_QUERY_SHOW), o; o = list[i++];) {
                triggerEvent(o, 'show', false);
            }
        }
    };

    /**
     * 为控件添加/移除一个扩展样式。
     * 扩展样式分别附加在类型样式与当前样式之后(参见 getTypes 与 getClass 方法)，使用-号进行分隔。如果类型样式为 ui-control，当前样式为 demo，扩展样式 hover 后，控件主元素将存在四个样式，分别为 ui-control、demo、ui-control-hover 与 demo-hover。
     * @public
     *
     * @param {string} className 扩展样式名，以+号开头表示添加扩展样式，以-号开头表示移除扩展样式
     */
    UI_CONTROL_CLASS.alterClass = function (className) {
        var flag = className.charAt(0) == '+';

        if (flag) {
            className = '-' + className.slice(1) + ' ';
        }
        else {
            className += ' ';
        }

        (flag ? addClass : removeClass)(this._eMain, this.getTypes().concat([this._sClass, '']).join(className));

        if (flag) {
            this._aStatus.push(className);
        }
        else {
            remove(this._aStatus, className);
        }
    };

    /**
     * 将控件添加到页面元素中。
     * appendTo 方法设置父元素，并使用 findControl 查找父控件对象。如果父控件发生变化，原有的父控件若存在，将触发移除子控件事件(onremove)，并解除控件与原有父控件的关联，新的父控件若存在，将触发添加子控件事件(onappend)，如果此事件返回 false，添加失败，相当于忽略 parentElement 参数。
     * @public
     *
     * @param {HTMLElement} parentElement 父 Element 对象，忽略参数控件将移出 DOM 树
     */
    UI_CONTROL_CLASS.appendTo = function (parentElement) {
        UI_CONTROL_ALTER_PARENT(this, parentElement && findControl(parentElement), parentElement);
    };

    /**
     * 控件失去焦点状态。
     * blur 方法将使控件失去焦点状态，参见 loseFocus 方法。
     * @public
     */
    UI_CONTROL_CLASS.blur = function () {
        loseFocus(this);
    };

    /**
     * 缓存控件的属性。
     * cache 方法验证控件是否已经缓存，如果未缓存将调用 $cache 方法缓存控件属性的值。在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @public
     *
     * @param {boolean} cacheSize 是否需要缓存控件的大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     * @param {boolean} force 是否需要强制刷新缓存，相当于之前执行了 clearCache 方法，默认不强制刷新
     */
    UI_CONTROL_CLASS.cache = function (cacheSize, force) {
        if (force || !this._bCached) {
            this._bCached = true;
            this.$cache(getStyle(this._eMain), cacheSize);
        }
    };

    /**
     * 清除控件的缓存。
     * 在子控件或者应用程序开发过程中，如果需要避开控件提供的方法直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @public
     */
    UI_CONTROL_CLASS.clearCache = function () {
        this._bCached = false;
    };

    /**
     * 判断是否包含指定的控件。
     * contain 方法判断指定的控件是否逻辑上属于当前控件的内部区域，即当前控件是指定的控件的某一级父控件。
     * @public
     *
     * @param {ecui.ui.Control} control ECUI 控件
     * @return {boolean} 是否包含指定的控件
     */
    UI_CONTROL_CLASS.contain = function (control) {
        for (; control; control = control._cParent) {
            if (control == this) {
                return true;
            }
        }
        return false;
    };

    /**
     * 控件获得失效状态。
     * 控件获得失效状态时，添加状态样式 -disabled(参见 alterClass 方法)。disable 方法导致控件失去激活、悬停、焦点状态，所有子控件的 isDisabled 方法返回 true，但不会设置子控件的失效状态样式。
     * @public
     *
     * @return {boolean} 控件失效状态是否改变
     */
    UI_CONTROL_CLASS.disable = function () {
        if (!this._bDisabled) {
            this.alterClass('+disabled');
            this._bDisabled = true;
            $clearState(this);
            return true;
        }
        return false;
    };

    /**
     * 销毁控件。
     * dispose 方法销毁控件及其所有的子控件，相当于调用 ecui.dispose(this) 方法。
     * @public
     */
    UI_CONTROL_CLASS.dispose = function () {
        disposeControl(this);
    };

    /**
     * 控件解除失效状态。
     * 控件解除失效状态时，移除状态样式 -disabled(参见 alterClass 方法)。enable 方法仅解除控件自身的失效状态，如果其父控件失效，isDisabled 方法返回 true。
     * @public
     *
     * @return {boolean} 控件失效状态是否改变
     */
    UI_CONTROL_CLASS.enable = function () {
        if (this._bDisabled) {
            this.alterClass('-disabled');
            this._bDisabled = false;
            return true;
        }
        return false;
    };

    /**
     * 控件获得焦点状态。
     * 如果控件没有处于焦点状态，focus 方法将设置控件获取焦点状态，参见 isFocused 与 setFocused 方法。
     * @public
     */
    UI_CONTROL_CLASS.focus = function () {
        if (!this.isFocused()) {
            setFocused(this);
        }
    };

    /**
     * 获取控件的内层元素。
     * getBody 方法返回用于控制子控件与文本布局的内层元素。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getBody = function () {
        return this._eBody;
    };

    /**
     * 获取控件内层可使用区域的高度。
     * getBodyHeight 方法返回能被子控件与文本填充的控件区域高度，相当于盒子模型的 content 区域的高度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyHeight = function () {
        return this.getHeight() - this.getMinimumHeight();
    };

    /**
     * 获取控件内层可使用区域的宽度。
     * getBodyWidth 方法返回能被子控件与文本填充的控件区域宽度，相当于盒子模型的 content 区域的宽度。
     * @public
     *
     * @return {number} 控件内层可使用区域的宽度
     */
    UI_CONTROL_CLASS.getBodyWidth = function () {
        return this.getWidth() - this.getMinimumWidth();
    };

    /**
     * 获取控件的当前样式。
     * getClass 方法返回控件当前使用的样式，扩展样式分别附加在类型样式与当前样式之后，从而实现控件的状态样式改变，详细的描述请参见 alterClass 方法。当前样式与 getPrimary 方法返回的基本样式存在区别，在控件生成初期，当前样式等于基本样式，基本样式在初始化后无法改变，setClass 方法改变当前样式。
     * @public
     *
     * @return {string} 控件的当前样式
     */
    UI_CONTROL_CLASS.getClass = function () {
        return this._sClass;
    };

    /**
     * 获取控件的内容。
     * @public
     *
     * @return {string} HTML 片断
     */
    UI_CONTROL_CLASS.getContent = function () {
        return this._eBody.innerHTML;
    };

    /**
     * 获取控件区域的高度。
     * @public
     *
     * @return {number} 控件的高度
     */
    UI_CONTROL_CLASS.getHeight = function () {
        this.cache();
        return this.$$height;
    };

    /**
     * 获取控件的主元素。
     * getMain 方法返回控件生成时定义的 Element 对象(参见 create 方法)。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getMain = function () {
        return this._eMain;
    };

    /**
     * 获取控件的最小高度。
     * setSize 方法不允许设置小于 getMinimumHeight 方法返回的高度值。
     * @public
     *
     * @return {number} 控件的最小高度
     */
    UI_CONTROL_CLASS.getMinimumHeight = function () {
        this.cache();
        return this.$getBasicHeight() + (this.$$bodyHeightRevise || 0);
    };

    /**
     * 获取控件的最小宽度。
     * @public
     *
     * @return {number} 控件的最小宽度
     */
    UI_CONTROL_CLASS.getMinimumWidth = function () {
        this.cache();
        return this.$getBasicWidth() + (this.$$bodyWidthRevise || 0);
    };

    /**
     * 获取控件的外层元素。
     * getOuter 方法返回用于控制控件自身布局的外层元素。
     * @public
     *
     * @return {HTMLElement} Element 对象
     */
    UI_CONTROL_CLASS.getOuter = function () {
        return this._eMain;
    };

    /**
     * 获取父控件。
     * 控件接收的事件将向父控件冒泡处理，getParent 返回的结果是 ECUI 的逻辑父控件，父控件与子控件不一定存在 DOM 树层面的父子级关系。
     * @public
     *
     * @return {ecui.ui.Control} 父控件对象
     */
    UI_CONTROL_CLASS.getParent = function () {
        return this._cParent || null;
    };

    /**
     * 获取控件的基本样式。
     * getPrimary 方法返回控件生成时指定的 primary 参数(参见 create 方法)。基本样式与通过 getClass 方法返回的当前样式存在区别，在控件生成初期，当前样式等于基本样式，基本样式在初始化后无法改变，setClass 方法改变当前样式。
     * @public
     *
     * @return {string} 控件的基本样式
     */
    UI_CONTROL_CLASS.getPrimary = function () {
        return this._sPrimary;
    };

    /**
     * 获取控件的类型。
     * @public
     *
     * @return {string} 控件的类型
     */
    UI_CONTROL_CLASS.getType = function () {
        return this.constructor.agent.types[0];
    };

    /**
     * 获取控件的类型样式组。
     * getTypes 方法返回控件的类型样式组，类型样式在控件继承时指定。
     * @public
     *
     * @return {Array} 控件的类型样式组
     */
    UI_CONTROL_CLASS.getTypes = function () {
        return this.constructor.agent.types.slice();
    };

    /**
     * 获取控件的内部唯一标识符。
     * getUID 方法返回的 ID 不是初始化选项中指定的 id，而是框架为每个控件生成的内部唯一标识符。
     * @public
     *
     * @return {string} 控件 ID
     */
    UI_CONTROL_CLASS.getUID = function () {
        return this._sUID;
    };

    /**
     * 获取控件区域的宽度。
     * @public
     *
     * @return {number} 控件的宽度
     */
    UI_CONTROL_CLASS.getWidth = function () {
        this.cache();
        return this.$$width;
    };

    /**
     * 获取控件的相对X轴坐标。
     * getX 方法返回控件的外层元素的 offsetLeft 属性值。如果需要得到控件相对于整个文档的X轴坐标，请调用 getOuter 方法获得外层元素，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} X轴坐标
     */
    UI_CONTROL_CLASS.getX = function () {
        var el = this.getOuter();

        return this.isShow() ? el.offsetLeft - calcLeftRevise(el) : 0;
    };

    /**
     * 获取控件的相对Y轴坐标。
     * getY 方法返回控件的外层元素的 offsetTop 属性值。如果需要得到控件相对于整个文档的Y轴坐标，请调用 getOuter 方法获得外层元素，然后调用 DOM 的相关函数计算(例如 ecui.dom.getPosition)。
     * @public
     *
     * @return {number} Y轴坐标
     */
    UI_CONTROL_CLASS.getY = function () {
        var el = this.getOuter();

        return this.isShow() ? el.offsetTop - calcTopRevise(el) : 0;
    };

    /**
     * 隐藏控件。
     * 如果控件处于显示状态，调用 hide 方法会触发 onhide 事件，控件转为隐藏状态，并且控件会自动失去激活、悬停与焦点状态。如果控件已经处于隐藏状态，则不执行任何操作。
     * @public
     *
     * @return {boolean} 显示状态是否改变
     */
    UI_CONTROL_CLASS.hide = function () {
        if (this.isShow()) {
            triggerEvent(this, 'hide');
        }
    };

    /**
     * 控件初始化。
     * init 方法在控件缓存读取后调用，有关控件生成的完整过程描述请参见 基础控件。
     * @public
     */
    UI_CONTROL_CLASS.init = function () {
        if (!this._bCreated) {
            if (this._bDisabled) {
                this.alterClass('+disabled');
            }
            this.$setSize(this.getWidth(), this.getHeight());

            if (UI_CONTROL_READY_LIST === null) {
                // 页面已经加载完毕，直接运行 $ready 方法
                this.$ready();
            }
            else {
                if (!UI_CONTROL_READY_LIST) {
                    // 页面未加载完成，首先将 $ready 方法的调用存放在调用序列中
                    // 需要这么做的原因是 ie 的 input 回填机制，一定要在 onload 之后才触发
                    // ECUI 应该避免直接使用 ecui.get(xxx) 导致初始化，所有的代码应该在 onload 之后运行
                    UI_CONTROL_READY_LIST = [];
                    timer(function () {
                        for (var i = 0, o; o = UI_CONTROL_READY_LIST[i++];) {
                            o.$ready();
                        }
                        UI_CONTROL_READY_LIST = null;
                    });
                }
                if (this.$ready != blank) {
                    UI_CONTROL_READY_LIST.push(this);
                }
            }
            this._bCreated = true;
        }
    };

    /**
     * 判断控件是否处于激活状态。
     * @public
     *
     * @return {boolean} 控件是否处于激活状态
     */
    UI_CONTROL_CLASS.isActived = function () {
        return this.contain(getActived());
    };

    /**
     * 判断是否响应浏览器事件。
     * 控件不响应浏览器事件时，相应的事件由父控件进行处理。
     * @public
     *
     * @return {boolean} 控件是否响应浏览器事件
     */
    UI_CONTROL_CLASS.isCapturable = function () {
        return this._bCapturable;
    };

    /**
     * 判断控件是否处于失效状态。
     * 控件是否处于失效状态，影响控件是否处理事件，它受到父控件的失效状态的影响。可以通过 enable 与 disable 方法改变控件的失效状态，如果控件失效，它所有的子控件也会失效
     * @public
     *
     * @return {boolean} 控件是否失效
     */
    UI_CONTROL_CLASS.isDisabled = function () {
        return this._bDisabled || (!!this._cParent && this._cParent.isDisabled());
    };

    /**
     * 判断是否允许获得焦点。
     * 控件不允许获得焦点时，被点击时不会改变当前处于焦点状态的控件，但此时控件拥有框架事件响应的最高优先级。
     * @public
     *
     * @return {boolean} 控件是否允许获取焦点
     */
    UI_CONTROL_CLASS.isFocusable = function () {
        return this._bFocusable;
    };

    /**
     * 判断控件是否处于焦点状态。
     * @public
     *
     * @return {boolean} 控件是否处于焦点状态
     */
    UI_CONTROL_CLASS.isFocused = function () {
        return this.contain(getFocused());
    };

    /**
     * 判断控件是否处于悬停状态。
     * @public
     *
     * @return {boolean} 控件是否处于悬停状态
     */
    UI_CONTROL_CLASS.isHovered = function () {
        return this.contain(getHovered());
    };

    /**
     * 判断控件是否允许改变大小。
     * @public
     *
     * @return {boolean} 控件是否允许改变大小
     */
    UI_CONTROL_CLASS.isResizable = function () {
        return this._bResizable;
    };

    /**
     * 判断是否处于显示状态。
     * @public
     *
     * @return {boolean} 控件是否显示
     */
    UI_CONTROL_CLASS.isShow = function () {
        return !!this.getOuter().offsetWidth;
    };

    /**
     * 判断是否允许选中内容。
     * @public
     *
     * @return {boolean} 控件是否允许选中内容
     */
    UI_CONTROL_CLASS.isUserSelect = function () {
        return this._bUserSelect;
    };

    /**
     * 控件完全刷新。
     * 对于存在数据源的控件，render 方法根据数据源重新填充控件内容，重新计算控件的大小进行完全的重绘。
     * @public
     */
    UI_CONTROL_CLASS.render = function () {
        this.resize();
    };

    /**
     * 控件刷新。
     * repaint 方法不改变控件的内容与大小进行重绘。控件如果生成后不位于文档 DOM 树中，样式无法被正常读取，控件显示后如果不是预期的效果，需要调用 repaint 方法刷新。
     * @public
     */
    UI_CONTROL_CLASS.repaint = function () {
        this.cache(true, true);
        this.$setSize(this.getWidth(), this.getHeight());
    };

    /**
     * 控件重置大小并刷新。
     * resize 方法重新计算并设置控件的大小，浏览器可视化区域发生变化时，可能需要改变控件大小，框架会自动调用控件的 resize 方法。
     */
    UI_CONTROL_CLASS.resize = function () {
        if (this._bResizable) {
            this.$resize();
            this.repaint();
        }
    };

    /**
     * 设置控件可使用区域的大小。
     * @public
     *
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    UI_CONTROL_CLASS.setBodySize = function (width, height) {
        this.setSize(width && width + this.getMinimumWidth(), height && height + this.getMinimumHeight());
    };

    /**
     * 设置控件的当前样式。
     * setClass 方法改变控件的当前样式，扩展样式分别附加在类型样式与当前样式之后，从而实现控件的状态样式改变，详细的描述请参见 alterClass 方法。控件的当前样式通过 getClass 方法获取。
     * @public
     *
     * @param {string} currClass 控件的当前样式名称
     */
    UI_CONTROL_CLASS.setClass = function (currClass) {
        var i = 0,
            oldClass = this._sClass,
            classes = this.getTypes(),
            list = [];

        currClass = currClass || this._sPrimary;

        // 如果基本样式没有改变不需要执行
        if (currClass != oldClass) {
            classes.splice(0, 0, this._sClass = currClass);
            for (; classes[i];) {
                list[i] = this._aStatus.join(classes[i++]);
            }
            classes[0] = oldClass;
            this._eMain.className =
                list.join('') +
                this._eMain.className.split(/\s+/).join('  ').replace(
                    new REGEXP('(^| )(' + classes.join('|') + ')(-[^ ]+)?( |$)', 'g'),
                    ''
                );
        }
    };

    /**
     * 设置控件的内容。
     * @public
     *
     * @param {string} html HTML 片断
     */
    UI_CONTROL_CLASS.setContent = function (html) {
        //add by liyinan 2014.6.10
        //设置内容的同时也设置title
        this._eBody.setAttribute('title', html);
        //add by liyinan end 2014.6.10
        this._eBody.innerHTML = html;
    };

    /**
     * 设置当前控件的父控件。
     * setParent 方法设置父控件，将当前控件挂接到父控件对象的内层元素中。如果父控件发生变化，原有的父控件若存在，将触发移除子控件事件(onremove)，并解除控件与原有父控件的关联，新的父控件若存在，将触发添加子控件事件(onappend)，如果此事件返回 false，添加失败，相当于忽略 parent 参数。
     * @public
     *
     * @param {ecui.ui.Control} parent 父控件对象，忽略参数控件将移出 DOM 树
     */
    UI_CONTROL_CLASS.setParent = function (parent) {
        UI_CONTROL_ALTER_PARENT(this, parent, parent && parent._eBody);
    };

    /**
     * 设置控件的坐标。
     * setPosition 方法设置的是控件的 left 与 top 样式，受到 position 样式的影响。
     * @public
     *
     * @param {number} x 控件的X轴坐标
     * @param {number} y 控件的Y轴坐标
     */
    UI_CONTROL_CLASS.setPosition = function (x, y) {
        var style = this.getOuter().style;
        style.left = x + 'px';
        style.top = y + 'px';
    };

    /**
     * 设置控件的大小。
     * 需要设置的控件大小如果低于控件允许的最小值，将忽略对应的宽度或高度的设置。
     * @public
     *
     * @param {number} width 控件的宽度
     * @param {number} height 控件的高度
     */
    UI_CONTROL_CLASS.setSize = function (width, height) {
        if (this._bResizable) {
            this.cache();

            //__gzip_original__style
            var style = this._eMain.style;

            // 控件新的大小不允许小于最小值
            if (width < this.getMinimumWidth()) {
                width = 0;
            }
            if (height < this.getMinimumHeight()) {
                height = 0;
            }

            this.$setSize(width, height);

            if (width) {
                this._sWidth = style.width;
            }
            if (height) {
                this._sHeight = style.height;
            }
        }
    };

    /**
     * 显示控件。
     * 如果控件处于隐藏状态，调用 show 方法会触发 onshow 事件，控件转为显示状态。如果控件已经处于显示状态，则不执行任何操作。
     * @public
     */
    UI_CONTROL_CLASS.show = function () {
        if (!this.isShow()) {
            triggerEvent(this, 'show');
            return true;
        }
        return false;
    };

    (function () {
        // 初始化事件处理函数，以事件名命名，这些函数行为均是判断控件是否可操作/是否需要调用事件/是否需要执行缺省的事件处理，对应的缺省事件处理函数名以$开头后接事件名，处理函数以及缺省事件处理函数参数均为事件对象，仅执行一次。
        for (var i = 0, o; o = eventNames[i++];) {
            UI_CONTROL_CLASS['$' + o] = UI_CONTROL_CLASS['$' + o] || blank;
        }

        // 初始化空操作的一些缺省处理
        UI_CONTROL_CLASS.$intercept = UI_CONTROL_CLASS.$append = UI_CONTROL_CLASS.$remove =
            UI_CONTROL_CLASS.$zoomstart = UI_CONTROL_CLASS.$zoom = UI_CONTROL_CLASS.$zoomend =
                UI_CONTROL_CLASS.$dragstart = UI_CONTROL_CLASS.$dragmove = UI_CONTROL_CLASS.$dragend =
                    UI_CONTROL_CLASS.$ready = UI_CONTROL_CLASS.$pagescroll = blank;
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Button - 定义按钮的基本操作。
 按钮控件，继承自基础控件，屏蔽了激活状态的向上冒泡，并且在激活(active)状态下鼠标移出控件区域会失去激活样式，移入控件区域再次获得激活样式，按钮控件中的文字不可以被选中。

 按钮控件直接HTML初始化的例子:
 <div ecui="type:button">
 <!-- 这里放按钮的文字 -->
 ...
 </div>
 或
 <button ecui="type:button">
 <!-- 这里放按钮的文字 -->
 ...
 </button>
 或
 <input ecui="type:button" value="按钮文字" type="button">

 属性
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        setText = dom.setText,
        setDefault = util.setDefault,

        inheritsControl = core.inherits,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_BUTTON
    ///__gzip_original__UI_BUTTON_CLASS
    /**
     * 初始化基础控件。
     * options 对象支持的属性如下：
     * text 按钮的文字
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BUTTON = ui.Button =
            inheritsControl(
                UI_CONTROL,
                'ui-button',
                function (el, options) {
                    setDefault(options, 'userSelect', false);
                    if (options.text) {
                        setText(el, options.text);
                    }
                }
            ),
        UI_BUTTON_CLASS = UI_BUTTON.prototype;
//{else}//
    /**
     * 按钮控件获得激活时需要阻止事件的冒泡。
     * @override
     */
    UI_BUTTON_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        event.stopPropagation();
    };

    /**
     * 如果控件处于激活状态，移除状态样式 -active，移除状态样式不失去激活状态。
     * @override
     */
    UI_BUTTON_CLASS.$mouseout = function (event) {
        UI_CONTROL_CLASS.$mouseout.call(this, event);
        if (this.isActived()) {
            this.alterClass('-active');
        }
    };

    /**
     * 如果控件处于激活状态，添加状态样式 -active。
     * @override
     */
    UI_BUTTON_CLASS.$mouseover = function (event) {
        UI_CONTROL_CLASS.$mouseover.call(this, event);
        if (this.isActived()) {
            this.alterClass('+active');
        }
    };

    /**
     * 设置控件的文字。
     * @public
     *
     * @param {string} text 控件的文字
     */
    UI_BUTTON_CLASS.setText = function (text) {
        setText(this.getBody(), text);
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Scrollbar - 定义在区间轴内移动的基本操作。
 滚动条控件，继承自基础控件，是滚动行为的虚拟实现，不允许直接初始化，它的子类通常情况下也不会被直接初始化，而是作为控件的一部分用于控制父控件的行为。

 属性
 _nTotal         - 滚动条区域允许设置的最大值
 _nStep          - 滚动条移动一次时的基本步长
 _nValue         - 滚动条当前设置的值
 _oStop          - 定时器的句柄，用于连续滚动处理
 _uPrev          - 向前滚动按钮
 _uNext          - 向后滚动按钮
 _uThumb         - 滑动按钮

 滑动按钮属性
 _oRange         - 滑动按钮的合法滑动区间
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        FLOOR = MATH.floor,
        MAX = MATH.max,
        MIN = MATH.min,

        children = dom.children,
        blank = util.blank,
        setDefault = util.setDefault,
        timer = util.timer,

        $fastCreate = core.$fastCreate,
        drag = core.drag,
        getActived = core.getActived,
        getMouseX = core.getMouseX,
        getMouseY = core.getMouseY,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SCROLLBAR
    ///__gzip_original__UI_SCROLLBAR_CLASS
    ///__gzip_original__UI_VSCROLLBAR
    ///__gzip_original__UI_VSCROLLBAR_CLASS
    ///__gzip_original__UI_HSCROLLBAR
    ///__gzip_original__UI_HSCROLLBAR_CLASS
    /**
     * 初始化滚动条控件。
     * @protected
     *
     * @param {Object} options 初始化选项
     */
    var UI_SCROLLBAR = ui.Scrollbar =
            inheritsControl(
                UI_CONTROL,
                'ui-scrollbar',
                function (el, options) {
                    setDefault(options, 'userSelect', false);
                    setDefault(options, 'focusable', false);

                    var type = this.getType();

                    el.innerHTML =
                        '<div class="' +
                        type + '-prev' + this.Button.TYPES +
                        '" style="position:absolute;top:0px;left:0px"></div><div class="' +
                        type + '-next' + this.Button.TYPES +
                        '" style="position:absolute;top:0px;left:0px"></div><div class="' +
                        this.Thumb.TYPES + '" style="position:absolute"></div>';
                },
                function (el, options) {
                    // 使用 el 代替 children
                    el = children(el);

                    // 初始化滚动条控件
                    this._nValue = this._nTotal = 0;
                    this._nStep = 1;

                    // 创建向前/向后滚动按钮与滑动按钮
                    this._uPrev = $fastCreate(this.Button, el[0], this, {focusable: false});
                    this._uNext = $fastCreate(this.Button, el[1], this, {focusable: false});
                    this._uThumb = $fastCreate(this.Thumb, el[2], this, {focusable: false});

                    this._oStop = blank;
                }
            ),
        UI_SCROLLBAR_CLASS = UI_SCROLLBAR.prototype,

        /**
         * 初始化滚动条控件的滑动按钮部件。
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_SCROLLBAR_THUMB_CLASS =
            (UI_SCROLLBAR_CLASS.Thumb = inheritsControl(UI_BUTTON, 'ui-scrollbar-thumb')).prototype,

        /**
         * 初始化滚动条控件的按钮部件。
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_SCROLLBAR_BUTTON_CLASS =
            (UI_SCROLLBAR_CLASS.Button = inheritsControl(UI_BUTTON, 'ui-scrollbar-button')).prototype;
//{else}//
    /**
     * 控扭控件自动滚动。
     * @private
     *
     * @param {ecui.ui.Scrollbar} scrollbar 滚动条控件
     * @param {number} step 单次滚动步长，为负数表示向前滚动，否则是向后滚动
     * @param {number} interval 触发时间间隔，默认40ms
     */
    function UI_SCROLLBAR_AUTO_SCROLL(scrollbar, step, interval) {
        var value = scrollbar._nValue,
            direction = scrollbar.getMouseDirection();

        // 如果有没有结束的自动滚动，需要先结束，这种情况出现在快速的多次点击时
        scrollbar._oStop();

        if (direction == -1 && step < 0 || direction == 1 && step > 0) {
            scrollbar.setValue(value + step);
        }
        else {
            // 如果因为鼠标位置的原因无法自动滚动，需要强制设置值变化属性
            value = -1;
        }

        // 如果滚动条的值发生变化，将进行下一次的自动滚动，否则滚动条已经到达两端停止自动滚动
        scrollbar._oStop = scrollbar._nValue != value ?
            timer(UI_SCROLLBAR_AUTO_SCROLL, interval || 200, null, scrollbar, step, 40) : blank;
    }

    /**
     * 滚动条值发生改变后的处理。
     * 滚动条的值发生改变后，将触发父控件的 onscroll 事件，如果事件返回值不为 false，则调用父控件的 $scroll 方法。
     * @private
     *
     * @param {ecui.ui.Scrollbar} scrollbar 滚动条控件
     */
    function UI_SCROLLBAR_CHANGE(scrollbar) {
        var parent = scrollbar.getParent(),
            uid;

        if (parent) {
            parent.$scroll();
            if (!UI_SCROLLBAR[uid = parent.getUID()]) {
                // 根据浏览器的行为，无论改变滚动条的值多少次，在一个脚本运行周期只会触发一次onscroll事件
                timer(function () {
                    delete UI_SCROLLBAR[uid];
                    triggerEvent(parent, 'scroll', false);
                });
                UI_SCROLLBAR[uid] = true;
            }
        }
    }

    /**
     * 滑动按钮获得激活时，触发滑动按钮进入拖拽状态。
     * @override
     */
    UI_SCROLLBAR_THUMB_CLASS.$activate = function (event) {
        UI_BUTTON_CLASS.$activate.call(this, event);

        drag(this, event, this._oRange);
    };

    /**
     * @override
     */
    UI_SCROLLBAR_THUMB_CLASS.$dragmove = function (event, x, y) {
        UI_BUTTON_CLASS.$dragmove.call(this, event, x, y);

        var parent = this.getParent(),
            value = parent.$calculateValue(x, y);

        // 应该滚动step的整倍数
        parent.$setValue(value == parent._nTotal ? value : value - value % parent._nStep);
        UI_SCROLLBAR_CHANGE(parent);
    };

    /**
     * 设置滑动按钮的合法拖拽区间。
     * @public
     *
     * @param {number} top 允许拖拽的最上部区域
     * @param {number} right 允许拖拽的最右部区域
     * @param {number} bottom 允许拖拽的最下部区域
     * @param {number} left 允许拖拽的最左部区域
     */
    UI_SCROLLBAR_THUMB_CLASS.setRange = function (top, right, bottom, left) {
        this._oRange = {
            top: top,
            right: right + 3, //居中显示增加左右3像素
            bottom: bottom,
            left: left + 3
        };
    };

    /**
     * 滚动条按钮获得激活时，将开始自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$activate = function (event) {
        UI_BUTTON_CLASS.$activate.call(this, event);

        var parent = this.getParent();
        UI_SCROLLBAR_AUTO_SCROLL(parent, parent.getMouseDirection() * MAX(parent._nStep, 5));
    };

    /**
     * 滚动条按钮失去激活时，将停止自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$deactivate = function (event) {
        UI_BUTTON_CLASS.$deactivate.call(this, event);
        this.getParent()._oStop();
    };

    /**
     * 滚动条按钮鼠标移出时，如果控件处于直接激活状态，将暂停自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$mouseout = function (event) {
        UI_BUTTON_CLASS.$mouseout.call(this, event);
        if (getActived() == this) {
            this.getParent()._oStop(true);
        }
    };

    /**
     * 滚动条按钮鼠标移入时，如果控件处于直接激活状态，将恢复自动滚动。
     * @override
     */
    UI_SCROLLBAR_BUTTON_CLASS.$mouseover = function (event) {
        UI_BUTTON_CLASS.$mouseover.call(this, event);
        if (getActived() == this) {
            this.getParent()._oStop(true);
        }
    };

    /**
     * 滚动条获得激活时，将开始自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        UI_SCROLLBAR_AUTO_SCROLL(this, this.getMouseDirection() * this.$getPageStep());
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        this._uPrev.cache(true, true);
        this._uNext.cache(true, true);
        this._uThumb.cache(true, true);
    };

    /**
     * 滚动条失去激活时，将停止自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$deactivate = function (event) {
        UI_CONTROL_CLASS.$deactivate.call(this, event);
        this._oStop();
    };

    /**
     * 隐藏滚动条控件时，滚动条控件的当前值需要复位为0，参见 setValue 方法。
     * @override
     */
    UI_SCROLLBAR_CLASS.$hide = function () {
        UI_CONTROL_CLASS.$hide.call(this);
        UI_SCROLLBAR_CLASS.setValue.call(this, 0);
    };

    /**
     * 滚动条鼠标移出时，如果控件处于直接激活状态，将暂停自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$mouseout = function (event) {
        UI_CONTROL_CLASS.$mouseout.call(this, event);
        if (getActived() == this) {
            this._oStop(true);
        }
    };

    /**
     * 滚动条鼠标移入时，如果控件处于直接激活状态，将恢复自动滚动。
     * @override
     */
    UI_SCROLLBAR_CLASS.$mouseover = function (event) {
        UI_CONTROL_CLASS.$mouseover.call(this, event);
        if (getActived() == this) {
            this._oStop(true);
        }
    };

    /**
     * 设置滚动条控件的单页步长。
     * 滚动条控件的单页步长决定在点击滚动条空白区域(即非按钮区域)时滚动一页移动的距离，如果不设置单页步长，默认使用最接近滚动条长度的合理步长(即单项步长最接近总长度的整数倍)。
     * @protected
     *
     * @param {number} step 单页步长
     */
    UI_SCROLLBAR_CLASS.$setPageStep = function (step) {
        this._nPageStep = step;
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
    };

    /**
     * 直接设置控件的当前值。
     * $setValue 仅仅设置控件的参数值，不进行合法性验证，也不改变滑动按钮的位置信息，用于滑动按钮拖拽时同步设置当前值。
     * @protected
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLLBAR_CLASS.$setValue = function (value) {
        this._nValue = value;
    };

    /**
     * 获取滚动条控件的单次滚动步长。
     * getStep 方法返回滚动条控件发生滚动时，移动的最小步长值，通过 setStep 设置。
     * @public
     *
     * @return {number} 单次滚动步长
     */
    UI_SCROLLBAR_CLASS.getStep = function () {
        return this._nStep;
    };

    /**
     * 获取滚动条控件的最大值。
     * getTotal 方法返回滚动条控件允许滚动的最大值，最大值、当前值与滑动按钮控件的实际位置互相影响，通过 setTotal 设置。
     * @public
     *
     * @return {number} 控件的最大值
     */
    UI_SCROLLBAR_CLASS.getTotal = function () {
        return this._nTotal;
    };

    /**
     * 获取滚动条控件的当前值。
     * getValue 方法返回滚动条控件的当前值，最大值、当前值与滑动按钮控件的实际位置互相影响，但是当前值不允许超过最大值，通过 setValue 方法设置。
     * @public
     *
     * @return {number} 滚动条控件的当前值
     */
    UI_SCROLLBAR_CLASS.getValue = function () {
        return this._nValue;
    };

    /**
     * @override
     */
    UI_SCROLLBAR_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uPrev.init();
        this._uNext.init();
        this._uThumb.init();
    };

    /**
     * 设置滚动条控件的单次滚动步长。
     * setStep 方法设置的值必须大于0，否则不会进行操作。
     * @public
     *
     * @param {number} value 单次滚动步长
     */
    UI_SCROLLBAR_CLASS.setStep = function (value) {
        if (value > 0) {
            this._nStep = value;
        }
    };

    /**
     * 设置滚动条控件的最大值。
     * setTotal 方法设置的值不能为负数，当前值如果大于最大值，设置当前值为新的最大值，最大值发生改变将导致滑动按钮刷新。
     * @public
     *
     * @param {number} value 控件的最大值
     */
    UI_SCROLLBAR_CLASS.setTotal = function (value) {
        if (value >= 0 && this._nTotal != value) {
            this._nTotal = value;
            // 检查滚动条控件的当前值是否已经越界
            if (this._nValue > value) {
                // 值发生改变时触发相应的事件
                this._nValue = value;
                UI_SCROLLBAR_CHANGE(this);
            }
            this.$flushThumb();
        }
    };

    /**
     * 设置滚动条控件的当前值。
     * setValue 方法设置的值不能为负数，也不允许超过使用 setTotal 方法设置的控件的最大值，如果当前值不合法，将自动设置为最接近合法值的数值，当前值发生改变将导致滑动按钮控件刷新。
     * @public
     *
     * @param {number} value 控件的当前值
     */
    UI_SCROLLBAR_CLASS.setValue = function (value) {
        value = MIN(MAX(0, value), this._nTotal);
        if (this._nValue != value) {
            // 值发生改变时触发相应的事件
            this._nValue = value;
            UI_SCROLLBAR_CHANGE(this);
            this.$flushThumb();
        }
    };

    /**
     * 滚动条控件当前值移动指定的步长次数。
     * 参数 value 必须是整数, 正数则向最大值方向移动，负数则向0方向移动，允许移动的区间在0-最大值之间，参见 setStep、setTotal 与 setValue 方法。
     * @public
     *
     * @param {number} n 移动的步长次数
     */
    UI_SCROLLBAR_CLASS.skip = function (n) {
        this.setValue(this._nValue + n * this._nStep);
    };
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化垂直滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_VSCROLLBAR = ui.VScrollbar = inheritsControl(UI_SCROLLBAR, 'ui-vscrollbar'),
        UI_VSCROLLBAR_CLASS = UI_VSCROLLBAR.prototype;
//{else}//
    /**
     * 计算滑动按钮拖拽时的当前值。
     * 滑动按钮拖拽时，根据位置计算对应的当前值，然后通过 $setValue 方法直接设置。
     * @protected
     *
     * @param {number} x 滑动按钮实际到达的X轴坐标
     * @param {number} y 滑动按钮实际到达的Y轴坐标
     */
    UI_VSCROLLBAR_CLASS.$calculateValue = function (x, y) {
        //__gzip_original__range
        var thumb = this._uThumb,
            range = thumb._oRange;
        return (y - range.top) / (range.bottom - this._uPrev.getHeight() - thumb.getHeight()) * this._nTotal;
    };

    /**
     * 滑动按钮刷新。
     * 当滚动条控件的大小或最大值/当前值发生变化时，滑动按钮的大小与位置需要同步改变，参见 setSize、setValue 与 setTotal 方法。
     * @protected
     */
    UI_VSCROLLBAR_CLASS.$flushThumb = function () {
        // 计算滑动按钮高度与位置
        var thumb = this._uThumb,
            total = this._nTotal,
            height = this.getHeight(),
            prevHeight = this._uPrev.getHeight(),
            bodyHeight = this.getBodyHeight(),
            bodyWidth = this.getBodyWidth(),
            thumbHeight = MAX(FLOOR(bodyHeight * height / (height + total)), thumb.getMinimumHeight() + 5);

        if (total) {
            thumb.$setSize(bodyWidth / 2, thumbHeight);
            thumb.setPosition(bodyWidth / 4, prevHeight + FLOOR((this._nValue / total) * (bodyHeight - thumbHeight)));
            thumb.setRange(prevHeight, 0, bodyHeight + prevHeight, 0);
        }
    };

    /**
     * 获取单页的步长。
     * 如果使用 $setPageStep 方法设置了单页的步长，$getPageStep 方法直接返回设置的步长，否则 $getPageStep 返回最接近滚动条控件长度的步长的整数倍。
     * @protected
     *
     * @return {number} 单页的步长
     */
    UI_VSCROLLBAR_CLASS.$getPageStep = function () {
        var height = this.getHeight();
        return this._nPageStep || height - height % this._nStep;
    };

    /**
     * @override
     */
    UI_VSCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_SCROLLBAR_CLASS.$setSize.call(this, width, height);

        //__gzip_original__next
        var bodyWidth = this.getBodyWidth(),
            prevHeight = this.$$paddingTop,
            next = this._uNext;

        // 设置滚动按钮与滑动按钮的信息
        this._uPrev.$setSize(bodyWidth, prevHeight);
        this._uPrev.setPosition(0, 3);
        next.$setSize(bodyWidth, this.$$paddingBottom);
        this._uThumb.$setSize(bodyWidth);
        next.setPosition(0, this.getBodyHeight() + prevHeight + 3);

        this.$flushThumb();
    };

    /**
     * 获取鼠标相对于滑动按钮的方向。
     * 鼠标如果在滑动按钮之前，返回 -1，鼠标如果在滑动按钮之后，返回 1，否则返回 0。
     * @protected
     *
     * @return {number} 鼠标相对于滑动按钮的方向数值
     */
    UI_VSCROLLBAR_CLASS.getMouseDirection = function () {
        return getMouseY(this) < this._uThumb.getY() ?
            -1 : getMouseY(this) > this._uThumb.getY() + this._uThumb.getHeight() ? 1 : 0;
    };
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化水平滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_HSCROLLBAR = ui.HScrollbar = inheritsControl(UI_SCROLLBAR, 'ui-hscrollbar'),
        UI_HSCROLLBAR_CLASS = UI_HSCROLLBAR.prototype;
//{else}//
    /**
     * 计算滑动按钮拖拽时的当前值。
     * 滑动按钮拖拽时，根据位置计算对应的当前值，然后通过 $setValue 方法直接设置。
     * @protected
     *
     * @param {number} x 滑动按钮实际到达的X轴坐标
     * @param {number} y 滑动按钮实际到达的Y轴坐标
     */
    UI_HSCROLLBAR_CLASS.$calculateValue = function (x, y) {
        //__gzip_original__range
        var thumb = this._uThumb,
            range = thumb._oRange;
        return (x - range.left) / (range.right - this._uPrev.getWidth() - thumb.getWidth()) * this._nTotal;
    };

    /**
     * 滑动按钮刷新。
     * 当滚动条控件的大小或最大值/当前值发生变化时，滑动按钮的大小与位置需要同步改变，参见 setSize、setValue 与 setTotal 方法。
     * @protected
     */
    UI_HSCROLLBAR_CLASS.$flushThumb = function () {
        // 计算滑动按钮高度与位置
        var thumb = this._uThumb,
            total = this._nTotal,
            width = this.getWidth(),
            prevWidth = this._uPrev.getWidth(),
            bodyWidth = this.getBodyWidth(),
            thumbWidth = MAX(FLOOR(bodyWidth * width / (width + total)), thumb.getMinimumWidth() + 5);

        if (total) {
            thumb.$setSize(thumbWidth);
            thumb.setPosition(prevWidth + FLOOR((this._nValue / total) * (bodyWidth - thumbWidth)), 0);
            thumb.setRange(0, bodyWidth + prevWidth, 0, prevWidth);
        }
    };

    /**
     * 获取单页的步长。
     * 如果使用 $setPageStep 方法设置了单页的步长，$getPageStep 方法直接返回设置的步长，否则 $getPageStep 返回最接近滚动条控件长度的步长的整数倍。
     * @protected
     *
     * @return {number} 单页的步长
     */
    UI_HSCROLLBAR_CLASS.$getPageStep = function () {
        var width = this.getWidth();
        return width - width % this._nStep;
    };

    /**
     * @override
     */
    UI_HSCROLLBAR_CLASS.$setSize = function (width, height) {
        UI_SCROLLBAR_CLASS.$setSize.call(this, width, height);

        //__gzip_original__next
        var bodyHeight = this.getBodyHeight(),
            prevWidth = this.$$paddingLeft,
            next = this._uNext;

        // 设置滚动按钮与滑动按钮的信息
        this._uPrev.$setSize(prevWidth, bodyHeight);
        next.$setSize(this.$$paddingRight, bodyHeight);
        this._uThumb.$setSize(0, bodyHeight);
        next.setPosition(this.getBodyWidth() + prevWidth, 0);

        this.$flushThumb();
    };

    /**
     * 获取鼠标相对于滑动按钮的方向。
     * 鼠标如果在滑动按钮之前，返回 -1，鼠标如果在滑动按钮之后，返回 1，否则返回 0。
     * @protected
     *
     * @return {number} 鼠标相对于滑动按钮的方向数值
     */
    UI_HSCROLLBAR_CLASS.getMouseDirection = function () {
        return getMouseX(this) < this._uThumb.getX() ?
            -1 : getMouseX(this) > this._uThumb.getX() + this._uThumb.getWidth() ? 1 : 0;
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Panel - 定义在一个小区域内截取显示大区域内容的基本操作。
 截面控件，继承自基础控件，用于显示实际的内容区域超过控件显示区域的信息，通过拖拽滚动条显示完整的内容，截面控件可以设置参数决定是否自动显示水平/垂直滚动条，如果设置不显示水平/垂直滚动条，水平/垂直内容超出的部分将直接被截断，当设置两个滚动条都不显示时，截面控件从显示效果上等同于基础控件。在截面控件上滚动鼠标滑轮，将控制截面控件往垂直方向(如果没有垂直滚动条则在水平方向)前移或者后移滚动条，在获得焦点后，通过键盘的方向键也可以操作截面控件的滚动条。

 截面控件直接HTML初始化的例子:
 <div ecui="type:panel">
 <!-- 这里放内容 -->
 ...
 </div>

 属性
 _bAbsolute           - 是否包含绝对定位的Element
 _nWheelDelta         - 鼠标滚轮滚动一次的差值
 _eBrowser            - 用于浏览器原生的滚动条实现的Element
 _uVScrollbar         - 垂直滚动条控件
 _uHScrollbar         - 水平滚动条控件
 _uCorner             - 夹角控件
 $$mainWidth          - layout区域的实际宽度
 $$mainHeight         - layout区域的实际高度
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,
        FLOOR = MATH.floor,

        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getStyle = dom.getStyle,
        moveElements = dom.moveElements,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        calcHeightRevise = core.calcHeightRevise,
        calcWidthRevise = core.calcWidthRevise,
        findControl = core.findControl,
        getKey = core.getKey,
        getScrollNarrow = core.getScrollNarrow,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        wrapEvent = core.wrapEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_VSCROLLBAR = ui.VScrollbar,
        UI_HSCROLLBAR = ui.HScrollbar;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生滚动条控件。
     * @protected
     *
     * @param {Object} options 初始化选项
     */
    ///__gzip_original__UI_BROWSER_SCROLLBAR
    ///__gzip_original__UI_BROWSER_SCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_VSCROLLBAR
    ///__gzip_original__UI_BROWSER_VSCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_HSCROLLBAR
    ///__gzip_original__UI_BROWSER_HSCROLLBAR_CLASS
    ///__gzip_original__UI_BROWSER_CORNER
    ///__gzip_original__UI_BROWSER_CORNER_CLASS
    ///__gzip_original__UI_PANEL
    ///__gzip_original__UI_PANEL_CLASS
    var UI_BROWSER_SCROLLBAR =
            inheritsControl(
                UI_CONTROL,
                null,
                null,
                function (el, options) {
                    detachEvent(el, 'scroll', UI_BROWSER_SCROLLBAR_SCROLL);
                    attachEvent(el, 'scroll', UI_BROWSER_SCROLLBAR_SCROLL);
                }
            ),
        UI_BROWSER_SCROLLBAR_CLASS = UI_BROWSER_SCROLLBAR.prototype;
//{else}//
    /**
     * 原生滚动条滚动处理。
     * 滚动条滚动后，将触发父控件的 onscroll 事件，如果事件返回值不为 false，则调用父控件的 $scroll 方法。
     * @private
     *
     * @param {ecui.ui.Event} event 事件对象
     */
    function UI_BROWSER_SCROLLBAR_SCROLL(event) {
        triggerEvent(findControl(getParent(wrapEvent(event).target)), 'scroll');
    }

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.$hide = UI_BROWSER_SCROLLBAR_CLASS.hide = function () {
        this.getMain().style[this._aProperty[0]] = 'hidden';
        UI_BROWSER_SCROLLBAR_CLASS.setValue.call(this, 0);
    };

    /**
     * 直接设置控件的当前值。
     * @protected
     *
     * @param {number} value 控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.$setValue = function (value) {
        this.getMain()[this._aProperty[1]] = MIN(MAX(0, value), this.getTotal());
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.$show = UI_BROWSER_SCROLLBAR_CLASS.show = function () {
        this.getMain().style[this._aProperty[0]] = 'scroll';
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.getHeight = function () {
        return this._aProperty[4] ? this.getMain()[this._aProperty[4]] : getScrollNarrow();
    };

    /**
     * 获取滚动条控件的最大值。
     * getTotal 方法返回滚动条控件允许滚动的最大值，最大值、当前值与滑动块控件的实际位置互相影响，通过 setTotal 设置。
     * @public
     *
     * @return {number} 控件的最大值
     */
    UI_BROWSER_SCROLLBAR_CLASS.getTotal = function () {
        return toNumber(this.getMain().lastChild.style[this._aProperty[2]]);
    };

    /**
     * 获取滚动条控件的当前值。
     * getValue 方法返回滚动条控件的当前值，最大值、当前值与滑动按钮控件的实际位置互相影响，但是当前值不允许超过最大值，通过 setValue 方法设置。
     * @public
     *
     * @return {number} 滚动条控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.getValue = function () {
        return this.getMain()[this._aProperty[1]];
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.getWidth = function () {
        return this._aProperty[3] ? this.getMain()[this._aProperty[3]] : getScrollNarrow();
    };

    /**
     * @override
     */
    UI_BROWSER_SCROLLBAR_CLASS.isShow = function () {
        return this.getMain().style[this._aProperty[0]] != 'hidden';
    };

    /**
     * 设置滚动条控件的最大值。
     * setTotal 方法设置的值不能为负数，当前值如果大于最大值，设置当前值为新的最大值，最大值发生改变将导致滑动按钮刷新。
     * @public
     *
     * @param {number} value 控件的最大值
     */
    UI_BROWSER_SCROLLBAR_CLASS.setTotal = function (value) {
        this.getMain().lastChild.style[this._aProperty[2]] = value + 'px';
    };

    /**
     * 设置滚动条控件的当前值。
     * @public
     *
     * @param {number} value 控件的当前值
     */
    UI_BROWSER_SCROLLBAR_CLASS.setValue = function (value) {
        this.$setValue(value);
        triggerEvent(this.getParent(), 'scroll');
    };

    UI_BROWSER_SCROLLBAR_CLASS.$cache =
        UI_BROWSER_SCROLLBAR_CLASS.$getPageStep = UI_BROWSER_SCROLLBAR_CLASS.$setPageStep =
            UI_BROWSER_SCROLLBAR_CLASS.$setSize = UI_BROWSER_SCROLLBAR_CLASS.alterClass =
                UI_BROWSER_SCROLLBAR_CLASS.cache = UI_BROWSER_SCROLLBAR_CLASS.getStep =
                    UI_BROWSER_SCROLLBAR_CLASS.init = UI_BROWSER_SCROLLBAR_CLASS.setPosition =
                        UI_BROWSER_SCROLLBAR_CLASS.setStep = UI_BROWSER_SCROLLBAR_CLASS.skip = blank;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生垂直滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_VSCROLLBAR =
        inheritsControl(
            UI_BROWSER_SCROLLBAR,
            null,
            null,
            function (el, options) {
                this._aProperty = ['overflowY', 'scrollTop', 'height', null, 'offsetHeight'];
            }
        );
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化浏览器原生水平滚动条控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_HSCROLLBAR =
        inheritsControl(
            UI_BROWSER_SCROLLBAR,
            null,
            null,
            function (el, options) {
                this._aProperty = ['overflowX', 'scrollLeft', 'width', 'offsetWidth', null];
            }
        );
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化夹角控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_BROWSER_CORNER = inheritsControl(UI_CONTROL),
        UI_BROWSER_CORNER_CLASS = UI_BROWSER_CORNER.prototype;
//{else}//
    (function () {
        for (var name in UI_CONTROL_CLASS) {
            UI_BROWSER_CORNER_CLASS[name] = blank;
        }
    })();
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化截面控件，截面控件支持自动展现滚动条控件，允许指定需要自动展现的垂直或水平滚动条。
     * options 对象支持的属性如下：
     * vScroll    是否自动展现垂直滚动条，默认展现
     * hScroll    是否自动展现水平滚动条，默认展现
     * browser    是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * absolute   是否包含绝对定位的Element，默认不包含
     * wheelDelta 鼠标滚轮的步长，即滚动一次移动的最小步长单位，默认总步长(差值*步长)为不大于20像素的最大值
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_PANEL = ui.Panel =
            inheritsControl(
                UI_CONTROL,
                'ui-panel',
                function (el, options) {
                    var vscroll = options.vScroll !== false,
                        hscroll = options.hScroll !== false,
                        type = this.getType(),
                        o = createDom(
                            type + '-body',
                            'position:absolute;top:0px;left:0px' + (hscroll ? ';white-space:nowrap' : '')
                        );

                    el.style.overflow = 'hidden';
                    moveElements(el, o, true);

                    el.innerHTML =
                        (options.browser ?
                            '<div style="position:absolute;top:0px;left:0px;overflow:auto;padding:0px;border:0px">' +
                            '<div style="width:1px;height:1px;padding:0px;border:0px"></div></div>'
                                : (vscroll ?
                            '<div class="' + type + '-vscrollbar' + this.VScrollbar.TYPES +
                            '" style="position:absolute"></div>' : '') +
                            (hscroll ?
                            '<div class="' + type + '-hscrollbar' + this.HScrollbar.TYPES +
                            '" style="position:absolute"></div>' : '') +
                            (vscroll && hscroll ?
                            '<div class="' + type + '-corner' + UI_CONTROL.TYPES +
                            '" style="position:absolute"></div>' : '')
                        ) + '<div class="' + type +
                        '-layout" style="position:relative;overflow:hidden;padding:0px"></div>';

                    el.lastChild.appendChild(o);
                },
                function (el, options) {
                    var i = 0,
                        browser = options.browser,
                        vscroll = options.vScroll !== false,
                        hscroll = options.hScroll !== false,
                        list = [
                            [vscroll, '_uVScrollbar', browser ? UI_BROWSER_VSCROLLBAR : this.VScrollbar],
                            [hscroll, '_uHScrollbar', browser ? UI_BROWSER_HSCROLLBAR : this.HScrollbar],
                            [vscroll && hscroll, '_uCorner', browser ? UI_BROWSER_CORNER : UI_CONTROL]
                        ],
                        o;

                    this.$setBody(el.lastChild.lastChild);

                    this._bAbsolute = options.absolute;
                    this._nWheelDelta = options.wheelDelta;

                    el = el.firstChild;
                    if (browser) {
                        this._eBrowser = el;
                    }

                    // 生成中心区域的Element层容器，滚动是通过改变容器的left与top属性实现
                    for (; o = list[i++];) {
                        if (o[0]) {
                            this[o[1]] = $fastCreate(o[2], el, this);
                            if (!browser) {
                                el = el.nextSibling;
                            }
                        }
                    }
                }
            ),
        UI_PANEL_CLASS = UI_PANEL.prototype;
//{else}//

    UI_PANEL_CLASS.VScrollbar = UI_VSCROLLBAR;
    UI_PANEL_CLASS.HScrollbar = UI_HSCROLLBAR;

    /**
     * @override
     */
    UI_PANEL_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        var body = this.getBody(),
            mainWidth = body.offsetWidth,
            mainHeight = body.offsetHeight;

        style = getStyle(getParent(body));
        this.$$bodyWidthRevise = calcWidthRevise(style);
        this.$$bodyHeightRevise = calcHeightRevise(style);

        // 考虑到内部Element绝对定位的问题，中心区域的宽度与高度修正
        if (this._bAbsolute) {
            for (
                var i = 0,
                    list = body.all || body.getElementsByTagName('*'),
                    pos = getPosition(body);
                // 以下使用 body 代替临时的 DOM 节点对象
                body = list[i++];
            ) {
                if (body.offsetWidth && getStyle(body, 'position') == 'absolute') {
                    style = getPosition(body);
                    mainWidth = MAX(mainWidth, style.left - pos.left + body.offsetWidth);
                    mainHeight = MAX(mainHeight, style.top - pos.top + body.offsetHeight);
                }
            }
        }

        this.$$mainWidth = mainWidth;
        this.$$mainHeight = mainHeight;

        if (this._uVScrollbar) {
            this._uVScrollbar.cache(true, true);
        }
        if (this._uHScrollbar) {
            this._uHScrollbar.cache(true, true);
        }
        if (this._uCorner) {
            this._uCorner.cache(true, true);
        }
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.$dispose = function () {
        this._eBrowser = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 接管对方向键的处理。
     * @override
     */
    UI_PANEL_CLASS.$keydown = UI_PANEL_CLASS.$keypress = function (event) {
        var which = getKey(),
            o = which % 2 ? this._uHScrollbar : this._uVScrollbar;

        if (which >= 37 && which <= 40 && !event.target.value) {
            if (o) {
                o.skip(which + which % 2 - 39);
            }
            return false;
        }
    };

    /**
     * 如果有垂直滚动条，则垂直滚动条随滚轮滚动。
     * @override
     */
    UI_PANEL_CLASS.$mousewheel = function (event) {
        if (this.isHovered()) {
            o = this._uVScrollbar;

            if (o && o.isShow()) {
                // 计算滚动的次数，至少要滚动一次
                var value = o.getValue(),
                    delta = this._nWheelDelta || FLOOR(20 / o.getStep()) || 1,
                    o;

                o.skip(event.detail > 0 ? delta : -delta);
                event.stopPropagation();
                // 如果截面已经移动到最后，不屏弊缺省事件
                return value == o.getValue();
            }
        }
    };

    /**
     * 控件的滚动条发生滚动的默认处理。
     * 如果控件包含滚动条，滚动条滚动时触发 onscroll 事件，如果事件返回值不为 false，则调用 $scroll 方法。
     * @protected
     */
    UI_PANEL_CLASS.$scroll = function () {
        var style = this.getBody().style;
        style.left = -MAX(this.getScrollLeft(), 0) + 'px';
        style.top = -MAX(this.getScrollTop(), 0) + 'px';
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();

        var basicWidth = this.$getBasicWidth(),
            basicHeight = this.$getBasicHeight(),
            paddingWidth = this.$$paddingLeft + this.$$paddingRight,
            paddingHeight = this.$$paddingTop + this.$$paddingBottom,
            bodyWidth = this.getWidth() - basicWidth,
            bodyHeight = this.getHeight() - basicHeight,
            mainWidth = this.$$mainWidth,
            mainHeight = this.$$mainHeight,
            browser = this._eBrowser,
            vscroll = this._uVScrollbar,
            hscroll = this._uHScrollbar,
            corner = this._uCorner,
            vsWidth = vscroll ? vscroll.getWidth() : 0,
            hsHeight = hscroll ? hscroll.getHeight() : 0,
        //innerWidth = bodyWidth - vsWidth,
            innerWidth = bodyWidth,//滚动条浮动不占宽度
            innerHeight = bodyHeight - hsHeight,
            hsWidth = innerWidth - vsWidth + paddingWidth,
            vsHeight = innerHeight + paddingHeight;

        // 设置垂直与水平滚动条与夹角控件的位置
        if (vscroll) {
            vscroll.setPosition(hsWidth, 0);
        }
        if (hscroll) {
            hscroll.setPosition(0, vsHeight);
        }
        if (corner) {
            corner.setPosition(hsWidth, vsHeight);
        }

        if (mainWidth <= bodyWidth && mainHeight <= bodyHeight) {
            // 宽度与高度都没有超过截面控件的宽度与高度，不需要显示滚动条
            if (vscroll) {
                vscroll.$hide();
            }
            if (hscroll) {
                hscroll.$hide();
            }
            if (corner) {
                corner.$hide();
            }
            innerWidth = bodyWidth;
            innerHeight = bodyHeight;
        }
        else {
            while (true) {
                if (corner) {
                    // 宽度与高度都超出了显示滚动条后余下的宽度与高度，垂直与水平滚动条同时显示
                    if (mainWidth > innerWidth && mainHeight > innerHeight) {
                        hscroll.$setSize(hsWidth);
                        hscroll.setTotal(browser ? mainWidth + basicWidth : mainWidth - innerWidth);
                        hscroll.$show();
                        vscroll.$setSize(0, vsHeight);
                        vscroll.setTotal(browser ? mainHeight + basicHeight : mainHeight - innerHeight);
                        vscroll.$show();
                        corner.$setSize(vsWidth, hsHeight);
                        corner.$show();
                        break;
                    }
                    corner.$hide();
                }
                if (hscroll) {
                    if (mainWidth > bodyWidth) {
                        // 宽度超出控件的宽度，高度没有超出显示水平滚动条后余下的高度，只显示水平滚动条
                        hscroll.$setSize(bodyWidth + paddingWidth);
                        hscroll.setTotal(browser ? mainWidth + basicWidth : mainWidth - bodyWidth);
                        hscroll.$show();
                        if (vscroll) {
                            vscroll.$hide();
                        }
                        innerWidth = bodyWidth;
                    }
                    else {
                        //add by liyinan 2014.6.10
                        //当内容宽度不大于容器宽度时需要隐藏水平滚动条
                        //但是隐藏了之后高度还是预留了滚动条的位置
                        //这里把容器高度重新设置为没有滚动条的高度
                        innerHeight = bodyHeight;
                        //add by liyinan end 2014.6.10

                        hscroll.$hide();
                    }
                }
                if (vscroll) {
                    if (mainHeight > bodyHeight) {
                        // 高度超出控件的高度，宽度没有超出显示水平滚动条后余下的宽度，只显示水平滚动条
                        vscroll.$setSize(0, bodyHeight + paddingHeight);
                        vscroll.setTotal(browser ? mainHeight + basicHeight : mainHeight - bodyHeight);
                        vscroll.$show();
                        if (hscroll) {
                            hscroll.$hide();
                        }
                        innerHeight = bodyHeight;
                    }
                    else {
                        //add by liyinan 2014.6.10
                        //当内容高度不大于容器高度时需要隐藏垂直滚动条
                        //但是隐藏了之后还是预留了滚动条的位置
                        //这里把内容宽度重新设置为没有滚动条的宽度
                        innerWidth = bodyWidth;
                        //add by liyinan end 2014.6.10

                        vscroll.$hide();
                    }
                }
                break;
            }
        }

        innerWidth -= this.$$bodyWidthRevise;
        innerHeight -= this.$$bodyHeightRevise;

        if (vscroll) {
            vscroll.$setPageStep(innerHeight);
        }
        if (hscroll) {
            hscroll.$setPageStep(innerWidth);
        }

        // 设置内部定位器的大小，以下使用 corner 表示 style
        if (browser) {
            corner = browser.style;
            corner.width = bodyWidth + paddingWidth + 'px';
            corner.height = bodyHeight + paddingHeight + 'px';
        }

        corner = getParent(this.getBody()).style;
        corner.width = innerWidth + 'px';
        corner.height = innerHeight + 'px';
    };

    /**
     * 获取水平滚动条的当前值。
     * getScrollLeft 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 水平滚动条的当前值，如果没有水平滚动条返回 -1
     */
    UI_PANEL_CLASS.getScrollLeft = function () {
        var o = this._uHScrollbar;
        return o ? o.getValue() : -1;
    };

    /**
     * 获取垂直滚动条的当前值。
     * getScrollTop 方法提供了对水平滚动条当前值的快捷访问方式，参见 getValue。
     * @public
     *
     * @return {number} 垂直滚动条的当前值，如果没有垂直滚动条返回 -1
     */
    UI_PANEL_CLASS.getScrollTop = function () {
        var o = this._uVScrollbar;
        return o ? o.getValue() : -1;
    };

    /**
     * @override
     */
    UI_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        if (this._uVScrollbar) {
            this._uVScrollbar.init();
        }
        if (this._uHScrollbar) {
            this._uHScrollbar.init();
        }
        if (this._uCorner) {
            this._uCorner.init();
        }
    };

    /**
     * 控件显示区域复位。
     * reset 方法设置水平滚动条或者垂直滚动条的当前值为 0。
     * @public
     */
    UI_PANEL_CLASS.reset = function () {
        if (this._uVScrollbar) {
            this._uVScrollbar.setValue(0);
            this._uVScrollbar.setTotal(0);
        }
        if (this._uHScrollbar) {
            this._uHScrollbar.setValue(0);
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Item/Items - 定义选项操作相关的基本操作。
 选项控件，继承自基础控件，用于弹出菜单、下拉框、交换框等控件的单个选项，通常不直接初始化。选项控件必须用在使用选项组接口(Items)的控件中。
 选项组不是控件，是一组对选项进行操作的方法的集合，提供了基本的增/删操作，通过将 ecui.ui.Items 对象下的方法复制到类的 prototype 属性下继承接口，最终对象要正常使用还需要在类构造器中调用 $initItems 方法。
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,

        indexOf = array.indexOf,
        remove = array.remove,
        children = dom.children,
        createDom = dom.create,
        insertBefore = dom.insertBefore,
        trim = string.trim,
        blank = util.blank,
        callSuper = util.callSuper,

        $fastCreate = core.$fastCreate,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_ITEM
    ///__gzip_original__UI_ITEMS
    /**
     * 初始化选项控件。
     * @public
     *
     * @param {string|Object} options 对象
     */
    var UI_ITEM = ui.Item =
            inheritsControl(
                UI_CONTROL,
                'ui-item',
                function (el, options) {
                    el.style.overflow = 'hidden';
                }
            ),
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items = {};
//{else}//
    /**
     * 选项控件的点击事件将触发选项组的 onitemclick 事件。
     * @override
     */
    UI_ITEM_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);

        var parent = this.getParent();
        if (parent) {
            triggerEvent(parent, 'itemclick', event, [indexOf(UI_ITEMS[parent.getUID()], this)]);
        }
    };

    /**
     * 选项组只允许添加选项控件，添加成功后会自动调用 $alterItems 方法。
     * @override
     */
    UI_ITEMS.$append = function (child) {
        // 检查待新增的控件是否为选项控件
        if (!(child instanceof (this.Item || UI_ITEM)) || callSuper(this, '$append') === false) {
            return false;
        }
        UI_ITEMS[this.getUID()].push(child);
        this.$alterItems();
    };

    /**
     * @override
     */
    UI_ITEMS.$cache = function (style, cacheSize) {
        callSuper(this, '$cache');

        for (var i = 0, list = UI_ITEMS[this.getUID()], o; o = list[i++];) {
            o.cache(true, true);
        }
    };

    /**
     * @override
     */
    UI_ITEMS.$dispose = function () {
        delete UI_ITEMS[this.getUID()];
        callSuper(this, '$dispose');
    };

    /**
     * 初始化选项组对应的内部元素对象。
     * 选项组假设选项的主元素在内部元素中，因此实现了 Items 接口的类在初始化时需要调用 $initItems 方法自动生成选项控件，$initItems 方法内部保证一个控件对象只允许被调用一次，多次的调用无效。
     * @protected
     */
    UI_ITEMS.$initItems = function () {
        // 防止因为选项变化引起重复刷新，以及防止控件进行多次初始化操作
        this.$alterItems = this.$initItems = blank;

        UI_ITEMS[this.getUID()] = [];

        // 初始化选项控件
        for (var i = 0, list = children(this.getBody()), o; o = list[i++];) {
            this.add(o);
        }

        delete this.$alterItems;
    };

    /**
     * 选项组移除子选项后会自动调用 $alterItems 方法。
     * @override
     */
    UI_ITEMS.$remove = function (child) {
        callSuper(this, '$remove');
        remove(UI_ITEMS[this.getUID()], child);
        this.$alterItems();
    };

    /**
     * 添加子选项控件。
     * add 方法中如果位置序号不合法，子选项控件将添加在末尾的位置。
     * @public
     *
     * @param {string|HTMLElement|ecui.ui.Item} item 控件的 html 内容/控件对应的主元素对象/选项控件
     * @param {number} index 子选项控件需要添加的位置序号
     * @param {Object} options 子控件初始化选项
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.add = function (item, index, options) {
        var list = UI_ITEMS[this.getUID()],
            o;

        if (item instanceof UI_ITEM) {
            // 选项控件，直接添加
            item.setParent(this);
            list.push(item);
        }
        else {
            // 根据是字符串还是Element对象选择不同的初始化方式
            if ('string' == typeof item) {
                this.getBody().appendChild(o = createDom());
                o.innerHTML = item;
                item = o;
            }

            o = this.Item || UI_ITEM;
            item.className = trim(item.className) + ' ' + this.getType() + '-item' + o.TYPES;

            options = options || getOptions(item);
            options.parent = this;
            options.select = false;
            list.push(item = $fastCreate(o, item, this, options));
            this.$alterItems();
        }

        // 改变选项控件的位置
        if (item.getParent() && (o = list[index]) && o != item) {
            insertBefore(item.getOuter(), o.getOuter());
            list.splice(index, 0, list.pop());
        }

        return item;
    };

    /**
     * 向选项组最后添加子选项控件。
     * append 方法是 add 方法去掉第二个 index 参数的版本。
     * @public
     *
     * @param {string|Element|ecui.ui.Item} item 控件的 html 内容/控件对应的主元素对象/选项控件
     * @param {Object} 子控件初始化选项
     * @return {ecui.ui.Item} 子选项控件
     */
    UI_ITEMS.append = function (item, options) {
        this.add(item, undefined, options);
    };

    /**
     * 获取全部的子选项控件。
     * @public
     *
     * @return {Array} 子选项控件数组
     */
    UI_ITEMS.getItems = function () {
        return UI_ITEMS[this.getUID()].slice();
    };

    /**
     * @override
     */
    UI_ITEMS.init = function () {
        callSuper(this, 'init');
        this.$alterItems();
    };

    /**
     * 移除子选项控件。
     * @public
     *
     * @param {number|ecui.ui.Item} item 选项控件的位置序号/选项控件
     * @return {ecui.ui.Item} 被移除的子选项控件
     */
    UI_ITEMS.remove = function (item) {
        if ('number' == typeof item) {
            item = UI_ITEMS[this.getUID()][item];
        }
        if (item) {
            item.setParent();
        }
        return item || null;
    };

    /**
     * 设置控件内所有子选项控件的大小。
     * @public
     *
     * @param {number} itemWidth 子选项控件的宽度
     * @param {number} itemHeight 子选项控件的高度
     */
    UI_ITEMS.setItemSize = function (itemWidth, itemHeight) {
        for (var i = 0, list = UI_ITEMS[this.getUID()], o; o = list[i++];) {
            o.$setSize(itemWidth, itemHeight);
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 InputControl - 定义输入数据的基本操作。
 输入控件，继承自基础控件，实现了对原生 InputElement 的功能扩展，包括光标的控制、输入事件的实时响应(每次改变均触发事件)，以及 IE 下不能动态改变输入框的表单项名称的模拟处理。
 ** 在IE6下原生Input会有上下3px的间距，只能通过设置父元素的overflow:hidden解决，本控件未对这种情况进行特殊设置，请注意 **

 输入控件直接HTML初始化的例子:
 <input ecui="type:input-control" type="password" name="passwd" value="1111">
 或:
 <div ecui="type:input-control;name:passwd;value:1111;inputType:password"></div>
 或:
 <div ecui="type:input-control">
 <input type="password" name="passwd" value="1111">
 </div>

 属性
 _bHidden - 输入框是否隐藏
 _eInput  - INPUT对象
 _aValidateRules - 验证规则
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        REGEXP = RegExp,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        createDom = dom.create,
        insertBefore = dom.insertBefore,
        insertAfter = dom.insertAfter,
        setInput = dom.setInput,
        setStyle = dom.setStyle,
        encodeHTML = string.encodeHTML,
        attachEvent = util.attachEvent,
        blank = util.blank,
        detachEvent = util.detachEvent,

        $bind = core.$bind,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        wrapEvent = core.wrapEvent,
        createControl = core.create,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_INPUT_CONTROL
    ///__gzip_original__UI_INPUT_CONTROL_CLASS
    /**
     * 初始化输入控件。
     * options 对象支持的属性如下：
     * name         输入框的名称
     * value        输入框的默认值
     * checked      输入框是否默认选中(radio/checkbox有效)
     * inputType    输入框的类型，默认为 text
     * hidden       输入框是否隐藏，隐藏状态下将不会绑定键盘事件
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_INPUT_CONTROL = ui.InputControl =
            inheritsControl(
                UI_CONTROL,
                null,
                function (el, options) {
                    var input;
                    if (el.tagName == 'INPUT' || el.tagName == 'TEXTAREA') {
                        // 根据表单项初始化
                        input = el;

                        insertBefore(el = createDom(input.className, input.style.cssText, 'span'), input).appendChild(input);
                        input.className = '';
                    }
                    else {
                        input = el.getElementsByTagName('INPUT')[0] || el.getElementsByTagName('TEXTAREA')[0];

                        if (!input) {
                            input = setInput(null, options.name, options.inputType);
                            input.defaultValue = input.value =
                                options.value === undefined ? '' : options.value.toString();
                            el.appendChild(input);
                        }
                    }

                    setStyle(el, 'display', 'inline-block');

                    input.style.border = '0px';
                    if (options.hidden) {
                        input.style.display = 'none';
                    }
                    if (options.checked) {
                        input.defaultChecked = input.checked = true;
                    }

                    return el;
                },
                function (el, options) {
                    this._bHidden = options.hidden;
                    this._eInput = el.getElementsByTagName('INPUT')[0] || el.getElementsByTagName('TEXTAREA')[0];

                    if (util.validator) {
                        this._aValidateRules = util.validator.collectRules(options);
                    }

                    UI_INPUT_CONTROL_BIND_EVENT(this);
                }
            ),
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_INPUT_CONTROL_INPUT = {};
//{else}//

    /**
     * 表单提交事件处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    function UI_INPUT_CONTROL_FORM_SUBMIT(event) {
        event = wrapEvent(event);

        //__transform__elements_list
        //__transform__el_o
        for (var i = 0, elements = event.target.elements, el; el = elements[i++];) {
            if (el.getControl) {
                triggerEvent(el.getControl(), 'submit', event);
            }
        }
    }

    /**
     * 为控件的 INPUT 节点绑定事件。
     * @private
     *
     * @param {ecui.ui.Edit} control 输入控件对象
     */
    function UI_INPUT_CONTROL_BIND_EVENT(control) {
        $bind(control._eInput, control);
        if (!control._bHidden) {
            // 对于IE或者textarea的变化，需要重新绑定相关的控件事件
            for (var name in UI_INPUT_CONTROL_INPUT) {
                attachEvent(control._eInput, name, UI_INPUT_CONTROL_INPUT[name]);
            }
        }
    }

    /**
     * 生成错误消息子控件
     * @private
     */
    function createErrorTip(control) {
        var ele = createDom('span');

        ele.className = 'ui-tip-error';
        insertAfter(ele, control.getOuter());

        control._oErrorTip = createControl('Tip', {main: ele});

        return control._oErrorTip;
    }

    /**
     * 输入框失去/获得焦点事件处理函数。
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_INPUT.blur = UI_INPUT_CONTROL_INPUT.focus = function (event) {
        //__gzip_original__type
        var type = event.type;
        if (wrapEvent(event).target.getControl) {
            event = wrapEvent(event).target.getControl();

            // 设置默认失去焦点事件，阻止在blur/focus事件中再次回调
            event['$' + type] = UI_CONTROL_CLASS['$' + type];
            event[type]();

            delete event['$' + type];
        }
    };

    /**
     * 拖拽内容到输入框时处理函数。
     * 为了增加可控性，阻止该行为。[todo] firefox下无法阻止，后续升级
     * @private
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_INPUT.dragover = UI_INPUT_CONTROL_INPUT.drop = function (event) {
        wrapEvent(event).exit();
    };

    /**
     * 输入框输入内容事件处理函数。
     * @private
     *
     * @param {Event} event 事件对象
     */
    if (ieVersion) {
        UI_INPUT_CONTROL_INPUT.propertychange = function (event) {
            if (event.propertyName == 'value') {
                triggerEvent(wrapEvent(event).target.getControl(), 'change');
            }
        };
    }
    else {
        UI_INPUT_CONTROL_INPUT.input = function (event) {
            triggerEvent(this.getControl(), 'change');
        };
    }

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$dispose = function () {
        this._eInput.getControl = undefined;
        this._eInput = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 输入重置事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_CLASS.$reset = function () {
        this.$ready();
    };

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$setParent = function (parent) {
        UI_CONTROL_CLASS.$setParent.call(this, parent);
        if (parent = this._eInput.form) {
            if (parent.getControl) {
                parent.getControl().addItem(this.getName(), this);
            }
        }
    };

    /**
     * @override
     */
    UI_INPUT_CONTROL_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this._eInput.style.width = this.getBodyWidth() + 'px';
        this._eInput.style.height = this.getBodyHeight() + 'px';
    };

    /**
     * 输入提交事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_INPUT_CONTROL_CLASS.$submit = blank;

    /**
     * 输入控件获得失效需要设置输入框不提交。
     * @override
     */
    UI_INPUT_CONTROL_CLASS.disable = function () {
        if (UI_CONTROL_CLASS.disable.call(this)) {
            var body = this.getBody();

            if (this._bHidden) {
                this._eInput.disabled = true;
            }
            else {
                dom.contain(body, this._eInput) ? body.removeChild(this._eInput) : null;
                if (this._eInput.type != 'password' && this._eInput.type != 'textarea') {
                    // 如果输入框是密码框需要直接隐藏，不允许将密码显示在浏览器中
                    body.innerHTML = encodeHTML(this._eInput.value);
                }
            }

            return true;
        }
        return false;
    };

    /**
     * 输入控件解除失效需要设置输入框可提交。
     * @override
     */
    UI_INPUT_CONTROL_CLASS.enable = function () {
        if (UI_CONTROL_CLASS.enable.call(this)) {
            var body = this.getBody();

            if (this._bHidden) {
                this._eInput.disabled = false;
            }
            else {
                body.innerHTML = '';
                body.appendChild(this._eInput);
            }

            return true;
        }
        return false;
    };

    /**
     * 获取控件的输入元素。
     * @public
     *
     * @return {HTMLElement} InputElement 对象
     */
    UI_INPUT_CONTROL_CLASS.getInput = function () {
        return this._eInput;
    };

    /**
     * 获取控件的名称。
     * 输入控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称可以使用 setName 方法改变。
     * @public
     *
     * @return {string} INPUT 对象名称
     */
    UI_INPUT_CONTROL_CLASS.getName = function () {
        return this._eInput.name;
    };

    /**
     * 获取当前当前选区的结束位置。
     * @public
     *
     * @return {number} 输入框当前选区的结束位置
     */
    UI_INPUT_CONTROL_CLASS.getSelectionEnd = ieVersion ? function () {
        var range = DOCUMENT.selection.createRange().duplicate();

        range.moveStart('character', -this._eInput.value.length);
        return range.text.length;
    } : function () {
        return this._eInput.selectionEnd;
    };

    /**
     * 获取当前选区的起始位置。
     * @public
     *
     * @return {number} 输入框当前选区的起始位置，即输入框当前光标的位置
     */
    UI_INPUT_CONTROL_CLASS.getSelectionStart = ieVersion ? function () {
        //__gzip_original__length
        var range = DOCUMENT.selection.createRange().duplicate(),
            length = this._eInput.value.length;

        range.moveEnd('character', length);
        return length - range.text.length;
    } : function () {
        return this._eInput.selectionStart;
    };

    /**
     * 获取控件的值。
     * getValue 方法返回提交时表单项的值，使用 setValue 方法设置。
     * @public
     *
     * @return {string} 控件的值
     */
    UI_INPUT_CONTROL_CLASS.getValue = function () {
        return this._eInput.value;
    };

    /**
     * 设置输入框光标的位置。
     * @public
     *
     * @param {number} pos 位置索引
     */
    UI_INPUT_CONTROL_CLASS.setCaret = ieVersion ? function (pos) {
        var range = this._eInput.createTextRange();
        range.collapse();
        range.select();
        range.moveStart('character', pos);
        range.collapse();
        range.select();
    } : function (pos) {
        this._eInput.setSelectionRange(pos, pos);
    };

    /**
     * 设置控件的名称。
     * 输入控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 表单项名称
     */
    UI_INPUT_CONTROL_CLASS.setName = function (name) {
        var el = setInput(this._eInput, name || '');
        if (this._eInput != el) {
            UI_INPUT_CONTROL_BIND_EVENT(this);
            this._eInput = el;
        }
    };

    /**
     * 设置控件的值。
     * setValue 方法设置提交时表单项的值，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 控件的值
     */
    UI_INPUT_CONTROL_CLASS.setValue = function (value) {
        //__gzip_original__input
        var input = this._eInput,
            func = UI_INPUT_CONTROL_INPUT.propertychange;

        // 停止事件，避免重入引发死循环
        if (func) {
            detachEvent(input, 'propertychange', func);
        }
        input.value = value;
        if (func) {
            attachEvent(input, 'propertychange', func);
        }
    };

    /**
     * 验证控件
     *
     * @return {Boolean} 验证结果
     */
    UI_INPUT_CONTROL_CLASS.validate = function () {
        return true;
    };

    /**
     * 设置错误信息
     *
     * @public
     * @param {string} msg 错误信息
     */
    UI_INPUT_CONTROL_CLASS.setError = function (msg) {
        var tip = this._oErrorTip;
        if (!tip) {
            tip = createErrorTip(this);
        }

        if (msg) {
            tip.setMessage(msg);
            tip.show();
        }
        else {
            tip.hide();
        }
    };

    /**
     * 根据当前的值设置默认值
     */
    UI_INPUT_CONTROL_CLASS.setDefaultValue = function () {
        var value = this.getValue();
        this._eInput.defaultValue = value;
    };

    (function () {
        function build(name) {
            UI_INPUT_CONTROL_CLASS['$' + name] = function () {
                UI_CONTROL_CLASS['$' + name].call(this);

                //__gzip_original__input
                var input = this._eInput;

                detachEvent(input, name, UI_INPUT_CONTROL_INPUT[name]);
                try {
                    input[name]();
                }
                catch (e) {
                }
                attachEvent(input, name, UI_INPUT_CONTROL_INPUT[name]);
            };
        }

        build('blur');
        build('focus');
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 MessageBox - 消息框功能。
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,

        createDom = dom.create,

        createControl = core.create,
        disposeControl = core.dispose;
//{/if}//
//{if $phase == "define"}//
    var ECUI_MESSAGEBOX,
        ECUI_MESSAGEBOX_BUTTONS = [];
//{else}//
    /**
     * 消息框点击事件处理。
     * @private
     *
     * @param {Event} event 事件对象
     */
    function ECUI_MESSAGEBOX_ONCLICK(event) {
        ECUI_MESSAGEBOX.hide();
        if (this._fAction) {
            this._fAction.call(null, event);
        }
    }

    /**
     * 消息框显示提示信息，仅包含确认按钮。
     * @protected
     *
     * @param {string} text 提示信息文本
     * @param {Array} buttonTexts 按钮的文本数组
     * @param {Array} 按钮配置
     *          {String} text 文本
     *          {String} className 按钮样式
     *          {Function} action 点击事件处理函数
     * @param {Number} opacity 不透明度
     * @param {Number} time 自动关闭
     */
    core.$messagebox = function (text, title, buttons, opacity) {
        if (!ECUI_MESSAGEBOX) {
            ECUI_MESSAGEBOX = createControl(
                'Form',
                {
                    main: createDom('ui-form ui-messagebox'),
                    hide: true,
                    parent: document.body,
                    autoCenter: true,
                    closeButton: true
                }
            );

            body = ECUI_MESSAGEBOX.getBody();
            body.innerHTML =
                '<div class="ui-messagebox-text"></div>' +
                '<div class="ui-messagebox-bottom"></div>';
        }

        var i = 0,
            length = buttons.length,
            body = ECUI_MESSAGEBOX.getBody(),
            bottom = body.lastChild,
            o;

        if (!ECUI_MESSAGEBOX.isShow()) {
            while (length > ECUI_MESSAGEBOX_BUTTONS.length) {
                ECUI_MESSAGEBOX_BUTTONS.push(
                    createControl('Button', {element: createDom('ui-button', '', 'span'), parent: bottom})
                );
            }

            disposeControl(body = body.firstChild);
            body.innerHTML = text;

            for (; o = ECUI_MESSAGEBOX_BUTTONS[i]; i++) {
                if (i < length) {
                    o.setContent(buttons[i].text);
                    o.$show();
                    o._fAction = buttons[i].action;
                    o.onclick = ECUI_MESSAGEBOX_ONCLICK;
                    if (buttons[i].className) {
                        o.setClass(buttons[i].className);
                    }
                    else {
                        o.setClass(o.getPrimary());
                    }
                }
                else {
                    o.$hide();
                }
            }

            ECUI_MESSAGEBOX.setTitle(title || '提示');
            ECUI_MESSAGEBOX.showModal(opacity);
        }
    };

    /**
     * 消息框显示提示信息，仅包含确认按钮。
     * @public
     *
     * @param {string} text 提示信息文本
     * @param {Function} onok 确认按钮点击事件处理函数
     */
    core.alert = function (text, onok) {
        var str = '<div class="ui-messagebox-alert-icon"></div><div class="ui-messagebox-alert-content "><p class="ui-messagebox-alert-text">' + text + '</p></div>';
        core.$messagebox(str, '提示', [
            {text: '确定', className: 'ui-button-g', action: onok}
        ]);
    };

    /**
     * 消息框显示提示信息，包含确认/取消按钮。
     * @public
     *
     * @param {string} text 提示信息文本
     * @param {Function} onok 确认按钮点击事件处理函数
     * @param {Function} oncancel 取消按钮点击事件处理函数
     */
    core.confirm = function (text, onok, oncancel) {
        core.$messagebox(text, '确认', [
            {text: '确定', className: 'ui-button-g', action: onok},
            {text: '取消', action: oncancel}
        ]);
    };

    core.warning = function (title, text, onok, oncancel) {
        var str = '<div class="ui-messagebox-warning-icon"></div><div class="ui-messagebox-warning-content "><h3 class="ui-messagebox-error-title">' + title + '</h3><p class="ui-messagebox-warning-text">' + text + '</p></div>';
        core.$messagebox(str, '警告', [
            {text: '确定', className: 'ui-button-g', action: onok},
            {text: '取消', action: oncancel}
        ]);
    };

    core.success = function (text, onok) {
        var str = '<div class="ui-messagebox-success-icon"></div><div class="ui-messagebox-success-content "><p class="ui-messagebox-success-text">' + text + '</p></div>';
        core.$messagebox(str, '提示', [
            {text: '确定', className: 'ui-button-g', action: onok}
        ]);
    };

    core.error = function (title, text, onok) {
        var str = '<div class="ui-messagebox-error-icon"></div><div class="ui-messagebox-error-content "><h3 class="ui-messagebox-error-title">' + title + '</h3><p class="ui-messagebox-error-text">' + text + '</p></div>';
        core.$messagebox(str, '错误', [
            {text: '确定', className: 'ui-button-g', action: onok}
        ]);
    }

//{/if}//
//{if 0}//
})();
//{/if}//

/**
 * score
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * path:    score.js
 * desc:    评分控件
 * author:  cxl(chenxinle@baidu.com)
 * date:    2012/03/22
 *
 * params:
 *      {Number} max 最大的分值，默认5
 *      {Number} value 初始化分值, 默认0
 {Boolean} static 是否是静态的
 */
(function () {

    var core = ecui,
        ui = core.ui,
        util = core.util,

        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        blank = util.blank,
        extend = util.extend,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_ITEMS = ui.Items,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;

    var UI_SCORE = ui.Score =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-score',
                function (el, options) {
                    var max = options.max = options.max || 5,
                        html = [], i;

                    options.hidden = true;
                    options.value = options.value || 0;
                    for (i = 1; i <= max; i++) {
                        html.push('<span ecui="score:' + i + '"></span>');
                    }
                    el.innerHTML = html.join('');
                },
                function (el, options) {
                    this._bStatic = (options['static'] === true);
                    this.$initItems();
                }
            ),
        UI_SCORE_CLASS = UI_SCORE.prototype,

        UI_SCORE_ITEM = UI_SCORE_CLASS.Item = inheritsControl(
            UI_CONTROL,
            'ui-score-item',
            function (el, options) {
                options.resizable = false;
            },
            function (el, options) {
                this._nScore = options.score;
            }
        ),
        UI_SCORE_ITEM_CLASS = UI_SCORE_ITEM.prototype;

    extend(UI_SCORE_CLASS, UI_ITEMS);

    /**
     * @override
     */
    UI_SCORE_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this.$score(this.getValue());
    }

    /**
     * 标记评分
     * @private
     *
     * @param <Number> score 需要标记的分值
     */
    UI_SCORE_CLASS.$score = function (score) {
        var items = this.getItems(),
            i, item;

        score = score || this.getValue();
        for (i = 0; item = items[i]; i++) {
            item.alterClass(i < score ? '+marked' : '-marked');
        }
    };

    /**
     * @override
     */
    UI_SCORE_CLASS.setValue = function (value) {
        UI_INPUT_CONTROL_CLASS.setValue.call(this, value);
        this.$score(value);
    };

    /**
     * @override
     */
    UI_SCORE_CLASS.$alterItems = blank;

    /**
     * 得到图标对应的分值
     * @public
     *
     * @return {Number} 分值
     */
    UI_SCORE_ITEM_CLASS.getScore = function () {
        return this._nScore;
    };

    /*
     * @override
     */
    UI_SCORE_ITEM_CLASS.$click = function (event) {
        if (!this.getParent()._bStatic) {
            this.getParent().setValue(this.getScore());
            UI_INPUT_CONTROL_CLASS.$click.call(this);
        }
    };

    /**
     * @override
     */
    UI_SCORE_ITEM_CLASS.$mouseout = function () {
        if (!this.getParent()._bStatic) {
            this.getParent().$score();
            UI_CONTROL_CLASS.$mouseout.call(this);
        }
    };

    /**
     * @override
     */
    UI_SCORE_ITEM_CLASS.$mouseover = function () {
        if (!this.getParent()._bStatic) {
            this.getParent().$score(this.getScore());
            UI_CONTROL_CLASS.$mouseover.call(this);
        }
    };

    /**
     * @override
     */
    UI_SCORE_ITEM_CLASS.$setSize = blank;
})();

(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,
        string = core.string,

        $fastCreate = core.$fastCreate,
        setFocused = core.setFocused,
        createDom = dom.create,
        children = dom.children,
        last = dom.last,
        moveElements = dom.moveElements,
        getPosition = dom.getPosition,
        setText = dom.setText,
        inheritsControl = core.inherits,
        isContentBox = core.isContentBox,
        getStatus = core.getStatus,
        getView = util.getView,
        triggerEvent = core.triggerEvent,
        trim = string.trim,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,

        UI_TIP_TIME_OPEN = 500,
        UI_TIP_TIME_CLOSE = 200,
        REPAINT = core.REPAINT,

        uiPsTipLayer = null;

    var UI_TIP = ui.Tip =
            inheritsControl(
                UI_CONTROL,
                'ui-tip',
                function (el, options) {
                    options.message = trim(el.innerHTML) || options.message;
                    el.innerHTML = '';
                },
                function (el, options) {
                    this._sTarget = options.target;
                    this._sMessage = options.message;
                    this._oTimer = null;
                    this._bAsyn = options.asyn === true;
                    this._bLoad = false;
                }
            ),

        UI_TIP_CLASS = UI_TIP.prototype,
        UI_TIP_LAYER = UI_TIP_CLASS.Layer =
            inheritsControl(
                UI_CONTROL,
                'ui-tip-layer',
                function (el, options) {
                    el.appendChild(createDom(this.getTypes() + '-corner'));
                    el.appendChild(createDom());
                },
                function (el, options) {
                    el = children(el);
                    this._eCorner = el[0];
                    this.$setBody(el[1]);
                }
            ),

        UI_TIP_LAYER_CLASS = UI_TIP_LAYER.prototype;


    function UI_TIP_LAYER_GET() {
        var o;
        if (!uiPsTipLayer) {
            o = document.body.appendChild(createDom(UI_TIP_LAYER.TYPES));
            uiPsTipLayer = $fastCreate(UI_TIP_LAYER, o);
            uiPsTipLayer.cache();
            uiPsTipLayer.init();
        }
        return uiPsTipLayer;
    }


    UI_TIP_CLASS.$mouseover = function () {
        var con = this;
        UI_CONTROL_CLASS.$mouseover.call(this);
        clearTimeout(this._oTimer);
        if (!this._bShow) {
            if (this._bAsyn) {
                var layer = UI_TIP_LAYER_GET();
                this.close();
                con._oTimer = setTimeout(function () {
                    con._bLoad = false;
                    triggerEvent(con, 'loadData', function () {
                        con.open();
                    });
                }, UI_TIP_TIME_OPEN);
            }
            else {
                this._oTimer = setTimeout(function () {
                    con.open();
                }, UI_TIP_TIME_OPEN);
            }
        }
    }

    UI_TIP_CLASS.$mouseout = function () {
        var con = this;
        UI_CONTROL_CLASS.$mouseout.call(this);
        clearTimeout(this._oTimer);
        if (this._bShow) {
            this._oTimer = setTimeout(function () {
                con.close()
            }, UI_TIP_TIME_CLOSE);
        }
    }

    UI_TIP_CLASS.$getTarget = function (id) {
        return document.getElementById(id);
    }

    UI_TIP_CLASS.setTarget = function (id) {
        this._sTarget = id;
    }

    UI_TIP_CLASS.open = function () {
        var layer = UI_TIP_LAYER_GET();

        if (this._sTarget) {
            var o = this.$getTarget(this._sTarget);
            if (o) {
                if ('[object String]' == Object.prototype.toString.call(o)) {
                    layer.getBody().innerHTML = o;
                }
                else {
                    layer.getBody().innerHTML = o.innerHTML;
                }
            }
        }
        else if (this._sMessage) {
            layer.setContent(this._sMessage);
        }

        layer.show(this);
        this._bShow = true;
    }

    UI_TIP_CLASS.close = function () {
        UI_TIP_LAYER_GET().hide();
        this._bShow = false;
    }

    UI_TIP_CLASS.setMessage = function (msg) {
        this._sMessage = msg;
    };

    UI_TIP_LAYER_CLASS.show = function (con) {
        var pos = getPosition(con.getOuter()),
            type = this.getTypes()[0],
            view = getView(),
            cornerHeight = 13,
            w = con.getWidth(), h = con.getHeight(),
            wFix = 9, hFix = 13,
            className = [];

        if (con) {
            this._uHost = con;
        }

        UI_CONTROL_CLASS.show.call(this);
        this.resize();
        if (pos.left + this.getWidth() > view.right) {
            pos.left = pos.left + w - this.getWidth() + wFix;
            className.push('-right')
        }
        else {
            pos.left = pos.left - wFix;
            className.push('-left');
        }

        if (pos.top - cornerHeight - this.getHeight() < view.top
            && pos.top + h + cornerHeight + this.getHeight() < view.bottom) {
            pos.top += h + cornerHeight;
            className.push('-bottom');
        }
        else {
            pos.top -= cornerHeight + this.getHeight();
            className.push('-top');
        }

        this._eCorner.className = type + '-corner ' + type + '-corner' + className.join('');
        this.setPosition(pos.left, pos.top);
    }

    UI_TIP_LAYER_CLASS.$mouseover = function () {
        UI_CONTROL_CLASS.$mouseover.call(this);
        this._uHost.$mouseover();
    };

    UI_TIP_LAYER_CLASS.$mouseout = function () {
        UI_CONTROL_CLASS.$mouseout.call(this);
        this._uHost.$mouseout();
    };

    UI_TIP_LAYER_CLASS.$resize = function () {
        var el = this._eMain,
            currStyle = el.style;

        currStyle.width = this._sWidth;
        currStyle.height = this._sHeight;
        this.repaint();
    };
})();

/*
 Checkbox - 定义单个设置项选择状态的基本操作。
 复选框控件，继承自输入控件，实现了对原生 InputElement 复选框的功能扩展，支持复选框之间的主从关系定义。当一个复选框的“从复选框”选中一部分时，“主复选框”将处于半选状态，这种状态逻辑意义上等同于未选择状态，但显示效果不同，复选框的主从关系可以有多级。复选框控件适用所有在一组中允许选择多个目标的交互，并不局限于此分组的表现形式(文本、图片等)。

 复选框控件直接HTML初始化的例子:
 <input ecui="type:checkbox;subject:china" name="city" value="beijing" checked="checked" type="checkbox">
 或
 <div ecui="type:checkbox;name:city;value:beijing;checked:true;subject:china"></div>
 或
 <div ecui="type:checkbox;subject:china">
 <input name="city" value="beijing" checked="checked" type="checkbox">
 </div>

 属性
 _bDefault        - 默认的选中状态
 _nStatus         - 复选框当前的状态，0--全选，1--未选，2--半选
 _cSubject        - 主复选框
 _aDependents     - 所有的从属复选框
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        ui = core.ui,
        util = core.util,

        undefined,

        remove = array.remove,
        setDefault = util.setDefault,

        $connect = core.$connect,
        getKey = core.getKey,
        inheritsControl = core.inherits,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_CHECKBOX
    ///__gzip_original__UI_CHECKBOX_CLASS
    /**
     * 初始化复选框控件。
     * options 对象支持的属性如下：
     * subject 主复选框 ID，会自动与主复选框建立关联后，作为主复选框的从属复选框之一
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CHECKBOX = ui.Checkbox =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-checkbox',
                function (el, options) {
                    setDefault(options, 'hidden', true);
                    setDefault(options, 'inputType', 'checkbox');
                },
                function (el, options) {
                    // 保存节点选中状态，用于修复IE6/7下移动DOM节点时选中状态发生改变的问题
                    this._bDefault = this.getInput().defaultChecked;
                    this._aDependents = [];

                    $connect(this, this.setSubject, options.subject);
                }
            ),
        UI_CHECKBOX_CLASS = UI_CHECKBOX.prototype;
//{else}//
    /**
     * 改变复选框状态。
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框对象
     * @param {number} status 新的状态，0--全选，1--未选，2--半选
     */
    function UI_CHECKBOX_CHANGE(control, status) {
        if (status !== control._nStatus) {
            // 状态发生改变时进行处理
            control.setClass(control.getPrimary() + ['-checked', '', '-part'][status]);

            control._nStatus = status;

            var el = control.getInput();
            el.defaultChecked = el.checked = !status;

            // 如果有主复选框，刷新主复选框的状态
            if (control._cSubject) {
                UI_CHECKBOX_FLUSH(control._cSubject);
            }
        }
    }

    /**
     * 复选框控件刷新，计算所有从复选框，根据它们的选中状态计算自身的选中状态。
     * @private
     *
     * @param {ecui.ui.Checkbox} control 复选框控件
     */
    function UI_CHECKBOX_FLUSH(control) {
        for (var i = 0, status, o; o = control._aDependents[i++];) {
            if (status !== undefined && status != o._nStatus) {
                status = 2;
                break;
            }
            status = o._nStatus;
        }

        if (status !== undefined) {
            UI_CHECKBOX_CHANGE(control, status);
        }
    }

    /**
     * 控件点击时改变当前的选中状态。
     * @override
     */
    UI_CHECKBOX_CLASS.$click = function (event) {
        UI_INPUT_CONTROL_CLASS.$click.call(this, event);
        this.setChecked(!!this._nStatus);
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$dispose = function () {
        var arr = this._aDependents.slice(0),
            i, o;

        this.setSubject();
        for (i = 0; o = arr[i]; i++) {
            o.setSubject();
        }
        UI_INPUT_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 接管对空格键的处理。
     * @override
     */
    UI_CHECKBOX_CLASS.$keydown = UI_CHECKBOX_CLASS.$keypress = UI_CHECKBOX_CLASS.$keyup = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type].call(this, event);
        if (getKey() == 32) {
            // 屏蔽空格键，防止屏幕发生滚动
            if (event.type == 'keyup') {
                this.setChecked(!!this._nStatus);
            }
            event.preventDefault();
        }
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$ready = function () {
        if (!this._aDependents.length) {
            // 如果控件是主复选框，应该直接根据从属复选框的状态来显示自己的状态
            UI_CHECKBOX_CHANGE(this, this.getInput().checked ? 0 : 1);
        }
    };

    /**
     * @override
     */
    UI_CHECKBOX_CLASS.$reset = function (event) {
        // 修复IE6/7下移动DOM节点时选中状态发生改变的问题
        this.getInput().checked = this._bDefault;
        UI_INPUT_CONTROL_CLASS.$reset.call(this, event);
    };

    /**
     * 获取全部的从属复选框。
     * 复选框控件调用 setSubject 方法指定了主复选框后，它就是主复选框的从属复选框之一。
     * @public
     *
     * @return {Array} 复选框控件数组
     */
    UI_CHECKBOX_CLASS.getDependents = function () {
        return this._aDependents.slice();
    };

    /**
     * 获取主复选框。
     * getSubject 方法返回调用 setSubject 方法指定的主复选框控件。
     * @public
     *
     * @return {ecui.ui.Checkbox} 复选框控件
     */
    UI_CHECKBOX_CLASS.getSubject = function () {
        return this._cSubject || null;
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_CHECKBOX_CLASS.isChecked = function () {
        return !this._nStatus;
    };

    /**
     * 设置复选框控件选中状态。
     * @public
     *
     * @param {boolean} checked 是否选中
     */
    UI_CHECKBOX_CLASS.setChecked = function (checked) {
        UI_CHECKBOX_CHANGE(this, checked ? 0 : 1);
        // 如果有从属复选框，全部改为与当前复选框相同的状态
        for (var i = 0, o; o = this._aDependents[i++];) {
            o.setChecked(checked);
        }
    };

    /**
     * override
     */
    UI_CHECKBOX_CLASS.setDefaultValue = function () {
        this._bDefault = this.isChecked();
    };

    /**
     * 设置主复选框。
     * setSubject 方法指定主复选框控件后，可以通过访问主复选框控件的 getDependents 方法获取列表，列表中即包含了当前的控件。请注意，控件从 DOM 树上被移除时，不会自动解除主从关系，联动可能出现异情，此时请调用 setSubject 方法传入空参数解除主从关系。
     * @public
     *
     * @param {ecui.ui.Checkbox} checkbox 主复选框
     */
    UI_CHECKBOX_CLASS.setSubject = function (checkbox) {
        var oldSubject = this._cSubject;
        if (oldSubject != checkbox) {
            this._cSubject = checkbox;

            if (oldSubject) {
                // 已经设置过主复选框，需要先释放引用
                remove(oldSubject._aDependents, this);
                UI_CHECKBOX_FLUSH(oldSubject);
            }

            if (checkbox) {
                checkbox._aDependents.push(this);
                UI_CHECKBOX_FLUSH(checkbox);
            }
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Radio - 定义一组选项中选择唯一选项的基本操作。
 单选框控件，继承自输入框控件，实现了对原生 InputElement 单选框的功能扩展，支持对选中的图案的选择。单选框控件适用所有在一组中只允许选择一个目标的交互，并不局限于此分组的表现形式(文本、图片等)。

 单选框控件直接HTML初始化的例子:
 <input ecui="type:radio" name="city" value="beijing" checked="checked" type="radio">
 或
 <div ecui="type:radio;name:city;value:beijing;checked:true"></div>
 或
 <div ecui="type:radio">
 <input name="city" value="beijing" checked="checked" type="radio">
 </div>

 属性
 _bDefault  - 默认的选中状态
 */
//{if 0}//
(function () {

    var core = ecui,
        ui = core.ui,
        util = core.util,

        undefined,

        setDefault = util.setDefault,

        getKey = core.getKey,
        inheritsControl = core.inherits,
        query = core.query,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_RADIO
    ///__gzip_original__UI_RADIO_CLASS
    /**
     * 初始化单选框控件。
     * options 对象支持的属性如下：
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_RADIO = ui.Radio =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-radio',
                function (el, options) {
                    setDefault(options, 'hidden', true);
                    setDefault(options, 'inputType', 'radio');
                },
                function (el, options) {
                    // 保存节点选中状态，用于修复IE6/7下移动DOM节点时选中状态发生改变的问题
                    this._bDefault = this.getInput().defaultChecked;
                }
            ),
        UI_RADIO_CLASS = UI_RADIO.prototype;
//{else}//
    /**
     * 单选框控件刷新。
     * @private
     *
     * @param {ecui.ui.Radio} control 单选框控件
     * @param {boolean|undefined} checked 新的状态，如果忽略表示不改变当前状态
     */
    function UI_RADIO_FLUSH(control, checked) {
        if (checked !== undefined) {
            var el = control.getInput();
            el.defaultChecked = el.checked = checked;
        }
        control.setClass(control.getPrimary() + (control.isChecked() ? '-checked' : ''));
    }

    /**
     * 控件点击时将控件设置成为选中状态，同时取消同一个单选框控件组的其它控件的选中状态。
     * @override
     */
    UI_RADIO_CLASS.$click = function (event) {
        UI_INPUT_CONTROL_CLASS.$click.call(this, event);
        //modified by V_wangxueliang
        //解决是否允许用户点击按钮，取消选择
        //this.setChecked(true);
    };

    /**
     * 接管对空格键的处理。
     * @override
     */
    UI_RADIO_CLASS.$keydown = UI_RADIO_CLASS.$keypress = UI_RADIO_CLASS.$keyup = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type].call(this, event);
        if (event.which == 32) {
            if (event.type == 'keyup' && getKey() == 32) {
                this.setChecked(true);
            }
            event.preventDefault();
        }
    };

    /**
     * @override
     */
    UI_RADIO_CLASS.$ready = function () {
        UI_RADIO_FLUSH(this);
    };

    /**
     * @override
     */
    UI_RADIO_CLASS.$reset = function (event) {
        // 修复IE6/7下移动DOM节点时选中状态发生改变的问题
        this.getInput().checked = this._bDefault;
        UI_INPUT_CONTROL_CLASS.$reset.call(this, event);
    };

    /**
     * 获取与当前单选框同组的全部单选框。
     * getItems 方法返回包括当前单选框在内的与当前单选框同组的全部单选框，同组的单选框选中状态存在唯一性。
     * @public
     *
     * @return {Array} 单选框控件数组
     */
    UI_RADIO_CLASS.getItems = function () {
        //__gzip_original__form
        var i = 0,
            list = this.getInput(),
            form = list.form,
            o = list.name,
            result = [];

        if (!o) {
            return [this];
        }
        else if (form) {
            // 必须 name 也不为空，否则 form[o] 的值在部分浏览器下将是空
            for (list = form[o]; o = list[i++];) {
                if (o.getControl) {
                    result.push(o.getControl());
                }
            }
            return result;
        }
        else {
            return query({
                type: UI_RADIO, custom: function (control) {
                    return !control.getInput().form && control.getName() == o;
                }
            });
        }
    };

    /**
     * 判断控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_RADIO_CLASS.isChecked = function () {
        return this.getInput().checked;
    };

    /**
     * 设置单选框控件选中状态。
     * 将控件设置成为选中状态，会取消同一个单选框控件组的其它控件的选中状态。
     * @public
     *
     * @param {boolean} checked 是否选中
     */
    UI_RADIO_CLASS.setChecked = function (checked) {
        if (this.isChecked() != checked) {
            if (checked) {
                for (var i = 0, list = this.getItems(), o; o = list[i++];) {
                    UI_RADIO_FLUSH(o, o == this);
                }
            }
            else {
                UI_RADIO_FLUSH(this, false);
            }
        }
    };

    /**
     * override
     */
    UI_RADIO_CLASS.setDefaultValue = function () {
        this._bDefault = this.isChecked();
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Label - 定义事件转发的基本操作。
 标签控件，继承自基础控件，将事件转发到指定的控件上，通常与 Radio、Checkbox 等控件联合使用，扩大点击响应区域。

 标签控件直接HTML初始化的例子:
 <div ecui="type:label;for:checkbox"></div>

 属性
 _cFor - 被转发的控件对象
 */
//{if 0}//
(function () {

    var core = ecui,
        ui = core.ui,
        util = core.util,

        inheritsControl = core.inherits,
        $connect = core.$connect,
        triggerEvent = core.triggerEvent,
        blank = util.blank,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,

        AGENT_EVENT = ['click', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化标签控件。
     * options 对象支持的属性如下：
     * for 被转发的控件 id
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_LABEL
    var UI_LABEL = ui.Label = inheritsControl(
            UI_CONTROL,
            'ui-label',
            null,
            function (el, options) {
                this._bResizable = false;
                $connect(this, this.setFor, options['for']);
            }
        ),
        UI_LABEL_CLASS = UI_LABEL.prototype;
//{else}//
    /**
     * 设置控件的事件转发接收控件。
     * setFor 方法设置事件转发的被动接收者，如果没有设置，则事件不会被转发。
     * @public
     *
     * @param {ecui.ui.Control} control 事件转发接收控件
     */
    UI_LABEL_CLASS.setFor = function (control) {
        this._cFor = control;
    };


    UI_LABEL_CLASS.$setSize = blank;

    // 设置事件转发
    (function () {
        var i, name;

        for (i = 0; name = AGENT_EVENT[i]; i++) {
            UI_LABEL_CLASS['$' + name] = (function (name) {
                return function (event) {
                    UI_CONTROL_CLASS['$' + name].call(this, event);

                    var control = this._cFor;
                    if (control && !control.isDisabled()) {
                        triggerEvent(control, name, event);
                    }
                };
            })(name);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/**
 * input
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * path:    input.js
 * desc:    文本输入框(input与textarea)
 * author:  cxl(chenxinle@baidu.com)
 * date:    2012/03/12
 */
(function () {

    var core = ecui,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        attachEvent = util.attachEvent,
        createDom = dom.create,
        trim = string.trim,
        setFocused = core.setFocused,
        blank = util.blank,

        inheritsControl = core.inherits,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,


        UI_INPUT = ui.Input = inheritsControl(
            UI_INPUT_CONTROL,
            'ui-input',
            function (el, options) {
                options.resizable = false;
            },
            function (el, options) {
                var o, type = this.getType();

                this.getInput().style.border = '';

                if (options.maxLength) {
                    this._sMaxLength = options.maxLength;
                }


                if (options.tip) {
                    o = createDom(type + '-tip', 'display:none');
                    o.innerHTML = options.tip;
                    this.getBody().appendChild(o);
                    this._eTip = o;
                    attachEvent(this._eTip, 'mousedown', UI_INPUT_TIP_HANDLER);
                }
            }
        ),
        UI_INPUT_CLASS = UI_INPUT.prototype,

        UI_TEXTAREA = ui.Textarea = inheritsControl(
            UI_INPUT,
            'ui-textarea',
            function (el, options) {
                options.inputType = 'textarea';
            }
        );

    function UI_INPUT_TIP_HANDLER(event) {
        var e = event || window.event,
            con;

        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.cancelBuble = true;
        }
        e = e.target || e.srcElement;
        con = e.parentNode.getControl();
        con.getInput().focus();
    }

    function UI_INPUT_TIP_DISPLAY(con, show) {
        if (con._eTip) {
            con._eTip.style.display = show ? '' : 'none';
        }
    }

    UI_INPUT_CLASS.$keydown = function () {

        UI_INPUT_TIP_DISPLAY(this, false);
    };

    UI_INPUT_CLASS.$keyup = function () {
        var value = this.getValue();

        if (this._sMaxLength) {
            if (baidu.string.getByteLength(value) > this._sMaxLength) {
                this.setValue(baidu.string.subByte(value, this._sMaxLength));
            }
        }

        if (!value) {
            UI_INPUT_TIP_DISPLAY(this, true);
        }
    };

    UI_INPUT_CLASS.$blur = function () {
        UI_CONTROL_CLASS.$blur.call(this);
        if (!this.getValue()) {
            UI_INPUT_TIP_DISPLAY(this, true);
        }
    };

    UI_INPUT_CLASS.$setSize = blank;

    UI_INPUT_CLASS.setValue = function (value) {
        UI_INPUT_CONTROL_CLASS.setValue.call(this, value);
        UI_INPUT_TIP_DISPLAY(this, value ? false : true);
    };

    UI_INPUT_CLASS.init = function () {
        if (!this.getValue()) {
            UI_INPUT_TIP_DISPLAY(this, true);
        }
        UI_INPUT_CONTROL_CLASS.init.call(this);
    };
})();

/*
 Suggest - 定义模拟下拉框行为的基本操作。
 下拉框控件，继承自输入控件，实现了选项组接口，扩展了原生 SelectElement 的功能，允许指定下拉选项框的最大选项数量，在屏幕显示不下的时候，会自动显示在下拉框的上方。在没有选项时，下拉选项框有一个选项的高度。下拉框控件允许使用键盘与滚轮操作，在下拉选项框打开时，可以通过回车键或鼠标点击选择，上下键选择选项的当前条目，在关闭下拉选项框后，只要拥有焦点，就可以通过滚轮上下选择选项。

 下拉框控件直接HTML初始化的例子:

 <div ecui="type:suggest;">

 </div>

 属性
 _nOptionSize  - 下接选择框可以用于选择的条目数量
 _cSelected    - 当前选中的选项
 _uText        - suggest的文本框
 _uOptions     - 下拉选择框
 */
//{if 0}//
;
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,
        trim = string.trim,
        undefined,
        DOCUMENT = document,
        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getText = dom.getText,
        insertAfter = dom.insertAfter,
        insertBefore = dom.insertBefore,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        encodeHTML = string.encodeHTML,
        extend = util.extend,
        getView = util.getView,
        setDefault = util.setDefault,

        $fastCreate = core.$fastCreate,
        getAttributeName = core.getAttributeName,
        getFocused = core.getFocused,
        inheritsControl = core.inherits,
        intercept = core.intercept,
        mask = core.mask,
        restore = core.restore,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_SCROLLBAR = ui.Scrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SELECT
    ///__gzip_original__UI_SUGGEST_CLASS
    /**
     * 初始化下拉框控件。
     * options 对象支持的属性如下：
     * browser        是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * optionSize     下拉框最大允许显示的选项数量，默认为10
     * optionsElement 下拉选项主元素
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_SUGGEST = ui.Suggest =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-suggest',
                function (el, options) {
                    var me = this;
                    var name = el.name || options.name || '',
                        type = this.getType(),

                        id = options.id || 'id_notset',
                        optionsEl = createDom(
                            type + '-options' + this.Options.TYPES,
                            'position:absolute;z-index:65535;display:none'
                        );

                    optionsEl.setAttribute('ecui_id', id);

                    setDefault(options, 'hidden', true);


                    moveElements(el, optionsEl);

                    el.innerHTML =
                        '<span class="ui-input"></span><input name="' + name + '" value="' +
                        encodeHTML(options.value || '') + '">';

                    el.appendChild(optionsEl);
                    //延迟400ms触发query事件
                    this._nTimeout = 400;
                    //延迟的句柄
                    this._nTimeoutHandler = null;
                    return el;
                },
                function (el, options) {
                    if (options.timeout) {
                        this._nTimeout = options.timeout;
                    }
                    if (options.hide) {
                        this.getOuter().style.display = 'none';
                    }
                    el = children(el);
                    var me = this;
                    //上次输入的值
                    this._nLastText = '';
                    this._uText = $fastCreate(UI_INPUT_CONTROL, el[0], this, {capturable: false});


                    this._uOptions = $fastCreate(
                        this.Options,
                        removeDom(el[2]),
                        this,
                        {hScroll: false, browser: options.browser}
                    );

                    this.$setBody(this._uOptions.getBody());
                    // 初始化下拉区域最多显示的选项数量
                    this._nOptionSize = options.optionSize || 10;

                    this.$initItems();

                    //注册change事件
                    this._uText.$change = EVENT_TEXT_CHANGE;
                    //取消滚轮事件
                    //this._uText.$mousewheel = function() {};

                }
            ),
        UI_SUGGEST_CLASS = UI_SUGGEST.prototype,

        /**
         * 初始化下拉框控件的下拉选项框部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SUGGEST_OPTIONS_CLASS = (UI_SUGGEST_CLASS.Options = inheritsControl(UI_PANEL)).prototype,

        /**
         * 初始化下拉框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SUGGEST_ITEM_CLASS =
            (UI_SUGGEST_CLASS.Item = inheritsControl(
                UI_ITEM,
                null,
                null,
                function (el, options) {
                    this._sValue = options.value === undefined ? getText(el) : '' + options.value;
                }
            )).prototype;

    /**
     * 事件处理
     * @event 注册input文本框的onchange事件
     */
    function EVENT_TEXT_CHANGE() {
        var par = this.getParent();
        var value = par.getValue();

        //触发onchange事件
        triggerEvent(par, 'change', value);
        var txt = par.getText();
        var lastTxt = par._nLastText;

        //如果输入不相符 就致空value
        if (trim(txt) != trim(lastTxt)) {

            par._eInput.value = '';
        }

        //trim后没有内容 所以不查找
        if (trim(txt) == '') {
            return;
        }

        //因为改变了文本，理论值不一样了
        //触发onquery事件
        if (par._nTimeoutHandler) {
            //清除之前的句柄
            clearTimeout(par._nTimeoutHandler);
        }
        //延迟触发onquery事件
        par._nTimeoutHandler = setTimeout(function () {
            //清空事件句柄
            par._nTimeoutHandler = null;
            triggerEvent(par, 'query', value);

        }, par._nTimeout);

    }

    /**
     * 填充输入的文字自动匹配value值
     * 用户输入文本以后 寻找相关的id,并填入sugguest框
     * @param {ecui{Object}} suggest控件本身
     * @param {array[Object]} suggest控件本身
     * @param {string} suggest控件本身的text
     */
    function AUTO_FILL_VALUE(ele, list, text) {
        list = list || [];
        var value = null;
        for (var i = 0, item; item = list[i++];) {
            if (item.text == text) {
                value = item.value;
                break;
            }

        }
        //渲染
        if (value != null) {
            ele._eInput.value = value;
            //触发onslect
            triggerEvent(ele, 'select', {value: value, text: text});
        }

    }

//{else}//
    /**
     * 下拉框刷新。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    function UI_SUGGEST_FLUSH(control) {
        var options = control._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            el = options.getOuter(),
            pos = getPosition(control.getOuter()),
            selected = control._cSelected,
            optionTop = pos.top + control.getHeight();

        if (!getParent(el)) {
            // 第一次显示时需要进行下拉选项部分的初始化，将其挂载到 DOM 树中
            DOCUMENT.body.appendChild(el);
            control.cache(false, true);
            control.$alterItems();
        }
        else {

            control.cache(false, true);
            control.$alterItems();
        }

        if (options.isShow()) {
            if (selected) {
                //setFocused(selected);
            }
            scrollbar.setValue(scrollbar.getStep() * indexOf(control.getItems(), selected));

            // 以下使用control代替optionHeight
            control = options.getHeight();

            // 如果浏览器下部高度不够，将显示在控件的上部
            options.setPosition(
                pos.left,
                optionTop + control <= getView().bottom ? optionTop : pos.top - control
            );
        }
    }

    /**
     * 改变下拉框当前选中的项。
     * @private
     * @param {ecui.ui.Select} control 下拉框控件
     * @param {ecui.ui.Select.Item} item 新选中的项
     */
    function UI_SUGGEST_CHANGE_SELECTED(control, item) {
        if (item !== control._cSelected) {

            UI_INPUT_CONTROL_CLASS.setValue.call(control, item ? item._sValue : '');
            var text = item ? item.getBody().innerHTML : '';
            control._uText.setValue(text);
            //FIX: setValue为一个对象
            control._cSelected = item;
            if (control._uOptions.isShow()) {
                setFocused(item);
            }
            //设置选中的值
            if (item && item._sValue) {


                //suggest选择事件
                //选择事件的触发
                //
                triggerEvent(control, 'select', {value: item._sValue, text: text});
                triggerEvent(control, item._sValue);
                //设置焦点到最后
                //bugfix ie可能会选择以后会有显示在前边问题
                setFocused(control);
                control.setFocusToEnd();
            }
        }
    }

    extend(UI_SUGGEST_CLASS, UI_ITEMS);

    /**
     * 销毁选项框部件时需要检查是否展开，如果展开需要先关闭。
     * @override
     */
    UI_SUGGEST_OPTIONS_CLASS.$dispose = function () {
        this.hide();
        UI_PANEL_CLASS.$dispose.call(this);
    };

    /**
     * 关闭选项框部件时，需要恢复强制拦截的环境。
     * @override
     */
    UI_SUGGEST_OPTIONS_CLASS.$hide = function () {
        UI_PANEL_CLASS.$hide.call(this);
        mask();
        restore();
    };

    /**
     * 对于下拉框选项，鼠标移入即自动获得焦点。
     * @override
     */
    UI_SUGGEST_ITEM_CLASS.$mouseover = function (event) {
        UI_ITEM_CLASS.$mouseover.call(this, event);
        setFocused(this);
    };


    /**
     * 获取选项的值。
     * getValue 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 选项的值
     */
    UI_SUGGEST_ITEM_CLASS.getValue = function () {

        return this._sValue;
    };
    /**
     * 获取选项的值。
     * getText 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 选项的值
     */
    UI_SUGGEST_ITEM_CLASS.getText = function () {

        return this._eBody.innerHTML;
    };
    /**
     * 设置选项的值。
     * setValue 方法设置选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @param {string} value 选项的值
     */
    UI_SUGGEST_ITEM_CLASS.setValue = function (value) {
        var parent = this.getParent();
        this._sValue = value;
        if (parent && this == parent._cSelected) {
            // 当前被选中项的值发生变更需要同步更新控件的值
            UI_INPUT_CONTROL_CLASS.setValue.call(parent, value);
        }
    };

    /**
     * 下拉框控件激活时，显示选项框，产生遮罩层阻止对页面内 DOM 节点的点击，并设置框架进入强制点击拦截状态。
     * @override
     */
    UI_SUGGEST_CLASS.$activate = function (event) {
        if (!(event.getControl() instanceof UI_SCROLLBAR)) {
            UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
            //这里不需要弹出层 ？？？
            return;
            this._uOptions.show();
            // 拦截之后的点击，同时屏蔽所有的控件点击事件
            intercept(this);
            mask(0, 65534);
            UI_SUGGEST_FLUSH(this);
            event.stopPropagation();
        }
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生添加/移除操作时调用此方法。虚方法，子控件必须实现。
     * @protected
     */
    UI_SUGGEST_CLASS.$alterItems = function () {
        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            step = this.getBodyHeight(),
            width = this.getWidth(),
            itemLength = this.getItems().length;

        if (getParent(options.getOuter())) {
            // 设置选项框
            scrollbar.setStep(step);

            // 为了设置激活状态样式, 因此必须控制下拉框中的选项必须在滚动条以内
            this.setItemSize(
                width - options.getMinimumWidth() - (itemLength > optionSize ? scrollbar.getWidth() : 0),
                step
            );

            // 设置options框的大小，如果没有元素，至少有一个单位的高度
            options.$$mainHeight = itemLength * step + options.$$bodyHeightRevise;
            options.$setSize(width, (MIN(itemLength, optionSize) || 1) * step + options.getMinimumHeight());
        }
    };

    /**
     * @override
     */
    UI_SUGGEST_CLASS.$cache = function (style, cacheSize) {
        (getParent(this._uOptions.getOuter()) ? UI_ITEMS : UI_INPUT_CONTROL_CLASS)
            .$cache.call(this, style, cacheSize);
        this._uText.cache(false, true);
        this._uOptions.cache(false, true);
    };
    /**
     * 控件在下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框。
     * @override
     */
    UI_SUGGEST_CLASS.$intercept = function (event) {
        //__transform__control_o
        this._uOptions.hide();
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof this.Item) {
                if (control != this._cSelected) {
                    // 检查点击是否在当前下拉框的选项上
                    UI_SUGGEST_CHANGE_SELECTED(this, control);
                    //onchange事件需要参数 在这里获取并发送
                    var obj = {
                        text: control.getText(),
                        value: control._sValue
                    };
                    triggerEvent(this, 'change', obj);
                    //设置焦点到最后
                    //bugfix ie可能会选择以后会有显示在前边问题
                    //不需要这里调用了 直接在选中的时候调用
                    //setFocused(this);
                    //this.setFocusToEnd();
                }
                break;
            }
        }
        event.exit();
    };

    /**
     * 接管对上下键与回车/ESC键的处理。
     * @override
     */
    UI_SUGGEST_CLASS.$keydown = UI_SUGGEST_CLASS.$keypress = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type](event);

        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            which = event.which,
            list = this.getItems(),
            length = list.length,
            focus = getFocused();

        if (this.isFocused()) {

            // 当前不能存在鼠标操作，否则屏蔽按键
            if (which == 40 || which == 38) {
                //bugfix
                //shift + 40 是（  ，shift + 38 是 &
                if (event && event._oNative.shiftKey) {
                    return true;
                }
                if (length) {

                    if (options.isShow()) {
                        var uFocus = list[which = MIN(MAX(0, indexOf(list, focus) + which - 39), length - 1)];
                        setFocused(uFocus);
                        which -= scrollbar.getValue() / scrollbar.getStep();
                        scrollbar.skip(which < 0 ? which : which >= optionSize ? which - optionSize + 1 : 0);
                        event.cancelBubble = true;
                    }
                    else {
                        //不需要选择列表里的item
                        return false;

                        //this.setSelectedIndex(MIN(MAX(0, indexOf(list, this._cSelected) + which - 39), length - 1));
                    }

                }
                return false;
            }
            else if (which == 27 || which == 13 && options.isShow()) {
                // 回车键选中，ESC键取消
                options.hide();
                if (which == 13) {
                    if (focus instanceof this.Item) {
                        UI_SUGGEST_CHANGE_SELECTED(this, focus);
                        //onchange事件需要参数 在这里获取并发送
                        var obj = {
                            text: focus.getText(),
                            value: focus._sValue
                        };
                        //触发change事件
                        triggerEvent(this, 'change', obj);
                    }
                }
                return false;
            }
            else {
                //可以支持用户继续输入
                //bugfix: 这里有一个bug，keypress和keydown，which可能是0 所以不用处理不然firefox会丢失 item的焦点
                if (which != 0) {

                    setFocused(this._uText);
                }

            }

        }

    };

    /**
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。
     * @override
     */
    UI_SUGGEST_CLASS.$mousewheel = function (event) {
        if (this.isFocused()) {
            var options = this._uOptions,
                list = this.getItems(),
                length = list.length;

            if (options.isShow()) {
                options.$mousewheel(event);
            }
            else {
                //options表示当前选项的index
                options = indexOf(list, this._cSelected) + (event.detail > 0 ? 1 : -1);
                this.setSelectedIndex(
                    length ?
                        MIN(MAX(0, options), length - 1) : null
                );
                if (options >= 0 && options < length) {
                    //鼠标滚动触发change事件
                    //triggerEvent(this, 'change');
                }
            }

            event.exit();
        }
    };

    /**
     * @override
     */
    UI_SUGGEST_CLASS.$ready = function () {
        this.setValue(this.getValue());
    };

    /**
     * 下拉框移除子选项时，如果选项是否被选中，需要先取消选中。
     * @override
     */
    UI_SUGGEST_CLASS.remove = function (item) {
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }
        if (item == this._cSelected) {
            //UI_SUGGEST_CHANGE_SELECTED(this);
        }
        return UI_ITEMS.remove.call(this, item);
    };

    /**
     * 添加选项需要根据情况继续cache操作
     * @override
     */
    UI_SUGGEST_CLASS.add = function (item, index, options) {
        item = UI_ITEMS.add.call(this, item, index, options);
        if (getParent(this._uOptions.getOuter())) {
            item.cache(true, true);
        }
        return item;
    };

    /**
     * @override
     */
    UI_SUGGEST_CLASS.$setSize = function (width, height) {
        UI_INPUT_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
        height = this.getBodyHeight();

        // 设置文本区域  不需要减去height
        // bugfix:  并非select 所以不要右侧的下拉箭头
        this._uText.$setSize(width = this.getBodyWidth(), height);
        //this._uText.$setSize(width = this.getBodyWidth() - height, height);


    };

    /**
     * 获取被选中的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 选项控件
     */
    UI_SUGGEST_CLASS.getSelected = function () {
        return this._cSelected || null;
    };
    /**
     * 获取选项的文本
     * @return {string} 选择的文本
     */
    UI_SUGGEST_CLASS.getText = function () {
        var txt = this._uText.getValue();
        return txt;
    };

    /**
     * 获取选项的文本
     * @param {string} 设置文本
     * @return {string} 选择的文本
     */
    UI_SUGGEST_CLASS.setText = function (txt) {
        this._uText.setValue(txt);
    };
    /**
     * 获取suggest的文本框里的值
     */
    UI_SUGGEST_CLASS.getValue = function () {
        var value = this._eInput.value;
        var text = this.getText();
        var obj = {
            value: value,
            text: text
        };
        return obj;
    };
    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_SUGGEST_CLASS.setOptionSize = function (value) {
        this._nOptionSize = value;
        this.$alterItems();
        UI_SUGGEST_FLUSH(this);
    };

    /**
     * 根据序号选中选项。
     * @public
     *
     * @param {number} index 选项的序号
     */
    UI_SUGGEST_CLASS.setSelectedIndex = function (index) {
        UI_SUGGEST_CHANGE_SELECTED(this, this.getItems()[index]);
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件的值，设置的值必须与一个子选项的值相等，否则将被设置为空，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 需要选中的值
     */
    UI_SUGGEST_CLASS.setValue = function (oValue) {

        //{text:XX,value:XX}
        var value = oValue;
        if ('[object Object]' == Object.prototype.toString.call(oValue)) {
            value = oValue.value;
        }

        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            if (o._sValue == value) {
                UI_SUGGEST_CHANGE_SELECTED(this, o);
                //text
                this._nLastText = Ovalue.text || o.getBody().innerHTML;
                return;
            }
        }

        // 找不到满足条件的项，将选中的值清除
        UI_SUGGEST_CHANGE_SELECTED(this);
    };
    /**
     * 清除suggest里的内容
     */
    UI_SUGGEST_CLASS.clear = function () {
        var items = this.getItems() || [],
            len = items.length;
        while (len-- > 0) {
            this.remove(0);
        }

        this._uOptions.reset();
    };
    /**
     * 重新渲染suggest里的内容
     * @param {Array[Object]} 数据源
     */
    UI_SUGGEST_CLASS.update = function (list) {
        //清空    
        this.clear();
        var item = null;
        var el = null;
        var control = this;
        for (var i = 0, o; o = list[i++];) {

            item = this.add(o.text, null, {value: o.value});
            //以后可以增加title的标识的变量
            if (true) {
                item.getOuter().title = o.text;
            }
        }
        if (!this._uOptions.isShow()) {
            this._uOptions.show();
            // 拦截之后的点击，同时屏蔽所有的控件点击事件
            intercept(this);
            mask(0, 65534);
            UI_SUGGEST_FLUSH(this);
        }
        else {

            control.$alterItems();
        }
        //自动填充相关id，用户
        var txt = this.getText(txt);
        AUTO_FILL_VALUE(this, list, txt);
        //updae控件以后需要focus到文本框
        setFocused(control._uText);
        //event.stopPropagation();
    };
    //聚焦到最后
    UI_SUGGEST_CLASS.setFocusToEnd = function () {
        var input = this._uText;
        core.setFocused(input);
        input = input._eInput;
        var len = input.value.length;
        if (document.selection) {
            var sel = input.createTextRange();
            sel.moveStart('character', len);
            sel.collapse();
            sel.select();
        }
        else if (typeof input.selectionStart == 'number'
            && typeof input.selectionEnd == 'number') {
            input.selectionStart = input.selectionEnd = len;
        }


    };
    UI_SUGGEST_CLASS.$mousewheel = function () {
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Form - 定义独立于文档布局的内容区域的基本操作。
 窗体控件，继承自基础控件，仿真浏览器的多窗体效果，如果在其中包含 iframe 标签，可以在当前页面打开一个新的页面，避免了使用 window.open 在不同浏览器下的兼容性问题。多个窗体控件同时工作时，当前激活的窗体在最上层。窗体控件的标题栏默认可以拖拽，窗体可以设置置顶方式显示，在置顶模式下，只有当前窗体可以响应操作。窗体控件的 z-index 从4096开始，页面开发请不要使用大于或等于4096的 z-index 值。

 窗体控件直接HTML初始化的例子:
 <div ecui="type:form;hide:true">
 <label>窗体的标题</label>
 <!-- 这里放窗体的内容 -->
 ...
 </div>

 属性
 _bFlag          - 初始是否自动隐藏/是否使用showModal激活
 _bAutoTitle     - 标题栏是否自适应宽度
 _bAutoHeight    - 高度是否自适应
 _bAutoCenter    - 显示时位置是否自动居中
 _uTitle         - 标题栏
 _uClose         - 关闭按钮
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        util = core.util,

        undefined,
        MATH = Math,
        MAX = MATH.max,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getStyle = dom.getStyle,
        moveElements = dom.moveElements,
        encodeHTML = string.encodeHTML,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        calcHeightRevise = core.calcHeightRevise,
        calcWidthRevise = core.calcWidthRevise,
        drag = core.drag,
        inheritsControl = core.inherits,
        loseFocus = core.loseFocus,
        mask = core.mask,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = ui.Control.prototype,
        UI_BUTTON = ui.Button;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_FORM
    ///__gzip_original__UI_FORM_CLASS
    /**
     * 初始化窗体控件。
     * options 对象支持的属性如下：
     * hide         初始是否自动隐藏
     * autoTitle    title是否自适应宽度，默认自适应宽度
     * autoCenter   显示时位置是否自动居中，默认不处理
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_FORM = ui.Form =
            inheritsControl(
                UI_CONTROL,
                'ui-form',
                function (el, options) {
                    // 生成标题控件与内容区域控件对应的Element对象
                    var type = this.getType(),
                    //o = createDom(type + '-body', 'position:relative;overflow:auto'),
                        o = createDom(type + '-body', 'overflow:auto'),
                        closeEl = createDom(type + '-close' + this.Close.TYPES, 'position:absolute'),
                        titleEl = first(el);

                    moveElements(el, o, true);

                    if (titleEl && titleEl.tagName == 'DIV') {
                        el.innerHTML = '';
                        titleEl.appendChild(closeEl);
                        //    '<div class="' + type + '-close' + this.Close.TYPES + '" style="position:absolute"></div>';
                        el.insertBefore(titleEl, el.firstChild);
                        titleEl.className = type + '-title' + this.Title.TYPES;
                        titleEl.style.position = 'absolute';
                    }
                    else {
                        el.innerHTML =
                            '<div class="' + type + '-title' + this.Title.TYPES +
                            '" style="position:absolute"><span>' + (options.title ? encodeHTML(options.title) : '') + '</span><div class="' + type + '-close' + this.Close.TYPES +
                            '" style="position:absolute"></div></div>';
                        titleEl = el.firstChild;
                    }

                    el.style.overflow = 'hidden';
                    el.appendChild(o);
                },
                function (el, options) {
                    this._bAutoHeight = !el.style.height;
                    el = children(el);

                    this._bFlag = options.hide;
                    this._bAutoTitle = options.autoTitle !== false;
                    this._bAutoCenter = options.autoCenter === true;

                    // 初始化标题区域
                    this._uTitle = $fastCreate(this.Title, el[0], this, {userSelect: false});

                    // 初始化关闭按钮
                    this._uClose = $fastCreate(this.Close, children(el[0])[1], this);
                    if (options.closeButton === false) {
                        this._uClose.$hide();
                    }

                    this.$setBody(el[1]);
                }
            ),
        UI_FORM_CLASS = UI_FORM.prototype,

        /**
         * 初始化窗体控件的标题栏部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_FORM_TITLE_CLASS = (UI_FORM_CLASS.Title = inheritsControl(UI_CONTROL)).prototype,

        /**
         * 初始化窗体控件的关闭按钮部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_FORM_CLOSE_CLASS = (UI_FORM_CLASS.Close = inheritsControl(UI_BUTTON)).prototype,

        UI_FORM_ALL = [],   // 当前显示的全部窗体
        UI_FORM_MODAL = 0;  // 当前showModal的窗体数
//{else}//
    /**
     * 刷新所有显示的窗体的zIndex属性。
     * @protected
     *
     * @param {ecui.ui.Form} form 置顶显示的窗体
     */
    function UI_FORM_FLUSH_ZINDEX(form) {
        UI_FORM_ALL.push(UI_FORM_ALL.splice(indexOf(UI_FORM_ALL, form), 1)[0]);

        // 改变当前窗体之后的全部窗体z轴位置，将当前窗体置顶
        for (var i = 0, j = UI_FORM_ALL.length - UI_FORM_MODAL, o; o = UI_FORM_ALL[i++];) {
            o.getOuter().style.zIndex = i > j ? 32767 + (i - j) * 2 : 4095 + i;
        }
    }

    /**
     * 标题栏激活时触发拖动，如果当前窗体未得到焦点则得到焦点。
     * @override
     */
    UI_FORM_TITLE_CLASS.$activate = function (event) {
        UI_CONTROL_CLASS.$activate.call(this, event);
        drag(this.getParent(), event);
    };

    /**
     * 窗体关闭按钮点击关闭窗体。
     * @override
     */
    UI_FORM_CLOSE_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);
        this.getParent().hide();
    };

    /**
     * @override
     */
    UI_FORM_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        style = getStyle(this.getMain().lastChild);
        this.$$bodyWidthRevise = calcWidthRevise(style);
        this.$$bodyHeightRevise = calcHeightRevise(style);
        this._uTitle.cache(true, true);
        this._uClose.cache(true, true);
    };

    /**
     * 销毁窗体时需要先关闭窗体，并不再保留窗体的索引。
     * @override
     */
    UI_FORM_CLASS.$dispose = function () {
        if (indexOf(UI_FORM_ALL, this) >= 0) {
            // 窗口处于显示状态，需要强制关闭
            // 避免在unload时子元素已经被dispose导致getOuter函数报错
            try {
                this.$hide();
            }
            catch (e) {
            }
        }
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 窗体控件获得焦点时需要将自己置于所有窗体控件的顶部。
     * @override
     */
    UI_FORM_CLASS.$focus = function () {
        UI_CONTROL_CLASS.$focus.call(this);
        UI_FORM_FLUSH_ZINDEX(this);
    };

    /**
     * 窗体隐藏时将失去焦点状态，如果窗体是以 showModal 方式打开的，隐藏窗体时，需要恢复页面的状态。
     * @override
     */
    UI_FORM_CLASS.$hide = function () {
        // showModal模式下隐藏窗体需要释放遮罩层
        var i = indexOf(UI_FORM_ALL, this);
        if (i >= 0) {
            UI_FORM_ALL.splice(i, 1);
        }

        if (i > UI_FORM_ALL.length - UI_FORM_MODAL) {
            if (this._bFlag) {
                if (i == UI_FORM_ALL.length) {
                    mask();
                }
                else {
                    // 如果不是最后一个，将遮罩层标记后移
                    UI_FORM_ALL[i]._bFlag = true;
                }
                this._bFlag = false;
            }
            UI_FORM_MODAL--;
        }

        UI_CONTROL_CLASS.$hide.call(this);
        loseFocus(this);
    };

    /**
     * @override
     */
    UI_FORM_CLASS.$setSize = function (width, height) {
        if (this._bAutoHeight) {
            height = null;
        }
        UI_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();

        var style = this.getMain().lastChild.style;

        style.width = this.getBodyWidth() + 'px';
        if (!this._bAutoHeight) {
            style.height = this.getBodyHeight() + 'px';
        }
        if (this._bAutoTitle) {
            this._uTitle.$setSize(this.getWidth() - this.$getBasicWidth());
        }
    };

    /**
     * 窗体显示时将获得焦点状态。
     * @override
     */
    UI_FORM_CLASS.$show = function () {
        UI_FORM_ALL.push(this);
        UI_CONTROL_CLASS.$show.call(this);
        setFocused(this);
    };

    /**
     * 窗体居中显示。
     * @public
     */
    UI_FORM_CLASS.center = function () {
        var viewRect = getViewRect(window);
        var left = viewRect.left + (viewRect.width - this.getWidth()) / 2;
        var top = viewRect.top + (viewRect.height - this.getHeight()) / 2;
        this.setPosition(MAX(left, 0), MAX(top, 0));
    };

    /**
     * 窗体居中显示。
     * @public
     */
    /**
     UI_FORM_CLASS.center = function () {
        o = this.getOuter();
        o.style.position = this.$$position = 'absolute';
        o = o.offsetParent;

        if (!o || o.tagName == 'BODY' || o.tagName == 'HTML') {
            var o = getView(),
                x = o.right + o.left,
                y = o.bottom + o.top;
        }
        else {
            x = o.offsetWidth;
            y = o.offsetHeight;
        }

        this.setPosition(MAX((x - this.getWidth()) / 2, 0), MAX((y - this.getHeight())/2 , 0));
    };
     **/

    /**
     * 窗体按给定高度显示。
     * @public
     */
    UI_FORM_CLASS.setPos = function (height) {
        o = this.getOuter();
        o.style.position = this.$$position = 'absolute';
        o = o.offsetParent;

        if (!o || o.tagName == 'BODY' || o.tagName == 'HTML') {
            var o = getView(),
                x = o.right + o.left,
                y = o.bottom + o.top;

            if (height + this.getHeight() > o.bottom) {
                y = o.bottom + o.top;
                height = height - 20;
            } else if (height - this.getHeight() / 2 > 0) {
                y = height;
                height = y - this.getHeight() / 2;
            } else {
                height = height / 2;
            }
        }
        else {
            x = o.offsetWidth;
            y = o.offsetHeight;
        }

        this.setPosition(MAX((x - this.getWidth()) / 2, 0), MAX(height, 0));
    };


    /**
     * @add by hepeng
     * @time 2014-09-19
     * @discription 提供置顶功能，解决某些对话框居中显示不完整问题
     * 窗体置顶显示。
     * @public
     */
    UI_FORM_CLASS.top = function () {
        o = this.getOuter();
        o.style.position = this.$$position = 'absolute';
        o = o.offsetParent;

        if (!o || o.tagName == 'BODY' || o.tagName == 'HTML') {
            var o = getView(),
                x = o.right + o.left;
        }
        else {
            x = o.offsetWidth;
        }
        this.setPosition(MAX((x - this.getWidth()) / 2, 0), 20);
    };

    /**
     * 如果窗体是以 showModal 方式打开的，只有位于最顶层的窗体才允许关闭。
     * @override
     */
    UI_FORM_CLASS.hide = function () {
        for (var i = indexOf(UI_FORM_ALL, this), o; o = UI_FORM_ALL[++i];) {
            if (o._bFlag) {
                return false;
            }
        }
        return UI_CONTROL_CLASS.hide.call(this);
    };

    /**
     * @override
     */
    UI_FORM_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uTitle.init();
        this._uClose.init();
        if (this._bFlag) {
            this._bFlag = false;
            this.$hide();
        }
        else {
            this.$show();
        }
    };

    /**
     * 设置窗体控件标题。
     * @public
     *
     * @param {string} text 窗体标题
     */
    UI_FORM_CLASS.setTitle = function (text) {
        //this._uTitle.setContent(text || ''); 
        this._uTitle._eBody.children[0].innerHTML = (text || '');
    };

    /**
     * @override
     */
    UI_FORM_CLASS.show = function () {
        if (UI_FORM_MODAL && indexOf(UI_FORM_ALL, this) < UI_FORM_ALL.length - UI_FORM_MODAL) {
            // 如果已经使用showModal，对原来不是showModal的窗体进行处理
            UI_FORM_MODAL++;
        }

        var result = UI_CONTROL_CLASS.show.call(this);
        if (!result) {
            UI_FORM_FLUSH_ZINDEX(this);
        }
        else if (this._bAutoCenter) {
            this.center();
        }

        return result;
    };

    /*
     * @override
     */
    UI_FORM_CLASS.$resize = function () {
        var style = this.getMain().lastChild.style;

        UI_CONTROL_CLASS.$resize.call(this);
        style.width = '';
        style.height = '';
    };

    /**
     * override
     * 自适应高度时getHeight需要实时计算
     */
    UI_FORM_CLASS.getHeight = function () {
        if (this._bAutoHeight) {
            this.cache(true, true);
        }
        return UI_CONTROL_CLASS.getHeight.call(this);
    }

    /**
     * 窗体以独占方式显示
     * showModal 方法将窗体控件以独占方式显示，此时鼠标点击窗体以外的内容无效，关闭窗体后自动恢复。
     * @public
     *
     * @param {number} opacity 遮罩层透明度，默认为0.05
     */
    UI_FORM_CLASS.showModal = function (opacity) {
        if (!this._bFlag) {
            if (indexOf(UI_FORM_ALL, this) < UI_FORM_ALL.length - UI_FORM_MODAL) {
                UI_FORM_MODAL++;
            }

            mask(opacity !== undefined ? opacity : 0.5, 32766 + UI_FORM_MODAL * 2);

            this._bFlag = true;
            if (!UI_CONTROL_CLASS.show.call(this)) {
                UI_FORM_FLUSH_ZINDEX(this);
            }
            else if (this._bAutoCenter) {
                this.center();
            }
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,
        string = core.string,

        $fastCreate = core.$fastCreate,
        setFocused = core.setFocused,
        createDom = dom.create,
        children = dom.children,
        moveElements = dom.moveElements,
        getPosition = dom.getPosition,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        getView = util.getView,
        blank = util.blan,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype;

    var UI_POP = ui.Pop =
            inheritsControl(
                UI_CONTROL,
                'ui-pop',
                null,
                function (el, options) {
                    var type = this.getTypes()[0],
                        o = createDom(), els;

                    el.style.position = 'absolute';

                    if (options.noButton !== true) {
                        o.innerHTML = '<div class="' + type + '-buttons"><div class="ui-button ui-button-g">确定</div><div class="ui-button">取消</div></div>';
                        els = children(o.firstChild);
                        this._uSubmitBtn = $fastCreate(this.Button, els[0], this, {
                            command: 'submit',
                            primary: 'ui-button-g'
                        });
                        this._uCancelBtn = $fastCreate(this.Button, els[1], this, {command: 'cancel'});
                        moveElements(o, el, true);
                    }
                }
            ),

        UI_POP_CLASS = UI_POP.prototype;

    UI_POP_BTN = UI_POP_CLASS.Button =
        inheritsControl(
            UI_BUTTON,
            null,
            function (el, options) {
                this._sCommand = options.command;
            }
        ),

        UI_POP_BTN_CLASS = UI_POP_BTN.prototype;

    UI_POP_CLASS.show = function (con, align) {
        var view = getView(),
            h, w,
            pos = getPosition(con.getOuter());

        UI_CONTROL_CLASS.show.call(this);
        this.resize();
        w = this.getWidth();
        h = con.getHeight() + pos.top;
        if (!align && align == 'left') {
            if (pos.left + w > view.right) {
                w = pos.left + con.getWidth() - w;
            }
            else {
                w = pos.left;
            }
        }
        else {
            if (pos.left + con.getWidth() - w < 0) {
                w = pos.left;
            }
            else {
                w = pos.left + con.getWidth() - w;
            }
        }

        if (h + this.getHeight() > view.bottom) {
            h = view.bottom - this.getHeight();
        }

        var o = this.getOuter().offsetParent;
        if (!o || (o.tagName !== 'BODY' && o.tagName !== 'HTML')) {
            var parPos = getPosition(this.getOuter().offsetParent);
            w = w - parPos.left;
            h = h - parPos.top;
        }
        this.setPosition(w, h);
        setFocused(this);
    };

    UI_POP_CLASS.$resize = function () {
        var el = this._eMain,
            currStyle = el.style;

        currStyle.width = this._sWidth;
        currStyle.height = this._sHeight;
        this.repaint();
    }

    UI_POP_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this.$hide();
    };

    UI_POP_CLASS.$blur = function () {
        this.hide();
        triggerEvent(this, 'cancel');
    };

    UI_POP_BTN_CLASS.$click = function () {
        var par = this.getParent();
        UI_BUTTON_CLASS.$click.call(this);
        if (triggerEvent(par, this._sCommand)) {
            par.$blur = blank;
            par.hide();
            delete par.$blur;
        }
    };

    var UI_POP_BUTTON = ui.PopButton =
            inheritsControl(
                UI_BUTTON,
                'ui-pop-button',
                function (el, options) {
                    var type = this.getTypes()[0],
                        o = createDom(type + '-icon', 'position:absolute');

                    this._sAlign = options.align;
                    el.appendChild(o);
                    this._sTargetId = options.target;
                },
                function (el, options) {
                    var type = this.getTypes()[0];

                    if (options.mode == 'text') {
                        this.setClass(type + '-text');
                    }
                }
            ),

        UI_POP_BUTTON_CLASS = UI_POP_BUTTON.prototype;

    UI_POP_BUTTON_CLASS.$click = function () {
        var con;
        UI_BUTTON_CLASS.$click.call(this);
        if (this._sTargetId) {
            con = core.get(this._sTargetId);
            con.show(this, this._sAlign);
        }
    };
})();

/*
 Select - 定义模拟下拉框行为的基本操作。
 下拉框控件，继承自输入控件，实现了选项组接口，扩展了原生 SelectElement 的功能，允许指定下拉选项框的最大选项数量，在屏幕显示不下的时候，会自动显示在下拉框的上方。在没有选项时，下拉选项框有一个选项的高度。下拉框控件允许使用键盘与滚轮操作，在下拉选项框打开时，可以通过回车键或鼠标点击选择，上下键选择选项的当前条目，在关闭下拉选项框后，只要拥有焦点，就可以通过滚轮上下选择选项。

 下拉框控件直接HTML初始化的例子:
 <select ecui="type:select" name="sex">
 <option value="male" selected="selected">男</option>
 <option value="female">女</option>
 </select>
 或
 <div ecui="type:select;name:sex;value:male">
 <div ecui="value:male">男</div>
 <div ecui="value:female">女</div>
 </div>

 属性
 _nOptionSize  - 下接选择框可以用于选择的条目数量
 _cSelected    - 当前选中的选项
 _uText        - 下拉框的文本框
 _uButton      - 下拉框的按钮
 _uOptions     - 下拉选择框
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,
        FLOOR = MATH.floor,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getText = dom.getText,
        insertAfter = dom.insertAfter,
        insertBefore = dom.insertBefore,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        encodeHTML = string.encodeHTML,
        trim = string.trim,
        extend = util.extend,
        getView = util.getView,
        setDefault = util.setDefault,

        $fastCreate = core.$fastCreate,
        getAttributeName = core.getAttributeName,
        getFocused = core.getFocused,
        inheritsControl = core.inherits,
        intercept = core.intercept,
        mask = core.mask,
        restore = core.restore,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_SCROLLBAR = ui.Scrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SELECT
    ///__gzip_original__UI_SELECT_CLASS
    /**
     * 初始化下拉框控件。
     * options 对象支持的属性如下：
     * browser        是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * optionSize     下拉框最大允许显示的选项数量，默认为5
     * optionsElement 下拉选项主元素
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_SELECT = ui.Select =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-select',
                function (el, options) {
                    var name = el.name || options.name || '',
                        type = this.getType(),

                        id = options.id || 'id_notset',
                        optionsEl = createDom(
                            type + '-options' + this.Options.TYPES,
                            'position:absolute;z-index:65535;display:none'
                        );

                    optionsEl.setAttribute('ecui_id', id);

                    setDefault(options, 'hidden', true);

                    if (el.tagName == 'SELECT') {
                        var i = 0,
                            list = [],
                            elements = el.options,
                            o = el;

                        options.value = el.value;

                        // 移除select标签
                        el = insertBefore(createDom(el.className, el.style.cssText, 'span'), el);
                        removeDom(o);

                        // 转化select标签
                        for (; o = elements[i];) {
                            // 这里的text不进行转义，特殊字符不保证安全
                            list[i++] =
                                '<div ' + getAttributeName() + '="value:' + encodeHTML(o.value) + '">' +
                                o.text + '</div>';
                        }
                        optionsEl.innerHTML = list.join('');
                    }
                    else {
                        moveElements(el, optionsEl);
                    }
                    /*modified by V_wangxueliang
                     修复如果用户value值设为0
                     */
                    var defaultValue = options.value;
                    if (defaultValue === 0) {
                        defaultValue = 0;
                    } else {
                        if (options.value === false) {
                            defaultValue = options.value;
                        } else {
                            defaultValue = options.value || '';
                        }
                    }
                    el.innerHTML =
                        '<span class="' + type + '-text' + UI_ITEM.TYPES + '"></span><span class="' + type + '-button' +
                        UI_BUTTON.TYPES + '" style="position:absolute"></span><input name="' + name + '" value="' +
                        trim(encodeHTML(defaultValue)) + '">';

                    el.appendChild(optionsEl);

                    return el;
                },
                function (el, options) {
                    el = children(el);

                    this._uText = $fastCreate(UI_ITEM, el[0], this, {capturable: false, userSelect: false});
                    this._uButton = $fastCreate(UI_BUTTON, el[1], this, {capturable: false, userSelect: false});

                    this._uOptions = $fastCreate(
                        this.Options,
                        removeDom(el[3]),
                        this,
                        {hScroll: false, browser: options.browser}
                    );

                    this.$setBody(this._uOptions.getBody());
                    // 初始化下拉区域最多显示的选项数量
                    this._nOptionSize = options.optionSize || 5;

                    this.$initItems();
                }
            ),
        UI_SELECT_CLASS = UI_SELECT.prototype,

        /**
         * 初始化下拉框控件的下拉选项框部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SELECT_OPTIONS_CLASS = (UI_SELECT_CLASS.Options = inheritsControl(UI_PANEL)).prototype,

        /**
         * 初始化下拉框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SELECT_ITEM_CLASS =
            (UI_SELECT_CLASS.Item = inheritsControl(
                UI_ITEM,
                null,
                null,
                function (el, options) {
                    this._sValue = options.value === undefined ? getText(el) : '' + options.value;
                    el.setAttribute('title', trim(getText(el)));
                }
            )).prototype;
//{else}//

    /**
     * 列表面板支持鼠标滚轮事件
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    UI_SELECT_ITEM_CLASS.$mousewheel = function (event) {
        if (this.isHovered()) {
            var o = (this.getParent()._uOptions).$getSection('VScrollbar');
            if (o && o.isShow()) {
                // 计算滚动的次数，至少要滚动一次
                var value = o.getValue(),
                    delta = this._nWheelDelta || FLOOR(20 / o.getStep()) || 1,
                    o;
                o.skip(event.detail > 0 ? delta : -delta);
                event.stopPropagation();
                // 如果截面已经移动到最后，不屏弊缺省事件
                return value == o.getValue();
            }
        }
    }

    /**
     * 下拉框刷新。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    function UI_SELECT_FLUSH(control) {
        var options = control._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            el = options.getOuter(),
            pos = getPosition(control.getOuter()),
            selected = control._cSelected,
            optionTop = pos.top + control.getHeight();

        if (!getParent(el)) {
            // 第一次显示时需要进行下拉选项部分的初始化，将其挂载到 DOM 树中
            DOCUMENT.body.appendChild(el);
            control.cache(false, true);
            control.$alterItems();
        }

        if (options.isShow()) {
            if (selected) {
                setFocused(selected);
            }
            scrollbar.setValue(scrollbar.getStep() * indexOf(control.getItems(), selected));

            // 以下使用control代替optionHeight
            control = options.getHeight();

            // 如果浏览器下部高度不够，将显示在控件的上部
            options.setPosition(
                pos.left,
                optionTop + control <= getView().bottom ? optionTop : pos.top - control
            );
        }
    }

    /**
     * 改变下拉框当前选中的项。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     * @param {ecui.ui.Select.Item} item 新选中的项
     */
    function UI_SELECT_CHANGE_SELECTED(control, item) {
        if (item !== control._cSelected) {
            control._uText.setContent(item ? trim(item.getBody().innerHTML) : '');
            UI_INPUT_CONTROL_CLASS.setValue.call(control, item ? item._sValue : '');
            control._cSelected = item;
            if (control._uOptions.isShow()) {
                setFocused(item);
            }
        }
    }

    extend(UI_SELECT_CLASS, UI_ITEMS);

    /**
     * 销毁选项框部件时需要检查是否展开，如果展开需要先关闭。
     * @override
     */
    UI_SELECT_OPTIONS_CLASS.$dispose = function () {
        this.hide();
        UI_PANEL_CLASS.$dispose.call(this);
    };

    /**
     * 关闭选项框部件时，需要恢复强制拦截的环境。
     * @override
     */
    UI_SELECT_OPTIONS_CLASS.$hide = function () {
        UI_PANEL_CLASS.$hide.call(this);
        mask();
        restore();
    };

    /**
     * 对于下拉框选项，鼠标移入即自动获得焦点。
     * @override
     */
    UI_SELECT_ITEM_CLASS.$mouseover = function (event) {
        UI_ITEM_CLASS.$mouseover.call(this, event);
        setFocused(this);
    };

    /**
     * 获取选项的值。
     * getValue 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 选项的值
     */
    UI_SELECT_ITEM_CLASS.getValue = function () {
        return this._sValue;
    };

    /**
     * 获取选项的文本
     * getText 方法返回选项控件的值，即选中时整个下拉框控件的文本
     * @public
     * @return {string}
     */
    UI_SELECT_CLASS.getText = function () {
        if (this.getValue() != -1) {
            return string.trim(this._uText.getContent());
        } else {
            return "";
        }
    };
    /**
     * 设置选项的值。
     * setValue 方法设置选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @param {string} value 选项的值
     */
    UI_SELECT_ITEM_CLASS.setValue = function (value) {
        var parent = this.getParent();
        this._sValue = value;
        if (parent && this == parent._cSelected) {
            // 当前被选中项的值发生变更需要同步更新控件的值
            UI_INPUT_CONTROL_CLASS.setValue.call(parent, value);
        }
    };

    /**
     * 下拉框控件激活时，显示选项框，产生遮罩层阻止对页面内 DOM 节点的点击，并设置框架进入强制点击拦截状态。
     * @override
     */
    UI_SELECT_CLASS.$activate = function (event) {
        if (!(event.getControl() instanceof UI_SCROLLBAR)) {
            UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
            this._uOptions.show();
            // 拦截之后的点击，同时屏蔽所有的控件点击事件
            intercept(this);
            mask(0, 65534);
            UI_SELECT_FLUSH(this);
            event.stopPropagation();
        }
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生添加/移除操作时调用此方法。虚方法，子控件必须实现。
     * @protected
     */
    UI_SELECT_CLASS.$alterItems = function () {
        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            step = this.getBodyHeight(),
            width = this.getWidth(),
            itemLength = this.getItems().length;

        if (getParent(options.getOuter())) {
            // 如果在样式中设置了下拉子列的高度 (比如 .ui-select-item )就取这个高度来做完step的高度

            if (itemLength > 0) {
                step = this.getItems()[0].getHeight() || step;
            }

            // 设置选项框
            scrollbar.setStep(step);

            // 为了设置激活状态样式, 因此必须控制下拉框中的选项必须在滚动条以内
            // this.setItemSize(
            //     width - options.getMinimumWidth() - (itemLength > optionSize ? scrollbar.getWidth() : 0),
            //     step
            // );
            this.setItemSize(
                width - options.getMinimumWidth(),
                step
            );

            // 设置options框的大小，如果没有元素，至少有一个单位的高度
            options.$$mainHeight = itemLength * step + options.$$bodyHeightRevise;
            options.$setSize(width, (MIN(itemLength, optionSize) || 1) * step + options.getMinimumHeight());
        }
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$cache = function (style, cacheSize) {
        (getParent(this._uOptions.getOuter()) ? UI_ITEMS : UI_INPUT_CONTROL_CLASS)
            .$cache.call(this, style, cacheSize);
        this._uText.cache(false, true);
        this._uButton.cache(false, true);
        this._uOptions.cache(false, true);
    };

    /**
     * 控件在下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框。
     * @override
     */
    UI_SELECT_CLASS.$intercept = function (event) {
        //__transform__control_o
        this._uOptions.hide();
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof this.Item) {
                if (control != this._cSelected) {
                    // 检查点击是否在当前下拉框的选项上
                    UI_SELECT_CHANGE_SELECTED(this, control);
                    triggerEvent(this, 'change');
                }
                break;
            }
        }
        event.exit();
    };

    /**
     * 接管对上下键与回车/ESC键的处理。
     * @override
     */
    UI_SELECT_CLASS.$keydown = UI_SELECT_CLASS.$keypress = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type](event);

        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            which = event.which,
            list = this.getItems(),
            length = list.length,
            focus = getFocused();

        if (this.isFocused()) {
            // 当前不能存在鼠标操作，否则屏蔽按键
            if (which == 40 || which == 38) {
                if (length) {
                    if (options.isShow()) {
                        setFocused(list[which = MIN(MAX(0, indexOf(list, focus) + which - 39), length - 1)]);
                        which -= scrollbar.getValue() / scrollbar.getStep();
                        scrollbar.skip(which < 0 ? which : which >= optionSize ? which - optionSize + 1 : 0);
                    }
                    else {
                        //this.setSelectedIndex(MIN(MAX(0, indexOf(list, this._cSelected) + which - 39), length - 1));
                    }
                }
                return false;
            }
            else if (which == 27 || which == 13 && options.isShow()) {
                // 回车键选中，ESC键取消
                options.hide();
                if (which == 13) {
                    UI_SELECT_CHANGE_SELECTED(this, focus);
                    //触发change事件
                    triggerEvent(this, 'change');
                }
                return false;
            }
        }
    };

    /**
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。
     * @override
     */
    UI_SELECT_CLASS.$mousewheel = function (event) {
        if (this.isFocused()) {
            var options = this._uOptions,
                list = this.getItems(),
                length = list.length;

            if (options.isShow()) {
                options.$mousewheel(event);
            }
            else {
                //options表示当前选项的index
                options = indexOf(list, this._cSelected) + (event.detail > 0 ? 1 : -1)
                this.setSelectedIndex(
                    length ?
                        MIN(MAX(0, options), length - 1) : null
                );
                if (options >= 0 && options < length) {
                    //鼠标滚动触发change事件
                    triggerEvent(this, 'change');
                }
            }

            event.exit();
        }
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$ready = function () {
        this.setValue(this.getValue());
    };

    /**
     * 下拉框移除子选项时，如果选项是否被选中，需要先取消选中。
     * @override
     */
    UI_SELECT_CLASS.remove = function (item) {
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }
        if (item == this._cSelected) {
            UI_SELECT_CHANGE_SELECTED(this);
        }
        return UI_ITEMS.remove.call(this, item);
    };

    /**
     * 添加选项需要根据情况继续cache操作
     * @override
     */
    UI_SELECT_CLASS.add = function (item, index, options) {
        item = UI_ITEMS.add.call(this, item, index, options);
        if (getParent(this._uOptions.getOuter())) {
            item.cache(true, true);
        }
        return item;
    };

    /**
     * @override
     */
    UI_SELECT_CLASS.$setSize = function (width, height) {
        UI_INPUT_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
        height = this.getBodyHeight();
        var iconw = (iPageObj.config.select != undefined && iPageObj.config.select.iconWidth != undefined) ? iPageObj.config.select.iconWidth : height;

        // 设置文本区域
        this._uText.$setSize(width = this.getBodyWidth() - iconw + 3, height);

        // 设置下拉按钮
        // this._uButton.$setSize(height, height);
        // this._uButton.setPosition(width, 0);
        this._uButton.$setSize(iconw - 2, height + 2);
        this._uButton.setPosition(width, -1);
    };

    /**
     * 获取被选中的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 选项控件
     */
    UI_SELECT_CLASS.getSelected = function () {
        return this._cSelected || null;
    };

    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_SELECT_CLASS.setOptionSize = function (value) {
        this._nOptionSize = value;
        this.$alterItems();
        UI_SELECT_FLUSH(this);
    };

    /**
     * 根据序号选中选项。
     * @public
     *
     * @param {number} index 选项的序号
     */
    UI_SELECT_CLASS.setSelectedIndex = function (index) {
        UI_SELECT_CHANGE_SELECTED(this, this.getItems()[index]);
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件的值，设置的值必须与一个子选项的值相等，否则将被设置为空，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 需要选中的值
     */
    UI_SELECT_CLASS.setValue = function (value) {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            if (o._sValue == value) {
                UI_SELECT_CHANGE_SELECTED(this, o);
                return;
            }
        }

        // 找不到满足条件的项，将选中的值清除
        UI_SELECT_CHANGE_SELECTED(this);
    };


    UI_SELECT_CLASS.clear = function () {
        var items = this.getItems() || [],
            len = items.length;

        while (len-- > 0) {
            this.remove(0);
        }

        this._uOptions.reset();
    };

//{/if}//
//{if 0}//
})();
//{/if}//
/*
 Select - 定义模拟下拉框行为的基本操作。
 下拉框控件，继承自输入控件，实现了选项组接口，扩展了原生 SelectElement 的功能，允许指定下拉选项框的最大选项数量，在屏幕显示不下的时候，会自动显示在下拉框的上方。在没有选项时，下拉选项框有一个选项的高度。下拉框控件允许使用键盘与滚轮操作，在下拉选项框打开时，可以通过回车键或鼠标点击选择，上下键选择选项的当前条目，在关闭下拉选项框后，只要拥有焦点，就可以通过滚轮上下选择选项。

 下拉框控件直接HTML初始化的例子:
 <select ecui="type:select" name="sex">
 <option value="male" selected="selected">男</option>
 <option value="female">女</option>
 </select>
 或
 <div ecui="type:select;name:sex;value:male">
 <div ecui="value:male">男</div>
 <div ecui="value:female">女</div>
 </div>

 属性
 _nOptionSize  - 下接选择框可以用于选择的条目数量
 _cSelected    - 当前选中的选项
 _uText        - 下拉框的文本框
 _uButton      - 下拉框的按钮
 _uOptions     - 下拉选择框
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        getText = dom.getText,
        insertAfter = dom.insertAfter,
        insertBefore = dom.insertBefore,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        encodeHTML = string.encodeHTML,
        extend = util.extend,
        getView = util.getView,
        setDefault = util.setDefault,

        $fastCreate = core.$fastCreate,
        getAttributeName = core.getAttributeName,
        getFocused = core.getFocused,
        inheritsControl = core.inherits,
        intercept = core.intercept,
        mask = core.mask,
        restore = core.restore,
        setFocused = core.setFocused,
        triggerEvent = core.triggerEvent,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_SCROLLBAR = ui.Scrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_SELECT
    ///__gzip_original__UI_SELECT_CLASS
    /**
     * 初始化下拉框控件。
     * options 对象支持的属性如下：
     * browser        是否使用浏览器原生的滚动条，默认使用模拟的滚动条
     * optionSize     下拉框最大允许显示的选项数量，默认为5
     * optionsElement 下拉选项主元素
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_EASY_SELECT = ui.easySelect =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-easy-select',
                function (el, options) {
                    var name = el.name || options.name || '',
                        type = this.getType(),

                        id = options.id || 'id_notset',
                        optionsEl = createDom(
                            type + '-options' + this.Options.TYPES,
                            'position:absolute;z-index:65535;display:none'
                        );

                    optionsEl.setAttribute('ecui_id', id);

                    setDefault(options, 'hidden', true);

                    if (el.tagName == 'SELECT') {
                        var i = 0,
                            list = [],
                            elements = el.options,
                            o = el;

                        options.value = el.value;

                        // 移除select标签
                        el = insertBefore(createDom(el.className, el.style.cssText, 'span'), el);
                        removeDom(o);

                        // 转化select标签
                        for (; o = elements[i];) {
                            // 这里的text不进行转义，特殊字符不保证安全
                            list[i++] =
                                '<div ' + getAttributeName() + '="value:' + encodeHTML(o.value) + '">' +
                                o.text + '</div>';
                        }
                        optionsEl.innerHTML = list.join('');
                    }
                    else {
                        moveElements(el, optionsEl);
                    }
                    /*modified by V_wangxueliang
                     修复如果用户value值设为0
                     */
                    var defaultValue = options.value;
                    if (defaultValue === 0) {
                        defaultValue = 0;
                    } else {
                        defaultValue = options.value || '';
                    }
                    el.innerHTML =
                        '<span class="' + type + '-text' + UI_ITEM.TYPES + '"></span><span class="' + type + '-button' +
                        UI_BUTTON.TYPES + '" style="position:absolute"></span><input name="' + name + '" value="' +
                        encodeHTML(defaultValue) + '">';

                    el.appendChild(optionsEl);

                    return el;
                },
                function (el, options) {
                    el = children(el);

                    this._uText = $fastCreate(UI_ITEM, el[0], this, {capturable: false});
                    this._uButton = $fastCreate(UI_BUTTON, el[1], this, {capturable: false});

                    this._uOptions = $fastCreate(
                        this.Options,
                        removeDom(el[3]),
                        this,
                        {hScroll: false, browser: options.browser}
                    );

                    this.$setBody(this._uOptions.getBody());
                    // 初始化下拉区域最多显示的选项数量
                    this._nOptionSize = options.optionSize || 5;

                    this.$initItems();
                }
            ),
        UI_EASY_SELECT_CLASS = UI_EASY_SELECT.prototype,

        /**
         * 初始化下拉框控件的下拉选项框部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_EASY_SELECT_OPTIONS_CLASS = (UI_EASY_SELECT_CLASS.Options = inheritsControl(UI_PANEL)).prototype,

        /**
         * 初始化下拉框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_SELECT_ITEM_CLASS =
            (UI_EASY_SELECT_CLASS.Item = inheritsControl(
                UI_ITEM,
                null,
                null,
                function (el, options) {
                    this._sValue = options.value === undefined ? getText(el) : '' + options.value;
                    el.setAttribute('title', string.trim(getText(el)));
                }
            )).prototype;
//{else}//
    /**
     * 下拉框刷新。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     */
    function UI_SELECT_FLUSH(control) {
        var options = control._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            el = options.getOuter(),
            pos = getPosition(control.getOuter()),
            selected = control._cSelected,
            optionTop = pos.top + control.getHeight();

        if (!getParent(el)) {
            // 第一次显示时需要进行下拉选项部分的初始化，将其挂载到 DOM 树中
            DOCUMENT.body.appendChild(el);
            control.cache(false, true);
            control.$alterItems();
        }

        if (options.isShow()) {
            if (selected) {
                setFocused(selected);
            }
            scrollbar.setValue(scrollbar.getStep() * indexOf(control.getItems(), selected));

            // 以下使用control代替optionHeight
            control = options.getHeight();

            // 如果浏览器下部高度不够，将显示在控件的上部
            options.setPosition(
                pos.left,
                optionTop + control <= getView().bottom ? optionTop : pos.top - control
            );
        }
    }

    /**
     * 改变下拉框当前选中的项。
     * @private
     *
     * @param {ecui.ui.Select} control 下拉框控件
     * @param {ecui.ui.Select.Item} item 新选中的项
     */
    function UI_SELECT_CHANGE_SELECTED(control, item) {
        if (item !== control._cSelected) {
            control._uText.setContent(item ? item.getBody().innerHTML : '');
            UI_INPUT_CONTROL_CLASS.setValue.call(control, item ? item._sValue : '');
            control._cSelected = item;
            if (control._uOptions.isShow()) {
                setFocused(item);
            }
        }
    }

    extend(UI_EASY_SELECT_CLASS, UI_ITEMS);

    /**
     * 销毁选项框部件时需要检查是否展开，如果展开需要先关闭。
     * @override
     */
    UI_EASY_SELECT_OPTIONS_CLASS.$dispose = function () {
        this.hide();
        UI_PANEL_CLASS.$dispose.call(this);
    };

    /**
     * 关闭选项框部件时，需要恢复强制拦截的环境。
     * @override
     */
    UI_EASY_SELECT_OPTIONS_CLASS.$hide = function () {
        UI_PANEL_CLASS.$hide.call(this);
        mask();
        restore();
    };

    /**
     * 对于下拉框选项，鼠标移入即自动获得焦点。
     * @override
     */
    UI_SELECT_ITEM_CLASS.$mouseover = function (event) {
        UI_ITEM_CLASS.$mouseover.call(this, event);
        setFocused(this);
    };

    /**
     * 获取选项的值。
     * getValue 方法返回选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @return {string} 选项的值
     */
    UI_SELECT_ITEM_CLASS.getValue = function () {
        return this._sValue;
    };

    /**
     * 获取选项的文本
     * getText 方法返回选项控件的值，即选中时整个下拉框控件的文本
     * @public
     * @return {string}
     */
    UI_EASY_SELECT_CLASS.getText = function () {
        if (this.getValue() != -1) {
            return string.trim(this._uText.getContent());
        } else {
            return "";
        }
    };
    /**
     * 设置选项的值。
     * setValue 方法设置选项控件的值，即选项选中时整个下拉框控件的值。
     * @public
     *
     * @param {string} value 选项的值
     */
    UI_SELECT_ITEM_CLASS.setValue = function (value) {
        var parent = this.getParent();
        this._sValue = value;
        if (parent && this == parent._cSelected) {
            // 当前被选中项的值发生变更需要同步更新控件的值
            UI_INPUT_CONTROL_CLASS.setValue.call(parent, value);
        }
    };

    /**
     * 下拉框控件激活时，显示选项框，产生遮罩层阻止对页面内 DOM 节点的点击，并设置框架进入强制点击拦截状态。
     * @override
     */
    UI_EASY_SELECT_CLASS.$activate = function (event) {
        if (!(event.getControl() instanceof UI_SCROLLBAR)) {
            UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
            this._uOptions.show();
            // 拦截之后的点击，同时屏蔽所有的控件点击事件
            intercept(this);
            mask(0, 65534);
            UI_SELECT_FLUSH(this);
            event.stopPropagation();
        }
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生添加/移除操作时调用此方法。虚方法，子控件必须实现。
     * @protected
     */
    UI_EASY_SELECT_CLASS.$alterItems = function () {
        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            step = this.getBodyHeight(),
            width = this.getWidth(),
            itemLength = this.getItems().length;

        if (getParent(options.getOuter())) {
            // 设置选项框
            scrollbar.setStep(step);

            // 为了设置激活状态样式, 因此必须控制下拉框中的选项必须在滚动条以内
            // this.setItemSize(
            //     width - options.getMinimumWidth() - (itemLength > optionSize ? scrollbar.getWidth() : 0),
            //     step
            // );
            this.setItemSize(
                width - options.getMinimumWidth(),
                step
            );

            // 设置options框的大小，如果没有元素，至少有一个单位的高度
            options.$$mainHeight = itemLength * step + options.$$bodyHeightRevise;
            options.$setSize(width, (MIN(itemLength, optionSize) || 1) * step + options.getMinimumHeight());
        }
    };

    /**
     * @override
     */
    UI_EASY_SELECT_CLASS.$cache = function (style, cacheSize) {
        (getParent(this._uOptions.getOuter()) ? UI_ITEMS : UI_INPUT_CONTROL_CLASS)
            .$cache.call(this, style, cacheSize);
        this._uText.cache(false, true);
        this._uButton.cache(false, true);
        this._uOptions.cache(false, true);
    };

    /**
     * 控件在下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框。
     * @override
     */
    UI_EASY_SELECT_CLASS.$intercept = function (event) {
        //__transform__control_o
        this._uOptions.hide();
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof this.Item) {
                if (control != this._cSelected) {
                    // 检查点击是否在当前下拉框的选项上
                    UI_SELECT_CHANGE_SELECTED(this, control);
                    triggerEvent(this, 'change');
                }
                break;
            }
        }
        event.exit();
    };

    /**
     * 接管对上下键与回车/ESC键的处理。
     * @override
     */
    UI_EASY_SELECT_CLASS.$keydown = UI_EASY_SELECT_CLASS.$keypress = function (event) {
        UI_INPUT_CONTROL_CLASS['$' + event.type](event);

        var options = this._uOptions,
            scrollbar = options.$getSection('VScrollbar'),
            optionSize = this._nOptionSize,
            which = event.which,
            list = this.getItems(),
            length = list.length,
            focus = getFocused();

        if (this.isFocused()) {
            // 当前不能存在鼠标操作，否则屏蔽按键
            if (which == 40 || which == 38) {
                if (length) {
                    if (options.isShow()) {
                        setFocused(list[which = MIN(MAX(0, indexOf(list, focus) + which - 39), length - 1)]);
                        which -= scrollbar.getValue() / scrollbar.getStep();
                        scrollbar.skip(which < 0 ? which : which >= optionSize ? which - optionSize + 1 : 0);
                    }
                    else {
                        this.setSelectedIndex(MIN(MAX(0, indexOf(list, this._cSelected) + which - 39), length - 1));
                    }
                }
                return false;
            }
            else if (which == 27 || which == 13 && options.isShow()) {
                // 回车键选中，ESC键取消
                options.hide();
                if (which == 13) {
                    UI_SELECT_CHANGE_SELECTED(this, focus);
                    //触发change事件
                    triggerEvent(this, 'change');
                }
                return false;
            }
        }
    };

    /**
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。
     * @override
     */
    UI_EASY_SELECT_CLASS.$mousewheel = function (event) {
        if (this.isFocused()) {
            var options = this._uOptions,
                list = this.getItems(),
                length = list.length;

            if (options.isShow()) {
                options.$mousewheel(event);
            }
            else {
                //options表示当前选项的index
                options = indexOf(list, this._cSelected) + (event.detail > 0 ? 1 : -1)
                this.setSelectedIndex(
                    length ?
                        MIN(MAX(0, options), length - 1) : null
                );
                if (options >= 0 && options < length) {
                    //鼠标滚动触发change事件
                    triggerEvent(this, 'change');
                }
            }

            event.exit();
        }
    };

    /**
     * @override
     */
    UI_EASY_SELECT_CLASS.$ready = function () {
        this.setValue(this.getValue());
    };

    /**
     * 下拉框移除子选项时，如果选项是否被选中，需要先取消选中。
     * @override
     */
    UI_EASY_SELECT_CLASS.remove = function (item) {
        if ('number' == typeof item) {
            item = this.getItems()[item];
        }
        if (item == this._cSelected) {
            UI_SELECT_CHANGE_SELECTED(this);
        }
        return UI_ITEMS.remove.call(this, item);
    };

    /**
     * 添加选项需要根据情况继续cache操作
     * @override
     */
    UI_EASY_SELECT_CLASS.add = function (item, index, options) {
        item = UI_ITEMS.add.call(this, item, index, options);
        if (getParent(this._uOptions.getOuter())) {
            item.cache(true, true);
        }
        return item;
    };

    /**
     * @override
     */
    UI_EASY_SELECT_CLASS.$setSize = function (width, height) {
        UI_INPUT_CONTROL_CLASS.$setSize.call(this, width, height);
        this.$locate();
        height = this.getBodyHeight();

        // 设置文本区域
        this._uText.$setSize(width, height);

        // 设置下拉按钮
        // this._uButton.$setSize(height, height);
        // this._uButton.setPosition(width, 0);
        this._uButton.$setSize(12, 7);
        this._uButton.setPosition((width - 18), (height - 7) / 2);
    };

    /**
     * 获取被选中的选项控件。
     * @public
     *
     * @return {ecui.ui.Item} 选项控件
     */
    UI_EASY_SELECT_CLASS.getSelected = function () {
        return this._cSelected || null;
    };

    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_EASY_SELECT_CLASS.setOptionSize = function (value) {
        this._nOptionSize = value;
        this.$alterItems();
        UI_SELECT_FLUSH(this);
    };

    /**
     * 根据序号选中选项。
     * @public
     *
     * @param {number} index 选项的序号
     */
    UI_EASY_SELECT_CLASS.setSelectedIndex = function (index) {
        UI_SELECT_CHANGE_SELECTED(this, this.getItems()[index]);
    };

    /**
     * 设置控件的值。
     * setValue 方法设置控件的值，设置的值必须与一个子选项的值相等，否则将被设置为空，使用 getValue 方法获取设置的值。
     * @public
     *
     * @param {string} value 需要选中的值
     */
    UI_EASY_SELECT_CLASS.setValue = function (value) {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            if (o._sValue == value) {
                UI_SELECT_CHANGE_SELECTED(this, o);
                return;
            }
        }

        // 找不到满足条件的项，将选中的值清除
        UI_SELECT_CHANGE_SELECTED(this);
    };


    UI_EASY_SELECT_CLASS.clear = function () {
        var items = this.getItems() || [],
            len = items.length;

        while (len-- > 0) {
            this.remove(0);
        }

        this._uOptions.reset();
    };

//{/if}//
//{if 0}//
})();
//{/if}//
/**
 * cascade-select.js
 * Copyright 2012 Baidu Inc. All rights reserved
 *
 * desc: 级联下拉菜单
 * author: hades(denghongqi@baidu.com)
 */

(function () {
    var core = ecui,
        ui = core.ui,
        dom = core.dom,
        string = core.string,
        util = core.util,

        $fastcreate = core.$fastcreate,
        $connect = core.$connect,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        encodeHTML = string.encodeHTML,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_SELECT = ui.Select,
        UI_SELECT_CLASS = UI_SELECT.prototype,

        UI_CASCADE_SELECT = ui.CascadeSelect = inheritsControl(
            UI_SELECT,
            null,
            function (el, options) {
            },
            function (el, options) {
                this._bTarget = options.target;
                $connect(this, function (target) {
                    this._cTarget = target;
                }, this._bTarget);
            }
        ),
        UI_CASCADE_SELECT_CLASS = UI_CASCADE_SELECT.prototype;

    UI_CASCADE_SELECT_CLASS.$change = function () {
        UI_SELECT_CLASS.$click.call(this);
        var target = this._cTarget;
        var nowValue = this.getValue();
        triggerEvent(target, 'loaddata', function (options, value) {
            var control = target;
            control.clear();
            for (var i = 0, o; o = options[i]; i++) {
                control.add(o.text, null, {value: o.value});
            }
            if (value) {
                control.setValue(value);
            }
            else {
                control.setSelectedIndex(0);
            }
        }, [nowValue]);
    };

})();
/*
 MultiSelect - 定义多选下拉框行为的基本操作。
 多选下拉框控件，继承自输入框控件，实现了选项组接口，参见下拉框控件。

 下拉框控件直接HTML初始化的例子:
 <select ecui="type:multi-select;option-size:3" name="test">
 <!-- 这里放选项内容 -->
 <option value="值">文本</option>
 ...
 <option value="值" selected>文本</option>
 ...
 </select>

 如果需要自定义特殊的选项效果，请按下列方法初始化:
 <div ecui="type:multi-select;name:test;option-size:3">
 <!-- 这里放选项内容 -->
 <li ecui="value:值">文本</li>
 ...
 </div>

 Item属性
 _eInput - 多选项的INPUT对象
 */
//{if 0}//
(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        indexOf = array.indexOf,
        getText = dom.getText,
        removeDom = dom.remove,
        createDom = dom.create,
        setInput = dom.setInput,
        extend = util.extend,
        inherits = util.inherits,

        getKey = core.getKey,
        mask = core.mask,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_ITEMS = ui.Items,
        UI_SELECT = ui.Select,
        UI_SELECT_CLASS = UI_SELECT.prototype,
        UI_SELECT_ITEM = UI_SELECT_CLASS.Item,
        UI_SELECT_ITEM_CLASS = UI_SELECT_ITEM.prototype;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化多选下拉框控件。
     * options 对象支持的属性如下：
     * optionSize 下拉框最大允许显示的选项数量，默认为5
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_MULTI_SELECT
    //__gzip_original__UI_MULTI_SELECT_ITEM
    var UI_MULTI_SELECT = ui.MultiSelect =
            inheritsControl(
                UI_SELECT,
                'ui-multi-select',
                function (el, options) {
                    options.hide = true;
                    if (options.value) {
                        options.value = options.value.toString();
                    }
                },
                function (el, options) {
                    var values;

                    if (options.maxlength) {
                        this._nTextLen = options.maxlength;
                    }
                    if (options.textAll) {
                        this._sTextAll = options.textAll;
                    }
                    if (options.textNone) {
                        this._sTextNone = options.textNone;
                    }
                    if (options.maxSelected) {
                        this._nMaxSelected = options.maxSelected;
                    }
                    else if (options.selectAllButton) {
                        this.add('全部', 0, {selectAllButton: true});
                        this._bSelectAllBtn = true;
                    }
                    if (options.tip) {
                        this._bTip = true;
                    }
                    if (options.value) {
                        this.setValue(options.value);
                    }
                    if (options.selectAll) {
                        this._bInitSelectAll = true;
                    }
                    if (options.minSelected) {
                        this._nMinSelected = options.minSelected;
                    }

                    this._eInput.disabled = true;
                }
            ),
        UI_MULTI_SELECT_CLASS = UI_MULTI_SELECT.prototype,

        /**
         * 初始化多选下拉框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_MULTI_SELECT_ITEM = UI_MULTI_SELECT_CLASS.Item =
            inheritsControl(
                UI_SELECT_ITEM,
                'ui-multi-select-item',
                function (el, options) {
                    var type = this.getTypes()[0],
                        o = createDom(type + '-icon');

                    this._bSelectAllBtn = options.selectAllButton;
                    this._sTip = options.tip ? options.tip : getText(el);

                    el.insertBefore(o, el.firstChild);
                    el = this._eInput =
                        options.parent.getMain().appendChild(setInput(null, options.parent.getName(), 'checkbox'));

                    options.value === undefined ? el.value = '' : el.value = options.value;
                    el.style.display = 'none';
                }
            ),
        UI_MULTI_SELECT_ITEM_CLASS = UI_MULTI_SELECT_ITEM.prototype;
//{else}//

    /**
     * 刷新全选按钮
     * @private
     */
    function UI_MULTI_SELECT_FLUSH_SELECTALL(control, status) {
        var items = control.getItems();

        if (!control._bSelectAllBtn) {
            return;
        }

        if (status === undefined) {
            status = control.getSelected().length === items.length - 1;
            items[0].$setSelected(status);
        }
        else {
            for (var i = 0, item; item = items[i]; i++) {
                item.$setSelected(status);
            }
        }
    }

    /**
     * 刷新显示区域的选中值列表。
     * @private
     *
     * @param {ecui.ui.MultiSelect} control 多选下拉框控件
     */
    function UI_MULTI_SELECT_FLUSH_TEXT(control) {
        var tip;
        if (control) {
            var btnAllSelected = false;
            for (var i = 0, list = control.getItems(), o, text = []; o = list[i++];) {
                if (o.isSelected()) {
                    if (o._bSelectAllBtn) {
                        btnAllSelected = true;
                    }
                    else {
                        text.push(o._sTip);
                    }
                }
            }
            tip = '<span title="' + text.join(',') + '">';
            if (
                control._sTextAll
                && (text.length != 0 || btnAllSelected)
                && text.length == list.length + (control._bSelectAllBtn ? -1 : 0)
            ) {
                text = control._sTextAll;
            }
            else if (text.length == 0 && control._sTextNone) {
                text = control._sTextNone;
            }
            else {
                text = text.join(',');
                if (control._nTextLen && text.length > control._nTextLen) {
                    text = text.substring(0, control._nTextLen) + '...';
                }
            }
            if (control._bTip) {
                text = tip + text + '</span>';
            }
            control.$getSection('Text').setContent(text);
        }
    }

    extend(UI_MULTI_SELECT_CLASS, UI_ITEMS);

    /**
     * 鼠标单击控件事件的默认处理。
     * 控件点击时将改变当前的选中状态。如果控件处于可操作状态(参见 isEnabled)，click 方法触发 onclick 事件，如果事件返回值不为 false，则调用 $click 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_ITEM_CLASS.$click = function (event) {
        var par = this.getParent(),
            selected = par.getSelected().length;

        UI_SELECT_ITEM_CLASS.$click.call(this, event);
        if (!this.isSelected()) {
            if (!par._nMaxSelected || par._nMaxSelected >= selected + 1) {
                this.setSelected(true);
            }
        }
        else {
            if (!par._nMinSelected || par._nMinSelected <= selected - 1) {
                this.setSelected(false);
            }
        }
    };

    /**
     * 销毁控件的默认处理。
     * 页面卸载时将销毁所有的控件，释放循环引用，防止在 IE 下发生内存泄漏，$dispose 方法的调用不会受到 ondispose 事件返回值的影响。
     * @protected
     */
    UI_MULTI_SELECT_ITEM_CLASS.$dispose = function () {
        this._eInput = null;
        UI_SELECT_ITEM_CLASS.$dispose.call(this);
    };

    /**
     * 判断当前选项是否选中。
     * @protected
     *
     * @return {boolean} 当前项是否选中
     */
    UI_MULTI_SELECT_ITEM_CLASS.isSelected = function () {
        return this._eInput.checked;
    };

    /**
     *
     */
    UI_MULTI_SELECT_ITEM_CLASS.$setSelected = function (status) {
        this._eInput.checked = status !== false;
        this.setClass(this.getPrimary() + (this._eInput.checked ? '-selected' : ''));
    }

    /**
     * 设置当前选项是否选中。
     * @protected
     *
     * @param {boolean} status 当前项是否选中，默认选中
     */
    UI_MULTI_SELECT_ITEM_CLASS.setSelected = function (status) {
        this.$setSelected(status);
        UI_MULTI_SELECT_FLUSH_SELECTALL(this.getParent(), this._bSelectAllBtn ? status : undefined);
        UI_MULTI_SELECT_FLUSH_TEXT(this.getParent());
    };

    /**
     * 选项控件发生变化的处理。
     * 在 选项组接口 中，选项控件发生增加/减少操作时调用此方法。
     * @protected
     */
    UI_MULTI_SELECT_CLASS.$alterItems = function () {
        UI_SELECT_CLASS.$alterItems.call(this);
        UI_MULTI_SELECT_FLUSH_SELECTALL(this);
        UI_MULTI_SELECT_FLUSH_TEXT(this);
    };

    /**
     * 控件增加子控件事件的默认处理。
     * 选项组增加子选项时需要判断子控件的类型，并额外添加引用。
     * @protected
     *
     * @param {ecui.ui.Item} child 选项控件
     * @return {boolean} 是否允许增加子控件，默认允许
     */
    UI_MULTI_SELECT_CLASS.$append = function (item) {
        UI_SELECT_CLASS.$append.call(this, item);
        this.getMain().appendChild(setInput(item._eInput, this.getName()));
    };

    /**
     * 计算控件的缓存。
     * 控件缓存部分核心属性的值，提高控件属性的访问速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法(setSize、alterClass 等)直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @protected
     *
     * @param {CssStyle} style 基本 Element 对象的 Css 样式对象
     * @param {boolean} cacheSize 是否需要缓存控件大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     */
    UI_MULTI_SELECT_CLASS.$cache = UI_SELECT_CLASS.$cache;

    /**
     * 界面点击强制拦截事件的默认处理。
     * 控件在多选下拉框展开时，需要拦截浏览器的点击事件，如果点击在下拉选项区域，则选中当前项，否则直接隐藏下拉选项框，但不会改变控件激活状态。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_CLASS.$intercept = function (event) {
        for (var control = event.getControl(); control; control = control.getParent()) {
            if (control instanceof UI_MULTI_SELECT_ITEM) {
                //当多选框选项为ECUI控件时无法释放拦截，此处fix一下，by hades
                event.target = control.getOuter();
                return false;
            }
        }
        this.$getSection('Options').hide();
        triggerEvent(this, 'change');
        event.exit();
    };

    /**
     * 控件拥有焦点时，键盘按下/弹起事件的默认处理。
     * 如果控件处于可操作状态(参见 isEnabled)，keyup 方法触发 onkeyup 事件，如果事件返回值不为 false，则调用 $keyup 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_CLASS.$keydown = UI_MULTI_SELECT_CLASS.$keypress = UI_MULTI_SELECT_CLASS.$keyup =
        function (event) {
            UI_INPUT_CONTROL_CLASS['$' + event.type].call(this, event);
            if (!this.$getSection('Options').isShow()) {
                return false;
            }

            var key = getKey();
            if (key == 13 || key == 32) {
                if (event.type == 'keyup') {
                    key = this.getActived();
                    key.setSelected(!key.isSelected());
                }
                return false;
            }
        };

    /**
     * 鼠标在控件区域滚动滚轮事件的默认处理。
     * 如果控件拥有焦点，则当前选中项随滚轮滚动而自动指向前一项或者后一项。如果控件处于可操作状态(参见 isEnabled)，mousewheel 方法触发 onmousewheel 事件，如果事件返回值不为 false，则调用 $mousewheel 方法。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_CLASS.$mousewheel = function (event) {
        var options = this.$getSection('Options');
        if (options.isShow()) {
            options.$mousewheel(event);
        }
        return false;
    };

    /**
     * 控件激活状态结束事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_CLASS.$deactivate = UI_SELECT_CLASS.$deactivate;

    /**
     * 控件激活状态开始事件的默认处理。
     * @protected
     *
     * @param {Event} event 事件对象
     */
    UI_MULTI_SELECT_CLASS.$activate = function (event) {
        var con = event.getControl();
        if (!(con instanceof UI_MULTI_SELECT_ITEM)) {
            UI_SELECT_CLASS.$activate.call(this, event);
        }
    }

    /**
     * 控件自动渲染全部完成后的处理。
     * 页面刷新时，部分浏览器会回填输入框的值，需要在回填结束后触发设置控件的状态。
     * @protected
     */
    UI_MULTI_SELECT_CLASS.$ready = function () {
        UI_MULTI_SELECT_FLUSH_SELECTALL(this);
        UI_MULTI_SELECT_FLUSH_TEXT(this);

        if (this._bInitSelectAll) {
            for (var i = 0, list = this.getItems(), o; o = list[i++];) {
                !o._bSelectAllBtn && o.setSelected(true);
            }
        }
    };

    /**
     * 控件移除子控件事件的默认处理。
     * 选项组移除子选项时需要额外移除引用。
     * @protected
     *
     * @param {ecui.ui.Item} child 选项控件
     */
    UI_MULTI_SELECT_CLASS.$remove = function (item) {
        UI_SELECT_CLASS.$remove.call(this, item);
        this.getMain().removeChild(item._eInput);
    };

    /**
     * 设置控件的大小。
     * @protected
     *
     * @param {number} width 宽度，如果不需要设置则将参数设置为等价于逻辑非的值
     * @param {number} height 高度，如果不需要设置则省略此参数
     */
    UI_MULTI_SELECT_CLASS.$setSize = UI_SELECT_CLASS.$setSize;

    /**
     * 获取全部选中的选项控件。
     * @protected
     *
     * @return {Array} 选项控件列表
     */
    UI_MULTI_SELECT_CLASS.getSelected = function () {
        for (var i = 0, list = this.getItems(), o, result = []; o = list[i++];) {
            if (o.isSelected() && !o._bSelectAllBtn) {
                result.push(o);
            }
        }
        return result;
    };

    UI_MULTI_SELECT_CLASS.getValue = function () {
        var items = this.getSelected(),
            res = [], i, len;
        for (i = 0, len = items.length; i < len; i++) {
            if (!items[i]._bSelectAllBtn) {
                res.push(items[i]._eInput.value);
            }
        }
        return res;
    };

    /**
     * 获取全部选项的值
     * @return {Array} 所有选项的值的列表
     */
    UI_MULTI_SELECT_CLASS.getAllValue = function () {
        var items = this.getItems();
        var res = [];
        var i = 0;
        for (i = 0; i < items.length; i++) {
            if (!items[i]._bSelectAllBtn) {
                res.push(items[i].getValue());
            }
        }
        return res;
    };

    UI_MULTI_SELECT_CLASS.selectAll = function () {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            !o._bSelectAllBtn && o.setSelected(true);
        }
    };

    UI_MULTI_SELECT_CLASS.isSelectAll = function () {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            if (!o.isSelected()) {
                return false;
            }
        }
        return true;
    };

    UI_MULTI_SELECT_CLASS.clear = function () {

        var items = this.getItems() || [];
        var len = items.length;
        var last = (this._bSelectAllBtn) ? 1 : 0;

        while (len-- > last) {
            this.remove(len);
        }

        this._uOptions.reset();

        //清空掉的时候 要把全部去掉
        setTimeout(function () {
            if (last == 1) {
                items[0].setSelected(false);
            }
        }, 0);
    };

    /**
     * 设置下拉框允许显示的选项数量。
     * 如果实际选项数量小于这个数量，没有影响，否则将出现垂直滚动条，通过滚动条控制其它选项的显示。
     * @public
     *
     * @param {number} value 显示的选项数量，必须大于 1
     */
    UI_MULTI_SELECT_CLASS.setOptionSize = UI_SELECT_CLASS.setOptionSize;

    /**
     * 设置控件的值。
     * @public
     *
     * @param {Array/String} values 控件被选中的值列表
     */
    UI_MULTI_SELECT_CLASS.setValue = function (values) {
        if ('[object Array]' != Object.prototype.toString.call(values)) {
            values = values.toString().split(',');
        }
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            o.setSelected(indexOf(values, o._eInput.value) >= 0);
        }
        UI_MULTI_SELECT_FLUSH_SELECTALL(this);
        UI_MULTI_SELECT_FLUSH_TEXT(this);
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Listbox - 定义了多项选择的基本操作。
 多选框控件，继承自截面控件，实现了选项组接口，多个交换框，可以将选中的选项在互相之间移动。多选框控件也可以单独的使用，选中的选项在表单提交时将被提交。

 多选框控件直接HTML初始化的例子:
 <div ecui="type:listbox;name:test">
 <!-- 这里放选项内容 -->
 <li>选项</li>
 ...
 </div>

 属性
 _sName  - 多选框内所有input的名称

 选项属性
 _eInput - 选项对应的input，form提交时使用
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        undefined,

        getText = dom.getText,
        setInput = dom.setInput,
        extend = util.extend,

        inheritsControl = core.inherits,

        UI_PANEL = ui.Panel,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化多选框控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    ///__gzip_original__UI_LISTBOX
    ///__gzip_original__UI_LISTBOX_ITEM
    var UI_LISTBOX = ui.Listbox =
            inheritsControl(
                UI_PANEL,
                'ui-listbox',
                function (el, options) {
                    options.hScroll = false;
                },
                function (el, options) {
                    this._sName = options.name || '';
                    this.$initItems();
                }
            ),
        UI_LISTBOX_CLASS = UI_LISTBOX.prototype,

        /**
         * 初始化多选框控件的选项部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_LISTBOX_ITEM_CLASS = (UI_LISTBOX_CLASS.Item = inheritsControl(
            UI_ITEM,
            null,
            null,
            function (el, options) {
                el.appendChild(this._eInput = setInput(null, options.parent._sName, 'hidden')).value =
                    options.value === undefined ? getText(el) : options.value;
                this.setSelected(!!options.selected);
            }
        )).prototype;
//{else}//
    extend(UI_LISTBOX_CLASS, UI_ITEMS);

    /**
     * @override
     */
    UI_LISTBOX_ITEM_CLASS.$click = function (event) {
        UI_ITEM_CLASS.$click.call(this, event);
        this.setSelected(!this.isSelected());
    };

    /**
     * @override
     */
    UI_LISTBOX_ITEM_CLASS.$dispose = function () {
        this._eInput = null;
        UI_ITEM_CLASS.$dispose.call(this);
    };

    /**
     * @override
     */
    UI_LISTBOX_ITEM_CLASS.$setParent = function (parent) {
        UI_ITEM_CLASS.$setParent.call(this, parent);

        if (parent instanceof UI_LISTBOX) {
            this._eInput = setInput(this._eInput, parent._sName);
        }
    };

    /**
     * 判断多选框的选项控件是否被选中。
     * @public
     *
     * @return {boolean} 选项是否被选中
     */
    UI_LISTBOX_ITEM_CLASS.isSelected = function () {
        return !this._eInput.disabled;
    };

    /**
     * 设置选中状态。
     * @public
     *
     * @param {boolean} status 是否选中，默认为选中
     */
    UI_LISTBOX_ITEM_CLASS.setSelected = function (status) {
        if (status === true) {
            this.alterClass('+selected');
            this._eInput.disabled = status === false
        } else {
            this.alterClass('-selected');
            this._eInput.disabled = status === false
        }
        //this.alterClass('selected', this._eInput.disabled = status === false);
    };

    /**
     * @override
     */
    UI_LISTBOX_CLASS.$alterItems = function () {
        //__transform__items_list
        var items = this.getItems(),
            vscroll = this.$getSection('VScrollbar'),
            step = items.length && items[0].getHeight();

        if (step) {
            vscroll.setStep(step);
            this.setItemSize(
                this.getBodyWidth() - (items.length * step > this.getBodyHeight() ? vscroll.getWidth() : 0),
                step
            );
            this.$setSize(0, this.getHeight() > 0 ? this.getHeight() : items.length * step);
            if (this.$$height >= this.getHeight()) {
                vscroll.hide();
            }
        }
    };

    /**
     * 获取控件的表单项名称。
     * 多选框控件可以在表单中被提交，getName 方法返回提交时用的表单项名称，表单项名称可以使用 setName 方法改变。
     * @public
     *
     * @return {string} 表单项名称
     */
    UI_LISTBOX_CLASS.getName = function () {
        return this._sName;
    };

    /**
     * 获取所有选中的选项。
     * @public
     *
     * @return {Array} 选项数组
     */
    UI_LISTBOX_CLASS.getSelected = function () {
        for (var i = 0, list = this.getItems(), o, result = []; o = list[i++];) {
            if (o.isSelected()) {
                result.push(o._eInput.value);
            }
        }
        return result;
    };

    /**
     * 选中所有的选项。
     * 某些场景下，需要多选框控件的内容都可以被提交，可以在表单的 onsubmit 事件中调用 selectAll 方法全部选择。
     * @public
     */
    UI_LISTBOX_CLASS.selectAll = function () {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            o.setSelected();
        }
    };

    /**
     * 设置控件的表单项名称。
     * 多选框控件可以在表单中被提交，setName 方法设置提交时用的表单项名称，表单项名称可以使用 getName 方法获取。
     * @public
     *
     * @param {string} name 提交用的名称
     */
    UI_LISTBOX_CLASS.setName = function (name) {
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            // 需要将下属所有的输入框名称全部改变
            o._eInput = setInput(o._eInput, name);
        }
        this._sName = name;
    };
//{/if}//
//{if 0}//
})();
//{/if}//
/*
 MonthView - 定义日历显示的基本操作。
 日历视图控件，继承自基础控件，不包含年/月/日的快速选择与切换，如果需要实现这些功能，请将下拉框(选择月份)、输入框(输入年份)等组合使用建立新的控件或直接在页面上布局并调用接口。

 日历视图控件直接HTML初始化的例子:
 <div ecui="type:month-view;year:2009;month:11"></div>

 属性
 _nYear      - 年份
 _nMonth     - 月份(0-11)
 _aCells     - 日历控件内的所有单元格，其中第0-6项是日历的头部星期名称
 _oBegin     - 起始日期 小于这个日期的日历单元格会被disabled
 _oEnd       - 结束日期 大于这个日期的日历单元格会被disabled
 _oDate      - 当前选择日期
 _uSelected  - 当前选择的日历单元格

 子控件属性
 _nDay       - 从本月1号开始计算的天数，如果是上个月，是负数，如果是下个月，会大于当月最大的天数
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,

        DATE = Date,

        indexOf = array.indexOf,
        addClass = dom.addClass,
        getParent = dom.getParent,
        removeClass = dom.removeClass,
        setText = dom.setText,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_MONTH_VIEW
    ///__gzip_original__UI_MONTH_VIEW_CLASS
    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_MONTH_VIEW = ui.MonthView =
            inheritsControl(
                UI_CONTROL,
                'ui-monthview',
                function (el, options) {
                    var i = 0,
                        type = this.getType(),
                        list = [];

                    el.style.overflow = 'auto';

                    for (; i < 7;) {
                        list[i] =
                            '<td class="' + type + '-title' + this.Cell.TYPES + '">' +
                            UI_MONTH_VIEW.WEEKNAMES[i++] + '</td>';
                    }
                    list[i] = '</tr></thead><tbody><tr>';
                    for (; ++i < 50;) {
                        list[i] =
                            '<td class="' + type + '-item' + this.Cell.TYPES + '"></td>' +
                            (i % 7 ? '' : '</tr><tr>');
                    }

                    el.innerHTML =
                        '<table cellspacing="0"><thead><tr>' + list.join('') + '</tr></tbody></table>';
                },
                function (el, options) {
                    this._aCells = [];
                    for (var i = 0, list = el.getElementsByTagName('TD'), o; o = list[i];) {
                        // 日历视图单元格禁止改变大小
                        this._aCells[i++] = $fastCreate(this.Cell, o, this, {resizable: false});
                    }

                    this._oBegin = new Date(options.begin);
                    this._oEnd = new Date(options.end);

                    this.setView(options.year, options.month);
                }
            ),
        UI_MONTH_VIEW_CLASS = UI_MONTH_VIEW.prototype;

    /**
     * 初始化日历控件的单元格部件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    UI_MONTH_VIEW_CELL_CLASS = (UI_MONTH_VIEW_CLASS.Cell = inheritsControl(UI_CONTROL)).prototype;
//{else}//
    UI_MONTH_VIEW.WEEKNAMES = ['一', '二', '三', '四', '五', '六', '日'];

    /**
     * 选中某个日期单元格
     * @private
     *
     * @param {Object} 日期单元格对象
     */
    function UI_MONTH_VIEW_CLASS_SETSELECTED(control, o) {
        if (control._uSelected == o) {
            return;
        }

        if (control._uSelected) {
            control._uSelected.alterClass('-selected');
        }

        if (o) {
            o.alterClass('+selected');
        }
        control._uSelected = o;
    };

    /**
     * 点击时，根据单元格类型触发相应的事件。
     * @override
     */
    UI_MONTH_VIEW_CELL_CLASS.$click = function (event) {
        var parent = this.getParent(),
            index = indexOf(parent._aCells, this),
            curDate = parent._oDate;

        if (index < 7) {
            triggerEvent(parent, 'titleclick', event, [index]);
        }
        else {
            index = new DATE(parent._nYear, parent._nMonth, this._nDay);
            //change事件可以取消，返回false会阻止选中 && triggerEvent(parent, 'change', event, [index])
            triggerEvent(parent, 'change', event, [index]);
            if ((!curDate || index.getTime() != curDate.getTime())) {
                parent._oDate = new DATE(parent._nYear, parent._nMonth, this._nDay);
                UI_MONTH_VIEW_CLASS_SETSELECTED(parent, this);
            }
        }
    };

    /**
     * 获取日历控件当前显示的月份。
     * @public
     *
     * @return {number} 月份(1-12)
     */
    UI_MONTH_VIEW_CLASS.getMonth = function () {
        return this._nMonth + 1;
    };

    /**
     * 获取日历控件当前显示的年份。
     * @public
     *
     * @return {number} 年份(19xx-20xx)
     */
    UI_MONTH_VIEW_CLASS.getYear = function () {
        return this._nYear;
    };

    /**
     * 日历显示移动指定的月份数。
     * 参数为正整数则表示向当前月份之后的月份移动，负数则表示向当前月份之前的月份移动，设置后日历控件会刷新以显示新的日期。
     * @public
     *
     * @param {number} offsetMonth 日历移动的月份数
     */
    UI_MONTH_VIEW_CLASS.move = function (offsetMonth) {
        var time = new DATE(this._nYear, this._nMonth + offsetMonth, 1);
        this.setView(time.getFullYear(), time.getMonth() + 1);
    };

    /**
     * 设置日历的显示范围
     * 只有在两参数的闭区间外的日期单元格会被disabled
     * @public
     *
     * @param {Date} begin 起始日期，如果为null则表示不设置起始日期
     * @param {Date} end 结束日期，如果为null则表示不设置结束日期
     * @param {Boolean} isSilent 如果为true则只设置不刷新页面
     */
    UI_MONTH_VIEW_CLASS.setRange = function (begin, end, isSilent) {
        this._oBegin = begin;
        this._oEnd = end;
        if (!isSilent) {
            this.setView(this.getYear(), this.getMonth());
        }
    };

    /**
     * 设置日历当前选择日期，并切换到对应的月份
     * @public
     *
     * @param {Date} date 日期
     */
    UI_MONTH_VIEW_CLASS.setDate = function (date) {
        this.$setDate(date);
        this.setView(date.getFullYear(), date.getMonth() + 1);
    };

    /**
     * 获取当前日历选择的日期
     * @public
     *
     * @return {Date} 日期
     */
    UI_MONTH_VIEW_CLASS.getDate = function () {
        return this._oDate;
    };

    /*
     * 设置日历的当前选择日历
     * @private
     *
     * @param {Date} date 日期
     */
    UI_MONTH_VIEW_CLASS.$setDate = function (date) {
        this._oDate = date ? new DATE(date.getFullYear(), date.getMonth(), date.getDate()) : null;
    };

    /**
     * 设置日历控件当前显示的月份。
     * @public
     *
     * @param {number} year 年份(19xx-20xx)，如果省略使用浏览器的当前年份
     * @param {number} month 月份(1-12)，如果省略使用浏览器的当前月份
     */
    UI_MONTH_VIEW_CLASS.setView = function (year, month) {
        //__gzip_original__date
        var i = 7,
            today = new DATE(),
            year = year || today.getFullYear(),
            month = month ? month - 1 : today.getMonth(),
        // 得到上个月的最后几天的信息，用于补齐当前月日历的上月信息位置
            o = new DATE(year, month, 0),
            day = 1 - o.getDay(),
            lastDayOfLastMonth = o.getDate(),
        // 得到当前月的天数
            lastDayOfCurrMonth = new DATE(year, month + 1, 0).getDate(),
            begin = this._oBegin, end = this._oEnd, selected = this._oDate,
            curDate;

        this._nYear = year;
        this._nMonth = month;

        //设置日期范围
        //begin = begin && begin.getFullYear() == year && begin.getMonth() == month ? begin.getDate() : 0 ;
        //end = end && end.getFullYear() == year && end.getMonth() == month ? end.getDate() : 31;
        begin = begin ? new Date(begin.getFullYear(), begin.getMonth(), begin.getDate()).getTime() : 0
        end = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime() : Number.MAX_VALUE;

        selected = selected && selected.getFullYear() == year && selected.getMonth() == month ? selected.getDate() : 0;

        UI_MONTH_VIEW_CLASS_SETSELECTED(this, null);

        for (; o = this._aCells[i++];) {
            if (month = day > 0 && day <= lastDayOfCurrMonth) {
                curDate = new Date(this._nYear, this._nMonth, day).getTime();
                if (begin > curDate || end < curDate) {
                    o.disable();
                }
                else {
                    o.enable();
                    //恢复选择的日期
                    if (day == selected) {
                        UI_MONTH_VIEW_CLASS_SETSELECTED(this, o);
                    }
                }
            }
            else {
                o.disable();
            }

            if (i == 36 || i == 43) {
                (o.isDisabled() ? addClass : removeClass)(getParent(o.getOuter()), this.getType() + '-extra');
            }

            setText(
                o.getBody(),
                month ? day : day > lastDayOfCurrMonth ? day - lastDayOfCurrMonth : lastDayOfLastMonth + day
            );
            o._nDay = day++;
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 MonthViewOnly - 定义月日历显示的基本操作。

 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,

        DATE = Date,

        indexOf = array.indexOf,
        addClass = dom.addClass,
        getParent = dom.getParent,
        removeClass = dom.removeClass,
        setText = dom.setText,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_MONTH_VIEW
    ///__gzip_original__UI_MONTH_VIEW_CLASS
    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    控件的年份
     * month   控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_MONTH_VIEW_ONLY = ui.MonthViewOnly =
            inheritsControl(
                UI_CONTROL,
                'ui-monthviewonly',
                function (el, options) {
                    var type = this.getType(),
                        list = [];
                    el.style.overflow = 'auto';

                    for (var i = 0; i < 12; i++) {
                        list.push('<td class="' + type + '-item'
                            + this.Cell.TYPES + '">'
                            + UI_MONTH_VIEW_ONLY.MONTH[i] + "月"
                            + '</td>'
                            + ((i + 1) % 3 ? '' : '</tr><tr>'));
                    }

                    el.innerHTML =
                        '<table cellspacing="0"><tbody><tr>'
                        + list.join('')
                        + '</tr></tbody></table>';
                },
                function (el, options) {
                    this._aCells = [];
                    for (var i = 0, list = el.getElementsByTagName('TD'), o;
                         o = list[i];) {
                        // 日历视图单元格禁止改变大小
                        var cell = $fastCreate(
                            this.Cell, o, this,
                            {resizable: false}
                        );
                        cell._nMonth = i + 1;
                        this._aCells[i++] = cell;
                    }
                    this._nMonth = options.month || 1;
                    this._nYear = options.year || (new Date()).getFullYear();
                    this.setView(this._nYear, this._nMonth);
                }
            ),
        UI_MONTH_VIEW_ONLY_CLASS = UI_MONTH_VIEW_ONLY.prototype,

        /**
         * 初始化日历控件的单元格部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_MONTH_VIEW_ONLY_CELL_CLASS = (UI_MONTH_VIEW_ONLY_CLASS.Cell =
            inheritsControl(UI_CONTROL)).prototype;
//{else}//
    UI_MONTH_VIEW_ONLY.MONTH = ['一', '二', '三', '四', '五', '六', '七', "八", "九", "十", "十一", "十二"];

    /**
     * 选中某个日期单元格
     * @private
     *
     * @param {Object} 日期单元格对象
     */
    function UI_MONTH_VIEW_ONLY_CLASS_SETSELECTED(control, o) {
        if (control._uSelected == o) {
            return;
        }

        if (control._uSelected) {
            control._uSelected.alterClass('-selected');
        }

        if (o) {
            o.alterClass('+selected');
        }
        control._uSelected = o;
    }

    /**
     * 点击时，根据单元格类型触发相应的事件。
     * @override
     */
    UI_MONTH_VIEW_ONLY_CELL_CLASS.$click = function (event) {
        var parent = this.getParent();
        var curMonth = parent._nMonth;

        //change事件可以取消，返回false会阻止选中
        if (curMonth != this._nMonth) {
            parent._nMonth = this._nMonth;
            triggerEvent(parent, 'change', event, [this._nMonth]);
            UI_MONTH_VIEW_ONLY_CLASS_SETSELECTED(parent, this);
        }
    };

    /**
     * 获取日历控件当前显示的月份。
     * @public
     *
     * @return {number} 月份(1-12)
     */
    UI_MONTH_VIEW_ONLY_CLASS.getMonth = function () {
        return this._nMonth;
    };

    /**
     * 获取日历控件当前显示的年份。
     * @public
     *
     * @return {number} 年份(19xx-20xx)
     */
    UI_MONTH_VIEW_ONLY_CLASS.getYear = function () {
        return this._nYear;
    };

    /**
     * 日历显示移动指定的月份数。
     * 参数为正整数则表示向当前月份之后的月份移动，
     * 负数则表示向当前月份之前的月份移动，设置后日历控件会刷新以显示新的日期。
     * @public
     *
     * @param {number} offsetMonth 日历移动的月份数
     */
    UI_MONTH_VIEW_ONLY_CLASS.move = function (offsetMonth) {
        this.setView(this._nYear, this._nMonth + offsetMonth);
    };

    UI_MONTH_VIEW_ONLY_CLASS.clear = function () {
        this._uSelected = null;
        for (var i = 0, item; item = this._aCells[i++];) {
            item.alterClass('-selected');
        }
    };

    /**
     * 设置日历控件当前显示的月份。
     * @public
     *
     * @param {number} year 年份(19xx-20xx)，如果省略使用浏览器的当前年份
     * @param {number} month 月份(1-12)，如果省略使用浏览器的当前月份
     */
    UI_MONTH_VIEW_ONLY_CLASS.setView = function (year, month) {
        this._nYear = year;
        this._nMonth = month;
        UI_MONTH_VIEW_ONLY_CLASS_SETSELECTED(this, this._aCells[month - 1]);
    };
})();


(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        util = core.util,

        DATE = Date,
        REGEXP = RegExp,
        DOCUMENT = document,

        pushArray = array.push,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        moveElements = dom.moveElements,
        setText = dom.setText,
        formatDate = string.formatDate,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_SELECT = ui.easySelect,
        BEGIN_YEAR = 2002,
        END_YEAR = (new Date()).getFullYear(),
        UI_MONTH_VIEW_ONLY = ui.MonthViewOnly,
        UI_MONTH_VIEW_CELL = UI_MONTH_VIEW_ONLY.Cell;

    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_MONTH_CALENDAR = ui.MonthCalendar =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-month-calendar',
                function (el, options) {
                    var type = this.getTypes()[0];

                    options.hidden = true;
                    el.innerHTML = '<span class="' + type + '-text"></span>' +
                        '<span class="' + type + '-cancel"></span>' +
                        '<span class="' + type + '-button"></span>';
                },
                function (el, options) {
                    var child = children(el),
                        type = this.getTypes()[0],
                        o = createDom(type + '-panel',
                            'position:absolute;display:none');

                    this._bTip = options.tip !== false;
                    this._nYear = options.year;
                    this._nMonth = options.month;

                    this._eText = child[0];

                    this._uCancel = $fastCreate(this.Cancel, child[1], this);
                    this._uButton = $fastCreate(UI_CONTROL, child[2], this);

                    DOCUMENT.body.appendChild(o);
                    this._uPanel = $fastCreate(this.Panel, o, this, options);

                    if (options.hideCancel == true) {
                        this._bHideCancel = true;
                        this._uCancel.$hide();
                    }
                }
            ),

        UI_MONTH_CALENDAR_CLASS = UI_MONTH_CALENDAR.prototype,
        UI_MONTH_CALENDAR_CANCEL_CLASS = (UI_MONTH_CALENDAR_CLASS.Cancel = inheritsControl(UI_CONTROL)).prototype,

        UI_MONTH_CALENDAR_PANEL = UI_MONTH_CALENDAR_CLASS.Panel =
            inheritsControl(
                UI_CONTROL,
                'ui-month-calendar-panel',
                function (el, options) {
                    var html = [],
                        year = (new DATE()).getFullYear(),
                        beginYear = options.beginYear || BEGIN_YEAR,
                        endYear = options.endYear || END_YEAR,
                        type = this.getTypes()[0];

                    html.push('<div class="' + type + '-buttons"><div class="' + type + '-btn-prv' + UI_BUTTON.TYPES + '"></div>' +
                        '<select class="' + type + '-slt-year' + UI_SELECT.TYPES + '">');
                    for (var i = beginYear; i < endYear + 1; i++) {
                        html.push('<option value="' + i + '">' + i + '</option>');
                    }
                    html.push('</select>');
                    html.push('<div class="' + type + '-btn-nxt' + UI_BUTTON.TYPES + '"></div></div>');
                    html.push('<div class="' + type + '-month-view' + UI_MONTH_VIEW_ONLY.TYPES + '"></div>');
                    el.innerHTML = html.join('');
                },
                function (el, options) {
                    var html = [], o, i,
                        type = this.getTypes()[0],
                        buttonClass = this.Button,
                        selectClass = this.Select,
                        beginYear = options.beginYear || BEGIN_YEAR,
                        endYear = options.endYear || END_YEAR,
                        monthViewClass = this.MonthViewOnly;

                    el = children(el);
                    o = children(el[0]);
                    this._beginYear = beginYear;
                    this._endYear = endYear;
                    this._uPrvBtn = $fastCreate(buttonClass, o[0], this);
                    this._uPrvBtn._nStep = -1;
                    this._uYearSlt = $fastCreate(selectClass, o[1], this);
                    this._uNxtBtn = $fastCreate(buttonClass, o[2], this);
                    this._uNxtBtn._nStep = 1;

                    el = el[1];
                    this._uMonthView = $fastCreate(monthViewClass, el, this);
                    this._uYearSlt.setValue((new Date()).getFullYear());
                }
            ),

        UI_MONTH_CALENDAR_PANEL_CLASS = UI_MONTH_CALENDAR_PANEL.prototype,
        UI_MONTH_CALENDAR_PANEL_BUTTON_CLASS = (UI_MONTH_CALENDAR_PANEL_CLASS.Button = inheritsControl(UI_BUTTON, null)).prototype,
        UI_MONTH_CALENDAR_PANEL_SELECT_CLASS = (UI_MONTH_CALENDAR_PANEL_CLASS.Select = inheritsControl(UI_SELECT, null)).prototype,
        UI_MONTH_CALENDAR_PANEL_MONTHVIEW_CLASS = (UI_MONTH_CALENDAR_PANEL_CLASS.MonthViewOnly = inheritsControl(UI_MONTH_VIEW_ONLY, null)).prototype,

        UI_MONTH_CALENDAR_STR_DEFAULT = '<span class="ui-calendar-default">请选择一个日期</span>';

    // 是否显示取消按钮
    function UI_CALENDAR_TEXT_FLUSH(con) {
        var el = con._eText;
        if (el.innerHTML == '') {
            con._uCancel.hide();
            if (con._bTip) {
                el.innerHTML = UI_MONTH_CALENDAR_STR_DEFAULT;
            }
        }
        else if (!con._bHideCancel) {
            con._uCancel.show();
        }
    }

    /**
     * 获得单日历控件的年份
     */
    UI_MONTH_CALENDAR_CLASS.getYear = function () {
        return this._nYear;
    };
    /**
     * 获得单日历控件的月份
     */
    UI_MONTH_CALENDAR_CLASS.getMonth = function () {
        return this._nMonth;
    };

    /**
     * @func 设置日期
     * @param date
     */
    UI_MONTH_CALENDAR_CLASS.setDate = function (year, month) {
        var ntxt = year && month ?
        year + "年" + (month > 9 ? month : "0" + month) + "月" :
            "";

        // 隐藏面板
        if (this._uPanel.isShow()) {
            this._uPanel.hide();
        }
        // 设置输入框的值
        this._eText.innerHTML = ntxt;
        // 设置日期控件的值为选中的值
        this.setValue(ntxt);
        this._nYear = year;
        this._nMonth = month;
        // 是否显示 清除按钮
        UI_CALENDAR_TEXT_FLUSH(this);
    };

    // 激活日期控件，显示面板
    UI_MONTH_CALENDAR_CLASS.$activate = function (event) {
        var panel = this._uPanel, con,
            pos = getPosition(this.getOuter()),
            posTop = pos.top + this.getHeight();

        UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
        if (!panel.isShow()) {
            panel.setDate(this._nYear, this._nMonth);
            con = getView();
            panel.show();
            panel.setPosition(
                pos.left + panel.getWidth() <= con.right ? pos.left : con.right - panel.getWidth() > 0 ? con.right - panel.getWidth() : 0,
                posTop + panel.getHeight() <= con.bottom ? posTop : pos.top - panel.getHeight() > 0 ? pos.top - panel.getHeight() : 0
            );
            setFocused(panel);
        }
    };

    UI_MONTH_CALENDAR_CLASS.$cache = function (style, cacheSize) {
        UI_INPUT_CONTROL_CLASS.$cache.call(this, style, cacheSize);
        this._uButton.cache(false, true);
        this._uPanel.cache(true, true);
    };

    // month-calendar 的初始化函数，每次初始化这个控件时都会调用
    UI_MONTH_CALENDAR_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this.setDate(this._nYear, this._nMonth);
        this._uPanel.init();
    };

    // calendar清空函数，回到原始状态
    UI_MONTH_CALENDAR_CLASS.clear = function () {
        this.setDate();
    };

    // 删除按钮的点击事件
    UI_MONTH_CALENDAR_CANCEL_CLASS.$click = function () {
        var par = this.getParent();

        UI_CONTROL_CLASS.$click.call(this);
        par.clear();
    };

    UI_MONTH_CALENDAR_CANCEL_CLASS.$activate = UI_BUTTON_CLASS.$activate;

    /**
     * Panel
     */
    UI_MONTH_CALENDAR_PANEL_CLASS.$blur = function () {
        this.hide();
    };

    /**
     * 设置日历面板的日期
     */
    UI_MONTH_CALENDAR_PANEL_CLASS.setDate = function (year, month) {
        var today = new Date();
        year = year || today.getFullYear();

        this._uYearSlt.setValue(year);
        this._uMonthView.setView(year, month);
        this.setView(year, month);
    };

    /**
     * 设置日历面板的展现年月
     */
    UI_MONTH_CALENDAR_PANEL_CLASS.setView = function (year, month) {
        var yearSlt = this._uYearSlt,
            monthView = this._uMonthView;

        year = year || (new Date()).getFullYear();
        yearSlt.setValue(year);
        year && monthView.setView(year, month);
    };

    /**
     * 获取当前日历面板视图的年
     */
    UI_MONTH_CALENDAR_PANEL_CLASS.getViewYear = function () {
        return this._uMonthView.getYear();
    };

    /**
     * 获取当前日历面板视图的月
     */
    UI_MONTH_CALENDAR_PANEL_CLASS.getViewMonth = function () {
        return this._uMonthView.getMonth();
    };

    UI_MONTH_CALENDAR_PANEL_CLASS.$cache = function (style, cacheSize) {
        this._uPrvBtn.cache(true, true);
        this._uNxtBtn.cache(true, true);
        this._uYearSlt.cache(true, true);
        this._uMonthView.cache(true, true);
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);
    };

    UI_MONTH_CALENDAR_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uYearSlt.init();
        this._uMonthView.init();
    };

    //面板的change事件
    UI_MONTH_CALENDAR_PANEL_CLASS.$change = function (event, month) {
        var par = this.getParent();
        var year = this._uYearSlt.getValue();
        if (triggerEvent(par, 'change', event, [year, month])) {
            par.setDate(year, month);
        }
        this.hide();
    };

    // 年选择框的change事件
    UI_MONTH_CALENDAR_PANEL_SELECT_CLASS.$change = function () {
        var panel = this.getParent(),
            view = panel.getParent(),
            yearSlt = panel._uYearSlt;
        var month = view._nYear == yearSlt.getValue() ? view._nMonth : null;
        panel.setView(yearSlt.getValue(), month);
    };
    /*UI_MONTH_CALENDAR_PANEL_BUTTON_CLASS.$click = function () {
     var step = this._nStep,
     panel = this.getParent(),
     date;

     date = new DATE(panel.getViewYear(), panel.getViewMonth() - 1 + step, 1);
     panel.setView(date.getFullYear(), date.getMonth() + 1);
     };*/

    // 点击 向前， 向后两个按钮的事件
    UI_MONTH_CALENDAR_PANEL_BUTTON_CLASS.$click = function () {
        var step = this._nStep,
            panel = this.getParent(),
            view = panel.getParent(),
            date;
        var curYear = panel._uYearSlt.getValue();
        var nextYear = curYear - 0 + step;
        if (nextYear < panel._beginYear) {
            nextYear = panel._endYear;
        }
        if (nextYear > panel._endYear) {
            nextYear = panel._beginYear;
        }
        panel._uMonthView.clear();
        if (nextYear == view._nYear) {
            panel._uMonthView.setView(nextYear, panel.getViewMonth());
        }
        panel._uYearSlt.setValue(nextYear);
    };

    // 重写moth-view-only的change方法
    UI_MONTH_CALENDAR_PANEL_MONTHVIEW_CLASS.$change = function (event, month) {
        triggerEvent(this.getParent(), 'change', event, [month]);
    };
})();

(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        util = core.util,

        DATE = Date,
        REGEXP = RegExp,
        DOCUMENT = document,

        pushArray = array.push,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        moveElements = dom.moveElements,
        setText = dom.setText,
        formatDate = string.formatDate,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_SELECT = ui.Select,
        UI_MONTH_VIEW = ui.MonthView,
        UI_MONTH_VIEW_CELL = UI_MONTH_VIEW.Cell;

    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CALENDAR = ui.Calendar =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-calendar',
                function (el, options) {
                    var type = this.getTypes()[0];

                    options.hidden = true;
                    el.innerHTML = '<span class="' + type + '-text"></span><span class="' + type + '-cancel"></span><span class="' + type + '-button"></span>';
                },
                function (el, options) {
                    var child = children(el),
                        type = this.getTypes()[0],
                        o = createDom(type + '-panel', 'position:absolute;display:none');

                    this._bTip = options.tip !== false;

                    if (options.date) {
                        var date = options.date.split('-');
                        this._oDate = new DATE(parseInt(date[0], 10), parseInt(date[1], 10) - 1, parseInt(date[2], 10));
                    }
                    else if (options.date === false) {
                        this._oDate = null
                    }
                    else {
                        this._oDate = new DATE();
                    }
                    var range = UI_CALENDAR_PARSE_RANGE(options.start, options.end);

                    this._eText = child[0];

                    this._uCancel = $fastCreate(this.Cancel, child[1], this);
                    this._uButton = $fastCreate(UI_CONTROL, child[2], this);

                    this._bCancelButton = options.cancelButton !== false;
                    if (!this._bCancelButton) {
                        this._uCancel.$hide();
                    }

                    DOCUMENT.body.appendChild(o);
                    this._uPanel = $fastCreate(this.Panel, o, this, {date: this._oDate, range: range});
                }
            ),

        UI_CALENDAR_CLASS = UI_CALENDAR.prototype,
        UI_CALENDAR_CANCEL_CLASS = (UI_CALENDAR_CLASS.Cancel = inheritsControl(UI_CONTROL)).prototype,

        UI_CALENDAR_PANEL = UI_CALENDAR_CLASS.Panel =
            inheritsControl(
                UI_CONTROL,
                'ui-calendar-panel',
                function (el, options) {
                    var html = [],
                        year = (new DATE()).getFullYear(),
                        type = this.getTypes()[0];
                    var today = new Date();
                    var startYear = today.getFullYear() - 5;
                    var endYear = today.getFullYear() + 5;
                    var startDate = options.range.begin;
                    var endDate = options.range.end;
                    if (startDate) {
                        startYear = startDate.getFullYear();
                    }
                    if (endDate) {
                        endYear = endDate.getFullYear();
                    }
                    html.push('<div class="' + type + '-buttons"><div class="' + type + '-btn-prv' + UI_BUTTON.TYPES +
                        '"></div><select class="' + type + '-slt-year' + UI_SELECT.TYPES + '">');

                    for (var i = startYear; i <= endYear; i++) {
                        html.push('<option value="' + i + '">' + i + '</option>');
                    }

                    html.push('</select><select class="' + type + '-slt-month' + UI_SELECT.TYPES + '">');

                    for (var i = 1; i <= 12; i++) {
                        html.push('<option value="' + i + '">' + (i < 10 ? '0' : '') + i + '</option>');
                    }

                    html.push('</select><div class="' + type + '-btn-nxt' + UI_BUTTON.TYPES + '"></div></div>');
                    html.push('<div class="' + type + '-month-view' + UI_MONTH_VIEW.TYPES + '"></div>');
                    el.innerHTML = html.join('');
                },
                function (el, options) {
                    var html = [], o, i,
                        type = this.getTypes()[0],
                        buttonClass = this.Button,
                        selectClass = this.Select,
                        monthViewClass = this.MonthView,
                        date = options.date;

                    el = children(el);
                    o = children(el[0]);

                    this._uPrvBtn = $fastCreate(buttonClass, o[0], this);
                    this._uPrvBtn._nStep = -1;
                    this._uYearSlt = $fastCreate(selectClass, o[1], this);
                    this._uMonthSlt = $fastCreate(selectClass, o[2], this);
                    this._uNxtBtn = $fastCreate(buttonClass, o[3], this);
                    this._uNxtBtn._nStep = 1;

                    el = el[1];
                    this._uMonthView = $fastCreate(monthViewClass, el, this,
                        {
                            begin: options.range.begin,
                            end: options.range.end
                        }
                    );
                }
            ),

        UI_CALENDAR_PANEL_CLASS = UI_CALENDAR_PANEL.prototype,
        UI_CALENDAR_PANEL_BUTTON_CLASS = (UI_CALENDAR_PANEL_CLASS.Button = inheritsControl(UI_BUTTON, null)).prototype,
        UI_CALENDAR_PANEL_SELECT_CLASS = (UI_CALENDAR_PANEL_CLASS.Select = inheritsControl(UI_SELECT, null)).prototype,
        UI_CALENDAR_PANEL_MONTHVIEW_CLASS = (UI_CALENDAR_PANEL_CLASS.MonthView = inheritsControl(UI_MONTH_VIEW, null)).prototype,

        UI_CALENDAR_STR_DEFAULT = '<span class="ui-calendar-default">请选择一个日期</span>',
        UI_CALENDAR_STR_PATTERN = 'yyyy-MM-dd';


    function UI_CALENDAR_PARSE_RANGE(begin, end) {
        var now = new Date(), res = null,
            o = [now.getFullYear(), now.getMonth(), now.getDate()], t,
            p = {y: 0, M: 1, d: 2};
        if (begin instanceof Date) {
            res = res || {};
            res.begin = begin;
        }
        else if (/^([-+]?)(\d+)([yMd])$/.test(begin)) {
            res = res || {};
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            res.begin = new Date(t[0], t[1], t[2]);
        }
        else if ('[object String]' == Object.prototype.toString.call(begin)) {
            res = res || {};
            begin = begin.split('-');
            res.begin = new Date(parseInt(begin[0], 10), parseInt(begin[1], 10) - 1, parseInt(begin[2], 10));
        }

        if (end instanceof Date) {
            res = res || {};
            res.end = end;
        }
        else if (/^([-+]?)(\d+)([yMd])$/.test(end)) {
            res = res || {};
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            res.end = new Date(t[0], t[1], t[2]);
        }
        else if ('[object String]' == Object.prototype.toString.call(end)) {
            res = res || {};
            end = end.split('-');
            res.end = new Date(parseInt(end[0], 10), parseInt(end[1], 10) - 1, parseInt(end[2], 10));
        }

        return res ? res : {};
    }

    function UI_CALENDAR_TEXT_FLUSH(con) {
        var el = con._eText;
        if (el.innerHTML == '') {
            con._uCancel.$hide();
            if (con._bTip) {
                el.innerHTML = UI_CALENDAR_STR_DEFAULT;
            }
        }
        else if (con._bCancelButton) {
            con._uCancel.show();
        }
    }

    /**
     * 获得单日历控件的日期
     */
    UI_CALENDAR_CLASS.getDate = function () {
        return this._oDate;
    };

    UI_CALENDAR_CLASS.setDate = function (date) {
        var panel = this._uPanel,
            ntxt = date != null ? formatDate(date, UI_CALENDAR_STR_PATTERN) : '';

        if (this._uPanel.isShow()) {
            this._uPanel.hide();
        }

        this._eText.innerHTML = ntxt;
        UI_INPUT_CONTROL_CLASS.setValue.call(this, ntxt);
        this._oDate = date;
        UI_CALENDAR_TEXT_FLUSH(this);
    };

    UI_CALENDAR_CLASS.setValue = function (str) {
        if (!str) {
            this.setDate(null);
        }
        else {
            str = str.split('-');
            this.setDate(new Date(parseInt(str[0], 10), parseInt(str[1], 10) - 1, parseInt(str[2], 10)));
        }
    };

    UI_CALENDAR_CLASS.$activate = function (event) {
        var panel = this._uPanel, con,
            pos = getPosition(this.getOuter()),
            posTop = pos.top + this.getHeight();

        UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
        if (!panel.isShow()) {
            panel.setDate(this.getDate());
            con = getView();
            panel.show();
            panel.setPosition(
                pos.left + panel.getWidth() <= con.right ? pos.left : con.right - panel.getWidth() > 0 ? con.right - panel.getWidth() : 0,
                posTop + panel.getHeight() <= con.bottom ? posTop : pos.top - panel.getHeight() > 0 ? pos.top - panel.getHeight() : 0
            );
            setFocused(panel);
        }
    };

    UI_CALENDAR_CLASS.$cache = function (style, cacheSize) {
        UI_INPUT_CONTROL_CLASS.$cache.call(this, style, cacheSize);
        this._uButton.cache(false, true);
        this._uPanel.cache(true, true);
    };

    UI_CALENDAR_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this.setDate(this._oDate);
        this._uPanel.init();
    };

    UI_CALENDAR_CLASS.clear = function () {
        this.setDate(null);
    };

    UI_CALENDAR_CLASS.setRange = function (begin, end) {
        this._uPanel._uMonthView.setRange(begin, end);
    };

    UI_CALENDAR_CANCEL_CLASS.$click = function () {
        var par = this.getParent(),
            panel = par._uPanel;

        UI_CONTROL_CLASS.$click.call(this);
        par.setDate(null);
    };

    UI_CALENDAR_CANCEL_CLASS.$activate = UI_BUTTON_CLASS.$activate;

    /**
     * Panel
     */
    UI_CALENDAR_PANEL_CLASS.$blur = function () {
        this.hide();
    };

    /**
     * 设置日历面板的日期
     */
    UI_CALENDAR_PANEL_CLASS.setDate = function (date) {
        var year = date != null ? date.getFullYear() : (new Date()).getFullYear(),
            month = date != null ? date.getMonth() + 1 : (new Date()).getMonth() + 1;

        this._uMonthView.$setDate(date);
        this.setView(year, month);
    };

    /**
     * 设置日历面板的展现年月
     */
    UI_CALENDAR_PANEL_CLASS.setView = function (year, month) {
        var monthSlt = this._uMonthSlt,
            yearSlt = this._uYearSlt,
            monthView = this._uMonthView;

        yearSlt.setValue(year);
        monthSlt.setValue(month);
        monthView.setView(year, month);
    };

    /**
     * 获取当前日历面板视图的年
     */
    UI_CALENDAR_PANEL_CLASS.getViewYear = function () {
        return this._uMonthView.getYear();
    };

    /**
     * 获取当前日历面板视图的月
     */
    UI_CALENDAR_PANEL_CLASS.getViewMonth = function () {
        return this._uMonthView.getMonth();
    };

    UI_CALENDAR_PANEL_CLASS.$cache = function (style, cacheSize) {
        this._uPrvBtn.cache(true, true);
        this._uNxtBtn.cache(true, true);
        this._uMonthSlt.cache(true, true);
        this._uYearSlt.cache(true, true);
        this._uMonthView.cache(true, true);
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);
    };

    UI_CALENDAR_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uMonthSlt.init();
        this._uYearSlt.init();
        this._uMonthView.init();
    };

    UI_CALENDAR_PANEL_CLASS.$change = function (event, date) {
        var par = this.getParent();
        par.setDate(date);
        if (triggerEvent(par, 'change', event, [date])) {
            par.setDate(date);
        }
        this.hide();
    };

    UI_CALENDAR_PANEL_SELECT_CLASS.$change = function () {
        var panel = this.getParent(),
            yearSlt = panel._uYearSlt,
            monthSlt = panel._uMonthSlt;

        panel.setView(yearSlt.getValue(), monthSlt.getValue());
    };

    UI_CALENDAR_PANEL_BUTTON_CLASS.$click = function () {
        var step = this._nStep,
            panel = this.getParent(),
            date;

        date = new DATE(panel.getViewYear(), panel.getViewMonth() - 1 + step, 1);
        panel.setView(date.getFullYear(), date.getMonth() + 1);
    };

    UI_CALENDAR_PANEL_MONTHVIEW_CLASS.$change = function (event, date) {
        triggerEvent(this.getParent(), 'change', event, [date]);
    };

})();
/**
 * 初始化日历控件。
 * options 对象支持的属性如下：
 * year    日历控件的年份
 * month   日历控件的月份(1-12)
 * date
 * hours
 * minutes
 * seconds
 * @public
 *
 * @param {Object} options 初始化选项
 */
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        util = core.util,

        DATE = Date,
        REGEXP = RegExp,
        DOCUMENT = document,

        pushArray = array.push,
        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getPosition = dom.getPosition,
        moveElements = dom.moveElements,
        setText = dom.setText,
        formatDate = string.formatDate,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_SELECT = ui.easySelect,
        UI_MONTH_VIEW = ui.MonthView,
        UI_MONTH_VIEW_CELL = UI_MONTH_VIEW.prototype.Cell;


    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_FULL_CALENDAR = ui.FullCalendar =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-full-calendar',
                function (el, options) {
                    var type = this.getTypes()[0];

                    options.hidden = true;
                    el.innerHTML = '<span class="' + type + '-text"></span><span class="' + type + '-cancel"></span><span class="' + type + '-button"></span>';
                },
                function (el, options) {
                    var child = children(el),
                        type = this.getTypes()[0],
                        o = createDom(type + '-panel', 'position:absolute;display:none');

                    this._bTip = options.tip !== false;

                    if (options.date) {
                        try {
                            var dateTime = options.date.split(" ");
                            var date = dateTime[0].split('-');
                            var time = dateTime[1].split(':');
                            this._oDate = new DATE(parseInt(date[0], 10), parseInt(date[1], 10) - 1, parseInt(date[2], 10), parseInt(time[0], 10), parseInt(time[1], 10), parseInt(time[2], 10));
                        } catch (e) {
                            this._oDate = new DATE();
                        }

                    }
                    else if (options.date === false) {
                        this._oDate = null
                    }
                    else {
                        this._oDate = new DATE();
                    }
                    var range = UI_CALENDAR_PARSE_RANGE(options.start, options.end);

                    this._eText = child[0];

                    this._uCancel = $fastCreate(this.Cancel, child[1], this);
                    this._uButton = $fastCreate(UI_CONTROL, child[2], this);

                    this._bCancelButton = options.cancelButton !== false;
                    if (!this._bCancelButton) {
                        this._uCancel.$hide();
                    }

                    DOCUMENT.body.appendChild(o);
                    this._uPanel = $fastCreate(this.Panel, o, this, {date: this._oDate, range: range});
                }
            ),

        UI_FULL_CALENDAR_CLASS = UI_FULL_CALENDAR.prototype,
        UI_FULL_CALENDAR_CANCEL_CLASS = (UI_FULL_CALENDAR_CLASS.Cancel = inheritsControl(UI_CONTROL)).prototype,

        UI_FULL_CALENDAR_PANEL = UI_FULL_CALENDAR_CLASS.Panel =
            inheritsControl(
                UI_CONTROL,
                'ui-calendar-panel',
                function (el, options) {
                    var html = [],
                        year = (new DATE()).getFullYear(),
                        type = this.getTypes()[0];
                    var today = new Date();
                    var startYear = today.getFullYear() - 5;
                    var endYear = today.getFullYear() + 5;
                    var startDate = options.range.begin;
                    var endDate = options.range.end;
                    if (startDate) {
                        startYear = startDate.getFullYear();
                    }
                    if (endDate) {
                        endYear = endDate.getFullYear();
                    }
                    html.push('<div class="' + type + '-buttons"><div class="' + type + '-btn-prv' + UI_BUTTON.TYPES +
                        '"></div><select class="' + type + '-slt-year' + UI_SELECT.TYPES + '">');

                    for (var i = startYear; i <= endYear; i++) {
                        html.push('<option value="' + i + '">' + i + '</option>');
                    }

                    html.push('</select><select class="' + type + '-slt-month' + UI_SELECT.TYPES + '">');

                    for (var i = 1; i <= 12; i++) {
                        html.push('<option value="' + i + '">' + (i < 10 ? '0' : '') + i + '</option>');
                    }

                    html.push('</select><div class="' + type + '-btn-nxt' + UI_BUTTON.TYPES + '"></div></div>');
                    html.push('<div class="' + type + '-month-view' + UI_MONTH_VIEW.TYPES + '"></div>');
                    html.push('<div class="' + type + '-time-view"><select class="' + type + '-slt-hours' + UI_SELECT.TYPES + '">');
                    for (var i = 0; i < 24; i++) {
                        i < 10 ? html.push('<option value="0' + i + '">0' + i + '</option>') :
                            html.push('<option value="' + i + '">' + i + '</option>');
                    }
                    html.push('<select>时 <select class="' + type + '-slt-minutes' + UI_SELECT.TYPES + '">');
                    for (var i = 0; i < 60; i++) {
                        i < 10 ? html.push('<option value="0' + i + '">0' + i + '</option>') :
                            html.push('<option value="' + i + '">' + i + '</option>');
                    }
                    html.push('<select>分 <select class="' + type + '-slt-seconds' + UI_SELECT.TYPES + '">');
                    for (var i = 0; i < 60; i++) {
                        i < 10 ? html.push('<option value="0' + i + '">0' + i + '</option>') :
                            html.push('<option value="' + i + '">' + i + '</option>');
                    }
                    html.push('</select>秒</div>');
                    el.innerHTML = html.join('');
                },
                function (el, options) {
                    var html = [], o, i,
                        type = this.getTypes()[0],
                        buttonClass = this.Button,
                        selectClass = this.Select,
                        monthViewClass = this.MonthView,
                        date = options.date,
                        self = this;

                    el = children(el);
                    o = children(el[0]);

                    this._uPrvBtn = $fastCreate(buttonClass, o[0], this);
                    this._uPrvBtn._nStep = -1;
                    this._uYearSlt = $fastCreate(selectClass, o[1], this);
                    this._uMonthSlt = $fastCreate(selectClass, o[2], this);
                    this._uNxtBtn = $fastCreate(buttonClass, o[3], this);
                    this._uNxtBtn._nStep = 1;

                    //时分秒
                    oo = children(el[2]);
                    this._uHoursSlt = $fastCreate(selectClass, oo[0], this);
                    this._uMinutesSlt = $fastCreate(selectClass, oo[1], this);
                    this._uSecondsSlt = $fastCreate(selectClass, oo[2], this);

                    this._uHoursSlt.$change = this._uMinutesSlt.$change = this._uSecondsSlt.$change = function (event) {
                        /* Act on the event */
                        var that = self.getParent();
                        var oldDate = that.getDate();
                        var date = new DATE(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), self._uHoursSlt.getValue(), self._uMinutesSlt.getValue(), self._uSecondsSlt.getValue());
                        that.refreshDate(date);
                    };

                    el = el[1];
                    this._uMonthView = $fastCreate(monthViewClass, el, this,
                        {
                            begin: options.range.begin,
                            end: options.range.end
                        }
                    );
                }
            ),

        UI_FULL_CALENDAR_PANEL_CLASS = UI_FULL_CALENDAR_PANEL.prototype,
        UI_FULL_CALENDAR_PANEL_BUTTON_CLASS = (UI_FULL_CALENDAR_PANEL_CLASS.Button = inheritsControl(UI_BUTTON, null)).prototype,
        UI_FULL_CALENDAR_PANEL_SELECT_CLASS = (UI_FULL_CALENDAR_PANEL_CLASS.Select = inheritsControl(UI_SELECT, null)).prototype,
        UI_FULL_CALENDAR_PANEL_MONTHVIEW_CLASS = (UI_FULL_CALENDAR_PANEL_CLASS.MonthView = inheritsControl(UI_MONTH_VIEW, null)).prototype,

        UI_FULL_CALENDAR_PANEL_MONTHVIEW_CELL_CLASS = (UI_FULL_CALENDAR_PANEL_CLASS.cell = inheritsControl(UI_FULL_CALENDAR_PANEL_MONTHVIEW_CLASS.Cell, null)).prototype,

        UI_FULL_CALENDAR_STR_DEFAULT = '<span class="ui-calendar-default">请选择一个日期</span>',
        UI_FULL_CALENDAR_STR_PATTERN = 'yyyy-MM-dd HH:mm:ss';


    function UI_CALENDAR_PARSE_RANGE(begin, end) {
        var now = new Date(), res = null,
            o = [now.getFullYear(), now.getMonth(), now.getDate()], t,
            p = {y: 0, M: 1, d: 2};
        if (begin instanceof Date) {
            res = res || {};
            res.begin = begin;
        }
        else if (/^([-+]?)(\d+)([yMd])$/.test(begin)) {
            res = res || {};
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            res.begin = new Date(t[0], t[1], t[2]);
        }
        else if ('[object String]' == Object.prototype.toString.call(begin)) {
            res = res || {};
            begin = begin.split('-');
            res.begin = new Date(parseInt(begin[0], 10), parseInt(begin[1], 10) - 1, parseInt(begin[2], 10));
        }

        if (end instanceof Date) {
            res = res || {};
            res.end = end;
        }
        else if (/^([-+]?)(\d+)([yMd])$/.test(end)) {
            res = res || {};
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            res.end = new Date(t[0], t[1], t[2]);
        }
        else if ('[object String]' == Object.prototype.toString.call(end)) {
            res = res || {};
            end = end.split('-');
            res.end = new Date(parseInt(end[0], 10), parseInt(end[1], 10) - 1, parseInt(end[2], 10));
        }

        return res ? res : {};
    }

    function UI_CALENDAR_TEXT_FLUSH(con) {
        var el = con._eText;
        if (el.innerHTML == '') {
            con._uCancel.$hide();
            if (con._bTip) {
                el.innerHTML = UI_FULL_CALENDAR_STR_DEFAULT;
            }
        }
        else if (con._bCancelButton) {
            con._uCancel.show();
        }
    }

    /**
     * 获得单日历控件的日期
     */
    UI_FULL_CALENDAR_CLASS.getDate = function () {
        return this._oDate;
    };

    UI_FULL_CALENDAR_CLASS.setDate = function (date) {
        var panel = this._uPanel,
            ntxt = date != null ? formatDate(date, UI_FULL_CALENDAR_STR_PATTERN) : '';

        if (this._uPanel.isShow()) {
            this._uPanel.hide();
        }

        this._eText.innerHTML = ntxt;
        UI_INPUT_CONTROL_CLASS.setValue.call(this, ntxt);
        this._oDate = date;
        UI_CALENDAR_TEXT_FLUSH(this);
    };
    UI_FULL_CALENDAR_CLASS.refreshDate = function (date) {
        var panel = this._uPanel,
            ntxt = date != null ? formatDate(date, UI_FULL_CALENDAR_STR_PATTERN) : '';

        this._eText.innerHTML = ntxt;
        UI_INPUT_CONTROL_CLASS.setValue.call(this, ntxt);
        this._oDate = date;
        UI_CALENDAR_TEXT_FLUSH(this);
    };

    UI_FULL_CALENDAR_CLASS.setValue = function (str) {
        var date = [], time = [];
        if (!str) {
            this.setDate(null);
        }
        else {
            try {
                str = str.split(' ');
                date = str[0].split('-');
                time = str[1].split(':');
                this.setDate(new Date(parseInt(date[0], 10), parseInt(date[1], 10) - 1, parseInt(date[2], 10), parseInt(time[0], 10), parseInt(time[1], 10), parseInt(time[2], 10)));
            } catch (e) {
                alert("日期时间格式不正确！");
            }
        }
    };

    UI_FULL_CALENDAR_CLASS.$activate = function (event) {
        var panel = this._uPanel, con,
            pos = getPosition(this.getOuter()),
            posTop = pos.top + this.getHeight();

        UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
        if (!panel.isShow()) {
            panel.setDate(this.getDate());
            con = getView();
            panel.show();
            panel.setPosition(
                pos.left + panel.getWidth() <= con.right ? pos.left : con.right - panel.getWidth() > 0 ? con.right - panel.getWidth() : 0,
                posTop + panel.getHeight() <= con.bottom ? posTop : pos.top - panel.getHeight() > 0 ? pos.top - panel.getHeight() : 0
            );
            setFocused(panel);
        }
    };

    UI_FULL_CALENDAR_CLASS.$cache = function (style, cacheSize) {
        UI_INPUT_CONTROL_CLASS.$cache.call(this, style, cacheSize);
        this._uButton.cache(false, true);
        this._uPanel.cache(true, true);
    };

    UI_FULL_CALENDAR_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this.setDate(this._oDate);
        this._uPanel.init();
    };

    UI_FULL_CALENDAR_CLASS.clear = function () {
        this.setDate(null);
    };

    UI_FULL_CALENDAR_CLASS.setRange = function (begin, end) {
        this._uPanel._uMonthView.setRange(begin, end);
    };

    UI_FULL_CALENDAR_CANCEL_CLASS.$click = function () {
        var par = this.getParent(),
            panel = par._uPanel;

        UI_CONTROL_CLASS.$click.call(this);
        par.setDate(null);
    };

    UI_FULL_CALENDAR_CANCEL_CLASS.$activate = UI_BUTTON_CLASS.$activate;

    /**
     * Panel
     */
    UI_FULL_CALENDAR_PANEL_CLASS.$blur = function () {
        this.hide();
    };

    /**
     * 设置日历面板的日期
     */
    UI_FULL_CALENDAR_PANEL_CLASS.setDate = function (date) {
        var year = date != null ? date.getFullYear() : (new Date()).getFullYear(),
            month = date != null ? date.getMonth() + 1 : (new Date()).getMonth() + 1;

        //设置时分秒
        hours = date != null ? date.getHours() : (new Date()).getHours();
        minutes = date != null ? date.getMinutes() : (new Date()).getMinutes();
        seconds = date != null ? date.getSeconds() : (new Date()).getSeconds();

        this._uMonthView.$setDate(date);
        this.setView(year, month, hours, minutes, seconds);
    };

    /**
     * 设置日历面板的展现年月
     */
    UI_FULL_CALENDAR_PANEL_CLASS.setView = function (year, month, hours, minutes, seconds) {
        var monthSlt = this._uMonthSlt,
            yearSlt = this._uYearSlt,
            monthView = this._uMonthView,

        //时分秒
            hoursSlt = this._uHoursSlt,
            minutesSlt = this._uMinutesSlt,
            secondsSlt = this._uSecondsSlt;

        yearSlt.setValue(year);
        monthSlt.setValue(month);

        hoursSlt.setValue(hours);
        minutesSlt.setValue(minutes);
        secondsSlt.setValue(seconds);

        monthView.setView(year, month);
    };

    /**
     * 获取当前日历面板视图的年
     */
    UI_FULL_CALENDAR_PANEL_CLASS.getViewYear = function () {
        return this._uMonthView.getYear();
    };

    /**
     * 获取当前日历面板视图的月
     */
    UI_FULL_CALENDAR_PANEL_CLASS.getViewMonth = function () {
        return this._uMonthView.getMonth();
    };
    /*得到时间控件的时间*/
    UI_FULL_CALENDAR_PANEL_CLASS.getViewHours = function () {
        return this._uHoursSlt.getValue();
    }
    /*得到时间控件的分钟*/
    UI_FULL_CALENDAR_PANEL_CLASS.getViewMinutes = function () {
        return this._uMinutesSlt.getValue();
    }
    /*得到时间控件的秒*/
    UI_FULL_CALENDAR_PANEL_CLASS.getViewSeconds = function () {
        return this._uSecondsSlt.getValue();
    }

    UI_FULL_CALENDAR_PANEL_CLASS.$cache = function (style, cacheSize) {
        this._uPrvBtn.cache(true, true);
        this._uNxtBtn.cache(true, true);
        this._uMonthSlt.cache(true, true);
        this._uYearSlt.cache(true, true);
        this._uMonthView.cache(true, true);

        //时分秒
        this._uHoursSlt.cache(true, true);
        this._uMinutesSlt.cache(true, true);
        this._uSecondsSlt.cache(true, true);

        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);
    };

    UI_FULL_CALENDAR_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uMonthSlt.init();
        this._uYearSlt.init();
        this._uMonthView.init();

        //时分秒
        this._uHoursSlt.init();
        this._uMinutesSlt.init();
        this._uSecondsSlt.init();
    };

    UI_FULL_CALENDAR_PANEL_CLASS.$change = function (event, date) {
        var par = this.getParent();
        if (triggerEvent(par, 'change', event, [date])) {
            par.setDate(date);
        }
        this.hide();
    };

    UI_FULL_CALENDAR_PANEL_SELECT_CLASS.$change = function (event) {
        var panel = this.getParent(),
            yearSlt = panel._uYearSlt,
            monthSlt = panel._uMonthSlt,

            hoursSlt = panel._uHoursSlt,
            minutesSlt = panel._uMinutesSlt,
            secondsSlt = panel._uSecondsSlt;
        panel.setView(yearSlt.getValue(), monthSlt.getValue(), hoursSlt.getValue(), minutesSlt.getValue(), secondsSlt.getValue());
    };

    UI_FULL_CALENDAR_PANEL_BUTTON_CLASS.$click = function () {
        var step = this._nStep,
            panel = this.getParent(),
            date;

        date = new DATE(panel.getViewYear(), panel.getViewMonth() - 1 + step, 1, panel._uHoursSlt.getValue(), panel._uMinutesSlt.getValue(), panel._uSecondsSlt.getValue());
        panel.setView(date.getFullYear(), date.getMonth() + 1, date.getHours(), date.getMinutes(), date.getSeconds());
    };

    UI_FULL_CALENDAR_PANEL_MONTHVIEW_CLASS.$change = function (event, date) {
        date = new DATE(date.getFullYear(), date.getMonth(), date.getDate(), this.getParent()._uHoursSlt.getValue(), this.getParent()._uMinutesSlt.getValue(), this.getParent()._uSecondsSlt.getValue());
        triggerEvent(this.getParent(), 'change', event, [date]);
    };

})();

(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        string = core.string,

        DATE = Date,
        REGEXP = RegExp,
        DOCUMENT = document,

        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        moveElements = dom.moveElements,
        formatDate = string.formatDate,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,
        UI_CALENDAR = ui.Calendar,
        UI_CALENDAR_CLASS = UI_CALENDAR.prototype,
        UI_CALENDAR_CANCEL_CLASS = UI_CALENDAR_CLASS.Cancel.prototype,
        UI_CALENDAR_PANEL = UI_CALENDAR_CLASS.Panel,

        UI_CALENDAR_STR_DEFAULT = '<span class="ui-calendar-default">请选择一个日期</span>',
        UI_MULTI_CALENDAR_STR_DEFAULT = '<span class="ui-multi-calendar-default">请选择时间范围</span>',
        UI_CALENDAR_STR_PATTERN = 'yyyy-MM-dd';

    /**
     * 初始化日历控件。
     * options 对象支持的属性如下：
     * year    日历控件的年份
     * month   日历控件的月份(1-12)
     * @public
     *
     * @param {Object} options 初始化选项
     */

    var UI_MULTI_CALENDAR = ui.MultiCalendar =
        inheritsControl(
            UI_CALENDAR,
            'ui-multi-calendar',
            function (el, options) {
                options.hidden = true;
                options.yearRange && (this._nYearRange = options.yearRange - 0);
                if (options.remind) {
                    UI_MULTI_CALENDAR_STR_DEFAULT = '<span class="ui-calendar-default">'
                        + options.remind
                        + '</span>';
                }
            },
            function (el, options) {
                var o = createDom(), els;

                o.innerHTML = '<input type="hidden" name="' + (options.beginname ? options.beginname : 'beginDate') + '" />'
                    + '<input type="hidden" name="' + (options.endname ? options.endname : 'endDate') + '" />';

                if (options.bdate) {
                    els = options.bdate.split('-');
                    this._oBegin = new Date(els[0], parseInt(els[1], 10) - 1, els[2]);
                }
                if (options.edate) {
                    els = options.edate.split('-');
                    this._oEnd = new Date(els[0], parseInt(els[1], 10) - 1, els[2]);
                }
                els = children(o);
                this._eBeginInput = els[0];
                this._eEndInput = els[1];

                moveElements(o, el, true);
            }
        );

    var UI_MULTI_CALENDAR_CLASS = UI_MULTI_CALENDAR.prototype;

    var UI_MULTI_CALENDAR_PANEL = UI_MULTI_CALENDAR_CLASS.Panel =
        inheritsControl(
            UI_CONTROL,
            'ui-multi-calendar-panel',
            function () {
            },
            function (el, options) {
                var type = this.getTypes()[0],
                    html = [], range = options.range || {};

                this._oRange = range;
                html.push('<div class="' + type + '-cal-area"><div class="' + type + '-text"><strong>起始时间：</strong><span></span></div><div class="' + UI_CALENDAR_PANEL.TYPES + '"></div></div>');
                html.push('<div class="' + type + '-cal-area"><div class="' + type + '-text"><strong>结束时间：</strong><span></span></div><div class="' + UI_CALENDAR_PANEL.TYPES + '"></div></div>');
                html.push('<div class="' + type + '-buttons"><div class="ui-button-g' + UI_BUTTON.TYPES + '">确定</div><div class="' + UI_BUTTON.TYPES + '">取消</div></div>');

                el.innerHTML = html.join('');
                el = children(el);

                this._eBeginText = el[0].firstChild.lastChild;
                this._eEndText = el[1].firstChild.lastChild;
                this._uBeginCal = $fastCreate(this.Cal, el[0].lastChild, this, {range: range});
                this._uBeginCal._sType = 'begin';
                this._uEndCal = $fastCreate(this.Cal, el[1].lastChild, this, {range: range});
                this._uEndCal._sType = 'end';
                this._uSubmitBtn = $fastCreate(this.Button, el[2].firstChild, this);
                this._uSubmitBtn._sType = 'submit';
                this._uCancelBtn = $fastCreate(this.Button, el[2].lastChild, this);
                this._uCancelBtn._sType = 'cancel';
            }
        );

    var UI_MULTI_CALENDAR_CANCEL_CLASS =
        (UI_MULTI_CALENDAR_CLASS.Cancel =
                inheritsControl(UI_CALENDAR_CLASS.Cancel)
        ).prototype;

    var UI_MULTI_CALENDAR_PANEL_CLASS = UI_MULTI_CALENDAR_PANEL.prototype;

    var UI_MULTI_CALENDAR_PANEL_CAL_CLASS = (
        UI_MULTI_CALENDAR_PANEL_CLASS.Cal =
            inheritsControl(UI_CALENDAR_PANEL)
    ).prototype;

    var UI_MULTI_CALENDAR_PANEL_BUTTON_CLASS =
        (UI_MULTI_CALENDAR_PANEL_CLASS.Button =
                inheritsControl(UI_BUTTON)
        ).prototype;

    function UI_MULTI_CALENDAR_TEXT_FLUSH(con) {
        var el = con._eText;
        if (el.innerHTML == '') {
            con._uCancel.hide();
            if (con._bTip) {
                el.innerHTML = UI_MULTI_CALENDAR_STR_DEFAULT;
            }
        }
        else {
            con._uCancel.show();
        }
    };

    UI_MULTI_CALENDAR_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this.setDate({begin: this._oBegin, end: this._oEnd});
        this._uPanel.init();
    };

    UI_MULTI_CALENDAR_CLASS.setDate = function (date) {
        var str = [], beginTxt, endTxt;

        if (date == null) {
            date = {begin: null, end: null};
        }

        beginTxt = date.begin ? formatDate(date.begin, UI_CALENDAR_STR_PATTERN) : '';
        endTxt = date.end ? formatDate(date.end, UI_CALENDAR_STR_PATTERN) : '';

        this._oBegin = date.begin;
        this._oEnd = date.end;
        this._eBeginInput.value = beginTxt;
        this._eEndInput.value = endTxt;
        this._eInput.value = beginTxt + ',' + endTxt;
        if (this._oBegin) {
            str.push(beginTxt);
        }
        if (this._oEnd) {
            str.push(endTxt);
        }
        if (str.length == 1) {
            str.push(this._oEnd ? '之前' : '之后');
            str = str.join('');
        }
        else if (str.length == 2) {
            str = str.join('至');
        }
        else {
            str = '';
        }
        this._eText.innerHTML = str;
        UI_MULTI_CALENDAR_TEXT_FLUSH(this);
    };

    UI_MULTI_CALENDAR_CLASS.getDate = function () {
        return {begin: this._oBegin, end: this._oEnd};
    };

    /**
     * @event
     * 点击输入框右侧的取消按钮时触发
     */
    UI_MULTI_CALENDAR_CANCEL_CLASS.$click = function () {
        var par = this.getParent();
        UI_CALENDAR_CANCEL_CLASS.$click.call(this);
        par.clearRange();
    };

    /**
     * 清除日历面板的range限制
     * @public
     */
    UI_MULTI_CALENDAR_CLASS.clearRange = function () {
        this._uPanel._oRange.begin = null;
        this._uPanel._oRange.end = null;
        this._uPanel._uBeginCal.setRange(null, null);
        this._uPanel._uEndCal.setRange(null, null);
    };

    UI_MULTI_CALENDAR_PANEL_CLASS.setDate = function (date) {
        var range = this._oRange,
            begin, end;

        this._oBeginDate = date.begin;
        this._oEndDate = date.end;

        if (date.begin) {
            this._eBeginText.innerHTML = formatDate(date.begin, UI_CALENDAR_STR_PATTERN);
        }
        else {
            this._eBeginText.innerHTML = '';
        }

        if (date.end) {
            this._eEndText.innerHTML = formatDate(date.end, UI_CALENDAR_STR_PATTERN);
        }
        else {
            this._eEndText.innerHTML = '';
        }

        end = range.end ? range.end : date.end;
        if (range.end && date.end && date.end.getTime() < range.end.getTime()) {
            end = date.end;
        }
        this._uBeginCal.setRange(range.begin, end, true);
        this._uBeginCal.setDate(date.begin);

        begin = range.begin ? range.begin : date.begin;
        if (range.begin && date.begin && date.begin.getTime() > range.begin.getTime()) {
            begin = date.begin;
        }
        this._uEndCal.setRange(begin, range.end, true);
        this._uEndCal.setDate(date.end);
    };

    UI_MULTI_CALENDAR_PANEL_CLASS.$blur = function () {
        UI_CONTROL_CLASS.$blur.call(this);
        this.hide();
    };

    /**
     * 隐藏日历面板，隐藏时需要调整range
     * @override
     */
    UI_MULTI_CALENDAR_PANEL_CLASS.hide = function () {
        UI_CONTROL_CLASS.hide.call(this);
        var par = this.getParent();
        var date = par.getDate();

        if (par._nYearRange) {
            if (date.end) {
                this._oRange.begin = new Date(date.end);
                this._oRange.begin.setFullYear(
                    this._oRange.begin.getFullYear() - par._nYearRange
                );
            }
            if (date.begin) {
                this._oRange.end = new Date(date.begin);
                this._oRange.end.setFullYear(
                    this._oRange.end.getFullYear() + par._nYearRange
                );
            }
        }
    };

    UI_MULTI_CALENDAR_PANEL_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        this._uBeginCal.init();
        this._uEndCal.init();
    };

    UI_MULTI_CALENDAR_PANEL_CLASS.$change = function () {
        var par = this.getParent(),
            beginDate = this._oBeginDate,
            endDate = this._oEndDate;

        if (triggerEvent(par, 'change', [beginDate, endDate])) {
            par.setDate({begin: beginDate, end: endDate});
        }
        this.hide();
    };

    UI_MULTI_CALENDAR_PANEL_CLASS.$setDate = function (date, type) {
        var key = type.charAt(0).toUpperCase()
            + type.substring(1);

        var par = this.getParent();

        this['_e' + key + 'Text'].innerHTML = formatDate(date, UI_CALENDAR_STR_PATTERN);
        this['_o' + key + 'Date'] = date;
        if (type == 'begin') {
            if (par._nYearRange) {
                this._oRange.end = new Date(date);
                this._oRange.end.setFullYear(this._oRange.end.getFullYear() + par._nYearRange);
            }
            this._uEndCal.setRange(date, this._oRange.end);
        }
        else {
            if (par._nYearRange) {
                this._oRange.begin = new Date(date);
                this._oRange.begin.setFullYear(this._oRange.begin.getFullYear() - par._nYearRange);
            }
            this._uBeginCal.setRange(this._oRange.begin, date);
        }
    };

    UI_MULTI_CALENDAR_PANEL_CAL_CLASS.$blur = function () {
        UI_CONTROL_CLASS.$blur.call(this);
    };

    UI_MULTI_CALENDAR_PANEL_CAL_CLASS.$change = function (event, date) {
        var par = this.getParent();

        this._oDateSel = date;
        par.$setDate(date, this._sType);
    };

    UI_MULTI_CALENDAR_PANEL_CAL_CLASS.setRange = function (begin, end, isSilent) {
        this._uMonthView.setRange(begin, end, isSilent);
    };

    UI_MULTI_CALENDAR_PANEL_BUTTON_CLASS.$click = function () {
        var par = this.getParent();
        UI_BUTTON_CLASS.$click.call(this);
        if (this._sType == 'submit') {
            triggerEvent(par, 'change');
        }
        else {
            par.hide();
        }
    };
})();

/*
 XCalendarMDView / XCalendarMWView - 日历的月日/月周视图
 日历视图控件，继承自基础控件，不包含年/月/日的快速选择与切换，如果需要实现这些功能，请将下拉框(选择月份)、输入框(输入年份)等组合使用建立新的控件或直接在页面上布局并调用接口。

 属性
 _nYear      - 年份
 _nMonth     - 月份(0-11)
 _aCells     - 日历控件内的所有单元格，其中第0-6项是日历的头部星期名称
 _oRange     - 默认的选择范围，只能通过初始化时的参数进行赋值

 子控件属性
 _nDay       - 从本月1号开始计算的天数，如果是上个月，是负数，如果是下个月，会大于当月最大的天数
 */
(function () {

    var core = ecui;
    var array = core.array;
    var dom = core.dom;
    var ui = core.ui;
    var util = core.util;

    var DATE = Date;
    var objProtoToString = Object.prototype.toString;

    var extend = util.extend;
    var indexOf = array.indexOf;
    var addClass = dom.addClass;
    var getParent = dom.getParent;
    var removeClass = dom.removeClass;
    var setText = dom.setText;

    var $fastCreate = core.$fastCreate;
    var inheritsControl = core.inherits;
    var triggerEvent = core.triggerEvent;

    var UI_CONTROL = ui.Control;

    //-------------------------------------------------------------
    // 工具方法
    //-------------------------------------------------------------

    var UI_X_CALENDAR_UTIL = ui.XCalendarUtil = {};
    var DAY_MILLISECOND = 24 * 60 * 60 * 1000;

    var compareDate = UI_X_CALENDAR_UTIL.compareDate = function (a, b, timeType) {
        a = formatDateByTimeType(a, timeType, true);
        b = formatDateByTimeType(b, timeType, true);

        return a[0] != b[0]
            ? (a[0] > b[0] ? 1 : -1)
            : (
            a[1] != b[1]
                ? (a[1] > b[1] ? 1 : -1)
                : (
                a[2] != b[2]
                    ? (a[2] > b[2] ? 1 : -1)
                    : 0
            )
        );
    };

    var formatDateByTimeType = UI_X_CALENDAR_UTIL.formatDateByTimeType = function (date, timeType, retArrOrDate) {
        if (!date) {
            return;
        }

        if (timeType == 'D') {
            date = date2Arr(date, true);
        }
        else if (timeType == 'W') {
            date = date2Arr(getWorkday(date));
        }
        else if (timeType == 'M') {
            date = date2Arr(date, true);
            date[2] = 1;
        }
        else if (timeType == 'Q') {
            date = getQuarterBegin(date, true);
        }

        return retArrOrDate ? date : new Date(date[0], date[1], date[2]);
    };

    var date2Arr = UI_X_CALENDAR_UTIL.date2Arr = function (d, willCreate) {
        return d == null
            ? d
            : !isArray(d)
            ? [d.getFullYear(), d.getMonth(), d.getDate()]
            : willCreate
            ? [d[0], d[1], d[2]]
            : d;
    };

    var arr2Date = UI_X_CALENDAR_UTIL.arr2Date = function (d, willCreate) {
        return d == null
            ? d
            : isArray(d)
            ? new Date(d[0], d[1] || 0, d[2] || 1)
            : willCreate
            ? new Date(d.getFullYear(), d.getMonth(), d.getDate())
            : d;
    };

    var getQuarterBegin = UI_X_CALENDAR_UTIL.getQuarterBegin = function (date, retArrOrDate) {
        if (!date) {
            return null;
        }
        date = date2Arr(date);
        var quarter = getQuarter(date);
        var mon = [0, 0, 3, 6, 9];
        return retArrOrDate
            ? [date[0], mon[quarter], 1]
            : new Date(date[0], mon[quarter], 1);
    };

    var getQuarter = UI_X_CALENDAR_UTIL.getQuarter = function (date) {
        if (!date) {
            return null;
        }
        date = date2Arr(date);
        return Math.floor(date[1] / 3) + 1;
    };

    var getWorkday = UI_X_CALENDAR_UTIL.getWorkday = function (date) {
        date = arr2Date(date, true);
        date.setDate(date.getDate() - (6 + date.getDay()) % 7);
        return date;
    };

    var minDate = UI_X_CALENDAR_UTIL.minDate = function (timeType) {
        var args = arguments;
        var m = args[1];
        for (var i = 1, o; i < args.length; i++) {
            if ((o = args[i]) && compareDate(m, o, timeType) > 0) {
                m = o;
            }
        }
        return m;
    };

    var maxDate = UI_X_CALENDAR_UTIL.maxDate = function (timeType) {
        var args = arguments;
        var m = args[1];
        for (var i = 1, o; i < args.length; i++) {
            if ((o = args[i]) && compareDate(m, o, timeType) < 0) {
                m = o;
            }
        }
        return m;
    };

    var initSlt = UI_X_CALENDAR_UTIL.initSlt = function (slt, dataWrap) {
        // 清除
        slt.setValue(null);
        while (slt.remove(0)) {
        }
        // 添加
        for (var i = 0, o; o = dataWrap.list[i]; i++) {
            slt.add(String(o.text), null, {value: o.value});
        }
        slt.setValue(dataWrap.selected);
    };

    var isDate = UI_X_CALENDAR_UTIL.isDate = function (input) {
        return objProtoToString.call(input) == '[object Date]';
    };

    var isArray = UI_X_CALENDAR_UTIL.isArray = function (input) {
        return objProtoToString.call(input) == '[object Array]';
    };

    var isString = UI_X_CALENDAR_UTIL.isString = function (input) {
        return objProtoToString.call(input) == '[object String]';
    };

    var isNumber = UI_X_CALENDAR_UTIL.isNumber = function (input) {
        return objProtoToString.call(input) == '[object Number]';
    };

    var setSltValue = UI_X_CALENDAR_UTIL.setSltValue = function (sltCtrl, value) {
        sltCtrl && sltCtrl.setValue(value);
    };

    var getSltValue = UI_X_CALENDAR_UTIL.getSltValue = function (sltCtrl) {
        return sltCtrl ? sltCtrl.getValue() : void 0;
    };

    var getWeekInfo = UI_X_CALENDAR_UTIL.getWeekInfo = function (date) {
        var weekDay = date.getDay();
        var pre = -((weekDay + 6) % 7), next = (7 - weekDay) % 7;
        var weekInfo = {
            monday: new Date(date.getTime() + pre * DAY_MILLISECOND),
            sunday: new Date(date.getTime() + next * DAY_MILLISECOND)
        };
        weekInfo.workday = weekInfo.monday;
        weekInfo.weekend = weekInfo.sunday;
        return weekInfo;
    }

    var cloneADate = UI_X_CALENDAR_UTIL.cloneADate = function (aDate) {
        if (!aDate) {
            return;
        }

        var ret = [];
        for (var i = 0, o; i < aDate.length; i++) {
            if (o = aDate[i]) {
                ret.push(isDate(o) ? new Date(o.getTime()) : o.slice());
            }
        }

        return ret;
    }

    // function pad(value, count) {
    //     value = (value == null || isNaN(value)) ? '' : String(value);
    //     if (value.length < count) {
    //         value = Array(count - value.length + 1).join('0') + value;
    //     }
    //     return value;
    // }

    // function getDateKey(date) {
    //     if (isDate(date)) {
    //         return [
    //             pad(date.getFullYear(), 4), 
    //             pad(date.getMonth(), 2), 
    //             pad(date.getDate(), 2)
    //         ].join('-');
    //     }
    //     else if (isArray(date)) {
    //         return [
    //             pad(date[0], 4), 
    //             pad(date[1], 2), 
    //             pad(date[2], 2)
    //         ].join('-');
    //     }
    // }

    //-------------------------------------------------------------
    // UI_X_CALENDAR_VIEW
    //-------------------------------------------------------------

    /**
     * 初始化日历控件（公用）。
     *
     * @public
     * @param {Object} options 初始化选项
     */
    var UI_X_CALENDAR_VIEW =
        inheritsControl(UI_CONTROL, 'ui-x-calendar-view');
    var UI_X_CALENDAR_VIEW_CLASS = UI_X_CALENDAR_VIEW.prototype;

    /**
     * 初始化日历控件的单元格部件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    UI_X_CALENDAR_VIEW_CELL_CLASS = (
        UI_X_CALENDAR_VIEW_CLASS.Cell = inheritsControl(UI_CONTROL)
    ).prototype;
    UI_X_CALENDAR_VIEW_HCELL_CLASS = (
        UI_X_CALENDAR_VIEW_CLASS.HCell = inheritsControl(UI_CONTROL)
    ).prototype;

    UI_X_CALENDAR_VIEW_CLASS.WEEKNAMES = [
        '一', '二', '三', '四', '五', '六', '日'
    ];
    UI_X_CALENDAR_VIEW_CLASS.MONTH = [
        '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'
    ];
    UI_X_CALENDAR_VIEW_CLASS.QUARTER = [
        '第一季度（Q1，一月至三月）',
        '第二季度（Q2，四月至六月）',
        '第三季度（Q3，七月至九月）',
        '第四季度（Q4，十月至十二月）'
    ];

    //-------------------------------------------------------------
    // view 公用控件方法
    //-------------------------------------------------------------

    UI_X_CALENDAR_VIEW_CLASS.$setSize = new Function();

    /**
     * 获取日历控件Model。
     *
     * @public
     * @return {Object} model
     */
    UI_X_CALENDAR_VIEW_CLASS.getModel = function () {
        return this._oModel;
    };

    UI_X_CALENDAR_VIEW_CLASS.setView = function (date) {
        this.$setView(date);
        this.$flushByRange();
        this.$flushSelected();
        this.$flushHover();
    };

    UI_X_CALENDAR_VIEW_CLASS.$flushByRange = function () {
        var model = this._oModel;
        var range = model.getRange();
        var start = range.start;
        var end = range.end;
        var aDate = this._oModel.getDate();
        var timeType = model.getTimeType();

        // 周使用日模式展示，所以range也用日模式
        if (timeType == 'W') {
            timeType = 'D';
        }

        this.$forEachCell(
            function (cell, index, inMonth) {
                var currDate = cell.getCellInfo();
                (
                    (!start || compareDate(currDate, start, timeType) >= 0)
                    && (!end || compareDate(end, currDate, timeType) >= 0)
                )
                    ? cell.open()
                    : cell.close();
            }
        )
    };

    UI_X_CALENDAR_VIEW_CLASS.$doFlushSelected = function (getIndexMapFunc, timeType) {
        var model = this._oModel;
        var modelDate = model.getDate();
        var selMode = model.getSelMode();
        var viewInfo = this.getViewInfo();
        var indexMap;
        var range;

        if (selMode == 'RANGE' && modelDate[0] && modelDate[1]) {
            range = modelDate;
        }
        else {
            indexMap = getIndexMapFunc(
                viewInfo, modelDate, this.cellValue2IndexMap
            );
        }

        this.$forEachCell(
            function (cell, index) {
                if (cell._bClosed) {
                    return;
                }

                var d = cell.getUnitInfo();
                var isIn = range
                    ? (
                    compareDate(d, range[0], timeType) >= 0
                    && compareDate(range[1], d, timeType) >= 0
                )
                    : index in indexMap;
                var selected;
                var opt;

                isIn
                    ? (selected = true, opt = '+')
                    : (selected = false, opt = '-');

                selected != cell._bSelected && (
                    cell._bSelected = selected,
                        cell.alterClass(opt + 'selected')
                );
            }
        );
    }

    UI_X_CALENDAR_VIEW_CLASS.$doFlushHover = function (getIndexMapFunc, timeType) {
        var model = this.getModel();
        var selMode = model.getSelMode();
        var modelDate = model.getHoverDate();
        var viewInfo = this.getViewInfo();
        var indexMap;
        var range;

        if (selMode == 'RANGE' && modelDate[0] && modelDate[1]) {
            range = modelDate;
        }
        else {
            indexMap = getIndexMapFunc(
                viewInfo, modelDate, this.cellValue2IndexMap
            );
        }

        this.$forEachCell(
            function (cell, index) {
                if (cell._bClosed) {
                    return;
                }

                var d = cell.getUnitInfo();
                if (range
                        ? (
                        compareDate(d, range[0], timeType) >= 0
                        && compareDate(range[1], d, timeType) >= 0
                    )
                        : index in indexMap
                ) {

                    !cell._bHover && (
                        cell.alterClass('+hover'),
                            cell._bHover = true
                    );
                }
                else {
                    cell._bHover && (
                        cell.alterClass('-hover'),
                            cell._bHover = false
                    );
                }
            }
        );
    }

    //-------------------------------------------------------------
    // Cell 公用方法
    //-------------------------------------------------------------

    UI_X_CALENDAR_VIEW_CELL_CLASS.close = function () {
        if (this._bSelected) {
            this.alterClass('-selected');
            this._bSelected = false;
        }
        if (this._bHover) {
            this.alterClass('-hover');
            this._bHover = false;
        }
        this._bClosed = true;
        this.disable();
    };

    UI_X_CALENDAR_VIEW_CELL_CLASS.open = function () {
        this._bClosed = false;
        this.enable();
    }

    UI_X_CALENDAR_VIEW_CELL_CLASS.$mouseover = function (event) {
        var par = this.getParent();
        var cc = this.getUnitInfo();
        par.getModel().updateHoverDate(arr2Date(this.getUnitInfo()), true);
        par.$flushHover();
    };

    UI_X_CALENDAR_VIEW_CELL_CLASS.$mouseout = function (event) {
        var par = this.getParent();
        var cc = this.getUnitInfo();
        par.getModel().updateHoverDate(arr2Date(this.getUnitInfo()), false);
        par.$flushHover();
    };

    UI_X_CALENDAR_VIEW_CELL_CLASS.$click = function (event) {
        var par = this.getParent()
        var model = par.getModel();
        if (model.udateDateByClick(arr2Date(this.getUnitInfo()))) {

            // 更新view
            par.$flushSelected();

            /**
             * @event
             */
            triggerEvent(par, 'change', null, [model.getDate()]);
            /**
             * @event
             */
            triggerEvent(par, 'dateclick', null, [arr2Date(this.getUnitInfo())]);
        }
    };

    //-------------------------------------------------------------
    // MD View
    //-------------------------------------------------------------

    /**
     * 初始化日历控件（month－day）。
     *
     * @public
     * @param {Object} options 初始化选项
     */
    var UI_X_CALENDAR_MD_VIEW = ui.XCalendarMDView =
        inheritsControl(UI_X_CALENDAR_VIEW, null, null, mConstructor);
    var UI_X_CALENDAR_MD_VIEW_CLASS = UI_X_CALENDAR_MD_VIEW.prototype;

    var UI_X_CALENDAR_MD_VIEW_CELL_CLASS = (
        UI_X_CALENDAR_MD_VIEW_CLASS.Cell =
            inheritsControl(UI_X_CALENDAR_VIEW_CLASS.Cell)
    ).prototype;

    function mConstructor(el, options) {
        var type = this.getType();
        var list = [];
        var i = 0;
        var o;

        this._oModel = options.model;

        el.style.overflow = 'auto';

        for (; i < 7;) {
            list[i] =
                '<td class="' + type + '-title' + this.Cell.TYPES + (i == 6 ? type + '-title-last' : '') + '">' +
                this.WEEKNAMES[i++] + '</td>';
        }
        list[i] = '</tr></thead><tbody><tr>';
        for (; ++i < 50;) {
            list[i] =
                '<td class="' + type + '-item' + this.Cell.TYPES + (i % 7 ? '' : type + '-item-last') + '"></td>' +
                (i % 7 ? '' : '</tr><tr>');
        }

        el.innerHTML =
            '<table cellspacing="0" cellpadding="0"><thead><tr>' + list.join('') + '</tr></tbody></table>';

        this._aCells = [];
        list = el.getElementsByTagName('TD');
        for (i = 0; o = list[i]; i++) {
            // 日历视图单元格禁止改变大小
            this._aCells[i] = $fastCreate(
                i < 7 ? this.HCell : this.Cell,
                o,
                this,
                {resizable: false}
            );
        }
    }

    UI_X_CALENDAR_MD_VIEW_CLASS.$flushSelected = function () {
        return this.$doFlushSelected(getIndexMapByDate, 'D');
    };

    UI_X_CALENDAR_MD_VIEW_CLASS.$flushHover = function () {
        this.$doFlushHover(getIndexMapByDate, 'D');
    };

    UI_X_CALENDAR_MD_VIEW_CLASS.$forEachCell = function (callback) {
        var lastDayOfCurrMonth = new DATE(this._nYear, this._nMonth + 1, 0).getDate();

        for (var i = 7, cell; cell = this._aCells[i]; i++) {
            if (cell._nDay > 0
                && cell._nDay <= lastDayOfCurrMonth
                && callback.call(this, cell, i) === false
            ) {
                break;
            }
        }
    };

    /**
     * 是否当前的view。例如，2012年4月和2012年3月是两个view
     *
     * @public
     * @param {{Date|Array}} date
     */
    UI_X_CALENDAR_MD_VIEW_CLASS.isCurrView = function (date) {
        date = date2Arr(date);
        return date[0] == this._nYear && date[1] == this._nMonth;
    };

    /**
     * 得到当前的view的信息，用date表示
     *
     * @public
     * @param {Array} viewInfo
     */
    UI_X_CALENDAR_MD_VIEW_CLASS.getViewInfo = function () {
        return [this._nYear, this._nMonth];
    };

    /**
     * 设置日历控件当前显示的日期。
     *
     * @public
     * @param {{Date|Array}} date
     */
    UI_X_CALENDAR_MD_VIEW_CLASS.$setView = function (date) {
        date = date2Arr(date);
        var i = 7;
        var year = date[0];
        var month = date[1];
        // 得到上个月的最后几天的信息，用于补齐当前月日历的上月信息位置;
        var o = new DATE(year, month, 0);
        var day = 1 - o.getDay();
        var lastDayOfLastMonth = o.getDate();
        // 得到当前月的天数;
        var lastDayOfCurrMonth = new DATE(year, month + 1, 0).getDate();
        var model = this._oModel;
        var range = model.getRange();
        var rangeStart = range.start;
        var rangeEnd = range.end;
        var currDate;
        var cellDay;

        if (this._nYear != year || this._nMonth != month) {
            this._nYear = year;
            this._nMonth = month;

            // cell值到_aCell索引的映射，便于查询
            this.cellValue2IndexMap = {};

            currDate = new DATE(year, month, 1);

            for (; o = this._aCells[i]; i++) {
                if (month = day > 0 && day <= lastDayOfCurrMonth) {
                    currDate.setDate(day);
                    if ((!rangeStart || rangeStart <= currDate)
                        && (!rangeEnd || rangeEnd >= currDate)) {
                        o.open();
                    }
                    else {
                        o.close();
                    }
                }
                else {
                    o.close();
                }

                if (i == 36 || i == 43) {
                    (o.isDisabled() ? addClass : removeClass)(
                        getParent(o.getOuter()), this.getType() + '-extra'
                    );
                }

                cellDay = month
                    ? day
                    : day > lastDayOfCurrMonth
                    ? day - lastDayOfCurrMonth
                    : lastDayOfLastMonth + day;

                this.setCellHTML
                && (this.setCellHTML(o, cellDay, day) !== false)
                || setText(o.getBody(), cellDay);

                this.cellValue2IndexMap[day] = i;
                o._nDay = day++;
            }
        }
    };

    UI_X_CALENDAR_MD_VIEW_CELL_CLASS.getUnitInfo = function () {
        var par = this.getParent();
        return [par._nYear, par._nMonth, this._nDay]
    };

    UI_X_CALENDAR_MD_VIEW_CELL_CLASS.getCellInfo = UI_X_CALENDAR_MD_VIEW_CELL_CLASS.getUnitInfo;

    function getIndexMapByDate(viewInfo, dateArr, cellValue2IndexMap) {
        var ret = {};
        for (var i = 0, date; date = date2Arr(dateArr[i]); i++) {
            if (date[0] == viewInfo[0] && date[1] == viewInfo[1]) {
                ret[cellValue2IndexMap[date[2]]] = 1;
            }
        }
        return ret;
    }

    //-------------------------------------------------------------
    // MW View
    //-------------------------------------------------------------

    /**
     * 初始化日历控件（month－week）。
     *
     * @public
     * @param {Object} options 初始化选项
     */
    var UI_X_CALENDAR_MW_VIEW = ui.XCalendarMWView =
        inheritsControl(UI_X_CALENDAR_VIEW, null, null, mConstructor);
    var UI_X_CALENDAR_MW_VIEW_CLASS = UI_X_CALENDAR_MW_VIEW.prototype;

    var UI_X_CALENDAR_MW_VIEW_CELL_CLASS = (
        UI_X_CALENDAR_MW_VIEW_CLASS.Cell =
            inheritsControl(UI_X_CALENDAR_VIEW_CLASS.Cell)
    ).prototype;

    UI_X_CALENDAR_MW_VIEW_CLASS.$flushSelected = function () {
        return this.$doFlushSelected(getIndexMapByWeekDate, 'W');
    };

    UI_X_CALENDAR_MW_VIEW_CLASS.$flushHover = function () {
        this.$doFlushHover(getIndexMapByWeekDate, 'W');
    };

    UI_X_CALENDAR_MW_VIEW_CLASS.$forEachCell = UI_X_CALENDAR_MD_VIEW_CLASS.$forEachCell;

    UI_X_CALENDAR_MW_VIEW_CLASS.isCurrView = UI_X_CALENDAR_MD_VIEW_CLASS.isCurrView;

    UI_X_CALENDAR_MW_VIEW_CLASS.getViewInfo = UI_X_CALENDAR_MD_VIEW_CLASS.getViewInfo;

    UI_X_CALENDAR_MW_VIEW_CLASS.$setView = UI_X_CALENDAR_MD_VIEW_CLASS.$setView;

    UI_X_CALENDAR_MW_VIEW_CELL_CLASS.getUnitInfo = function () {
        var par = this.getParent();
        return date2Arr(getWorkday([par._nYear, par._nMonth, this._nDay]));
    };

    UI_X_CALENDAR_MW_VIEW_CELL_CLASS.getCellInfo = function () {
        var par = this.getParent();
        return [par._nYear, par._nMonth, this._nDay];
    };

    function getIndexMapByWeekDate(viewInfo, dateArr, cellValue2IndexMap) {
        var ret = {};
        var year = viewInfo[0];
        var month = viewInfo[1];
        for (var i = 0, date, workday, day; date = date2Arr(dateArr[i]); i++) {
            // 由于可能跨月，所以本周中有一天匹配，就满足
            workday = getWorkday(date);
            for (var j = 0; j < 7; j++, workday.setDate(workday.getDate() + 1)) {
                if (workday.getFullYear() == year
                    && workday.getMonth() == month
                ) {
                    ret[cellValue2IndexMap[workday.getDate()]] = 1;
                }
            }
        }
        return ret;
    }

    //-------------------------------------------------------------
    // YM View
    //-------------------------------------------------------------

    /**
     * 初始化日历控件（year－month）。
     *
     * @public
     * @param {Object} options 初始化选项
     */
    var UI_X_CALENDAR_YM_VIEW = ui.XCalendarYMView =
        inheritsControl(UI_X_CALENDAR_VIEW, null, null, ymConstructor);
    var UI_X_CALENDAR_YM_VIEW_CLASS = UI_X_CALENDAR_YM_VIEW.prototype;

    var UI_X_CALENDAR_YM_VIEW_CELL_CLASS = (
        UI_X_CALENDAR_YM_VIEW_CLASS.Cell =
            inheritsControl(UI_X_CALENDAR_VIEW_CLASS.Cell)
    ).prototype;

    function ymConstructor(el, options) {
        var type = this.getType();
        var list;
        var i;
        var o;

        this._oModel = options.model;
        el.style.overflow = 'auto';

        for (i = 0, list = []; i < 12; i++) {
            list.push('<td class="' + type + '-item'
                + this.Cell.TYPES + '">'
                + this.MONTH[i] + "月"
                + '</td>'
                + ((i + 1) % 3 ? '' : '</tr><tr>')
            );
        }

        el.innerHTML =
            '<table cellspacing="0"><tbody><tr>'
            + list.join('')
            + '</tr></tbody></table>';

        this._aCells = [];
        for (i = 0, list = el.getElementsByTagName('TD'), o;
             o = list[i];
             i++
        ) {
            // 日历视图单元格禁止改变大小
            this._aCells[i] = $fastCreate(
                this.Cell, o, this, {resizable: false}
            );
            this._aCells[i]._nMonth = i;
        }
    }

    UI_X_CALENDAR_YM_VIEW_CLASS.$flushSelected = function () {
        return this.$doFlushSelected(getIndexMapByMonth, 'M');
    };

    UI_X_CALENDAR_YM_VIEW_CLASS.$flushHover = function () {
        this.$doFlushHover(getIndexMapByMonth, 'M');
    };

    UI_X_CALENDAR_YM_VIEW_CLASS.$forEachCell = function (callback) {
        for (var i = 0, cell; cell = this._aCells[i]; i++) {
            if (callback.call(this, cell, i) === false) {
                break;
            }
        }
    };

    UI_X_CALENDAR_YM_VIEW_CLASS.isCurrView = function (date) {
        date = date2Arr(date);
        return date[0] == this._nYear;
    };

    UI_X_CALENDAR_YM_VIEW_CLASS.getViewInfo = function () {
        return [this._nYear];
    };

    UI_X_CALENDAR_YM_VIEW_CLASS.$setView = function (date) {
        date = date2Arr(date);
        this._nYear = date[0];

        // cell值到_aCell索引的映射，便于查询
        if (!this.cellValue2IndexMap) {
            var cellValue2IndexMap = this.cellValue2IndexMap = {};
            for (var i = 0, cell; cell = this._aCells[i]; i++) {
                cellValue2IndexMap[cell._nMonth] = i;
            }
        }
    };

    UI_X_CALENDAR_YM_VIEW_CELL_CLASS.getUnitInfo = function () {
        var par = this.getParent();
        return [par._nYear, this._nMonth, 1]
    };

    UI_X_CALENDAR_YM_VIEW_CELL_CLASS.getCellInfo = UI_X_CALENDAR_YM_VIEW_CELL_CLASS.getUnitInfo;

    function getIndexMapByMonth(viewInfo, dateArr, cellValue2IndexMap) {
        var ret = {};
        for (var i = 0, date; date = date2Arr(dateArr[i]); i++) {
            if (date[0] == viewInfo[0]) {
                ret[cellValue2IndexMap[date[1]]] = 1;
            }
        }
        return ret;
    }

    //-------------------------------------------------------------
    // YQ View
    //-------------------------------------------------------------

    /**
     * 初始化日历控件（year－quarter）。
     *
     * @public
     * @param {Object} options 初始化选项
     */
    var UI_X_CALENDAR_YQ_VIEW = ui.XCalendarYQView =
        inheritsControl(UI_X_CALENDAR_VIEW, null, null, yqConstructor);
    var UI_X_CALENDAR_YQ_VIEW_CLASS = UI_X_CALENDAR_YQ_VIEW.prototype;

    var UI_X_CALENDAR_YQ_VIEW_CELL_CLASS = (
        UI_X_CALENDAR_YQ_VIEW_CLASS.Cell =
            inheritsControl(UI_X_CALENDAR_VIEW_CLASS.Cell)
    ).prototype;

    function yqConstructor(el, options) {
        var type = this.getType();
        var list;
        var i;
        var o;

        this._oModel = options.model;
        el.style.overflow = 'auto';

        for (i = 0, list = []; i < 4; i++) {
            list.push('<div class="' + type + '-item'
                + this.Cell.TYPES + '">'
                + this.QUARTER[i]
                + '</div>'
            );
        }

        el.innerHTML = list.join('');

        var quarterMap = [0, 3, 6, 9];
        this._aCells = [];
        for (i = 0, list = el.getElementsByTagName('div'), o;
             o = list[i];
             i++
        ) {
            // 日历视图单元格禁止改变大小
            this._aCells[i] = $fastCreate(
                this.Cell, o, this, {resizable: false}
            );
            this._aCells[i]._nMonth = quarterMap[i];
        }
    }

    UI_X_CALENDAR_YQ_VIEW_CLASS.$flushSelected = function () {
        return this.$doFlushSelected(getIndexMapByMonth, 'Q');
    };

    UI_X_CALENDAR_YQ_VIEW_CLASS.$flushHover = function () {
        this.$doFlushHover(getIndexMapByMonth, 'Q');
    };

    UI_X_CALENDAR_YQ_VIEW_CLASS.$forEachCell = UI_X_CALENDAR_YM_VIEW_CLASS.$forEachCell;

    UI_X_CALENDAR_YQ_VIEW_CLASS.isCurrView = UI_X_CALENDAR_YM_VIEW_CLASS.isCurrView;

    UI_X_CALENDAR_YQ_VIEW_CLASS.getViewInfo = UI_X_CALENDAR_YM_VIEW_CLASS.getViewInfo;

    UI_X_CALENDAR_YQ_VIEW_CLASS.$setView = UI_X_CALENDAR_YM_VIEW_CLASS.$setView;

    UI_X_CALENDAR_YQ_VIEW_CELL_CLASS.getUnitInfo = UI_X_CALENDAR_YM_VIEW_CELL_CLASS.getUnitInfo;

    UI_X_CALENDAR_YQ_VIEW_CELL_CLASS.getCellInfo = UI_X_CALENDAR_YM_VIEW_CELL_CLASS.getUnitInfo;

})();

/**
 * ecui.ui.XCalendarLayer
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * @file:    富日历的日历层，
 *           支持日、周、月、季不同粒度时间选择，
 *           支持单选、多选、范围选
 * @author:  sushuang(sushuang@baidu.com)
 * @depend:  ecui
 */

(function () {

    var core = ecui;
    var array = core.array;
    var dom = core.dom;
    var ui = core.ui;
    var string = core.string;
    var util = core.util;
    var cutil = ui.XCalendarUtil;

    var DATE = Date;
    var REGEXP = RegExp;
    var DOCUMENT = document;
    var objProtoToString = Object.prototype.toString;

    var pushArray = array.push;
    var children = dom.children;
    var createDom = dom.create;
    var getParent = dom.getParent;
    var getPosition = dom.getPosition;
    var moveElements = dom.moveElements;
    var setText = dom.setText;
    var addClass = dom.addClass;
    var formatDate = string.formatDate;
    var getView = util.getView;
    var encodeHTML = string.encodeHTML;
    var compareDate = cutil.compareDate;
    var date2Arr = cutil.date2Arr;
    var arr2Date = cutil.arr2Date;
    var getWorkday = cutil.getWorkday;
    var minDate = cutil.minDate;
    var maxDate = cutil.maxDate;
    var isDate = cutil.isDate;
    var isArray = cutil.isArray;
    var isString = cutil.isString;
    var isNumber = cutil.isNumber;
    var cloneADate = cutil.cloneADate;
    var setSltValue = cutil.setSltValue;
    var getSltValue = cutil.getSltValue;
    var getWeekInfo = cutil.getWeekInfo;
    var getQuarter = cutil.getQuarter;
    var initSlt = cutil.initSlt;

    var $fastCreate = core.$fastCreate;
    var inheritsControl = core.inherits;
    var triggerEvent = core.triggerEvent;
    var setFocused = core.setFocused;

    var UI_CONTROL = ui.Control;
    var UI_CONTROL_CLASS = UI_CONTROL.prototype;
    var UI_BUTTON = ui.Button;
    var UI_BUTTON_CLASS = UI_BUTTON.prototype;
    var UI_INPUT_CONTROL = ui.InputControl;
    var UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
    var UI_SELECT = ui.Select;
    var UI_X_CALENDAR_MD_VIEW = ui.XCalendarMDView;
    var UI_X_CALENDAR_MW_VIEW = ui.XCalendarMWView;
    var UI_X_CALENDAR_YM_VIEW = ui.XCalendarYMView;
    var UI_X_CALENDAR_YQ_VIEW = ui.XCalendarYQView;


    /**
     * 富日历的日历层
     *
     * @param {Object} options 参数
     * @param {(string|Date|number|Array)=} options.date 初始时间，缺省则为new Date()
     *          可为表示时间的string：格式为：（以下时间字符串都用此格式）
     *              2012-12-12 （对应时间粒度：D）
     *              2012-12-12 （对应时间粒度：W, 对应当周第一天）
     *              2012-12    （对应时间粒度：M）
     *              2012-Q1    （对应时间粒度：Q）
     *          也可为时间对象,
     *          也可为时间戳。
     *          如果selMode为：
     *              SINGLE      date型如2012-12-12或相应Date对象；
     *              MULTIPLE    date型如[2012-12-12, 2012-03-04, 2012-11-15, ...]或相应Date对象数组；
     *              RANGE       date型如[2012-03-04, 2012-11-15]或者相应Date对象数组，数组长为2，第一元素表示范围开始，第二元素表示范围结束。
     * @param {Object} options.range
     * @param {(string|number|Date)=} options.range.offsetBase 如果范围设定使用偏移方式的话（如'+1d'），此参数为偏移的基础，缺省则为new Date()
     *          可为时间字符串、时间对象、时间戳
     * @param {(string|number|Date)=} options.range.begin或者start 当前时间戳（用于传来系统时间）
     *          可为时间字符串、时间对象、时间戳、偏移表达式（型如'+1d', '-2M', '+4y'）
     * @param {(string|number|Date)=} options.range.end 当前时间戳（用于传来系统时间）
     *          可为时间字符串、时间对象、时间戳、偏移表达式（型如'+1d', '-2M', '+4y'）
     * @param {Array.<Object>=} options.selModeList 要使用的选择类型，值为'SINGLE', 'MULTIPLE', 'RANGE'中的一个或几个，缺省则全开启
     *          每项为：{ text: 'xxxxxx', value: 'SINGLE', prompt: '这是说明提示,可忽略' }，其中value和selMode对应
     * @param {string=} options.selMode 初始选择类型，值可为：'SINGLE', 'MULTIPLE', 'RANGE'，缺省则取'SINGLE'
     * @param {Object=} options.model 当前数据对象，如果不传入则自己创建。传入，则可多个实例共享model（参见render方法）
     * @class
     */
    var UI_X_CALENDAR_LAYER = ui.XCalendarLayer =
        inheritsControl(
            UI_CONTROL,
            'ui-x-calendar-layer',
            null,
            function (el, options) {
                createModel.call(this, el, options);
                createView.call(this, el, options);
            }
        );

    var UI_X_CALENDAR_LAYER_CLASS = UI_X_CALENDAR_LAYER.prototype;
    var UI_X_CALENDAR_LAYER_STEP_BUTTON_CLASS = (UI_X_CALENDAR_LAYER_CLASS.StepButton = inheritsControl(UI_BUTTON, null)).prototype;
    var UI_X_CALENDAR_LAYER_SELECT_CLASS = (UI_X_CALENDAR_LAYER_CLASS.Select = inheritsControl(UI_SELECT, null)).prototype;
    UI_X_CALENDAR_LAYER_MD_VIEW_CLASS = (UI_X_CALENDAR_LAYER_CLASS.MDView = inheritsControl(UI_X_CALENDAR_MD_VIEW, null)).prototype;
    UI_X_CALENDAR_LAYER_MW_VIEW_CLASS = (UI_X_CALENDAR_LAYER_CLASS.MWView = inheritsControl(UI_X_CALENDAR_MW_VIEW, null)).prototype;
    UI_X_CALENDAR_LAYER_YM_VIEW_CLASS = (UI_X_CALENDAR_LAYER_CLASS.YMView = inheritsControl(UI_X_CALENDAR_YM_VIEW, null)).prototype;
    UI_X_CALENDAR_LAYER_YQ_VIEW_CLASS = (UI_X_CALENDAR_LAYER_CLASS.YQView = inheritsControl(UI_X_CALENDAR_YQ_VIEW, null)).prototype;

    UI_X_CALENDAR_LAYER_SELECT_CLASS.Options = inheritsControl(
        UI_X_CALENDAR_LAYER_SELECT_CLASS.Options,
        null,
        null,
        function (el, options) {
            addClass(el, 'ui-x-calendar-layer-select-options');
        }
    );

    UI_X_CALENDAR_LAYER_SEL_MODE_CLASS = (UI_X_CALENDAR_LAYER_CLASS.SelMode =
            inheritsControl(UI_CONTROL, 'ui-x-calendar-layer-selmode')
    ).prototype;

    /**
     * 数据Model，存储当前时间、时间范围等
     *
     * @class
     * @param {Object} options 参数参见setDatasource方法
     */
    var UI_X_CALENDAR_MODEL = UI_X_CALENDAR_LAYER_CLASS.Model = modelConstructor;
    var UI_X_CALENDAR_MODEL_CLASS = UI_X_CALENDAR_MODEL.prototype;

    // 默认值
    UI_X_CALENDAR_MODEL_CLASS.DEFAULT = {
        selMode: 'SINGLE',
        timeType: 'D',
        selModeList: [
            {text: '单选', value: 'SINGLE', prompt: '单项选择'},
            {text: '范围多选', value: 'RANGE', prompt: '范围选择，点击一下选择开始值，再点击一下选择结束值'},
            {text: '任意多选', value: 'MULTIPLE', prompt: '可以选择离散的多项'}
        ]
    };

    var DATE_REG = /^(\d+)(\-(\d+)(\-(\d+))?)?$/;
    var QUARTER_REG = /^(\d+)\-Q(\d)/;

    //----------------------------------------------------
    // 工具方法
    //----------------------------------------------------

    function parseRange(start, end, offsetBase, cellTimeType) {
        var res = {};
        var o = res.offsetBase = parseInputDate(offsetBase || new Date());

        o = [o.getFullYear(), o.getMonth(), o.getDate()];
        var p = {y: 0, m: 1, d: 2};
        var t;

        if (/^([-+]?)(\d+)([ymd])$/.test((start || '').toLowerCase())) {
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            res.start = new Date(t[0], t[1], t[2]);
        }
        else {
            res.start = parseInputDate(start);
        }

        if (/^([-+]?)(\d+)([yMd])$/.test((end || '').toLowerCase())) {
            t = o.slice();
            if (!REGEXP.$1 || REGEXP.$1 == '+') {
                t[p[REGEXP.$3]] += parseInt(REGEXP.$2, 10);
            }
            else {
                t[p[REGEXP.$3]] -= parseInt(REGEXP.$2, 10);
            }
            res.end = new Date(t[0], t[1], t[2]);
        }
        else {
            res.end = parseInputDate(end);
        }

        if (res.start && res.end && compareDate(res.start, res.end, cellTimeType) > 0) {
            var tmp = res.end;
            res.end = res.start;
            res.start = tmp;
        }

        return res ? res : {};
    }

    function parseInputDate(input) {
        var ret;

        if (input == null) {
            ret = null;
        }
        else if (isArray(input)) {
            ret = [];
            for (var i = 0; i < input.length; i++) {
                ret.push(parseInputDate(input[i]));
            }
        }
        else if (isDate(input)) {
            ret = input;
        }
        else if (isString(input)) {
            ret = parseDateStr(input);
        }
        else if (isNumber(input)) {
            ret = new Date(input);
        }

        return ret;
    }

    function parseDateStr(dateStr) {
        if (DATE_REG.test(dateStr)) {
            return new Date(REGEXP.$1, (REGEXP.$3 || 1) - 1, REGEXP.$5 || 1);
        }
        else if (QUARTER_REG.test(dateStr)) {
            var par = [0, 0, 3, 6, 9];
            return new Date(REGEXP.$1, par[REGEXP.$2], 1);
        }

        return null;
    };

    function goViewStep(base, step, timeType) {
        step = Number(step);
        base = arr2Date(base, true);
        if (timeType == 'D' || timeType == 'W') {
            base.setMonth(base.getMonth() + step);
        }
        else if (timeType == 'M' || timeType == 'Q') {
            base.setFullYear(base.getFullYear() + step);
        }
        return base;
    }

    function goCellStep(base, step, timeType) {
        base = arr2Date(base, true);
        step = Number(step);
        if (timeType == 'D') {
            base.setDate(base.getDate() + step);
        }
        else if (timeType == 'W') {
            base.setDate(base.getDate() + step * 7);
        }
        else if (timeType == 'M') {
            base.setMonth(base.getMonth() + step);
        }
        else if (timeType == 'Q') {
            base.setMonth(base.getMonth() + step * 3);
        }
        return base;
    }

    //----------------------------------------------------
    // 构造方法
    //----------------------------------------------------

    function createModel(el, options) {
        if (options.model) {
            // model可以外部传入
            this._oModel = options.model;
        }
        else {
            // 设默认值
            var dft = this._oModel.DEFAULT;
            if (!options.selMode) {
                options.selMode = dft.selMode;
            }
            if (!options.timeType) {
                options.timeType = dft.timeType;
            }
            if (!options.selModeList) {
                options.selModeList = dft.selModeList;
            }
            this._oModel = new this.Model(options);
        }
    }

    function createView(el, options) {
        var type = this.getTypes()[0];
        var me = this;
        var html = [];
        var stepBtnClass = this.StepButton;
        var selectClass = this.Select;

        var model = this._oModel;
        var timeType = model.getTimeType();
        var aDate = model.getDate();
        var range = model.getRange();
        var hasMonthSlt = timeType == 'D' || timeType == 'W';

        var timeTypeDef = {
            D: {clz: this.MDView, st: '-md-view', btns: '-buttons-md'},
            W: {clz: this.MWView, st: '-md-view', btns: '-buttons-md'},
            M: {clz: this.YMView, st: '-ym-view', btns: '-buttons-ym'},
            Q: {clz: this.YQView, st: '-yq-view', btns: '-buttons-yq'}
        }[timeType];

        var o;
        var i;

        html.push('<div class="' + type + '-buttons ' + type + timeTypeDef.btns + ' ">');

        // 后退按钮
        html.push('<div class="' + type + '-btn-prv' + UI_BUTTON.TYPES + '"></div>');

        // 年下拉框
        html.push('<select class="' + type + '-slt-year' + UI_SELECT.TYPES + '">');
        html.push('</select>');

        // 月下拉框
        if (hasMonthSlt) {
            html.push('<select class="' + type + '-slt-month' + UI_SELECT.TYPES + '">');
            for (i = 1; i <= 12; i++) {
                html.push('<option value="' + i + '">' + (i < 10 ? '0' : '') + i + '</option>');
            }
            html.push('</select>');
        }

        // 前进按钮
        html.push('<div class="' + type + '-btn-nxt' + UI_BUTTON.TYPES + '"></div>');

        html.push('</div>');

        // selMode 选择区
        html.push('<div class="' + type + '-selmode"></div>');

        // 日历面板
        html.push('<div class="' + type + timeTypeDef.st + ' ' + timeTypeDef.clz.TYPES + '"></div>');

        el.innerHTML = html.join('');
        el = children(el);

        o = children(el[0]);
        i = 0;

        this._uPrvBtn = $fastCreate(stepBtnClass, o[i++], this);
        this._uPrvBtn._nStep = -1;

        this._uYearSlt = $fastCreate(selectClass, o[i++], this);

        if (hasMonthSlt) {
            this._uMonthSlt = $fastCreate(selectClass, o[i++], this);
        }

        this._uNxtBtn = $fastCreate(stepBtnClass, o[i++], this);
        this._uNxtBtn._nStep = 1;

        this._uSelMode = $fastCreate(this.SelMode, el[1], this);

        this._uCalView = $fastCreate(
            timeTypeDef.clz, el[2], this, {model: model}
        );

        this._uCalView.onchange = function (aDate) {
            /**
             * @event
             */
            triggerEvent(me, 'change', null, [aDate]);
        };
        this._uCalView.ondateclick = function (aDate) {
            /**
             * @event
             */
            triggerEvent(me, 'dateclick', null, [aDate]);
        };

        this.render();
    }

    UI_X_CALENDAR_LAYER_CLASS.$setSize = new Function();

    UI_X_CALENDAR_LAYER_CLASS.setDatasource = function (datasource, silent) {
        this._oModel.setDatasource(datasource);
        !silent && this.render();
    };

    UI_X_CALENDAR_LAYER_CLASS.$flushCalView = function (force) {
        var timeType = this._oModel.getTimeType();
        var calView = this._uCalView;
        var d = [];
        (o = Number(getSltValue(this._uYearSlt))) && d.push(o);
        (o = Number(getSltValue(this._uMonthSlt))) && d.push(o - 1);

        calView.setView(d);
    };

    /**
     * 渲染
     *
     * @public
     * @param {Object} opt
     * @param {Date} viewDate 决定面板显示的日期
     * @param {boolean} remainSlt 是否不重新绘制日期选择下拉框（默认false）
     * @param {boolean} remainSelMode 是否不重绘selMode选择区（默认false）
     * @param {boolean} remainTimeView 是否保留当前view（默认false）
     */
    UI_X_CALENDAR_LAYER_CLASS.render = function (opt) {
        opt = opt || {};
        var model = this.getModel();

        !opt.remainSlt && this.$resetSltDatasource();
        !opt.remainSelMode && this.$resetSelModeCtrl();

        if (!opt.remainTimeView) {
            var aDate = this._oModel.getDate();
            var viewDate = opt.viewDate
                    // 默认取最后一个选中日期作为当前要显示的面板
                || aDate[aDate.length - 1]
                || (
                    opt = new Date(),
                        opt.setFullYear(
                            Math.min(
                                Math.max(model._nYearRangeStart, opt.getFullYear()),
                                model._nYearRangeEnd
                            )
                        ),
                        opt
                );

            // 设置monthSlt, yearSlt
            setSltValue(this._uYearSlt, viewDate.getFullYear());
            setSltValue(this._uMonthSlt, viewDate.getMonth() + 1);
            this.$resetStepBtn();
        }

        this.$flushCalView();
    };

    UI_X_CALENDAR_LAYER_CLASS.$resetSelModeCtrl = function () {
        var type = this.getTypes()[0];
        var uSelMode = this._uSelMode;
        var outer = uSelMode.getOuter();
        var model = this.getModel();
        var aSelModeList = model.getSelModeList();
        var selMode = model.getSelMode();

        // 清除
        outer.innerHTML = '';

        if (!aSelModeList || !aSelModeList.length) {
            outer.style.display = 'none';
        }
        else {
            outer.style.display = '';
        }

        // 添加
        var html = [];
        var i;
        var o;
        var checked;
        var prompt;
        for (i = 0; o = aSelModeList[i]; i++) {
            prompt = o.prompt ? (' title="' + encodeHTML(o.prompt) + '" ') : '';
            checked = o.value == selMode ? ' checked="checked" ' : '';
            html.push(
                '<input ' + prompt + ' type="radio" name="' + type + '-selmode-radio-' + this.getUID()
                + '" class="' + type + '-selmode-radio" ' + checked
                + ' data-selmode="' + o.value + '"/>'
            );
            html.push('<span ' + prompt + ' class="' + type + '-selmode-text">' + encodeHTML(o.text) + '</span>');
        }
        outer.innerHTML = html.join('');

    };

    UI_X_CALENDAR_LAYER_CLASS.$resetSltDatasource = function () {
        var range = this._oModel.getRange();
        var yearSlt = this._uYearSlt;
        var model = this.getModel();
        if (!yearSlt) {
            return;
        }

        var yearBase = (range.offsetBase || new Date()).getFullYear();
        var yearRangeStart = range.start
            ? range.start.getFullYear() : (yearBase - 5);
        var yearRangeEnd = range.end
            ? range.end.getFullYear() : (yearBase + 5);

        var oldValue = Number(getSltValue(yearSlt));
        var newValue;

        // 清除
        yearSlt.setValue(null);
        while (yearSlt.remove(0)) {
        }

        // 添加
        for (var i = yearRangeStart; i <= yearRangeEnd; i++) {
            yearSlt.add(String(i), null, {value: Number(i)});
            i == oldValue && (newValue = i);
        }

        model._nYearRangeStart = yearRangeStart;
        model._nYearRangeEnd = yearRangeEnd;

        yearSlt.setValue(newValue != null ? newValue : yearRangeStart);
        this.$resetStepBtn();
    };

    UI_X_CALENDAR_LAYER_CLASS.$resetStepBtn = function () {
        var yearSltValue = Number(getSltValue(this._uYearSlt));
        var monthSltValue = Number(getSltValue(this._uMonthSlt));
        var model = this.getModel();
        var timeType = model.getTimeType();

        // 只考虑yearSlt是否够显示即可
        var d = [yearSltValue, monthSltValue - 1];
        d = goViewStep(d, 1, timeType);
        this._uNxtBtn[
            d.getFullYear() > model._nYearRangeEnd ? 'disable' : 'enable'
            ]();

        d = [yearSltValue, monthSltValue - 1];
        d = goViewStep(d, -1, timeType);
        this._uPrvBtn[
            d.getFullYear() < model._nYearRangeStart ? 'disable' : 'enable'
            ]();
    };

    UI_X_CALENDAR_LAYER_CLASS.getDate = function () {
        return this._oModel.getDate();
    };

    UI_X_CALENDAR_LAYER_CLASS.getModel = function () {
        return this._oModel;
    };

    UI_X_CALENDAR_LAYER_CLASS.getValue = UI_X_CALENDAR_LAYER_CLASS.getDate;

    UI_X_CALENDAR_LAYER_CLASS.getTimeType = function () {
        return this._oModel.getTimeType();
    };

    UI_X_CALENDAR_LAYER_CLASS.init = function () {
        this._uMonthSlt && this._uMonthSlt.init();
        this._uYearSlt && this._uYearSlt.init();
        this._uCalView.init();
        UI_X_CALENDAR_LAYER.superClass.init.call(this);
    };

    //----------------------------------------------------
    // 下拉选择年月
    //----------------------------------------------------

    UI_X_CALENDAR_LAYER_SELECT_CLASS.onchange = function () {
        var par = this.getParent()
        par.$resetStepBtn();
        par.$flushCalView();
    };

    //----------------------------------------------------
    // 前进后退 button
    //----------------------------------------------------

    UI_X_CALENDAR_LAYER_STEP_BUTTON_CLASS.onclick = function () {
        var layer = this.getParent();
        var yearSlt = layer._uYearSlt;
        var monthSlt = layer._uMonthSlt;
        var d = [
            Number(getSltValue(yearSlt)),
            Number((getSltValue(monthSlt) || 1) - 1),
            1
        ];

        d = goViewStep(d, this._nStep, layer.getModel().getTimeType());
        setSltValue(yearSlt, d.getFullYear());
        setSltValue(monthSlt, d.getMonth() + 1);
        layer.$resetStepBtn();
        layer.$flushCalView();
    };

    //----------------------------------------------------
    // selmode 选择
    //----------------------------------------------------

    UI_X_CALENDAR_LAYER_SEL_MODE_CLASS.onclick = function (event) {
        var par = this.getParent();
        var target = event.target;
        if (target.tagName == 'INPUT') {
            var model = par.getModel()
            model.setDatasource({selMode: target.getAttribute('data-selmode')});
            par.$flushCalView();
            /**
             * @event
             */
            triggerEvent(par, 'change', null, [model.getDate()]);
        }
    };

    //----------------------------------------------------
    // Calendar Model
    //----------------------------------------------------

    function modelConstructor(options) {
        this._aDate = [];
        this._aDefaultDate = [];
        this._oRange = {};
        this._aHoverDate = [];

        this.setDatasource(options);
    };

    /**
     * 设置model数据
     *
     * @public
     * @param {Object} datasource 设置
     * @param {string} datasource.selMode
     * @param {Array.<Object>} datasource.selModeList
     * @param {string} datasource.timeType
     * @param {Object} datasource.range
     * @param {Date|string} datasource.range.start
     * @param {Date|string} datasource.range.end
     * @param {Date|string} datasource.range.offsetBase
     * @param {Date|string|Array} datasource.date 当前选中
     */
    UI_X_CALENDAR_MODEL_CLASS.setDatasource = function (datasource) {
        datasource = datasource || {};

        // 设置forbidEmpty
        if (datasource.forbidEmpty != null) {
            this._bForbidEmpty = datasource.forbidEmpty || false;
        }

        // 设置timeType
        if (datasource.timeType) {
            this._sTimeType = datasource.timeType;
            // 周模式下，使用日的日历表示，所以cellTimeType和timeType不同
            // 这是个坑，以后删改代码时可能会踩
            this._sCellTimeType = datasource.cellTimeType;
            if (this._sCellTimeType == 'W') {
                this._sCellTimeType = 'D';
            }
        }

        // 设置selModelList
        var selModeListChange;
        if (datasource.selModeList) {
            selModeListChange = this._aSelModeList = datasource.selModeList;
        }

        // 设置selMode (在传入selMode或者selModeList改变时)
        var newSelMode;
        if ((newSelMode = datasource.selMode) || selModeListChange) {
            // 改变selMode时，会做相应转化
            var oldSelMode = this._sSelMode;
            this._sSelMode = newSelMode || selModeListChange[0].value;
            this.$switchSelMode(oldSelMode, newSelMode);
        }

        // 设置range
        var range = datasource.range;
        if (range) {
            this._oRange = parseRange(
                range.start,
                range.end,
                range.offsetBase,
                this._sCellTimeType
            );
            this.$clipByRange(this._aDate);
        }

        // 设置defaultDate
        var aDefaultDate = datasource.defaultDate;
        if (aDefaultDate) {
            this._aDefaultDate = this.$parseADate(aDefaultDate);
        }

        // 设置_aDate
        var aDate = datasource.date;
        if (aDate) {
            this._aDate = this.$parseADate(aDate);
        }

        // 如果禁止为空
        if (this._bForbidEmpty && !this._aDate.length) {
            this._aDate = cloneADate(this._aDefaultDate);
        }

        // 规整
        if (this._sSelMode == 'SINGLE') {
            this._aDate = this._aDate.slice(0, 1);
        }
        else if (this._sSelMode == 'RANGE') {
            this._aDate = this._aDate.slice(0, 2);
        }
    };

    UI_X_CALENDAR_MODEL_CLASS.$parseADate = function (aDate) {
        var aDate = parseInputDate(aDate) || [];
        if (!isArray(aDate)) {
            aDate = [aDate];
        }

        if (this._sSelMode == 'RANGE'
            && aDate[0]
            && aDate[1]
            && compareDate(aDate[0], aDate[1], this._sCellTimeType) > 0
        ) {
            var tmp = aDate[1];
            aDate[1] = aDate[0];
            aDate[0] = tmp;
        }
        this.$clipByRange(aDate);

        return aDate;
    };

    UI_X_CALENDAR_MODEL_CLASS.getDate = function () {
        return this._aDate;
    };

    UI_X_CALENDAR_MODEL_CLASS.getDefaultDate = function () {
        return this._aDefaultDate;
    };

    UI_X_CALENDAR_MODEL_CLASS.getTimeType = function () {
        return this._sTimeType;
    };

    UI_X_CALENDAR_MODEL_CLASS.goStep = function (step) {
        for (var i = 0, d; i < this._aDate.length; i++) {
            if (d = this._aDate[i]) {
                this._aDate[i] = goCellStep(d, step, this._sTimeType);
            }
        }
    };

    UI_X_CALENDAR_MODEL_CLASS.getHoverDate = function (selMode) {
        return this._aHoverDate || [];
    };

    UI_X_CALENDAR_MODEL_CLASS.getSelMode = function () {
        return this._sSelMode;
    };

    UI_X_CALENDAR_MODEL_CLASS.getSelModeList = function () {
        return this._aSelModeList;
    };

    UI_X_CALENDAR_MODEL_CLASS.getRange = function () {
        return this._oRange;
    };

    UI_X_CALENDAR_MODEL_CLASS.$clipByRange = function (aDate) {
        var range = this.getRange();
        var timeType = this._sTimeType;

        for (var i = 0, date; i < aDate.length;) {
            if ((date = aDate[i])
                && (!range.start || compareDate(date, range.start, timeType) >= 0)
                && (!range.end || compareDate(range.end, date, timeType) >= 0)
            ) {
                i++;
            }
            else {
                this._sSelMode == 'RANGE'
                    // range模式下如果不在范围内则全清空
                    ? (aDate = [])
                    : aDate.splice(i, 1);
            }
        }
    };

    UI_X_CALENDAR_MODEL_CLASS.testEdge = function (step) {
        var timeType = this._sTimeType;
        var aDate = this.getDate().slice();
        var range = this.getRange();
        var m;

        var lowerBound = range.start;
        var upperBound = range.end;

        if (!lowerBound) {
            lowerBound = [this._nYearRangeStart, 0, 1];
        }
        if (!upperBound) {
            upperBound = [this._nYearRangeEnd, 11, 31];
        }

        if (!aDate.length) {
            return false;
        }

        if (step < 0 && lowerBound) {
            m = minDate.apply(null, [timeType].concat(aDate));

            return compareDate(
                    goCellStep(m, step, timeType),
                    lowerBound,
                    timeType
                ) >= 0;
        }
        else if (step > 0 && upperBound) {
            m = maxDate.apply(null, [timeType].concat(aDate));

            return compareDate(
                    goCellStep(m, step, timeType),
                    upperBound,
                    timeType
                ) <= 0;
        }
        else {
            return true;
        }
    };

    UI_X_CALENDAR_MODEL_CLASS.udateDateByClick = function (thisClick) {
        var modelDate = this.getDate();
        var selMode = this.getSelMode();
        var hasChange = true;
        var timeType = this._sTimeType;

        if (selMode == 'RANGE') {
            modelDate[0] && !modelDate[1]
                // 只选了上界的情况
                ? (modelDate[1] = thisClick)
                // 未选或者已全选的情况
                : (modelDate = [thisClick])
        }
        else if (selMode == 'SINGLE') {
            modelDate[0] && compareDate(modelDate[0], thisClick, timeType) == 0
                ? (hasChange = false)
                : (modelDate[0] = thisClick);
        }
        else if (selMode == 'MULTIPLE') {
            var del = false;
            for (var i = 0, o; o = modelDate[i];) {
                if (compareDate(o, thisClick, timeType) == 0) {
                    modelDate.splice(i, 1);
                    del = true;
                }
                else {
                    i++;
                }
            }
            !del && modelDate.push(thisClick);
        }

        // 更新model
        this.setDatasource({date: modelDate});

        return hasChange;
    };

    UI_X_CALENDAR_MODEL_CLASS.updateHoverDate = function (refDate, isHover) {
        var dateArr = [];
        var modelDate = this.getDate();

        if (!isHover) {
            this._aHoverDate = [];
        }
        else {
            if (this._sSelMode == 'RANGE' && modelDate[0] && !modelDate[1]) {
                if (compareDate(modelDate[0], refDate, this._sTimeType) > 0) {
                    dateArr = [refDate, modelDate[0]];
                }
                else {
                    dateArr = [modelDate[0], refDate];
                }
            }
            else {
                dateArr = [refDate];
            }
            this._aHoverDate = dateArr;
        }
    };

    UI_X_CALENDAR_MODEL_CLASS.$switchSelMode = function (oldSelMode, newSelMode) {
        if (oldSelMode == newSelMode || oldSelMode == null || newSelMode == null) {
            return;
        }
        else {
            this._aDate = [];
        }
    }

})();

/**
 * ecui.ui.XCalendar
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * @file:    富日历，
 *           支持日、周、月、季不同粒度时间选择，
 *           支持单选、多选、范围选
 * @author:  sushuang(sushuang@baidu.com)
 * @depend:  ecui
 */

(function () {

    var core = ecui;
    var array = core.array;
    var dom = core.dom;
    var ui = core.ui;
    var string = core.string;
    var util = core.util;
    var cutil = ui.XCalendarUtil;

    var DATE = Date;
    var REGEXP = RegExp;
    var DOCUMENT = document;
    var objProtoToString = Object.prototype.toString;
    var REGEXP = RegExp;

    var children = dom.children;
    var createDom = dom.create;
    var getParent = dom.getParent;
    var getPosition = dom.getPosition;
    var moveElements = dom.moveElements;
    var setText = dom.setText;
    var addClass = dom.addClass;
    var formatDate = string.formatDate;
    var getByteLength = string.getByteLength;
    var encodeHTML = string.encodeHTML;
    var sliceByte = string.sliceByte;
    var indexOf = array.indexOf;
    var getView = util.getView;
    var blank = util.blank;
    var extend = util.extend;
    var getWeekInfo = cutil.getWeekInfo;
    var getQuarter = cutil.getQuarter;
    var minDate = cutil.minDate;
    var maxDate = cutil.maxDate;
    var arrProtoSlice = Array.prototype.slice;

    var $fastCreate = core.$fastCreate;
    var inheritsControl = core.inherits;
    var triggerEvent = core.triggerEvent;
    var setFocused = core.setFocused;

    var UI_CONTROL = ui.Control;
    var UI_CONTROL_CLASS = UI_CONTROL.prototype;
    var UI_INPUT_CONTROL = ui.InputControl;
    var UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype;
    var UI_SELECT = ui.Select;
    var UI_BUTTON = ui.Button;
    var UI_LAYER = ui.XCalendarLayer;

    //-------------------------------------------------
    // 类型声明
    //-------------------------------------------------

    /**
     * 日历控件类
     *
     * @class
     * @param {Object} options 初始化选项，除去下面列出的参数，其余参见setDatasource
     * @param {string=} options.headText 最前面的显示文字，默认为：'时间粒度：'
     * @param {string=} options.rangeLinkStr 范围选择模式下，显示出的当前选中时间的连接符，默认为' 至 '
     * @param {string=} options.weekLinkStr 时间类型为周时，显示出的周首尾的连接符，默认为' ~ '
     * @param {string=} options.blankText 当前无选中时显示的文本，默认为'请选择时间'
     */
    var UI_X_CALENDAR = ui.XCalendar =
        inheritsControl(
            UI_INPUT_CONTROL,
            'ui-x-calendar',
            function (el, options) {
                options.hidden = true;
            },
            function (el, options) {
                var type = this.getTypes()[0];
                var i;
                var item;
                var selected;
                var html = [];
                var domIndex = 0;
                var domIndexTimeType;
                var domIndexInfo;
                var domIndexLayer;
                var shiftBtnDisabled = this._bShiftBtnDisabled = options.shiftBtnDisabled;

                this._oTextOptions = {
                    blankText: options.blankText,
                    rangeLinkStr: options.rangeLinkStr,
                    weekLinkStr: options.weekLinkStr
                };

                // 提示字符
                var headText = options.headText;
                if (headText == null) {
                    headText = '时间粒度：'
                    html.push('<span class="' + type + '-head-text">' + encodeHTML(headText) + '</span>');
                    domIndex++;
                }

                // 时间类度选择下拉框
                html.push('<select class="' + type + '-slt-timetype' + UI_SELECT.TYPES + '">');
                html.push('</select>');
                domIndexTimeType = domIndex++;

                // 当前选择信息与切换
                html.push(
                    '<span class="' + type + '-btn-prv ' + type + '-btn"></span>',
                    '<span class="' + type + '-text"></span>',
                    '<span class="' + type + '-btn-cancel ' + type + '-btn""></span>',
                    '<span class="' + type + '-btn-cal ' + type + '-btn"></span>',
                    '<span class="' + type + '-btn-nxt ' + type + '-btn"></span>'
                );
                domIndexInfo = domIndex;
                domIndex += 5;

                // 日历layer
                domIndexLayer = domIndex;
                var tList = ['D', 'W', 'M', 'Q'];
                for (i = 0; item = tList[i]; i++) {
                    html.push('<div class="' + type + '-layer" style="position:absolute;display:none"></div>');
                    domIndex++;
                }

                // 以下开始创建子控件实例
                var o = createDom();
                o.innerHTML = html.join('');
                var child = children(o);
                var node;

                // 时间类型选择
                if (domIndexTimeType != null) {
                    this._uTimeTypeSlt = $fastCreate(
                        this.Select, child[domIndexTimeType], this
                    );
                }

                // 显示当前选择文本
                this._eText = child[domIndexInfo + 1];

                // prev一天按钮
                node = child[domIndexInfo];
                if (shiftBtnDisabled) {
                    node.style.display = 'none';
                }
                this._uBtnPrv = $fastCreate(
                    this.Button, node, this, {command: 'prv', icon: true}
                );

                // 取消选择按钮
                node = child[domIndexInfo + 2];
                this._uBtnCancel = $fastCreate(
                    this.Button, node, this, {command: 'cancel', icon: true}
                );

                // 小日历按钮
                node = child[domIndexInfo + 3];
                this._uBtnCal = $fastCreate(
                    this.Button, node, this, {command: 'cal', icon: true}
                );

                // next一天按钮
                node = child[domIndexInfo + 4];
                if (shiftBtnDisabled) {
                    node.style.display = 'none';
                }
                this._uBtnNxt = $fastCreate(
                    this.Button, node, this, {command: 'nxt', icon: true}
                );

                // layers
                var layers = this._oLayers = {};
                i = 0;
                for (i = 0; item = tList[i]; i++) {
                    node = child[domIndexLayer + i];
                    DOCUMENT.body.appendChild(node);
                    // 延后创建
                    layers[item] = node;
                }

                moveElements(o, el, true);

                // 初始化数据
                this.setDatasource(options);
            }
        );

    var UI_X_CALENDAR_CLASS = UI_X_CALENDAR.prototype;

    var UI_X_CALENDAR_BUTTON_CLASS = (
        UI_X_CALENDAR_CLASS.Button = inheritsControl(
            UI_BUTTON,
            null,
            function (el, options) {
                var o = createDom();
                var type = this.getType();

                moveElements(el, o, true);
                el.innerHTML = '<span class="' + type + '-inner"></span>';
                moveElements(o, el.firstChild, true);

                if (options.icon) {
                    o = createDom(type + '-icon', '', 'span');
                    el.appendChild(o);
                }

                this._sCommand = options.command;
            }
        )
    ).prototype;

    var UI_X_CALENDAR_SELECT_CLASS = (
        UI_X_CALENDAR_CLASS.Select = inheritsControl(UI_SELECT, null)
    ).prototype;

    UI_X_CALENDAR_SELECT_CLASS.Options = inheritsControl(
        UI_X_CALENDAR_SELECT_CLASS.Options,
        null,
        null,
        function (el, options) {
            addClass(el, 'ui-x-calendar-select-options');
        }
    );

    var UI_X_CALENDAR_LAYER_CLASS = (
        UI_X_CALENDAR_CLASS.Layer = inheritsControl(UI_LAYER)
    ).prototype;

    var UI_X_CALENDAR_MODEL = UI_X_CALENDAR_LAYER_CLASS.Model;
    var UI_X_CALENDAR_MODEL_CLASS = UI_X_CALENDAR_MODEL.prototype;

    //-------------------------------------------------
    // 常量
    //-------------------------------------------------

    var PATTERN_SHOW_DATE = 'yyyy-MM-dd';
    var PATTERN_SHOW_MONTH = 'yyyy-MM';
    var DATE_ZERO = new Date(0);

    //----------------------------------------------
    // UI_X_CALENDAR_CLASS 的方法
    //----------------------------------------------

    /**
     * 设置数据
     *
     * @param {Object} datasource 初始化选项
     * @param {string} datasource.preText
     * @param {string=} datasource.timeType 初始的时间类度，可为'D'（日）, 'W'（周）, 'M'（月）, 'Q'（季），缺省则取'D'
     * @param {Array=} datasource.timeTypeList 时间粒度选择列表，如果为[]则没有时间粒度选择，如果为null则全部开启
     *      每项结构例如：{ text: '文字文字', value: 'D' }，其中value与timeTypeOpt的key相对应。
     * @param {Object=} datasource.timeTypeOpt 按时间粒度的日历定义，此参数结构可为：
     *      {
     *          D: { ... 日历定义 },
     *          W: { ... 日历定义 },
     *          M: { ... 日历定义 },
     *          Q: { ... 日历定义 }   
     *      }
     *      其中，"日历定义"的参数内容参见x-calendar-layer.js
     * @param {boolean} datasource.disableCancelBtn
     * @param {boolean} datasource.disablePreviousBtn
     * @param {boolean} datasource.disableNextBtn
     * @param {boolean=} datasource.forbidEmpty 禁止时间为空，如果为空，则设置为默认date。默认notEmpty为false
     */
    UI_X_CALENDAR_CLASS.setDatasource = function (datasource, silent, renderOpt) {
        datasource = datasource || {};

        var timeTypeOpt = datasource.timeTypeOpt || {};
        var timeTypeList = this._aTimeTypeList = datasource.timeTypeList
            || [
                {text: '日', value: 'D'},
                {text: '周', value: 'W'},
                {text: '月', value: 'M'},
                {text: '季', value: 'Q'}
            ];
        var models = this._oModels = {};
        var timeType = this._sTimeType = datasource.timeType
            || (timeTypeList.length ? timeTypeList[0].value : void 0);

        if (datasource.disableCancelBtn) {
            this._uBtnCancel.hide();
        }
        if (datasource.disablePreviousBtn) {
            this._uBtnPrv.hide();
        }
        if (datasource.disableNextBtn) {
            this._uBtnNxt.hide();
        }

        // 创建或重置layer的model
        for (var i = 0, t, opt, dft; t = timeTypeList[i]; i++) {
            t = t.value;
            opt =
                timeTypeOpt[t] =
                    extend({timeType: t}, timeTypeOpt[t]);

            // 设默认值
            dft = UI_X_CALENDAR_MODEL_CLASS.DEFAULT;
            if (!opt.selMode) {
                opt.selMode = dft.selMode;
            }
            if (!opt.timeType) {
                opt.timeType = dft.timeType;
            }
            if (!opt.selModeList) {
                opt.selModeList = dft.selModeList;
            }
            if (!opt.defaultDate) {
                opt.defaultDate = opt.date;
            }
            opt.forbidEmpty = datasource.forbidEmpty || false;

            !models[t]
                ? (models[t] = new UI_X_CALENDAR_MODEL(opt))
                : models[t].setDatasource(opt);
        }

        !silent && this.render(renderOpt);
    };

    /**
     * 渲染
     *
     * @public
     * @param {Object} opt
     * @param {Date} viewDate 决定面板显示的日期
     * @param {boolean} remainSlt 是不时重新绘制日期选择下拉框
     * @param {boolean} remainLayer 是不是保留layer显示
     */
    UI_X_CALENDAR_CLASS.render = function (opt) {
        opt = opt || {};

        var timeType = this._sTimeType;

        if (!timeType) {
            return;
        }

        var models = this._oModels;
        var timeTypeList = this._aTimeTypeList;
        var layers = this._oLayers;

        !opt.remainSlt && this.$resetTimeTypeSlt();

        for (var i = 0, t, layer, isNew; t = timeTypeList[i]; i++) {
            t = t.value;
            isNew = false;

            // 创建并初始化layer
            if (!(layers[t] instanceof UI_CONTROL)) {
                layers[t] = $fastCreate(
                    this.Layer, layers[t], this, {model: models[t]}
                );
                layers[t].init();
                isNew = true;
            }

            layer = layers[t];

            if (t == timeType) {
                if (layer._bLayerShow && !opt.remainLayer) {
                    layer.hide();
                }
            }
            else {
                layers[t].hide();
            }
        }

        this.$flushThis();
    };

    UI_X_CALENDAR_CLASS.$setSize = new Function();

    UI_X_CALENDAR_CLASS.$resetTimeTypeSlt = function () {
        var timeTypeList = this._aTimeTypeList;
        var slt = this._uTimeTypeSlt;
        if (!slt) {
            return;
        }

        // 清除
        slt.setValue(null);
        while (slt.remove(0)) {
        }

        // 添加
        for (var i = 0, t, item; t = timeTypeList[i]; i++) {
            slt.add(String(t.text), null, {value: t.value});
        }

        slt.setValue(this._sTimeType);
    };

    UI_X_CALENDAR_CLASS.$showLayer = function () {
        var layer = this.getCurrLayer();
        var anchor = this._bShiftBtnDisabled
            ? this._eText : this._uBtnPrv.getOuter();
        var pos = getPosition(anchor);
        var posTop = pos.top + this.getHeight();

        if (!layer._bLayerShow) {
            layer.render({remainSlt: true, remainSelMode: true});
            layer.show();
            setFocused(layer);

            var height = layer.getHeight();
            layer.setPosition(
                pos.left,
                posTop + height <= getView().bottom
                    ? posTop : pos.top - height
            );
        }
    }

    UI_X_CALENDAR_CLASS.$clear = function () {
        var model = this.getModel();
        this.getModel().setDatasource({date: []});
        this.$flushThis();
    }

    UI_X_CALENDAR_CLASS.$flushThis = function () {
        var curDate = this._oDate;
        var model = this.getModel();

        var txt = this.$getShowText();
        this._eText.innerHTML = txt.shortHTML;
        txt.fullText && this._eText.setAttribute('title', txt.fullText);
        this._uBtnPrv[model.testEdge(-1) ? 'enable' : 'disable']();
        this._uBtnNxt[model.testEdge(1) ? 'enable' : 'disable']();
    }

    UI_X_CALENDAR_CLASS.$getSingleText = function (date) {
        options = this._oTextOptions || {};
        var model = this.getModel();
        var timeType = this._sTimeType;

        if (!date) {
            return '';
        }

        if (timeType == 'D') {
            return formatDate(date, PATTERN_SHOW_DATE);
        }
        else if (timeType == 'W') {
            var weekInfo = getWeekInfo(date);
            var range = model.getRange();
            // 只有week时有range问题，因为week是用日显示的，
            // 当range在半周时会表现出来
            return formatDate(
                    range.start
                        ? maxDate('D', weekInfo.workday, range.start)
                        : weekInfo.workday,
                    PATTERN_SHOW_DATE
                )
                + (options.weekLinkStr || ' ~ ')
                + formatDate(
                    range.end
                        ? minDate('D', weekInfo.weekend, range.end)
                        : weekInfo.weekend,
                    PATTERN_SHOW_DATE
                );
        }
        else if (timeType == 'M') {
            return formatDate(date, PATTERN_SHOW_MONTH);
        }
        else if (timeType == 'Q') {
            return date.getFullYear() + '-Q' + getQuarter(date);
        }
    };

    UI_X_CALENDAR_CLASS.$getShowText = function () {
        options = this._oTextOptions || {};
        var type = this.getType();
        var model = this.getModel();
        var aDate = model.getDate();
        var timeType = this._sTimeType;
        var selMode = model.getSelMode();
        var shortText;
        var fullText;
        var rangeLinkStr = options.rangeLinkStr || ' 至 ';
        var tmp;

        if (!aDate[0]) {
            shortHTML = [
                '<span class="', type, '-blank', '">',
                encodeHTML(options.blankText || '请选择时间'),
                '</span>'
            ].join('');
            return {shortHTML: shortHTML, fullText: ''};
        }

        if (selMode == 'SINGLE') {
            fullText = shortText = this.$getSingleText(aDate[0], options);
        }
        else if (selMode == 'RANGE') {
            if (timeType == 'W') {
                shortText = this.$getSingleText(aDate[0], options);
                tmp = this.$getSingleText(aDate[1], options);
                fullText = '[' + shortText + ']'
                    + rangeLinkStr + (tmp ? '[' + tmp + ']' : '');
                shortText += ', ...';
            }
            else {
                shortText = fullText = this.$getSingleText(aDate[0], options)
                    + rangeLinkStr
                    + this.$getSingleText(aDate[1], options);
            }
        }
        else if (selMode == 'MULTIPLE') {
            shortText = this.$getSingleText(aDate[0], options) + ', ...';
            fullText = [];
            for (var i = 0; i < aDate.length; i++) {
                fullText.push(this.$getSingleText(aDate[i], options));
            }

            fullText = '[' + fullText.join('], [') + ']';
        }

        return {shortHTML: encodeHTML(shortText), fullText: fullText};
    };

    UI_X_CALENDAR_CLASS.$click = function (event) {
        UI_INPUT_CONTROL_CLASS.$click.call(this);
        if (event.target == this._eText) {
            this.$showLayer();
        }
    };

    UI_X_CALENDAR_CLASS.$activate = function (event) {
        UI_INPUT_CONTROL_CLASS.$activate.call(this, event);
        this.$showLayer();
    };

    UI_X_CALENDAR_CLASS.$goStep = function (step) {
        this.getModel().goStep(step);
        this.getCurrLayer().render({remainSlt: true, remainSelMode: true});
        this.$flushThis();
    };

    UI_X_CALENDAR_CLASS.getModel = function () {
        return this.getCurrLayer().getModel();
    };

    UI_X_CALENDAR_CLASS.getCurrLayer = function () {
        return this._oLayers[this._sTimeType];
    };

    UI_X_CALENDAR_CLASS.getDate = function () {
        return this.getModel().getDate();
    };

    UI_X_CALENDAR_CLASS.getValue = UI_X_CALENDAR_CLASS.getDate;

    UI_X_CALENDAR_CLASS.getTimeType = function () {
        return this.getModel().getTimeType();
    };

    UI_X_CALENDAR_CLASS.getSelMode = function () {
        return this.getModel().getSelMode();
    };

    UI_X_CALENDAR_CLASS.init = function () {
        UI_INPUT_CONTROL_CLASS.init.call(this);
        this._uBtnCal.init();
        this._uBtnCancel.init();
        this._uBtnNxt.init();
        this._uBtnPrv.init();
        this._uTimeTypeSlt.init();
    };

    //----------------------------------------------
    // UI_X_CALENDAR_BUTTON_CLASS 的方法
    //----------------------------------------------

    UI_X_CALENDAR_BUTTON_CLASS.$click = function (event) {
        var par = this.getParent();
        var changed;
        switch (this._sCommand) {
            case 'prv':
                par.$goStep(-1);
                changed = true;
                break;
            case 'nxt':
                par.$goStep(1);
                changed = true;
                break;
            case 'cal':
                par.$showLayer();
                break;
            case 'cancel':
                par.$clear();
                changed = true;
                break;
        }

        /**
         * @event
         */
        triggerEvent(
            par, 'change', null, [par.getModel().getDate().slice()]
        );

        event.exit();
    };

    //----------------------------------------------
    // UI_X_CALENDAR_SELECT_CLASS 的方法
    //----------------------------------------------

    UI_X_CALENDAR_SELECT_CLASS.onchange = function () {
        var par = this.getParent();
        par._sTimeType = this.getValue();
        par.$flushThis();

        /**
         * @event
         */
        triggerEvent(
            par, 'change', null, [par.getModel().getDate().slice()]
        );
    };

    //--------------------------------------------------------------
    // UI_X_CALENDAR_LAYER_CLASS 的方法
    //--------------------------------------------------------------

    UI_X_CALENDAR_LAYER_CLASS.$blur = function () {
        this.hide();
    };

    UI_X_CALENDAR_LAYER_CLASS.onchange = function () {
        var par = this.getParent();
        par.$flushThis();
        this._bLayerChanged = true;
    };

    UI_X_CALENDAR_LAYER_CLASS.ondateclick = function () {
        var model = this.getModel();
        var selMode = model.getSelMode();
        var aDate = model.getDate();

        if (selMode == 'SINGLE') {
            this.hide();
        }
    };

    UI_X_CALENDAR_LAYER_CLASS.show = function () {
        this._bLayerShow = true;
        this._bLayerChanged = false;
        UI_X_CALENDAR_CLASS.Layer.superClass.show.apply(this, arguments);
    };

    UI_X_CALENDAR_LAYER_CLASS.hide = function () {
        if (this._bLayerShow) {

            var par = this.getParent();
            var model = this.getModel();
            var selMode = model.getSelMode();
            var aDate = model.getDate();

            // 对于范围选择时只选了一半就关掉日历面板的情况，直接补全
            if (selMode == 'RANGE' && aDate[0] && !aDate[1]) {
                aDate[1] = new Date(aDate[0].getTime());
                par.$flushThis();
            }

            par && triggerEvent(par, 'layerhide');

            if (this._bLayerChanged) {
                triggerEvent(
                    par, 'change', null, [this.getModel().getDate().slice()]
                );
                this._bLayerChanged = false;
            }
        }

        this._bLayerShow = false;

        UI_X_CALENDAR_CLASS.Layer.superClass.hide.apply(this, arguments);
    };

})();


/*
 TreeView - 定义树形视图的基本操作。
 树视图控件，继承自基础控件，不可以被改变大小，可以包含普通子控件或者子树视图控件，普通子控件显示在它的文本区域，如果是子树视图控件，将在专门的子树视图控件区域显示。子树视图控件区域可以被收缩隐藏或是展开显示，默认情况下点击树视图控件就改变子树视图控件区域的状态。

 树视图控件直接HTML初始化的例子:
 <div ecui="type:tree-view;">
 <!-- 显示的文本，如果没有label整个内容就是节点的文本 -->
 <label>公司</label>
 <!-- 子控件 -->
 <div>董事会</div>
 <div>监事会</div>
 <div>
 <label>总经理</label>
 <div>行政部</div>
 <div>人事部</div>
 <div>财务部</div>
 <div>市场部</div>
 <div>销售部</div>
 <div>技术部</div>
 </div>
 </div>

 属性
 _bCollapsed    - 是否收缩子树
 _eChildren     - 子控件区域Element对象
 _aChildren     - 子控件集合
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        indexOf = array.indexOf,
        remove = array.remove,
        addClass = dom.addClass,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getStyle = dom.getStyle,
        insertAfter = dom.insertAfter,
        removeClass = dom.removeClass,
        trim = string.trim,
        extend = util.extend,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        getMouseX = core.getMouseX,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_TREE_VIEW
    ///__gzip_original__UI_TREE_VIEW_CLASS
    /**
     * 初始化树视图控件。
     * options 对象支持的属性如下：
     * collapsed      子树区域是否收缩，默认为展开
     * expandSelected 是否展开选中的节点，如果不自动展开，需要点击左部的小区域图标才有效，默认自动展开
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_TREE_VIEW = ui.TreeView =
            inheritsControl(
                UI_CONTROL,
                'ui-treeview',
                function (el, options) {
                    options.resizable = false;

                    var o = first(el);

                    // 检查是否存在label标签，如果是需要自动初始化树的子结点
                    if (o && o.tagName == 'LABEL') {
                        // 初始化子控件
                        for (
                            var i = 0,
                                list = children(el).slice(1),
                                childItems = UI_TREE_VIEW_SETITEMS(this, el.appendChild(createDom()));
                            o = list[i++];
                        ) {
                            childItems.appendChild(o);
                        }

                        addClass(
                            el,
                            options.current = options.primary + (options.collapsed ? '-collapsed' : '-expanded')
                        );

                        if (options.collapsed) {
                            childItems.style.display = 'none';
                        }
                    }
                },
                function (el, options) {
                    var childTrees = this._aChildren = [];

                    this._bCollapsed = options.collapsed || false;
                    this._bExpandSelected = options.expandSelected !== false;

                    // 初始化子控件
                    for (
                        var i = 0,
                            list = children(el.lastChild),
                            o;
                        o = list[i];
                    ) {
                        delete options.current;
                        (childTrees[i++] = UI_TREE_VIEW_CREATE_CHILD(o, this, options)).$setParent(this);
                    }
                }
            ),
        UI_TREE_VIEW_CLASS = UI_TREE_VIEW.prototype;
//{else}//
    /**
     * 设置树视图控件的选项组 Element 对象。
     * @private
     *
     * @param {ecui.ui.TreeView} tree 树视图控件
     * @param {HTMLElement} items 子树选项组的 Element 对象
     * @return {HTMLElement} items 子树选项组的 Element 对象
     */
    function UI_TREE_VIEW_SETITEMS(tree, items) {
        tree._eChildren = items;
        items.className = tree.getType() + '-children';
        items.style.cssText = '';
        return items;
    }

    /**
     * 树视图控件刷新，根据子树视图控件的数量及显示的状态设置样式。
     * @private
     *
     * @param {ecui.ui.TreeView} control 树视图控件
     */
    function UI_TREE_VIEW_FLUSH(control) {
        control.setClass(
            control.getPrimary() + (control._aChildren.length ? control._bCollapsed ? '-collapsed' : '-expanded' : '')
        );
    }

    /**
     * 建立子树视图控件。
     * @private
     *
     * @param {HTMLElement} el 子树的 Element 对象
     * @param {ecui.ui.TreeView} parent 父树视图控件
     * @param {Object} options 初始化选项，参见 create 方法
     * @return {ecui.ui.TreeView} 子树视图控件
     */
    function UI_TREE_VIEW_CREATE_CHILD(el, parent, options) {
        el.className = (trim(el.className) || parent.getPrimary()) + parent.constructor.agent.TYPES;
        return $fastCreate(parent.constructor, el, null, extend(extend({}, options), getOptions(el)));
    }

    /**
     * 收缩/展开子树区域。
     * @private
     *
     * @param {ecui.ui.TreeView} control 树视图控件
     * @param {boolean} status 是否隐藏子树区域
     * @return {boolean} 状态是否改变
     */
    function UI_TREE_VIEW_SET_COLLAPSE(control, status) {
        if (control._eChildren && control._bCollapsed != status) {
            control._eChildren.style.display = (control._bCollapsed = status) ? 'none' : '';
            UI_TREE_VIEW_FLUSH(control);
        }
    }

    /**
     * 控件点击时改变子树视图控件的显示/隐藏状态。
     * @override
     */
    UI_TREE_VIEW_CLASS.$click = function (event) {
        if (event.getControl() == this) {
            UI_CONTROL_CLASS.$click.call(this, event);

            if (getMouseX(this) <= toNumber(getStyle(this.getBody(), 'paddingLeft'))) {
                // 以下使用 event 代替 name
                this[event = this.isCollapsed() ? 'expand' : 'collapse']();
                triggerEvent(this, event);
            }
            else {
                this.select();
            }
        }
    };

    /**
     * @override
     */
    UI_TREE_VIEW_CLASS.$dispose = function () {
        this._eChildren = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 隐藏树视图控件的同时需要将子树区域也隐藏。
     * @override
     */
    UI_TREE_VIEW_CLASS.$hide = function () {
        UI_CONTROL_CLASS.$hide.call(this);

        if (this._eChildren) {
            this._eChildren.style.display = 'none';
        }
    };

    /**
     * 树视图控件改变位置时，需要将自己的子树区域显示在主元素之后。
     * @override
     */
    UI_TREE_VIEW_CLASS.$setParent = function (parent) {
        var root = this.getRoot(),
            o = this.getParent();

        if (this == root._cSelected || this == root) {
            // 如果当前节点被选中，需要先释放选中
            // 如果当前节点是根节点，需要释放选中
            if (root._cSelected) {
                root._cSelected.alterClass('-selected');
            }
            root._cSelected = null;
        }
        else {
            remove(o._aChildren, this);
            UI_TREE_VIEW_FLUSH(o);
        }

        UI_CONTROL_CLASS.$setParent.call(this, parent);

        // 将子树区域显示在主元素之后
        if (this._eChildren) {
            insertAfter(this._eChildren, this.getOuter());
        }
    };

    /**
     * 显示树视图控件的同时需要将子树视图区域也显示。
     * @override
     */
    UI_TREE_VIEW_CLASS.$show = function () {
        UI_CONTROL_CLASS.$show.call(this);

        if (this._eChildren && !this._bCollapsed) {
            this._eChildren.style.display = '';
        }
    };

    /**
     * 添加子树视图控件。
     * @public
     *
     * @param {string|ecui.ui.TreeView} item 子树视图控件的 html 内容/树视图控件
     * @param {number} index 子树视图控件需要添加的位置序号，不指定将添加在最后
     * @param {Object} options 子树视图控件初始化选项
     * @return {ecui.ui.TreeView} 添加的树视图控件
     */
    UI_TREE_VIEW_CLASS.add = function (item, index, options) {
        var list = this._aChildren,
            o;

        if (!this._eChildren) {
            UI_TREE_VIEW_SETITEMS(this, createDom());
            insertAfter(this._eChildren, this.getOuter());
            this._eChildren.style.display = this._bCollapsed ? 'none' : '';
        }

        if (o = list[index]) {
            o = o.getOuter();
        }
        else {
            index = list.length;
            o = null;
        }

        if ('string' == typeof item) {
            o = this._eChildren.insertBefore(createDom(), o);
            o.innerHTML = item;
            item = UI_TREE_VIEW_CREATE_CHILD(o, this, options);
        }
        else {
            this._eChildren.insertBefore(item.getOuter(), o);
        }

        // 这里需要先 setParent，否则 getRoot 的值将不正确
        item.$setParent(this);
        list.splice(index, 0, item);

        UI_TREE_VIEW_FLUSH(this);

        return item;
    };

    /**
     * 收缩当前树视图控件的子树区域。
     * @public
     */
    UI_TREE_VIEW_CLASS.collapse = function () {
        UI_TREE_VIEW_SET_COLLAPSE(this, true);
    };

    /**
     * 展开当前树视图控件的子树区域。
     * @public
     */
    UI_TREE_VIEW_CLASS.expand = function () {
        UI_TREE_VIEW_SET_COLLAPSE(this, false);
    };

    /**
     * 获取当前树视图控件的所有子树视图控件。
     * @public
     *
     * @return {Array} 树视图控件列表
     */
    UI_TREE_VIEW_CLASS.getChildren = function () {
        return this._aChildren.slice();
    };

    /**
     * 获取当前树视图控件的第一个子树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getFirst = function () {
        return this._aChildren[0] || null;
    };

    /**
     * 获取当前树视图控件的最后一个子树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getLast = function () {
        return this._aChildren[this._aChildren.length - 1] || null;
    };

    /**
     * 获取当前树视图控件的后一个同级树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getNext = function () {
        var parent = this.getParent();
        return parent instanceof UI_TREE_VIEW && parent._aChildren[indexOf(parent._aChildren, this) + 1] || null;
    };

    /**
     * 获取当前树视图控件的前一个同级树视图控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件，如果没有，返回 null
     */
    UI_TREE_VIEW_CLASS.getPrev = function () {
        var parent = this.getParent();
        return parent instanceof UI_TREE_VIEW && parent._aChildren[indexOf(parent._aChildren, this) - 1] || null;
    };

    /**
     * 获取当前树视图控件的根控件。
     * @public
     *
     * @return {ecui.ui.TreeView} 树视图控件的根控件
     */
    UI_TREE_VIEW_CLASS.getRoot = function () {
        for (
            var o = this, parent;
            // 这里需要考虑Tree位于上一个Tree的节点内部
            (parent = o.getParent()) instanceof UI_TREE_VIEW && indexOf(parent._aChildren, o) >= 0;
            o = parent
        ) {
        }
        return o;
    };

    /**
     * 获取当前树视图控件选中的节点。
     * @public
     *
     * @return {ecui.ui.TreeView} 选中的节点
     */
    UI_TREE_VIEW_CLASS.getSelected = function () {
        return this.getRoot()._cSelected || null;
    };

    /**
     * @override
     */
    UI_TREE_VIEW_CLASS.init = function () {
        UI_CONTROL_CLASS.init.call(this);
        for (var i = 0, list = this._aChildren, o; o = list[i++];) {
            o.init();
        }
    };

    /**
     * 当前子树区域是否收缩。
     * @public
     *
     * @return {boolean} true 表示子树区域收缩，false 表示子树区域展开
     */
    UI_TREE_VIEW_CLASS.isCollapsed = function () {
        return !this._eChildren || this._bCollapsed;
    };

    /**
     * 将当前节点设置为选中。
     * @public
     */
    UI_TREE_VIEW_CLASS.select = function () {
        var root = this.getRoot();

        if (root._cSelected != this) {
            if (root._cSelected) {
                root._cSelected.alterClass('-selected');
            }
            this.alterClass('+selected');
            root._cSelected = this;
        }

        if (this._bExpandSelected) {
            this.expand();
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 CheckTree - 定义包含复选框的树形结构的基本操作。
 包含复选框的树控件，继承自树控件。每一个选项包含一个复选框进行选择，除非特别的指定，否则子节点的复选框与父节点的复选框
 自动联动。

 树控件直接HTML初始化的例子:
 <div ecui="type:check-tree;fold:true;id:parent;name:part">
 <!-- 当前节点的文本，如果没有整个内容就是节点的文本 -->
 <label>节点的文本</label>
 <!-- 这里放子控件，如果需要fold某个子控件，将子控件的style="display:none"即可 -->
 <li ecui="superior:other">子控件文本</li>
 <li>子控件文本(复选框默认与父控件复选框联动)</li>
 ...
 </div>

 属性
 _oSuperior - 关联的父复选框控件ID，默认与父控件复选框关联
 _uCheckbox - 复选框控件
 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        inheritsControl = core.inherits,
        createDom = dom.create,

        $connect = core.$connect,
        $fastCreate = core.$fastCreate,

        UI_CHECKBOX = ui.Checkbox,

        UI_TREE_VIEW = ui.TreeView,
        UI_TREE_VIEW_CLASS = UI_TREE_VIEW.prototype;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化复选树控件。
     * options 对象支持的属性如下：
     * name 复选框的表单项的默认名称
     * value 复选框的表单项的值
     * superior 父复选框的标识，如果为true表示自动使用上级树节点作为父复选框，其它等价false的值表示不联动
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_CHECK_TREE
    var UI_CHECK_TREE = ui.CheckTree =
            inheritsControl(
                UI_TREE_VIEW,
                'ui-check-tree',
                null,
                function (el, options) {
                    this._oSuperior = options.superior;

                    for (
                        var i = 0,
                            checkbox = this._uCheckbox = $fastCreate(
                                UI_CHECKBOX,
                                el.insertBefore(createDom(UI_CHECKBOX.types[0]), el.firstChild),
                                this,
                                {name: options.name, value: options.value, disabled: options.disabled}
                            ),
                            list = this.getChildren();
                        el = list[i++];
                    ) {
                        options = el._oSuperior
                        if (options !== false) {
                            el = el._uCheckbox;
                            if (!options) {
                                el.setSubject(checkbox);
                            }
                            else {
                                $connect(el, el.setSubject, options);
                            }
                        }
                    }
                }
            ),
        UI_CHECK_TREE_CLASS = UI_CHECK_TREE.prototype;
//{else}//
    /**
     * 计算控件的缓存。
     * 控件缓存部分核心属性的值，提高控件属性的访问速度，在子控件或者应用程序开发过程中，如果需要避开控件提供的方法(setSize、alterClass 等)直接操作 Element 对象，操作完成后必须调用 clearCache 方法清除控件的属性缓存，否则将引发错误。
     * @protected
     *
     * @param {CssStyle} style 基本 Element 对象的 Css 样式对象
     * @param {boolean} cacheSize 是否需要缓存控件大小，如果控件是另一个控件的部件时，不缓存大小能加快渲染速度，默认缓存
     */
    UI_CHECK_TREE_CLASS.$cache = function (style, cacheSize) {
        UI_TREE_VIEW_CLASS.$cache.call(this, style, cacheSize);
        this._uCheckbox.cache(true, true);
    };

    /**
     * 控件渲染完成后初始化的默认处理。
     * $init 方法在控件渲染完成后调用，参见 create 与 init 方法。
     * @protected
     */
    UI_CHECK_TREE_CLASS.init = function () {
        UI_TREE_VIEW_CLASS.init.call(this);
        this._uCheckbox.init();
    };

    /**
     * 获取包括当前树控件在内的全部选中的子树控件。
     * @public
     *
     * @return {Array} 全部选中的树控件列表
     */
    UI_CHECK_TREE_CLASS.getChecked = function () {
        for (var i = 0, list = this.getChildren(), result = this.isChecked() ? [this] : [], o; o = list[i++];) {
            result = result.concat(o.getChecked());
        }
        return result;
    };

    /**
     * 获取当前树控件复选框的表单项的值。
     * @public
     *
     * @return {string} 表单项的值
     */
    UI_CHECK_TREE_CLASS.getValue = function () {
        return this._uCheckbox.getValue();
    };

    /**
     * 判断树控件是否选中。
     * @public
     *
     * @return {boolean} 是否选中
     */
    UI_CHECK_TREE_CLASS.isChecked = function () {
        return this._uCheckbox.isChecked();
    };

    /**
     * 设置当前树控件复选框选中状态。
     * @public
     *
     * @param {boolean} 是否选中当前树控件复选框
     */
    UI_CHECK_TREE_CLASS.setChecked = function (status) {
        this._uCheckbox.setChecked(status);
    };

    UI_CHECK_TREE_CLASS.disable = function () {
        this._uCheckbox.disable();
        UI_TREE_VIEW_CLASS.disable.call(this);
    };

    UI_CHECK_TREE_CLASS.enable = function () {
        this._uCheckbox.enable();
        UI_CHECK_TREE_CLASS.enable.call(this);
    };

    UI_CHECK_TREE_CLASS.add = function (item, index, options) {
        var con = UI_TREE_VIEW_CLASS.add.call(this, item, index, options);
        if (con._oSuperior !== false) {
            if (!con._oSuperior) {
                con._uCheckbox.setSubject(this._uCheckbox);
            }
            else {
                con._uCheckbox.setSubject(con._oSuperior);
            }
        }
        return con;
    };

    UI_CHECK_TREE_CLASS.$ready = function () {
        this._uCheckbox.$ready();
    }
//{/if}//
//{if 0}//
})();
//{/if}//

/**
 * data tree
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * path:    data-tree.js
 * desc:    数据树
 *          在普通树控件的基础上进行扩展
 * author:  cxl(chenxinle@baidu.com)
 * date:    2012/03/12
 */
(function () {
    var core = ecui,
        array = core.array,
        ui = core.ui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        util = core.util,

        $fastCreate = core.$fastCreate,
        getMouseX = core.getMouseX,
        inheritsControl = core.inherits,
        getOptions = core.getOptions,
        disposeControl = core.dispose,
        triggerEvent = core.triggerEvent,
        extend = util.extend,
        indexOf = array.indexOf,
        extend = util.extend,
        toNumber = util.toNumber,
        getStyle = dom.getStyle,
        first = dom.first,
        insertAfter = dom.insertAfter,
        trim = string.trim,
        blank = util.blank,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_TREE_VIEW = ui.TreeView,
        UI_TREE_VIEW_CLASS = UI_TREE_VIEW.prototype,

        UI_DATA_TREE = ui.DataTree =
            inheritsControl(
                UI_TREE_VIEW,
                'ui-data-tree',
                function (el, options) {
                    options.expandSelected = options.expandSelected === true;

                    if (first(el) && 'divlabel'.indexOf(first(el).tagName.toLowerCase()) >= 0) {
                        extend(options, getOptions(first(el)));
                    }

                    if (options.value) {
                        options.value += '';
                    }

                    options.resizable = false;
                },
                function (el, options) {
                    this._aSelected = [];
                    this._sValue = options.value;
                    this._bHideRoot = options.hideRoot === true; //是否隐藏根节点
                    this._bSelectAble = options.selectable !== false;
                    this._bMultiSelect = options.multi === true;
                    this._bAsyn = options.asyn;
                    if (options.asyn && this._aChildren.length <= 0) {
                        this.add('Loadding', null);
                        this.collapse();
                        this._bNeedAsyn = true;
                    }
                }
            ),

        UI_DATA_TREE_CLASS = UI_DATA_TREE.prototype;

    function UI_DATA_TREE_VIEW_FLUSH(control) {
        control.setClass(
            control.getPrimary() + (control._aChildren.length ? control._bCollapsed ? '-collapsed' : '-expanded' : '')
        );
    }

    UI_DATA_TREE_CLASS.init = function () {
        UI_TREE_VIEW_CLASS.init.call(this);

        if (this._bHideRoot && this == this.getRoot()) {
            this.hide();
            this.expand();
        }
    }

    UI_DATA_TREE_CLASS.$setParent = function (parent) {
        var root = this.getRoot(),
            selected = root._aSelected,
            o = this.getParent(), i;

        // 如果当前节点被选中，需要先释放选中
        if ((i = indexOf(selected, this)) >= 0) {
            root.$setSelected(this, false);
        }

        if (this !== root) {
            remove(o._aChildren, this);
            UI_DATA_TREE_VIEW_FLUSH(o);
        }

        UI_CONTROL_CLASS.$setParent.call(this, parent);

        // 将子树区域显示在主元素之后
        if (this._eChildren) {
            insertAfter(this._eChildren, this.getOuter());
        }
    }

    UI_DATA_TREE_CLASS.getValue = function () {
        return this._sValue;
    }

    UI_DATA_TREE_CLASS.getText = function () {
        return trim(this.getContent().replace(/<[^>]+>/g, ''));
    }

    UI_DATA_TREE_CLASS.getSelected = function () {
        if (this == this.getRoot()) {
            return this._aSelected.slice();
        }
    }

    UI_DATA_TREE_CLASS.getSelectedValues = function () {
        var res = [], i, item;
        if (this == this.getRoot()) {
            for (i = 0; item = this._aSelected[i]; i++) {
                res.push(item.getValue());
            }
            return this._bMultiSelect ? res : res[0];
        }
    }

    UI_DATA_TREE_CLASS.setValues = function (values) {
        var item;
        if (indexOf(values, this._sValue) >= 0) {
            this.getRoot().$setSelected(this, true);
            item = this;
            while ((item = item.getParent()) && item instanceof UI_TREE_VIEW) {
                if (item.isCollapsed()) {
                    item.expand()
                }
            }
        }
        for (var i = 0, item; item = this._aChildren[i]; i++) {
            item.setValues(values);
        }
    }

    UI_DATA_TREE_CLASS.getItemByValue = function (value) {
        var res = null;

        if (this._sValue == value) {
            res = this;
        }
        for (var i = 0, item; (item = this._aChildren[i]) && res == null; i++) {
            res = item.getItemByValue(value);
        }
        return res;
    }

    UI_DATA_TREE_CLASS.load = function (datasource) {
        var i, item, text;

        for (i = 0; item = this._aChildren[i]; i++) {
            disposeControl(item);
        }
        this._aChildren = [];
        this._eChildren.innerHTML = '';

        for (i = 0; item = datasource[i]; i++) {
            text = item.text;
            item = extend({asyn: this._bAsyn}, item);
            delete item.text;
            this.add(text, null, item).init();
        }
    }

    UI_DATA_TREE_CLASS.$expand = function (item) {
        var superObj = item.getRoot();
        if (item._bNeedAsyn) {
            triggerEvent(superObj, 'load', null, [item.getValue(), function (data) {
                item.load(data)
            }]);
            item._bNeedAsyn = false;
        }
    }

    UI_DATA_TREE_CLASS.$click = function (event) {
        var added = null;
        if (event.getControl() == this) {
            UI_CONTROL_CLASS.$click.call(this, event);

            if (getMouseX(this) <= toNumber(getStyle(this.getBody(), 'paddingLeft'))) {
                // 以下使用 event 代替 name
                this[event = this.isCollapsed() ? 'expand' : 'collapse']();
                triggerEvent(this.getRoot(), event, null, [this]);
            }
            else {
                if (indexOf(this.getRoot()._aSelected, this) >= 0) {
                    if (this._bMultiSelect) {
                        added = false;
                    }
                }
                else {
                    added = true;
                }
                this.getRoot().setSelected(this);
                triggerEvent(this.getRoot(), 'select', null, [this, added == true])
                if (added !== null) {
                    triggerEvent(this.getRoot(), 'change', null, [this.getValue(), added]);
                }
            }
        }
    }

    UI_DATA_TREE_CLASS.getSelectedText = function () {
        var res = [], i, item;
        if (this == this.getRoot()) {
            for (i = 0; item = this._aSelected[i]; i++) {
                res.push(item.getText());
            }
            return res.join(',');
        }
    }

    UI_DATA_TREE_CLASS.setSelectAble = function (enable) {
        var root = this.getRoot(), i;

        if (!this.enable && (i = indexOf(root._aSelected, this)) >= 0) {
            root.$setSelected(this, false);
        }
        this._bSelectAble = enable;
    }

    UI_DATA_TREE_CLASS.$setSelected = function (node, flag) {
        var selected, i;
        if (this == this.getRoot()) {
            selected = this._aSelected;
            i = indexOf(selected, node);
            if (flag === true) {
                if (i < 0) {
                    selected.push(node);
                    node.alterClass('+selected');
                }
            }
            else if (flag === false) {
                if (i >= 0) {
                    selected.splice(i, 1);
                    node.alterClass('-selected');
                }
            }
        }
    }

    UI_DATA_TREE_CLASS.clearSelected = function () {
        var selected, i, item;

        if (this == this.getRoot()) {
            selected = this._aSelected;
            while (item = selected[0]) {
                this.$setSelected(item, false);
            }
        }
    }

    UI_DATA_TREE_CLASS.setSelected = function (node, force) {
        var selected, i;

        if (this == this.getRoot() && node._bSelectAble) {
            selected = this._aSelected;
            i = indexOf(selected, this);
            if ((i = indexOf(selected, node)) >= 0) {
                if (!force && this._bMultiSelect) {
                    this.$setSelected(node, false);
                }
            }
            else {
                if (!this._bMultiSelect && selected.length >= 1) {
                    this.$setSelected(selected[0], false);
                }
                this.$setSelected(node, true);
            }

            if (node && this._bExpandSelected) {
                node.expand();
            }
        }
    };

    UI_DATA_TREE_CLASS.$setSize = blank;
})();

/**
 * input tree
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * path:    input-tree.js
 * desc:    树层级输入框
 * author:  cxl(chenxinle@baidu.com)
 * date:    2012/03/12
 */
(function () {
    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,
        string = core.string,

        $fastCreate = core.$fastCreate,
        setFocused = core.setFocused,
        disposeControl = core.dispose,
        createDom = dom.create,
        children = dom.children,
        moveElements = dom.moveElements,
        getPosition = dom.getPosition,
        inheritsControl = core.inherits,
        getView = util.getView,
        extend = util.extend,
        blank = util.blank,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_DATA_TREE = ui.DataTree,
        UI_DATA_TREE_CLASS = UI_DATA_TREE.prototype,
        UI_INPUT_CONTROL = ui.InputControl,
        UI_INPUT_CONTROL_CLASS = UI_INPUT_CONTROL.prototype,

        UI_INPUT_TREE = ui.InputTree =
            inheritsControl(
                UI_INPUT_CONTROL,
                'ui-input-tree',
                function (el, options) {
                    var type = this.getTypes()[0],
                        o = createDom();

                    o.innerHTML = '<div class="' + type + '-layer" '
                        + ' style="position:absolute;display:none; z-index:65535; height:200px; width:190px">'
                        + '<div class="'
                        + UI_DATA_TREE.types[0] + '"></div></div>';

                    o = o.firstChild;

                    moveElements(el, o.lastChild, true);
                    options._eLayer = document.body.appendChild(o);

                    el.innerHTML = '<span class="' + type + '-text">请选择</span><span class="' + type + '-cancel"></span><span class="' + type + '-button"></span><input type="hidden name="' + options.name + '"" />';

                    options.hidden = true;
                    if (options.value) {
                        options.value += '';
                    }
                },
                function (el, options) {
                    var childs;

                    if (options.value) {
                        UI_INPUT_CONTROL_CLASS.setValue.call(this, options.value);
                    }

                    childs = children(el);

                    this._multi = options.multi || false;
                    this._textLength = options.textLength || 15;
                    this._eText = childs[0];
                    this._uCancel = $fastCreate(this.Cancel, childs[1], this);
                    this._uLayer = $fastCreate(this.Layer, options._eLayer, this, {
                        asyn: options.asyn,
                        multi: this._multi
                    });
                    options._eLayer = null;

                    delete options._eLayer;

                    if (options.hideCancel === true) {
                        this._bHideCancel = true;
                        this._uCancel.$hide();
                    }
                }
            ),

        UI_INPUT_TREE_CLASS = UI_INPUT_TREE.prototype,

        UI_INPUT_TREE_LAYER = UI_INPUT_TREE_CLASS.Layer =
            inheritsControl(
                UI_CONTROL,
                'ui-input-tree-layer',
                null,
                function (el, options) {
                    el.style.position = 'absolute';
                    this._uTree = $fastCreate(this.Tree, el.firstChild, this, {
                        collapsed: true,
                        asyn: options.asyn,
                        multi: options.multi
                    });
                }
            ),
        UI_INPUT_TREE_LAYER_CLASS = UI_INPUT_TREE_LAYER.prototype,

        UI_DATA_TREE = ui.DataTree,

        UI_INPUT_TREE_CANCEL_CLASS = (UI_INPUT_TREE_CLASS.Cancel = inheritsControl(UI_CONTROL)).prototype,
        UI_INPUT_TREE_LAYER_TREE = UI_INPUT_TREE_LAYER_CLASS.Tree =
            inheritsControl(
                UI_DATA_TREE,
                null,
                null,
                function (el, options) {
                    this._bAsyn = options.asyn;
                    if (options.asyn && this._aChildren.length <= 0) {
                        var item = this.add('Loading', null);
                        item.canExpanded = false;
                        this.collapse();
                        this._bNeedAsyn = true;
                    }
                }
            ),
        UI_INPUT_TREE_LAYER_TREE_CLASS = UI_INPUT_TREE_LAYER_TREE.prototype;

    function UI_INPUT_TREE_FLUSH(con) {
        if (con.getValue() == '') {
            con._uCancel.hide();
        }
        else if (!con._bHideCancel) {
            con._uCancel.show();
        }
    }

    UI_INPUT_TREE_CLASS.$activate = function () {
        this._uLayer.show();
    };

    UI_INPUT_TREE_CLASS.init = function () {
        var value = this.getValue();

        this.setValue(value);
        this._uLayer.init();
        UI_INPUT_CONTROL_CLASS.init.call(this);
    };

    UI_INPUT_TREE_CLASS.$setText = function (value) {
        if (value && value.length > this._textLength) {
            value = value.substring(0, this._textLength) + '...';
        }
        if (!value) {
            value = '请选择';
        }
        this._eText.innerHTML = value;
    };

    UI_INPUT_TREE_CLASS.setValue = function (value) {
        var tree = this._uLayer._uTree;

        UI_INPUT_CONTROL_CLASS.setValue.call(this, value);
        tree.clearSelected();
        tree.setValues([value]);
        this.$setText(tree.getSelectedText());
        UI_INPUT_TREE_FLUSH(this);
    };

    UI_INPUT_TREE_CLASS.clear = function () {
        var tree = this._uLayer._uTree;

        tree.clearSelected();
        UI_INPUT_CONTROL_CLASS.setValue.call(this, '');
        this.$setText('');
        UI_INPUT_TREE_FLUSH(this);
    };

    /**
     * 重新收起input-tree,清理用户操作痕迹
     * @public
     */
    UI_INPUT_TREE_CLASS.clearState = function () {
        var tree = this._uLayer._uTree;
        collapseTree(tree);

        function collapseTree(tree) {
            tree.collapse();
            var children = tree.getChildren();
            if (children && children.length) {
                for (var i = 0; i < children.length; i++) {
                    collapseTree(children[i]);
                }
            }
        }
    };

    /**
     * 根据value获取树中的节点
     * @public
     * @param {string} value
     */
    UI_INPUT_TREE_CLASS.getTreeNodeByValue = function (value) {
        return this._uLayer.getTreeNodeByValue(value);
    };

    /**
     * 设置输入文本框的值
     * @public
     * @param {string} text
     */
    UI_INPUT_TREE_CLASS.setText = function (text) {
        this.$setText(text);
    };

    UI_INPUT_TREE_CLASS.expand = function (value, callback) {
        var me = this;

        this._uLayer.expand(value, function () {
            callback.call(me);
        });
    };

    UI_INPUT_TREE_CLASS.selectParent = function (value) {
        var node = this._uLayer.getTreeNodeByValue(value);

        if (node != node.getRoot()) {
            node = node.getParent();
        }

        this.setValue(node.getValue());
    };

    UI_INPUT_TREE_LAYER_CLASS.init = function () {
        this._uTree.init();
        UI_CONTROL_CLASS.init.call(this);
    };

    UI_INPUT_TREE_LAYER_CLASS.$blur = function () {
        this.hide();
    };

    UI_INPUT_TREE_LAYER_CLASS.expand = function (value, callback) {
        var tree = this._uTree,
            node = tree.getItemByValue(value);
        if (node) {
            node.expand();
            tree.onexpand(node, callback);
        }
    };

    UI_INPUT_TREE_LAYER_CLASS.getTreeNodeByValue = function (value) {
        return this._uTree.getItemByValue(value);
    };

    UI_INPUT_TREE_LAYER_CLASS.show = function () {
        var par = this.getParent(), pos, o, view;

        UI_CONTROL_CLASS.show.call(this);

        if (par) {
            pos = getPosition(par.getOuter());
            view = getView();
            o = pos.top;
            /*
             if (o + par.getHeight() + this.getHeight() > view.bottom) {
             if (o - view.top > this.getHeight()) {
             pos.top = o - this.getHeight();
             }
             }
             else {
             pos.top = o + par.getHeight();
             }
             */

            pos.top = o + par.getHeight();

            o = pos.left;
            if (o + this.getWidth() > view.right) {
                pos.left = o + par.getWidth() - this.getWidth();
            }
            else {
                pos.left = o;
            }
            this.setPosition(pos.left, pos.top);
            setFocused(this);
        }
    };

    UI_INPUT_TREE_CANCEL_CLASS.$click = function () {
        var par = this.getParent();
        UI_CONTROL_CLASS.$click.call(this);

        par.$setText('');
        UI_INPUT_CONTROL_CLASS.setValue.call(par, '');
        par._uLayer._uTree.clearSelected();
        UI_INPUT_TREE_FLUSH(par);
    };

    UI_INPUT_TREE_CANCEL_CLASS.$activate = UI_BUTTON_CLASS.$activate;

    UI_INPUT_TREE_LAYER_TREE_CLASS.onselect = function (con, added) {
        var superObj = this.getParent().getParent();
        var tree = this.getParent()._uTree;
        var conValue = con.getValue();
        var conText = con.getText();
        // 如果是多选
        if (superObj._multi) {
            var inputValue = tree.getSelectedValues().join(',');
            UI_INPUT_CONTROL_CLASS.setValue.call(superObj, inputValue);
            superObj.$setText(tree.getSelectedText());
        }
        else {
            UI_INPUT_CONTROL_CLASS.setValue.call(superObj, conValue);
            superObj.$setText(conText);
            this.getParent().hide();
        }
        UI_INPUT_TREE_FLUSH(superObj);
    };

    UI_INPUT_TREE_LAYER_TREE_CLASS.onexpand = function (item, callback) {
        var superObj = this.getParent().getParent(),
            callback = callback || blank;

        var layer = superObj._uLayer.getOuter(),
            scrollHeight = layer.scrollTop;
        var setScroll = function () {
            layer.scrollTop = scrollHeight;
            layer = null;
        };
        if (item._bNeedAsyn) {
            triggerEvent(superObj, 'loadtree', null, [item.getValue(), function (data) {
                item.load(data);
                callback.call(null);
                setScroll();
            }]);
            item._bNeedAsyn = false;
        }
        else {
            callback.call(null);
            setScroll();
        }
    };

    UI_INPUT_TREE_LAYER_TREE_CLASS.load = function (datasource) {
        var i, item, text;

        for (i = 0; item = this._aChildren[i]; i++) {
            disposeControl(item);
        }
        this._aChildren = [];
        this._eChildren.innerHTML = '';

        for (i = 0; item = datasource[i]; i++) {
            text = item.text;
            item = extend({asyn: this._bAsyn}, item);
            delete item.text;
            this.add(text, null, item).init();
        }

        if (!datasource || datasource.length <= 0) {
            this.setClass(this.getPrimary());
        }
    }
})();

/*
 Tab - 定义分页选项卡的操作。
 选项卡控件，继承自基础控件，实现了选项组接口。每一个选项卡都包含一个头部区域与容器区域，选项卡控件存在互斥性，只有唯一的一个选项卡能被选中并显示容器区域。

 直接初始化选项卡控件的例子
 <div ecui="type:tab;selected:1">
 <!-- 包含容器的选项卡 -->
 <div>
 <label>标题1</label>
 <!-- 这里是容器 -->
 ...
 </div>
 <!-- 仅有标题的选项卡，以下selected定义与控件定义是一致的，可以忽略其中之一 -->
 <label ecui="selected:true">标题2</label>
 </div>

 属性
 _bButton         - 向前向后滚动按钮是否显示
 _oSelected       - 初始化时临时保存当前被选中的选项卡
 _aPosition       - 选项卡位置缓存
 _cSelected       - 当前选中的选项卡
 _uPrev           - 向前滚动按钮
 _uNext           - 向后滚动按钮
 $$titleWidth     - 标签区域的宽度

 Item属性
 _sContainer      - 容器 DOM 元素的布局属性
 _eContainer      - 容器 DOM 元素
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        MAX = MATH.max,
        MIN = MATH.min,

        indexOf = array.indexOf,
        createDom = dom.create,
        moveElements = dom.moveElements,
        removeDom = dom.remove,
        first = dom.first,
        setStyle = dom.setStyle,
        extend = util.extend,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化选项卡控件。
     * options 对象支持的特定属性如下：
     * selected 选中的选项序号，默认为0
     * @protected
     *
     * @param {Object} options 初始化选项
     */
    ///__gzip_original__UI_TAB
    ///__gzip_original__UI_TAB_BUTTON
    ///__gzip_original__UI_TAB_ITEM
    var UI_TAB = ui.Tab =
            inheritsControl(
                UI_CONTROL,
                'ui-tab',
                null,
                function (el, options) {
                    //__gzip_original__buttonParams
                    var type = this.getType(),
                        o = createDom(type + '-title', 'position:relative;overflow:hidden');

                    this._oSelected = options.selected || 0;

                    // 生成选项卡头的的DOM结构
                    o.innerHTML = '<div class="' + type + '-prev' + this.Button.TYPES +
                        '" style="position:absolute;display:none;left:0px"></div><div class="' +
                        type + '-next' + this.Button.TYPES +
                        '" style="position:absolute;display:none"></div><div class="' +
                        type + '-items" style="position:absolute;white-space:nowrap"></div>';

                    moveElements(el, options = o.lastChild);
                    el.appendChild(o);
                    this.$setBody(options);

                    this.$initItems();

                    // 滚动按钮
                    this._uNext = $fastCreate(this.Button, options = options.previousSibling, this);
                    this._uPrev = $fastCreate(this.Button, options.previousSibling, this);
                }
            ),
        UI_TAB_CLASS = UI_TAB.prototype,

        /**
         * 初始化选项卡控件的按钮部件。
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_TAB_BUTTON_CLASS = (UI_TAB_CLASS.Button = inheritsControl(UI_BUTTON, 'ui-tab-button')).prototype,

        /**
         * 初始化选项卡控件的选项部件。
         * options 对象支持的特定属性如下：
         * selected 当前项是否被选中
         * @protected
         *
         * @param {Object} options 初始化选项
         */
        UI_TAB_ITEM_CLASS =
            (UI_TAB_CLASS.Item = inheritsControl(
                UI_ITEM,
                null,
                null,
                function (el, options) {
                    //__gzip_original__parent
                    var parent = options.parent;

                    if (el.tagName != 'LABEL') {
                        var o = first(el),
                            tmpEl;

                        moveElements(el, tmpEl = createDom(options.primary + '-container'), true);
                        el.appendChild(o);
                        this.setContainer(tmpEl);
                    }

                    setStyle(el, 'display', 'inline-block');

                    if (parent && options.selected) {
                        parent._oSelected = this;
                    }
                }
            )).prototype;
//{else}//
    /**
     * 刷新向前向右滚动按钮的可操作状态。
     * @private
     *
     * @param {ecui.ui.Tab} control Tab 控件对象
     */
    function UI_TAB_FLUSH_BUTTON(control) {
        var left = toNumber(control.getBody().style.left);

        control._uPrev[left < control._uPrev.getWidth() ? 'enable' : 'disable']();
        control._uNext[
            left > control.getBodyWidth() - control.$$titleWidth - control._uNext.getWidth() ? 'enable' : 'disable'
            ]();
    }

    extend(UI_TAB_CLASS, UI_ITEMS);

    /**
     * @override
     */
    UI_TAB_BUTTON_CLASS.$click = function (event) {
        UI_CONTROL_CLASS.$click.call(this, event);

        //__gzip_original__pos
        var parent = this.getParent(),
            style = parent.getBody().style,
            pos = parent._aPosition,
            index = parent.$getLeftMostIndex();

        index = MIN(
            MAX(0, index + (parent._uPrev == this ? toNumber(style.left) != pos[index] ? 0 : -1 : 1)),
            pos.length - 1
        );

        style.left = MAX(pos[index], parent.getBodyWidth() - parent.$$titleWidth - parent._uNext.getWidth()) + 'px';
        UI_TAB_FLUSH_BUTTON(parent);
    };

    /**
     * @override
     */
    UI_TAB_ITEM_CLASS.$cache = function (style, cacheSize) {
        UI_ITEM_CLASS.$cache.call(this, style, cacheSize);

        this.$$marginLeft = toNumber(style.marginLeft);
        this.$$marginRight = toNumber(style.marginRight);
    };

    /**
     * @override
     */
    UI_TAB_ITEM_CLASS.$click = function (event) {
        UI_ITEM_CLASS.$click.call(this, event);
        this.getParent().setSelected(this);
    };

    /**
     * @override
     */
    UI_TAB_ITEM_CLASS.$dispose = function () {
        this._eContainer = null;
        UI_ITEM_CLASS.$dispose.call(this);
    };

    /**
     * @override
     */
    UI_TAB_ITEM_CLASS.$setParent = function (parent) {
        //__gzip_original__el
        var el = this._eContainer;

        UI_ITEM_CLASS.$setParent.call(this, parent);
        if (el) {
            if (parent) {
                parent.getMain().appendChild(el);
            }
            else {
                removeDom(el);
            }
        }
    };

    /**
     * 获取选项卡对应的容器元素。
     * @public
     *
     * @return {HTMLElement} 选项卡对应的容器元素
     */
    UI_TAB_ITEM_CLASS.getContainer = function () {
        return this._eContainer;
    };

    /**
     * 设置选项卡对应的容器元素。
     * @public
     *
     * @param {HTMLElement} el 选项卡对应的容器元素
     */
    UI_TAB_ITEM_CLASS.setContainer = function (el) {
        var parent = this.getParent();

        if (this._eContainer) {
            removeDom(this._eContainer);
        }
        if (this._eContainer = el) {
            if ((this._sContainer = el.style.display) == 'none') {
                this._sContainer = '';
            }

            if (parent) {
                parent.getMain().appendChild(el);

                // 如果当前节点被选中需要显示容器元素，否则隐藏
                el.style.display = parent._cSelected == this ? this._sContainer : 'none';
            }
        }
    };

    /**
     * @override
     */
    UI_TAB_CLASS.$alterItems = function () {
        // 第一次进入时不需要调用$setSize函数，否则将初始化两次
        if (this._aPosition) {
            this.$setSize(this.getWidth());
        }

        for (
            var i = 0,
                list = this.getItems(),
                pos = this._aPosition = [this._uPrev.getWidth()],
                lastItem = {$$marginRight: 0},
                o;
            o = list[i++];
            lastItem = o
        ) {
            pos[i] = pos[i - 1] - MAX(lastItem.$$marginRight, o.$$marginLeft) - o.getWidth();
        }
    };

    /**
     * @override
     */
    UI_TAB_CLASS.$cache = function (style, cacheSize) {
        UI_ITEMS.$cache.call(this, style, cacheSize);

        this._uPrev.cache(true, true);
        this._uNext.cache(true, true);

        this.$$titleWidth = this.getBody().offsetWidth;
    };

    /**
     * 获得当前显示的选项卡中左边元素的索引，只在能左右滚动时有效。
     * @protected
     *
     * @return {number} 最左边元素的索引
     */
    UI_TAB_CLASS.$getLeftMostIndex = function () {
        for (var left = toNumber(this.getBody().style.left), pos = this._aPosition, i = pos.length; i--;) {
            if (left <= pos[i]) {
                return i;
            }
        }
    };

    /**
     * @override
     */
    UI_TAB_CLASS.$remove = function (child) {
        if (this._cSelected == child) {
            var list = this.getItems(),
                index = indexOf(list, child);

            // 跳到被删除项的后一项
            this.setSelected(index == list.length - 1 ? index - 1 : index + 1);
        }

        UI_ITEMS.$remove.call(this, child);
    };

    /**
     * @override
     */
    UI_TAB_CLASS.$setSize = function (width, height) {
        UI_CONTROL_CLASS.$setSize.call(this, width, height);

        //__gzip_original__prev
        //__gzip_original__next
        var prev = this._uPrev,
            next = this._uNext,
            style = this.getBody().style;

        width = this.getBodyWidth();
        if (this.$$titleWidth > width) {
            width -= next.getWidth();
            next.getOuter().style.left = width + 'px';

            if (this._bButton) {
                // 缩小后变大，右边的空白自动填补
                width -= this.$$titleWidth;
                if (toNumber(style.left) < width) {
                    style.left = width + 'px';
                }
            }
            else {
                prev.$show();
                next.$show();
                style.left = prev.getWidth() + 'px';
                this._bButton = true;
            }

            UI_TAB_FLUSH_BUTTON(this);
        }
        else if (this._bButton) {
            prev.$hide();
            next.$hide();
            style.left = '0px';
            this._bButton = false;
        }
    };

    /**
     * 获得当前选中的选项卡控件。
     *
     * @return {ecui.ui.Tab.Item} 选中的选项卡控件
     */
    UI_TAB_CLASS.getSelected = function () {
        return this._cSelected;
    };

    /**
     * @override
     */
    UI_TAB_CLASS.init = function () {
        this._uPrev.init();
        this._uNext.init();
        UI_ITEMS.init.call(this);
        for (var i = 0, list = this.getItems(), o; o = list[i++];) {
            o.$setSize(o.getWidth(), o.getHeight());
        }
        this.setSelected(this._oSelected);
    };

    /**
     * 设置被选中的选项卡。
     * @public
     *
     * @param {number|ecui.ui.Tab.Item} 选项卡子选项的索引/选项卡子选项控件
     */
    UI_TAB_CLASS.setSelected = function (item) {
        //__gzip_original__prev
        var i = 0,
            list = this.getItems(),
            prev = this._uPrev,
            style = this.getBody().style,
            left = toNumber(style.left),
            o;

        if ('number' == typeof item) {
            item = list[item];
        }
        if (this._cSelected != item) {
            for (; o = list[i++];) {
                if (o._eContainer) {
                    o._eContainer.style.display = o == item ? o._sContainer : 'none';
                }
            }

            if (this._cSelected) {
                this._cSelected.alterClass('-selected');
            }

            if (item) {
                item.alterClass('+selected');
                o = this._aPosition[indexOf(list, item)] - (prev.isShow() ? 0 : prev.getWidth());

                // 如果当前选中的项没有被完全显示(例如处于最左或最右时)，设置成完全显示
                if (left < o) {
                    style.left = o + 'px';
                }
                else {
                    o -= item.getWidth() + prev.getWidth() + this._uNext.getWidth() - this.getBodyWidth();
                    if (left > o) {
                        style.left = o + 'px';
                    }
                }
                UI_TAB_FLUSH_BUTTON(this);
            }

            this._cSelected = item;
            triggerEvent(this, 'change');
        }
    };
//{/if}//
//{if 0}//
})();
//{/if}//
/**
 * query-tab
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * path:    query-tab.js
 * desc:    查询类型tab
 * author:  cxl(chenxinle@baidu.com)
 * date:    2012/03/12
 */
(function () {
    var core = ecui,
        ui = core.ui,
        dom = core.dom,
        string = core.string,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        getOptions = core.getOptions,
        children = dom.children,
        createDom = dom.create,
        trim = string.trim,

        UI_CONTROL = ui.Control,
        UI_TIP = ui.PsTip,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_RADIO = ui.Radio,
        UI_RADIO_CLASS = UI_RADIO.prototype;

    var UI_QUERY_TAB = ui.QueryTab =
            inheritsControl(
                UI_CONTROL,
                'ui-query-tab',
                null,
                function (el, options) {
                    var childs = children(el),
                        type = this.getTypes()[0],
                        i, item, value = options.value;

                    this._aItems = [];

                    for (i = 0; item = childs[i]; i++) {
                        item.className = trim(item.className) + ' ' + type + '-item' + UI_RADIO.TYPES;
                        this._aItems[i] = $fastCreate(this.Item, item, this, getOptions(item));
                        if (value && value == this._aItems[i].getValue()) {
                            this._aItems[i].setChecked(true);
                            this._oCurChecked = this._aItems[i];
                        }
                    }
                }
            ),

        UI_QUERY_TAB_CLASS = UI_QUERY_TAB.prototype,
        UI_QUERY_TAB_ITEM = UI_QUERY_TAB_CLASS.Item =
            inheritsControl(
                UI_RADIO,
                'ui-query-tab-item',
                null,
                function (el, options) {
                    var o;
                    if (options.tip) {
                        o = createDom('ui-tip', '', 'span');
                        el.appendChild(o);
                        this._uTip = $fastCreate(UI_TIP, o, this, {target: options.tip});
                    }
                }
            ),
        UI_QUERY_TAB_ITEM_CLASS = UI_QUERY_TAB_ITEM.prototype;

    UI_QUERY_TAB_ITEM_CLASS.$click = function () {
        var par = this.getParent(),
            curChecked = par._oCurChecked;
        UI_RADIO_CLASS.$click.call(this);
        if (curChecked && curChecked != this) {
            par._oCurChecked = this;
            triggerEvent(this.getParent(), 'change', null, [this.getValue()]);
        }
    };

    /* override */
    UI_QUERY_TAB_ITEM_CLASS.getItems = function () {
        return this.getParent().getItems();
    };

    UI_QUERY_TAB_CLASS.getItems = function () {
        return this._aItems.slice();
    };

    UI_QUERY_TAB_CLASS.getValue = function () {
        return this._oCurChecked ? this._oCurChecked.getValue() : null;
    };

    UI_QUERY_TAB_CLASS.setValue = function (value) {
        for (var i = 0, item; item = this._aItems[i]; i++) {
            if (item.getValue() == value) {
                item.setChecked(true);
                this._oCurChecked = item;
            }
        }
    };
})();

(function () {
    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        ext = core.ext,
        util = core.util,

        $create = core.$create,
        $fastCreate = core.$fastCreate,
        getPosition = dom.getPosition,
        children = dom.children,
        createDom = dom.create,
        moveElements = dom.moveElements,
        trim = string.trim,
        encodeHTML = string.encodeHTML,
        decodeHTML = string.decodeHTML,
        getView = util.getView,

        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,

        EXT_UI_EDITOR = ui.Editor =
            inheritsControl(
                UI_CONTROL,
                'ui-editor',
                null,
                function (el, options) {
                    var editor = EXT_EDITOR_ITEMS[options.type];

                    el.innerHTML = editor.innerHTML +
                        '<div class="ui-button ui-button-g">确定</div><div class="ui-button">取消</div><div style="display:none" class="ui-editor-tip"></div>'
                    for (var key in editor) {
                        if ('[object Function]' == Object.prototype.toString.call(editor[key])) {
                            if (key == 'process') {
                                editor[key].call(this);
                            }
                            else {
                                this[key] = editor[key];
                            }
                        }
                    }
                    el = el.lastChild;
                    this._eTip = el;
                    this._uCancelBtn = $fastCreate(this.Button, el = el.previousSibling, this, {command: 'cancel'});
                    this._uSubmitBtn = $fastCreate(this.Button, el.previousSibling, this, {
                        command: 'submit',
                        primary: 'ui-button-g'
                    });
                }
            ),

        EXT_UI_EDITOR_CLASS = EXT_UI_EDITOR.prototype,

        EXT_UI_EDITOR_BUTTON_CLASS = (EXT_UI_EDITOR_CLASS.Button
            = inheritsControl(UI_BUTTON, null, function (el, options) {
            this._sCommand = options.command;
        })).prototype,

        EXT_EDITOR_ITEMS = {},

        EXT_EDITORS = {};


    EXT_UI_EDITOR_CLASS.init = function () {
        this.$hide();
    }

    EXT_UI_EDITOR_CLASS.show = function (con) {
        var pos = getPosition(con),
            view = getView(),
            left = pos.left, top = pos.top;

        // if (options.target.onbeforeedit && !options.target.onbeforeedit(con, options)) {
        //     return;
        // }

        // this._oControl = con;
        // this._oOptions = options;

        // //动态设置值
        // if (this.setDatasource && options.target.ongetdatasource4editor) {
        //     this.setDatasource(options.target.ongetdatasource4editor.call(options.target, options));
        // }

        // this.setValue(value);
        // UI_CONTROL_CLASS.show.call(this);
        // this.resize();
        if (left + this.getWidth() > view.right) {
            left = view.right - this.getWidth();
        }
        if (top + this.getHeight() > view.bottom) {
            top = view.bottom - this.getHeight();
        }
        this.setPosition(left, top);
        this.focus();
    }

    EXT_UI_EDITOR_CLASS.$blur = function () {
        this.hide();
    }

    EXT_UI_EDITOR_CLASS.onhide = function () {
        this.setError('');
    }

    EXT_UI_EDITOR_CLASS.setError = function (str) {
        str = trim(str);
        this._eTip.innerHTML = str;
        if (str == '') {
            this._eTip.style.display = 'none';
        }
        else {
            this._eTip.style.display = '';
        }
        this.resize();
    }

    EXT_UI_EDITOR_CLASS.$resize = function () {
        var el = this._eMain,
            currStyle = el.style;

        currStyle.width = this._sWidth;
        currStyle.height = this._sHeight;
        this.repaint();
    }

    EXT_UI_EDITOR_BUTTON_CLASS.$click = function () {
        var editor = this.getParent(); //editor
        var value = editor.getValue();
        var options = editor._oOptions;
        var table = editor.getParent();
        var editCell = table.editCell;
        var field = table.editField;
        var e = {};
        var o;
        var txt = editor.getText ? editor.getText() : editor.getValue();

        txt = encodeHTML(txt);

        if (this._sCommand == 'cancel') {
            editor.hide();
        }
        else {
            o = triggerEvent(table, 'editsubmit', e, [value, field]);
            if (o !== false) {
                if ('[object String]' == Object.prototype.toString.call(e.message) && e.message != '') {
                    editor.setError(e.message);
                }
                else {
                    e.value = (e.value !== undefined ? e.value : value);
                    editCell.innerHTML = e.value;
                    editor.setError('');
                    editor.hide();
                }
            }
        }
    }

    function EXT_EDITOR_GET(type) {
        var o;

        if (!EXT_EDITORS[type]) {
            o = document.body.appendChild(createDom(EXT_UI_EDITOR.TYPES));
            o = $create(EXT_UI_EDITOR, {main: o, type: type});
            o.cache();
            o.init();
            EXT_EDITORS[type] = o;
        }

        return EXT_EDITORS[type];
    }

    function ATTACH_CLICK_HANDLER(con, type, options) {
        return function () {
            if (type != 'custom') {
                EXT_EDITOR.edit(con, type, options)
            }
            else {
                (new Function('return ' + options.handle)).call(null).call(null, con, options);
            }
        }
    }

    EXT_EDITOR = ext.editor = function () {
    };

    EXT_EDITOR.register = function (type, obj) {
        EXT_EDITOR_ITEMS[type] = obj;
    };

    EXT_EDITOR.init = function (con, type, options) {
        var o = createDom(),
            cssType = con.getTypes()[0],
            el = con.getBody();

        moveElements(el, o, true);
        el.innerHTML = '<div class="' + cssType + '-editor"><div></div><div class="' + cssType + '-editor-button"></div></div>';
        el.firstChild.lastChild.onclick = ATTACH_CLICK_HANDLER(con, type, options);
        moveElements(o, el.firstChild.firstChild, true);
        con.$setBody(el.firstChild.firstChild);
        o = null;
    };

    EXT_EDITOR.edit = function (con, type, options) {
        var value, editor;

        if (options.getValue) {
            if ('[object Function]' == Object.prototype.toString.call(options.getValue)) {
                value = options.getValue.call(null, con, options);
            }
            else {
                value = options.getValue;
            }
        }
        else {
            value = decodeHTML(trim(con.getContent()));
        }

        editor = EXT_EDITOR_GET(type);
        editor.show(con, value, options);
        setFocused(editor);
    };

    /*注册编辑器*/
    EXT_EDITOR.register('input', {

        innerHTML: '<input type="text" class="ui-editor-input" />',

        process: function () {
            this._eInput = this.getBody().firstChild;
        },

        focus: function () {
            this._eInput.focus();
        },

        getValue: function () {
            return trim(this._eInput.value);
        },

        setValue: function (value) {
            this._eInput.value = value;
        }
    });

    EXT_EDITOR.register('customSelect', {

        innerHTML: '<select class="ui-editor-select"></select>',

        process: function () {
            this._eSelect = this.getBody().firstChild;
        },

        focus: function () {
            this._eSelect.focus();
        },

        getValue: function () {
            return this._eSelect.options[this._eSelect.selectedIndex].value;
        },

        getText: function () {
            return this._eSelect.options[this._eSelect.selectedIndex].text;
        },

        setValue: function (value) {
            for (var i = 0, item; item = this._eSelect.options[i]; i++) {
                if (item.value == value || item.text == value) {
                    item.selected = true;
                    break;
                }
            }
        },

        setDatasource: function (datasource) {
            var sel = this._eSelect, i, item, o;

            while (sel.options[0]) {
                sel.remove(0);
            }

            for (i = 0; item = datasource[i]; i++) {
                o = createDom('', '', 'option');
                o.text = item.text;
                o.value = item.value;
                try {
                    sel.add(o, null);
                }
                catch (e) {
                    sel.add(o);
                }
            }
        }
    });
})();

(function () {
    var core = ecui,
        dom = core.dom,
        ui = core.ui,
        string = core.string,
        ext = core.ext,
        util = core.util,

        $create = core.$create,
        $fastCreate = core.$fastCreate,
        children = dom.children,
        getPosition = dom.getPosition,
        createDom = dom.create,
        moveElements = dom.moveElements,
        trim = string.trim,
        encodeHTML = string.encodeHTML,
        decodeHTML = string.decodeHTML,
        getView = util.getView,

        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        setFocused = core.setFocused,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_INPUT = ui.Input,
        UI_INPUT_CLASS = UI_INPUT.prototype,
        UI_SELECT = ui.Select,
        UI_SELECT_CLASS = UI_SELECT.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype;


    var UI_TABLE_EDITOR = ui.TableEditor =
        inheritsControl(
            UI_CONTROL,
            'ui-table-editor',
            function (el, options) {
                var html = null;
                if (options.type != 'url') {
                    html = '<div class="ui-' + options.type + '"></div>';
                }
                else {
                    html = [
                        '<div class="ui-select" style="width:62px">',
                        '</div>',
                        '<div class="ui-input" style="margin-left:1px"></div>',
                        '<div class="ui-input" style="width:60px;margin-left:1px"></div>'
                    ].join('');
                }
                el.innerHTML = html;
            },
            function (el, options) {
                var me = this;
                var childs = children(el);
                if (options.type == 'input') {
                    me._uInput = $fastCreate(UI_INPUT, childs[0], this, {});

                }
                else if (options.type == 'select') {
                    me._uSelect = $fastCreate(UI_SELECT, childs[0], this, {});

                }
                else if (options.type == 'url') {
                    me._uFront = $fastCreate(UI_SELECT, childs[0], this, {});
                    me._uFront.setSize(62, 22);
                    me._uRoot = $fastCreate(UI_INPUT, childs[1], this, {});
                    me._uRoot.setSize(100, 22);

                    me._uPath = $fastCreate(UI_INPUT, childs[2], this, {});
                    me._uPath.setSize(60, 22);

                }

                if (options.type == 'select' || options.type == 'input') {

                    var control = me._uInput || me._uSelect;

                    function triggerConnectEvent(control, rowData) {
                        triggerEvent(control, 'change', null, [control.getInnerControl(), control.target && control.target.getInnerControl(), rowData]);
                        if (control.target) {
                            triggerConnectEvent(control.target);
                        }
                    }

                    control.onchange = function () {
                        var rowData = me.rowData;
                        triggerConnectEvent(me, rowData);
                    }
                }
                else {
                    me._uFront.onchange = me._uRoot.onchange = me._uPath.onchange = function () {
                        var rowData = me.rowData;
                        triggerEvent(me, 'change', null, [me._uFront, me._uRoot, me._uPath, rowData]);
                    }
                }
            }
        )

    UI_TABLE_EDITOR_CLASS = UI_TABLE_EDITOR.prototype;

    UI_TABLE_EDITOR_CLASS.setValue = function (value) {
        var control = this._uInput || this._uSelect;
        control.setValue(value);
    }

    UI_TABLE_EDITOR_CLASS.getValue = function () {
        var control = this._uInput || this._uSelect;
        var value = null;
        if (!control) {
            var fronts = {
                '1': 'www',
                '2': '无前缀'
            }
            var front = this._uFront.getValue();
            front = fronts[front];
            var root = this._uRoot.getValue();
            var path = this._uPath.getValue();
            value = front + root + path;
        }
        else {
            value = control.getValue();
        }
        return value;
    }

    UI_TABLE_EDITOR_CLASS.getInnerControl = function () {
        var me = this;
        var control = this._uInput || this._uSelect;
        if (!control) {
            control = [
                me._uFront,
                me._uRoot,
                me._uPath
            ];
        }
        return control;
    }

    UI_TABLE_EDITOR_CLASS.show = function (con) {
        var me = this;

        var con = con || me.showCell;
        var pos = getPosition(con),
            view = getView(),
            left = pos.left, top = pos.top;
        var ele = this.getOuter();
        var rowData = this.rowData;
        //this.setValue(value);
        UI_CONTROL_CLASS.show.call(this);
        this.resize();
        if (left + this.getWidth() > view.right) {
            left = view.right - this.getWidth();
        }
        if (top + this.getHeight() > view.bottom) {
            top = view.bottom - this.getHeight();
        }
        this.setPosition(0, 0);
        con.appendChild(this.getOuter());
        //set outer width and height
        ele.style.width = con.offsetWidth - 2 + 'px';
        ele.style.height = con.offsetHeight - 5 + 'px';

        //select control
        if (this._uSelect) {
            this._uSelect.setSize(con.offsetWidth - 2, 22);
        }
        else if (this._uInput) {
            this._uInput.setValue('');
            this._uInput.getOuter().style.width = (con.offsetWidth - 2) + 'px';
        }
        else {
            me._uFront.setSelectedIndex(0);
            me._uRoot.setValue('');
            me._uPath.setValue('');
            var frontWidth = me._uFront.getOuter().offsetWidth;
            var rootWidth = me._uRoot.getOuter().offsetWidth;
            me._uRoot.getOuter().style.width = (con.offsetWidth - 130) + 'px';

            var pathWidth = me._uPath.getOuter().offsetWidth;
            ele.style.width = frontWidth + rootWidth + pathWidth + 9 + 'px';
        }

        //set focus
        this.focus();
        if (Object.prototype.toString.call(this.getInnerControl()) !== '[object Array]') {
            triggerEvent(this, 'beforeedit', null, [this.getInnerControl(), rowData]);
        }
        else {
            var args = this.getInnerControl();
            args.push(rowData);
            triggerEvent(this, 'beforeedit', null, args);
        }
    }


    var lazyCheck = function () {
        var focused = ecui.getFocused();
        var focusedEditor = null;

        if ((focused instanceof UI_ITEM) && (focused.getParent() instanceof UI_SELECT)) {
            focused = focused.getParent();
        }

        if ((focused instanceof UI_SELECT) && (focused.getParent() instanceof UI_TABLE_EDITOR)) {
            focused = focused.getParent();
        }

        if (focused instanceof UI_TABLE_EDITOR) {
            focusedEditor = focused;
        }


        var checkIsTagetFocus = function (control) {
            var flag = false;
            if (control == focusedEditor) {
                flag = true;
            }
            else if (control.target) {
                flag = checkIsTagetFocus(control.target);
            }
            return flag;
        }

        var checkIsParentFocus = function (control) {
            var flag = false;
            if (control == focusedEditor) {
                flag = true;
            }
            else if (control.parTarget) {
                flag = checkIsParentFocus(control.parTarget);
            }
            return flag;
        }
        var connectControls = [];
        var getParControls = function (control) {
            connectControls.push(control);
            if (control.target && baidu.array.indexOf(connectControls, control.target)) {
                getParControls(control.target);
            }
        }

        var getChildControls = function (control) {
            connectControls.push(control);
            if (control.parTarget && baidu.array.indexOf(connectControls, control.parTarget)) {
                getChildControls(control.parTarget);
            }
        }

        if (!focusedEditor || (!checkIsTagetFocus(this) && !checkIsParentFocus(this))) {

            getParControls(this);
            getChildControls(this);
            connectControls = baidu.array.unique(connectControls);
            baidu.each(connectControls, function (item) {
                item.hide();
            });
        }
    }

    UI_TABLE_EDITOR_CLASS.$blur = function (event) {
        var me = this;
        setTimeout(function () {
            lazyCheck.call(me, event)
        }, 1);
    }

    UI_TABLE_EDITOR_CLASS.onhide = function (e) {
        var me = this;

        var rowData = this.rowData;
        var table = this.getParent();
        var control = this._uInput || this._uSelect;
        var me = this;
        var editCell = this.editCell;
        document.body.appendChild(me.getOuter());
        var e = {
            'message': ''
        }
        var o = null;

        if (!control) {
            o = triggerEvent(this, 'editsubmit', e, [me._uFront, me._uRoot, me._uPath, rowData]);
        }
        else {
            o = triggerEvent(this, 'editsubmit', e, [control, rowData]);
        }

        if ('[object String]' == Object.prototype.toString.call(e.message) && e.message != '') {
            this.setError(e.message);
        }
        else {
            if (control && control == this._uInput) {
                e.value = (e.value !== undefined ? e.value : control.getValue());
                editCell.innerHTML = e.value;
            }
            else if (control && control == this._uSelect) {
                editCell.innerHTML = control.getSelected()._eBody.innerText;
            }
            else {
                e.value = (e.value !== undefined ? e.value : me.getValue());
                editCell.innerHTML = e.value;
            }
        }

    }

    UI_TABLE_EDITOR_CLASS.focus = function () {
        var control = this._uInput || this._uSelect;
        core.setFocused(this, control);
    }


    UI_TABLE_EDITOR_CLASS.setAttached = function (cell, data) {

        var container = baidu.dom.children(cell)[1];
        var table = this.getParent();

        var control = this._uSelect;
        var editCell = table._sEditCell;

        var nowText = container.innerHTML;
        control.clear();
        var nowValue = undefined;
        baidu.each(data, function (item) {
            if (nowText == item.text) {
                nowValue = item.value;
            }
            control.add(item.text, null, {'value': item.value});
        });
        control.setValue(nowValue);
    }

    UI_TABLE_EDITOR_CLASS.setError = function (str) {
        str = trim(str);
        var table = this.getParent();
        var editCell = table._sEditCell;

        if (str) {
            ecui.alert(str, function () {
            });
        }
    }
})();

/*
 Table - 定义由行列构成的表格的基本操作。
 表格控件，继承自截面控件，对基本的 TableElement 功能进行了扩展，表头固定，不会随表格的垂直滚动条滚动而滚动，在行列滚动时，支持整行整列移动，允许直接对表格的数据进行增加/删除/修改操作。

 表格控件直接HTML初始化的例子:
 <div ecui="type:table">
 <table>
 <!-- 表头区域 -->
 <thead>
 <tr>
 <th style="width:200px;">公司名</th>
 <th style="width:200px;">url</th>
 <th style="width:250px;">地址</th>
 <th style="width:100px;">创办时间</th>
 </tr>
 </thead>
 <!-- 内容行区域 -->
 <tbody>
 <tr>
 <td>百度</td>
 <td>www.baidu.com</td>
 <td>中国北京中关村</td>
 <td>1999</td>
 </tr>
 </tbody>
 </table>
 </div>

 属性
 _aHCells     - 表格头单元格控件对象
 _aRows       - 表格数据行对象
 _uHead       - 表头区域

 表头列属性
 $$pos        - 列的坐标

 行属性
 $$pos        - 行的坐标
 _aElements   - 行的列Element对象，如果当前列需要向左合并为null，需要向上合并为false
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        string = core.string,
        ui = core.ui,
        util = core.util,

        undefined,
        DOCUMENT = document,
        MATH = Math,
        REGEXP = RegExp,
        MAX = MATH.max,
        MIN = MATH.min,

        USER_AGENT = navigator.userAgent,
        ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT) ? DOCUMENT.documentMode || (REGEXP.$1 - 0) : undefined,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        first = dom.first,
        getPosition = dom.getPosition,
        getAttribute = dom.getAttribute,
        getParent = dom.getParent,
        insertBefore = dom.insertBefore,
        insertHTML = dom.insertHTML,
        next = dom.next,
        removeDom = dom.remove,
        trim = string.trim,
        extend = util.extend,
        toNumber = util.toNumber,
        getView = util.getView,

        $fastCreate = core.$fastCreate,
        disposeControl = core.dispose,
        getOptions = core.getOptions,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        eventNames = [
            'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
            'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
            'keydown', 'keypress', 'keyup', 'mousewheel'
        ],

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_SCROLLBAR_CLASS = ui.Scrollbar.prototype,
        UI_VSCROLLBAR = ui.VScrollbar,
        UI_PANEL = ui.Panel,
        UI_PANEL_CLASS = UI_PANEL.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_TABLE
    ///__gzip_original__UI_TABLE_CLASS
    /**
     * 初始化表格控件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_TABLE = ui.Table =
            inheritsControl(
                UI_PANEL,
                'ui-table',
                function (el, options) {
                    var list, o,
                        type = this.getType();

                    options.wheelDelta = 1;
                    if (el.tagName == 'TABLE') {
                        var table = el;
                        insertBefore(el = createDom(table.className), table).appendChild(table);
                        if (options.width) {
                            el.style.width = options.width;
                        }
                        if (options.height) {
                            el.style.height = options.height;
                        }
                        table.className = '';
                    }

                    o = el.getElementsByTagName('TABLE')[0];
                    list = children(o);

                    o.setAttribute('cellSpacing', '0');

                    if (list[0].tagName != 'THEAD') {
                        insertBefore(createDom('', '', 'thead'), list[0])
                            .appendChild(children(list[0])[0]);
                    }

                    return el;
                },
                function (el, options) {
                    var i = 0,
                        type = this.getType(),
                        rows = this._aRows = [],
                        cols = this._aHCells = [],
                        colspans = [],
                        o = el.getElementsByTagName('TABLE')[0],
                        list = children(o),
                        j = list[0],
                        headRowCount = 1;

                    o = children(list[0]);
                    headRowCount = o.length;
                    list = o.concat(children(list[1]));

                    // 设置滚动条操作
                    if (o = this.$getSection('VScrollbar')) {
                        o.setValue = UI_TABLE_SCROLL_SETVALUE;
                    }
                    if (o = this.$getSection('HScrollbar')) {
                        o.setValue = UI_TABLE_SCROLL_SETVALUE;
                    }

                    // 初始化表格区域
                    o = createDom(type + '-head' + UI_CONTROL.TYPES, 'position:absolute;top:0px;overflow:hidden');
                    o.innerHTML =
                        '<div style="white-space:nowrap;position:absolute"><table cellspacing="0"><tbody>' +
                        '</tbody></table></div>';
                    (this._uHead = $fastCreate(UI_CONTROL, this.getMain().appendChild(o), this)).$setBody(j);

                    // 以下初始化所有的行控件
                    for (; o = list[i]; i++) {
                        o.className = trim(o.className) + this.Row.TYPES;
                        // list[i] 保存每一行的当前需要处理的列元素
                        list[i] = first(o);
                        colspans[i] = 1;
                        (rows[i] = $fastCreate(this.Row, o, this))._aElements = [];
                    }

                    for (j = 0; ; j++) {
                        for (i = 0; o = rows[i]; i++) {
                            if (colspans[i]-- > 1) {
                                continue;
                            }
                            if (el = list[i]) {
                                if (o._aElements[j] === undefined) {
                                    o._aElements[j] = el;
                                    // 当前元素处理完成，将list[i]指向下一个列元素
                                    list[i] = next(el);

                                    var rowspan = +getAttribute(el, 'rowSpan') || 1,
                                        colspan = colspans[i] = +getAttribute(el, 'colSpan') || 1;

                                    while (rowspan--) {
                                        if (!rowspan) {
                                            colspan--;
                                        }
                                        for (o = colspan; o--;) {
                                            rows[i + rowspan]._aElements.push(rowspan ? false : null);
                                        }
                                    }
                                }
                            }
                            //如果此单元格是被行合并的，则继续处理下一个单元格
                            else if (o._aElements[j] === false) {
                                continue;
                            }
                            else {
                                // 当前行处理完毕，list[i]不再保存行内需要处理的下一个元素
                                for (j = 0; ; j++) {
                                    // 以下使用 type 临时表示列的初始化参数
                                    type = {};
                                    for (i = 0; o = rows[i]; i++) {
                                        el = o._aElements[j];
                                        if (el === undefined) {
                                            this._aHeadRows = this._aRows.splice(0, headRowCount);
                                            return;
                                        }
                                        else if (el) {
                                            if (i < headRowCount) {
                                                extend(type, getOptions(el));
                                                el.className = trim(el.className) + this.HCell.TYPES;
                                                cols[j] = $fastCreate(this.HCell, el, this);
                                                cols[j]._oOptions = extend({}, type); //防止子列options影响父列
                                            }
                                            else {
                                                el.className =
                                                    (trim(el.className) || type.primary || '') + this.Cell.TYPES;
                                                el.getControl = UI_TABLE_GETCONTROL();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ),
        UI_TABLE_CLASS = UI_TABLE.prototype,

        /**
         * 初始化表格控件的行部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_ROW_CLASS = (UI_TABLE_CLASS.Row = inheritsControl(UI_CONTROL, 'ui-table-row')).prototype,

        /**
         * 初始化表格控件的列部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_HCELL_CLASS = (UI_TABLE_CLASS.HCell = inheritsControl(UI_CONTROL, 'ui-table-hcell')).prototype,

        /**
         * 初始化表格控件的单元格部件。
         * @public
         *
         * @param {Object} options 初始化选项
         */
        UI_TABLE_CELL_CLASS = (UI_TABLE_CLASS.Cell = inheritsControl(
            UI_CONTROL,
            'ui-table-cell',
            function (el, options) {
                // 单元格控件不能改变大小
                options.resizable = false;
            }
        )).prototype,

        /**
         * 在需要时初始化单元格控件。
         * 表格控件的单元格控件不是在初始阶段生成，而是在单元格控件第一次被调用时生成，参见核心的 getControl 方法。
         * @private
         *
         * @return {Function} 初始化单元格函数
         */
        UI_TABLE_GETCONTROL = ieVersion == 8 ? function () {
            // 为了防止写入getControl属性而导致的reflow如此处理
            var control;
            return function () {
                return (control = control || UI_TABLE_CREATE_CELL(this));
            };
        } : function () {
            return UI_TABLE_INIT_CELL;
        };
//{else}//
    /**
     * 初始化单元格。
     * @private
     *
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    function UI_TABLE_INIT_CELL() {
        this.getControl = null;
        return UI_TABLE_CREATE_CELL(this);
    }

    /**
     * 建立单元格控件。
     * @private
     *
     * @param {HTMLElement} main 单元格控件主元素
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    function UI_TABLE_CREATE_CELL(main) {
        // 获取单元格所属的行控件
        var row = getParent(main).getControl(),
            table = row.getParent();

        return $fastCreate(
            table.Cell,
            main,
            row,
            extend({}, table._aHCells[indexOf(row._aElements, main)]._oOptions)
        );
    }

    /**
     * 表格控件初始化一行。
     * @private
     *
     * @param {ecui.ui.Table.Row} row 行控件
     */
    function UI_TABLE_INIT_ROW(row) {
        for (var i = 0, list = row.getParent()._aHCells, el, o; o = list[i];) {
            if ((el = row._aElements[i++]) && el != o.getMain()) {
                o = o.getWidth() - o.getMinimumWidth();
                while (row._aElements[i] === null) {
                    o += list[i++].getWidth();
                }
                el.style.width = o + 'px';
            }
        }
    }

    /**
     * 表格控件改变显示区域值。
     * 表格控件改变显示区域时，每次尽量移动一个完整的行或列的距离。
     * @private
     *
     * @param {number} value 控件的当前值
     */
    function UI_TABLE_SCROLL_SETVALUE(value) {
        //__gzip_original__length
        var i = 1,
            list = this.getParent()[this instanceof UI_VSCROLLBAR ? '_aRows' : '_aHCells'],
            length = list.length,
            oldValue = this.getValue();

        value = MIN(MAX(0, value), this.getTotal());

        if (value == oldValue) {
            return;
        }

        if (value > oldValue) {
            if (length == 1) {
                UI_SCROLLBAR_CLASS.setValue.call(this, this.getTotal());
                return;
            }
            for (; ; i++) {
                // 计算后移的新位置
                if (value <= list[i].$$pos) {
                    if (oldValue < list[i - 1].$$pos) {
                        i--;
                    }
                    break;
                }
            }
        }
        else {
            for (i = length; i--;) {
                // 计算前移的新位置
                if (value >= list[i].$$pos) {
                    if (i < length - 1 && oldValue > list[i + 1].$$pos) {
                        i++;
                    }
                    break;
                }
            }
        }

        UI_SCROLLBAR_CLASS.setValue.call(this, list[i].$$pos);
    }

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$dispose = function () {
        this._aElements = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };

    /**
     * 获取一行内所有单元格的主元素。
     * $getElement 方法返回的主元素数组可能包含 false/null 值，分别表示当前单元格被向上或者向左合并。
     * @protected
     *
     * @return {Array} 主元素数组
     */
    UI_TABLE_ROW_CLASS.$getElements = function () {
        return this._aElements.slice();
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$hide = function () {
        var i = 0,
            table = this.getParent(),
            index = indexOf(table._aRows, this),
            nextRow = table._aRows[index + 1],
            j,
            cell,
            o;

        for (; table._aHCells[i]; i++) {
            o = this._aElements[i];
            if (o === false) {
                o = table.$getElement(index - 1, i);
                // 如果单元格向左被合并，cell == o
                if (cell != o) {
                    o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') - 1);
                    cell = o;
                }
            }
            else if (o && (j = +getAttribute(o, 'rowSpan')) > 1) {
                // 如果单元格包含rowSpan属性，需要将属性添加到其它行去
                o.setAttribute('rowSpan', j - 1);
                for (j = i + 1; ;) {
                    cell = nextRow._aElements[j++];
                    if (cell || cell === undefined) {
                        break;
                    }
                }

                o.getControl().$setParent(nextRow);
                nextRow.getBody().insertBefore(o, cell || null);
            }
        }

        UI_CONTROL_CLASS.$hide.call(this);
        table.repaint();
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.$show = function () {
        var i = 0,
            table = this.getParent(),
            index = indexOf(table._aRows, this),
            nextRow = table._aRows[index + 1],
            j,
            cell,
            o;

        for (; table._aHCells[i]; i++) {
            o = this._aElements[i];
            if (o === false) {
                o = table.$getElement(index - 1, i);
                // 如果单元格向左被合并，cell == o
                if (cell != o) {
                    o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') + 1);
                    cell = o;
                }
            }
            else if (o && nextRow && nextRow._aElements[i] === false) {
                // 如果单元格包含rowSpan属性，需要从其它行恢复
                o.setAttribute('rowSpan', +getAttribute(o, 'rowSpan') + 1);
                for (j = i + 1; ;) {
                    cell = this._aElements[j++];
                    if (cell || cell === undefined) {
                        break;
                    }
                }

                o.getControl().$setParent(this);
                this.getBody().insertBefore(o, cell || null);
            }
        }

        UI_CONTROL_CLASS.$show.call(this);
        table.resize();
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} colIndex 列序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_ROW_CLASS.getCell = function (colIndex) {
        return this._aElements[colIndex] ? this._aElements[colIndex].getControl() : null;
    };

    /**
     * 获取全部单元格控件。
     * @public
     *
     * @return {Array} 单元格控件数组
     */
    UI_TABLE_ROW_CLASS.getCells = function () {
        for (var i = this._aElements.length, result = []; i--;) {
            result[i] = this.getCell(i);
        }
        return result;
    };

    /**
     * @override
     */
    UI_TABLE_ROW_CLASS.setSize = function (width, height) {
        for (var i = this._aElements.length, oldHeight = this.getHeight(); i--;) {
            if (this._aElements[i]) {
                this._aElements[i].getControl().$setSize(null, height);
            }
        }
        this.getParent()[height > oldHeight ? 'resize' : 'repaint']();
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.$hide = function () {
        this.$setStyles('display', 'none', -this.getWidth());
    };

    /**
     * 设置整列的样式。
     * $setStyles 方法批量设置一列所有单元格的样式。
     * @protected
     *
     * @param {string} name 样式的名称
     * @param {string} value 样式的值
     * @param {number} widthRevise 改变样式后表格宽度的变化，如果省略表示没有变化
     */
    UI_TABLE_HCELL_CLASS.$setStyles = function (name, value, widthRevise) {
        //__gzip_original__cols
        var i = 0,
            table = this.getParent(),
            rows = table._aHeadRows.concat(table._aRows),
            body = this.getBody(),
            cols = table._aHCells,
            index = indexOf(cols, this),
            o = getParent(getParent(getParent(body))).style,
            j;

        body.style[name] = value;
        if (widthRevise) {
            o.width = first(table.getBody()).style.width = toNumber(o.width) + widthRevise + 'px';
        }

        for (; o = rows[i++];) {
            // 以下使用 body 表示列元素列表
            body = o._aElements;
            o = body[index];
            if (o) {
                o.style[name] = value;
            }
            if (widthRevise && o !== false) {
                for (j = index; !(o = body[j]); j--) {
                }

                var width = -cols[j].getMinimumWidth(),
                    colspan = 0;

                do {
                    if (!cols[j].getOuter().style.display) {
                        width += cols[j].getWidth();
                        colspan++;
                    }
                }
                while (body[++j] === null);

                if (width > 0) {
                    o.style.display = '';
                    o.style.width = width + 'px';
                    o.setAttribute('colSpan', colspan);
                }
                else {
                    o.style.display = 'none';
                }
            }
        }
        if (widthRevise > 0) {
            table.resize();
        }
        else {
            table.repaint();
        }
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.$show = function () {
        this.$setStyles('display', '', this.getWidth());
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} rowIndex 行序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_HCELL_CLASS.getCell = function (rowIndex) {
        return this.getParent().getCell(rowIndex, indexOf(this._aHCells, this));
    };

    /**
     * 获取全部单元格控件。
     * @public
     *
     * @return {Array} 单元格控件数组
     */
    UI_TABLE_HCELL_CLASS.getCells = function () {
        for (var i = 0, index = indexOf(this.getParent()._aHCells, this), o, result = []; o = this.getParent()._aRows[i];) {
            result[i++] = o.getCell(index);
        }
        return result;
    };

    /**
     * @override
     */
    UI_TABLE_HCELL_CLASS.setSize = function (width) {
        var oldWidth = this.getWidth();
        // 首先对列表头控件设置宽度，否则在计算合并单元格时宽度可能错误
        this.$setSize(width);
        this.$setStyles('width', width - this.$getBasicWidth() + 'px', width - oldWidth);
    };

    /**
     * @override
     */
    UI_TABLE_CELL_CLASS.getHeight = function () {
        return this.getOuter().offsetHeight;
    };

    /**
     * @override
     */
    UI_TABLE_CELL_CLASS.getWidth = function () {
        return this.getOuter().offsetWidth;
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$cache = function (style, cacheSize) {
        UI_PANEL_CLASS.$cache.call(this, style, cacheSize);

        this._uHead.cache(false, true);

        // 以下使用 style 表示临时对象 o
        this.$$paddingTop = this._uHead.getBody().offsetHeight;

        for (var i = 0, pos = 0; style = this._aRows[i++];) {
            style.$$pos = pos;
            style.cache(true, true);
            if (!style.getOuter().style.display) {
                pos += style.getHeight();
            }
        }
        for (i = 0, pos = 0; style = this._aHCells[i++];) {
            style.$$pos = pos;
            style.cache(true, true);
            if (!style.getOuter().style.display) {
                pos += style.getWidth();
            }
        }
        this.$$mainWidth = pos;
    };

    /**
     * 获取单元格主元素。
     * $getElement 方法在合法的行列序号内一定会返回一个 Element 对象，如果当前单元格被合并，将返回合并后的 Element 对象。
     * @protected
     *
     * @param {number} rowIndex 单元格的行数，从0开始
     * @param {number} colIndex 单元格的列数，从0开始
     * @return {HTMLElement} 单元格主元素对象
     */
    UI_TABLE_CLASS.$getElement = function (rowIndex, colIndex) {
        //__gzip_original__rows
        var rows = this._aRows,
            cols = rows[rowIndex] && rows[rowIndex]._aElements,
            col = cols && cols[colIndex];

        if (col === undefined) {
            col = null;
        }
        else if (!col) {
            for (; col === false; col = (cols = rows[--rowIndex]._aElements)[colIndex]) {
            }
            for (; !col; col = cols[--colIndex]) {
            }
        }
        return col;
    };

    /**
     * 页面滚动事件的默认处理。
     * @protected
     */
    UI_TABLE_CLASS.$pagescroll = function () {
        UI_PANEL_CLASS.$pagescroll.call(this);
        if (!this._uVScrollbar) {
            this._uHead.getOuter().style.top =
                MAX(getView().top - getPosition(this.getOuter()).top, 0) + 'px';
        }
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$scroll = function () {
        UI_PANEL_CLASS.$scroll.call(this);
        this._uHead.getMain().lastChild.style.left = this.getBody().style.left;
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.$setSize = function (width, height) {
        var body = this.getBody(),
            vscroll = this.$getSection('VScrollbar'),
            hscroll = this.$getSection('HScrollbar'),
            mainWidth = this.$$mainWidth,
            mainHeight = this.$$mainHeight,
            vsWidth = vscroll && vscroll.getWidth(),
            hsHeight = hscroll && hscroll.getHeight(),
            basicWidth = this.$getBasicWidth(),
            basicHeight = this.$getBasicHeight(),
            mainWidthRevise = mainWidth + basicWidth,
            mainHeightRevise = mainHeight + basicHeight,
            bodyWidth = width - basicWidth,
            bodyHeight = height - basicHeight,
            o;

        this.getMain().style.paddingTop = this.$$paddingTop + 'px';
        first(body).style.width = this._uHead.getMain().lastChild.lastChild.style.width = mainWidth + 'px';

        // 计算控件的宽度与高度自动扩展
        if (mainWidth <= bodyWidth && mainHeight <= bodyHeight) {
            width = mainWidthRevise;
            height = mainHeightRevise;
        }
        else if (!(vscroll && hscroll &&
            mainWidth > bodyWidth - vsWidth && mainHeight > bodyHeight - hsHeight)
        ) {
            o = mainWidthRevise + (!vscroll || bodyHeight >= mainHeight ? 0 : vsWidth);
            width = hscroll ? MIN(width, o) : o;
            o = mainHeightRevise + (!hscroll || bodyWidth >= mainWidth ? 0 : hsHeight);
            height = vscroll ? MIN(height, o) : o;
        }

        UI_PANEL_CLASS.$setSize.call(this, width, height);

        this._uHead.$setSize(toNumber(getParent(body).style.width), this.$$paddingTop);
    };

    /**
     * 增加一列。
     * options 对象对象支持的属性如下：
     * width   {number} 列的宽度
     * primary {string} 列的基本样式
     * title   {string} 列的标题
     * @public
     *
     * @param {Object} options 列的初始化选项
     * @param {number} index 被添加的列的位置序号，如果不合法将添加在末尾
     * @return {ecui.ui.Table.HCell} 表头单元格控件
     */
    UI_TABLE_CLASS.addColumn = function (options, index) {
        var i = 0,
            headRowCount = this._aHeadRows.length,
            rows = this._aHeadRows.concat(this._aRows),
            primary = options.primary || '',
            el = createDom(primary + this.HCell.TYPES, '', 'td'),
            col = $fastCreate(this.HCell, el, this),
            row,
            o;

        el.innerHTML = options.title || '';

        primary += this.Cell.TYPES;
        for (; row = rows[i]; i++) {
            o = row._aElements[index];
            if (o !== null) {
                // 没有出现跨列的插入列操作
                for (j = index; !o;) {
                    o = row._aElements[++j];
                    if (o === undefined) {
                        break;
                    }
                }
                if (i < headRowCount) {
                    row._aElements.splice(index, 0, row.getBody().insertBefore(el, o));
                    el.setAttribute('rowSpan', headRowCount - i);
                    this._aHCells.splice(index, 0, col);
                    i = headRowCount - 1;
                }
                else {
                    row._aElements.splice(index, 0, o = row.getBody().insertBefore(createDom(primary, '', 'td'), o));
                    o.getControl = UI_TABLE_GETCONTROL();
                }
            }
            else {
                // 出现跨列的插入列操作，需要修正colspan的属性值
                var cell = this.$getElement(i - headRowCount, index),
                    j = +getAttribute(cell, 'rowspan') || 1;

                cell.setAttribute('colSpan', +getAttribute(cell, 'colSpan') + 1);
                row._aElements.splice(index, 0, o);
                for (; --j;) {
                    rows[++i]._aElements.splice(index, 0, false);
                }
            }
        }

        col.cache();
        col.$setSize(options.width);
        col.$setStyles('width', el.style.width, options.width);
        col._oOptions = extend({}, options);

        return col;
    };

    /**
     * 增加一行。
     * @public
     *
     * @param {Array} data 数据源(一维数组)
     * @param {number} index 被添加的行的位置序号，如果不合法将添加在最后
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.addRow = function (data, index) {
        var i = 0,
            j = 1,
            body = this.getBody().lastChild.lastChild,
            el = createDom(),
            html = ['<table><tbody><tr class="' + this.Row.TYPES + '">'],
            rowCols = [],
            row = this._aRows[index],
            col;

        if (!row) {
            index = this._aRows.length;
        }

        for (; col = this._aHCells[i];) {
            if (row && row._aElements[i] === false || data[i] === false) {
                rowCols[i++] = false;
            }
            else {
                // 如果部分列被隐藏，colspan/width 需要动态计算
                rowCols[i] = true;
                html[j++] = '<td class="' + this.Cell.TYPES + '" style="';
                for (
                    var o = i,
                        colspan = col.isShow() ? 1 : 0,
                        width = col.getWidth() - col.getMinimumWidth();
                    (col = this._aHCells[++i]) && data[i] === null;
                ) {
                    rowCols[i] = null;
                    if (col.isShow()) {
                        colspan++;
                        width += col.getWidth();
                    }
                }
                rowCols[o] = true;
                html[j++] = (colspan ? 'width:' + width + 'px" colSpan="' + colspan : 'display:none') + '">' +
                    (data[o] || '') + '</td>';
            }
        }

        html[j] = '</tr></tbody></table>';
        el.innerHTML = html.join('');
        el = el.lastChild.lastChild.lastChild;

        body.insertBefore(el, row ? row.getOuter() : null);
        row = $fastCreate(this.Row, el, this);
        this._aRows.splice(index--, 0, row);

        // 以下使用 col 表示上一次执行了rowspan++操作的单元格，同一个单元格只需要增加一次
        for (i = 0, el = el.firstChild, col = null; this._aHCells[i]; i++) {
            if (o = rowCols[i]) {
                rowCols[i] = el;
                el.getControl = UI_TABLE_GETCONTROL();
                el = el.nextSibling;
            }
            else if (o === false) {
                o = this.$getElement(index, i);
                if (o != col) {
                    o.setAttribute('rowSpan', (+getAttribute(o, 'rowSpan') || 1) + 1);
                    col = o;
                }
            }
        }

        row._aElements = rowCols;
        this.resize();
        return row;
    };

    /**
     * 获取单元格控件。
     * @public
     *
     * @param {number} rowIndex 行序号，从0开始
     * @param {number} colIndex 列序号，从0开始
     * @return {ecui.ui.Table.Cell} 单元格控件
     */
    UI_TABLE_CLASS.getCell = function (rowIndex, colIndex) {
        rowIndex = this._aRows[rowIndex];
        return rowIndex && rowIndex.getCell(colIndex) || null;
    };

    /**
     * 获取表格列的数量。
     * @public
     *
     * @return {number} 表格列的数量
     */
    UI_TABLE_CLASS.getColumnCount = function () {
        return this._aHCells.length;
    };

    /**
     * 获取表头单元格控件。
     * 表头单元格控件提供了一些针对整列进行操作的方法，包括 hide、setSize(仅能设置宽度) 与 show 方法等。
     * @public
     *
     * @param {number} index 列序号，从0开始
     * @return {ecui.ui.Table.HCell} 表头单元格控件
     */
    UI_TABLE_CLASS.getHCell = function (index) {
        return this._aHCells[index] || null;
    };

    /**
     * 获取全部的表头单元格控件。
     * @public
     *
     * @return {Array} 表头单元格控件数组
     */
    UI_TABLE_CLASS.getHCells = function () {
        return this._aHCells.slice();
    };

    /**
     * 获取行控件。
     * @public
     *
     * @param {number} index 行数，从0开始
     * @return {ecui.ui.Table.Row} 行控件
     */
    UI_TABLE_CLASS.getRow = function (index) {
        return this._aRows[index] || null;
    };

    /**
     * 获取表格行的数量。
     * @public
     *
     * @return {number} 表格行的数量
     */
    UI_TABLE_CLASS.getRowCount = function () {
        return this._aRows.length;
    };

    /**
     * 获取全部的行控件。
     * @public
     *
     * @return {Array} 行控件列表
     */
    UI_TABLE_CLASS.getRows = function () {
        return this._aRows.slice();
    };

    /**
     * @override
     */
    UI_TABLE_CLASS.init = function () {
        insertBefore(this._uHead.getBody(), this._uHead.getMain().lastChild.lastChild.firstChild);
        this.$$mainHeight -= this.$$paddingTop;

        UI_PANEL_CLASS.init.call(this);

        for (var i = 0, o; o = this._aHCells[i++];) {
            o.$setSize(o.getWidth());
        }
        for (i = 0; o = this._aHeadRows[i++];) {
            UI_TABLE_INIT_ROW(o);
        }
        for (i = 0; o = this._aRows[i++];) {
            UI_TABLE_INIT_ROW(o);
        }
    };

    /**
     * 移除一列并释放占用的空间。
     * @public
     *
     * @param {number} index 列序号，从0开始计数
     */
    UI_TABLE_CLASS.removeColumn = function (index) {
        var i = 0,
            cols = this._aHCells,
            o = cols[index];

        if (o) {
            o.hide();

            removeDom(o.getOuter());
            disposeControl(o);
            cols.splice(index, 1);

            for (; o = this._aRows[i++];) {
                cols = o._aElements;
                if (o = cols[index]) {
                    if (cols[index + 1] === null) {
                        // 如果是被合并的列，需要保留
                        cols.splice(index + 1, 1);
                        continue;
                    }
                    removeDom(o);
                    if (o.getControl != UI_TABLE_GETCONTROL()) {
                        disposeControl(o.getControl());
                    }
                }
                cols.splice(index, 1);
            }
        }
    };

    /**
     * 移除一行并释放占用的空间。
     * @public
     *
     * @param {number} index 行序号，从0开始计数
     */
    UI_TABLE_CLASS.removeRow = function (index) {
        var i = 0,
            row = this._aRows[index],
            rowNext = this._aRows[index + 1],
            body = row.getBody(),
            o;

        if (row) {
            row.hide();
            for (; this._aHCells[i]; i++) {
                if (o = row._aElements[i]) {
                    if (getParent(o) != body) {
                        rowNext._aElements[i] = o;
                        for (; row._aElements[++i] === null;) {
                            rowNext._aElements[i] = null;
                        }
                        i--;
                    }
                }
            }

            removeDom(row.getOuter());
            disposeControl(row);
            this._aRows.splice(index, 1);

            this.repaint();
        }
    };

    // 初始化事件转发信息
    (function () {
        function build(name) {
            var type = name.replace('mouse', '');

            name = '$' + name;

            UI_TABLE_ROW_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                triggerEvent(this.getParent(), 'row' + type, event);
            };

            UI_TABLE_CELL_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                triggerEvent(this.getParent().getParent(), 'cell' + type, event);
            };
        }

        for (var i = 0; i < 7;) {
            build(eventNames[i++]);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/*
 LockedTable - 定义允许左右锁定若干列显示的高级表格的基本操作。
 允许锁定左右两列的高级表格控件，继承自表格控件，内部包含两个部件——锁定的表头区(基础控件)与锁定的行内容区(基础控件)。

 锁定列高级表格控件直接HTML初始化的例子:
 <div ecui="type:locked-table;left-lock:2;right-lock:1">
 <table>
 <!-- 当前节点的列定义，如果有特殊格式，需要使用width样式 -->
 <thead>
 <tr>
 <th>标题</th>
 ...
 </tr>
 </thead>
 <tbody>
 <!-- 这里放单元格序列 -->
 <tr>
 <td>单元格一</td>
 ...
 </tr>
 ...
 </tbody>
 </table>
 </div>

 属性
 _nLeft       - 最左部未锁定列的序号
 _nRight      - 最右部未锁定列的后续序号，即未锁定的列序号+1
 _aLockedRow  - 用于显示锁定区域的行控件数组
 _uLockedHead - 锁定的表头区
 _uLockedMain - 锁定的行内容区

 表格行与锁定行属性
 _eFill       - 用于控制中部宽度的单元格
 */
//{if 0}//
(function () {

    var core = ecui,
        array = core.array,
        dom = core.dom,
        ui = core.ui,
        util = core.util,

        MATH = Math,
        MAX = MATH.max,
        REGEXP = RegExp,
        USER_AGENT = navigator.userAgent,

        indexOf = array.indexOf,
        children = dom.children,
        createDom = dom.create,
        getParent = dom.getParent,
        getAttribute = dom.getAttribute,
        insertBefore = dom.insertBefore,
        removeDom = dom.remove,
        blank = util.blank,
        toNumber = util.toNumber,

        $fastCreate = core.$fastCreate,
        disposeControl = core.dispose,
        $bind = core.$bind,
        inheritsControl = core.inherits,

        firefoxVersion = /firefox\/(\d+\.\d)/i.test(USER_AGENT) ? REGEXP.$1 - 0 : undefined

    eventNames = [
        'mousedown', 'mouseover', 'mousemove', 'mouseout', 'mouseup',
        'click', 'dblclick', 'focus', 'blur', 'activate', 'deactivate',
        'keydown', 'keypress', 'keyup', 'mousewheel'
    ],

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_TABLE = ui.Table,
        UI_TABLE_CLASS = UI_TABLE.prototype,
        UI_TABLE_ROW = UI_TABLE_CLASS.Row,
        UI_TABLE_ROW_CLASS = UI_TABLE_ROW.prototype;
//{/if}//
//{if $phase == "define"}//
    /**
     * 初始化高级表格控件。
     * options 对象支持的属性如下：
     * left-lock  左边需要锁定的列数
     * right-lock 右边需要锁定的列数
     * @public
     *
     * @param {Object} options 初始化选项
     */
    //__gzip_original__UI_LOCKED_TABLE
    //__gzip_original__UI_LOCKED_TABLE_ROW
    var UI_LOCKED_TABLE = ui.LockedTable =
        inheritsControl(
            UI_TABLE,
            '*locked-table',
            null,
            function (el, options) {
                var i = 0,
                    type = this.getType(),
                    headRows = this._aHeadRows,
                    rows = headRows.concat(this._aRows),
                    lockedEl = createDom('', 'position:absolute;top:0px;left:0px;overflow:hidden'),
                    list = [],
                    lockedRows = this._aLockedRow = [],
                    lockedHeadRows = this._aLockedHeadRow = [],
                    o;

                this._nLeft = options.leftLock || 0;
                this._nRight = this.getColumnCount() - (options.rightLock || 0);

                // 以下使用 options 代替 rows
                for (; el = rows[i];) {
                    el = el.getMain();
                    list[i++] =
                        '<tr class="' + el.className + '" style="' + el.style.cssText +
                        '"><td style="padding:0px;border:0px"></td></tr>';
                }

                lockedEl.innerHTML =
                    '<div class="' + type + '-locked-head" style="position:absolute;top:0px;left:0px"><div style="white-space:nowrap;position:absolute"><table cellspacing="0"><thead>' + list.splice(0, headRows.length).join('') + '</thead></table></div></div><div class="' + type + '-locked-layout" style="position:absolute;left:0px;overflow:hidden"><div style="white-space:nowrap;position:absolute;top:0px;left:0px"><table cellspacing="0"><tbody>' + list.join('') + '</tbody></table></div></div>';
                // 初始化锁定的表头区域，以下使用 list 表示临时变量
                o = this._uLockedHead = $fastCreate(UI_CONTROL, lockedEl.firstChild, this);
                o.$setBody(el = o.getMain().lastChild.lastChild.firstChild);

                for (i = 0, list = children(el); o = list[i];) {
                    lockedHeadRows[i] = UI_LOCKED_TABLE_CREATE_LOCKEDROW(o, headRows[i++]);
                }

                o = this._uLockedMain = $fastCreate(UI_CONTROL, el = lockedEl.lastChild, this);
                o.$setBody(el = el.lastChild);

                for (i = 0, list = children(el.lastChild.lastChild); o = list[i];) {
                    lockedRows[i] = UI_LOCKED_TABLE_CREATE_LOCKEDROW(o, this._aRows[i++]);
                }
                insertBefore(lockedEl.firstChild, this._uHead.getOuter());
                insertBefore(lockedEl.firstChild, getParent(this.getBody()));
            }
        );
    UI_LOCKED_TABLE_CLASS = UI_LOCKED_TABLE.prototype,

    /**
     * 初始化高级表格控件的行部件。
     * @public
     *
     * @param {Object} options 初始化选项
     */
        UI_LOCKED_TABLE_ROW_CLASS = (UI_LOCKED_TABLE_CLASS.Row = inheritsControl(UI_TABLE_CLASS.Row)).prototype;
//{else}//
    /**
     * 建立锁定行控件。
     * @private
     *
     * @param {HTMLElement} el 锁定行的 Element 元素
     * @param {ecui.ui.Table.Row} row 表格基本行控件
     */
    function UI_LOCKED_TABLE_CREATE_LOCKEDROW(el, row) {
        $bind(el, row);
        row._eFill = el.lastChild;

        return row;
    }

    /**
     * 拆分行内的单元格到锁定列或基本列中。
     * @private
     *
     * @param {ecui.ui.LockedTable.LockedHead|ecui.ui.LockedTable.LockedRow} locked 锁定表头控件或者锁定行控件
     */
    function UI_LOCKED_TABLE_ROW_SPLIT(locked) {
        var i = 0,
            table = locked.getParent(),
            cols = table.getHCells(),
            list = locked.$getElements(),
            baseBody = locked.getBody(),
            lockedBody = getParent(locked._eFill),
            el = lockedBody.firstChild,
            o;

        for (; cols[i];) {
            if (i == table._nLeft) {
                el = baseBody.firstChild;
            }
            if (o = list[i++]) {
                if (el != o) {
                    (i <= table._nLeft || i > table._nRight ? lockedBody : baseBody).insertBefore(o, el);
                }
                else {
                    el = el.nextSibling;
                }
            }
            if (i == table._nRight) {
                el = locked._eFill.nextSibling;
            }
        }
    }

    /**
     * 拆分所有行内的单元格到锁定列或基本列中。
     * @private
     *
     * @param {ecui.ui.LockedTable} table 锁定式表格控件
     */
    function UI_LOCKED_TABLE_ALL_SPLIT(table) {
        for (var i = 0, o; o = table._aLockedHeadRow[i++];) {
            UI_LOCKED_TABLE_ROW_SPLIT(o);
        }
        for (var i = 0, o; o = table._aLockedRow[i++];) {
            UI_LOCKED_TABLE_ROW_SPLIT(o);
        }
    }

    /**
     * @override
     */
    UI_LOCKED_TABLE_ROW_CLASS.$dispose = function () {
        this._eFill = null;
        UI_TABLE_ROW_CLASS.$dispose.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$cache = function (style, cacheSize) {
        UI_TABLE_CLASS.$cache.call(this, style, cacheSize);

        var i = 0,
            rows = this.getRows(),
            cols = this.getHCells(),
            pos = cols[this._nLeft].$$pos;

        this.$$paddingTop = MAX(this.$$paddingTop, this._uLockedHead.getBody().offsetHeight);
        this.$$mainWidth -=
            (this.$$paddingLeft = pos) +
            (this.$$paddingRight =
                this._nRight < cols.length ? this.$$mainWidth - cols[this._nRight].$$pos : 0);

        // 以下使用 style 代替临时变量 o
        for (; style = cols[i++];) {
            style.$$pos -= pos;
        }

        for (i = 0, pos = 0; style = rows[i++];) {
            style.getCell(this._nLeft).cache(false, true);
            style.$$pos = pos;
            pos += MAX(style.getHeight(), style._eFill.offsetHeight);
        }

        if (pos) {
            this.$$mainHeight = pos;
            if (!this._bCreated) {
                this.$$mainHeight += this.$$paddingTop;
            }
        }

        this._uLockedHead.cache(false, true);
        this._uLockedMain.cache(false, true);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$pagescroll = function () {
        UI_TABLE_CLASS.$pagescroll.call(this);
        if (!this._uVScrollbar) {
            this._uLockedHead.getOuter().style.top = this._uHead.getOuter().style.top
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$resize = function () {
        var o = this.getMain().style;
        o.paddingLeft = o.paddingRight = '';
        this.$$paddingLeft = this.$$paddingRight = 0;
        UI_TABLE_CLASS.$resize.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$scroll = function () {
        UI_TABLE_CLASS.$scroll.call(this);
        this._uLockedMain.getBody().style.top = this.getBody().style.top;
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.$setSize = function (width, height) {
        var o = this.getMain().style,
            i = 0,
            layout = getParent(this.getBody()),
            lockedHead = this._uLockedHead,
            lockedMain = this._uLockedMain,
            style = getParent(getParent(lockedHead.getBody())).style;

        o.paddingLeft = this.$$paddingLeft + 'px';
        o.paddingRight = this.$$paddingRight + 'px';

        UI_TABLE_CLASS.$setSize.call(this, width, height);
        o = this._uHead.getWidth() + this.$$paddingLeft + this.$$paddingRight;
        lockedHead.$setSize(o, this.$$paddingTop);

        style.height = this.$$paddingTop + 'px';
        this._uLockedMain.$setSize(o, toNumber(layout.style.height));
        style.width = this._uLockedMain.getBody().lastChild.style.width = o + 'px';
        this._uLockedMain.getOuter().style.top = this.$$paddingTop + 'px';

        width = layout.style.width;

        // 统一行高
        // 分别设置表头与内容区域
        var rows = this._aLockedHeadRow,
            minHeight;

        // 设置表头， 处理多行表头的问题
        height = this.$$paddingTop / rows.length;
        for (i = 0; o = rows[i]; i++) {
            o._eFill.style.width = width;
            o._eFill.style.height = height + 'px';
            o = o.getCell(this._nLeft);
            if (o) {
                //此处处理了
                minHeight = firefoxVersion ? 0 : ((o.$getBasicHeight && o.$getBasicHeight()) || 60);
                //firefox 16版本出了问题 单独fix一下
                if (firefoxVersion && firefoxVersion > 15) {
                    minHeight = o.$getBasicHeight();
                }
                o = o.getOuter();
                style = getAttribute(o, 'rowSpan') || 0;
                if (style) {
                    style = parseInt(style, 10);
                }
                o.style.height = MAX(style * height - minHeight, 0) + 'px';
            }
        }

        // 设置表格内容行
        rows = this._aLockedRow;
        for (i = 0; o = rows[i]; i++) {
            o._eFill.style.width = width;

            style = MAX(height = o.getCell(this._nLeft).getOuter().offsetHeight, o._eFill.offsetHeight);
            if (style > o._eFill.offsetHeight) {
                o._eFill.style.height = style + 'px';
            }
            else if (height < style) {
                minHeight = firefoxVersion ? 0 : o.getCell(this._nLeft).$getBasicHeight();
                //firefox 16版本出了问题 单独fix一下
                if (firefoxVersion && firefoxVersion > 15) {
                    minHeight = o.getCell(this._nLeft).$getBasicHeight()
                }
                o.getCell(this._nLeft).getOuter().style.height = MAX(style - minHeight, 0) + 'px';
            }
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.addColumn = function (options, index) {
        if (index >= 0) {
            if (index < this._nLeft) {
                this._nLeft++;
            }
            if (index < this._nRight) {
                this._nRight++;
            }
        }
        return UI_TABLE_CLASS.addColumn.call(this, options, index);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.removeRow = function (index) {
        var i = 0, row = this._aRows[index], o,
            lockedTR = row._eFill.parentNode;

        if (row) {
            row.hide();
            o = row.getOuter();
            disposeControl(row);
            removeDom(o, true);
            removeDom(lockedTR, true);
            this._aRows.splice(index, 1);
            this._aLockedRow.splice(index, 1);
            this.repaint();
        }
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.addRow = function (data, index) {

        //__gzip_original__lockedRow
        var row = UI_TABLE_CLASS.addRow.call(this, data, index),
            index = indexOf(this.getRows(), row),
            lockedRow = this._aLockedRow[index],
            el = row.getMain(),
            o = createDom();

        o.innerHTML = '<table cellspacing="0"><tbody><tr class="' + el.className + '" style="' + el.style.cssText +
            '"><td style="padding:0px;border:0px"></td></tr></tbody></table>';

        o = UI_LOCKED_TABLE_CREATE_LOCKEDROW(el = o.lastChild.lastChild.lastChild, row);
        lockedRow = lockedRow ? lockedRow._eFill.parentNode : null;
        this._uLockedMain.getBody().lastChild.lastChild.insertBefore(el, lockedRow);
        this._aLockedRow.splice(index, 0, o);
        UI_LOCKED_TABLE_ROW_SPLIT(o);

        this.repaint();

        return row;
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.init = function () {
        UI_LOCKED_TABLE_ALL_SPLIT(this);
        UI_TABLE_CLASS.init.call(this);
    };

    /**
     * @override
     */
    UI_LOCKED_TABLE_CLASS.removeColumn = function (index) {
        UI_TABLE_CLASS.removeColumn.call(this, index);
        if (index >= 0) {
            if (index < this._nLeft) {
                this._nLeft--;
            }
            if (index < this._nRight) {
                this._nRight--;
            }
        }
    };

    /**
     * 初始化需要执行关联控制的行控件鼠标事件的默认处理。
     * 行控件鼠标事件发生时，需要通知关联的行控件也同步产生默认的处理。
     * @protected
     */
    (function () {
        function build(name) {
            UI_LOCKED_TABLE_ROW_CLASS[name] = function (event) {
                UI_CONTROL_CLASS[name].call(this, event);
                getParent(this._eFill).className = this.getMain().className;
            };
        }

        for (var i = 0; i < 11;) {
            build('$' + eventNames[i++]);
        }
    })();
//{/if}//
//{if 0}//
})();
//{/if}//

/**
 * custom-table.js
 * Copyright 2012 Baidu Inc. All rights reserved *
 * desc: 工作台项目定制的table控件，提供的功能包括表头锁定和列锁定、行选中、排序、使用render方法填充和刷新表格；表格支持跨行跨列,最多跨两行
 * author: hades(denghongqi@baidu.com)
 */

(function () {
    var core = ecui,
        dom = core.dom,
        array = core.array,
        ui = core.ui,
        string = core.string,
        util = core.util,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        disposeControl = core.dispose,
        $disposeControl = core.$dispose,
        createDom = dom.create,
        first = dom.first,
        last = dom.last,
        children = dom.children,
        addClass = dom.addClass,
        setStyle = dom.setStyle,
        setText = dom.setText,
        getText = dom.getText,
        removeClass = dom.removeClass,
        getParent = dom.getParent,
        moveElements = dom.moveElements,
        getAttribute = dom.getAttribute,
        getPosition = dom.getPosition,
        encodeHTML = baidu.string.encodeHTML,
        remove = array.remove,
        getView = util.getView,
        extend = util.extend,
        repaint = core.repaint,
        attachEvent = util.attachEvent,
        detachEvent = util.detachEvent,

        chromeVersion = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp['\x241'] : undefined,
        MATH = Math,
        MIN = MATH.min,
        WINDOW = window,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON = ui.Button,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_TABLE = ui.Table,
        UI_TABLE_CLASS = UI_TABLE.prototype,
        UI_LOCKED_TABLE = ui.LockedTable,
        UI_LOCKED_TABLE_CLASS = UI_LOCKED_TABLE.prototype,
        UI_TABLE_EDITOR = ui.TableEditor,
        UI_TABLE_EDITOR_CLASS = UI_TABLE_EDITOR.prototype;

    var UI_CUSTOM_TABLE = ui.CustomTable =
            inheritsControl(
                UI_LOCKED_TABLE,
                'ui-table',
                function (el, options) {
                    this._oOptions = options;
                    this._aHeader = options.header;
                    this._sSortby = options.sortby;
                    this._sOrderby = options.orderby;
                    this.editors = {};

                    if (!options.datasource) {
                        this._nLeftLock = options.leftLock || 0;
                        this._nRightLock = options.rightLock || 0;
                    }

                    var type = this.getTypes()[0];

                    var html = [];
                    html.push('<table><thead>');

                    options.leftLock = options.leftLock || 0;
                    options.rightLock = options.rightLock || 0;
                    var lockedTotal = options.leftLock + options.rightLock;

                    if (!options.datasource) {
                        setStyle(el, 'width', '100%');
                    }
                    else {
                        setStyle(el, 'width', 'auto');
                        setStyle(el, 'display', 'block');
                    }

                    if (!options.datasource) {
                        html.push('<tr>');
                        var i;
                        for (var i = 0; i <= lockedTotal; i++) {
                            html.push('<th></th>');
                        }
                        html.push('</tr>');
                    }
                    else {
                        // 表头目前只支持跨两行
                        if ('[object Array]' == Object.prototype.toString.call(options.fields[0])) {
                            var flag = 0;
                            var i;
                            for (i = 0; i < options.fields.length; i++) {
                                var o = options.fields[i];
                                html.push(createHeadRow(o, this, options.fields));
                            }
                            this._aColumns = [];
                            for (var i = 0, o; o = options.fields[0][i]; i++) {
                                if (o.colspan) {
                                    for (var j = 0; j < o.colspan; j++) {
                                        this._aColumns.push(extend({}, options.fields[1][flag++]));
                                    }
                                }
                                else {
                                    this._aColumns.push(extend({}, o));
                                }
                            }
                        }
                        else {
                            html.push(createHeadRow(options.fields, this));
                            this._aColumns = copyArray(options.fields);
                        }
                    }

                    html.push('</thead><tbody>');

                    if (!options.datasource) {
                        html.push('<tr>');
                        var i;
                        html.push('<td></td>');
                        html.push('</tr>');
                        options.leftLock = 0;
                        options.rightLock = 0;
                    }
                    else {
                        this._aData = options.datasource;

                        if (!this._aData.length) {
                            html.push('<tr>');
                            html.push(
                                '<td class="' + type + '-empty-cell'
                                + '" align="left" colspan="'
                                + this._aColumns.length
                                + '">'
                            );
                            html.push(
                                options.errorMsg
                                    ? options.errorMsg
                                    : '暂无数据，请稍后再试'
                            );
                            html.push('</td>');
                            html.push('</tr>');
                        }
                        else {
                            var i;
                            for (i = 0; i < options.datasource.length; i++) {
                                var item = options.datasource[i];
                                html.push('<tr>');
                                var j;
                                for (j = 0; j < this._aColumns.length; j++) {
                                    var o = this._aColumns[j];
                                    html.push('<td');

                                    if (o.checkbox) {
                                        o.width = 16;
                                    }

                                    html.push(' width="' + o.width + '"');
                                    html.push(
                                        ' style="width:'
                                        + o.width
                                        + 'px;'
                                        + 'min-width:'
                                        + o.width
                                        + 'px;'
                                        + 'max-width:'
                                        + o.width
                                        + 'px;"'
                                    );
                                    html.push(' class="');

                                    if (options.autoEllipsis) {
                                        html.push(type + '-cell-ellipsis ');
                                    }

                                    if (o.editable) {
                                        html.push(type + '-cell-editable ');
                                    }

                                    if (o.align) {
                                        html.push(type + '-cell-align-' + o.align + ' ');
                                    }

                                    html.push('"');

                                    o.editable && o.field && html.push(
                                        ' edit-field="' + o.field + '"'
                                    )
                                    && html.push(
                                        ' edit-type="' + o.editType + '"'
                                    ) && o.target && html.push(
                                        ' edit-target="' + o.target + '"'
                                    );

                                    o.align && html.push(
                                        ' align="' + o.align + '"'
                                    );

                                    html.push('>');

                                    if (o.editable) {
                                        html.push('<div class="' + type + '-cell-editor-container">');
                                        html.push('<span class="' + type + '-cell-editor-button"></span>');
                                    }

                                    var content = o.content || o.field;

                                    if (typeof content == 'function') {
                                        if (o.checkbox) {
                                            html.push('<input type="checkbox"');
                                            html.push(
                                                ' class="' + type + '-checkbox"'
                                            );
                                            html.push(
                                                ' data-rownum="' + i + '"'
                                            );
                                            html.push(' />');
                                        }
                                        else {
                                            var e = content.call(null, item, i);
                                            if (Object.prototype.toString.call(e) == '[object String]') {
                                                if (options.autoEllipsis) {
                                                    html.push(
                                                        '<div style="overflow:hidden; text-overflow:ellipsis;'
                                                        + 'width:' + o.width + 'px;'
                                                        + 'max-width:' + o.width + 'px;'
                                                        + 'min-width:' + o.width + 'px;'
                                                        + '" title="'
                                                        + e
                                                        + '">'
                                                        + e
                                                        + '</div>'
                                                    );
                                                }
                                                else if (o.maxlength
                                                    && e
                                                    && e.length > o.maxlength
                                                ) {
                                                    html.push('<span class="');
                                                    html.push(type + '-cell-limited"');
                                                    html.push(' title="' + e + '">');
                                                    html.push(encodeHTML(e.substring(0, o.maxlength)));
                                                    html.push('...');
                                                    html.push('</span>');
                                                }
                                                else if (o.editable) {
                                                    html.push('<div>' + e + '</div>');
                                                    html.push('</div>');
                                                }
                                                else {
                                                    html.push(e);
                                                }
                                            }
                                            else {
                                                var div = createDom();
                                                div.appendChild(e);
                                                html.push(div.innerHTML);
                                            }
                                        }

                                    }
                                    else {
                                        if (o.detail) {
                                            html.push(
                                                '<span style="margin-left:3px;margin-top:7px;float:right"'
                                                + ' ecui="type:tip;asyn:true;id:'
                                            );
                                            html.push('tip-' + item[o.idField] + '"');
                                            html.push('></span>');
                                        }

                                        if (o.checkbox) {
                                            html.push('<input type="checkbox"');
                                            html.push(
                                                ' class="' + type + '-checkbox"'
                                            );
                                            html.push(
                                                ' data-rownum="' + i + '"'
                                            );
                                            html.push(' />');
                                        }
                                        else if (o.score) {
                                            html.push('<span ecui="type:score; static:true; max:');
                                            html.push(
                                                o.max + '; value:' + item[content]
                                            );
                                            html.push('"></span>');
                                        }
                                        else {
                                            if (options.autoEllipsis) {
                                                html.push(
                                                    '<div style="overflow:hidden; text-overflow:ellipsis;'
                                                    + 'width:' + o.width + 'px;'
                                                    + 'max-width:' + o.width + 'px;'
                                                    + 'min-width:' + o.width + 'px;'
                                                    + '" title="'
                                                    + encodeHTML(item[content])
                                                    + '">'
                                                    + encodeHTML(item[content])
                                                    + '</div>'
                                                );
                                            }
                                            else if (o.maxlength
                                                && item[content]
                                                && item[content].length > o.maxlength
                                            ) {
                                                html.push('<span class="');
                                                html.push(type + '-cell-limited"');
                                                html.push(' title="' + encodeHTML(item[content]) + '">');
                                                html.push(encodeHTML(item[content].substring(0, o.maxlength)));
                                                html.push('...');
                                                html.push('</span>');
                                            }
                                            else if (o.editable) {
                                                item[content] = item[content] || '';
                                                html.push('<div>' + encodeHTML(item[content]) + '</div>');
                                                html.push('</div>');
                                            }
                                            else {
                                                item[content] = item[content] || '';
                                                html.push(encodeHTML(item[content]));
                                            }
                                        }
                                    }

                                    html.push('</td>');
                                }
                                html.push('</tr>');
                            }
                        }
                    }

                    html.push('</tbody></table>');

                    el.innerHTML = html.join('');

                    return el;
                },
                function (el, options) {
                    ecui.init(el);
                    if (options.fields && options.datasource) {
                        initEmbedControlEvent(options.fields, options.datasource);
                    }

                    this.$bindCheckbox();
                    return el;
                }
            ),
        UI_CUSTOM_TABLE_CLASS = UI_CUSTOM_TABLE.prototype,

        DELEGATE_EVENTS = ['click', 'mouseup', 'mousedown'],

    // 默认处理函数
        DEFAULT_EVENTS = {

            'click th.ui-table-hcell-sort': function (event, control) {
                var field = this.getAttribute('data-field'),
                    orderby;

                if (this.className.indexOf('-sort-desc') >= 0) {
                    orderby = 'asc';
                }
                else if (this.className.indexOf('-sort-asc') >= 0) {
                    orderby = 'desc'
                }
                else {
                    orderby = this.getAttribute('data-orderby') || 'desc';
                }

                triggerEvent(control, 'sort', null, [field, orderby]);
            },
            'click input.ui-table-checkbox-all': function (event, control) {
                control.$refreshCheckbox(this.checked);
            },
            'click input.ui-table-checkbox': function (event, control) {
                control.$refreshCheckbox();
            },
            'click span.ui-table-cell-editor-button': function (event, table) {
                var evt = event || window.event;
                var icon = baidu.event.getTarget(evt);
                var cellCon = baidu.dom.next(icon);
                var content = cellCon.innerHTML;
                var cellCon = baidu.dom.getParent(icon);
                var cell = baidu.dom.getParent(cellCon);

                var editField = baidu.dom.getAttr(cell, 'edit-field');
                var editType = baidu.dom.getAttr(cell, 'edit-type');


                var datasource = table._oOptions.datasource;
                var rows = table._aRows;
                var nowRow = ecui.findControl(cell).getParent();
                var rowIndex = baidu.array.indexOf(rows, nowRow);
                var rowData = datasource[rowIndex];

                var fieldCells = {};
                baidu.each(nowRow._aElements, function (ele) {
                    var o = baidu.dom.getAttr(ele, 'edit-field');
                    if (o) {
                        fieldCells[o] = ele;
                    }
                });

                table._sEditors = table._sEditors || [];

                /**
                 * 创建Editor
                 * @param  {[type]} editField [description]
                 * @return {[type]}           [description]
                 */
                function createEditor(editField) {
                    var editor = table._sEditors[editField];
                    var editTarget = baidu.dom.getAttr(fieldCells[editField], 'edit-target');
                    if (!editor) {
                        var editorCon = baidu.dom.create('div', {
                            'class': 'ui-table-editor'
                        });
                        document.body.appendChild(editorCon);
                        editor = $fastCreate(UI_TABLE_EDITOR, editorCon, table, {'type': editType, 'target': null});
                        table._sEditors[editField] = editor;

                        //创建的时候就创建事件
                        var editorHandles = table.editors[editField];
                        for (var handle in editorHandles) {
                            editor[handle] = editorHandles[handle];
                        }
                    }
                    editor.rowData = rowData;
                    //如果关联控件 创建关联控件
                    if (editTarget) {
                        var tarEditor = createEditor(editTarget);

                        editor.target = tarEditor;
                        editor.targetField = editTarget;

                        tarEditor.parTarget = editor;
                    }

                    return editor;
                }

                var editor = createEditor(editField);

                table._showEditors = [];
                function showControl(editor, editField) {

                    var cell = fieldCells[editField];

                    editor.show(children(cell)[0]);
                    editor.editCell = children(cellCon)[1];
                    editor.showCell = children(cell)[0];
                    table._showEditors.push(editor);
                    if (editor.target) {
                        showControl(editor.target, editor.targetField);
                    }
                }

                showControl(editor, editField);


            }
        };

    /**
     * 生成表头的一行
     *
     * @param {Array} headrow 一行表头的数据
     * @param {ecui.ui.CustomTable} con
     * @param {Array} opt_head 所有的表头数据
     * @return {string} html片段
     */
    function createHeadRow(headrow, con, opt_head) {
        var type = con.getTypes()[0];

        var html = [];
        html.push('<tr>');

        var flag = 0;
        var i = 0;
        for (i = 0; i < headrow.length; i++) {
            var o = headrow[i];
            html.push('<th ');
            html.push('data-field="');

            if (Object.prototype.toString.call(o.field) == '[object String]') {
                html.push(o.field);
            }

            if (o.width) {
                html.push(
                    '" style="width:' + o.width + 'px;'
                    + 'min-width:' + o.width + 'px;'
                    + 'max-width:' + o.width + 'px;'
                );
            }

            if (o.editable && o.field) {
                con.editors[o.field] = con.editors[o.field] || {};
            }

            if (o.rowspan) {
                html.push(
                    '" rowspan="' + o.rowspan
                );
            }
            if (o.colspan) {
                html.push(
                    '" colspan="' + o.colspan
                );

                var j;
                var width = 0;
                for (j = flag; j < flag + o.colspan; j++) {
                    width += opt_head[1][j].width;
                }

                html.push(
                    '" width="' + width
                );

                flag += o.colspan;
            }
            if (o.sortable) {
                html.push(
                    '" class="' + type + '-hcell-sort'
                );
                if (o.field && o.field == con._sSortby) {
                    html.push(
                        ' ' + type + '-hcell-sort-' + con._sOrderby
                    );
                }

                if (o.order) {
                    html.push(
                        '" data-orderby="' + o.order.toLowerCase()
                    );
                }
            }

            html.push('">');

            if (o.name) {
                html.push(o.name);
            }

            if (o.checkbox) {
                html.push(
                    '<input type="checkbox" class="'
                    + type + '-checkbox-all"'
                    + ' />'
                );
            }

            if (o.tip && o.tip.length) {
                html.push('<span ecui="type:tip; id:tip-');
                html.push(o.field);
                html.push('; message:');
                html.push(o.tip);
                html.push('"></span>');
            }

            html.push('</th>');
        }
        html.push('</tr>');

        return html.join('');
    }

    /**
     * 帮顶表格内部子控件的事件
     *
     * @param {Array} header 表头数据
     * @param {Array} datasource 表格数据
     */
    function initEmbedControlEvent(header, datasource) {
        var i = 0;
        for (i = 0; i < datasource.length; i++) {
            var item = datasource[i];
            for (var j = 0; j < header.length; j++) {
                var o = header[j];
                if (o.detail) {
                    var controlId = 'tip-' + item[o.idField];
                    if (ecui.get(controlId)) {
                        ecui.get(controlId).onloadData = (function (item, o) {
                            return function (handler) {
                                o.loadData(item, handler);
                            }
                        })(item, o);
                    }
                }
            }
        }
    }

    UI_CUSTOM_TABLE_CLASS.getData = function () {
        return this._aData;
    };

    /**
     * 重新生成表格
     * @public
     *
     * @param {Array} fields 表格的列配置
     * @param {Array} datasource 表格数据
     * @param {Object} sortinfo 排序信息
     * @param {Object} options 初始化选项
     * @param {string} errorMsg 表格为空或出错时展示的内容
     */
    UI_CUSTOM_TABLE_CLASS.render = function (fields, datasource, sortinfo, options, errorMsg) {
        var options = extend({}, options);
        options = extend(options, this._oOptions);
        options.leftLock = this._nLeftLock;
        options.rightLock = this._nRightLock;
        options.fields = fields;
        options.datasource = datasource || [];
        var sortinfo = sortinfo || {};
        options.sortby = sortinfo.sortby;
        options.orderby = sortinfo.orderby;
        options.errorMsg = errorMsg;

        if (!datasource.length) {
            options.leftLock = 0;
            options.rightLock = 0;
        }

        detachEvent(WINDOW, 'resize', repaint);

        if (!options.complex) {
            var key;

            //卸载行
            var rows;
            var i;
            rows = this._aHeadRows.concat(
                this._aRows,
                this._aLockedRow,
                this._aLockedHeadRow
            );

            var row;
            for (i = 0; row = rows[i]; i++) {
                var j;
                if (row._aElements) {
                    var cells = row.getCells();
                    for (j = 0; cell = cells[j]; j++) {
                        $disposeControl(cell);
                    }
                    $disposeControl(row, true);
                }
            }
        }

        for (i = 0; key = this._aHCells[i]; i++) {
            $disposeControl(key, true);
        }

        //卸载内部子控件
        for (key in this) {
            if (/_u\w+/.test(key)) {
                disposeControl(this[key]);
            }
        }

        var el = this.getOuter();
        el.innerHTML = '';
        this.$setBody(el);

        this.$resize();
        UI_CUSTOM_TABLE.client.call(this, el, options);
        this._bCreated = false;
        this.cache(true, true);
        //this.init();
        UI_LOCKED_TABLE_CLASS.init.call(this);

        //恢复
        attachEvent(WINDOW, 'resize', repaint);
        this.resize();
    };

    UI_CUSTOM_TABLE_CLASS.disposeUnit = function (callback) {
        detachEvent(WINDOW, 'resize', repaint);

        var key;

        //卸载行
        var rows;
        rows = this._aHeadRows.concat(
            this._aRows,
            this._aLockedRow,
            this._aLockedHeadRow
        );

        var i = 0;
        var timer = function () {
            var row = rows[i];
            if (row) {
                var j;
                if (row._aElements) {
                    var cells = row.getCells();
                    for (j = 0; cell = cells[j]; j++) {
                        $disposeControl(cell);
                    }
                    $disposeControl(row, true);
                }
                i++;
                setTimeout(timer, 0);
            }
            else {
                callback();
            }
        };
        timer();

        //恢复
        attachEvent(WINDOW, 'resize', repaint);
    };

    /**
     * 获取表格当前所有行单选框的引用
     * @private
     */
    UI_CUSTOM_TABLE_CLASS.$bindCheckbox = function () {
        var inputs = this.getBody().getElementsByTagName('input'),
            i, item, type = this.getTypes()[0];

        this._aCheckboxs = [];
        this._eCheckboxAll = null;

        for (i = 0; item = inputs[i]; i++) {
            if (item.type == 'checkbox'
                && item.className.indexOf(type + '-checkbox-all') >= 0
            ) {
                this._eCheckboxAll = item;
            }
            else if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox') >= 0) {
                this._aCheckboxs.push(item);
            }
        }
    };

    /**
     * 刷新表格的行单选框
     * @private
     *
     * @param {Boolean} checked 全选/全不选 如果忽略此参数则根据当前表格的实际选择情况来设置“全选”的勾选状态
     */
    UI_CUSTOM_TABLE_CLASS.$refreshCheckbox = function (checked) {
        var i, item, newChecked = true, tr;

        for (i = 0; item = this._aCheckboxs[i]; i++) {
            tr = item.parentNode.parentNode;
            if (checked !== undefined) {
                item.checked = checked;
            }
            else {
                newChecked = item.checked && newChecked;
            }

            if (item.checked && this._bCheckedHighlight) {
                tr.className += ' highlight';
            }
            else if (this._bCheckedHighlight) {
                tr.className = tr.className.replace(/\s+highlight/g, '');
            }
        }

        if (this._eCheckboxAll) {
            this._eCheckboxAll.checked = checked !== undefined ? checked : newChecked;
        }

        triggerEvent(this, 'checkboxChange');
    };

    /**
     * table生产完毕以后执行，触发sizechange事件
     *
     */
    UI_CUSTOM_TABLE_CLASS.$ready = function () {
        triggerEvent(this, 'sizechange');
    };


    /**
     * 浏览器resize时调整横滚的位置
     *
     * @override
     */
    UI_CUSTOM_TABLE_CLASS.$resize = function () {
        var me = this;
        UI_LOCKED_TABLE_CLASS.$resize.call(this);
        setTimeout(
            function () {
                triggerEvent(me, 'sizechange');
                me.$pagescroll();
            },
            100
        );
    };

    /**
     * 页面滚动时保持表头和横滚浮在视窗上
     *
     * @override
     */
    UI_CUSTOM_TABLE_CLASS.$pagescroll = function () {
        UI_LOCKED_TABLE_CLASS.$pagescroll.call(this);

        if (this._uHScrollbar) {
            setFloatHScroll(this);
        }
    };

    UI_CUSTOM_TABLE_CLASS.getSelection = function () {
        if (!this._aCheckboxs || !this._aCheckboxs.length) {
            return [];
        }

        var res = [];

        for (var i = 0, o; o = this._aCheckboxs[i++];) {
            if (o.checked) {
                var index = getAttribute(o, 'data-rownum') - 0;
                res.push(extend({}, this._aData[index]));
            }
        }
        return res;
    };

    /**
     * 根据行号选中行,行号从零开始
     *
     * @public
     * @param {Array} selection
     */
    UI_CUSTOM_TABLE_CLASS.setSelection = function (selection) {
        var selection = selection || [];
        for (var i = 0, len = this._aCheckboxs.length; i < len; i++) {
            if (array.indexOf(selection, i) >= 0) {
                this._aCheckboxs[i].checked = true;
            }
            else {
                this._aCheckboxs[i].checked = false;
            }
        }
        this.$refreshCheckbox();
    };

    /**
     * @override
     */
    UI_CUSTOM_TABLE_CLASS.init = function () {
        var i, item, ele = this.getOuter(),
            control = this;

        UI_LOCKED_TABLE_CLASS.init.call(this);

        // 添加控件全局的事件监听
        // 只支持click mousedown mouseup
        for (i = 0; item = DELEGATE_EVENTS[i]; i++) {
            attachEvent(ele, item, (function (name) {
                return function (event) {
                    var e = event || window.event;
                    e.targetElement = e.target || e.srcElement;
                    control.$fireEventHandler(name, e);
                }
            })(item));
        }
    };

    /**
     * 触发表格events中定义的事件
     * @private
     *
     * @param {String} eventType 事件类型
     * @param {Event} nativeEvent 原生事件参数
     */
    UI_CUSTOM_TABLE_CLASS.$fireEventHandler = function (eventType, nativeEvent) {
        var events = getHandlerByType(this.events, eventType),
            i, item, target = nativeEvent.targetElement, selector;

        for (i = 0; item = events[i]; i++) {
            if (checkElementBySelector(target, item.selector)) {
                item.handler.call(target, nativeEvent, this);
            }
        }
    }

    UI_CUSTOM_TABLE_CLASS.$refresh = function (el, options) {
        var cells = [],
            rows = [];

        addClass(el, this.getTypes()[0]);

        cells = this._aHCells;
        rows = this._aRows.concat(this._aHeadRows, this._aLockedRow, this._aLockedHeadRow);

        for (var i = 0, o; o = cells[i++];) {
            disposeControl(o);
        }

        for (var i = 0, o; o = rows[i++];) {
            disposeControl(o);
        }

        //释放原表格中的部分引用
        //this._eCheckboxAll && delete this._eCheckboxAll;
        //this._aCheckboxs && delete this._aCheckboxs;

        UI_LOCKED_TABLE_CLASS.$refresh.call(this, el, options);

    };

    /**
     * 让表格的横滚始终悬浮在页面视窗低端
     *
     * @param {ecui.ui.CustomTable} con
     */
    function setFloatHScroll(con) {
        var el;

        el = con._eBrowser ? con._eBrowser : con._uHScrollbar.getOuter();
        el.style.top = MIN(
                getView().bottom - getPosition(con.getOuter()).top - el.offsetHeight,
                con.getHeight() - el.offsetHeight
            ) + 'px';

        setStyle(el, 'zIndex', 1);
    }

    function getHandlerByType(events, type) {
        var handlers = [], item;

        events = extend({}, events);
        events = extend(events, DEFAULT_EVENTS);

        for (var key in events) {
            item = {handler: events[key]};
            key = key.split(/\s+/);
            if (key[0] == type) {
                item.selector = key[1];
                handlers.push(item);
            }
        }

        return handlers;
    }

    function checkElementBySelector(ele, selector) {
        var tagName, value, type, res = true;

        if (!ele && !selector) {
            return false;
        }

        selector.replace(/^([^.#]*)([.#]?)(.*)$/, function ($0, $1, $2, $3) {
            tagName = $1;
            type = $2;
            value = $3;
        });

        if (tagName && ele.tagName.toLowerCase() != tagName) {
            res = false;
        }

        if (type == '.' && !new RegExp('(^|\\s+)' + value + '(\\s+|$)').test(ele.className)) {
            res = false;
        }

        if (type == '#' && ele.id != value) {
            res = false;
        }

        return res;
    }

    function copyArray(data) {
        var res = [];
        for (var i = 0, o; o = data[i++];) {
            res.push(extend({}, o));
        }
        return res;
    }

})();

/**
 * @author hades(denghongqi@baidu.com)
 * 表格读取第一行宽度值
 */
(function () {
    var core = ecui;
    var ui = core.ui;
    var util = core.util;
    var dom = core.dom;
    var children = dom.children;
    var blank = util.blank;
    var string = core.string;
    var array = core.array;
    var addClass = dom.addClass;
    var removeClass = dom.removeClass;
    var $fastCreate = core.$fastCreate;
    var drag = core.drag;
    var getActived = core.getActived;
    var getMouseX = core.getMouseX;
    var getMouseY = core.getMouseY;

    var UI_CONTROL = ui.Control;
    var UI_CONTROL_CLASS = UI_CONTROL.prototype;
    var UI_PANEL = ui.Panel;
    var UI_PANEL_CLASS = UI_PANEL.prototype;
    var UI_BUTTON = ui.Button;
    var UI_BUTTON_CLASS = UI_BUTTON.prototype;

    var DOCUMENT = document;
    var WINDOW = window;
    var USER_AGENT = navigator.userAgent;
    var ieVersion = /msie (\d+\.\d)/i.test(USER_AGENT)
        ? DOCUMENT.documentMode || (RegExp.$1 - 0) : undefined;
    var chromeVersion = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent)
        ? +RegExp['\x241'] : undefined;

    ui.FixedTable = core.inherits(
        UI_CONTROL,
        'ui-fixed-table',
        function (el, options) {
            if (!dom.children(el).length) {
                this._bNoTable = true;
                return;
            }
            else {
                this._bNoTable = false;
            }
            _createWidthControlRow.call(this, el, options);
            this._nLeft = options.leftLock = options.leftLock || 0;
            this._nRight = options.rightLock = options.rightLock || 0;
            this._bFollowHead = options.followHead !== false;
            this._bFollowScroll = options.followScroll !== false;
            this._bNowrap = options.wrap !== true;
            this._bCheckedHighlight = options.checkedHighlight !== false;
            _createTwoTable.call(this, el, options);

            var o = dom.create();
            el.appendChild(o);
            this._uScroll = core.$fastCreate(this.Scroll, o, this, {});
        },
        function (el, options) {
            if (this._bNoTable) {
                return;
            }
            _setLockedSize.call(this, el, options);
            var me = this;
            setTimeout(
                function () {
                    var callbacks = me._aCallback || [];
                    while (callbacks.length) {
                        var o = callbacks.shift();
                        var e = o.func.call(null, o.item, o.index);
                        if (!e.nodeName) {
                            o.cell.innerHTML = e;
                        }
                        else {
                            o.cell.innerHTML = '';
                            o.cell.appendChild(e);
                        }
                    }

                    setTimeout(
                        function () {
                            ecui.init(el);
                            core.triggerEvent(me, 'renderFinish');
                            if (ieVersion === 7) {
                                me.$setSize();
                            }
                        },
                        10
                    )
                },
                50
            );
            this._bindCheckbox();
            this.setSelection(options.value);
        }
    );
    var UI_FIXED_TABLE = ui.FixedTable;
    var UI_FIXED_TABLE_CLASS = UI_FIXED_TABLE.prototype;

    var DELEGATE_EVENTS = ['click', 'mouseup', 'mousedown'];
    var DEFAULT_EVENTS = {
        'click th.ui-fixed-table-hcell-sort': function (event, control) {
            var field = this.getAttribute('data-field');
            var orderby;
            if (this.className.indexOf('-sort-desc') >= 0) {
                orderby = 'asc';
            }
            else if (this.className.indexOf('-sort-asc') >= 0) {
                orderby = 'desc'
            }
            else {
                orderby = this.getAttribute('data-orderby') || 'desc';
            }
            core.triggerEvent(control, 'sort', null, [field, orderby]);
        },
        'click span.ui-fixed-table-hcell-sort-icon': function (event, control) {
            var parentEl = this.parentElement || this.parentNode;
            var field = parentEl.getAttribute('data-field');
            var orderby;
            if (parentEl.className.indexOf('-sort-desc') >= 0) {
                orderby = 'asc';
            }
            else if (parentEl.className.indexOf('-sort-asc') >= 0) {
                orderby = 'desc'
            }
            else {
                orderby = parentEl.getAttribute('data-orderby') || 'desc';
            }
            core.triggerEvent(control, 'sort', null, [field, orderby]);
        },
        'click span.ui-fixed-table-checkbox-all': function (event, control) {
            if (this.children[0].checked) {
                this.children[0].checked = false;
                removeClass(this, 'ui-fixed-table-checkbox-all-checked');
            } else {
                this.children[0].checked = true;
                addClass(this, 'ui-fixed-table-checkbox-all-checked');
            }
            control._uCheckboxAll = this.children[0];
            control._refreshCheckbox(this.children[0].checked);
        },
        'click span.ui-fixed-table-checkbox': function (event, control) {
            if (this.children[0].checked) {
                this.children[0].checked = false;
                removeClass(this, 'ui-fixed-table-checkbox-checked');
            } else {
                this.children[0].checked = true;
                addClass(this, 'ui-fixed-table-checkbox-checked');
            }
            control._refreshCheckbox();
        }
    };

    /**
     * 根据header和datasource生成dom元素
     * 表头只支持跨两行
     *
     * @private
     */
    function _createDom(el, options, callback) {
        var table = dom.create('', '', 'table');
        var thead = dom.create('', '', 'thead');
        var tbody = dom.create('', '', 'tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        el.appendChild(table);
        this._aFields = _createHeadDom.call(this, thead, options);
        _createBodyDom.call(this, tbody, options, callback);
    }

    /**
     * 生成表头元素和fields
     *
     * @private
     * @param {HTML element} thead
     * @param {Object} options
     * @return {Array}
     */
    function _createHeadDom(thead, options) {
        var type = this.getType();
        options.fields = options.fields || [];
        var head;
        var fields = [];
        if (Object.prototype.toString.call(options.fields[0]) == '[object Object]') {
            head = [];
            head.push(options.fields);
        }
        else {
            head = options.fields;
        }
        for (var i = 0; i < head.length; i++) {
            var row = head[i];
            var tr = dom.create('', '', 'tr');
            thead.appendChild(tr);
            for (var j = 0; j < row.length; j++) {
                var o = row[j];
                var th = dom.create('', '', 'th');
                if (parseInt(o.rowspan, 10) >= 2 || i == 1) {
                    fields.push(o);
                }
                else {
                    var colspan = parseInt(o.colspan, 10);
                    colspan = isNaN(colspan) ? 1 : colspan;
                    fields.push(colspan);
                }
                if (parseInt(o.rowspan, 10) >= 2) {
                    th.setAttribute('rowSpan', o.rowspan);
                }
                if (parseInt(o.colspan, 10) >= 2) {
                    th.setAttribute('colSpan', o.colspan);
                }
                if (o.width) {
                    dom.setStyle(th, 'width', o.width + 'px');
                }
                if (o.field) {
                    th.setAttribute('data-field', o.field);
                }
                if (o.sortable) {
                    dom.addClass(th, type + '-hcell-sort');
                }
                if (o.field && o.field == options.sortby) {
                    dom.addClass(th, type + '-hcell-sort-' + options.orderby.toLowerCase());
                }
                if (o.order) {
                    th.setAttribute('data-orderby', o.order.toLowerCase());
                }

                if (o.checkbox) {
                    dom.setStyle(th, 'width', '16px');
                    th.innerHTML = '<span class="' + type + '-checkbox-all"><input type="checkbox" style="display:none;"'
                        + ' /></span>';
                    // th.innerHTML = '<span ecui="type:checkbox;id:s1"'
                    //     + '></span>';
                    // var _uCheckboxAll = ecui.init(th);
                }
                else {
                    th.innerHTML = o.name;
                }
                if (o.tip && o.tip.length) {
                    var tipEl = dom.create('', 'margin-left:3px;', 'span');
                    tipEl.setAttribute(
                        'ecui',
                        'type:tip;message:' + string.encodeHTML(o.tip)
                    );
                    th.appendChild(tipEl);
                    ecui.init(th);
                }
                if (o.sortable || o.order || (o.field && o.field == options.sortby)) {
                    var sortEl = dom.create(type + '-hcell-sort-icon', 'margin-left:3px;', 'span');
                    th.appendChild(sortEl);
                }
                tr.appendChild(th);
            }
        }
        var fieldsRes = [];
        for (var i = fields.length - 1; i >= 0; i--) {
            var field = fields[i];
            if (typeof field == 'object') {
                fieldsRes.unshift(field);
            }
            else if (typeof field == 'number') {
                for (var j = 0; j < field; j++) {
                    fieldsRes.unshift(fieldsRes.pop());
                }
            }
        }
        if (Object.prototype.toString.call(options.fields[0]) == '[object Object]') {
            fieldsRes = options.fields;
        }

        if (fieldsRes.length == options.leftLock + options.rightLock) {
            options.leftLock = options.rightLock = 0;
        }
        return fieldsRes;
    }

    /**
     * 生成tbody的dom结构
     *
     * @private
     * @param {HTML element} tbody
     * @param {Object} options
     * @param {Array} fields
     */
    function _createBodyDom(tbody, options, callback) {
        this._aCallback = [];
        this._uCheckbox = [];
        var type = this.getType();
        var datasource = options.datasource || [];
        var fields = this._aFields;
        var len = datasource.length;
        var begin = 0;
        var me = this;
        timer();
        function timer() {
            var end = begin + 20;
            var end = len < end ? len : end;
            for (var i = begin; i < end; i++) {
                var tr = dom.create('', '', 'tr');
                var item = datasource[i];
                for (var j = 0; j < fields.length; j++) {
                    var o = fields[j];
                    var td = dom.create('', '', 'td');
                    if (o.align) {
                        td.setAttribute('align', o.align);
                    }
                    if (item.bgcolor) {
                        dom.setStyle(td, 'backgroundColor', item.bgcolor);
                    }
                    if (o.checkbox) {
                        // td.innerHTML = '<input type="checkbox"'
                        //     + ' data-rownum="' + i + '"'
                        //     + ' class="' + type + '-checkbox"'
                        //     + ' />';
                        td.innerHTML = '<span'
                            + ' data-rownum="' + i + '"'
                            + ' class="' + type + '-checkbox"'
                            + ' ><input class="' + type + '-checkbox" type="checkbox" style="display:none;" data-rownum="' + i + '" /></span>';
                    }
                    else if (o.content && typeof o.content == 'function') {
                        me._aCallback.push({
                            cell: td,
                            func: o.content,
                            item: item,
                            index: i
                        });
                        td.innerHTML = '-';
                    }
                    /**
                     * add by jiangwei
                     * 添加渲染回调函数。
                     */
                    else if (o.render && typeof o.render == 'function') {
                        td.innerHTML = o.render(o, item);
                    }
                    else {
                        td.innerHTML = '<span>' + string.encodeHTML(item[o.field]) + '</span>';
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            begin = end;
            if (end < len) {
                setTimeout(timer, 10);
            }
            else {
                callback.call(me);
            }
        }
    }

    /**
     * 如果表格的首行有colspan，计算宽度会出现问题，需要做特殊处理
     * 暂时只解决表头跨两行的问题
     * todo:解决表头跨多行的问题
     *
     * @private
     */
    function _createWidthControlRow(el, options) {
        var thead = el.getElementsByTagName('thead')[0];
        var headRows = dom.children(thead);

        var widthControlRow = dom.create('', '', 'tr');
        var cells = dom.children(headRows[0]);
        this._bDoubleHead = headRows.length == 2 ? true : false;
        var cursor = 0;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var colspan = parseInt(dom.getAttribute(cell, 'colSpan'), 10);
            var rowspan = parseInt(dom.getAttribute(cell, 'rowSpan'), 10);

            colspan = isNaN(colspan) ? 1 : colspan;
            rowspan = isNaN(rowspan) ? 1 : rowspan;

            if (colspan >= 2) {
                for (var j = 0; j < colspan; j++) {
                    var cloneCell = dom.create('', 'border-bottom:none;', 'th');
                    var secondRowCells = dom.children(headRows[1]);
                    dom.setStyle(
                        cloneCell, 'width', secondRowCells[cursor].style.width
                    );
                    cursor++;
                    widthControlRow.appendChild(cloneCell);
                }
            }
            else if (this._bDoubleHead && rowspan == 1) {
                var cloneCell = dom.create('', 'border-bottom:none;', 'th');
                var secondRowCells = dom.children(headRows[1]);
                dom.setStyle(
                    cloneCell, 'width', secondRowCells[cursor].style.width
                );
                cursor++;
                widthControlRow.appendChild(cloneCell);
            }
            else {
                var cloneCell = dom.create('', 'border-bottom:none;', 'th');
                dom.setStyle(cloneCell, 'width', cell.style.width);
                widthControlRow.appendChild(cloneCell);

                if (rowspan <= 1) {
                    cursor++;
                }
            }
        }

        dom.insertBefore(widthControlRow, headRows[0]);
    }

    UI_FIXED_TABLE_CLASS._scroll = function (scrollLeft) {
        var headTable = dom.children(this._uHead._eInner)[0];
        var bodyTable = dom.children(this._uBody._eInner)[0];
        headTable.style.marginLeft = (0 - scrollLeft) + 'px';
        bodyTable.style.marginLeft = (0 - scrollLeft) + 'px';
    };

    /**
     * 页面滚动的时候执行,处理表头跟随和滚动条的浮动
     *
     * @override
     */
    function pagescroll() {
        if (!this._bFollowHead && !this._bFollowScroll) {
            //当这两个属性都是false的时候，也应该设置滚动条为绝对定位，不然会飘在表格头部。
            if (this._uScroll) {
                dom.setStyle(this._uScroll.getOuter(), 'position', 'absolute');
                dom.setStyle(this._uScroll.getOuter(), 'bottom', 0);
            }
            return;
        }
        if (!this._uHead) {
            return;
        }
        var headEl = this._uHead.getOuter();
        var el = this.getOuter();
        var view = util.getView();
        var pos = dom.getPosition(el);
        if (pos.top < view.top) {
            dom.setStyle(headEl, 'position', 'fixed');
            dom.setStyle(headEl, 'left', pos.left + 'px');
        }
        else {
            dom.setStyle(headEl, 'position', 'absolute');
            dom.setStyle(headEl, 'left', 0);
        }
        if (!this._uScroll.isShow()) {
            return;
        }
        var scrollEl = this._uScroll.getOuter();
        if (pos.top + this.getHeight() - 15 > view.bottom) {
            dom.setStyle(scrollEl, 'position', 'fixed');
            dom.setStyle(scrollEl, 'bottom', 0);
        }
        else {
            dom.setStyle(scrollEl, 'position', 'absolute');
            dom.setStyle(scrollEl, 'bottom', 0);
        }
    };

    UI_FIXED_TABLE_CLASS.$pagescroll = pagescroll;

    /**
     * 将原先表格的head和body分别拆分到两个table中
     *
     * @private
     * @param {HTML element} el
     * @param {Object} options
     */
    function _createTwoTable(el, options) {
        var type = this.getTypes()[0];
        var bodyTable = dom.first(el);
        var headTable = dom.create('', '', 'table');
        headTable.appendChild(dom.create('', '', 'thead'));
        headTable.appendChild(dom.create('', '', 'tbody'));
        dom.moveElements(dom.first(bodyTable), dom.first(headTable), true);

        var bodyTableWrap = dom.create();
        var headTableWrap = dom.create();
        bodyTableWrap.appendChild(bodyTable);
        headTableWrap.appendChild(headTable);
        el.appendChild(bodyTableWrap);
        el.appendChild(headTableWrap);

        this._uHead = core.$fastCreate(this.Head, dom.last(el), this, options);
        this._uBody = core.$fastCreate(this.Body, dom.first(el), this, options);
    }

    /**
     * 初始化设定锁定的部分的宽度
     *
     * @private
     */
    function _setLockedSize(el, options) {
        var initFieldsWidth = this._uHead.getInitFieldsWidth();
        var headRows = this._uHead.getRows();
        var bodyRows = this._uBody.getRows();
        var rows = headRows.concat(bodyRows);
        var top = 0;
        if (ieVersion === 7) {
            top = 1;
        }
        // rows = headRows.concat(bodyRows); 表头和表身的横向锁定
        for (var i = 0, len = rows.length; i < len; i++) {
            var cells = rows[i].getCells();
            var left = 0;
            var right = 0;
            // 左边锁定，位置的计算与赋值
            for (var j = 0; j < this._nLeft; j++) {
                var cell = cells[j];
                // 表头计算
                if (this._bDoubleHead && i == 1) {
                    dom.setStyle(cell, 'height', '69px');
                    dom.setStyle(cell, 'lineHeight', '69px');
                }
                if (this._bDoubleHead && i == 2) {
                    continue;
                }
                // 表身计算
                if (cell.childNodes.length > 0 && cell.childNodes[0].nodeType !=3 && cell.childNodes[0].innerHTML.indexOf('123456789') != -1) {debugger;}
                dom.setStyle(cell, 'position', 'absolute');
                dom.setStyle(cell, 'top', top + 'px');
                dom.setStyle(cell, 'left', left + 'px');
                left += initFieldsWidth[j];
            }
            // 右边锁定，位置的计算与赋值
            for (var j = 0; j < this._nRight; j++) {
                var cell = cells[cells.length - j - 1];
                // 表头计算
                if (this._bDoubleHead && i == 1) {
                    dom.setStyle(cell, 'height', '69px');
                    dom.setStyle(cell, 'lineHeight', '69px');
                }
                if (this._bDoubleHead && i == 2) {
                    continue;
                }
                // 表身计算
                dom.setStyle(cell, 'position', 'absolute');
                dom.setStyle(cell, 'top', top + 'px');
                dom.setStyle(cell, 'right', right + 'px');
                right += initFieldsWidth[initFieldsWidth.length - j - 1];
            }

            if (i < headRows.length - 1) {
                top += cells[0].offsetHeight;
            }
            else if (i == headRows.length - 1) {
                top = 0;
            }
            else {
                top += 30;
            }
        }

        this._nLeftLockedWidth = 0;
        this._nRightLockedWidth = 0;

        for (var i = 0; i < this._nLeft; i++) {
            this._nLeftLockedWidth += initFieldsWidth[i];
        }
        var len = initFieldsWidth.length;
        for (var i = 0; i < this._nRight; i++) {
            this._nRightLockedWidth += initFieldsWidth[len - i - 1];
        }

        dom.setStyle(
            this._uHead._eInner, 'marginLeft', this._nLeftLockedWidth + 'px'
        );
        dom.setStyle(
            this._uHead._eInner, 'marginRight', this._nRightLockedWidth + 'px'
        );
        dom.setStyle(
            this._uBody._eInner, 'marginLeft', this._nLeftLockedWidth + 'px'
        );
        dom.setStyle(
            this._uBody._eInner, 'marginRight', this._nRightLockedWidth + 'px'
        );

        dom.setStyle(
            this._uScroll.getOuter(), 'marginLeft', this._nLeftLockedWidth + 'px'
        );
        dom.setStyle(
            this._uScroll.getOuter(), 'marginRight', this._nRightLockedWidth + 'px'
        );

        if (!ieVersion && this._bDoubleHead && (this._nLeft || this._nRight)) {
            var cells = rows[2].getCells();
            dom.insertBefore(dom.create('', '', 'th'), cells[0]);
            // this.$resize();
        }
    };

    /**
     * $setSize
     *
     * @override
     */
    UI_FIXED_TABLE_CLASS.$setSize = function () {
        if (this._bNoTable) {
            return;
        }
        if (ieVersion < 8) {
            this.$pagescroll = util.blank;
        }
        var el = this.getOuter();
        var headEl = this._uHead.getOuter();
        var scrollEl = this._uScroll.getOuter();
        dom.setStyle(headEl, 'position', 'absolute');
        dom.setStyle(headEl, 'left', 0);
        dom.setStyle(scrollEl, 'position', 'static');

        //dom.setStyle(el, 'width', (this._uHead.$$width || this.$$width) + 'px');

        this._uHead._autoResize();
        this._nContentWidth = this._uHead.getContentWidth();
        var paddingTop = this._uHead.getHeight() - 1;
        if (chromeVersion) {
            paddingTop += 1;
        }

        dom.setStyle(el, 'paddingTop', (paddingTop || 36) + 'px');
        var widthControlCells = this.getWidthControlCells();
        var fieldsWidth = [];
        for (var i = 0; i < widthControlCells.length; i++) {
            var cell = widthControlCells[i];
            fieldsWidth.push(cell.getBodyWidth());
        }
        this._uHead._setSize(fieldsWidth);
        this._uBody._setSize(fieldsWidth);

        this._uScroll._setSize(this._nContentWidth);

        this._uScroll._scroll();
        if (ieVersion < 8) {
            this.$pagescroll = pagescroll;
        }
        core.triggerEvent(this, 'pagescroll');
    };

    UI_FIXED_TABLE_CLASS.getWidthControlCells = function () {
        return this._uHead.getWidthControlCells();
    };

    /**
     * 获取各列的初始宽度
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_CLASS.getInitFieldsWidth = function () {
        return this._uHead.getInitFieldsWidth();
    };

    /**
     * 根据数据绘制表格
     *
     * @public
     * @param {Object} options
     */
    UI_FIXED_TABLE_CLASS.render = function (options) {
        util.detachEvent(WINDOW, 'resize', core.repaint);
        if (this._uHead) {
            var rows = this._uHead.getRows();
            for (var i = 0; i < rows.length; i++) {
                var cellControls = rows[i].getCellControls();
                for (var j = 0; j < cellControls.length; j++) {
                    core.$dispose(cellControls[j], true);
                }
                core.$dispose(rows[i], true);
            }
        }
        if (this._uBody) {
            var rows = this._uBody.getRows();
            for (var i = 0; i < rows.length; i++) {
                core.$dispose(rows[i]);
            }
        }
        var el = this.getOuter();
        el.innerHTML = '';
        this.$resize();
        if (options.fields) {
            this._aData = options.datasource || [];
            _createDom.call(this, el, options, domReadyCallback);
        }
        function domReadyCallback() { window.jackLine = 21445;
            UI_FIXED_TABLE.client.call(this, el, options);
            this._bCreated = false;
            this.cache(true, true);
            //this.init();
            UI_CONTROL_CLASS.init.call(this);
            this._bCreated = true;
            util.attachEvent(WINDOW, 'resize', core.repaint);
            // this.cache(true, true);
            //this.resize();
            // if (ieVersion === 7) {
            //     this.resize();
            // }
        }
    };

    /**
     * 获取表格数据
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_CLASS.getData = function () {
        return this._aData || [];
    };

    /**
     * 获取表格中被checkbox勾选中的数据
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_CLASS.getSelection = function () {
        if (!this._aCheckboxs || !this._aCheckboxs.length) {
            return [];
        }

        var res = [];
        for (var i = 0, o; o = this._aCheckboxs[i++];) {
            if (o.checked) {
                var index = dom.getAttribute(o, 'data-rownum') - 0;
                res.push(util.extend({}, this._aData[index]));
            }
        }
        return res;
    };

    /**
     * 根据行号选中行，行号从零开始
     *
     * @public
     * @param {Array} selection
     */
    UI_FIXED_TABLE_CLASS.setSelection = function (selection) {
        var selection = selection.toString().split(',') || [];
        if (selection.length == 0) return;
        for (var i = 0, len = this._aCheckboxs.length; i < len; i++) {
            //if (array.indexOf(selection, i) >= 0) {
            var index = dom.getAttribute(this._aCheckboxs[i], 'data-rownum') - 0;
            if (array.indexOf(selection, this._aData[index].id) >= 0) {
                this._aCheckboxs[i].checked = true;
            } else {
                this._aCheckboxs[i].checked = false;
            }
        }
        this._refreshCheckbox();
    };

    /**
     * @override
     */
    UI_FIXED_TABLE_CLASS.init = function () {
        var el = this.getOuter();
        var control = this;

        UI_CONTROL_CLASS.init.call(this);

        // 添加控件全局的事件监听
        // 只支持click mousedown mouseup        
        var item;
        for (var i = 0; item = DELEGATE_EVENTS[i]; i++) {
            util.attachEvent(el, item, (function (name) {
                return function (event) {
                    var e = event || window.event;
                    e.targetElement = e.target || e.srcElement;
                    control._fireEventHandler(name, e);
                }
            })(item));
        }
    };

    /**
     * 表格渲染完成之后执行
     *
     * @override
     */
    UI_FIXED_TABLE_CLASS.$ready = function () {
        this.isReady = true;
        // core.triggerEvent(this, 'pagescroll');
        // core.triggerEvent(this, 'select');
    };

    /**
     * 触发表格events中定义的事件
     * @private
     *
     * @param {String} eventType 事件类型
     * @param {Event} nativeEvent 原生事件参数
     */
    UI_FIXED_TABLE_CLASS._fireEventHandler = function (eventType, nativeEvent) {
        var events = getHandlerByType(this.events, eventType);
        var target = nativeEvent.targetElement;

        var item;
        for (var i = 0; item = events[i]; i++) {
            if (checkElementBySelector(target, item.selector)) {
                item.handler.call(target, nativeEvent, this);
            }
        }
    };

    /**
     * 获取表格当前所有行单选框的引用
     * @private
     */
    UI_FIXED_TABLE_CLASS._bindCheckbox = function () {
        var inputs = this.getBody().getElementsByTagName('input');
        var type = this.getTypes()[0];

        this._aCheckboxs = [];
        this._aCheckboxs = this._uCheckbox;
        this._eCheckboxAll = null;

        var item;
        for (var i = 0; item = inputs[i]; i++) {
            if (item.type == 'checkbox'
                && item.className.indexOf(type + '-checkbox-all') >= 0
            ) {
                this._eCheckboxAll = item;
            }
            else if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox') >= 0) {
                this._aCheckboxs.push(item);
            }
        }
    };

    /**
     * 刷新表格的行单选框
     * @private
     *
     * @param {Boolean} checked 全选/全不选 如果忽略此参数则根据当前表格的实际选择情况来设置“全选”的勾选状态
     */
    UI_FIXED_TABLE_CLASS._refreshCheckbox = function (checked) {
        var newChecked = true;
        var item;
        var tr;
        var checkbox;
        var type = this.getType();
        for (var i = 0; item = this._aCheckboxs[i]; i++) {
            tr = item.parentNode.parentNode.parentNode;
            checkbox = item.parentNode;
            if (checked !== undefined) {
                item.checked = checked;
            }
            else {
                newChecked = item.checked && newChecked;
            }

            if (item.checked && this._bCheckedHighlight) {
                dom.addClass(tr, 'ui-fixed-table-row-highlight');
                dom.addClass(checkbox, 'ui-fixed-table-checkbox-checked');
            }
            else if (this._bCheckedHighlight) {
                dom.removeClass(tr, 'ui-fixed-table-row-highlight');
                dom.removeClass(checkbox, 'ui-fixed-table-checkbox-checked');
            }
        }

        if (this._eCheckboxAll) {
            this._eCheckboxAll.checked = checked !== undefined ? checked : newChecked;
        }

        core.triggerEvent(this, 'select');
    };

    function getHandlerByType(events, type) {
        var handlers = [], item;

        events = util.extend({}, events);
        events = util.extend(events, DEFAULT_EVENTS);

        for (var key in events) {
            item = {handler: events[key]};
            key = key.split(/\s+/);
            if (key[0] == type) {
                item.selector = key[1];
                handlers.push(item);
            }
        }

        return handlers;
    }

    function checkElementBySelector(ele, selector) {
        var tagName, value, type, res = true;

        if (!ele && !selector) {
            return false;
        }

        selector.replace(/^([^.#]*)([.#]?)(.*)$/, function ($0, $1, $2, $3) {
            tagName = $1;
            type = $2;
            value = $3;
        });

        if (tagName && ele.tagName.toLowerCase() != tagName) {
            res = false;
        }

        if (type == '.' && !new RegExp('(^|\\s+)' + value + '(\\s+|$)').test(ele.className)) {
            res = false;
        }

        if (type == '#' && ele.id != value) {
            res = false;
        }

        return res;
    }

    UI_FIXED_TABLE_CLASS.Head = core.inherits(
        UI_CONTROL,
        'ui-fixed-table',
        function (el, options) {
            var type = this.getType();
            dom.addClass(el, type + '-head');
            dom.setStyle(el, 'position', 'absolute');
            dom.setStyle(el, 'top', 0);
            dom.setStyle(el, 'left', 0);
            preprocess.call(this, el, options);
            var rows = el.getElementsByTagName('tr');
            this._aRows = [];
            options.createCellControl = true;
            for (var i = 0; i < rows.length; i++) {
                this._aRows.push(core.$fastCreate(
                    UI_FIXED_TABLE_CLASS.Row, rows[i], this, options
                ));
            }
        },
        function (el, options) {
            var firstHeadRow = el.getElementsByTagName('tr')[0];
            var tempCell = dom.create('', '', 'th');
            firstHeadRow.appendChild(tempCell);
            this._aInitFieldsWidth = [];
            var widthControlCells = this.getWidthControlCells();
            for (var i = 0; i < widthControlCells.length; i++) {
                var cell = widthControlCells[i];
                cell.resize();
                this._aInitFieldsWidth.push(cell.getWidth());
            }
            firstHeadRow.removeChild(tempCell);
            this._setSize();
            //dom.setStyle(dom.children(this._eMiddle)[0], 'width', '100%');
        }
    );
    var UI_FIXED_TABLE_HEAD_CLASS = UI_FIXED_TABLE_CLASS.Head.prototype;

    UI_FIXED_TABLE_HEAD_CLASS._setSize = function (fieldsWidth) {
        this.resize();
        // this._autoResize();
        // var par = this.getParent();
        // var parEl = par.getOuter();
        // var paddingTop = this.getHeight() - 1;
        // if (chromeVersion) {
        //     paddingTop += 1;
        // }
        // dom.setStyle(parEl, 'paddingTop', paddingTop + 'px');

        // 在拖动滚动条的时候在左边固定的地方加一条右边线
        var rows = this.getRows();
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            var cells = row.getCells();
            for (var j = 0; j < this._nLeft; j++) {
                if (j == this._nLeft - 1) {
                    addClass(cells[j], "head-cell-border-right");
                }
            }
        }

        if (ieVersion === 7) {
            _unitTableSetSize.call(this, fieldsWidth);
        }
    };

    /**
     * 当单元格宽度不足时自适应撑满容器
     *
     * @private
     */
    UI_FIXED_TABLE_HEAD_CLASS._autoResize = function () {
        var initFieldsWidth = this._aInitFieldsWidth.slice();
        var widthControlCells = this.getWidthControlCells().slice();
        for (var i = 0; i < this._nLeft; i++) {
            initFieldsWidth.shift();
            widthControlCells.shift();
        }
        for (var i = 0; i < this._nRight; i++) {
            initFieldsWidth.pop();
            widthControlCells.pop();
        }
        this.resize();
        this._uInner.resize();
        var width = this._uInner.getBodyWidth();
        var cellWidthSum = 0;
        for (var i = 0; i < initFieldsWidth.length; i++) {
            cellWidthSum += initFieldsWidth[i];
        }
        if (cellWidthSum < width) {
            for (var i = 0, len = widthControlCells.length; i < len; i++) {
                var diff = width - cellWidthSum;
                var delta = parseInt(diff / (len - i));
                cellWidthSum += delta;

                var cell = widthControlCells[i];
                var height = cell.getHeight();
                cell.setSize(initFieldsWidth[i] + delta, height);
            }
        }
    };

    /**
     * 获取控制表头宽度的单元格
     */
    UI_FIXED_TABLE_HEAD_CLASS.getWidthControlCells = function () {
        var headRows = this.getRows();
        return headRows[0].getCellControls();
        //todo 支持双表头
    };

    UI_FIXED_TABLE_HEAD_CLASS.getContentWidth = function () {
        var table = dom.children(this._eInner)[0];
        return table.offsetWidth;
    };

    /**
     * 获取初始单元格宽度
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_HEAD_CLASS.getInitFieldsWidth = function () {
        return this._aInitFieldsWidth;
    };

    UI_FIXED_TABLE_CLASS.Body = core.inherits(
        UI_CONTROL,
        'ui-fixed-table',
        function (el, options) {
            this._bNowrap = options.nowrap !== false;
            options.createCellControl = false;
            preprocess.call(this, el, options);
        },
        function (el, options) {
            var tbody = el.getElementsByTagName('tbody')[0];
            if (dom.children(tbody).length) {
                return;
            }
            var type = this.getType();
            var emptyEl = dom.create(type + '-empty');
            if (options.noData) {
                emptyEl.innerHTML = string.encodeHTML(options.noData);
            }
            else {
                emptyEl.innerHTML = '暂无数据，请稍后再试';
            }
            el.appendChild(emptyEl);
        }
    );
    var UI_FIXED_TABLE_BODY_CLASS = UI_FIXED_TABLE_CLASS.Body.prototype;

    UI_FIXED_TABLE_BODY_CLASS._setSize = function (fieldsWidth) {
        this.resize(); //同步原ecui代码
        _unitTableSetSize.call(this, fieldsWidth);
        var rows = this.getRows();
        var top = 0;

        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            var cells = row.getCells();
            var cellHeight;
            // 容许折行
            if (this._bNowrap) {
                // 计算这一行的高度，多列取最大
                cellHeight = getLineHeight(cells);
                innerHeight = cellHeight - 20; // 消除上下 padding 与 border 的影响
            }
            // 不容许折行，使用固定高度，
            else {
                cellHeight = 35;
            }
            if (cellHeight < 0) {
                continue;
            }
            // 左边的锁定行位置设置
            for (var j = 0; j < this._nLeft; j++) {
                if (j == this._nLeft - 1) {
                    // dom.setStyle(cells[j], 'borderRight', '1px solid #dddddd');
                    addClass(cells[j], "cell-border-right");
                }
                dom.setStyle(cells[j], 'height', innerHeight + 'px');
                dom.setStyle(cells[j], 'top', top + 'px');
            }
            // 右边的锁定行位置设置
            for (var j = 0; j < this._nRight; j++) {
                var cell = cells[cells.length - j - 1];
                dom.setStyle(cell, 'height', innerHeight + 'px');
                dom.setStyle(cell, 'top', top + 'px');
            }
            // 中间非锁定列设置其中一个
            if (cells.length > (this._nRight + this._nLeft)) {
                dom.setStyle(cells[this._nLeft], 'height', innerHeight + 'px');
            }
            top += cellHeight - 1;
        }
    };

    // 折行时获取行的高度，原理是多列取最大
    function getLineHeight(cells) {
        var result = 0;
        var height;
        for (var i = 0, len = cells.length; i < len; i++) {
            height = $(cells[i]).outerHeight();
            if (height > result) {
                result = height;
            }
        }
        return Math.ceil(result); // 向上取整防止小数造成的错位
    }

    UI_FIXED_TABLE_HEAD_CLASS.getRows =
        UI_FIXED_TABLE_BODY_CLASS.getRows = function () {
            return this._aRows || [];
        };

    /**
     * table setSize时调用
     *
     * @private
     */
    function _unitTableSetSize(fieldsWidth) {
        var fieldsWidth = fieldsWidth || [];
        var rows = this.getRows();
        if (!rows || !rows.length) {
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.getCells();
            var len = cells.length;
            if (cells.length != fieldsWidth.length) {
                continue;
            }
            for (var j = 0; j < this._nLeft; j++) {
                dom.setStyle(cells[j], 'width', fieldsWidth[j] + 'px');
            }
            if (i == 0) {
                for (var j = this._nLeft; j < len - this._nRight; j++) {
                    dom.setStyle(cells[j], 'width', fieldsWidth[j] + 'px');
                }
            }
            for (var j = len - this._nRight; j < len; j++) {
                dom.setStyle(cells[j], 'width', fieldsWidth[j] + 'px');
            }
        }
    }

    /**
     * @private
     */
    function preprocess(el, options) {
        var type = this.getTypes()[0];
        this._nLeft = options.leftLock;
        this._nRight = options.rightLock;
        dom.addClass(el, type + '-outer');
        this._eInner = dom.create(type + '-inner', '', 'div');
        dom.moveElements(el, this._eInner, true);
        el.appendChild(this._eInner);

        this._uInner = core.$fastCreate(
            UI_FIXED_TABLE_CLASS.Inner, this._eInner, this, {}
        );
        var rows = el.getElementsByTagName('tr');
        this._aRows = [];
        for (var i = 0; i < rows.length; i++) {
            i % 2 == 0 ? options.odd = true : options.odd = false;
            this._aRows.push(core.$fastCreate(
                UI_FIXED_TABLE_CLASS.Row, rows[i], this, options
            ));
        }
    }

    UI_FIXED_TABLE_CLASS.Inner = core.inherits(UI_CONTROL);
    var UI_FIXED_TABLE_INNER_CLASS = UI_FIXED_TABLE_CLASS.Inner.prototype;

    UI_FIXED_TABLE_INNER_CLASS.resize = function () {
        UI_CONTROL_CLASS.resize.call(this);
        if (chromeVersion) {
            this.$setSize(this.getWidth(), this.getHeight() == 0 ? 36 : this.getHeight() + 1);
        } else {
            this.$setSize(this.getWidth(), this.getHeight());
        }
    };

    UI_FIXED_TABLE_CLASS.Row = core.inherits(
        UI_CONTROL,
        'ui-fixed-table-row',
        function (el, options) {
            options.odd ? dom.addClass(el, 'ui-fixed-table-row-odd') : dom.addClass(el, 'ui-fixed-table-row');
            this._aCells = dom.children(el);

            if (options.createCellControl) {
                this._aCellControls = [];
                for (var i = 0; i < this._aCells.length; i++) {
                    this._aCellControls.push(core.$fastCreate(
                        UI_CONTROL, this._aCells[i], this, {}
                    ));
                }
            }
        }
    );
    var UI_FIXED_TABLE_ROW_CLASS = UI_FIXED_TABLE_CLASS.Row.prototype;

    /**
     * 获取行中的单元格
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_ROW_CLASS.getCells = function () {
        return this._aCells || [];
    };

    /**
     * 获取行中的单元格控件
     *
     * @public
     * @return {Array}
     */
    UI_FIXED_TABLE_ROW_CLASS.getCellControls = function () {
        return this._aCellControls || [];
    };

    UI_FIXED_TABLE_CLASS.Scroll = core.inherits(
        UI_CONTROL,
        'ui-fixed-table-scroll',
        function (el, options) {
            var type = this.getType();
            dom.addClass(el, type);
            // this._eInner = dom.create(type + '-inner');
            // el.appendChild(this._eInner);
            el.innerHTML = '<div class=' + this.Inner.TYPES + '></div>'
        },
        function (el, options) {
            var me = this;
            el = dom.children(el);
            this._nTotal = 1;
            this._eInner = core.$fastCreate(this.Inner, el[0], this, {});
        }
    );
    var UI_FIXED_TABLE_SCROLL_CLASS = UI_FIXED_TABLE_CLASS.Scroll.prototype;
    UI_FIXED_TABLE_SCROLL_INNER_CLASS =
        (UI_FIXED_TABLE_SCROLL_CLASS.Inner = core.inherits(UI_BUTTON, 'ui-fixed-table-scroll-inner')).prototype,


        UI_FIXED_TABLE_SCROLL_INNER_CLASS.$mouseover = function (event) {
            UI_BUTTON_CLASS.$mouseover.call(this, event);
            var thumb = this.getParent()._eInner;
            thumb.$setSize(this.getParent().thumbWidth, 10);
        }

    UI_FIXED_TABLE_SCROLL_INNER_CLASS.$mouseout = function (event) {
        UI_BUTTON_CLASS.$mouseout.call(this, event);
        var thumb = this.getParent()._eInner;
        thumb.$setSize(this.getParent().thumbWidth, 8);
    }

    UI_FIXED_TABLE_SCROLL_INNER_CLASS.$activate = function (event) {
        UI_BUTTON_CLASS.$activate.call(this, event);
        drag(this, event, this._oRange);
    };

    UI_FIXED_TABLE_SCROLL_INNER_CLASS.$dragmove = function (event, x, y) {
        UI_BUTTON_CLASS.$dragmove.call(this, event, x, y);
        var parent = this.getParent(),
            value = parent.$calculateValue(x, y);
        this.getParent().getParent()._scroll(value);
        //     alert(value);
        // // 应该滚动step的整倍数
        // parent.$setValue(value == parent._nTotal ? value : value - value % parent._nStep);
        // UI_SCROLLBAR_CHANGE(parent);
    };
    UI_FIXED_TABLE_SCROLL_INNER_CLASS.setRange = function (top, right, bottom, left) {
        this._oRange = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
    };
    UI_FIXED_TABLE_SCROLL_CLASS.$calculateValue = function (x, y) {
        //__gzip_original__range
        var thumb = this._eInner,
            range = thumb._oRange;
        return (x - range.left) / (range.right - thumb.getWidth()) * this._nTotal;
    };
    UI_FIXED_TABLE_SCROLL_CLASS.$flushThumb = function () {
        // 计算滑动按钮高度与位置
        var thumb = this._eInner,
            total = this._nTotal,
            width = this.getWidth(),
            bodyWidth = this.getBodyWidth(),
            thumbWidth = MAX(FLOOR(bodyWidth * width / (width + total)), thumb.getMinimumHeight() + 5);
        this.thumbWidth = thumbWidth;
        if (total) {
            thumb.$setSize(thumbWidth, 8);
            //thumb.setPosition(0, prevHeight + FLOOR((this._nValue / total) * (bodyHeight - thumbHeight)));
            thumb.setRange(prevHeight, 0, bodyHeight + prevHeight, 0);
        }
    };

    UI_FIXED_TABLE_SCROLL_CLASS.$cache = function (style, cacheSize) {
        UI_CONTROL_CLASS.$cache.call(this, style, cacheSize);

        this._eInner.cache(true, true);
    };

    UI_FIXED_TABLE_SCROLL_CLASS._setSize = function (innerWidth) {
        this.show();
        this.resize();
        var innerWidth = innerWidth || 0;
        var thumb = this._eInner;
        var width = this.getWidth();
        var total = innerWidth - width;
        this._nTotal = total;
        var bodyWidth = this.getBodyWidth();
        var thumbWidth = Math.max(Math.floor(bodyWidth * width / (width + total)), thumb.getMinimumHeight() + 5);
        thumb.$setSize(thumbWidth, 8);
        thumb.setRange(1, bodyWidth, 0, 0);
        if (innerWidth <= this.getWidth()) {
            this.hide();
        }
        else {
            this.show();
        }
        //this.$flushThumb();
    };

    UI_FIXED_TABLE_SCROLL_CLASS._scroll = function () {
        var el = this.getOuter();
        this.getParent()._scroll(el.scrollLeft);
    };
})();
/**
 * liteTable - 简单表格
 *
 */

(function () {

    var core = ecui,
        string = core.string,
        ui = core.ui,
        util = core.util,
        string = core.string,

        undefined,

        extend = util.extend,
        blank = util.blank,
        attachEvent = util.attachEvent,
        encodeHTML = string.encodeHTML,

        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype;

    var UI_LITE_TABLE = ui.LiteTable =
            inheritsControl(
                UI_CONTROL,
                'ui-lite-table',
                function (el, options) {
                    options.resizable = false;
                },
                function (el, options) {
                    this._aData = [];
                    this._aFields = [];
                    this._eCheckboxAll = null;
                    this._aCheckboxs = [];
                    this._sEmptyText = options.emptyText || '暂无数据';
                    this._bCheckedHighlight = options.checkedHighlight === true;
                }
            ),

        UI_LITE_TABLE_CLASS = UI_LITE_TABLE.prototype,

        DELEGATE_EVENTS = ['click', 'mouseup', 'mousedown'],

    // 默认处理函数
        DEFAULT_EVENTS = {
            'click th.ui-lite-table-hcell-sort': function (event, control) {
                var field = this.getAttribute('data-field'),
                    orderby;

                if (this.className.indexOf('-sort-desc') >= 0) {
                    orderby = 'asc';
                }
                else if (this.className.indexOf('-sort-asc') >= 0) {
                    orderby = 'desc'
                }
                else {
                    orderby = this.getAttribute('data-orderby') || 'desc';
                }

                triggerEvent(control, 'sort', null, [field, orderby]);
            },
            'click input.ui-lite-table-checkbox-all': function (event, control) {
                control.$refreshCheckbox(this.checked);
            },
            'click input.ui-lite-table-checkbox': function (event, control) {
                control.$refreshCheckbox();
            }
        };

    function copyArray(data) {
        var res = [], i, item;

        for (i = 0; item = data[i]; i++) {
            res.push(extend({}, item));
        }

        return res;
    }

    function getHanlderByType(events, type) {
        var handlers = [], item;

        events = extend({}, events);
        events = extend(events, DEFAULT_EVENTS);

        for (var key in events) {
            item = {handler: events[key]};
            key = key.split(/\s+/);
            if (key[0] == type) {
                item.selector = key[1];
                handlers.push(item);
            }
        }

        return handlers;
    }

    function checkElementBySelector(ele, selector) {
        var tagName, value, type, res = true;

        if (!ele && !selector) {
            return false;
        }

        selector.replace(/^([^.#]*)([.#]?)(.*)$/, function ($0, $1, $2, $3) {
            tagName = $1;
            type = $2;
            value = $3;
        });

        if (tagName && ele.tagName.toLowerCase() != tagName) {
            res = false;
        }

        if (type == '.' && !new RegExp('(^|\\s+)' + value + '(\\s+|$)').test(ele.className)) {
            res = false;
        }

        if (type == '#' && ele.id != value) {
            res = false;
        }

        return res;
    }

    function buildTabeBody(fields, datasource, type) {
        var i, item, j, field, html = [], str,
            className;

        for (i = 0; item = datasource[i]; i++) {
            html.push('<tr class="' + type + '-row">')
            for (j = 0; field = fields[j]; j++) {
                className = type + '-cell';
                if (field.align) {
                    className += ' ' + type + '-cell-align-' + field.align;
                }
                else if (field.checkbox) {
                    className += ' ' + type + '-cell-align-center';
                }
                html.push('<td class="' + className + '">');
                if (field.checkbox) {
                    html.push('<input type="checkbox" value="' + item[field.content] + '" class="' + type + '-checkbox"');
                    if (field.checkedField && item[field.checkedField] == true) {
                        html.push(' checked="checked"');
                    }
                    html.push(' />');
                }
                else {
                    if (typeof field.content == 'function') {
                        html.push(field.content.call(null, item, i));
                    }
                    else {
                        str = item[field.content];
                        if (!str && str != 0) {
                            str = '&nbsp;';
                        }
                        else {
                            str = encodeHTML(str + '');
                        }
                        html.push(str);
                    }
                }
                html.push('</td>')
            }
            html.push('</tr>')
        }

        return html.join('');
    };

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.$setSize = blank;

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.init = function () {
        var i, item, ele = this.getOuter(),
            control = this;

        UI_CONTROL_CLASS.init.call(this);

        // 添加控件全局的事件监听
        // 只支持click mousedown mouseup
        for (i = 0; item = DELEGATE_EVENTS[i]; i++) {
            attachEvent(ele, item, (function (name) {
                return function (event) {
                    var e = event || window.event;
                    e.targetElement = e.target || e.srcElement;
                    control.$fireEventHanlder(name, e);
                }
            })(item));
        }
    }

    /**
     * 设置表格的数据
     * @public
     *
     * @param {Array} datasource 表格数据
     * @param {Object} sortInfo 排序信息
     *          {String} sortby 排序字段
     *          {String} orderby 排序方式
     * @param {Boolean} isSilent 静默模式 如果true的话 不会立刻重绘表格 需要手动调用render
     */
    UI_LITE_TABLE_CLASS.setData = function (datasource, sortInfo, isSilent) {
        this._aData = copyArray(datasource);
        if (sortInfo) {
            this._sSortby = sortInfo.sortby || '';
            this._sOrderby = sortInfo.orderby || '';
        }

        !isSilent && this.render();
    };

    UI_LITE_TABLE_CLASS.getData = function () {
        return copyArray(this._aData);
    };

    UI_LITE_TABLE_CLASS.getDataByField = function (o, field) {
        var i, item;

        field = field || 'id';
        for (i = 0; item = this._aData[i]; i++) {
            if (item[field] == o) {
                return extend({}, item);
            }
        }

        return null;
    };

    /**
     * 设置表格的列信息
     * @public
     *
     * @param {Array} fields 列信息
     * @param {Boolean} isSilent 静默模式 如果true的话 不会立刻重绘表格 需要手动调用render
     */
    UI_LITE_TABLE_CLASS.setFields = function (fields, isSilent) {
        this._aFields = copyArray(fields);

        !isSilent && this.render();
    };

    /**
     * 获取当前选择的行单选框value
     * @public
     */
    UI_LITE_TABLE_CLASS.getSelection = function () {
        var ids = [], i, item;

        for (i = 0; item = this._aCheckboxs[i]; i++) {
            item.checked && ids.push(item.value);
        }

        return ids;
    };

    /**
     * 重新绘制表格
     * @public
     */
    UI_LITE_TABLE_CLASS.render = function () {
        var type = this.getTypes()[0],
            html = ['<table cellpadding="0" cellspacing="0" width="100%" class="' + type + '-table">'],
            i, item, className,
            fields = this._aFields, datasource = this._aData;

        if (!fields || fields.length <= 0) {
            return;
        }

        html.push('<tr class="' + type + '-head">');
        // 渲染表头
        for (i = 0; item = fields[i]; i++) {
            className = type + '-hcell';
            if (item.checkbox) {
                className += ' ' + type + '-hcell-checkbox';
                html.push('<th class="' + className + '"><input type="checkbox" class="' + type + '-checkbox-all" /></th>');
                continue;
            }
            html.push('<th');
            if (item.width) {
                html.push(' width="' + item.width + '"');
            }
            if (item.sortable) {
                className += ' ' + type + '-hcell-sort';
                if (item.field && item.field == this._sSortby) {
                    className += ' ' + type + '-hcell-sort-' + this._sOrderby;
                }
                html.push(' data-field="' + item.field + '"');
                if (item.orderby) {
                    html.push(' data-orderby="' + item.orderby + '"');
                }
            }
            html.push(' class="' + className + '">' + item.title + '</th>');
        }
        html.push('</tr>');

        // 渲染无数据表格
        if (!datasource || datasource.length <= 0) {
            html.push('<tr class="' + type + '-row"><td colspan="'
                + fields.length + '" class="' + type + '-cell-empty">' + this._sEmptyText + '</td></tr>');
        }
        else {
            html.push(buildTabeBody(fields, datasource, type));
        }

        html.push('</table>');

        this.setContent(html.join(''));
        // 重新捕获所有的行当选框
        this.$bindCheckbox();
        if (this._eCheckboxAll) {
            this.$refreshCheckbox();
        }
    };

    /**
     * 获取表格当前所有行单选框的引用
     * @private
     */
    UI_LITE_TABLE_CLASS.$bindCheckbox = function () {
        var inputs = this.getBody().getElementsByTagName('input'),
            i, item, type = this.getTypes()[0];

        this._aCheckboxs = [];
        this._eCheckboxAll = null;

        for (i = 0; item = inputs[i]; i++) {
            if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox-all') >= 0) {
                this._eCheckboxAll = item;
            }
            else if (item.type == 'checkbox' && item.className.indexOf(type + '-checkbox') >= 0) {
                this._aCheckboxs.push(item);
            }
        }
    };

    /**
     * 刷新表格的行单选框
     * @private
     *
     * @param {Boolean} checked 全选/全不选 如果忽略此参数则根据当前表格的实际选择情况来设置“全选”的勾选状态
     */
    UI_LITE_TABLE_CLASS.$refreshCheckbox = function (checked) {
        var i, item, newChecked = true, tr;

        for (i = 0; item = this._aCheckboxs[i]; i++) {
            tr = item.parentNode.parentNode;
            if (checked !== undefined) {
                item.checked = checked;
            }
            else {
                newChecked = item.checked && newChecked;
            }

            if (item.checked && this._bCheckedHighlight) {
                tr.className += ' highlight';
            }
            else if (this._bCheckedHighlight) {
                tr.className = tr.className.replace(/\s+highlight/g, '');
            }
        }

        this._eCheckboxAll.checked = checked !== undefined ? checked : newChecked;
    };

    /**
     * 触发表格events中定义的事件
     * @private
     *
     * @param {String} eventType 事件类型
     * @param {Event} nativeEvent 原生事件参数
     */
    UI_LITE_TABLE_CLASS.$fireEventHanlder = function (eventType, nativeEvent) {
        var events = getHanlderByType(this.events, eventType),
            i, item, target = nativeEvent.targetElement, selector;

        for (i = 0; item = events[i]; i++) {
            if (checkElementBySelector(target, item.selector)) {
                item.handler.call(target, nativeEvent, this);
            }
        }
    };

    /**
     * @override
     */
    UI_LITE_TABLE_CLASS.$dispose = function () {
        this._aCheckboxs = [];
        this._eCheckboxAll = null;
        UI_CONTROL_CLASS.$dispose.call(this);
    };
})();

/*
 Pager - 分页控件。
 分页控件，配合表格控件使用，翻页时触发change事件，可在其中进行表格数据的更新。

 分页控件直接HTML初始化的例子:
 <div type="type:pager;pageSize:10;maxNum:40" class="ui-pager"></div>

 属性
 nPage:      当前的页码(从1开始记数)
 nPageSize:  每页的记录数
 nTotal:     总记录数

 事件
 change:     切换了分页

 */
//{if 0}//
(function () {

    var core = ecui,
        dom = core.dom,
        string = core.string,
        array = core.array,
        ui = core.ui,
        util = core.util,

        undefined,
        MATH = Math,

        createDom = dom.create,
        children = dom.children,
        extend = util.extend,
        blank = util.blank,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_BUTTON = ui.Button,
        UI_SELECT = ui.Select,
        UI_ITEM = ui.Item,
        UI_ITEMS = ui.Items,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_BUTTON_CLASS = UI_BUTTON.prototype,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_SELECT_CLASS = UI_SELECT.prototype;
//{/if}//
//{if $phase == "define"}//
    ///__gzip_original__UI_INPUT_CONTROL
    ///__gzip_original__UI_INPUT_CONTROL_CLASS
    /**
     * 初始化分页控件。
     * options 对象支持的属性如下：
     *      {Number} pageSize   每页的最大记录数
     *      {Number} total      记录总数
     *      {Number} page      当前页码
     *
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_PAGER = ui.Pager =
            inheritsControl(
                UI_CONTROL,
                'ui-pager',
                function (el, options) {
                    var type = this.getTypes()[0],
                        i, len, html = [];

                    if (!options.showCount || options.showCount < 3) {
                        len = this._nShowCount = 7;
                    }
                    else {
                        len = this._nShowCount = options.showCount;
                    }
                    this._bOMSButton = options.omsButton !== false;
                    html.push('<div class="' + type + '-button-prv ' + type + '-button">上一页</div><div class="' + type + '-items">');
                    for (i = 0; i < len; i++) {
                        if (i == 1 || i == len - 1) {
                            html.push('<div class="' + type + '-item-oms" ecui="disabled:true">...</div>');
                        }
                        html.push('<div class="' + type + '-item"></div>');
                    }
                    html.push('</div><div class="' + type + '-button-nxt ' + type + '-button">下一页</div>');

                    el.innerHTML = html.join('');

                },
                function (el, options) {
                    el = children(el);

                    this._bResizable = false;
                    this._nPage = options.page || 1;
                    this._nPageSize = options.pageSize || 50;
                    this._nTotal = options.total || 0;

                    this._uPrvBtn = $fastCreate(this.Button, el[0], this);
                    this.$setBody(el[1]);
                    this._uNxtBtn = $fastCreate(this.Button, el[2], this);
                    this.$initItems();
                }
            ),
        UI_PAGER_CLASS = UI_PAGER.prototype,
        UI_PAGER_BUTTON = UI_PAGER_CLASS.Button =
            inheritsControl(
                UI_BUTTON,
                'ui-pager-button',
                function (el, options) {
                    var type = this.getTypes()[0],
                        o = createDom(type + '-icon');

                    el.insertBefore(o, el.firstChild);
                }
            ),
        UI_PAGER_BUTTON_CLASS = UI_PAGER_BUTTON.prototype,
        UI_PAGER_ITEM_CLASS = (UI_PAGER_CLASS.Item = inheritsControl(UI_ITEM, 'ui-pager-item', function (el, options) {
            options.resizeable = false;
        })).prototype;
//{else}//

    extend(UI_PAGER_CLASS, UI_ITEMS);

    /**
     * 分页按钮事件处理函数
     * 根据按钮的step属性确定需要切换的页码
     * @private
     */
    function UI_PAGER_BTN_CLICK(event) {
        var par = this.getParent(),
            curIndex = par._nPage,
            maxNum = par.getMaxPage(),
            n = this.getStep();

        UI_CONTROL_CLASS.$click.call(this);

        if (n.charAt(0) == '+') {
            curIndex += parseInt(n.substring(1), 10);
            //+0 尾页
            if (curIndex == par._nPage) {
                curIndex = maxNum;
            }
            else if (curIndex > maxNum) {
                curIndex = par._nPage;
            }
        }
        else if (n.charAt(0) == '-') {
            curIndex -= parseInt(n.substring(1), 10);
            //-0 首页
            if (curIndex == par._nPage) {
                curIndex = 1;
            }
            else if (curIndex < 1) {
                curIndex = par._nPage;
            }
        }
        else {
            curIndex = parseInt(n, 10);
        }

        if (par._nPage != curIndex) {
            triggerEvent(par, 'change', null, [curIndex]);
        }
    }

    /**
     * 控件刷新
     * 根据当前的页码重置按钮
     * @private
     */
    function UI_PAGER_REFRESH(con) {
        var items = con._aPageBtn,
            max = con.getMaxPage(),
            idx = con._nPage,
            showCount = con._nShowCount,
            nHfNum = parseInt(showCount / 2, 10),
            start = idx - nHfNum > 0 ? idx - nHfNum : 1,
            end, i, item;

        if (idx == 1) {
            con._uPrvBtn.disable();
        }
        else {
            con._uPrvBtn.enable();
        }

        if (idx == max || max == 0) {
            con._uNxtBtn.disable();
        }
        else {
            con._uNxtBtn.enable();
        }

        if (start + showCount - 1 > max && max - showCount >= 0) {
            start = max - showCount + 1;
        }
        for (i = 0; item = items[i]; i++) {
            end = start + i;
            item.setContent(end);
            item.setStep(end);
            item.setSelected(idx == end);
            if (end > max) {
                item.hide();
            }
            else {
                item.show();
            }
        }

        UI_PAGER_OMS_REFRESH(con);
    }

    /**
     * 刷新more符号按钮
     * @private
     */
    function UI_PAGER_OMS_REFRESH(con) {
        var items = con._aPageBtn,
            omsBtn = con._aOMSBtn,
            max = con.getMaxPage(),
            item;

        if (!con._bOMSButton) {
            return;
        }

        if (items[0].getContent() != '1') {
            items[0].setContent(1);
            items[0].setStep(1);
            omsBtn[0].show();
        }
        else {
            omsBtn[0].hide();
        }

        item = items[items.length - 1];
        if (item.isShow() && item.getContent() != max) {
            item.setContent(max);
            item.setStep(max);
            omsBtn[1].show();
        }
        else {
            omsBtn[1].hide();
        }
    }

    UI_PAGER_ITEM_CLASS.$setSize = blank;

    /**
     * 设置页码按钮的选择状态
     * @public
     *
     * @param {Boolean} flag 是否选中
     */
    UI_PAGER_ITEM_CLASS.setSelected = function (flag) {
        this.alterClass((flag ? '+' : '-') + 'selected');
    };

    /**
     * 设置按钮的步进
     * +/-n 向前/后翻n页
     * +0 尾页 -0 首页
     * @public
     *
     * @param {String} n 步进
     */
    UI_PAGER_BUTTON_CLASS.setStep = UI_PAGER_ITEM_CLASS.setStep = function (n) {
        this._sStep = n + '';
    };

    /**
     * 获取步进
     * @public
     *
     * @return {String} 步进
     */
    UI_PAGER_BUTTON_CLASS.getStep = UI_PAGER_ITEM_CLASS.getStep = function () {
        return this._sStep;
    };

    /**
     * @override
     */
    UI_PAGER_BUTTON_CLASS.$click = UI_PAGER_ITEM_CLASS.$click = UI_PAGER_BTN_CLICK;

    /**
     * 得到最大的页数
     * @public
     *
     * @return {Number} 最大的页数
     */
    UI_PAGER_CLASS.getMaxPage = function () {
        return MATH.ceil(this._nTotal / this._nPageSize);
    };

    /**
     * 得到最大的记录数
     * @public
     *
     * @return {Number} 最大的记录数
     */
    UI_PAGER_CLASS.getTotal = function () {
        return this._nTotal;
    };

    /**
     * 得到最大的记录数
     * @public
     *
     * @return {Number} 最大的记录数
     */
    UI_PAGER_CLASS.getTotal = function () {
        return this._nTotal;
    };

    /**
     * 翻页
     * 不会对参数进行有效检查
     * @public
     *
     * @param {Number} i 目标页码
     */
    UI_PAGER_CLASS.go = function (i) {
        this._nPage = i;
        UI_PAGER_REFRESH(this);
    };

    /**
     * 设置每页的记录数
     * @public
     *
     * @param {Number} num 记录数
     */
    UI_PAGER_CLASS.setPageSize = function (num) {
        this._nPageSize = num;
        this._nPage = 1;
        UI_PAGER_REFRESH(this);
    };

    /**
     * 设置总记录数
     * @public
     *
     * @param {Number} num 记录数
     */
    UI_PAGER_CLASS.setTotal = function (num) {
        this._nTotal = num;
        this._nPage = 1;
        UI_PAGER_REFRESH(this);
    };

    /**
     * 初始化函数
     * 初始化设置并根据初始参数设置控件各部件的状态
     *
     * @override
     */
    UI_PAGER_CLASS.init = function () {
        var i, item, items = this.getItems();

        this._uPrvBtn.setStep('-1');
        this._uNxtBtn.setStep('+1');
        this._aOMSBtn = [];
        this._aPageBtn = [];
        UI_CONTROL_CLASS.init.call(this);
        for (i = 0; item = items[i]; i++) {
            item.init();
            if (i == 1 || i == items.length - 2) {
                this._aOMSBtn.push(item);
                item.hide();
            }
            else {
                this._aPageBtn.push(item);
            }
        }
        UI_PAGER_REFRESH(this);
    };

    /**
     * override
     */
    UI_PAGER_CLASS.$setSize = blank;

//{/if}//
//{if 0}//
})();
//{/if}//

/*
 Pager - 分页控件。
 分页控件，配合表格控件使用，翻页时触发change事件，可在其中进行表格数据的更新。

 分页控件直接HTML初始化的例子:
 <div type="type:pager;pageSize:10;maxNum:40" class="ui-pager"></div>

 属性
 nPage:      当前的页码(从1开始记数)
 nPageSize:  每页的记录数
 nTotal:     总记录数

 事件
 change:     切换了分页

 */
(function () {

    var core = ecui,
        dom = core.dom,
        string = core.string,
        array = core.array,
        ui = core.ui,
        util = core.util,

        undefined,
        MATH = Math,

        createDom = dom.create,
        children = dom.children,
        extend = util.extend,
        blank = util.blank,

        $fastCreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,

        UI_CONTROL = ui.Control,
        UI_PAGER = ui.Pager,
        UI_SELECT = ui.Select,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_PAGER_CLASS = UI_PAGER.prototype;
    /**
     * 初始化分页控件。
     * options 对象支持的属性如下：
     *      {Number} pageSize   每页的最大记录数
     *      {Number} total      记录总数
     *      {Number} page      当前页码
     *
     * @public
     *
     * @param {Object} options 初始化选项
     */
    var UI_CUSTOM_PAGER = ui.CustomPager =
            inheritsControl(
                UI_CONTROL,
                'ui-custom-pager',
                function (el, options) {
                    var type = this.getTypes()[0],
                        i, len, html = [];

                    if (options.pageOptions) {
                        this.PAGE_SIZE = options.pageOptions.split(',');
                    }
                    else {
                        this.PAGE_SIZE = [10, 20, 50, 100];
                    }

                    var hideTotal = ' style="display:' + (options.hideTotal ? 'none' : '') + '"';
                    var hideSize = ' style="display:' + (options.hideSize ? 'none' : '') + '"';

                    html.push('<div class="' + type + '-page" ' + hideTotal + '>共<em></em>页</div>');
                    html.push('<span style="float:left; margin-right:10px;' + 'display:' + (options.hideTotal ? 'none' : '') + '">，</span>');
                    html.push('<div class="' + type + '-sum" ' + hideTotal + '>共<em></em>条记录</div>');

                    html.push('<div class="ui-pager"></div>');

                    html.push('<div class="' + type + '-pagesize" ' + hideSize + '>每页显示<select class="ui-select" style="width:45px">');
                    for (i = 0, len = this.PAGE_SIZE.length; i < len; i++) {
                        html.push('<option value="' + this.PAGE_SIZE[i] + '">' + this.PAGE_SIZE[i] + '</option>');
                    }
                    html.push('</select>条</div>')
                    el.innerHTML = html.join('');

                    //处理pageSize
                    options.pageSize = options.pageSize || DEFAULT_PAGE_SIZE;
                    for (i = 0, len = this.PAGE_SIZE.length; i < len; i++) {
                        if (this.PAGE_SIZE[i] == options.pageSize) {
                            break;
                        }
                    }

                },
                function (el, options) {
                    var el = children(el),
                        me = this;

                    this._bResizable = false;
                    this._eTotalPage = el[0].getElementsByTagName('em')[0];
                    this._eTotalNum = el[2].getElementsByTagName('em')[0];
                    this._uPager = $fastCreate(UI_PAGER, el[3], this, extend({}, options));
                    this._uPager.$change = function (value) {
                        triggerEvent(me, 'change', null, [value, me._uPager._nPageSize]);
                    }
                    this._uSelect = $fastCreate(UI_SELECT, el[4].getElementsByTagName('select')[0], this);
                    this._uSelect.$change = function () {
                        triggerEvent(me, 'pagesizechange', null, [this.getValue()]);
                    }
                }
            ),

        UI_CUSTOM_PAGER_CLASS = UI_CUSTOM_PAGER.prototype,

        DEFAULT_PAGE_SIZE = 50;


    UI_CUSTOM_PAGER.PAGE_SIZE = [10, 20, 50, 100];

    UI_CUSTOM_PAGER_CLASS.init = function () {
        this._uPager.init();
        this._uSelect.init();
        this._eTotalPage.innerHTML = this._nTotalPage || 1;
        this._eTotalNum.innerHTML = this._uPager._nTotal || 0;
        this._uSelect.setValue(this._uPager._nPageSize);
    }

    UI_CUSTOM_PAGER_CLASS.render = function (page, total, pageSize) {
        var item = this._uPager;

        this._uSelect.setValue(pageSize);
        if (total || total == 0) {
            this._eTotalNum.innerHTML = total;
            item._nTotal = total
        }
        else {
            this._eTotalPage.innerHTML = item._nPage || 0;
            this._eTotalNum.innerHTML = item._nTotal || 0;
            item._nTotal = item._nTotal || 0;
        }
        item._nPageSize = pageSize || item._nPageSize;

        //by hades
        this._nTotalPage = MATH.ceil(total / pageSize);
        this._eTotalPage.innerHTML = this._nTotalPage;

        item.go(page);
    };

    UI_CUSTOM_PAGER_CLASS.getPageSize = function () {
        return this._uPager._nPageSize;
    };

    UI_CUSTOM_PAGER_CLASS.getPage = function () {
        return this._uPager._nPage;
    };

    UI_CUSTOM_PAGER_CLASS.getTotal = function () {
        return this._uPager._nTotal;
    };

    /**
     * override
     */
    UI_CUSTOM_PAGER_CLASS.$setSize = blank;

})();

/**
 * @file 工作台首页订制的分页控件,只满足简单分页需求
 * @author hades(denghongqi@gmail.com)
 */

(function () {
    var core = ecui,
        ui = core.ui,
        dom = core.dom,
        util = core.util,

        $fastcreate = core.$fastCreate,
        inheritsControl = core.inherits,
        triggerEvent = core.triggerEvent,
        createDom = dom.create,
        children = dom.children,
        setStyle = dom.setStyle,
        addClass = dom.addClass,
        removeClass = dom.removeClass,
        extend = util.extend,
        blank = util.blank,

        MATH = Math,

        UI_CONTROL = ui.Control,
        UI_CONTROL_CLASS = UI_CONTROL.prototype,
        UI_ITEM = ui.Item,
        UI_ITEM_CLASS = UI_ITEM.prototype,
        UI_ITEMS = ui.Items;

    var UI_FLASH_PAGER = ui.FlashPager =
        inheritsControl(
            UI_CONTROL,
            'ui-flash-pager',
            function (el, options) {
                var type = this.getTypes()[0];
                setStyle(el, 'display', 'inline-block');
                el.innerHTML = '<span class="' + type + '-pre" style="'
                    + 'display:inline-block">&lt;</span>'
                    + '<span class="' + type + '-items" style="'
                    + 'display:inline-block">'
                    + '<span ecui="value:1">1</span>'
                    + '<span ecui="value:2">2</span>'
                    + '<span ecui="value:3">3</span>'
                    + '</span>'
                    + '<span class="' + type + '-next" style="'
                    + 'display:inline-block">&gt;</span>';
            },
            function (el, options) {
                this._nPage = options.page - 0 || 1;
                this._nTotal = options.total - 0 || 100;
                this._nPagesize = options.pagesize - 0 || 10;
                this._nMaxShow = options.maxShow - 0 || 3;
                el = children(el);

                this._uPre = $fastcreate(
                    this.Pre,
                    el[0],
                    this,
                    {userSelect: false}
                );
                this._uNext = $fastcreate(
                    this.Next,
                    el[2],
                    this,
                    {userSelect: false}
                );
                this.$setBody(el[1]);
                this.$initItems();
                flushPager(this, this._nPage);
                //this.render();
            }
        );

    var UI_FLASH_PAGER_CLASS = UI_FLASH_PAGER.prototype;

    /**
     * @public
     */
    UI_FLASH_PAGER_CLASS.getValue = function () {
        if (this._cSelected) {
            return this._cSelected.$getValue();
        }
        else {
            return null;
        }
    };

    /**
     * 渲染分页控件
     * @public
     * @param {number} page 当前页
     * @param {number} total 总数
     * @param {number} pagesize 每页条数
     */
    UI_FLASH_PAGER_CLASS.render = function (page, total, pagesize) {
        this._nPage = page || 1;
        this._nTotal = total || 0;
        this._nPagesize = pagesize || 10;
        flushPager(this, this._nPage);
    }

    UI_FLASH_PAGER_CLASS.Pre = inheritsControl(UI_CONTROL);
    var UI_FLASH_PAGER_PRE_CLASS = UI_FLASH_PAGER_CLASS.Pre.prototype;

    UI_FLASH_PAGER_CLASS.Next = inheritsControl(UI_CONTROL);
    var UI_FLASH_PAGER_NEXT_CLASS = UI_FLASH_PAGER_CLASS.Next.prototype;

    /**
     * @event
     */
    UI_FLASH_PAGER_PRE_CLASS.$click = function () {
        var par = this.getParent();
        var value = par.getValue() - 1;
        flushPager(par, value);
    };

    /**
     * @event
     */
    UI_FLASH_PAGER_NEXT_CLASS.$click = function () {
        var par = this.getParent();
        var value = par.getValue() + 1;
        flushPager(par, value);
    };

    /**
     * 刷新分页页码items
     * @param {ecui.ui.FlashPager} control
     */
    function flushPager(control, value) {
        control._nTotalPage = MATH.ceil(control._nTotal / control._nPagesize);

        if (control._nTotalPage < control.getItems().length) {
            for (var i = 0; i < control._nMaxShow - control._nTotalPage; i++) {
                var items = control.getItems();
                control.remove(items[items.length - 1]);
            }
        }

        if (control._nTotalPage <= 1) {
            control.hide();
            return;
        }

        var items = control.getItems();
        var start = items[0].$getValue();
        var end = items[items.length - 1].$getValue();

        if (value <= 1) {
            value = 1;
            control._uPre.disable();
        }
        else {
            control._uPre.enable();
        }

        if (value >= control._nTotalPage) {
            value = control._nTotalPage;
            control._uNext.disable();
        }
        else {
            control._uNext.enable();
        }

        if (value < start) {
            start = value;
            end = value + items.length;
        }
        else if (value > end) {
            end = value;
            start = end - items.length + 1;
        }

        for (var i = 0; i < items.length; i++) {
            var o = items[i];
            o.$setValue(i + start);
            if (value == o.$getValue()) {
                o.$setSelected();
            }
        }
    };

    UI_FLASH_PAGER_CLASS.Item = inheritsControl(
        UI_CONTROL,
        null,
        function (el, options) {
            options.userSelect = false;
        },
        function (el, options) {
            this._nValue = options.value;
        }
    );
    var UI_FLASH_PAGER_ITEM_CLASS = UI_FLASH_PAGER_CLASS.Item.prototype;
    extend(UI_FLASH_PAGER_CLASS, UI_ITEMS);

    UI_FLASH_PAGER_CLASS.$alterItems = blank;

    /**
     * @event
     */
    UI_FLASH_PAGER_ITEM_CLASS.$click = function () {
        var par = this.getParent();
        var value = this.$getValue();
        flushPager(par, value);
    };

    /**
     * 页码item被选中时触发
     * @private
     */
    UI_FLASH_PAGER_ITEM_CLASS.$setSelected = function () {
        var par = this.getParent();
        if (par._nValue == this.$getValue()) {
            return;
        }
        else {
            if (par._cSelected) {
                removeClass(
                    par._cSelected.getOuter(),
                    'ui-flash-pager-item-selected'
                );
            }
            addClass(this.getOuter(), 'ui-flash-pager-item-selected');
            par._cSelected = this;
            par._nValue = this.$getValue();
            triggerEvent(par, 'change', null, [par.getValue()]);
        }
    };

    /**
     * @private
     * @param {number} value
     */
    UI_FLASH_PAGER_ITEM_CLASS.$setValue = function (value) {
        this._nValue = value;
        this._sName = value;
        this.setContent(this._sName);
    };

    /**
     * @private
     */
    UI_FLASH_PAGER_ITEM_CLASS.$getValue = function () {
        return this._nValue;
    };
})();
