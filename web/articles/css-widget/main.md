# CSS 小组件

> 这些年用过的一些小组件，整理收集在此。class命名很接地气，坏处就是容易冲突，如果和其他样式库公用注意冲突的问题。
一些实例：[DEMO](demo/demo.html)，也可下载[dem/css.css](demo/css.css)直接使用。

## 文字按钮

一个看着干净简单的按钮，在动作上又够精致，鼠标移上、按下、抬起以及不可用都有样式响应，另外还有风骚的小动画。在技术上，由于 `active` 这一动态伪类只有在 链接 和 按钮 上才能响应，所以此样式的元素用在 `a`、`button`、`input type="button"` 上才能充分展示按钮的丰富。下面是三种按钮的定义方法：

    <button class="button">button按钮</button>
    <input type="button" value="input按钮" class="button"/>
    <a class="button">a按钮</a>
    
注：伪类定义的顺序上遵循爱恨原则LoVe/HAte,也就是link--visited--hover--active。

## 加减号按钮

用伪类 `before` 和 `after` 做为内部元素来画加减号按钮，简单优雅，使用如下：

    <button class="button icon-plus"></button>
    <button class="button icon-minus"></button>
    <a class="button icon-plus"></a>
    <a class="button icon-minus"></a>

## 输入框

只做了样式上的修饰，用法如下：

    <input type="text" class="input-text"/>

## 下拉框
