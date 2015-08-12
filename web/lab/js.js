UI_FIXED_TABLE_BODY_CLASS._setSize = function (fieldsWidth) {
    this.resize(); //同步原ecui代码
    _unitTableSetSize.call(this, fieldsWidth);
    var rows = this.getRows();
    var top = 0;

    for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
        var cells = row.getCells();
        var cellHeight;
        // 容许折行
        if (this._bNowrap) {
            // 计算这一行的高度，多列取最大
            cellHeight = getLineHeight(cells);
            innerHeight = cellHeight - 20; // 消除上下 padding 与 border 的影响
        }
        // 不容许折行，使用固定高度，
        else {
            cellHeight = 35;
        }
        if (cellHeight < 0) {
            continue;
        }
        // 左边的锁定行位置设置
        for (var j = 0; j < this._nLeft; j++) {
            if (j == this._nLeft - 1) {
                // dom.setStyle(cells[j], 'borderRight', '1px solid #dddddd');
                addClass(cells[j], "cell-border-right");
            }
            dom.setStyle(cells[j], 'height', innerHeight + 'px');
            dom.setStyle(cells[j], 'top', top + 'px');
        }
        // 右边的锁定行位置设置
        for (var j = 0; j < this._nRight; j++) {
            var cell = cells[cells.length - j - 1];
            dom.setStyle(cell, 'height', innerHeight + 'px');
            dom.setStyle(cell, 'top', top + 'px');
        }
        // 中间非锁定列设置其中一个
        if (cells.length > (this._nRight + this._nLeft)) {
            dom.setStyle(cells[this._nLeft], 'height', innerHeight + 'px');
        }
        top += cellHeight - 1;
    }
};

// 折行时获取行的高度，原理是多列取最大
function getLineHeight(cells) {
    var result = 0;
    var height;
    for (var i = 0, len = cells.length; i < len; i++) {
        height = $(cells[i]).outerHeight();
        if (height > result) {
            result = height;
        }
    }
    return Math.ceil(result); // 向上取整防止小数造成的错位
}