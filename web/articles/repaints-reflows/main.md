# 浏览器的重绘(repaints)与重排(reflows)

> 这是一篇从其他网站整理而来的文章，原文地址：[http://www.css88.com/archives/4991#more-4991](http://www.css88.com/archives/4991#more-4991)。写页面时间久一点（专职一年以上，或者间断积累购一年）开始注意到浏览器对页面的原理，DOM树、渲染树、重绘、重排、layout等概念开始进入视野，从零散的概念，到各种布局和Hack，到打通这些概念需要一个时间上的积累和思考。

## 加载和渲染流程

我们从浏览器加载html文档、css和js文件开始说起。

1. 浏览器从上到下依次对文档进行扫描。
2. 现代浏览器中文件的请求是顺序发出的，不是等到上一个请求完成才请求下一个。
3. 对于内嵌的js片段，如果前面有未加载完成的js或css，要等到前面的js和css都加在完成才执行；如果前面没有未加载完成的js和css文件，js片段立即执行。
4. 对HTML解析后形成DOM树，通过第二条我们可以猜到对HTML的解析是从头执行到尾，中间并不会因为有文件未加载完成而停止生产DOM树，所以在Body的最末端（甚至在HTML之后，当然这并不规范也完全没有必要）就是DOM树完成的位置；但是各种框架ready或domReady并不是指这个，而是指所有的css和js文件都加载完成之后；对于判断的原理会涉及到`DOMContentLoaded`、`onreadystatechange`、`readyState`和IE9与FF3.6之前浏览器的各种坑，有机会再写篇专题吧。
5. 渲染开始于DOM树生成完成，且所有的css文件加载完成之后，只有开始渲染页面上才开始出现东西，如果有css文件未完成加载那么页面一片空白。js写在慢css之前是可以执行的，但有什么用呢，让用户面对一片空白的页面，还不如js放在最后，给css的加载多留点时间。这也就是雅虎给的14条军规
- 当遇到CSS的文件引用时，浏览器会停下来直到加载完成（此时页面一片空白）才会继续向后扫描。
- 遇到其他节点时放入DOM树，如果是需要下载文件的节点，比如带有 `src` 属性的 `script`，或者    `img`标签，再或者 `iframe` 标签，把需要下载的文件让如一个下载队列中，如果遇到内嵌在页面中的js片段js会立即执行（可以用 `document.write` 方法输出html片段），

## 验证流程

通过服务器延时返回这里构造了对静态文件的慢请求，再配合调整顺序和肉眼观察，下面依次对上面的几条做验证。

1. 这条比较基础稍作解释：上面的js片段不做回调处理访问不到下面的DOM节点，静态文件的引用反映在服务器上的响应顺序大体也是相同的，之所以说大体相同是因为网络的的不确定性会有后发先至的情况。实例 test-1.html。

2. 我们在页面写入两个慢请求，分别是CSS文件请求和JS文件请求，在服务器端响应CSS慢请求并3秒后返回，JS慢请求5秒后返回，我们观察到服务器几乎同时接到浏览器的请求，同时浏览器端从刷新页面到JS执行的时间是5秒而不是8秒。实例 test-2.html。

3. 验证这条稍微复杂一点，我们先验证**“如果js片段前面有未加载的css文件,js片段要等css文件加载完成才执行”**，这一条很多人会漏掉需要特别关注，讲一个慢请求的css放在js片段前面，刷新页面后发现只有css加载完成，才执行js，详细参见test-3-1.html；明白了上面一条，“如果js片段前面有未加载的js文件,js片段要等js文件加载完成才执行”这条就不多做解释了，参见test-3-2.html；“如果前面没有未加载完成的js和css文件，js片段立即执行”要验证这一条只需要把上面验证代码稍作顺序上的调整就可以，详情参见test-3-3.html 和 test-3-4.html。

4. ready回调中的js在慢js执行后执行，详情参见test-4.html。

5. ，详情参见test-5.html。

>test-3-1.html 关键代码

    <link rel="stylesheet" href="/demo/slowCSS3"/>
    <script>
        alert('?');
        document.write('如果前面有未加载的css,js要等加载css加载完成才能执行');
    </script>
    
>test-3-3.html 关键代码

    <div class="a">
        <script>
        document.write('如果前面没有未加载完成的js和css文件，js片段立即执行。');
        </script>
    </div>
    <script src="/demo/slowJS5"></script>

> test-4.html 关键代码

    <script>
        $(document).ready(function () {
            alert('$(document).ready');
        });
    </script>
    <script src="/demo/slowJS5"></script>



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

