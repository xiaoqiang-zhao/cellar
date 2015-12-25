/**
 * 文章详情页模块
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

var Vue = require('../../dep/vue.js');
var $ = require('../../dep/jquery-2.1.4.js');
var template = require('./article-detail.tpl');
var markdownTool = require('./markdown-tool.js');

// 依赖的样式
require('./prettify.css');
require('./markdown-reader.css');
require('./article-detail.css');
require('../icon/tag.css');

var articleDetail = Vue.extend({
    template: template,
    data: function () {
        var me = this;
        $.ajax({
            url: '/articles/' + this.$route.params.id + '/main.md',
            success: function (data) {
                data = markdownTool.mark(data);
                me.$data.htmlContent = data.htmlContent;
                var headerTree = [];
                if (data.headerTree.length > 0) {
                    headerTree = data.headerTree[0].children;
                    me.$data.headerTree = headerTree;
                }
            }
        });

        return {
            htmlContent: '',
            headerTree: []
        };
    },
    methods: {
        scroll: function (event) {
            var headerId = event.target.getAttribute('data-value');
            var headerDom = document.getElementById(headerId);
            document.body.scrollTop = headerDom.offsetTop - 20;
        }
    }
});

module.exports = articleDetail;