# String 这货 - 2

## 转为特定html的几个方法

由原生方法转html要比拼接字符串或者用Array join要快很多

### .link(url)

添加a标签，参数为链接地址

    'abc'.link('#name');    //"<a href="#name">abc</a>"
    'abc'.link('http://baidu.com');    //"<a href="http://baidu.com">abc</a>"

### .anchor(anchorname)

添加a标签，通过a标签的name生成锚点

    'abc'.anchor('anchorName');    //"<a name="anchorName">abc</a>"
    'abc'.anchor();    //"<a name="undefined">abc</a>"

关于锚点的使用在这里简述：

我们先描述清楚“跳到锚点”的含义：跳到锚点其实是通过移动滚动条将目标呈现在可视区，
如果目标及其后面的内容大于等于一屏，那么目标位于可视区的最上方（包括padding和border，不包括margin），
否则滚工条滑到最页面底部。
如果目标在被两层元素包裹并且都有滚动条那会怎样？

怎样跳到锚点？像下面这样定义，当用户点击时就会跳到锚点。

    <a href="#anchorName">点击跳到锚点“abc”</a>

用js跳到锚点的方法

    location.hash = 'anchorName';


### .italics()

添加i标签，转为斜体

    'abc'.italics();    //"<i>abc</i>"

### .strike()

添加strike标签，为文字添加删除线

    'abc'.strike();    //"<strike>abc</strike>"

### .big()

添加big标签，相当于font-size:larger;

    'abc'.big();    //<big>abc</big>

### .small()

添加small标签，缩小文字大小

    'abc'.small();    //"<small>abc</small>"

### .bold()

添加b标签，加粗文字

    'abc'.bold();    //"<b>abc</b>"

### .fontcolor()

添加font标签，定义字体颜色

    'abc'.fontcolor('red');    //"<font color="red">abc</font>"
    'abc'.fontcolor('333');    //"<font color="333">abc</font>"

### .fontsize()

添加font标签，定义文字大小

    'abc'.fontsize('14');      //"<font size="14">abc</font>"
    'abc'.fontsize('14px');    //"<font size="14px">abc</font>"
    'abc'.fontsize('14em');    //"<font size="14em">abc</font>"


### .fixed()

添加tt标签，显示为打印机字体

    'abc'.fixed();    //"<tt>abc</tt>"

### .blink()

添加blink标签，使字体闪动。
但是由于blink标签没有别列入规范，浏览器兼容性也无法保证，所以不建议使用

    'abc'.blink();    //"<blink>abc</blink>"

### .sup()

添加sup标签，把字符串显示为上标。

    'abc'.sup();    //<sup>abc</sup>

### .sub()

添加sup标签，把字符串显示为下标。

    'abc'.sub();    //<sub>abc</sub>

## 参考

[w3school的array部分](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

[ECMA-262号官方文档](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)