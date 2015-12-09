# Array那些事

> Array，我们经常使用，却未见得知晓她的全部，这篇文章基本上是对官方API(包括ES5中Array的全部方法)的整理再加一些代码示例，整理在此一方面是自我修养一方面是方便查阅。

Array：一种数据容器，存储有序。
与其他语言最大的不同就是存储的数据项可以是不同数据类型的混搭。

Array容量：2的32次方 - 2 = 4 294 967 294，约42.9亿。
这是理论设计的最大容量，实际上在千万级的简单数据项冲击下，现代浏览器基本全部崩溃。
在最新版的chrome浏览器 42.0 上做测试，数据到7千万就崩溃了。
    
    var array = [];
    var n = 10000 * 1000; // 千万
    for (var i = 0; i < 4294967294; i++) {
        array.push(i);
        if (i % n === 0) {
            console.log(i / n);
        }
    }

## 创建Array的各种方法与区别

一、构造函数创建
    
    var array1 = new Array(); // 创建一个空数组
    var array2 = new Array(3); // 创建一个长度为3的数组
    var array3 = new Array('a', 'b', 'c'); // 创建一个包含3个具体元素的数组

其中的 `new` 是可以省略的（虽然一般不赞成这样写），
有人觉得这是个很不错的语言特性，于是在自定义对象上也兼容了这种省略`new`的用法。
（忘记在哪里看到过了，有时间找找）

二、直接量赋值创建

    var array4 = []; // 与array1的创建等效
    // 直接量可以这样创建，但是构造函数Array('a', 'b', 'c', ,)是有语法错误的
    var array5 = [1, 2]; 

补充一点：

    var array6 = [1, 2, , ]; // 变通写法：[1, 2, undefined, undefined]
    var array7 = [1, 2, , 4];
    var array8 = [1, 2, undefined, 4];
    2 in array7 // false
    2 in array8 // true
    array7[2] === array8[2]; // true

逗号前不放值得这种方法很不规范，应当绝对避免。而且数组的长度会存在浏览器兼容问题，还存在其他一些隐藏的坑（比如上面的 `in` ）。

## ES3 下Array的方法和属性

### length

.length

是数组的属性，可以通过改变属性值来截断或者加长数组，所加得项值为 undefined。另外如果所赋的值不是正整数和零不一定会报错，下面是几种典型的不报错并且可以获得长度的情况。

    var a = [1,2,3,4,5];
    a.length = true; // a.length 为 1
    a.length = false; // a.length 为 0
    a.length = ''; // a.length 为 0
    a.length = null; // a.length 为 0

### push

.push(new1,new2,...,newX)

接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度，该方法**会**改变数组。

示例：

    var array = [];
    array.push('a'); // 1
    array[0];        // 'a'

### pop

.pop()

移除并返回数组的最后一项，该方法**会**改变数组。

当数组长度已经是零时，继续使用`pop`方法不会报错，返回 `undefined`。

示例：

    var array = ['a'];
    array.pop(); // 'a'
    array[0];    // undefined
    
### shift

.shift()

删除并返回数组的第一个元素，该方法**会**改变数组。

当数组长度已经是零时，继续使用`shift`方法不会报错，返回 `undefined`。

    var array = ['a'];
    array.shift(); // a
    array[0];      // undefined

### unshift

.unshift(new1,new2,...,newX)

向数组的开头添加一个或更多元素，并返回新的长度（IE会返回undefined），该方法**会**改变数组。

    var array = [];
    array.unshift('a', 'b'); // 2

### slice

.slice(start,end)

从已有的数组中选择并返回选定的元素（以数组的形式）。
返回的数组是原数组的部分拷贝（值类型，字符串或数字）或指向（对象类型）,
该方法**不会**改变数组。

start:可选。规定从何处开始选取（默认从0开始）。
如果是负数，那么它规定从数组尾部开始算起的位置。
也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。

end:可选。规定从何处结束选取。
该参数是数组片断结束处的数组下标。
如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。
如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

    var array = ['a', 'b', {name: 'a'}];
    var array2 = array.slice(1, 2); // ['b']
    var array3 = array.slice(2, 3); // {name: 'a'}
    array2[0] = 'k';
    array; // ['a', 'b', {name: 'a'}]
    array3[0].name = 'b';
    array[2].name; // 'b'

### splice

