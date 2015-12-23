/**
 * 程序入口
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

var Vue = require('./dep/vue.js');
var VueRouter = require('./dep/vue-router.js');

var template = require('./main.tpl');
var vm = new Vue({
    el: document.body,
    replace: false,
    template: template
});

console.log(VueRouter);