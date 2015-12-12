/**
 * Created by zhaoxiaoqiang on 15/12/11.
 */

var marked = require('./marked.js');

// markdown 转成 html
var renderer = new marked.Renderer();
var options = {
    renderer: renderer
};
// 链接
renderer.link = function (href, title, text) {
    var attrStr = ''
        + ' href="' + href + '"'
            // + ' title="' + title + '"'
        + ' target="_blank"';
    return '<a' + attrStr + '>' + text + '</a>';
};

// 文章各级标题
var headerIdPrefix = 'header-'; // 生成 id 时添加的前缀
// 设置此额外节点是为了防止一篇文章有多个一级标题
var rootNode = {
    text: '根节点',
    level: 0,
    children: [],
    id: headerIdPrefix,
    parentNode: null
};
var preNode = rootNode;
renderer.heading = function (text, level) {
    var html;
    var preLevel = preNode.level;
    var idSpace;
    var parentNode;
    var currentNode = {
        text: text,
        level: level,
        children: []
    };
    // 同级(与前一个相比，下同)
    if (level === preLevel) {
        parentNode = preNode.parentNode;
        idSpace = parentNode.level === 0 ? '' : '-';
        currentNode.id = parentNode.id + idSpace + (parentNode.children.length + 1);
        currentNode.parentNode = parentNode;
        parentNode.children.push(currentNode);
    }
    // 下一级或多级(如果目录不规范有可能一级后直接三级)
    else if (level > preLevel) {
        while (level - preLevel > 0) {
            parentNode = preNode;
            idSpace = parentNode.level === 0 ? '' : '-';
            currentNode = {
                level: ++preLevel,
                id: parentNode.id + idSpace + (parentNode.children.length + 1),
                children: [],
                parentNode: preNode
            };
            preNode.children.push(currentNode);
            preNode = currentNode;
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
        parentNode = preNode.parentNode;
        idSpace = parentNode.level === 0 ? '' : '-';
        currentNode.id = parentNode.id + idSpace + (parentNode.children.length + 1);
        currentNode.parentNode = parentNode;
        parentNode.children.push(currentNode);
    }
    preNode = currentNode;

    html = '<h' + level + ' id="' + currentNode.id + '">'
        + text
        + '</h' + level + '>\n';
    return html;
};

function mark(mdContent) {
    // 开始一篇文章时清零根节点的子节点
    rootNode.children = [];
    var htmlContent = marked(mdContent, options);
    return {
        htmlContent: htmlContent,
        headerTree: rootNode.children
    };
}

module.exports = {
    mark: mark
};