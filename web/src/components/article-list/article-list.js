/**
 * 文章列表页模块
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */
var Vue = require('vue');
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
                // 按时间排序
                data.sort(function (item1, item2) {
                    return item2.createDate - item1.createDate;
                });
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