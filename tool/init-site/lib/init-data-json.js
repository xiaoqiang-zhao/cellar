/**
 * 初始化每篇文章的 data.json 文件
 * (采用同步处理，因为后续操作需要依赖此结果)
 *
 * Created by zhaoxiaoqiang on 15/10/15.
 */
var fs = require('fs');
var config = require('./config.js');
var defaultJson = {
    "tags": [
        "基础"
    ],
    // 立项,[腹稿中],[资料收集中],[自我持续集成中],[公示持续集成中],[完结],
    //     [修正添加中]
    "state": "",       // 腹稿,
    "public": false,   // 是否处于公示状态
    "type": "md",      // md / html / none
    "createDate": "",
    "md5": "",
    "comment": [
        ""
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
    var jsonStr = JSON.stringify(defaultJson);
    articleArr.forEach(function (article) {
        var jsonDataFilePath = article.folderPath + '/data.json';
        // TODO 研究json的格式化，应该有第三方模块

        // 文件不存在，直接添加文件
        if (!fs.existsSync(jsonDataFilePath)) {
            fs.writeFileSync(jsonDataFilePath, jsonStr, config.encoding);
        }
    });

    console.log('data.json初始化完成');
}

module.exports = initDataJson;