/**
 * 文章列表页模块
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */
var Vue = require('../../dep/vue.js');
var $ = require('../../dep/jquery-2.1.4.js');
var template = require('./article-list.tpl');

// 依赖的样式
require('./article-list.css');
require('../icon/tag.css');

var articleList = Vue.extend({
    data: function () {
        var me = this;
        $.ajax({
            url: '/articles/published-articles.json',
            success: function (data) {
                //me.$set('list', data);// 下面的效率更高
                me.$data.list = data;
            }
        });

        return {
            list: []
        };
    },
    template: template
});

module.exports = articleList;