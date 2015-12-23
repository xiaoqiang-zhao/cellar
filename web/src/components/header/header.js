/**
 * Created by zhaoxiaoqiang on 15/12/23.
 */
var Vue = require('../../dep/vue.js');
var template = require('./header.tpl');

// 依赖的样式
require('./header.css');
require('../icon/menu-button.css');

var header = Vue.extend({
    template: template
});

module.exports = header;