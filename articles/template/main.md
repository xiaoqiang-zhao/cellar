# HTML 模板研究

## 知名的模板引擎收集

按立项的时间大致排列如下：

- tmpl （jq的插件，2005.3.5立项）
[Git](https://github.com/BorisMoore/jquery-tmpl)

- mustache（国外货，独立的模板引擎，2009.10.5立项）
[Git](https://github.com/janl/mustache.js)

- doT(国外货，2011.01.11，只支持v8，应该也可以支持其他现代浏览器)
[Git](http://olado.github.io/doT)

- kissy template（阿里,kissy中的一部分，不具备时间参考性，可以看做是juicer的前身）
[Git](https://github.com/kissyteam/kissy)

- juicer（也是一国产库，2011.6.27立项，貌似也是阿里系的）
[Git](https://github.com/PaulGuo/Juicer)

- BaiduTemplate（百度,2012.04.28）
[Git](http://baidufe.github.io/BaiduTemplate)

- artTemplate（腾讯，2012.06.03立项）
[Git](https://github.com/aui/artTemplate)

## 从预编译的角度研究

tmpl，484行，从预编译的角度看采用的是分段数组push，使用语法如下（原理解释也在其中）：
    
    var movies = [
        {Name: "The Red Violin", ReleaseYear: "1998"}
    ];
    
    var markup = "<li><b>${Name}</b> (${ReleaseYear})</li>";
    
    // 编译模板，并放入队列，名字由用户指定
    // 执行完后可以用 jQuery.template['movieTemplate'] 获取编译后的模板函数
    // 没用作用域的分离，可能冲突
    $.template("movieTemplate", markup);
    
    // 模板和数据结合，再输出到页面
    $.tmpl("movieTemplate", movies).appendTo("#movieList");
    
mustache，613行，多语言模板引擎，语法不是很好，暂不做深入研究。

DoT，140行，号称最快的模板引擎，但是已经很久没有更新了。

juicer，549行，一直在更新，对node也支持良好，作者是淘宝UED团队成员。

BaiduTemplate，216行，到2012.10.30已经基本不更新.

artTemplate，将功能分在多个文件中，逻辑比较清晰，还支持include功能，主干最后更新日期是2014.9.1。