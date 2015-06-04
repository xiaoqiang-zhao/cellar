/**
 * 文章
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

module.exports = {
    data: function (request, response) {
        // 先写静态的
        response.writeHead(200, {
            'Content-Type': ''
        });
        response.write('临时');
        response.end();

        return '临时';
    }
};