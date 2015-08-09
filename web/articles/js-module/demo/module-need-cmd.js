/**
 * Created by zhaoxiaoqiang on 15/8/2.
 */
define(function (require) {
    // 按需加载
    return {
        fn: function () {
            require.async(['module-json'], function (moduleJson) {
                // 模块加载后执行的代码
                console.log(moduleJson.name);
            });
        }
    }
});

//
//define(function( require, exports){
//    // 按需加载
//    exports.fn = function () {
//        require.async(['module-json'], function (moduleJson) {
//            // 模块加载后执行的代码
//        });
//    }
//});