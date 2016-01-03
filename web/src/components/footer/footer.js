/**
 * Created by zhaoxiaoqiang on 15/12/23.
 */
var Vue = require('vue');
var template = require('./footer.tpl');

// 依赖的样式
require('./footer.css');

var footer = Vue.extend({
    template: template
});

module.exports = footer;