# String 这货

> 项目中最常用的一种数据，没有之一，你真的了解它吗？看完这篇，写的都是基础中的基础 -- 那些一定要这道的基础！

## 创建String的两种方法

    var str1 = '';
    var str2 = new String();

两种创建方法创建出来的字符串会有这样的差别:

    typeof str1;  // "string"
    typeof str2;  // "object"

有的编码规范中甚至明确表示禁止用第二种方式来创建字符串
（因为第二种相对于第一种确实没有任何优势），
但是如果是写js库或者框架就需要用另一种方式来判断是否是字符串类型了：

    Object.prototype.toString.call(str1) ;  // "[object String]"
    Object.prototype.toString.call(str2);   // "[object String]"

## ES3 下的方法和属性

### length

.length

字符串的一个重要的只读属性

    'abc'.length;    // 3

### replace

.replace(regexp/substr, replacement)

在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

regexp/substr
必需。规定子字符串或要替换的模式的 RegExp 对象。请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。

replacement	必需。一个字符串值。规定了替换文本或生成替换文本的函数。

    'a,b,c'.replace(',', '-');    // "a-b,c"
    'a,b,c'.replace(/,/, '-');    // "a-b,c"
    'a,b,c'.replace(/,/g, '-');   // "a-b-c"

正则的解释在这里就不展开了，请看[另外一份文档RegExp](../regexp/main.md)

### split

.split(separator, howmany)

把一个字符串分割成字符串数组。

separator	必需。字符串或正则表达式，用该参数分割字符串。

howmany	可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

    ',a1a,b2b,c3c'.split(',', 2);    // ["", "a1a"]

### slice

.slice(start,end)

提取字符串的某个部分，并以新的字符串返回被提取的部分。

start	要抽取的片断的起始下标。
如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。
也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。

end	紧接着要抽取的片段的结尾的下标。
若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。
如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

    'abc'.slice(1, 2);      // "b"
    'abc'.slice(2, 1);      // ""
    'abc'.slice(1);         // “bc"
    'abc'.slice(-2, -1);    // "b"
    'abc'.slice(-1);        // "c"

### substring

.substring(start,stop)

提取字符串中介于两个指定下标之间的字符。

start	必需。一个非负的整数，规定要提取的子串的起始位置。

stop    可选。一个非负的整数，比要提取的子串的最后一个字符在被提取字符串中的位置多 1。
如果省略该参数，那么返回的子串会一直到字符串的结尾。

    'abc'.slice(1, 2);        // "b"
    'abc'.substring(1, 2);    // "b"
    'abc'.substring(2, 1);    // "b"

start大于stop依然可以提取到字符串。start没有负数。

### substr

.substr(start,length)

从起始索引号提取字符串中指定数目的字符。

start	必需。要抽取的子串的起始下标。
必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length	可选。子串中的字符数。必须是数值。
如果省略了该参数，那么返回从开始位置到结尾的字串

    'abc'.substr(2, 1);    // "c"

### match

.match(searchvalue/regexp)

在字符串内检索指定的字符串片段或正则匹配，另外如果参数不是正则会将参数转换成正则再继续，所以如果你只想匹配字符串，请注意转译的问题，参看下面代码的第5条。

    'abc'.match('a');               // ["a"]
    'abc'.match('a-c');             // null
    'abc'.match('[a-c]');           // ["a"]
    '[a-c]bd'.match('[a-c]');       // ["a"]   
    '[a-c]bd'.match('\\[a\\-c\\]'); // ["[a-c]"]  第5条
    'abc'.match('/[a-c]/g');        // null
    'abc'.match(/[a-c]/g);          // ["a", "b", "c"]

### search

.search(stringObject/regexp)

检索字符串中指定的子字符串，并返回位置，匹配方式和需要注意的点同上面的 `match`。另外如果你的目的就是获取字符串的位置，用下面的 `indexOf` 是一个更好的选择。

    'abc'.search(/[a-c]/g);    // 0
    'abc'.search('a');         // 0
    'abc'.search('[a-c]');     // 0
    'abc'.search('d');         // -1

### indexOf

.indexOf(searchvalue,fromindex)

searchvalue	必需。规定需检索的字符串值。

fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

    'abc'.indexOf('b', 0);    // 1
    'abc'.indexOf('b', 1);    // 1

可以用第二个参数提高性能，fromindex 为非正整数时视为零。

### lastIndexOf

.lastIndexOf(searchvalue, fromindex)

返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

searchvalue	必需。规定需检索的字符串值。

fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符处开始检索。

### charAt

.charAt(index)

返回指定位置的字符。

index	必需。表示字符串中某个位置的数字，即字符在字符串中的下标。

注意：字符串中第一个字符的下标是 0。
如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。

    'abc'.charAt(2);      // "c"
    'abc'.charAt(1);      // "b"
    'abc'.charAt(5);      // ""
    // 字符串或参数为空或undefined或null或false都会被视为0
    'abc'.charAt('b');    // "a"
    'abc'.charAt();       // "a"
    'abc'.charAt(true);   // "b" ，true会被转为1

