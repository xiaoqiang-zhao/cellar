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
        // 获取文章详情的 md 文档
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
                window.setTimeout(function () {
                    if ($(window).width() > 800) {
                        // 数据改变触发异步回调，所以需要将命令加入异步队列
                        resizeHeaderAndDetailWidth();
                    }
                    listenWindowScrollEvent(me);
                });
            }
        });

        return {
            htmlContent: '',
            headerTree: [],
            isOpenHeaders: false
        };
    },
    methods: {
        // 点击标题列表，滚动滚动条到对应内容处
        scrollToHeaderContent: function (event) {
            var headerId = event.target.getAttribute('data-value');
            var headerDom = document.getElementById(headerId);
            // 可做动画 TODO
            document.body.scrollTop = headerDom.offsetTop - 20;
        },
        // 展开目录
        openHeaders: function () {
            this.$data.isOpenHeaders = true;
            $('.article-detail-headers-container').css('height', 'auto');
        },
        // 关闭目录
        closeHeaders: function () {
            this.$data.isOpenHeaders = false;
            $('.article-detail-headers-container').css('height', '40px');
        }
    }
});

// 从新调整标题和内容的尺寸
function resizeHeaderAndDetailWidth() {
    var articleDetailHeadersContainer$ = $('.article-detail-headers-container');
    var articleDetailContainer$ = $('.article-detail-container');
    var headerWidth = articleDetailHeadersContainer$.width();
    $('.article-detail-container').css({
        'margin-right': (headerWidth + 30) + 'px'
    });
    var contentWidth = articleDetailContainer$.width();
    articleDetailHeadersContainer$.css({
        'margin-left': (contentWidth + 48) + 'px'
    })
}

// 监听 body 滚动条
function listenWindowScrollEvent(vm) {
    var articleDetailHeadersContainer$ = $('.article-detail-headers-container');
    var window$ = $(window);
    window$.scroll(function () {
        var scrollTop = window$.scrollTop();
        var headerHeight = $('.page-header').height();
        var windowWidth = window$.width();
        var windowHeight = window$.height();
        // 临界值
        var criticalValue = headerHeight + 15;
        var css = {};
        // 悬挂布局
        if (scrollTop > criticalValue) {
            var height = window$.height();
            if (articleDetailHeadersContainer$.height() < height) {
                height = 'auto';
            }
            else {
                height += 'px';
            }
            css = {
                position: 'fixed',
                right: 'auto',
                height: height
            };

        }
        // 还原
        else {
            css = {
                position: 'absolute',
                height: 'auto'
            };
        }

        // 处理移动端
        if (vm.$data.isOpenHeaders) {
            var ulHeight = articleDetailHeadersContainer$.find('>ul').outerHeight(true);
            if (ulHeight + 30 > windowHeight) {
                css.height = windowHeight + 'px';
            }
            else {
                css.height = 'auto';
            }
        }
        else if (windowWidth < 800) {
            css.height = '40px';
        }
        if (windowWidth < 800 ) {
            css.right = 0;
        }

        articleDetailHeadersContainer$.css(css);
    });
}

module.exports = articleDetail;