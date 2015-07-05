# 将form中的数据转为js对象
 
我们经常需要从表单中提取数据，然后异步提交给服务器，需要做很多的定向开发，
这是一个可以将form中的数据转换为js对象的工具。
form元素的name属性是对象的key，checkbox的值以逗号间隔。

## 参数

**from** 必选参数，要读取的表单，只接受两种格式：form的id，form的原生dom节点对象。

**isFilterEmpty** 可选参数，是否将空值（空字符串，没有选中项的组）从对象中过滤掉，默认不过滤。

**noCheckedValue** 可选参数，checkbox和radio组没有选中项时取得值，只有参数 `isFilterEmpty` 值为true时生效。

## 使用建议

在表单内容提交时建议设 `isFilterEmpty` 为 `false` 或者不设置，方便校验；
如果想原样保存表单`isFilterEmpty` 为 `false`，将参数 `noCheckedValue` 设置为空字符串，
这样可以将全部字段保存到服务器，这样方便服务器端统一处理。

在提交查询表单时，尤其是多条件查询，将`isFilterEmpty` 为 `true`，可以过滤掉用户没有填写的字段。

在写HTML时，可以将“全部”，“请选择”这样的选项的值设为空字符串，就可以很方便的使用上面的逻辑来验证或提交了。

另外说明一点，`select` 的选项 `option` 如果不设置 `value`那么会将文本作为 `value` 来获取，
这也是浏览器的默认行为，这里没有添加额外的控制。

## 测试页

测试页：[./test.html](./test.html)

## 核心代码

    var getFromData = (function () {

        function g(id) {
            return document.getElementById(id);
        }

        /**
         * 获取表单数据
         *
         * @param {string|Object} form 要读取的表单，只接受两种格式：form的id，form的原生dom节点
         * @param {Boolean} isFilterEmpty 是否将空值（空字符串，没有选中项的组）从对象中过滤掉
         * @param {string|Object} noCheckedValue checkbox和radio组没有选中项时取得值
         * @return {Object} formObj 获取到的数据对象
         * @public
         */
        function getFromData(form, isFilterEmpty, noCheckedValue) {
            if (typeof form === 'string') {
                form = g(form);
            }
            if (form && form.nodeType !== 1) {
                return '无法找到容器';
            }

            // 设置缺省值，因为传入的值可能是undefined所以通过参数组长度来设置缺省值
            if (arguments.length == 1) {
                noCheckedValue = null;
            }

            var formObj = {};
            var formCheckboxObj = {};
            var emptyArr = [];
            // 准备表单元素列表，根据键值特性分为两类
            var formEleArr = {
                single: emptyArr.concat(
                        emptyArr.slice.call(form.getElementsByTagName('select')),
                        emptyArr.slice.call(form.getElementsByTagName('textarea'))
                ),
                input: emptyArr.slice.call(form.getElementsByTagName('input'))
            };

            // 单键值元素
            formEleArr.single.forEach(function (ele) {
                single(ele, formObj, isFilterEmpty);
            });
            // input情况比较复杂
            formEleArr.input.forEach(function (ele) {
                var type = ele.type;
                // 单键值处理
                if (type === 'hidden' || type === 'text') {
                    single(ele, formObj, isFilterEmpty);
                }
                // 一组一值
                else if (type === 'radio') {
                    radio(ele, formObj, noCheckedValue, isFilterEmpty);
                }
                // 一组多值
                else if (type === 'checkbox') {
                    checkbox(ele, formCheckboxObj, noCheckedValue);
                }
            });

            // 将一组多值合并会单键值
            for (var name in formCheckboxObj) {
                if (formCheckboxObj[name].length > 0) {
                    var checkboxVal = formCheckboxObj[name].join(',');
                    if (isFilterEmpty === true) {
                        if (checkboxVal !== '') {
                            ormObj[name] = checkboxVal;
                        }
                    }
                    else {
                        formObj[name] = checkboxVal;
                    }
                }
                else {
                    if (isFilterEmpty !== true) {
                        formObj[name] = noCheckedValue;
                    }
                }
            }

            return formObj;
        }

        // 单键值处理
        function single(ele, formObj, isFilterEmpty) {
            var name = trim(ele.name);
            var val = trim(ele.value);
            if (name !== '') {
                if (isFilterEmpty === true) {
                    if (val !== '') {
                        formObj[name] = ele.value;
                    }
                }
                else {
                    formObj[name] = val;
                }

            }
        }

        // 一组一值
        function radio(ele, formObj, noCheckedValue, isFilterEmpty) {
            var name = trim(ele.name);
            var val = trim(ele.value);
            if (name !== '') {
                if (ele.checked) {
                    if (isFilterEmpty === true) {
                        if (val !== '') {
                            formObj[name] = val;
                        }
                    }
                    else {
                        formObj[name] = val;
                    }
                }
                else if (isFilterEmpty !== true && formObj[name] === undefined) {
                    formObj[name] = noCheckedValue;
                }
            }
        }

        // 一组多值
        function checkbox(ele, formCheckboxObj) {
            var name = trim(ele.name);
            var val = trim(ele.value);
            if (name !== '') {
                if (formCheckboxObj[name] === undefined) {
                    formCheckboxObj[name] = [];
                }

                if (ele.checked) {
                    formCheckboxObj[name].push(val);
                }
            }
        }

        function trim(str) {
            if (typeof str === 'string') {
                return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            }
            else {
                return str;
            }
        }
        
        return getFromData;
    })();
    
