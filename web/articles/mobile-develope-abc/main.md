# 移动端站点开发入门

## 设置 Meta 标签

大多数移动浏览器将html页面放大为宽的视图（viewport）以符合屏幕分辨率。你可以使用视图的meta标签来进行重置。下面的视图标签告诉浏览器，使用设备的宽度作为视图宽度并禁止初始的缩放。在<head>标签里加入这个meta标签。

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    // user-scalable = no 属性能够解决 iPad 切换横屏之后触摸才能回到具体尺寸的问题。
    
移动Web页面，为什么都喜欢width=device-width，并且关闭系统缩放功能？
    
这涉及到了移动设备（ios, android）的屏幕尺寸问题，device-width指的是设备的物理宽度，width是页面宽度，这么做是为了兼容更多的设备，当然只通过viewport标签还是不够的，还需要配合Media Query进行响应式设计。

如果你觉得上面的答案不够解释的不过，那可能需要更多的概念和知识的铺垫，请移步进入下面来充电：

[两个viewport的故事（第一部分）](http://weizhifeng.net/viewports.html)

[两个viewport的故事（第二部分）](http://weizhifeng.net/viewports2.html)
    
    