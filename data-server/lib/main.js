/**
 * 数据服务
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

// 测试野狗的服务
var Wilddog = require('wilddog');
var ref = new Wilddog("https://longze.wilddogio.com/dinosaurs");

ref.on("value", function(snapshot) {
    console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

var ref = new Wilddog("https://longze.wilddogio.com/lambeosaurus");

ref.on("value", function(datasnapshot) {
    console.log(datasnapshot.val());   // 结果会弹出信息"beijing"
});

//module.exports = new Wilddog('https://longze.wilddogio.com/');
