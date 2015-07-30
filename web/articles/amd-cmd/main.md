# AMD & CMD

## 杂谈

模块化是指在解决某一个复杂问题或者一系列的杂糅问题时，依照一种分类的思维把问题进行系统性的分解以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块的方式。可以想象一个巨大的系统代码，被整合优化分割成逻辑性很强的模块时，对于软件是一种何等意义的存在。对于软件行业来说：解耦软件系统的复杂性，使得不管多么大的系统，也可以将管理，开发，维护变得“有理可循”。

要用模块化设计，就要有规范和系统作为支撑，而且至少支撑起下面三点：

1. 定义封装模块。
2. 定义新模块对其他模块的依赖。
3. 支持引入其他模块。

话说天下大势分久必合，合久必分，时势造英雄。在js模块化的历史舞台上出现了三位豪杰他们分别扛起了三竿大旗：CommonJS，AMD（Asynchronous Module Definition），CMD（Common Module Definition）。

## 历史

2009年，美国小伙儿Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。

后来就有人想把

参考与: [阮一峰 - Javascript模块化编程](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

## 定义模块语法

## 不同点

## 模块解析的流程

## 压缩前后

## 参考文章

[阮一峰 - Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

[阮一峰 - Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

[http://blog.chinaunix.net/uid-26672038-id-4112229.html](http://blog.chinaunix.net/uid-26672038-id-4112229.html)