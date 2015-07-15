# Backbone 实践分享

序言：

用`Backbone`做过两个项目了，走过一些弯路也发现一些较好的实践方案，在此写下来与大家分享：

## Collection 与 Model

很多应用都是从列表开始，到详情页面，详情页面必然又可以返回列表页，这就需要数据的支撑。

传统的方案会进行多次数据的获取，已经获取过的数据没有很好的缓存机制，在这里分享一种数据管理的实践方案：

一个`Collection`，多个`Model`，两个`View`配合实现从列表到详情再到列表，
这里使用巧妙的数据的流转，可以达到的效果是数据没有重复请求，内存使用尽量小。

第一步：准备工作：`ListView`关联`Collection`，`Model`作为`Collection`的数据对象

    // ListView
    define(['article/collection'], function (ArticleCollection) {
        return Backbone.View.extend({
            initialize: function () {
                this.collection = new ArticleCollection();
            }
        });
    });

    // Collection
    define(['article/model'], function (ArticleModel) {
        return Backbone.Collection.extend({
            url: '/articles',
            model: ArticleModel,
            initialize: function () { }
        });
    });

    // Model
    define(function () {
        return Backbone.Model.extend({
            initialize: function (attr, option) { }
        });
    });


第二步：准备列表数据

下面的方法时`Collection`中获取列表数据的方法，通过`ListView`来调用，其中的回调函数`success`可以用来作为列表的渲染方法。
`Collection`的`fetch`方法会将获取的数据实例化为`model`，然后填充到`Collection`的属性`models`中。
下面代码中的`url`并非用于获取列表数据，而是为了`model`的`url`初始化做准备，具体请往下看。

    // Collecting
    syncArticleList: function (success) {
        this.fetch({
            success: function(collection, data) {
                success(data);
            },
            url: this.url
        });
    }

下面是`Model`的初始化，`Collection`的`fetch`方法会内调`Model`的`initialize`，
并且传递两个参数，第一个参数attr是加载到的数据列表中的数据项，
第二个参数`option`比较复杂，它是`Model`的初始化配置项，`fetch`中的配置与`Backbone.Model`默认值做合并，但是`success`是个例外。
`option`中常用的内置属性还有`silent`，`reset`，`merge`,`add`等（这里不详述），还可以添加自定义的一些属性。
说一下`url`因为这是数据交互中比较关键的一环。在以`restfull`风格定义


    define(function () {
        return Backbone.Model.extend({
            initialize: function (attr, option) {
                this.url = option.url + '/' + attr.path;
            }
        });
    });

    define(['article/model'], function (ArticleModel) {
    
        return Backbone.Collection.extend({
            url: '/articles',
            model: ArticleModel,
            initialize: function () {  },
            syncArticleList: function (success) {
                this.fetch({
                    reset: true,
                    success: function(collection, data, options) {
                        success(data);
                    },
                    url: this.url
                });
            }
        });
    });
