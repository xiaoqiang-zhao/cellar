# JS 数据类型

五种简单数据类型：Null、Undefined、Boolean、Number、String。

一种复杂数据类型：Object（包括Function、Array、Date、Regexp四种衍生的数据类型）

## undefined与null

Null与Undefined的值在整个浏览器中都只有一个实例，在跨frame的环境依然相等。另外Null与Undefined并不对浏览器开放，所以编码时并不能使用他们。

    null === window.frames['frameName']._null;    // true
    // 需要注意的是在frame加载完成后再做判断
    // IE7+ 验证通过

所以判断这两个值直接用 `===` 来判断。

高级程序设计有这样的叙述，undefined派生自null， 所以 `==` 会相等。
其中的派生一说应该是从语言的底层实现而言的。
我试了很多办法都没有办法验证派生一说，JS中的派生（集成）可以用下面这种思路检验

    function f() {};
    f instanceof Function;     // true
    f instanceof Object;       // true
    Function instanceof Object // true
    // 其他派生（集成）可以直接用这个验证，
    undefined instanceof null  // Throw Error
    // 但是用在undefined与null上报错

undefined 与 null 在js中是一对特别的的宝贝儿，某些特性可以用编译语言的静态类类比，但又不完全等同于静态类。如果一定要按派生顺序排序的话，我猜大概是这样：Undefined，Null，Object。由于前两者不可访问，所以不能放在 instanceof 的右端。

几个备忘

    /* -------------  特别的undefined  -------------*/
    undefined instanceof Object;    // false
    typeof undefined;               // "undefined"  
    
    /* -------------  双面的undefined  -------------*/
    null instanceof Object;         // false
    typeof null;                    // "object"
    
    undefined instanceof null;      // 报错

以上的技巧都是奇技淫巧，代码中劲量少用一些让人费解的判定。变量未声明或者未赋值时是 undefined，我们利用这个做参数的或者返回值的检查；而null是逻辑值，无论在什么情况下都没有将一个变量显式地赋值为 undefined，所以保存对象的变量或属性初始值应该设置为 null，这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分 null 和 undefined。

## boolean

类型判断 boolean `instance` 这条路并不好走：

    1 instanceof Number;                // false
    new Object(1) instanceof Number;    // true

这里有一个技巧如下：

    Object.prototype.toString.call(1);              // "[object Number]"
    Object.prototype.toString.call(new Object(1));  // "[object Number]"
    Object.prototype.toString.call(NaN);            // "[object Number]"

还有这样两个方法

    var a = NaN; b = a; a == b;    // false
    isNaN(NaN);      // true 由于NaN与本身都不相等，所以判断NaN只有这一个函数可用
    isFinite(2);     // true
    isFinite('2');   // true
    isFinite('2a');  // false
    // 如果是有限数字（或可转换为有限数字），那么返回 true。
    // 否则，如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。

补充一点：对任何值调用 `Boolean()` 都会返回一个布尔值。

    // 对于字符串，空字符串为false，其他的为true
    Boolean('');              // false
    Boolean(new String(''));  // true，这样生成的空字符串对象绝对是个特例

    // 对于数字，0和NaN为false，其他的为true
    Boolean(NaN);           // false
    Boolean(new Number(0)); // true 字符串的特例在此处也适用

    // 对对象，null为false，其他的为true，上面两个特例可以归结于此
    Boolean(null);          // false

    // 对undefined恒定发了se
    Boolean(undefined);     // false