.splice(start, deleteCount, item1, ....., itemX)

先从数组中删除元素，然后添加元素，最后返回被删除的项目，
该方法**会**改变数组。

start:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。

deleteCount:必需。要删除的项目数量。如果设置为 0，则不会删除项目。

item1, ..., itemX:	可选。向数组添加的新项目。在被删除的元素后面添加，用此方法可实现向数组中任意位置插入项。

    var array = ['a', 'b', 'c', 'd'];
    array.splice(1, 2, 'k');  // ['b', 'c']
    array;                    // ['a', 'k', 'd']
    array = ['a', 'b', 'c'];
    array.splice(-1, 2, 'k'); // ['c']
    ['a', 'b', 'c'].slice(-1,-2)  // []
    ['a', 'b', 'c'].slice(-2,-1)  // ["b"]

### concat

.concat(array1,array2,...,arrayX)

方法用于连接两个或多个数组。
该方法**不会**改变现有的数组，而仅仅会返回被连接数组的一个副本。

    var array = ['a'];
    array.concat('b');         // ['a', 'b']
    array.concat(['c']);       // ['a', 'c']
    array.concat('b', ['c']);  // ['a', 'b', 'c']

### sort

.sort(sortby)

对数组元素进行排序，并返回排序后的数组。该方法**会**改变现有的数组。

参数可以省略，默认从小到大。


    var array = [1, 3, 2];
    array.sort(); // [1, 2, 3]
    array;        // [1, 2, 3]
    array.sort(function (item1, item2) {
        return true;
    }); // [3, 2, 1]

    var array = [
        { order: 1 },
        { order: 3 },
        { order: 2 },
        { order: 5 }
    ];
    array.sort(function (item1, item2) {
        // 和reverse一个效果
        return true;
    }); // [{"order":5},{"order":2},{"order":3},{"order":1}]
    array.sort(function (item1, item2) {
        // 刚好反向，最后的结果是item1.order < item2.order
        return item1.order > item2.order;
    }); // [{"order":1},{"order":2},{"order":3},{"order":5}] 

### reverse

.reverse()

用于颠倒数组中元素的顺序。该方法**会**改变原来的数组，而不会创建新的数组。
返回结果是颠倒后的数组

### join

.join(separator)

把数组中的所有元素转成字符串，然后以间隔符为间隔拼接。转换的时候调用每一项的 `toString` 方法，每一种数据类型都有默认的 `toString` 方法，用户可以通过自定义函数来覆盖系统默认函数，具体参见下面的 `toString` 示例。

separator:可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

    var array = [1, 2];
    array.join(); // '1,2'
    var array = [
        { order: 1 },
        { order: 2 }
    ];
    array.join('-'); // '[object Object]-[object Object]'

### toString

.toString() 

把数组转换为字符串返回。当数组用于字符串环境时，JavaScript 会调用这一方法将数组自动转换成字符串。转换的方式是调用数组每一项的 `toString` 方法(用户不声明时调用默认的 `toString` 方法)，然后以逗号为间隔拼起来。该方法**不会**改变原来的数组。

### toLocaleString

.toLocaleString()

把数组转换为本地字符串返回。转换的方式是调用数组每一项的 `toLocaleString` 方法(用户不声明时调用默认的 `toLocaleString` 方法)，然后以逗号为间隔拼起来。该方法**不会**改变原来的数组。

    var array = [1, 2];
    array.toLocaleString(); // '1,2'
    var array = [
        { order: 1 },
        {
            order: 2,
            toLocaleString: function () {
                var result;
                if (window.JSON !== undefined) {
                    result = JSON.stringify(this);
                }
                else {
                    result = '{"order":2}';
                }
                return result;
            },
            toString: function () {
                var result;
                if (window.JSON !== undefined) {
                    result = JSON.stringify(this);
                }
                else {
                    result = '{"order":2}';
                }
                return result;
            }
        }
    ];
    array.toLocaleString(); // '[object Object],{"order":2}'
    array.toString(); // '[object Object],{"order":2}'
    // IE7 可以输出相同的值，需要做兼容的只有JSON对象了。

补充一下，另外还有 `.valueOf()` 和 `.toSource()` ，
通常用于 JavaScript 在后台自动调用，这里不做过多解释。

## ES5 下Array的方法

### isArray

Array.isArray(arg)

