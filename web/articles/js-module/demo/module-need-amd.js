/**
 * Created by zhaoxiaoqiang on 15/8/2.
 */
define(function() {
    // 按需加载
    return {
        fn: function () {
            require(['module-json'], function (moduleJson) {
                // 模块加载后执行的代码
            });
        }
    }
});

//define(function( require, exports){
//    // 按需加载
//    exports.fn = function () {
//        require(['module-json'], function (moduleJson) {
//            // 模块加载后执行的代码
//        });
//    }
//});