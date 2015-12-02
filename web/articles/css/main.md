# 资料问题

学习CSS的时候遇到点困扰请教一下

有没有一个网站提供CSS的全集

有人给过 http://w3.org这个网站看过，但我没找到入口

我心目中因该是类似这样的CSS3/CSS2/CSS 教程/参考/帮助

http://w3.org中有这个样子的吗？

我看了大漠关于background的那篇文章 CSS秘密花园：图片边框，那获取这些资料的呢...

然后去找，在CSS3/CSS2/CSS 教程/参考/帮助这个网站上找到了大部分，但没有 background-blend-mode 这个，后来在老外的一个网站 background-blend-mode ﾂｷ css ﾂｷ WPD ﾂｷ WebPlatform.org 上找到了

但突然想到不管是大漠的文章还是background-blend-mode ﾂｷ css ﾂｷ WPD ﾂｷ WebPlatform.org这个网站都是二手资料

那么这些资料的源头究竟在哪里呢？

有规范的网站，还是个浏览器厂商有公示站点？

还有发现 background-clip: text; 要加这样的浏览器前缀 -webkit-background-clip: text; 才生效，那么这个信息又怎么查，还是没有什么好的方法，只能打开关注的浏览器挨个测一遍？这个问题我目前找到的最好的解决方案是去这个网站查一下 Can I use... Support tables for HTML5, CSS3, etc ，还有更好的方案吗？

## 我的答案

HTML、CSS、JS 的常用的东西在这里可以找到：

[W3C HTML 网页标准教程](http://www.w3chtml.com/)

中文不过瘾可以看英文的：[W3Schools Online Web Tutorials](http://www.w3schools.com/)

查看浏览器兼容性的一个网站，更新较为及时[caniuse](http://caniuse.com/)

CSS：

[chrome 统计的 CSS 各属性的常用率](https://www.chromestatus.com/metrics/css/popularity)

在开源基金会 Mozilla 官网上查找：
[developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

[验证 CSS 的有效性](http://jigsaw.w3.org/css-validator/#validate_by_input)

JS：

可以在这里找到官方的 pdf 文档，国际标准：
[ecma 国际官网](http://www.ecma-international.org/)

## 结论

CSS3 任需要选择性的使用，大部分支持不完全，只有一小部分可以兼容 IE9 以上的浏览器，稍微多一点的可兼容到 IE11，先把能支持 IE11 的 CSS3梳理一遍，对 JS 采取同样的策略，参考库函数封装原生，达到原始技术的积累。
