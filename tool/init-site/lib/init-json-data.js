/**
 * 初始化每篇文章的 data.json 文件
 * (采用同步处理，因为后续操作需要依赖此结果)
 *
 * Created by zhaoxiaoqiang on 15/10/15.
 */
var fs = require('fs');
var config = require('./config.js');
var marked = require('./marked.js');

var defaultJson = {
    "title": "",         // 标题
    "introduction": "",  // 引言
    "tags": [            // 文章标签
        "基础"
    ],
    "state": "",         // 文章状态
                         // 立项,[腹稿中],[资料收集中],[自我持续集成中],[公示持续集成中],[完结],
                         // [修正添加中]
    "public": false,     // 是否处于公示状态
    "type": "md",        // md / html / none
    "createDate": "",    // 创建时间(毫秒数)
    "md5": "",           // 通过md5验证内容的改变
    "commentList": [     // 评论
        ""
    ],
    "todoList": [        // 未来要做的

    ]
};

/**
 * 初始化每篇文章的 data.json 文件
 * (采用同步处理，因为后续操作需要依赖此结果)
 * (的)
 *
 * @param {Array} articleArr 文章列表
 */
function initDataJson (articleArr) {
    var jsonStr = JSON.stringify(defaultJson, null, 2);
    articleArr.forEach(function (article) {
        var jsonDataFilePath = article.folderPath + '/data.json';

        // 文件不存在或设置了覆写，直接添加或覆写文件
        if (!fs.existsSync(jsonDataFilePath) || config.jsonDataRewrite === true) {
            // 写文件
            fs.writeFileSync(jsonDataFilePath, jsonStr, config.encoding);
        }

        // 读取 data.json 的文件内容
        var jsonData;
        try {
            jsonData = JSON.parse(fs.readFileSync(jsonDataFilePath, config.encoding));
        }
        catch (err) {
            console.log(jsonDataFilePath + '读取为json格式失败。');
            return;
        }

        // 根据文档修改标题和描述信息
        var mdFilePath = article.folderPath + '/main.md';
        if (fs.existsSync(mdFilePath)) {
            jsonData.type = 'md';
            var mdContent = fs.readFileSync(mdFilePath, config.encoding);

            // var htmlContent = marked(mdContent);

            // 提取标题
            var matchTitleResult = mdContent.match(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/);
            if (matchTitleResult !== null) {
                jsonData.title = matchTitleResult[2];
            }
            else {
                jsonData.title = '标题缺失';
            }

            // 提取描述
            // var matchIntroductionResult = mdContent.match(/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/);
            var execIntroductionResult = /^( *>[^\n]+(\n(?! *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))[^\n]+)*\n*)+/m.exec(mdContent);
            if (execIntroductionResult !== null) {
                jsonData.introduction = execIntroductionResult[0].replace(/(^ *> ?)|(\n$)/gm, '');
            }
            else {
                jsonData.introduction = '未找到描述信息';
            }

            var jsonDataStr = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync(jsonDataFilePath, jsonDataStr, config.encoding);
        }

    });

    console.log('data.json初始化完成');
}

module.exports = initDataJson;