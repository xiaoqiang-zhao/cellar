/**
 * 程序入口
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

// 依赖的库
var Vue = require('./dep/vue.js');
var VueRouter = require('./dep/vue-router.js');

// 样式重置
require('./dep/normalize.css');

var template = require('./main.tpl');
var header = require('./components/header/header.js');
// var footer = require('./component/header/header.js');
var vm = new Vue({
    el: document.body,
    replace: false,
    template: template,
    components: {
        'header-c': header
    }
});
