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
require('./article-detail.less');
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
                me.listenWindowScrollEvent();
            }
        });

        return {
            htmlContent: '',
            headerTree: [],
            isOpenHeaders: !this.isPhone() // 手机上关闭，PC 上打开
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
        },
        // 关闭目录
        closeHeaders: function () {
            this.$data.isOpenHeaders = false;
        },
        // 是否是手机(宽度小于800的视为手机)
        isPhone: function () {
            var isPhone = false;
            if ($(window).width() < 800) {
                isPhone = true;
            }
            return isPhone;
        },
        // 监听 body 滚动条
        listenWindowScrollEvent: function () {
            var me = this;
            var window$ = $(window);

            var timmerId;
            window$.scroll(function () {
                clearTimeout(timmerId);
                timmerId = setTimeout(function () {
                    var scrollTop = window$.scrollTop();
                    me.respondScrollChange(scrollTop);
                }, 10);
            });
        },
        // 对滚动条的滚动做出见面上的相应
        respondScrollChange: function (scrollTop) {
            var header = $(this.$els.header);
            var headerUl = $(this.$els.headerUl);
            var window$ = $(window);
            var headerHeight = $('.page-header').height();
            // 临界值,15是头部和内容的间距
            var criticalValue = headerHeight + 15;
            var top = 0;
            // 文章目录悬浮
            if (scrollTop > criticalValue) {
                // 加 4 是为了使顶部有 4px 间隔
                top = (scrollTop - criticalValue + 4) + 'px';
                // 减 10 是将间隔计算进去
                // 10 = 4(顶部间距) + 4(底部间距) + 2(上下边框)
                var windowHeight = window$.height() - 10;
                var headerHeight = header.outerHeight();

                var styleClass = 'scroll';
                // 文章目录高度超过可视高度
                if (headerHeight >= windowHeight) {
                    headerUl.css({
                        //
                        height: (windowHeight - 41) + 'px'
                    });
                    headerUl.addClass(styleClass);
                }
                else {
                    headerUl.removeClass(styleClass);
                }
            }
            // 重置定位，悬浮和不悬浮的定位逻辑一样
            header.css({
                top: top
            });
        }
    }
});


module.exports = articleDetail;