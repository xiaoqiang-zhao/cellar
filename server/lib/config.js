/**
 * 服务的配置文件
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */
var encoding = 'utf-8'; // 编码方式一定要在这里设置，下面很多地方会用到，切勿删除

var config = {
    encoding: encoding,                       // 编码设置
    defaultPort: 9999,                        // 服务启动的默认端口
    defaultPage: '/index.html',                // 默认页面
    rootLevel: 2,                             // 参考根路径，以server下lib为基础向上几层目录，2对应cellar（借助此属性服务可以放在更深的目录下）
    serviceRootPath: '/service',              // 动态服务的路径，注意不要以斜杠结尾，相对路径是cellar（也就是当前的项目路径）
    webRootPath: '/web',                      // 静态文件的路径，注意不要以斜杠结尾，相对路径是cellar（也就是当前的项目路径）
    serviceRoutConfigPath: '/rout-config.js', // service下，用户自定义服务路由，可支持RESTful
    serviceDefaultMethodName: 'data',         // 服务的默认方法
    serviceDefaultContentType: 'json',        // 服务默认数据格式（用于写在返回头中）
    isAutoOpenDefaultPage: true,              // 服务启动后是否在浏览器中打开默认页面
    afterPortConflict: 'break',               // 端口冲突后：break停止启动，continue寻找可用端口继续启动
    staticFieldConfig: {                      // 静态文件配置
        html: {
            contentType: 'text/html; charset=' + encoding,
            encoding: encoding
        },
        xhtml: {
            contentType: 'text/html; charset=' + encoding,
            encoding: encoding
        },
        htm: {
            contentType: 'text/html; charset=' + encoding,
            encoding: encoding
        },
        css: {
            contentType: 'text/css; charset=' + encoding,
            encoding: encoding
        },
        js: {
            contentType: 'application/javascript; charset=' + encoding,
            encoding: encoding
        },
        // 为了支持 source Maps
        map: {
            contentType: 'application/javascript; charset=' + encoding,
            encoding: encoding
        },
        json: {
            contentType: 'application/json; charset=' + encoding,
            encoding: encoding
        },
        md: {
            contentType: 'text/plain; charset=' + encoding,
            encoding: encoding
        },
        /****** 图片 ******/
        png: {
            contentType: 'image/png',
            encoding: 'binary'
        },
        gif: {
            contentType: 'image/gif',
            encoding: 'binary'
        },
        jpg: {
            contentType: 'image/jpg',
            encoding: 'binary'
        },
        jpeg: {
            contentType: 'image/jpeg',
            encoding: 'binary'
        },
        ico: {
            contentType: 'image/x-ico',
            encoding: 'binary'
        }
        // 更多对应关系可以在 http://tool.oschina.net/commons 找到
    }
};

/****  路径处理  ***/
// 文件路径需要将windows系统下的左“\”成"/"
var rootPath = __dirname.replace(/\\/g, '/').split('/').slice(0, -1 * config.rootLevel).join('/');
config.webRootPath = rootPath + config.webRootPath;
config.serviceRootPath = rootPath + config.serviceRootPath;


/**
 * 通过扩展名获取文件的配置信息
 *
 * @param {string} ext 文件扩展名
 * @return {Object} configData 文件的配置信息，未找到匹配项返回undefined
 * @private
 */
function getStaticFieldConfig(ext) {
    var configData;
    if (typeof ext === 'string' && ext.length > 0) {
        // 对带点的做个容错
        if (ext.charAt(0) === '.') {
            ext = ext.slice(1);
        }
        // 转换为小写
        ext = ext.toLowerCase();
        configData = config.staticFieldConfig[ext];
    }

    return configData;
}
config.getStaticFieldConfig = getStaticFieldConfig;

module.exports = config;