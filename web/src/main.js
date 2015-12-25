/**
 * 程序入口
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

// 依赖的库
var Vue = require('./dep/vue.js');
var VueRouter = require('./dep/vue-router.js');

// 样式重置
require('./dep/normalize.css');

var template = require('./main.tpl');
var header = require('./components/header/header.js');
// var footer = require('./component/header/header.js');

var body = document.body;
var app = new Vue({
    el: body,
    replace: false,
    template: template,
    components: {
        'header-c': header
    }
});

// 路由配置
Vue.use(VueRouter);
var router = new VueRouter();
var articleList = require('./components/article-list/article-list.js');
var articleDetail = require('./components/article-detail/article-detail.js');
router.map({
    '': {
        component: articleList
    },
    '/articles': {
        component: articleList
    },
    '/articles/:id': {
        component: articleDetail
    },
    '/articles/:id/:header': {
        component: articleDetail
    }
});

router.start(Vue.extend({}), body);