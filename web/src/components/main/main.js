/**
 * 程序入口
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

// 依赖的库
var Vue = require('vue');
var VueRouter = require('vueRouter');

// 样式重置
require('../../dep/normalize.css');
// 组织组件时需要一个容器，这里定义容器的样式(包括响应式)
require('./main.css');

var template = require('./main.tpl');
var header = require('../header/header.js');
var footer = require('../footer/footer.js');

var body = document.body;
var app = Vue.extend({
    el: function () {
        return document.body;
    },
    replace: false,
    template: template,
    components: {
        'header-c': header,
        'footer-c': footer
    }
});

// 路由配置
Vue.use(VueRouter);
var router = new VueRouter();
var articleList = require('../article-list/article-list.js');
var articleDetail = require('../article-detail/article-detail.js');

router.map({
    '': {
        name: 'index',
        component: articleList
    },
    '/articles': {
        name: 'articleList',
        component: articleList
    },
    '/articles/:id': {
        name: 'articleDetail',
        component: articleDetail
    }
});
router.start(app, body);

module.exports = app;