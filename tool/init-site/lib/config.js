/**
 * 配置文件
 *
 * Created by zhaoxiaoqiang on 15/10/13.
 */
var encoding = 'utf-8'; // 编码方式一定要在这里设置，下面很多地方会用到，切勿删除

var config = {
    // 从init-site算起参考根路径向上的级别，1对应init-site
    rootLevel: 3,
    // 监听的根目录（从此目录向下监听） 以tool的上级目录作为参考
    rootPath: '/web',
    // 跟目录下文章的目录
    articlesPath: '/articles'
};

module.exports = config;