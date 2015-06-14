# 先将avalon用起来

## 官网 

官网:[http://avalonjs.github.io/](http://avalonjs.github.io/)

社区:[http://rubylouvre.github.io/mvvm/avalon.api.html](http://rubylouvre.github.io/mvvm/avalon.api.html)

Git仓库地址:[https://github.com/RubyLouvre/avalon](https://github.com/RubyLouvre/avalon)

## 入门Demo一单项绑定

通过输入框改变：html文本节点内容、差值表达式、内存。

ViewModel，通过avalon.define来定义，动态绑定DOM。
通过 ms-controller 来指定绑定的vm。

demo-1：[./demo-1.html](./demo-1.html)

## 入门demo二遍历

列表间数据和对象的相互影响。

ms-repeat 和 ms-each 都可以对数组和对象进行遍历，
{{el}} 引用数组的项，{{$key}} 和 {{$val}} 引用对象的key和value。
对象的一级属性修改可以被DOM监控到，但是数组项的改变不会直接反应到DOM上。

demo-2：[./demo-2.html](./demo-2.html)

## 监控数组

要想让数组的改变可以被监控到可以用set等方法来操作。

在官网上找下面这些方法的使用介绍：
pushArray，remove，removeAt，removeAll，clear，ensure（不存在时才添加），size（用来操作length）。

demo-3：[./demo-3.html](./demo-3.html)

## watch 

通过$watch来监听属性的改变，可以在期间做一些加工，或者手动触发其他事件。

demo-watch，对手机号的一些监听：[./demo-watch.html](./demo-watch.html)

watch的另外一个用法就是监听第二级属性的改变，应为默认状态下ViewModel只能监听到一级属性的改变。
还有数组长度的变化也可以通过watch来监听。

## fire

ViewModel之间的时间传递机制，是一种广播机制，
广播的定位与DOM的结构是一样的，方向有三种：up、down、all。
触发时可以指定改变值。

demo-fire：[./demo-fire.html](./demo-fire.html)

## scan 

扫描DOM树，avalon默认在domReady时，从body开始扫描一次，以后自己动态添加了新内容，需要自己手动scan。

## 其他

还有其他重要的API，在官网可以查到全集，
[http://avalonjs.github.io/#zh/apis/index.html](http://avalonjs.github.io/#zh/apis/index.html)，


