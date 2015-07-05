/**
 * Created by zhaoxiaoqiang on 15/6/24.
 */
function getBabiesNameList() {

    var p = new Promise(function (resolve, reject) {
        // 获取姓名列表需要两秒
        setTimeout(function() {
            // 此数据一般来自回调，这里用于模拟
            var nameList = [
                '大毛',
                '二毛',
                '小毛'
            ];

            resolve(nameList);
        }, 2000);
    });

    return p;
}

function everyBabyDo (items) {
    var p = Promise.resolve();
    // 用for
    for(var i = 0, len = items.length; i < len; i++) {
        // 需要一个闭包
        (function (item) {
            // 必须有这样一个赋值，才能形成一个有序队列
            p = p.then(function () {
                return oneBabyDo (item);
            });

            // 这样是不行的（其实这个是同时启动的无序异步调用）：
//                return p.then(function () {
//                    console.log(item.name);
//                    return oneBabyDo (item);
//                });

            return p;
        })(items[i]);
    }

//        // 用reduce
//        p = items.reduce(function (promise, item) {
//            return promise.then(function () {
//                return oneBabyDo (item);
//            });
//        }, p);

    return p;
}

function oneBabyDo (item) {
    // 准备
    var p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(item);
        }, 2000);
    })

        // 开始叫醒
        .then(function (item) {
            console.log(item + ':waking');
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(item);
                }, 2000);
            })
        })

        // 叫醒完毕
        .then(function (item) {
            console.log(item + ':waked');
        });

    return p;
}

function start() {

    getBabiesNameList().then(function (data) {
        var name;
        var items = [];

        for(var i = 0, len = data.length; i < len; i++) {
            name = data[i];

            items[i] = name;
        }
        console.log('孩子们：' + items.join('，'));

        // 还需要一个promise （可以放在then中）
        return everyBabyDo(items);
    }).then(function () {

        console.log(' |-- 完事儿 --| ');
    });
}
start();