### charCodeAt

.charCodeAt(index)

返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。

index	必需。表示字符串中某个位置的数字，即字符在字符串中的下标。

    'a\na'.charCodeAt(0);    //97
    'a\na'.charCodeAt(1);    //10
    'a\na'.charCodeAt(2);    //97

转义字符会被当做一个字符来处理

### toLowerCase

.toLowerCase()

返回一个新的字符串，将所有大写字符全部被转换为了小写字符。

    var a = 'AbC';
    var b = a.toLowerCase(); // a的值为AbC，b的值为abc

另外还有个方法 `.toLocaleLowerCase()` 按照本地方式把字符串转换为小写。
只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 `.toLowerCase()` 一样。

### toUpperCase

.toUpperCase()

返回一个新的字符串，将所有小写字符全部被转换为了大写字符。

    var a = 'AbC';
    var b = a.toUpperCase(); // a的值任为AbC，b的值为ABC

另外还有个方法 `.toLocaleUpperCase()` 按照本地方式把字符串转换为大写。
只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 `.toUpperCase()` 一样。

### concat

.concat(stringX, ..., stringX)

连接两个或多个字符串。

stringX	必需。将被连接为一个字符串的一个或多个字符串对象。

    'abc'.concat('d', new String('e'));    // "abcde"
    var a = 'abc'; a.concat('d');          // a的值依然是abc

### fromCharCode

String.fromCharCode(numX, ..., numX)

接受一个指定的 Unicode 值，然后返回一个字符串。

    String.fromCharCode(97, 98, 99);    // "abc"

### localeCompare

.localeCompare(target)

用本地特定的顺序来比较两个字符串。

（ECMAscript 标准并没有规定如何进行本地特定的比较操作，它只规定该函数采用底层操作系统提供的排序规则。）

    'b'.localeCompare('a');    // 1
    'b'.localeCompare('b');    // 0
    'b'.localeCompare('c');    // -1
    'b'.localeCompare('B');    // -1

## 转为特定html的几个方法

由原生方法转html要比拼接字符串或者用Array join要快很多。

### link

.link(url)

添加a标签，参数为链接地址

    'abc'.link('#name');             // "<a href="#name">abc</a>"
    'abc'.link('http://baidu.com');  // "<a href="http://baidu.com">abc</a>"

### anchor

.anchor(anchorname)

添加a标签，通过a标签的name生成锚点

    'abc'.anchor('anchorName');    // "<a name="anchorName">abc</a>"
    'abc'.anchor();                // "<a name="undefined">abc</a>"

关于锚点的使用在这里简述：

我们先描述清楚“跳到锚点”的含义：跳到锚点其实是通过移动滚动条将目标呈现在可视区，
如果目标及其后面的内容大于等于一屏，那么目标位于可视区的最上方（包括padding和border，不包括margin），
否则滚工条滑到最页面底部。
如果目标在被两层元素包裹并且都有滚动条那会怎样？

怎样跳到锚点？像下面这样定义，当用户点击时就会跳到锚点。

    <a href="#anchorName">点击跳到锚点“abc”</a>

用js跳到锚点的方法

    location.hash = 'anchorName';


### italics

.italics()

添加i标签，转为斜体

    'abc'.italics();    // "<i>abc</i>"

### strike

.strike()

添加strike标签，为文字添加删除线

    'abc'.strike();    // "<strike>abc</strike>"

### big

.big()

添加big标签，相当于font-size:larger;

    'abc'.big();    // <big>abc</big>

### small

.small()

添加small标签，缩小文字大小

    'abc'.small();    // "<small>abc</small>"

### bold

.bold()

添加b标签，加粗文字

    'abc'.bold();    // "<b>abc</b>"

### fontcolor

.fontcolor()

添加font标签，定义字体颜色

    'abc'.fontcolor('red');    // "<font color="red">abc</font>"
    'abc'.fontcolor('333');    // "<font color="333">abc</font>"

### fontsize

.fontsize()

添加font标签，定义文字大小

    'abc'.fontsize('14');      // "<font size="14">abc</font>"
    'abc'.fontsize('14px');    // "<font size="14px">abc</font>"
    'abc'.fontsize('14em');    // "<font size="14em">abc</font>"


### fixed

添加tt标签，显示为打印机字体

    'abc'.fixed();    // "<tt>abc</tt>"

### blink

添加blink标签，使字体闪动。
但是由于blink标签没有别列入规范，浏览器兼容性也无法保证，所以不建议使用

    'abc'.blink();    //"<blink>abc</blink>"

### sup

添加sup标签，把字符串显示为上标。

    'abc'.sup();    //<sup>abc</sup>

### sub

添加sup标签，把字符串显示为下标。

    'abc'.sub();    //<sub>abc</sub>

## 参考

[w3school的array部分](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

[ECMA-262号官方文档](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)