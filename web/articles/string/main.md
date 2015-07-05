# String 这货
String：

## 创建String的两种方法

    var str1 = '';
    var str2 = new String();

两种创建方法创建出来的字符串会有这样的差别:

    typeof str1;  //"string"
    typeof str2;  //"object"

有的编码规范中甚至明确表示禁止用第二种方式来创建字符串
（因为第二种相对于第一种确实没有任何优势），
但是如果是写js库或者框架就需要用另一种方式来判断是否是字符串类型了：

    Object.prototype.toString.call(str1) ;  //"[object String]"
    Object.prototype.toString.call(str2);   //"[object String]"

## length

字符串的一个重要的只读属性

    'abc'.length;    //3

## 常用的几个方法

### .replace(regexp/substr, replacement)

在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

regexp/substr
必需。规定子字符串或要替换的模式的 RegExp 对象。
请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。

replacement	必需。一个字符串值。规定了替换文本或生成替换文本的函数。

    'a,b,c'.replace(',', '-');    //"a-b,c"
    'a,b,c'.replace(/,/, '-');    //"a-b,c"
    'a,b,c'.replace(/,/g, '-');   //"a-b-c"

正则的解释在这里就不展开了，请看[另外一份文档RegExp](regexp.md)

### .split(separator, howmany)

把一个字符串分割成字符串数组。

separator	必需。字符串或正则表达式，从该参数指定的地方分割字符串。

howmany	可选。该参数可指定返回的数组的最大长度。
如果设置了该参数，返回的子串不会多于这个参数指定的数组。
如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

    ',a1a,b2b,c3c'.split(',', 2);    //["", "a1a"]

### .slice(start,end)

提取字符串的某个部分，并以新的字符串返回被提取的部分。

start	要抽取的片断的起始下标。
如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。
也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。

end	紧接着要抽取的片段的结尾的下标。
若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。
如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

    'abc'.slice(1, 2);      //"b"
    'abc'.slice(2, 1);      //""
    'abc'.slice(1);         //“bc"
    'abc'.slice(-2, -1);    //"b"
    'abc'.slice(-1);        //"c"

### .substring(start,stop)

提取字符串中介于两个指定下标之间的字符。

start	必需。一个非负的整数，规定要提取的子串的起始位置。

stop    可选。一个非负的整数，比要提取的子串的最后一个字符在被提取字符串中的位置多 1。
如果省略该参数，那么返回的子串会一直到字符串的结尾。

    'abc'.slice(1, 2);        //"b"
    'abc'.substring(1, 2);    //"b"
    'abc'.substring(2, 1);    //"b"

start大于stop依然可以提取到字符串。start没有负数。

### .substr(start,length)

从起始索引号提取字符串中指定数目的字符。

start	必需。要抽取的子串的起始下标。
必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length	可选。子串中的字符数。必须是数值。
如果省略了该参数，那么返回从开始位置到结尾的字串

    'abc'.substr(2, 1);    //"c"

### .match(searchvalue/regexp)

在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
会将不是正则的参数转换成正则再继续

    'abc'.match('a');        //["a"]
    'abc'.match('a-c');      //null
    'abc'.match('[a-c]');    //["a"]
    'abc'.match('/[a-c]/g'); //null
    'abc'.match(/[a-c]/g);   //["a", "b", "c"]

### .search(regexp)

检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，返回位置。

    'abc'.search(/[a-c]/g);    //0
    'abc'.search('a');         //0
    'abc'.search('[a-c]');     //0
    'abc'.search('d');         //-1

### .indexOf(searchvalue,fromindex)

searchvalue	必需。规定需检索的字符串值。

fromindex	可选的整数参数。规定在字符串中开始检索的位置。
它的合法取值是 0 到 stringObject.length - 1。
如省略该参数，则将从字符串的首字符开始检索。

    'abc'.indexOf('b',0);    //1
    'abc'.indexOf('b',1);    //1

第二个参数只为提高性能。

### .lastIndexOf(searchvalue, fromindex)

返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

searchvalue	必需。规定需检索的字符串值。

fromindex	可选的整数参数。规定在字符串中开始检索的位置。
它的合法取值是 0 到 stringObject.length - 1。
如省略该参数，则将从字符串的最后一个字符处开始检索。



### .charAt(index)

返回指定位置的字符。

index	必需。表示字符串中某个位置的数字，即字符在字符串中的下标。

注意：字符串中第一个字符的下标是 0。
如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。

    'abc'.charAt(2);      //"c"
    'abc'.charAt(1);      //"b"
    'abc'.charAt(5);      //""
    // 字符串或参数为空或undefined或null或false都会被转为0
    'abc'.charAt('b');    //"a"
    'abc'.charAt();       //"a"
    // true会被转为1
    'abc'.charAt(true);   //"b"

### .charCodeAt(index)

返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。

index	必需。表示字符串中某个位置的数字，即字符在字符串中的下标。

    'a\na'.charCodeAt(0);    //97
    'a\na'.charCodeAt(1);    //10
    'a\na'.charCodeAt(2);    //97

转义字符会被当做一个字符来处理

### .toLowerCase()

返回一个新的字符串，将所有大写字符全部被转换为了小写字符。

    var a = 'AbC';
    var b = a.toLowerCase(); // a的值为AbC，b的值为abc

另外还有个方法 `.toLocaleLowerCase()` 按照本地方式把字符串转换为小写。
只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 `.toLowerCase()` 一样。

### .toUpperCase()

返回一个新的字符串，将所有小写字符全部被转换为了大写字符。

    var a = 'AbC';
    var b = a.toUpperCase(); // a的值为AbC，b的值为ABC

另外还有个方法 `.toLocaleUpperCase()` 按照本地方式把字符串转换为大写。
只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 `.toUpperCase()` 一样。

### .concat(stringX, ..., stringX)

连接两个或多个字符串。

stringX	必需。将被连接为一个字符串的一个或多个字符串对象。

    'abc'.concat('d', new String('e'));    //"abcde"
    var a = 'abc'; a.concat('d');          //a的值依然是abc

### String.fromCharCode(numX, ..., numX)

接受一个指定的 Unicode 值，然后返回一个字符串。

    String.fromCharCode(97, 98, 99);    // "abc"

### .localeCompare(target)

用本地特定的顺序来比较两个字符串。

（ECMAscript 标准并没有规定如何进行本地特定的比较操作，它只规定该函数采用底层操作系统提供的排序规则。）

    'b'.localeCompare('a');    // 1
    'b'.localeCompare('b');    // 0
    'b'.localeCompare('c');    // -1
    'b'.localeCompare('B');    // -1

### 其他

`.toString()` 与 `.valueOf()` 都继承自Object。

## 参考

[w3school的array部分](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

[ECMA-262号官方文档](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)