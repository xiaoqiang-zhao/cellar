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
    "enName": "",
    "title": "",           // 标题
    "introduction": "",    // 引言
    "tags": [              // 文章标签
        "基础"
    ],
    "isPublished": false,  // 是否处于发布状态
    "state": "立项",        // 文章状态
                           // 立项,[腹稿中],[资料收集中],[自我持续集成中],[公示持续集成中],[完结],
                           // [修正添加中]
    "type": "md",          // md / html / none
    "createDate": "",      // 创建时间(毫秒数)
    "md5": "",             // 通过md5验证内容的改变
    "commentList": [       // 评论
        ""
    ],
    "todoList": [          // 未来要做的
                           // 已收集了什么还要收集什么，还要集成什么等
    ]
};

/**
 * 初始化每篇文章的 data.json 文件
 * (采用同步处理，因为后续操作需要依赖此结果)
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
        // merge 数据，以现有的为基础，初始化的对象向前合并，方便添加字段
        else {

        }

        // 读取 data.json 的文件内容
        var jsonData;
        try {
            jsonData = JSON.parse(fs.readFileSync(jsonDataFilePath, config.encoding));
        }
        catch (err) {
            console.log(jsonDataFilePath + '读取为json格式失败。       ');
            return;
        }

        // 根据文档修改标题和描述信息
        var mdFilePath = article.folderPath + '/main.md';
        if (fs.existsSync(mdFilePath)) {
            jsonData.type = 'md';
            var mdContent = fs.readFileSync(mdFilePath, config.encoding);

            // 提取标题
            var matchTitleResult = mdContent.match(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/);
            if (matchTitleResult !== null) {
                jsonData.title = matchTitleResult[2];
            }
            else {
                jsonData.title = '标题缺失';
            }

            // 提取描述
            var execIntroductionResult = /^( *>[^\n]+(\n(?! *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))[^\n]+)*\n*)+/m.exec(mdContent);
            if (execIntroductionResult !== null) {
                jsonData.introduction = execIntroductionResult[0].replace(/(^ *> ?)|(\n$)/gm, '');
            }
            else {
                jsonData.introduction = '未找到描述信息';
            }

        }
        // md文件不存在
        else {
            jsonData.title = '未找到md文件';
            jsonData.introduction = '未找到md文件';
        }

        var jsonDataStr = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(jsonDataFilePath, jsonDataStr, config.encoding);
        // 将文章的数据写到文章列表中
        article.jsonData = jsonData;
    });

    console.log('data.json初始化完成     ');
}

module.exports = initDataJson;