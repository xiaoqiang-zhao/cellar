# 常用 CSS 片段收集

> 提供简写和非简写两种方式，有点小洁癖的可以采用了简写的方式，多人协作的长期项目建议采用非简写简明知意。另外简写容易造成冲突，按字母顺序排列样式能在一定层度上减少这种冲突，所以下面的样式都是按字母顺序排列的，另外简写的一般规则是 “属性-属性值-修饰”，表意的CSS片段取首字母缩写。可以更具自己的项目定制此文件的部分或全部，无需任何许可。一些实例：[DEMO](demo/demo.html)，也可下载[dem/css.css](demo/css.css)直接使用。

## 清除浮动

这是一个很不错的解决方案，兼容IE6与现代浏览器，理论部分查看：
[那些年我们一起清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)

    /* 清除浮动 */
    .c-f,
    .clear-float {
        zoom: 1; /* 兼容IE7及以下 */
    }
    .c-f:after,
    .clear-float:after {
        content: "\200B";
        display: block;
        height: 0;
        clear: both;
    }

## 可点击
其实就是鼠标以上后形状变成手型。
    
    /* 可点击 */
    .c-p,
    .cursor-pointer {
        cursor: pointer;
    }
## 可移动
其实就是鼠标以上后形状变成十字移动图形。

    /* 可移动 */
    .c-m,
    .cursor-move {
        cursor: move;
    }    
    
## 数据为空
   
只写一个空的div就可以实现数据为空的页面提示。
    
    /* 数据为空,只兼容到IE8及以上 */
    .d-e,
    .data-empty {
        text-align: center;
        color: #a8a8a8;
        padding: 5px 0;
    }
    .d-e:after,
    .data-empty:after {
        content: "数据为空";
    }

## 隐藏

隐藏元素推荐使用class来操作，这样便于显示时还原display的值，另外加上body来提高优先级使适用范围更广泛。

    /* 隐藏 */
    body .hide {
        display: none;
    }
    
## 不被内容撑大的table

常用的table形式，不被撑大，内容优先自动折行。

    /* 不被撑大的table */
    .t-f,
    .table-fixed {
        table-layout: fixed;
        word-wrap: break-word;
    }

## 超出截断

不折行，超出部分截断，并以三个点结尾。`white-space` 是一个可以继承的属性（上层元素定义之后下层元素会自动继承），如果与 `word-wrap` 和 `word-break` 相遇，并且 `white-space: nowrap` 时，页面表现为不折行。

    /* 超长截断,只兼容到IE8及以上 */
    .to-e,
    .text-overflow-ellipsis,
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; /* 强制不换行 */
    }

## 被激发元素上浮

鼠标hover、拖动等场景常遇到元素上浮使其不被覆盖的需求，通过z-index来实现，在一处定义可以避免不同模块之间相互覆盖。此CSS片段的命名是一种属性和表意的混合模式。因为直接命名“active”表意容易冲突，用属性模式的到的名会是“zi-2”丧失了良好的扩展性（如果要把2000提升到5000需要改页面）。另外如果业务逻辑中鼠标hover需要元素上浮可以直接往上加，

    /* 被激发元素上浮 */
    .zi-a,
    .z-index-active,
    .model-a .item:hover/* 业务累加示例 */ {
        z-index: 2000;
    }
    
## 自动折行

一般块式容器汉字和英文默认都会自动折行，只有url这种连续的英文字母片段需要设置折行，word-wrap单词结束折行，word-break不管单词是否结束到容器末尾立即折行。值得注意的是word-wrap也可以对连续英文字符串折行，所以实践中首选word-wrap。
    
    /* 自动折行 */
    .ww-bw,
    .word-wrap-break-word {
        word-wrap: break-word;
        white-space: normal;
    }

这里补充 `white-space: normal;` 是因为其继承的特性，为了使程序更健壮这一行在某些情况下会是冗余的。