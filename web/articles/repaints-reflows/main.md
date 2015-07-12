# 浏览器的重绘(repaints)与重排(reflows)

> 这是一篇从其他网站整理而来的文章，原文地址：[http://www.css88.com/archives/4991#more-4991](http://www.css88.com/archives/4991#more-4991)。写页面时间久一点（专职一年以上，或者间断积累购一年）开始注意到浏览器对页面的原理，DOM树、渲染树、重绘、重排、layout等概念开始进入视野，从零散的概念，到各种布局和Hack，到打通这些概念需要一个时间上的积累和思考。

## 加载和渲染流程

我们从浏览器加载HTML文档、CSS和js文件开始说起。浏览器从上

## 验证流程

我们用实验的方法来验证流程

    document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法. 
    function subSomething() 
    { 
        if(document.readyState == “complete”) //当页面加载状态 
        myform.submit(); //表单提交 
    } 
    
    0: (Uninitialized) the send( ) method has not yet been invoked. 
    1: (Loading) the send( ) method has been invoked, request in progress. 
    2: (Loaded) the send( ) method has completed, entire response received. 看不到
    3: (Interactive) the response is being parsed.  能看到
    4: (Completed) the response has been parsed, is ready for harvesting. 能看到
    
    翻译成中文为: 
    0 － （未初始化）还没有调用send()方法 
    1 － （载入）已调用send()方法，正在发送请求 
    2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
    3 － （交互）正在解析响应内容 
    4 － （完成）响应内容解析完成，可以在客户端调用了

## 牢骚

上面这些是 HTML + CSS 的一个技术瓶颈，也是区别新手和成手的一个指标，因为这些是那些有关联样式的一个理论支撑。在这方面如果一个面试者可以从头到位给你解释清楚那给工资的时候就不要小气了。因为这种人不是一个经验用三年的那种，会主动思考，会把页面当成一种工业艺术，他工作通常不是只为了钱而是一种境界的追求。

