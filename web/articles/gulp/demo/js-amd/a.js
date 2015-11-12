define(['js-amd/b'], function (b) {
    var c = require('js-amd/c');
    var moduleName = 'add'; // 测试对变量的压缩效果
    return {
        name: moduleName,
        dep: [b, c]
    };
});
