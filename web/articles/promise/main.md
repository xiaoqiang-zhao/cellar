# promise

## JS 中的 Promise 是什么？

是符合Promise协议的对象。支持情况：浏览器方面最新版的 Chrome、Firefox、safari都已经原生支持；Node也原生支持；只有IE不支持。

## 要解决什么问题？ 

Callback hell，回调金字塔，回调黑洞，随便怎么叫吧，就是异步编程产生的回调层层嵌套。用前端常见的jQuery Ajax举例代码如下：

    // 顶层回调
    ajax({
        url: 'url1',
        success: function (data1) {
        
            // 第二层回调
            ajax({
                url: 'url2',
                success: function (data2) {
                
                    // 第三层回调
                    ajax({
                        url: 'url3',
                        success: function (data3) {
                            // 三层数据全部加载完毕，在这里我们可以用data1 到 data3 了
                        }
                    });
                }
            });
        }
    });

## 看看用jQuery在前端实现异步的几种方式

    $.ajax({
        url: '/login2',
        success: function (data) {
            console.log('1--' + data.info);
        },
        error: function () {
            console.log('1--粗错鸟');
        }
    });
    
这是最常用的一种，通过参数来定义成功和失败的回调函数，这种方法代码可读性比较好。

    $.ajax({
        url: '/login'
    }).done(function (data) {
        console.log('2--' + data.info);
    }).fail(function () {
        console.log('2--粗错鸟');
    });

这种方法的可读性和上面差不多，优势在于减少了一层缩进。

    $.ajax({
        url: '/login'
    }).then(
            function (data) {
                console.log('3--' + data.info);
            },
            function () {
                console.log('3--粗错鸟');
            }
    );
    
为了使代码更直观，我用这种格式突出then接受两个函数作为参数，他们分别相当于第一种的success和error，或者第二种的done和fail。改变格式后缩进层次和第二种一样（如下面代码），他的优势是已经进入Promise规范体系，then的后面还可以继续有then，用这种方式可以解决回调金字塔的问题，具体Promise怎么用请接着往下看：

    $.ajax({
        url: '/login'
    }).then(function (data) {
        console.log('3--' + data.info);
    }, function () {
        console.log('3--粗错鸟');
    });
    
## 什么时候适合用Promise？

异步操作必须保证调用的先后顺序，而且是一项完成后才能执行下一项这种场景，最好是个个异步操作间没有数据交互的那种。举个简单的例子：登录是一个异步，获取当前登录用基本信息（用户名，头像等）户是一个异步，不用传参的方式可以降低耦合，而且这样定义接口更单例一些。

下面是示例代码（为了方便解释用注释为then的回调函数做一下标记）：

    $.ajax({
        url: '/login'
    }).then(function (data) { // then1
        console.log(data.info);
        return $.ajax('/get-current-user-info');
    }).then(function (data) { // then2
        console.log('用户名:' + data.data.name);
    });

## 有哪些坑？

上面代码的then是依次执行，然后形成回调队列，队列中的函数执行时机和细节有几个需要注意的点：

 - 参数 ：

then1在第一个异步数据请求收到服务器数据反馈后执行，上面说过then接受两个函数作为参数，第一个在成功后执行，第二个在失败后执行。then1中的两个函数都可以接收到上一个异步的参数，但是到了then2的两个函数中就已经接收不到login返回的数据了。这里就出现了第一个坑，怎么在后面的回调中使用前面的数据？（回头看回调金字塔，就没有这个问题）核心的思想就一个 -- 保存在外面用的时候同意从外面拿。简单的借助命名空间，向下面这样：

    var user = {};
    $.ajax({
        url: '/login'
    }).then(function (data) {
        user.id = data.data;
        return $.ajax('/get-current-user-info');
    }).then(function (data) {
        user.name = data.data.name;
    });

复杂一点就是借助框架，backbone 或 avalon 的 model。

 - 队列
 
第一个then中有return，把return删掉发现依然可以运行，只是获取不到当前登录用户的信息，这就是第二个坑。如果then中的回调函数不返回Promise实例后面的then中的回调函数就会继续执行，但我们的本意是上一个异步完成再执行下一个then，这样才符合回调金字塔的调用逻辑和顺序。对于这个坑有两点注意

一、一个异步完成后做的操作要放在一个then中，放在多个then中会立即顺序执行，而且从异步后的第二个的then开始不能直接拿到异步返回的参数。

二、then队列要返回Promise实例，否则后面的then就不是异步执行了。

## 不适合用Promise

异步A 和 异步B，A B都完成后执行C。

## 勉强适用

异步A，A完成后执行多个互不相干的异步。

## 封装符合Promise协议的对象

    function Obj() {
    
        var p = new Promise(function (resolve, reject) {
            
            // 异步
            setTimeout(function() {
                // ...

                resolve(nameList);
            }, 2000);
        });

        return p;
    }

可以向p添加属性和方法，注意不要覆盖then，catch，chain方法。还需要注意的一点就是浏览器原生Promise实例化的时候至少需要一个函数作为参数。catch 方法用于捕获最后的异常，chain方法还没搞明白怎么用，欢迎补充。chain？

## jQuery.Deferred

jQuery.Deferred是一个工厂方法，用以生产符合Promise规范的实例。Promise规范的内容相对简单，Deferred返回的东西是一个更加丰富的东西。

    var p = $.Deferred(function (promise) {
        // 异步
        setTimeout(function () {
            promise.resolve();
        }, 2000);
    });
    
    p.then(function () {
        console.log('resolve1');
    }, function () {
        console.log('reject');
    }).then(function () {
        console.log('resolve2');
    }).done(function () {
        console.log('done1');
    }).done(function () {
        console.log('done2');
    }).always(function () {
        console.log('always1');
    }).always(function () {
        console.log('always2');
    });

resolve 可以触发then的第一个回调、done、always，触发的顺序和定义的顺序一致。另外resolve方法不是定义回调的，而是触发回调的。reject同理，always可被resolve和reject触发。

## 最后
综合使用的研究在research.html 和 research.js中，分别模拟浏览器端和node端。research-jq.html 中是对jQuery中Promise的研究。

[一篇很不错的译文](http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/)

## 声明

欢迎各方转载，但请注明出处：[https://github.com/longze/cellar/blob/master/web/articles/promise/main.md](https://github.com/longze/cellar/blob/master/web/articles/promise/main.md)
