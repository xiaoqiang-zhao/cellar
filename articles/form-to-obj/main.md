# 将form中的数据转为js对象
 
我们经常需要从表单中提取数据，然后异步提交给服务器，需要做很多的定向开发，
这是一个可以将form中的数据转换为js对象的工具。
form元素的name属性是对象的key，checkbox的值以逗号间隔。

## 参数

**from** 必选参数，要读取的表单，只接受两种格式：form的id，form的原生dom节点对象。

**isFilterEmpty** 可选参数，是否将空值（空字符串，没有选中项的组）从对象中过滤掉，默认不过滤。

**noCheckedValue** 可选参数，checkbox和radio组没有选中项时取得值，只有参数 `isFilterEmpty` 值为true时生效。

## 使用建议

在表单内容提交时建议设 `isFilterEmpty` 为 `false` 或者不设置，方便校验；
如果想原样保存表单`isFilterEmpty` 为 `false`，将参数 `noCheckedValue` 设置为空字符串，
这样可以将全部字段保存到服务器，这样方便服务器端统一处理。

在提交查询表单时，尤其是多条件查询，将`isFilterEmpty` 为 `true`，可以过滤掉用户没有填写的字段。

在写HTML时，可以将“全部”，“请选择”这样的选项的值设为空字符串，就可以很方便的使用上面的逻辑来验证或提交了。

另外说明一点，`select` 的选项 `option` 如果不设置 `value`那么会将文本作为 `value` 来获取，
这也是浏览器的默认行为，这里没有添加额外的控制

