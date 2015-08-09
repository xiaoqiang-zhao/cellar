/**
 * Created by zhaoxiaoqiang on 15/8/2.
 */
define('b', function () {
    return {
        name: 'a'
    };

    // id是可选参数，用来定义模块的key，一般不推荐手动编辑id，而是压缩时自动产生。此Demo用于展示了这种错误。

    // 模块加载器都有缓存已加载模块的特性，二次加载的时候从缓存中拿，而其索引或依据就是这个id。
});