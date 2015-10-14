# 页面的基础
 
## H5的文档类型标识

    <!DOCTYPE html>
    
## 外部CSS的引入

    <link rel="stylesheet" href="css/all.css"/>

注意一定要有 `rel="stylesheet"` 否则无法识别样式，另外将其放在前面显得整齐好看，有那个样式漏掉了此设置一目了然。

## all in one

如果采用 all in one(上线时将全部css打包压缩进一个css中的方式)打包，定义all.css文件并用 `@import` 的方式集中引入全部样式。

    /* 重置样式 */
    @import url(reset.css);
    
    /* 网站基础样式，主要包括头尾导航等全局样式 */
    @import url(base.css);
    
    /* 组件样式 */
    
    /* 业务样式 */
    
## 移动站设置 Meta 标签
    
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    // width=device-width - 设置页面宽度等于设备宽度
    // initial-scale=1    - 页面首次被显示是可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放
    // user-scalable=no   - 用户是否可以手动缩放
    //                      (能解决 iPad 切换横屏之后触摸才能回到具体尺寸的问题)
    // minimum-scale      - 允许用户缩放到的最小比例
    // maximum-scale      - 允许用户缩放到的最大比例
    
    