判断传入的参数 `arg` 是否是数组。

与之相关的一个属性是 `constructor` 也可以判断是否是数组。
但是区别在于用 `constructor` 判断时来自不同 `iframe` 的数组不能被识别。

    Array.isArray(arg) // 可以准确判断，但是只支持现代浏览器
    arg.constructor === Array // 当arg来自其他iframe中时，恒定为false

业界强悍的黑魔法还给出了另外一个思路来判断是否是数组

    Object.prototype.toString.call(arg)
    // 不管arg来自哪里，也不管浏览器是否是现代浏览器，如果arg是数组，结果是 '[object Array]'

### every

.every(callback[, thisObject])

callback:要对每个数组元素执行的回调函数。
thisObject:在执行回调函数时定义的this对象。

其中`callback` 支持三个参数 `callback(item, index, currentArray)`。

every **不会**改变原有数组。

另外关于返回值，如果每一项都返回布尔运算后为 `true` 那么 `every` 的执行结果是 `true`，
否则返回 `false` 。当回调函数返回布尔运算为 `false` 时，后面的项不被回调处理。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.every(function (item, index, currentArray) {
        item.order++;
        return null; // 因为 null 的布尔运算是 false，所以最后返回 false
    }, window); // false
    array[0].order; // 1

注意：
对于添加元素，只有在 `every` 执行前添加的数组元素才有效，在回调函数中添加的元素将被忽略，

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.every(function (item, index, currentArray) {
        if (array.length < 4) {
            array.push({ order: 3 });
        }
        console.log(item.order);
        return true;
    }, window);
    // 控制台只能看到 0 ， 1 ，2

而在 `every` 开始执行到最后一个元素这一期间，数组元素被删除或者被更改的，将以回调函数访问到该元素的时间为准，被删除的元素将被忽略。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.every(function (item, index, currentArray) {
        array.pop();
        console.log(item.order);
        return true;
    }, window);
    // 控制台可以看到 0 ， 1

### some

.some(callback[, thisObject])

参数的使用与 `every` 相同。

当回调函数返回布尔运算为 `true` 的值时不再处理之后的元素，
而且如果有一次返回 `true`（依然是布尔运算的结果） `some` 的执行结果就是 `true`，
否则为 `false`。

在空数组上调用every返回true，some返回false。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.some(function (item, index, currentArray) {
        item.order++;
        return item.order > 1; // 因为 index=1 时返回 true，所以查找止于 index=1
    }, window); // true
    array[0].order; // 1
    array[2].order; // 2

### forEach

.forEach(callback[, thisObject])

参数的使用与 `every` 完全相同，同样**不会**直接改变原数组。

不同的是 `forEach` 会遍历数组中的所有元素，且恒定返回 `undefined` (或者说无返回值)。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.forEach(function (item, index, currentArray) {
        item.order++;
        return item.order > 1;
    }, window); // undefined
    array[0].order; // 1
    array[2].order; // 3


### map

.map(callback[, thisObject])

参数的使用与 `every` 完全相同，同样**不会**直接改变原数组，同样遍历数组中的所有元素。

不同的是，回调函数的返回值会填充到一个新数组中，作为 `map` 的返回值。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.map(function (item, index, currentArray) {
        item.order++;
        return item.order > 1;
    }, window); // [false, true, true]
    array[0].order; // 1
    array[2].order; // 3

### filter

.filter(callback[, thisObject])

方法的作用是过滤原数组元素，如果回调函数的返回值的布尔运算结果是 `true` ，
那么把原数组的当前元素的副本添加到新数组中，并作为 `filter` 方法的返回值。
参数同 `every` 。

    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
    ];
    var result = array.filter(function (item, index, currentArray) {
        item.order++;
        return item.order > 1;
    }, window); // [{"order":2},{"order":3}]

### indexOf

.indexOf(searchElement[,fromIndex])

查找第一个与搜索元素相同的元素的索引值。如果未找到返回-1。

判断是否相同用的是 `===` 的标准。

可以用第二个参数指定起始索引参考，但是浏览器对此参数的支持还不是很到位。

    var array = [1, 2, 1];
    array.indexOf(1); // 0
    var array = [
        { order: 0 },
        { order: 1 },
        { order: 2 }
     ];
    array.indexOf(1); // -1
    array.indexOf({order: 2}); // -1
    array.indexOf(array[2]); // 2

    array = [, undefined, null];
    array.indexOf(null); // 2

