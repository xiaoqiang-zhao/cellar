/**
 * Created by zhaoxiaoqiang on 15/12/23.
 */
var header = Vue.extend({
    template: '<h3 v-on:click="fn">header</h3>',
    // 简单设置
    // props: ['t'], // 需要在这里声明才可以拿到父组件的数据
    // 复杂设置，可以设置数据类型，验证过则等
    props: {
        t: {
            type: String,
            required: true,
            default: '',
            twoWay: true, // 双向绑定
            // 验证规则
            validator: function (value) {
                return value > 10
            }
        }
    },
    methods: {
        fn: function () {
            console.log(this.$data.t);
            this.$data.t += ' - ';

            // 可以访问父组件，
            // 但子组件应当避免直接依赖父组件，避免造成不必要的耦合
            console.log(this.$parent);

            // 也可以访问多层组件嵌套时，可以直接获取根组件
            console.log('两层嵌套时父节点等于根节点');
            console.log(this.$root === this.$parent);
        }
    }
});

exports.model = header;