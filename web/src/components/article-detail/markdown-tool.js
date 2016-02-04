/**
 * 配置 markdown 文档的自定义渲染方式
 * 注：此文件中提到的渲染指将 markdown 文档按照一定规则生成 html 的过程
 *
 * Created by zhaoxiaoqiang on 15/12/11.
 */

var marked = require('../../dep/marked.js');

// markdown 转成 html
var renderer = new marked.Renderer();
var options = {
    renderer: renderer
};
// 在本文件的 mark 函数中会添加 renderOptions 属性

/**
 * 重写链接的渲染方式
 *
 * @param {string} href 链接地址
 * @param {string} title 链接 title
 * @param {string} text 链接文本
 *
 * @returns {string} 渲染后的 a 标签
 */
renderer.link = function (href, title, text) {
    // 传统拼接字符串，对应下面 ES6 拼接字符串
    var attrStr = ''
        + ' href="' + href + '"'
        + (title === null ? '' : ' title="' + title + '"')
        + ' target="_blank"';
    return '<a' + attrStr + '>' + text + '</a>';
};

/**
 * 重写图片的渲染方式
 * 图片路径以 ./img/img.png 开头渲染为 /articles/license/./img/img.png
 * 图片路径直接写相对路径 img/img.png 渲染为 /articles/license/img/img.png
 * 以 / , http:// , https:// 开头 的路径视为绝对路径不做处理
 *
 *
 * @param {string} src 图片地址
 * @param {string} title 图片 title
 * @param {string} alt 图片加载失败的替代文字
 *
 * @returns {string} 渲染后的 img 标签
 */
renderer.image = function (src, title, alt) {
    // 浏览器端，由于是单页应用所以需要做图片路径的重写
    if (typeof window !== 'undefined') {
        var regexp = /^[\/|https?:\/\/]/;
        // 不以 / , http:// , https:// 开头的路径视为相对路径，对单页应用需要做路径处理
        if (!regexp.test(src)) {
            var articlePath = options.renderOptions.articlePath;
            src = articlePath + src;
        }
    }
    if (title === null) {
        title = '';
    }
    // TODO 配置 babel-loader ，使用 ES6 新特性
    //else {
    //    title = ` title="${title}"`;
    //}
    //
    //if (alt === null) {
    //    alt = '';
    //}
    //else {
    //    alt = ` alt="${alt}"`;
    //}

    // ES6 拼接字符串
    // var html = `<img src="${src}"${alt}${title}>`;
    // 没搞定 babel-loader 的配置 暂时还用字符串拼接
    else {
        title = ' title="' + title + '"';
    }

    if (alt === null) {
        alt = '';
    }
    else {
        alt = ' alt=' + alt + '"';
    }

    var html = '<img src="' + src + '"' + alt + title + '>';
    return html;
};

/******************** 重写各级标题的渲染方式 ********************/
var headerIdPrefix = 'header-'; // 生成 id 时添加的前缀
// 设置此额外节点是为了防止一篇文章有多个一级标题
// 同时也为一级标题树立一个悬挂的位置
var rootNode = {
    text: '根节点',
    level: 0,
    children: [],
    id: headerIdPrefix,
    parentNode: null
};
// 上一个标题，采用外部标量的形式存储，
// 因为标题在标题树的位置直接和上一个标题有关
var preNode = rootNode;
/**
 * 重写各级标题的渲染方式
 * 渲染时会改变此函数的外部变量 rootNode 的值，得到层级化之后的标题树
 *
 * @param {string} text 标题文字
 * @param {Number} level 标题级别
 *
 * @returns {string} 渲染后的 h1-h6 标签
 */
renderer.heading = function (text, level) {
    var html;
    var preLevel = preNode.level;
    var currentNode;
    // 同级(与前一个相比，下同)
    if (level === preLevel) {
        currentNode = createHeaderNode(text, level, preNode.parentNode);
    }
    // 下一级或多级(如果目录不规范有可能一级后直接三级)
    else if (level > preLevel) {
        while (level - preLevel > 0) {
            currentNode = createHeaderNode(null, ++preLevel, preNode);
        }
        currentNode.text = text;
    }
    // 上一级或多级
    else {
        // 找同级
        while (level < preNode.level) {
            // 这里的 preNode 暂借用为临时存储变量
            preNode = preNode.parentNode;
        }
        currentNode = createHeaderNode(text, level, preNode.parentNode);
    }

    html = '<h' + level + ' id="' + currentNode.id + '">'
        + text
        + '</h' + level + '>\n';
    return html;
};

/**
 * 创建标题节点数据对象
 *
 * @param {string|null} text 标题文本，
 *                           为 null 是为了兼顾文档不规范出现标题跳级现象，
 *                           (如一级标题之后直接出现三级标题)
 *                           但树结构不能出现断层的现象，所以做兼容
 * @param {Number} level 标题层级
 * @param {Object} parentNode 上一级标题节点
 *
 * @returns {Object} newNode  新节点
 */
function createHeaderNode(text, level, parentNode) {
    var idSpace = parentNode.level === 0 ? '' : '-';
    var newNode = {
        level: level,
        id: parentNode.id + idSpace + (parentNode.children.length + 1),
        children: [],
        parentNode: parentNode
    };
    parentNode.children.push(newNode);
    if (text !== null) {
        newNode.text = text;
    }
    preNode = newNode;
    return newNode;
}

/**
 * 渲染 markdown 文档
 *
 * @param {string} mdContent md 文档内容
 * @param {Object} renderOptions 对渲染的配置参数
 * @returns {Object} 渲染生成的html 文本和 副产品数据组成的对象
 *                   {htmlContent: string, headerTree: Array}
 */
function mark(mdContent, renderOptions) {
    // 开始一篇文章时清零根节点的子节点
    rootNode.children = [];
    // 这种写法有隐患
    options.renderOptions = renderOptions;
    var htmlContent = marked(mdContent, options);
    return {
        htmlContent: htmlContent,
        headerTree: rootNode.children
    };
}

module.exports = {
    mark: mark
};