### lastIndexOf

.lastIndexOf(searchElement[,fromIndex])

查找最后一个与搜索元素相同的元素的索引值。如果未找到返回-1。

### reduce

.reduce(callback[,initialValue])

从左开始迭代处理数组，主要体现在回调函数的使用上。

回调函数会在数组的每一项上做操作，每次返回的值是下一次的precious。是处理promise的一个好工具，具体参见专门 promise 的那篇文章。

回调函数的四个参数如下代码所示：

    // 二维数组扁平化
    var array = [[1, 2], [3, 4]];
    var flatten = array.reduce(function (previousValue, currentItem, index, currentArray) {
        // 当有 initialValue 参数时，index的初始值为0，previousValue的初始值是 initialValue
        // 否则 index的初始值为1，previousValue为第一项
        return previousValue.concat(currentItem);
    },[10, 20]); // [10, 20, 1, 2, 3, 4]
    // firstPreviousValue

    // 求和
    array = [0, 1, 2, 3, 4];
    var sum = array.reduce(function (previousValue, currentItem, index, currentArray) {
        // 当无 firstPreviousValue 参数时，index的初始值为1，previousValue的初始值是数组的第一项
        return previousValue + currentItem;
    }); // 10

另外使用 `reduceRight` 方法时，回调函数处理数组每一项的顺序是从后到前。

### reduceRight

.reduceRight(callback[,initialValue])

从右开始迭代处理数组

## 杂项

### array 的址引用

`push`一个对象进数组时，实际上是址引用。
结合 `indexOf` 和 `lastIndexOf` 方法可做组件间的交叉配置。

    var o = {
        name: ''
    };
    var array = [o];
    array.push(o);
    array[0] === array[1]; // true
    o.nickname = '';
    array[1].nickname; // ''

关于数组的引用特性我们进一步研究一下，先写如下代码：

    var array = [1, 2];
    var temp = array;

那此时的 `temp` 变量的值一定是 `[1, 2]`，那如果我们如下操作之后 `temp` 的值如何呢？

    array.length = 0;

由于 `array` 是对象，`array` 与 `temp` 指向同一个变量地址，
所以当 `array` 改变时 `temp` 也会随着改变，所以最终 `temp`的值是 `[]` 空数组。

如果我们不做 `length` 赋零值的操作换用下面一种操作方式，`temp`的值又如何呢？

    array = [];

先说答案：`temp` 的值依然是 `[1, 2]`。
那为什么和上面不一样了呢？
因为数组变量本身是一种指向，像C的指针或者一种址引用的概念。
当对数组变量做局部改变时，数组变量会寻址找到实际的数据进行改变；
当对数组变量重新赋值时，是改变数组变量的指向。
具体结合本例可以这样解释：`array` 和 `temp` 指向了同一份数据 `[1, 2]`，
当我们通过 `array.length` 改变 `[1, 2]` 为 `[]` 时 `temp` 的值自然改变了，
当我们将 `array` 指向另一份数据 `[]` 时，`temp`自然就不会改变了。

我们再进一步研究, `array.length = 0;` 这样的操作引起了什么变化，
`array` 指向的那份数据会有怎样的改变，数据项会释放吗？看下面代码，其中的 `temp` 的值执行完是什么？

    var array = [1];
    var temp = array[0];
    array.length = 0;

答案是：`1`。那如果将 `1` 换成一个对象 `{name: "LongZe"}` 呢?

### slice黑魔法

js中有两种类数组，`arguments` 和 `getElementsBy...` 获取的dom对象集合。
要将类数组转换成为数组有一个简单的办法：
 
    [].slice.call(类数组);
    // 或者
    Array.prototype.slice.call(类数组);

slice本是一个提取数组元素的方法，在提取的时候会从this对象下拿一个元素的队列（包括数组和类数组两种形式），
再从这个队列中根据参数取出n个（n大于等于零）元素放入一个新数组，最后返回这个新数组。
对于对象，放入是以址引用的方式添加关联。

在IE8及以下的浏览器中此方法不能使用，需要一个一个的转到数组中。

## 参考

常规部分的参考来自 
[w3school的array部分](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)。

ECMA5Script部分的参考来自
[ECMA-262号官方文档](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)