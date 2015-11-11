# js 模块化

## 杂谈

模块化是指在解决某一个复杂问题或者一系列的杂糅问题时，依照一种分类的思维把问题进行系统性的分解以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块的方式。可以想象一个巨大的系统代码，被整合优化分割成逻辑性很强的模块时，对于软件是一种何等意义的存在。对于软件行业来说：解耦软件系统的复杂性，使得不管多么大的系统，也可以将管理，开发，维护变得“有理可循”。

要用模块化设计，就要有规范和系统作为支撑，而且至少支撑起下面三点：

1. 定义封装模块。
2. 定义新模块对其他模块的依赖。
3. 支持引入其他模块。

话说天下大势分久必合，合久必分，时势造英雄。在js模块化的历史舞台上出现了三位豪杰他们分别扛起了三竿大旗：CommonJS，AMD（Asynchronous Module Definition），CMD（Common Module Definition）。下面聊聊"Javascript模块化编程"这一江湖事。

在 Node.js之前其实已经有让js跑在服务器上的尝试。在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块才能与操作系统和其他应用程序互动，否则根本没法编程。其中BravoJS提供了这样的支持，并在推广过程产生了模块定义的规范名曰 CommonJs，但鲜为人知，直到2009年，美国小伙儿Ryan Dahl创造了Node.js项目，将javascript语言用于服务器端编程，Node.js的模块系统，就是参照CommonJS规范实现的。这标志"Javascript模块化编程"正式涉足江湖（其实在深山老林里已经修炼多年只是鲜有人知）。在CommonJS中，有一个全局性方法require()，用于加载模块，假定有一个数学模块math.js，就可以像下面这样加载和调用：
       
    var math = require('math');
    math.add(2,3); // 5

但不幸的是CommonJs对浏览器端不适用。因为要调用 `math` 要调用因此必须等 `math.js` 加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。

