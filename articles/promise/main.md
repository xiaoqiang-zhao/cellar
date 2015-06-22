# promise

## 要解决的问题 

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
    
promise需要保证顺序？ Yes

但是返回的结果可以相互调用吗？

有一个失败触发的事件吗？

有最终的事件吗？

有序异步队列解决方案。