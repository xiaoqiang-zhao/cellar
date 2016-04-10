/**
 * 文章详情页模块
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

var Vue = require('vue');
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
        var articlePath = '/articles/' + this.$route.params.id + '/';
        // 获取文章详情的 md 文档
        $.ajax({
            url: articlePath + 'main.md',
            success: function (data) {
                data = markdownTool.mark(data, {
                    articlePath: articlePath
                });
                me.$data.htmlContent = data.htmlContent;
                var headerTree = [];
                if (data.headerTree.length > 0) {
                    headerTree = data.headerTree[0].children;
                    me.$data.headerTree = headerTree;
                }
                listenWindowScrollEvent();
            }
        });

        return {
            htmlContent: '',
            headerTree: [],
            isOpenHeaders: true,
            closeHeadersStyle: 'height: 40px;'
        };
    },
    methods: {
        // 点击标题列表，滚动滚动条到对应内容处
        scrollToHeaderContent: function (event) {
            var headerId = event.target.getAttribute('data-value');
            var headerDom = document.getElementById(headerId);
            document.body.scrollTop = headerDom.offsetTop - 10;
        },
        // 展开目录
        openHeaders: function () {
            this.$data.isOpenHeaders = true;
            this.$data.closeHeadersStyle = '';
        },
        // 关闭目录
        closeHeaders: function () {
            this.$data.isOpenHeaders = false;
            this.$data.closeHeadersStyle = 'height: 40px;';
        }
    }
});

// 监听 body 滚动条
function listenWindowScrollEvent() {
    var selector = '.article-detail-page-container > aside';
    var window$ = $(window);
    var headerHeight = $('.page-header').height();
    // 临界值
    var criticalValue = headerHeight + 15;

    function respondScrollChange(scrollTop) {
        var aside = $(selector);
        var top = 0;
        // 文章目录悬浮
        if (scrollTop > criticalValue) {
            // 加 4 是为了使顶部有 4px 间隔
            top = (scrollTop - criticalValue + 4) + 'px';
            var headerList = aside.find(' > div');
            var windowHeight = window$.height();
            var headerListHeight = headerList.outerHeight(true) - 2;

            var styleClass = 'scroll';
            // 文章目录高度超过可视高度
            if (headerListHeight + 15 > windowHeight) {
                // 减 10 是为了底部有 4px 间隔，
                // 10 = 4(顶部间距) + 4(底部间距) + 2(上下边框)
                headerList.css({
                    height: (windowHeight - 10) + 'px'
                });
                headerList.addClass(styleClass);
            }
            else {
                headerList.removeClass(styleClass);
            }
        }
        // 重置定位，悬浮和不悬浮的定位逻辑一样
        aside.css({
            top: top
        });
    }

    var timmerId;
    window$.scroll(function () {
        clearTimeout(timmerId);
        timmerId = setTimeout(function () {
            var scrollTop = window$.scrollTop();
            respondScrollChange(scrollTop);
        }, 10);

    });
}

module.exports = articleDetail;