面对这样的问题，一位大侠站了出来，他就是James Burke，此人练成一种神功名曰 `RequireJs`，又总结了心得出了一本内功心法名曰 `AMD`，他的口号是“我的神功可以复制”，话说大侠心法还还真不是浪得虚名，江湖后辈根据此心法又有多人练成神功，比如[curl.js](https://github.com/cujojs/curl)、 [esl.js](https://github.com/ecomfe/esl/)。关于`RequireJs`的详细锻造过程被记录在了[GitHub](https://github.com/jrburke/requirejs)上，从记录中我们可以看到 `first commit(首次提交)` 的时间是2009.8.28。

长江后浪推前浪，又过了一年（软件行业发展就是快，不像武侠小说一过就是20年），一位来自中国的少侠名曰玉伯出来叫板 `RequireJs`，并创出另一种神功 `SeaJs`，同时根据这一神功也出了一种心法名曰 `CMD`，从此JS模块化的江湖再度腥风血雨，孰正孰邪只能交给历史来评论了，这里就不再引述王婆自卖自夸的吆喝和那些无法证实的流言了。`SeaJs` 的`first commit(首次提交)` 的时间是2010.12.29。

## CommonJs

CommonJs 属于服务器端的模块化规范，内容也较多，请移步[node的模块化](../node-module/main.md)。本文最后给出兼容前后端的模块定义方法，如果想深入理解之一部分内容，或者多Node.js开发感兴趣建议移步阅读，当然对本文内容了解并不依赖于“node的模块化”。

## AMD 与 CMD 的相同点

都是模块加规范，倡导模块化开发理念，核心价值是让 JavaScript 的模块化开发变得简单自然。

对于不依赖其他模块的模块，在定义上是相同的：

**字符串**

可以直接把字符串作为一个模块，如果出现第二个参数，第一个是模块ID。
(demo参见[demo/demo-str.html](demo/demo-str.html))

    define('<div>{{data}}</div>');

**JSON**

无依赖模块可以直接使用对象字面量来定义。
(demo参见[demo/demo-json.html](demo/demo-json.html))

    define({ 
        attr: 'attr',
        fun: function () {
        }
    });

**回调 / 工厂**

这种方法最常见，变式也最多。

    define(id?, factory);
    
id是可选参数，用来定义模块的key，一般不推荐手动编辑id，而是压缩时自动产生。[demo/demo-id.html](demo/demo-id.html) 展示了这种错误。模块加载器都有缓存已加载模块的特性，二次加载的时候从缓存中拿，而其索引或依据就是这个id。向外提供接口的几种形式(demo参见[demo/demo-exports.html](demo/demo-exports.html))：

    // 直接用 return 返回
    define(function () {
        return { 
            attr: 'attr',
            fun: function () {
            }
        };
    });

    // 向 exports 逐项添加属性和方法
    define(function (require, exports, module) {
        exports.attr = 'attr';
        exports.fun = function () {
        };
    });

    // 通过 module.exports 整体赋值属性和方法
    define(function (require, exports, module) {
        module.exports = { 
            attr: 'attr',
            fun: function () {
            }
        };
    });

需要注意的是下面的方法是不可以的。

    define(function (require, exports, module) {
        exports = { 
            attr: 'attr',
            fun: function () {
            }
        };
    });

##  AMD 与 CMD 的不同点
    
**提前加载/依赖管理**

提前加载，或者叫依赖管理，就是当前模块要运行需要其他模块先就位，需要依赖其他模块，而不是简单的调用关系或触发模式。

在AMD下定义依赖如下
(demo参见[demo/demo-dep-amd.html](demo/demo-dep-amd.html))：

    define(['module-a'], function(moduleA){
        return moduleA;
    });
    
在CMD下定义依赖如下
(demo参见[demo/demo-dep-cmd.html](demo/demo-dep-cmd.html))：
    
    define(function(require){
        var moduleA = require('module-a');
        return moduleA;
    });

AMD 的依赖是在 define 中提前定义好的，加载完成依赖后初始化当前模块；
CMD初始化模块的第一步是扫描当前模块，将依赖提取出来并提前加载，加载完成后再从头开始执行回调完成模块初始化并返回对外调用的接口。CMD 下模块的回调函数的形参第一个参数是 require。如果上面AMD的代码段放在CMD的环境下执行，那么 moduleA 这一形参实际上是 require。

异步中的同步：在AMD中，如果确定模块已经加载完成，可采用同步模式方式引入。下面的模块依赖于模块 b ，所以在执行下面模块的回调时 b 模块已经加载完成，所以可以采用同步模式。但是不推荐这种写法，因为他会使依赖变得不稳定。这里之所以提是因为事无绝对，在项目中可以使用这种方法来引入公共js库，但如果做业务无关的公共模块应该避免这种写法。

    define(['b'], function(){
        var b = require('b');
        return b;
    });

上面这种写法很容易误解为CMD的写法，但是如果在以SeaJs作为模块管理器的CMD环境下运行会报 require 未被初始化。RequireJs 有局部 'require' 与 全局 'require' 之分（通过控制台可以查看，下面代码已给出示例），但是全局的 'require' 并不是 AMD 规范要求的，但是有了它可以少写一些代码，所以在具体的项目中可做为一种备选方案，但是如果开发公共模块则要尽量避免这样使用。
 
**按需加载的方式**

按需加载，也就是用到的时候再加载，此处的“用到”指类似用户从导航进入一个新模块，这种情况再大一点的项目中做模块拆分打包很有必要，因为 All in One 的打包方式会使首页加载很多暂时用不到的模块，系模块较多时首页加载会明显变慢。

AMD 的按需加载形式：
    
    define(function (require, exports) {
        // 按需加载
        exports.fn = function () {
            require(['module-json'], function (moduleJson) {
                // 模块加载后执行的代码
            });
        }
    });

CMD 的按需加载形式：
    
    define(function (require) {
        // 按需加载
        return {
            fn: function () {
                require.async('module-json', function (moduleJson) {
                    // 模块加载后执行的代码
                    console.log(moduleJson.name);
                });
            }
        }
    });

CMD 对于按需加载提的接口是 `require.async`，而 AMD 的接口是 `require`。

补充：虽然 require 有全局变量作为补充，但是 exports 和 module 并没有，所以如果没有形参，那么 exports 和 module 也不可以在模块中使用。
(demo参见
[demo/demo-amd-need.html](demo/demo-amd-need.html)
与
[demo/demo-cmd-need.html](demo/demo-cmd-need.html)
)

## 兼容方案

如果依赖其他模块，兼容方案并不可取，如果作为独立模块可以兼容AMD，CMD，CommonJs规范，这对于一些DOM无关的工具模块非常适用。下面是朴灵给出的兼容方案：

    (function (name, definition) {
        // 检查上下文是否为AMD或CMD
        var hasDefine = typeof define === 'function';
        var hasExports = typeof module !== undefined && module.exports;
    
        // AMD 或 CMD 环境
        if (hasDefine) {
            define(definition);
        }
        // 定义为Node模块
        else if (hasExports) {
            module.exports = definition();
        }
        // 将模块的执行结果挂在this下（在浏览器中this指向window）
        else {
            this[name] = definition();
        }
    })('moduleName', function () {
        var module = {};
        // 业务代码...
        // 将当前模块的对外方法和对外属性挂在 module 下
        
        return module;
    });

## 参考文章

[AMD 规范](https://github.com/amdjs/amdjs-api/wiki/AMD)

[CMD 规范](https://github.com/seajs/seajs/issues/242)

[阮一峰 - Javascript模块化编程（一）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

[阮一峰 - Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

[ JavaSript模块规范 - AMD规范与CMD规范介绍 ](http://blog.chinaunix.net/uid-26672038-id-4112229.html)

[使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)

[ES6新特性 - 刘哇勇](http://www.cnblogs.com/Wayou/p/es6_new_features.html)

[AMD 和 CMD 的区别有哪些 - 知乎 - 玉伯](http://www.zhihu.com/question/20351507)

[与 RequireJS 的异同 - Git - Wiki](https://github.com/seajs/seajs/issues/277)

[SeaJS与RequireJS最大的区别 - 豆瓣](http://www.douban.com/note/283566440/)

[LABjs、RequireJS、SeaJS 哪个最好用？为什么？](http://www.zhihu.com/question/20342350)

[让我们再聊聊浏览器资源加载优化](http://qingbob.com/let-us-talk-about-resource-load/)

[css 模块化插件](http://segmentfault.com/a/1190000002390643)

[玩转AMD(2) - 应用实践](http://div.io/topic/910)
